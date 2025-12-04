export interface WishResponse {
  blessing: string;
  colorTheme: string; // Hex code for lighting adaptation
}

export enum AppState {
  IDLE = 'IDLE',
  WISHING = 'WISHING',
  GENERATING = 'GENERATING',
  REVEAL = 'REVEAL'
}

export interface TreeConfig {
  primaryColor: string;
  secondaryColor: string;
  glowIntensity: number;
}