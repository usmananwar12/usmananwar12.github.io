import React, { useState } from 'react';
import { profile } from '../data/portfolio';
import { AppId, WindowState } from '../types/os';
import { AppIcon } from './AppIcons';

interface DockItem {
  id: AppId;
  label: string;
}

const dockApps: DockItem[] = [
  { id: 'finder', label: 'Finder' },
  { id: 'notes', label: 'Notes (About)' },
  { id: 'vscode', label: 'VS Code (Stack)' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'security', label: 'ChainSec Audits' },
  { id: 'safari', label: 'Safari (Work)' },
  { id: 'resume', label: 'Resume.pdf' },
  { id: 'mail', label: 'Mail (Contact)' },
  { id: 'settings', label: 'System Settings' },
];

interface DockProps {
  windows: Record<AppId, WindowState>;
  magnification: boolean;
  onLaunchApp: (id: AppId) => void;
}

export const Dock: React.FC<DockProps> = ({ windows, magnification, onLaunchApp }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getScale = (idx: number) => {
    if (!magnification || hoveredIdx === null) return 1;
    const dist = Math.abs(idx - hoveredIdx);
    if (dist === 0) return 1.36;
    if (dist === 1) return 1.18;
    if (dist === 2) return 1.07;
    return 1;
  };

  const totalMain = dockApps.length;

  return (
    <nav className="macos-dock-wrap" aria-label="Application Dock">
      <div
        className="macos-dock"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {dockApps.map((item, idx) => {
          const win = windows[item.id];
          const isRunning = win?.isOpen;
          const scale = getScale(idx);

          return (
            <button
              key={item.id}
              type="button"
              className="dock-item"
              style={{
                transform: `translateY(${(1 - scale) * 20}px) scale(${scale})`,
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onClick={() => onLaunchApp(item.id)}
              aria-label={item.label}
            >
              <span className="dock-tooltip">{item.label}</span>
              <span className="dock-icon">
                <AppIcon id={item.id} size={46} />
              </span>
              <span className={`dock-dot ${isRunning ? 'is-visible' : ''}`} />
            </button>
          );
        })}

        <div className="dock-divider" aria-hidden="true" />

        {/* External Quick Links */}
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-item dock-hide-sm"
          style={{
            transform: `translateY(${(1 - getScale(totalMain)) * 20}px) scale(${getScale(totalMain)})`,
          }}
          onMouseEnter={() => setHoveredIdx(totalMain)}
          aria-label="GitHub"
        >
          <span className="dock-tooltip">GitHub ↗</span>
          <span className="dock-icon">
            <AppIcon id="github" size={46} />
          </span>
          <span className="dock-dot" />
        </a>

        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-item dock-hide-sm"
          style={{
            transform: `translateY(${(1 - getScale(totalMain + 1)) * 20}px) scale(${getScale(totalMain + 1)})`,
          }}
          onMouseEnter={() => setHoveredIdx(totalMain + 1)}
          aria-label="LinkedIn"
        >
          <span className="dock-tooltip">LinkedIn ↗</span>
          <span className="dock-icon">
            <AppIcon id="linkedin" size={46} />
          </span>
          <span className="dock-dot" />
        </a>

        {/* Trash */}
        <button
          type="button"
          className="dock-item"
          style={{
            transform: `translateY(${(1 - getScale(totalMain + 2)) * 20}px) scale(${getScale(totalMain + 2)})`,
          }}
          onMouseEnter={() => setHoveredIdx(totalMain + 2)}
          onClick={() => onLaunchApp('trash')}
          aria-label="Trash"
        >
          <span className="dock-tooltip">Trash</span>
          <span className="dock-icon">
            <AppIcon id="trash" size={46} />
          </span>
          <span className={`dock-dot ${windows.trash?.isOpen ? 'is-visible' : ''}`} />
        </button>
      </div>
    </nav>
  );
};
