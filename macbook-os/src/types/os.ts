export type AppId =
  | 'finder'
  | 'notes'
  | 'vscode'
  | 'terminal'
  | 'security'
  | 'safari'
  | 'resume'
  | 'mail'
  | 'settings'
  | 'trash';

export type ThemeMode = 'dark' | 'light';

export type AccentId = 'blue' | 'cyan' | 'purple' | 'emerald' | 'orange';

export type WallpaperId =
  | 'event-horizon'
  | 'obsidian-topo'
  | 'midnight-tokyo'
  | 'protocol-mesh'
  | 'cipher-rain';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  /** Optional deep-link context passed when opening an app (e.g. a specific Finder section or Note) */
  payload?: string;
}

export interface DesktopContextMenuState {
  x: number;
  y: number;
}
