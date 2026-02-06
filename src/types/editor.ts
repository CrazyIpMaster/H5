
export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';

export interface EditorLayer {
  id: string;
  type: 'image' | 'text' | 'svg';
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  zIndex: number;
  content: string; // URL for image, text content for text, SVG string for svg
  style?: Record<string, any>; // For text styles (font, color, etc.)
}

export interface EditorState {
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor: string;
  layers: EditorLayer[];
  selectedLayerIds: string[];
}

export interface HistoryEntry {
  id: number;
  timestamp: number;
  state: EditorState;
  thumbnail?: string; // Optional snapshot for UI
}
