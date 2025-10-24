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

const CELL_SIZE = 32; // pixels per grid cell

export const SpaceViewPage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  
  const [space, setSpace] = useState<SpaceData | null>(null);
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [myPosition, setMyPosition] = useState<{ x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Check if user is the owner of this space
  const isOwner = space && user && space.ownerId === parseInt(user.id);

  useEffect(() => {
    fetchSpaceData();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [spaceId]);

  useEffect(() => {
    if (space && myPosition) {
      connectWebSocket();
    }
  }, [space]);

  useEffect(() => {
    if (space && myPosition) {
      drawCanvas();
    }
  }, [space, myPosition, users]);

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
    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      // Join the space
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
      console.log('WebSocket message:', message);

      switch (message.type) {
        case 'space-joined':
          setMyPosition(message.payload.spawn);
          // Add existing users
          message.payload.users.forEach((u: { id: string }) => {
            setUsers(prev => new Map(prev).set(u.id, { id: u.id, x: 0, y: 0 }));
          });
          break;
        
        case 'user-joined':
          setUsers(prev => {
            const newUsers = new Map(prev);
            newUsers.set(message.payload.userId, {
              id: message.payload.userId,
              x: message.payload.x,
              y: message.payload.y
            });
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
          setUsers(prev => {
            const newUsers = new Map(prev);
            const user = newUsers.get(message.payload.userId);
            if (user) {
              user.x = message.payload.x;
              user.y = message.payload.y;
            }
            return newUsers;
          });
          break;
        
        case 'movement-rejected':
          setMyPosition(message.payload);
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
    if (!myPosition || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    let newX = myPosition.x;
    let newY = myPosition.y;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        newY = Math.max(0, myPosition.y - 1);
        break;
      case 'ArrowDown':
      case 's':
        newY = Math.min(space!.height - 1, myPosition.y + 1);
        break;
      case 'ArrowLeft':
      case 'a':
        newX = Math.max(0, myPosition.x - 1);
        break;
      case 'ArrowRight':
      case 'd':
        newX = Math.min(space!.width - 1, myPosition.x + 1);
        break;
      default:
        return;
    }

    if (newX !== myPosition.x || newY !== myPosition.y) {
      wsRef.current.send(JSON.stringify({
        type: 'move',
        payload: { x: newX, y: newY }
      }));
      setMyPosition({ x: newX, y: newY });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!myPosition || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN || !space) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasContainer = canvas.parentElement;
    if (!canvasContainer) return;

    const containerRect = canvasContainer.getBoundingClientRect();
    
    // Account for zoom and pan
    const x = Math.floor(((e.clientX - containerRect.left) / zoom - pan.x) / CELL_SIZE);
    const y = Math.floor(((e.clientY - containerRect.top) / zoom - pan.y) / CELL_SIZE);

    // Validate bounds
    if (x < 0 || x >= space.width || y < 0 || y >= space.height) return;

    // Send movement to WebSocket
    wsRef.current.send(JSON.stringify({
      type: 'movement',
      payload: { x, y }
    }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [myPosition, space]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !space || !myPosition) return;

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

    // Draw elements
    space.elements.forEach((element) => {
      ctx.fillStyle = '#4a5568';
      ctx.fillRect(
        element.x * CELL_SIZE,
        element.y * CELL_SIZE,
        element.element.width * CELL_SIZE,
        element.element.height * CELL_SIZE
      );
      ctx.strokeStyle = '#718096';
      ctx.strokeRect(
        element.x * CELL_SIZE,
        element.y * CELL_SIZE,
        element.element.width * CELL_SIZE,
        element.element.height * CELL_SIZE
      );
    });

    // Draw other users
    users.forEach((user) => {
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
    });

    // Draw current user
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(
      myPosition.x * CELL_SIZE + CELL_SIZE / 2,
      myPosition.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw current user border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
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
            <p className="text-slate-400">Use arrow keys or WASD to move</p>
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
              <p className="text-2xl font-bold">{users.size + 1}</p>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          {/* Zoom Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-white text-sm px-3 py-1 bg-slate-700 rounded">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            <div className="text-slate-300 text-sm">
              Click to move • Use controls to zoom
            </div>
          </div>
          
          {/* Canvas Container */}
          <div className="max-h-[70vh] overflow-auto rounded-lg border border-slate-600 bg-slate-900">
            <div
              style={{
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: 'top left',
                transition: 'transform 0.1s ease-out'
              }}
            >
              <canvas
                ref={canvasRef}
                width={space.width * CELL_SIZE}
                height={space.height * CELL_SIZE}
                onClick={handleCanvasClick}
                className="block cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-8 text-white">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            <span>You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <span>Other Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 border border-gray-500"></div>
            <span>Elements</span>
          </div>
        </div>
      </div>
    </div>
  );
};
