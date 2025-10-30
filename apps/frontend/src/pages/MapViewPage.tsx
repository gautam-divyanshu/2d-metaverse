import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  Minimize,
} from 'lucide-react';

interface MapElement {
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

interface MapSpace {
  id: number;
  spaceId: number;
  spaceName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  elements: SpaceElement[];
}

interface MapData {
  id: number;
  name: string;
  width: number;
  height: number;
  ownerId: number;
  owner: string;
  elements: MapElement[];
  mapSpaces: MapSpace[];
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

interface ChatMessage {
  id?: number;
  userId: string;
  displayName: string;
  text: string;
  createdAt: string;
}

const CELL_SIZE = 32; // pixels per grid cell

export const MapViewPage = () => {
  const { mapId } = useParams<{ mapId: string }>();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<MapData | null>(null);
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  // Check if user is the owner of this map
  const isOwner = map && user && map.ownerId === parseInt(user.id);

  useEffect(() => {
    fetchMapData();
    return () => {
      // Clear user state on component unmount
      setUsers(new Map());
      setCurrentUser(null);
    };
  }, [mapId]);

  useEffect(() => {
    if (map && user) {
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [map, user, mapId]);

  useEffect(() => {
    if (map && currentUser) {
      // Use requestAnimationFrame for smoother rendering
      const animationId = requestAnimationFrame(() => {
        drawCanvas();
      });

      return () => cancelAnimationFrame(animationId);
    }
  }, [map, currentUser, users]);

  const fetchMapData = async () => {
    try {
      console.log('Fetching map data for mapId:', mapId);
      console.log('Token:', token);

      const response = await fetch(
        `http://localhost:3000/api/v1/map/${mapId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('Map data:', data);
        setMap(data);
        setIsLoading(false);
      } else {
        const errorData = await response.text();
        console.log('Error response:', errorData);
        setError('Failed to load map');
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
      // Join the map
      ws.send(
        JSON.stringify({
          type: 'join',
          payload: {
            mapId: parseInt(mapId!),
            token: token,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'map-joined':
          // Initialize current user position
          const spawnX = message.payload.spawn.x;
          const spawnY = message.payload.spawn.y;

          setCurrentUser({
            x: spawnX,
            y: spawnY,
            userId: message.payload.userId,
          });

          // Load chat messages from server
          if (message.payload.messages) {
            setChatMessages(message.payload.messages);
          }

          // Reset zoom to 100% (normal view)
          setZoom(1);

          // Center the scroll position on the player's spawn location
          setTimeout(() => {
            centerScrollOnPlayer(spawnX, spawnY, false);
          }, 100);

          // Initialize other users from the payload
          const userMap = new Map();
          message.payload.users.forEach((u: any) => {
            if (u.userId && u.userId !== message.payload.userId) {
              userMap.set(u.userId, {
                id: u.userId,
                x: u.x || 0,
                y: u.y || 0,
              });
            }
          });
          setUsers(userMap);
          break;

        case 'user-joined':
          setUsers((prev) => {
            const newUsers = new Map(prev);
            if (
              message.payload.userId !== currentUser?.userId &&
              !newUsers.has(message.payload.userId)
            ) {
              newUsers.set(message.payload.userId, {
                id: message.payload.userId,
                x: message.payload.x || 0,
                y: message.payload.y || 0,
              });
            }
            return newUsers;
          });
          break;

        case 'user-left':
          setUsers((prev) => {
            const newUsers = new Map(prev);
            newUsers.delete(message.payload.userId);
            return newUsers;
          });
          break;

        case 'movement':
          if (message.payload.userId !== currentUser?.userId) {
            setUsers((prev) => {
              const newUsers = new Map(prev);
              const user = newUsers.get(message.payload.userId);
              if (user) {
                newUsers.set(message.payload.userId, {
                  ...user,
                  x: message.payload.x,
                  y: message.payload.y,
                });
              }
              return newUsers;
            });
          }
          break;

        case 'movement-accepted':
          setCurrentUser((prev) =>
            prev
              ? {
                  ...prev,
                  x: message.payload.x,
                  y: message.payload.y,
                }
              : null
          );
          break;

        case 'movement-rejected':
          setCurrentUser((prev) =>
            prev
              ? {
                  ...prev,
                  x: message.payload.x,
                  y: message.payload.y,
                }
              : null
          );
          break;

        case 'chat':
          setChatMessages((prev) => [
            ...prev,
            {
              id: message.payload.id,
              userId: message.payload.userId,
              displayName: message.payload.displayName,
              text: message.payload.text,
              createdAt: message.payload.createdAt,
            },
          ]);
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
    if (
      !currentUser ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    )
      return;

    let newX = currentUser.x;
    let newY = currentUser.y;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newY = Math.max(0, currentUser.y - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newY = Math.min(map!.height - 1, currentUser.y + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newX = Math.max(0, currentUser.x - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newX = Math.min(map!.width - 1, currentUser.x + 1);
        break;
      default:
        return;
    }

    if (newX !== currentUser.x || newY !== currentUser.y) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              x: newX,
              y: newY,
            }
          : null
      );

      wsRef.current.send(
        JSON.stringify({
          type: 'move',
          payload: {
            x: newX,
            y: newY,
            userId: currentUser.userId,
          },
        })
      );
    }
  };

  const handleCanvasDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (
      !currentUser ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN ||
      !map
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const canvasClickX = e.clientX - rect.left;
    const canvasClickY = e.clientY - rect.top;
    const x = Math.floor(canvasClickX / CELL_SIZE);
    const y = Math.floor(canvasClickY / CELL_SIZE);

    if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
      return;
    }

    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            x: x,
            y: y,
          }
        : null
    );

    wsRef.current.send(
      JSON.stringify({
        type: 'move',
        payload: {
          x: x,
          y: y,
          userId: currentUser.userId,
          teleport: true,
        },
      })
    );
  };

  const sendChatMessage = () => {
    if (
      !newMessage.trim() ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN ||
      !user
    ) {
      return;
    }

    wsRef.current.send(
      JSON.stringify({
        type: 'chat',
        payload: {
          text: newMessage.trim(),
          displayName: user.username || `User ${user.id}`,
        },
      })
    );

    setNewMessage('');
  };

  const handleChatKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
        return;
      }

      handleKeyDown(e);
    };

    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [currentUser, map, isFullscreen]);

  const enterFullscreen = () => {
    const canvasContainer = document.querySelector(
      '.canvas-container'
    ) as HTMLElement;
    if (canvasContainer && canvasContainer.requestFullscreen) {
      canvasContainer.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const zoomInCentered = () => {
    setZoom(Math.min(3, zoom + 0.25));
  };

  const zoomOutCentered = () => {
    setZoom(Math.max(0.25, zoom - 0.25));
  };

  const centerScrollOnPlayer = (
    playerX: number,
    playerY: number,
    smooth = false
  ) => {
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
          behavior: 'smooth',
        });
      } else {
        scrollContainer.scrollLeft = Math.max(0, scrollLeft);
        scrollContainer.scrollTop = Math.max(0, scrollTop);
      }
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !map || !currentUser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2a2a3e';
    ctx.lineWidth = 1;
    for (let x = 0; x <= map.width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL_SIZE, 0);
      ctx.lineTo(x * CELL_SIZE, map.height * CELL_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= map.height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL_SIZE);
      ctx.lineTo(map.width * CELL_SIZE, y * CELL_SIZE);
      ctx.stroke();
    }

    // Draw elements (all elements are obstacles/non-walkable)
    map.elements.forEach((element) => {
      const elemX = element.x * CELL_SIZE;
      const elemY = element.y * CELL_SIZE;
      const elemWidth = element.element.width * CELL_SIZE;
      const elemHeight = element.element.height * CELL_SIZE;

      // Use lighter red colors and rounded corners
      ctx.fillStyle = '#fca5a5';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;

      // Draw rounded rectangle for obstacles
      const cornerRadius = 8;
      ctx.beginPath();
      ctx.roundRect(elemX, elemY, elemWidth, elemHeight, cornerRadius);
      ctx.fill();
      ctx.stroke();

      // Add text label showing element ID (E{elementId})
      ctx.fillStyle = '#7f1d1d';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = elemX + elemWidth / 2;
      const centerY = elemY + elemHeight / 2;

      ctx.fillText(`E${element.element.id}`, centerX, centerY);
    });

    // Draw map spaces (walkable areas)
    map.mapSpaces?.forEach((mapSpace) => {
      const spaceX = mapSpace.x * CELL_SIZE;
      const spaceY = mapSpace.y * CELL_SIZE;
      const spaceWidth = mapSpace.width * CELL_SIZE;
      const spaceHeight = mapSpace.height * CELL_SIZE;

      // Use green colors for walkable spaces
      ctx.fillStyle = '#86efac';
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 2;

      // Draw rounded rectangle for spaces
      const cornerRadius = 8;
      ctx.beginPath();
      ctx.roundRect(spaceX, spaceY, spaceWidth, spaceHeight, cornerRadius);
      ctx.fill();
      ctx.stroke();

      // Add text label showing space name
      ctx.fillStyle = '#15803d';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = spaceX + spaceWidth / 2;
      const centerY = spaceY + spaceHeight / 2;

      ctx.fillText(
        mapSpace.spaceName.length > 8
          ? mapSpace.spaceName.slice(0, 8) + '...'
          : mapSpace.spaceName,
        centerX,
        centerY
      );
    });

    // Draw space elements (elements inside each space)
    map.mapSpaces?.forEach((mapSpace) => {
      mapSpace.elements?.forEach((spaceElement) => {
        // Calculate absolute position: space position + element position within space
        const elemX = (mapSpace.x + spaceElement.x) * CELL_SIZE;
        const elemY = (mapSpace.y + spaceElement.y) * CELL_SIZE;
        const elemWidth = spaceElement.element.width * CELL_SIZE;
        const elemHeight = spaceElement.element.height * CELL_SIZE;

        // Use blue colors for space elements to distinguish from map elements
        ctx.fillStyle = '#93c5fd';
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;

        // Draw rounded rectangle for space elements
        const cornerRadius = 8;
        ctx.beginPath();
        ctx.roundRect(elemX, elemY, elemWidth, elemHeight, cornerRadius);
        ctx.fill();
        ctx.stroke();

        // Add text label showing element ID (SE{elementId})
        ctx.fillStyle = '#1e40af';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const centerX = elemX + elemWidth / 2;
        const centerY = elemY + elemHeight / 2;

        ctx.fillText(`SE${spaceElement.element.id}`, centerX, centerY);
      });
    });

    // Draw other users
    users.forEach((user) => {
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
    ctx.fillText(
      'You',
      currentUser.x * CELL_SIZE + CELL_SIZE / 2,
      currentUser.y * CELL_SIZE + CELL_SIZE / 2 + 25
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !map) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="mb-4">{error || 'Map not found'}</p>
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
            <h1 className="text-3xl font-bold text-white">{map.name}</h1>
            <p className="text-slate-400 text-sm">Created by {map.owner}</p>
            {currentUser && (
              <div className="text-sm text-slate-400 mt-1">
                <p>
                  Position: ({currentUser.x}, {currentUser.y})
                </p>
                <p>
                  User ID: {String(currentUser.userId || 'Unknown').slice(-8)}
                </p>
                <p>Map ID: {mapId}</p>
              </div>
            )}
          </div>

          {/* Edit button for map owner only */}
          <div className="flex items-center gap-4">
            {isOwner && (
              <button
                onClick={() => navigate(`/map/${map.id}/edit`)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Edit Map
              </button>
            )}
            <div className="text-white">
              <p className="text-sm text-slate-400">Users online</p>
              <p className="text-2xl font-bold">
                {users.size + (currentUser ? 1 : 0)}
              </p>
              <div className="text-xs text-slate-500 mt-1">
                Other Users:{' '}
                {Array.from(users.entries())
                  .map(
                    ([id, user]) =>
                      `${String(id).slice(-4)}:(${user.x},${user.y})`
                  )
                  .join(', ') || 'None'}
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
                  if (currentUser) {
                    centerScrollOnPlayer(currentUser.x, currentUser.y, true);
                  }
                }}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                title="Reset Zoom & Center on Player"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={isFullscreen ? exitFullscreen : enterFullscreen}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                title={
                  isFullscreen ? 'Exit Fullscreen (ESC)' : 'Enter Fullscreen'
                }
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="text-slate-300 text-sm">
              Arrows to move • Double-click-teleport • Scroll to navigate • ESC
              exits fullscreen
            </div>
          </div>

          {/* Canvas Container with Scrollable Area */}
          <div
            className={`canvas-container ${
              isFullscreen
                ? 'fixed inset-0 z-50 flex bg-slate-900'
                : 'flex rounded-lg border border-slate-600 bg-slate-900 h-[60vh]'
            }`}
          >
            {/* Game Area (70% width in both normal and fullscreen modes) */}
            <div
              className="flex-[0.7] overflow-auto"
              style={{
                scrollBehavior: 'smooth',
                overflowX: 'auto',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                  transition: 'transform 0.2s ease-out',
                  width: `${(map.width * CELL_SIZE + 1000) * zoom}px`,
                  height: `${(map.height * CELL_SIZE + 1000) * zoom}px`,
                  position: 'relative',
                  minWidth: '100%',
                  minHeight: '100%',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(30, 41, 59, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    opacity: 0.3,
                  }}
                />

                <canvas
                  ref={canvasRef}
                  width={map.width * CELL_SIZE}
                  height={map.height * CELL_SIZE}
                  onDoubleClick={handleCanvasDoubleClick}
                  className="block shadow-lg"
                  title="Double-click to teleport, use arrow keys to walk"
                  style={{
                    position: 'absolute',
                    left: '500px',
                    top: '500px',
                    border: '2px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '4px',
                    cursor: 'default',
                  }}
                />
              </div>
            </div>

            {/* Chat Panel (30% width - always show if currentUser exists) */}
            {currentUser && (
              <div className="flex-[0.3] bg-slate-800 border-l border-slate-600 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-600">
                  <h3 className="text-white font-semibold">Map Chat</h3>
                  <p className="text-slate-400 text-sm">
                    {users.size + 1} users online
                  </p>
                </div>

                {/* Chat Messages */}
                <div
                  ref={chatMessagesRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                >
                  {chatMessages.length === 0 ? (
                    <div className="text-slate-400 text-sm text-center py-8">
                      No messages yet. Say hello! 👋
                    </div>
                  ) : (
                    chatMessages.map((message) => (
                      <div
                        key={message.id || Math.random()}
                        className="space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              message.userId === currentUser?.userId
                                ? 'bg-green-500'
                                : 'bg-orange-500'
                            }`}
                          />
                          <span className="text-slate-300 text-xs font-medium">
                            {message.displayName}
                          </span>
                          <span className="text-slate-500 text-xs">
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )}
                          </span>
                        </div>
                        <div className="text-white text-sm ml-4 pl-2 border-l border-slate-600">
                          {message.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-slate-600">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleChatKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                      maxLength={2000}
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs mt-2">
                    Press Enter to send • Chat history is saved
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-8 text-white text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            <span>You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
            <span>Other Players</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-300 border-2 border-red-500 rounded"></div>
            <span>Obstacles (Elements)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
