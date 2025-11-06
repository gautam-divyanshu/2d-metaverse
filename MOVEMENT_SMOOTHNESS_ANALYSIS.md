# Movement Smoothness Issue - Root Cause Analysis

## Problem Statement

**Your avatar moves smoothly on your screen, but appears jittery/choppy on other players' screens.**

## Root Cause Identified

### **Issue #1: Sending INTEGER Grid Coordinates Instead of PIXEL Coordinates**

**Your Current Implementation** ([`GameScene.ts:558-570`](2d-metaverse/apps/frontend/src/game/GameScene.ts:558-570)):

```typescript
const gridX = Math.floor(this.player.x / CELL_SIZE); // e.g., 10, 11, 12
const gridY = Math.floor(this.player.y / CELL_SIZE); // INTEGER values

this.onMovement(gridX, gridY); // Sends: {x: 10, y: 11}
```

**The Problem:**

- Your player moves smoothly at 160 pixels/second via Phaser physics
- But you only send position updates when crossing grid boundaries (every 32 pixels)
- Other players receive: `{x: 10}` → `{x: 11}` → `{x: 12}` (integer jumps)
- Interpolation tries to smooth this, but it's interpolating between `10.0 → 11.0` (just 1 unit)
- This creates 32-pixel "teleports" that interpolation tries to smooth, resulting in choppy movement

**Visual Example:**

```
Your Screen (Phaser Physics):
Player at: 320px → 336px → 352px → 368px → 384px (smooth!)

Other Players See (Grid Coordinates):
Player at: x=10 → x=11 → x=12 (jumpy!)
           (320px)  (352px)  (384px)
```

---

### **Issue #2: Throttling Doesn't Help**

```typescript
now - this.lastMovementSentTime >= 50; // 50ms throttle
```

**The Problem:**

- The 50ms throttle is meaningless because you ALSO check `gridX !== this.lastSentPosition.x`
- At 160 pixels/second, crossing one 32-pixel cell takes: `32 / 160 = 0.2s = 200ms`
- So you actually send updates every ~200ms, not every 50ms
- The grid check overrides the time throttle!

---

### **Issue #3: Loss of Sub-Cell Precision**

```typescript
// You convert pixel → grid → send → receiver converts grid → pixel
this.player.x = 345px → gridX = 10 → sent as 10 → received → displayed at 320px

// Lost 25 pixels of precision!
```

---

## How WorkAdventure Handles This

Looking at WorkAdventure's code, they likely:

1. **Send Pixel Coordinates or Sub-Cell Offsets**
   - Instead of just `{x: 10, y: 11}`, they probably send `{x: 10.78, y: 11.34}`
   - Or send `{gridX: 10, offsetX: 25, gridY: 11, offsetY: 11}` for sub-cell precision

2. **Higher Update Frequency**
   - Send updates based on TIME (every 50-100ms) regardless of position change
   - This ensures smooth tracking of continuous movement

3. **Velocity/Direction Information**
   - Include velocity vector in movement message
   - Receiving client can extrapolate position between updates

---

## Solutions

### **Solution 1: Send Pixel Coordinates** (Recommended)

**Change your movement message to include pixel-level precision:**

```typescript
// In GameScene.ts update() method:
if (moved || now - this.lastMovementSentTime >= 100) {
  // Update every 100ms
  const pixelX = this.player.x; // Actual pixel position
  const pixelY = this.player.y;

  this.onMovement(pixelX, pixelY); // Send pixels, not grid
  this.lastMovementSentTime = now;
}
```

**Update server to handle pixel coordinates:**

```typescript
// User.ts - validate movement in pixels, not grid
const pixelDisplacement = Math.sqrt(
  Math.pow(moveX - this.x * CELL_SIZE, 2) +
    Math.pow(moveY - this.y * CELL_SIZE, 2)
);
// Allow movement up to ~300 pixels per update (at 160px/s over 2 seconds)
if (pixelDisplacement < 500) {
  // Valid
  this.x = moveX / CELL_SIZE; // Store as grid for collision checks
  this.y = moveY / CELL_SIZE;
}
```

**Update interpolator to use pixels:**

```typescript
// PlayerMovement already works with any coordinate system
// Just pass pixel coordinates instead of grid coordinates
```

---

### **Solution 2: Higher Frequency Grid Updates** (Simpler, Less Accurate)

```typescript
// Send updates more frequently, even if position hasn't changed much
if (moved) {
  const gridX = Math.floor(this.player.x / CELL_SIZE);
  const gridY = Math.floor(this.player.y / CELL_SIZE);

  // Remove the position change check, only use time throttle
  if (now - this.lastMovementSentTime >= 100) {
    // Every 100ms
    this.onMovement(gridX, gridY);
    this.lastSentPosition = { x: gridX, y: gridY };
    this.lastMovementSentTime = now;
  }
}
```

**Pros:** Simple fix, no protocol changes
**Cons:** Still loses sub-cell precision, movement in 32px jumps

---

### **Solution 3: Sub-Cell Precision** (Best Accuracy)

**Send both grid and pixel offset:**

```typescript
const gridX = Math.floor(this.player.x / CELL_SIZE);
const gridY = Math.floor(this.player.y / CELL_SIZE);
const offsetX = (this.player.x % CELL_SIZE) / CELL_SIZE; // 0.0 to 0.99
const offsetY = (this.player.y % CELL_SIZE) / CELL_SIZE;

this.onMovement({
  gridX,
  gridY,
  offsetX, // Sub-cell precision
  offsetY,
});
```

**Reconstruct exact pixel position on receiver:**

```typescript
const pixelX = (gridX + offsetX) * CELL_SIZE;
const pixelY = (gridY + offsetY) * CELL_SIZE;
```

---

## Comparison Table

| Aspect               | Current | Solution 1 (Pixels)  | Solution 2 (Frequent) | Solution 3 (Sub-Cell) |
| -------------------- | ------- | -------------------- | --------------------- | --------------------- |
| **Update Frequency** | ~200ms  | 100ms                | 100ms                 | 100ms                 |
| **Precision**        | 32px    | 1px                  | 32px                  | 1px                   |
| **Smoothness**       | Choppy  | Smooth               | Moderate              | Smooth                |
| **Bandwidth**        | Low     | Moderate             | Moderate              | Moderate              |
| **Complexity**       | Simple  | Medium               | Simple                | Medium                |
| **Compatibility**    | Current | Need protocol change | Works now             | Need protocol change  |

---

## Recommended Fix: Solution 1 (Pixel Coordinates)

This provides the best balance of:

- ✅ Smooth movement (1-pixel precision)
- ✅ Reasonable network usage (10 updates/second)
- ✅ Clean implementation
- ✅ Matches WorkAdventure's quality

### Implementation Steps:

1. **Change GameScene to send pixels** (not grid)
2. **Update server to handle pixel coordinates**
3. **Adjust validation to allow pixel-level movement**
4. **Update interpolator to work with pixels** (already does!)
5. **Test with 2 players** to verify smoothness

---

## Expected Results

**Before Fix:**

```
Movement seen by others:
x: 10 → 11 → 12 (grid cells, 32px jumps)
Appearance: Teleporting/choppy
```

**After Fix:**

```
Movement seen by others:
x: 320px → 336px → 352px → 368px → 384px (pixel precision)
Appearance: Smooth gliding
```

---

## Additional Optimizations

### **Extrapolation** (WorkAdventure uses this)

If no update received for >200ms, predict position based on last known velocity:

```typescript
// In PlayerMovement.getPosition()
if (tick > this.endTick) {
  // Extrapolate based on velocity
  const timeSinceEnd = tick - this.endTick;
  const velocityX =
    (this.endPosition.x - this.startPosition.x) /
    (this.endTick - this.startTick);
  const velocityY =
    (this.endPosition.y - this.startPosition.y) /
    (this.endTick - this.startTick);

  return {
    x: this.endPosition.x + velocityX * timeSinceEnd,
    y: this.endPosition.y + velocityY * timeSinceEnd,
    moving: true,
  };
}
```

---

## Testing Checklist

- [ ] Player A moves right - appears smooth on Player B's screen
- [ ] Diagonal movement (up+right) appears smooth
- [ ] Rapid direction changes tracked accurately
- [ ] No "teleporting" when crossing grid boundaries
- [ ] Movement stays smooth even with 200ms network latency
- [ ] Server validates pixel positions correctly

---

## Conclusion

**The issue is:** You're sending integer grid coordinates (10, 11, 12) which lose all sub-cell movement information.

**The solution is:** Send pixel coordinates or add sub-cell offsets to preserve smooth movement data.

**Estimated fix time:** 2-3 hours

**Priority:** HIGH - This significantly impacts multiplayer UX

Ready to implement Solution 1 (pixel coordinates)?
