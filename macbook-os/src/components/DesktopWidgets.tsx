import React, { useState } from 'react';
import { FileText, Folder, Shield, Terminal } from 'lucide-react';
import { chainEcosystems, profile } from '../data/portfolio';
import { AppId } from '../types/os';

interface DesktopWidgetsProps {
  onOpenApp: (id: AppId, payload?: string) => void;
}

export const DesktopWidgets: React.FC<DesktopWidgetsProps> = ({ onOpenApp }) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [activeChainIdx, setActiveChainIdx] = useState(0);

  const activeChain = chainEcosystems[activeChainIdx];

  const desktopIcons: {
    id: string;
    label: string;
    app: AppId;
    payload?: string;
    kind: 'folder' | 'pdf' | 'note' | 'shield' | 'terminal';
  }[] = [
    { id: 'd-projects', label: 'Projects', app: 'finder', payload: 'projects', kind: 'folder' },
    { id: 'd-audits', label: 'Security Audits', app: 'security', kind: 'shield' },
    { id: 'd-resume', label: 'Resume.pdf', app: 'resume', kind: 'pdf' },
    { id: 'd-readme', label: 'About Me.md', app: 'notes', payload: 'about', kind: 'note' },
    { id: 'd-term', label: 'Terminal.zsh', app: 'terminal', kind: 'terminal' },
  ];

  return (
    <>
      {/* Left Desktop Widgets (macOS Sonoma/Sequoia style) */}
      <div className="desktop-widgets" onMouseDown={() => setSelectedIcon(null)}>
        {/* Identity & Live Status Widget */}
        <div className="mac-widget widget-profile" onClick={() => onOpenApp('notes', 'about')}>
          <div className="widget-top-row">
            <span className="widget-avatar">UA</span>
            <div className="widget-live-pill">
              <span className="live-dot" />
              <span>Shipping</span>
            </div>
          </div>
          <h3>{profile.name}</h3>
          <p className="widget-role">{profile.role}</p>
          <p className="widget-sub">{profile.company} · FAST-NUCES</p>
        </div>

        {/* Multi-Chain Switcher Widget */}
        <div className="mac-widget widget-chains">
          <div className="widget-kicker">MULTI-CHAIN STACK</div>
          <div className="widget-chain-active">
            <span className="widget-chain-dot" style={{ background: activeChain.color }} />
            <div>
              <strong>{activeChain.name}</strong>
              <span>{activeChain.vm}</span>
            </div>
          </div>
          <div className="widget-chain-pills">
            {chainEcosystems.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                className={idx === activeChainIdx ? 'is-active' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveChainIdx(idx);
                }}
              >
                {c.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Personal Sticky Note */}
        <div className="mac-sticky-note">
          <div className="sticky-head">
            <span>Quick Tour</span>
            <kbd>⌘K</kbd>
          </div>
          <ul>
            <li>Click any icon in the Dock below</li>
            <li>Double-click desktop folders on the right</li>
            <li>
              Try <strong>Terminal</strong> (`help`, `audits`, `projects`)
            </li>
            <li>Drag, resize &amp; switch wallpapers in Control Center</li>
          </ul>
        </div>
      </div>

      {/* Right Desktop Icons */}
      <div className="desktop-icons" aria-label="Desktop Shortcuts">
        {desktopIcons.map((ic) => (
          <button
            key={ic.id}
            type="button"
            className={`desktop-icon-btn ${selectedIcon === ic.id ? 'is-selected' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(ic.id);
              if (window.innerWidth <= 900) {
                onOpenApp(ic.app, ic.payload);
              }
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              onOpenApp(ic.app, ic.payload);
            }}
          >
            <span className={`di-glyph kind-${ic.kind}`}>
              {ic.kind === 'folder' && <Folder size={28} />}
              {ic.kind === 'shield' && <Shield size={26} />}
              {ic.kind === 'pdf' && <FileText size={26} />}
              {ic.kind === 'note' && <FileText size={26} />}
              {ic.kind === 'terminal' && <Terminal size={24} />}
            </span>
            <span className="di-label">{ic.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};
