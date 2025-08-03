export interface CCTVCamera {
  id: string;
  name: string;
  location: string;
  ipAddress: string;
  port: number;
  streamUrl: string;
  isOnline: boolean;
  networkType: 'internal' | 'external';
  lastSeen: Date;
  resolution: string;
  brand: string;
  model?: string;
  description?: string;
}

export interface CCTVGrid {
  rows: number;
  cols: number;
  cameras: (string | null)[];
}

export type ViewMode = 'grid' | 'list' | 'single' | 'quad';

export interface StreamSettings {
  quality: 'low' | 'medium' | 'high';
  autoRefresh: boolean;
  refreshInterval: number;
}