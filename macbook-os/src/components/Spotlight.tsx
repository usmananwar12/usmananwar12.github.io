import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CornerDownLeft, Search } from 'lucide-react';
import { audits, experience, projects, stack } from '../data/portfolio';
import { AppId } from '../types/os';
import { AppIcon } from './AppIcons';

interface SpotlightItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  appId: AppId;
  payload?: string;
  action?: () => void;
}

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId, payload?: string) => void;
  onToggleTheme: () => void;
  onLockScreen: () => void;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onToggleTheme,
  onLockScreen,
}) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<SpotlightItem[]>(() => {
    const base: SpotlightItem[] = [
      { id: 'app-finder', title: 'Finder', subtitle: 'Browse projects, experience & files', category: 'App', appId: 'finder' },
      { id: 'app-notes', title: 'Notes — About Usman', subtitle: 'Bio, principles & DeFa experience', category: 'App', appId: 'notes' },
      { id: 'app-vscode', title: 'VS Code', subtitle: 'Tech stack, Solidity & Cairo code', category: 'App', appId: 'vscode' },
      { id: 'app-terminal', title: 'Terminal', subtitle: 'Interactive Zsh CLI (whoami, projects, audits)', category: 'App', appId: 'terminal' },
      { id: 'app-security', title: 'ChainSec Audit Lab', subtitle: 'Smart contract security & PayMate audit', category: 'App', appId: 'security' },
      { id: 'app-safari', title: 'Safari', subtitle: 'Featured links, GitHub & ecosystems', category: 'App', appId: 'safari' },
      { id: 'app-resume', title: 'Resume.pdf', subtitle: 'Preview & print Usman Anwar CV', category: 'App', appId: 'resume' },
      { id: 'app-mail', title: 'Mail — Contact Usman', subtitle: 'usmananwar9957@gmail.com & socials', category: 'App', appId: 'mail' },
      { id: 'app-settings', title: 'System Settings', subtitle: 'Wallpapers, theme & About This Mac', category: 'App', appId: 'settings' },
      {
        id: 'act-theme',
        title: 'Toggle Dark / Light Mode',
        subtitle: 'Switch macOS appearance immediately',
        category: 'Action',
        appId: 'settings',
        action: onToggleTheme,
      },
      {
        id: 'act-lock',
        title: 'Lock Screen',
        subtitle: 'Return to macOS lock screen',
        category: 'Action',
        appId: 'settings',
        action: onLockScreen,
      },
    ];

    projects.forEach((p) => {
      base.push({
        id: `proj-${p.id}`,
        title: p.name,
        subtitle: `${p.tagline} · ${p.context}`,
        category: 'Project',
        appId: 'finder',
        payload: `project:${p.id}`,
      });
    });

    audits.forEach((a) => {
      base.push({
        id: `audit-${a.target}`,
        title: `${a.target} Security Audit`,
        subtitle: `${a.severity.high} High · ${a.severity.medium} Medium · ${a.severity.low} Low`,
        category: 'Security',
        appId: 'security',
      });
    });

    experience.forEach((e) => {
      base.push({
        id: `exp-${e.company}`,
        title: `${e.role} @ ${e.company}`,
        subtitle: `${e.period} · ${e.chains.join(', ')}`,
        category: 'Experience',
        appId: 'notes',
        payload: 'experience',
      });
    });

    stack.forEach((group) => {
      group.items.forEach((s) => {
        base.push({
          id: `skill-${s.name}`,
          title: s.name,
          subtitle: `${group.label} · ${s.tier.toUpperCase()}`,
          category: 'Skill',
          appId: 'vscode',
          payload: 'stack',
        });
      });
    });

    return base;
  }, [onLockScreen, onToggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [items, query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelected(0);
      window.setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  if (!isOpen) return null;

  const activate = (item: SpotlightItem) => {
    onClose();
    if (item.action) {
      item.action();
    } else {
      onOpenApp(item.appId, item.payload);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => (filtered.length ? (s + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => (filtered.length ? (s - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter' && filtered[selected]) {
      e.preventDefault();
      activate(filtered[selected]);
    }
  };

  return (
    <div className="spotlight-backdrop" onMouseDown={onClose}>
      <div className="spotlight-modal" onMouseDown={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="spotlight-input-row">
          <Search size={19} className="spotlight-search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search — apps, PayMate, Solidity, ChainSec, resume..."
            aria-label="Spotlight Search"
          />
          <kbd className="spotlight-esc">ESC</kbd>
        </div>

        <div className="spotlight-results">
          {filtered.length === 0 ? (
            <div className="spotlight-empty">No matching apps, projects, or skills for &ldquo;{query}&rdquo;</div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`spotlight-item ${idx === selected ? 'is-selected' : ''}`}
                onMouseEnter={() => setSelected(idx)}
                onClick={() => activate(item)}
              >
                <span className="spotlight-item-icon">
                  <AppIcon id={item.appId} size={28} />
                </span>
                <span className="spotlight-item-text">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </span>
                <span className="spotlight-item-cat">{item.category}</span>
                {idx === selected && <CornerDownLeft size={13} className="spotlight-enter" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
