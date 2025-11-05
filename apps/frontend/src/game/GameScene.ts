import Phaser from 'phaser';
import { CELL_SIZE, POSITION_DELAY } from './constants';
import { HasPlayerMovedInterface } from './types';
import { PlayerMovement } from './PlayerMovement';
import { PlayersPositionInterpolator } from './PlayersPositionInterpolator';
import {
  createAvatarTexture,
  getAvatarKey,
  AVATAR_COLORS,
} from './avatarUtils';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private playerBody!: Phaser.Physics.Arcade.Body;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private otherPlayers: Map<string, Phaser.GameObjects.Sprite> = new Map();
  private onMovement: (x: number, y: number) => void;
  private currentUserId?: string;
  private isDragging: boolean = false;
  private lastPointerPosition: { x: number; y: number } = { x: 0, y: 0 };
  private playersPositionInterpolator = new PlayersPositionInterpolator();
  private currentTick = 0;
  private lastSentPosition: { x: number; y: number } = { x: -1, y: -1 };
  private lastMovementSentTime = 0;

  constructor(onMovement: (x: number, y: number) => void) {
    super({ key: 'GameScene' });
    this.onMovement = onMovement;
  }

  preload() {
    // Load Tiled map JSON
    this.load.tilemapTiledJSON('map', '/office.tmj');

    // Load tileset images
    this.load.image('WA_Special_Zones', '/tilesets/WA_Special_Zones.png');
    this.load.image('WA_Decoration', '/tilesets/WA_Decoration.png');
    this.load.image('WA_Miscellaneous', '/tilesets/WA_Miscellaneous.png');
    this.load.image('WA_Other_Furniture', '/tilesets/WA_Other_Furniture.png');
    this.load.image('WA_Room_Builder', '/tilesets/WA_Room_Builder.png');
    this.load.image('WA_Seats', '/tilesets/WA_Seats.png');
    this.load.image('WA_Tables', '/tilesets/WA_Tables.png');
    this.load.image('WA_Logo_Long', '/tilesets/WA_Logo_Long.png');
    this.load.image('WA_Exterior', '/tilesets/WA_Exterior.png');
    this.load.image('WA_User_Interface', '/tilesets/WA_User_Interface.png');

    console.log(
      'Preload complete - avatar textures will be created in create()'
    );
  }

  setCurrentUser(userId: string | number) {
    this.currentUserId = String(userId);
    console.log(`Setting current user: ${userId}`);

    // Update player avatar
    if (this.player) {
      const avatarKey = getAvatarKey(userId);
      console.log(`Setting player texture to: ${avatarKey}`);
      this.player.setTexture(avatarKey);

      // Ensure the player is visible by setting alpha and scale
      this.player.setAlpha(1);
      this.player.setScale(1);
      this.player.setVisible(true);

      console.log('Player texture updated and made visible');
    }
  }

  create() {
    // Create avatar textures FIRST in create() instead of preload()
    console.log('Creating avatar textures...');
    AVATAR_COLORS.forEach((color, index) => {
      createAvatarTexture(this, `avatar_${index}`, color);
    });
    console.log('Avatar textures created successfully');

    // Verify textures exist
    for (let i = 0; i < AVATAR_COLORS.length; i++) {
      const key = `avatar_${i}`;
      const exists = this.textures.exists(key);
      console.log(`Texture ${key} exists:`, exists);
    }

    // Create map
    const map = this.make.tilemap({ key: 'map' });

    // Add tilesets
    const specialZones = map.addTilesetImage(
      'WA_Special_Zones',
      'WA_Special_Zones'
    );
    const decoration = map.addTilesetImage('WA_Decoration', 'WA_Decoration');
    const miscellaneous = map.addTilesetImage(
      'WA_Miscellaneous',
      'WA_Miscellaneous'
    );
    const otherFurniture = map.addTilesetImage(
      'WA_Other_Furniture',
      'WA_Other_Furniture'
    );
    const roomBuilder = map.addTilesetImage(
      'WA_Room_Builder',
      'WA_Room_Builder'
    );
    const seats = map.addTilesetImage('WA_Seats', 'WA_Seats');
    const tables = map.addTilesetImage('WA_Tables', 'WA_Tables');
    const logoLong = map.addTilesetImage('WA_Logo_Long', 'WA_Logo_Long');
    const exterior = map.addTilesetImage('WA_Exterior', 'WA_Exterior');
    const userInterface = map.addTilesetImage(
      'WA_User_Interface',
      'WA_User_Interface'
    );

    // Create layers
    map.createLayer(
      'floor/floor1',
      [roomBuilder!, seats!, tables!, exterior!],
      0,
      0
    );
    map.createLayer(
      'floor/floor2',
      [
        decoration!,
        miscellaneous!,
        otherFurniture!,
        seats!,
        tables!,
        userInterface!,
      ],
      0,
      0
    );
    const wallsLayer1 = map.createLayer(
      'walls/walls1',
      [roomBuilder!, seats!, tables!, exterior!, logoLong!],
      0,
      0
    );
    const wallsLayer2 = map.createLayer(
      'walls/walls2',
      [
        decoration!,
        miscellaneous!,
        otherFurniture!,
        seats!,
        tables!,
        userInterface!,
        logoLong!,
        exterior!,
      ],
      0,
      0
    );
    map.createLayer(
      'furniture/furniture1',
      [
        decoration!,
        miscellaneous!,
        otherFurniture!,
        seats!,
        tables!,
        userInterface!,
      ],
      0,
      0
    );
    map.createLayer(
      'furniture/furniture2',
      [
        decoration!,
        miscellaneous!,
        otherFurniture!,
        seats!,
        tables!,
        userInterface!,
      ],
      0,
      0
    );
    map.createLayer(
      'furniture/furniture3',
      [
        decoration!,
        miscellaneous!,
        otherFurniture!,
        seats!,
        tables!,
        userInterface!,
      ],
      0,
      0
    );
    const above1Layer = map.createLayer(
      'above/above1',
      [
        decoration!,
        miscellaneous!,
        otherFurniture!,
        seats!,
        tables!,
        userInterface!,
        logoLong!,
        exterior!,
      ],
      0,
      0
    );
    const above2Layer = map.createLayer(
      'above/above2',
      [
        decoration!,
        miscellaneous!,
        otherFurniture!,
        seats!,
        tables!,
        userInterface!,
        logoLong!,
        exterior!,
      ],
      0,
      0
    );

    // Make "above" layers semi-transparent so players are always visible
    above1Layer?.setAlpha(0.7);
    above2Layer?.setAlpha(0.7);

    // Set collision for walls and collisions layer
    wallsLayer1?.setCollisionByProperty({ collides: true });
    wallsLayer2?.setCollisionByProperty({ collides: true });
    const collisionsLayer = map.createLayer(
      'collisions',
      [specialZones!],
      0,
      0
    );
    collisionsLayer?.setCollisionByProperty({ collides: true });

    // CRITICAL: Hide the collisions layer - it's only for collision detection, not visual display
    collisionsLayer?.setVisible(false);

    // Set depths for map layers - using tile depth like WorkAdventure
    map.getLayer('floor/floor1')?.tilemapLayer?.setDepth(0);
    map.getLayer('floor/floor2')?.tilemapLayer?.setDepth(0);
    wallsLayer1?.setDepth(0);
    wallsLayer2?.setDepth(0);
    map.getLayer('furniture/furniture1')?.tilemapLayer?.setDepth(0);
    map.getLayer('furniture/furniture2')?.tilemapLayer?.setDepth(0);
    map.getLayer('furniture/furniture3')?.tilemapLayer?.setDepth(0);
    collisionsLayer?.setDepth(0);
    above1Layer?.setDepth(1000000);
    above2Layer?.setDepth(1000000);

    console.log(
      'Layer depths set - tiles at 0, players use Y-coordinate, overlays at 1,000,000'
    );

    // Create player as simple sprite (like WorkAdventure remote players)
    const startX = 200;
    const startY = 200;
    this.player = this.add.sprite(startX, startY, 'avatar_0');
    this.player.setDisplaySize(32, 32);
    this.player.setOrigin(0.5, 0.5);

    // Add physics body separately
    this.physics.add.existing(this.player);
    this.playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    this.playerBody.setSize(32, 32);

    // Use Y coordinate as depth like WorkAdventure
    this.player.setDepth(this.player.y + 16);

    // Force visibility
    this.player.setVisible(true);
    this.player.setAlpha(1.0);
    this.player.setScrollFactor(1);

    console.log(
      'Player created at:',
      startX,
      startY,
      'with texture:',
      this.player.texture.key
    );
    console.log('Player using Y-based depth:', this.player.y + 16);
    console.log(
      'Player visible:',
      this.player.visible,
      'depth:',
      this.player.depth
    );

    // Set up collisions using the player body
    if (wallsLayer1) this.physics.add.collider(this.player, wallsLayer1);
    if (wallsLayer2) this.physics.add.collider(this.player, wallsLayer2);
    if (collisionsLayer)
      this.physics.add.collider(this.player, collisionsLayer);

    // Camera setup with proper bounds
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setDeadzone(100, 100);
    this.cameras.main.setRoundPixels(true);

    console.log(
      'Camera bounds set to:',
      map.widthInPixels,
      'x',
      map.heightInPixels
    );
    console.log('Camera following player with deadzone');

    // Input
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Set up mouse wheel zoom (like WorkAdventure)
    this.input.on(
      'wheel',
      (
        pointer: Phaser.Input.Pointer,
        gameObjects: any,
        deltaX: number,
        deltaY: number
      ) => {
        this.handleMouseWheel(deltaY);
      }
    );

    // Set up mouse/touch drag for camera panning
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.leftButtonDown()) {
        this.isDragging = true;
        this.lastPointerPosition.x = pointer.worldX;
        this.lastPointerPosition.y = pointer.worldY;
        this.cameras.main.stopFollow();
      }
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.isDragging) {
        const deltaX = this.lastPointerPosition.x - pointer.worldX;
        const deltaY = this.lastPointerPosition.y - pointer.worldY;
        this.cameras.main.scrollX += deltaX;
        this.cameras.main.scrollY += deltaY;
        this.lastPointerPosition.x = pointer.worldX;
        this.lastPointerPosition.y = pointer.worldY;
      }
    });

    this.input.on('pointerup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
      }
    });

    this.input.keyboard!.enabled = true;
    this.game.canvas.focus();
  }

  update(_time: number, delta: number) {
    if (!this.player || !this.cursors) return;

    this.currentTick += delta;

    // Always update depth based on Y position
    this.player.setDepth(this.player.y + 16);

    // Ensure player stays visible every frame
    if (!this.player.visible) {
      console.warn('Player became invisible! Re-enabling...');
      this.player.setVisible(true);
      this.player.setAlpha(1.0);
    }

    // Update interpolated positions for other players
    const updatedPositions =
      this.playersPositionInterpolator.getUpdatedPositions(this.currentTick);
    updatedPositions.forEach(
      (moveEvent: HasPlayerMovedInterface, userId: number) => {
        this.updateOtherPlayerPosition(String(userId), moveEvent);
      }
    );

    // Ensure all other players stay visible
    this.otherPlayers.forEach((sprite, userId) => {
      if (!sprite.visible) {
        console.warn(`Other player ${userId} became invisible! Re-enabling...`);
        sprite.setVisible(true);
        sprite.setAlpha(1.0);
      }
      sprite.setDepth(sprite.y + 16);
    });

    // Movement using player body
    let moved = false;
    if (this.cursors.left.isDown) {
      this.playerBody.setVelocityX(-160);
      moved = true;
    } else if (this.cursors.right.isDown) {
      this.playerBody.setVelocityX(160);
      moved = true;
    } else {
      this.playerBody.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.playerBody.setVelocityY(-160);
      moved = true;
    } else if (this.cursors.down.isDown) {
      this.playerBody.setVelocityY(160);
      moved = true;
    } else {
      this.playerBody.setVelocityY(0);
    }

    if (moved) {
      const gridX = Math.floor(this.player.x / CELL_SIZE);
      const gridY = Math.floor(this.player.y / CELL_SIZE);

      // Throttle movement updates
      const now = Date.now();
      if (
        (gridX !== this.lastSentPosition.x ||
          gridY !== this.lastSentPosition.y) &&
        now - this.lastMovementSentTime >= 50
      ) {
        this.lastSentPosition = { x: gridX, y: gridY };
        this.lastMovementSentTime = now;
        this.onMovement(gridX, gridY);
      }
    }
  }

  setPlayerPosition(x: number, y: number) {
    if (this.player) {
      const worldX = x * CELL_SIZE;
      const worldY = y * CELL_SIZE;
      console.log(
        `Setting player position to: (${worldX}, ${worldY}) from grid (${x}, ${y})`
      );

      this.player.setPosition(worldX, worldY);
      this.player.setDepth(worldY + 16);
      this.player.setVisible(true);
      this.player.setAlpha(1.0);
      this.player.setActive(true);

      console.log('Player position updated. Y-based depth:', worldY + 16);
      console.log('Player world position:', this.player.x, this.player.y);
    }
  }

  addOtherPlayer(userId: string | number, x: number, y: number) {
    const userIdString = String(userId);

    console.log(
      `Adding other player: ${userIdString} (original type: ${typeof userId}) at grid (${x}, ${y}), world (${x * CELL_SIZE}, ${y * CELL_SIZE})`
    );

    if (this.otherPlayers.has(userIdString)) {
      console.log(
        `Player ${userIdString} already exists, removing old sprite first`
      );
      this.removeOtherPlayer(userIdString);
    }

    const avatarKey = getAvatarKey(userIdString);
    console.log(`Using avatar key: ${avatarKey} for user: ${userIdString}`);

    if (!this.textures.exists(avatarKey)) {
      console.error(`Texture ${avatarKey} does not exist!`);
      return;
    }

    const worldX = x * CELL_SIZE;
    const worldY = y * CELL_SIZE;
    const sprite = this.add.sprite(worldX, worldY, avatarKey);
    sprite.setDisplaySize(32, 32);
    sprite.setDepth(worldY + 16);
    sprite.setVisible(true);
    sprite.setAlpha(1.0);
    sprite.setActive(true);
    sprite.setScrollFactor(1);
    sprite.setOrigin(0.5, 0.5);

    // Add name label with proper font settings
    const nameText = this.add.text(
      worldX,
      worldY - 20,
      `User ${userIdString}`,
      {
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 6, y: 3 },
        resolution: 2, // Higher resolution for crisp text
      }
    );
    nameText.setOrigin(0.5, 0.5);
    nameText.setDepth(1000);
    nameText.setScrollFactor(1);
    nameText.setAlpha(0.95);

    sprite.setData('nameText', nameText);
    this.otherPlayers.set(userIdString, sprite);

    console.log(
      `Other player ${userIdString} stored with STRING key. Visible:`,
      sprite.visible,
      'Depth:',
      sprite.depth,
      'Position:',
      sprite.x,
      sprite.y
    );
    console.log(
      `Total players in map:`,
      this.otherPlayers.size,
      'Keys:',
      Array.from(this.otherPlayers.keys())
    );
  }

  updateOtherPlayerMovement(userId: string | number, x: number, y: number) {
    const userIdString = String(userId);
    const sprite = this.otherPlayers.get(userIdString);

    if (!sprite) {
      console.error(
        `Cannot update movement for player ${userIdString} - sprite not found.`
      );
      console.error(
        `Available player keys:`,
        Array.from(this.otherPlayers.keys())
      );
      console.error(
        `Looking for key: "${userIdString}" (type: ${typeof userIdString})`
      );
      console.error(
        `Available key types:`,
        Array.from(this.otherPlayers.keys()).map((k) => typeof k)
      );
      return;
    }

    console.log(
      `Updating player ${userIdString} movement from (${Math.floor(sprite.x / CELL_SIZE)}, ${Math.floor(sprite.y / CELL_SIZE)}) to (${x}, ${y})`
    );

    const startPosition = { x: sprite.x / CELL_SIZE, y: sprite.y / CELL_SIZE };
    const endPosition: HasPlayerMovedInterface = {
      x,
      y,
      moving: true,
    };
    const playerMovement = new PlayerMovement(
      startPosition,
      this.currentTick,
      endPosition,
      this.currentTick + POSITION_DELAY
    );
    this.playersPositionInterpolator.updatePlayerPosition(
      Number(userId),
      playerMovement
    );
  }

  updateOtherPlayerPosition(
    userId: string,
    moveEvent: HasPlayerMovedInterface
  ) {
    const sprite = this.otherPlayers.get(userId);
    if (sprite) {
      const worldX = moveEvent.x * CELL_SIZE;
      const worldY = moveEvent.y * CELL_SIZE;
      sprite.setPosition(worldX, worldY);
      sprite.setDepth(worldY + 16);

      const nameText = sprite.getData('nameText');
      if (nameText) {
        nameText.setPosition(worldX, worldY - 20);
        nameText.setDepth(worldY + 17);
      }
    }
  }

  removeOtherPlayer(userId: string) {
    const sprite = this.otherPlayers.get(userId);
    if (sprite) {
      const nameText = sprite.getData('nameText');
      if (nameText) {
        nameText.destroy();
      }
      sprite.destroy();
      this.otherPlayers.delete(userId);
      console.log(`Other player ${userId} removed`);
    }
    this.playersPositionInterpolator.removePlayer(parseInt(userId));
  }

  handleMouseWheel(deltaY: number) {
    // WorkAdventure zoom implementation
    // Calculate zoom factor from mouse wheel delta
    let zoomFactor = Math.exp((-deltaY * Math.log(2)) / 100);

    // Clamp to prevent extreme zooming
    zoomFactor = Math.max(0.5, Math.min(2, zoomFactor));

    // Get current zoom
    const currentZoom = this.cameras.main.zoom;
    const newZoom = currentZoom * zoomFactor;

    // Apply limits (0.5x to 3x like WorkAdventure)
    const clampedZoom = Math.max(0.5, Math.min(3, newZoom));

    // Smooth zoom transition
    this.cameras.main.zoomTo(clampedZoom, 100); // 100ms smooth zoom

    console.log(`Zoom: ${currentZoom.toFixed(2)} -> ${clampedZoom.toFixed(2)}`);
  }
}
