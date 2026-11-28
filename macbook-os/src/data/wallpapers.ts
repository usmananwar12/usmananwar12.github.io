import { AccentId, WallpaperId } from '../types/os';

export interface WallpaperOption {
  id: WallpaperId;
  name: string;
  subtitle: string;
  kind: 'image' | 'live';
  image?: string;
  previewStyle: string;
}

export const wallpapers: WallpaperOption[] = [
  {
    id: 'event-horizon',
    name: 'Event Horizon',
    subtitle: 'Gargantua black hole in deep obsidian space',
    kind: 'image',
    image: '/wallpapers/event-horizon.jpg',
    previewStyle: "url('/wallpapers/event-horizon.jpg') center/cover no-repeat",
  },
  {
    id: 'obsidian-topo',
    name: 'Obsidian Topo',
    subtitle: 'Matte carbon 3D elevation & cyan contour ridges',
    kind: 'image',
    image: '/wallpapers/obsidian-topo.jpg',
    previewStyle: "url('/wallpapers/obsidian-topo.jpg') center/cover no-repeat",
  },
  {
    id: 'midnight-tokyo',
    name: 'Midnight Tokyo',
    subtitle: 'Rain-soaked cyber-noir skyline at midnight',
    kind: 'image',
    image: '/wallpapers/midnight-tokyo.jpg',
    previewStyle: "url('/wallpapers/midnight-tokyo.jpg') center/cover no-repeat",
  },
  {
    id: 'protocol-mesh',
    name: 'Protocol Mesh (Live)',
    subtitle: 'Interactive 60fps multi-chain node constellation',
    kind: 'live',
    previewStyle:
      'radial-gradient(circle at 28% 36%, rgba(56,189,248,0.55) 0%, transparent 45%), radial-gradient(circle at 74% 66%, rgba(168,85,247,0.45) 0%, transparent 50%), linear-gradient(155deg, #030712 0%, #091428 100%)',
  },
  {
    id: 'cipher-rain',
    name: 'Cipher Rain (Live)',
    subtitle: 'Subtle obsidian hex & EVM/Cairo glyph stream',
    kind: 'live',
    previewStyle:
      'radial-gradient(circle at 50% 20%, rgba(16,185,129,0.42) 0%, transparent 55%), repeating-linear-gradient(90deg, rgba(16,185,129,0.12) 0 1px, transparent 1px 10px), linear-gradient(180deg, #02080a 0%, #041517 100%)',
  },
];

export const accentColors: Record<AccentId, { label: string; value: string; rgb: string }> = {
  blue: { label: 'macOS Blue', value: '#0a84ff', rgb: '10, 132, 255' },
  cyan: { label: 'Protocol Cyan', value: '#38bdf8', rgb: '56, 189, 248' },
  purple: { label: 'Starknet Violet', value: '#a855f7', rgb: '168, 85, 247' },
  emerald: { label: 'PayFi Mint', value: '#10b981', rgb: '16, 185, 129' },
  orange: { label: 'Audit Amber', value: '#f97316', rgb: '249, 115, 22' },
};
