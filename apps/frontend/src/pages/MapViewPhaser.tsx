import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { ChatPanel } from '../components/map/ChatPanel';
import Phaser from 'phaser';
import { ArrowLeft } from 'lucide-react';
import { GameScene } from '../game/GameScene';
import { useWebSocket } from '../hooks/useWebSocket';
import { User, CurrentUser, ChatMessage, MapData } from '../game/types';

export const MapViewPhaser = () => {
  const { mapId } = useParams<{ mapId: string }>();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<GameScene | null>(null);

  const [map, setMap] = useState<MapData | null>(null);
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [gameReady, setGameReady] = useState(false);

  const isOwner = map && user && map.ownerId === parseInt(user.id);

  // Fetch map data
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/maps/map/${mapId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMap(data);
          setIsLoading(false);
        } else {
          setError('Failed to load map');
          setIsLoading(false);
        }
      } catch (err) {
        setError('Network error');
        setIsLoading(false);
      }
    };

    fetchMapData();

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
      }
    };
  }, [mapId, token]);

  // Initialize Phaser game
  useEffect(() => {
    if (map && user && gameRef.current && !gameInstance.current) {
      const container = gameRef.current;
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: container.clientWidth,
        height: container.clientHeight,
        parent: container,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
          },
        },
        scene: new GameScene(handleMovement),
      };

      gameInstance.current = new Phaser.Game(config);
      gameInstance.current.events.on('ready', () => {
        sceneRef.current = gameInstance.current!.scene.getScene(
          'GameScene'
        ) as GameScene;
        setGameReady(true);
      });

      const handleResize = () => {
        if (gameInstance.current) {
          gameInstance.current.scale.resize(
            container.clientWidth,
            container.clientHeight
          );
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [map, user]);

  // WebSocket connection - only after game is ready
  const wsRef = useWebSocket({
    mapId: mapId!,
    token,
    sceneRef,
    setCurrentUser,
    setUsers,
    setChatMessages,
    setError,
    gameReady,
  });

  const handleMovement = (x: number, y: number) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log(`Sending movement to (${x}, ${y})`);
      wsRef.current.send(
        JSON.stringify({
          type: 'move',
          payload: {
            x,
            y,
            userId: user?.id,
          },
        })
      );
    } else {
      console.warn('Cannot send movement - WebSocket not open');
    }
  };

  const sendChatMessage = () => {
    if (
      !newMessage.trim() ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN ||
      !user
    )
      return;

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
          </div>

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
            </div>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex">
            <div className="flex-[0.7]">
              <div
                ref={gameRef}
                className="w-full h-[60vh] bg-black rounded-lg cursor-grab active:cursor-grabbing"
                onClick={() => {
                  if (gameInstance.current?.canvas) {
                    gameInstance.current.canvas.focus();
                  }
                }}
                tabIndex={0}
              ></div>
            </div>

            {currentUser && (
              <ChatPanel
                currentUser={currentUser}
                users={users}
                chatMessages={chatMessages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                onSendMessage={sendChatMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
