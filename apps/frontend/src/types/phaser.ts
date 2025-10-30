export interface Player {
  userId: string;
  username: string;
  avatar: Avatar;
  x: number;
  y: number;
}

export interface Avatar {
  id: number;
  name: string;
  imageUrl: string;
  avatarIdle: string;
  avatarRun: string;
}

export interface GameElement {
  x: number;
  y: number;
  elementImg: string;
  width: number;
  height: number;
  static: boolean;
}

export interface Space {
  id: string;
  width: number;
  height: number;
  bgImg: string;
  spaceElements: GameElement[];
}

export interface WebSocketMessage {
  type: string;
  payload: any;
}

export enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
  DOWN = 'down',
  UP = 'up',
  NONE = 'none',
}

// Phaser Game Props
export interface PhaserGameProps {
  token: string;
  spaceId: string;
}

// Game Scene Configuration
export interface GameSceneConfig {
  wsClient: WebSocket;
  token: string;
  spaceId: string;
  onUserIdReceived?: (userId: string) => void;
}
