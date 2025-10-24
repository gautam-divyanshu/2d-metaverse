import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
// import { createPhaserGame } from '../components/PhaserGame';

interface SpaceElement {
  id: number;
  elementId: number;
  x: number;
  y: number;
  element: {
    id: number;
    imageUrl: string;
    width: number;
    height: number;
    isStatic: boolean;
  };
}

interface SpaceData {
  id: number;
  name: string;
  width: number;
  height: number;
  ownerId: number;
  elements: SpaceElement[];
}

interface User {
  id: string;
  x: number;
  y: number;
}

interface CurrentUser {
  x: number;
  y: number;
  userId: string;
}

const CELL_SIZE = 32; // pixels per grid cell

export const SpaceViewPage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  
  const [space, setSpace] = useState<SpaceData | null>(null);
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);

  // Check if user is the owner of this space
  const isOwner = space && user && space.ownerId === parseInt(user.id);

  useEffect(() => {
    fetchSpaceData();
    return () => {
      // Clean up WebSocket connection
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      // Clear user state
      setUsers(new Map());
      setCurrentUser(null);
    };
  }, [spaceId]);

  useEffect(() => {
    if (space) {
      connectWebSocket();
    }
  }, [space]);

  useEffect(() => {
    if (space && currentUser) {
      // Use requestAnimationFrame for smoother rendering
      const animationId = requestAnimationFrame(() => {
        drawCanvas();
      });
      
      return () => cancelAnimationFrame(animationId);
    }
  }, [space, currentUser, users]);

  const fetchSpaceData = async () => {
    try {
      console.log('Fetching space data for spaceId:', spaceId);
      console.log('Token:', token);
      
      const response = await fetch(`http://localhost:3000/api/v1/space/${spaceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('Space data:', data);
        setSpace(data);
        setIsLoading(false);
      } else {
        const errorData = await response.text();
        console.log('Error response:', errorData);
        setError('Failed to load space');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Network error');
      setIsLoading(false);
    }
  };

  const connectWebSocket = () => {
    // Close existing connection if any
    if (wsRef.current) {
      wsRef.current.close();
    }
    
    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      // Immediately join the space for faster connection
      ws.send(JSON.stringify({
        type: 'join',
        payload: {
          spaceId: parseInt(spaceId!),
          token: token
        }
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Process messages immediately without console.log for performance

      switch (message.type) {
        case 'space-joined':
          // Initialize current user position
          const spawnX = message.payload.spawn.x;
          const spawnY = message.payload.spawn.y;
          
          setCurrentUser({
            x: spawnX,
            y: spawnY,
            userId: message.payload.userId
          });
          
          // Reset zoom to 100% (normal view)
          setZoom(1);
          
          // Center the scroll position on the player's spawn location
          setTimeout(() => {
            centerScrollOnPlayer(spawnX, spawnY, false);
          }, 100); // Small delay to ensure DOM is updated
          
          // Initialize other users from the payload
          const userMap = new Map();
          message.payload.users.forEach((u: any) => {
            if (u.userId && u.userId !== message.payload.userId) {
              userMap.set(u.userId, {
                id: u.userId,
                x: u.x || 0,
                y: u.y || 0
              });
            }
          });
          setUsers(userMap);
          break;
        
        case 'user-joined':
          setUsers(prev => {
            const newUsers = new Map(prev);
            // Only add if it's not the current user and not already in the list
            if (message.payload.userId !== currentUser?.userId && !newUsers.has(message.payload.userId)) {
              newUsers.set(message.payload.userId, {
                id: message.payload.userId,
                x: message.payload.x || 0,
                y: message.payload.y || 0
              });
            }
            return newUsers;
          });
          break;
        
        case 'user-left':
          setUsers(prev => {
            const newUsers = new Map(prev);
            newUsers.delete(message.payload.userId);
            return newUsers;
          });
          break;
        
        case 'movement':
          // Immediately update other users' positions for fast synchronization
          if (message.payload.userId !== currentUser?.userId) {
            setUsers(prev => {
              const newUsers = new Map(prev);
              const user = newUsers.get(message.payload.userId);
              if (user) {
                // Always update position immediately
                newUsers.set(message.payload.userId, {
                  ...user,
                  x: message.payload.x,
                  y: message.payload.y
                });
              }
              return newUsers;
            });
          }
          break;
        
        case 'movement-accepted':
          // Confirm current user position when movement is accepted
          setCurrentUser(prev => prev ? {
            ...prev,
            x: message.payload.x,
            y: message.payload.y
          } : null);
          break;
        
        case 'movement-rejected':
          // Reset current user position if movement was rejected
          setCurrentUser(prev => prev ? {
            ...prev,
            x: message.payload.x,
            y: message.payload.y
          } : null);
          break;
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection error');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!currentUser || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    let newX = currentUser.x;
    let newY = currentUser.y;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        e.preventDefault(); // Prevent scrolling
        newY = Math.max(0, currentUser.y - 1);
        break;
      case 'ArrowDown':
      case 's':
        e.preventDefault(); // Prevent scrolling
        newY = Math.min(space!.height - 1, currentUser.y + 1);
        break;
      case 'ArrowLeft':
      case 'a':
        e.preventDefault(); // Prevent scrolling
        newX = Math.max(0, currentUser.x - 1);
        break;
      case 'ArrowRight':
      case 'd':
        e.preventDefault(); // Prevent scrolling
        newX = Math.min(space!.width - 1, currentUser.x + 1);
        break;
      default:
        return;
    }

    if (newX !== currentUser.x || newY !== currentUser.y) {
      // Optimistically update current user position for immediate feedback
      setCurrentUser(prev => prev ? {
        ...prev,
        x: newX,
        y: newY
      } : null);
      
      // Send movement request immediately
      wsRef.current.send(JSON.stringify({
        type: 'move',
        payload: {
          x: newX,
          y: newY,
          userId: currentUser.userId
        }
      }));
    }
  };

  const handleCanvasDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentUser || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN || !space) {
      console.log('Double-click blocked: missing requirements');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    
    // Since canvas is positioned absolutely, use direct click coordinates on canvas
    const canvasClickX = e.clientX - rect.left;
    const canvasClickY = e.clientY - rect.top;
    
    // Convert to grid coordinates (no need to account for canvas offset here)
    const x = Math.floor(canvasClickX / CELL_SIZE);
    const y = Math.floor(canvasClickY / CELL_SIZE);

    console.log(`Double-click at canvas (${canvasClickX}, ${canvasClickY}) -> grid (${x}, ${y})`);

    // Validate bounds
    if (x < 0 || x >= space.width || y < 0 || y >= space.height) {
      console.log(`Click out of bounds: (${x}, ${y}), space size: ${space.width}x${space.height}`);
      return;
    }

    console.log(`Teleporting from (${currentUser.x}, ${currentUser.y}) to (${x}, ${y})`);

    // Optimistically update current user position for teleportation
    setCurrentUser(prev => prev ? {
      ...prev,
      x: x,
      y: y
    } : null);

    // Send teleport request (using move message but allowing any distance)
    wsRef.current.send(JSON.stringify({
      type: 'move',
      payload: {
        x: x,
        y: y,
        userId: currentUser.userId,
        teleport: true // Flag to indicate this is a teleport
      }
    }));
  };

  const handleCanvasClick = (_e: React.MouseEvent<HTMLCanvasElement>) => {
    // Single click is disabled - use double-click to teleport or arrow keys to move
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentUser, space]);

  // Zoom functions - scrolling handles navigation
  const zoomInCentered = () => {
    setZoom(Math.min(3, zoom + 0.25));
  };

  const zoomOutCentered = () => {
    setZoom(Math.max(0.25, zoom - 0.25));
  };

  // Helper function to center scroll on player
  const centerScrollOnPlayer = (playerX: number, playerY: number, smooth = false) => {
    const canvas = canvasRef.current;
    const scrollContainer = canvas?.parentElement?.parentElement;
    if (canvas && scrollContainer) {
      const playerCanvasX = playerX * CELL_SIZE + CELL_SIZE / 2 + 500;
      const playerCanvasY = playerY * CELL_SIZE + CELL_SIZE / 2 + 500;
      
      const scrollLeft = playerCanvasX - scrollContainer.clientWidth / 2;
      const scrollTop = playerCanvasY - scrollContainer.clientHeight / 2;
      
      if (smooth) {
        scrollContainer.scrollTo({
          left: Math.max(0, scrollLeft),
          top: Math.max(0, scrollTop),
          behavior: 'smooth'
        });
      } else {
        scrollContainer.scrollLeft = Math.max(0, scrollLeft);
        scrollContainer.scrollTop = Math.max(0, scrollTop);
      }
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !space || !currentUser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2a2a3e';
    ctx.lineWidth = 1;
    for (let x = 0; x <= space.width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, space.height * CELL_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= space.height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(space.width * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }

    // Draw elements (all elements are obstacles/non-walkable)
    space.elements.forEach((element) => {
      // All elements are obstacles - use solid color to indicate they block movement
      ctx.fillStyle = '#dc2626'; // Red color to indicate obstacles
      ctx.strokeStyle = '#991b1b'; // Darker red border
      
      ctx.fillRect(
        element.x * CELL_SIZE,
        element.y * CELL_SIZE,
        element.element.width * CELL_SIZE,
        element.element.height * CELL_SIZE
      );
      ctx.strokeRect(
        element.x * CELL_SIZE,
        element.y * CELL_SIZE,
        element.element.width * CELL_SIZE,
        element.element.height * CELL_SIZE
      );
    });

    // Draw other users
    users.forEach((user) => {
      // Quick validation without console.log for performance
      if (typeof user.x !== 'number' || typeof user.y !== 'number') {
        return;
      }
      
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(
        user.x * CELL_SIZE + CELL_SIZE / 2,
        user.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Draw user label
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        `User ${String(user.id || 'Unknown').slice(-4)}`, 
        user.x * CELL_SIZE + CELL_SIZE / 2, 
        user.y * CELL_SIZE + CELL_SIZE / 2 + 25
      );
    });

    // Draw current user
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(
      currentUser.x * CELL_SIZE + CELL_SIZE / 2,
      currentUser.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw current user border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw current user label
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('You', currentUser.x * CELL_SIZE + CELL_SIZE / 2, currentUser.y * CELL_SIZE + CELL_SIZE / 2 + 25);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !space) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="mb-4">{error || 'Space not found'}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-400 hover:text-blue-300"
            >
              <ArrowLeft className="inline mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-slate-400 hover:text-white mb-2 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white">{space.name}</h1>
            {currentUser && (
              <div className="text-sm text-slate-400 mt-1">
                <p>Position: ({currentUser.x}, {currentUser.y})</p>
                <p>User ID: {String(currentUser.userId || 'Unknown').slice(-8)}</p>
                <p>Space ID: {spaceId}</p>
              </div>
            )}
          </div>
          
          {/* Edit button for space owner only */}
          <div className="flex items-center gap-4">
            {isOwner && (
              <button
                onClick={() => navigate(`/space/${space.id}/edit`)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Edit Space
              </button>
            )}
            <div className="text-white">
              <p className="text-sm text-slate-400">Users online</p>
              <p className="text-2xl font-bold">{users.size + (currentUser ? 1 : 0)}</p>
              <div className="text-xs text-slate-500 mt-1">
                Other Users: {Array.from(users.entries()).map(([id, user]) => 
                  `${String(id).slice(-4)}:(${user.x},${user.y})`
                ).join(', ') || 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          {/* Zoom Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={zoomOutCentered}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                title="Zoom Out (Centered on Player)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-white text-sm px-3 py-1 bg-slate-700 rounded">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={zoomInCentered}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                title="Zoom In (Centered on Player)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setZoom(1);
                  // Center scroll on current player position
                  if (currentUser) {
                    centerScrollOnPlayer(currentUser.x, currentUser.y, true);
                  }
                }}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                title="Reset Zoom & Center on Player"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            <div className="text-slate-300 text-sm">
              Arrows to move • Double-click-teleport • Scroll to navigate
            </div>
          </div>
          
          {/* Canvas Container with Scrollable Area */}
          <div 
            className="max-h-[70vh] overflow-auto rounded-lg border border-slate-600 bg-slate-900 scroll-smooth"
            style={{ 
              scrollBehavior: 'smooth',
              overflowX: 'auto',
              overflowY: 'auto'
            }}
          >
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
                transition: 'transform 0.2s ease-out',
                // Make the scrollable area much larger to allow full grid navigation
                width: `${(space.width * CELL_SIZE + 1000) * zoom}px`, // Scale with zoom
                height: `${(space.height * CELL_SIZE + 1000) * zoom}px`, // Scale with zoom
                position: 'relative',
                minWidth: '100%',
                minHeight: '100%'
              }}
            >
              {/* Background padding area with subtle pattern */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  opacity: 0.3
                }}
              />
              
              {/* Canvas centered within the padded container */}
              <canvas
                ref={canvasRef}
                width={space.width * CELL_SIZE}
                height={space.height * CELL_SIZE}
                onClick={handleCanvasClick}
                onDoubleClick={handleCanvasDoubleClick}
                className="block shadow-lg"
                title="Double-click to teleport, use arrow keys to walk"
                style={{
                  position: 'absolute',
                  left: '500px', // Center the canvas within the padded area
                  top: '500px',   // Center the canvas within the padded area
                  border: '2px solid rgba(59, 130, 246, 0.3)', // Subtle border to show game area
                  borderRadius: '4px',
                  cursor: 'default' // Normal cursor, no special pointer
                }}
              />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-8 text-white text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            <span>You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <span>Other Players</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 border border-red-800"></div>
            <span>Obstacles (Elements)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
