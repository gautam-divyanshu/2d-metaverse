import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Phaser from 'phaser';
import { GameScene } from '../game/GameScene.ts';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';
import { Chat } from '../components/Chat';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';

interface SpaceData {
  id: number;
  name: string;
  width: number;
  height: number;
  ownerId: number;
}

export const SpaceViewPage = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const gameRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);

  const [space, setSpace] = useState<SpaceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // User tracking state
  const [onlineUsers, setOnlineUsers] = useState<
    Map<string, { x: number; y: number; username: string }>
  >(new Map());
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Chat state
  const [messages, setMessages] = useState<
    Array<{
      id: number;
      userId: number;
      displayName: string;
      text: string;
      createdAt: string;
    }>
  >([]);

  // Check if user is the owner of this space
  const isOwner = space && user && space.ownerId === parseInt(user.id);

  // Fetch space data
  useEffect(() => {
    if (spaceId && token) {
      fetchSpaceData();
    }
  }, [spaceId, token]);

  // Fetch chat messages
  const fetchChatMessages = async () => {
    if (!spaceId || !token) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/space/${spaceId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchSpaceData = async () => {
    if (!spaceId || !token) return;

    try {
      console.log('Fetching space data for spaceId:', spaceId);
      const response = await fetch(
        `http://localhost:3000/api/v1/space/${spaceId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Space data:', data);
        setSpace(data);
        setIsLoading(false);
      } else {
        setError('Failed to load space');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching space data:', error);
      setError('Failed to load space');
      setIsLoading(false);
    }
  };

  // Zoom functions removed - not needed for the simplified UI

  // Chat message handler
  const handleSendMessage = (messageText: string) => {
    if (wsRef.current && messageText.trim()) {
      // Send to server - let the server broadcast to all users including sender
      wsRef.current.send(
        JSON.stringify({
          class: 'chat',
          type: 'send-message',
          payload: {
            spaceId: parseInt(spaceId!),
            text: messageText.trim(),
          },
        })
      );
    }
  };

  // Fullscreen functions
  const enterFullscreen = () => {
    const gameContainer = document.querySelector(
      '.phaser-game-container'
    ) as HTMLElement;
    if (gameContainer && gameContainer.requestFullscreen) {
      gameContainer.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Initialize Phaser only after space data is loaded and UI is rendered
  useEffect(() => {
    if (!gameRef.current || !space || !token || !spaceId || isLoading) {
      console.log('Phaser init conditions not met:', {
        gameRef: !!gameRef.current,
        space: !!space,
        token: !!token,
        spaceId: !!spaceId,
        isLoading,
      });
      return;
    }

    console.log('Initializing Phaser game...', gameRef.current);

    // Add a small delay to ensure DOM is fully rendered
    const initTimeout = setTimeout(() => {
      if (!gameRef.current) {
        console.error('Game ref lost during timeout');
        return;
      }

      // Initialize Phaser
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameRef.current,
        backgroundColor: '#ffffff',
        scale: {
          mode: Phaser.Scale.RESIZE,
          width: '100%',
          height: '100%',
        },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
        scene: GameScene,
        audio: {
          disableWebAudio: true,
        },
      };

      console.log('Creating Phaser game instance...', config);
      // Create game instance
      gameInstanceRef.current = new Phaser.Game(config);

      // Waiting for scene:
      const interval = setInterval(() => {
        const scene = gameInstanceRef.current!.scene.getScene(
          'GameScene'
        ) as GameScene;
        if (scene) {
          clearInterval(interval);

          wsRef.current = new WebSocket('ws://localhost:3001');

          wsRef.current.onopen = () => {
            if (!wsRef.current) return;

            const onUserIdRecieved = (userId: string) => {
              console.log('User ID received:', userId);
              setCurrentUserId(userId);
            };

            const onUserJoined = (
              userId: string,
              username: string,
              x: number,
              y: number
            ) => {
              console.log('User joined UI update:', { userId, username, x, y });
              setOnlineUsers((prev) =>
                new Map(prev).set(userId, { x, y, username })
              );
            };

            const onUserMoved = (userId: string, x: number, y: number) => {
              console.log('User moved UI update:', { userId, x, y });
              if (userId === currentUserId) {
                // Current user position tracking removed
              } else {
                setOnlineUsers((prev) => {
                  const newMap = new Map(prev);
                  const user = newMap.get(userId);
                  if (user) {
                    newMap.set(userId, { ...user, x, y });
                  }
                  return newMap;
                });
              }
            };

            const onUserLeft = (userId: string) => {
              console.log('User left UI update:', userId);
              setOnlineUsers((prev) => {
                const newMap = new Map(prev);
                newMap.delete(userId);
                return newMap;
              });
            };

            const onSpaceJoined = (
              users: any[],
              currentUser: { x: number; y: number }
            ) => {
              console.log('Space joined UI update:', { users, currentUser });
              // Current user position tracking removed
              const userMap = new Map();
              users.forEach((user) => {
                if (user.userId && user.userId !== currentUserId) {
                  userMap.set(user.userId, {
                    x: user.x,
                    y: user.y,
                    username: user.username,
                  });
                }
              });
              setOnlineUsers(userMap);
              // Fetch existing chat messages
              fetchChatMessages();
            };

            const onChatMessage = (message: any) => {
              console.log('New chat message received:', message);
              setMessages((prev) => [
                ...prev,
                {
                  id: message.id,
                  userId: message.userId,
                  displayName: message.displayName,
                  text: message.text,
                  createdAt: message.createdAt,
                },
              ]);
            };

            scene.init({
              wsClient: wsRef.current,
              token: token!,
              spaceId: spaceId!,
              onUserIdRecieved,
              onUserJoined,
              onUserMoved,
              onUserLeft,
              onSpaceJoined,
              onChatMessage,
            });
          };

          wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
          };

          wsRef.current.onclose = () => {
            console.log('WebSocket closed');
          };
        }
      }, 1000);
    }, 100); // 100ms delay for DOM rendering

    window.addEventListener('unload', () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
      }
    });

    // Cleanup
    return () => {
      clearTimeout(initTimeout);
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
      }
    };
  }, [token, spaceId, space, isLoading]);

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Please log in to view this space.</div>
      </div>
    );
  }

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
            <div className="text-sm text-slate-400 mt-1">
              <p>Space ID: {spaceId}</p>
              <p>
                Size: {space.width} × {space.height}
              </p>
            </div>
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
              <p className="text-2xl font-bold">{onlineUsers.size + 1}</p>
            </div>
          </div>
        </div>

        {/* Game and Chat Container */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          {/* Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
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
              Arrow keys to move • ESC exits fullscreen
            </div>
          </div>

          {/* Game and Chat Layout */}
          <div
            className={`phaser-game-container ${
              isFullscreen
                ? 'fixed inset-0 z-50 flex bg-slate-900'
                : 'rounded-lg border border-slate-600 bg-slate-900 h-[60vh] w-full flex'
            }`}
          >
            {/* Game Area - 70% */}
            <div className="w-[70%] h-full relative">
              <div ref={gameRef} className="w-full h-full" />
            </div>

            {/* Chat Area - 30% */}
            <div className="w-[30%] h-full">
              <Chat
                spaceId={spaceId!}
                currentUserId={currentUserId}
                isFullscreen={isFullscreen}
                onSendMessage={handleSendMessage}
                messages={messages}
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
            <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
            <span>Other Players</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-300 border-2 border-gray-700 rounded"></div>
            <span>Obstacles (Elements)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceViewPage;
