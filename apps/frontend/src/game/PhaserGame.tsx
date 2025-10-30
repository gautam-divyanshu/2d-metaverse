import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Phaser from 'phaser';
import { GameScene } from './GameScene.ts';
import { PhaserGameProps } from '../types/phaser';
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Minimize } from 'lucide-react';

interface PhaserGameRef {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  toggleFullscreen: () => void;
}

interface PhaserGameComponentProps extends PhaserGameProps {
  className?: string;
}

export const PhaserGame = forwardRef<PhaserGameRef, PhaserGameComponentProps>(
  ({ token, spaceId, className }, ref) => {
    const gameRef = useRef<HTMLDivElement>(null);
    const gameInstanceRef = useRef<Phaser.Game | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const [zoom, setZoom] = useState<number>(1);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      zoomIn: handleZoomIn,
      zoomOut: handleZoomOut,
      resetView: handleResetView,
      toggleFullscreen: handleToggleFullscreen,
    }));

    const handleZoomIn = () => {
      if (gameInstanceRef.current) {
        const scene = gameInstanceRef.current.scene.getScene(
          'GameScene'
        ) as GameScene;
        if (scene && scene.cameras) {
          const newZoom = Math.min(zoom * 1.2, 3);
          scene.cameras.main.setZoom(newZoom);
          setZoom(newZoom);
        }
      }
    };

    const handleZoomOut = () => {
      if (gameInstanceRef.current) {
        const scene = gameInstanceRef.current.scene.getScene(
          'GameScene'
        ) as GameScene;
        if (scene && scene.cameras) {
          const newZoom = Math.max(zoom / 1.2, 0.3);
          scene.cameras.main.setZoom(newZoom);
          setZoom(newZoom);
        }
      }
    };

    const handleResetView = () => {
      if (gameInstanceRef.current) {
        const scene = gameInstanceRef.current.scene.getScene(
          'GameScene'
        ) as GameScene;
        if (scene && scene.cameras) {
          scene.cameras.main.setZoom(1);
          setZoom(1);
        }
      }
    };

    const handleToggleFullscreen = () => {
      if (gameRef.current) {
        if (!isFullscreen) {
          gameRef.current
            .requestFullscreen()
            .then(() => {
              setIsFullscreen(true);
            })
            .catch((err) => {
              console.error('Error entering fullscreen:', err);
            });
        } else {
          document
            .exitFullscreen()
            .then(() => {
              setIsFullscreen(false);
            })
            .catch((err) => {
              console.error('Error exiting fullscreen:', err);
            });
        }
      }
    };

    useEffect(() => {
      if (!gameRef.current) return;

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

      // Create game instance
      gameInstanceRef.current = new Phaser.Game(config);

      // Wait for scene to be ready
      const interval = setInterval(() => {
        const scene = gameInstanceRef.current!.scene.getScene(
          'GameScene'
        ) as GameScene;
        if (scene) {
          clearInterval(interval);

          wsRef.current = new WebSocket('ws://localhost:3001');

          wsRef.current.onopen = () => {
            if (!wsRef.current) return;

            const onUserIdReceived = (userId: string) => {
              console.log('User ID received:', userId);
            };

            scene.init({
              wsClient: wsRef.current,
              token,
              spaceId,
              onUserIdRecieved: onUserIdReceived,
            });

            // Join message will be sent by GameScene when it receives workers-created
          };

          wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
          };

          wsRef.current.onclose = () => {
            console.log('WebSocket closed');
          };
        }
      }, 1000);

      // Cleanup function
      return () => {
        clearInterval(interval);
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
        if (gameInstanceRef.current) {
          gameInstanceRef.current.destroy(true);
          gameInstanceRef.current = null;
        }
      };
    }, [token, spaceId]);

    // Handle fullscreen change events
    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => {
        document.removeEventListener(
          'fullscreenchange',
          handleFullscreenChange
        );
      };
    }, []);

    return (
      <div className={`relative ${className || 'w-full h-full'}`}>
        {/* Game Container */}
        <div
          ref={gameRef}
          className="w-full h-full bg-gray-100"
          style={{ minHeight: '400px' }}
        />

        {/* Game Controls */}
        <div className="absolute top-4 right-4 flex gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>

          <button
            onClick={handleResetView}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleToggleFullscreen}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5" />
            ) : (
              <Maximize className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium shadow-lg">
          {Math.round(zoom * 100)}%
        </div>
      </div>
    );
  }
);

PhaserGame.displayName = 'PhaserGame';

export type { PhaserGameRef };
