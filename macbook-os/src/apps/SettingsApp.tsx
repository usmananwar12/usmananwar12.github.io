import React from 'react';
import { Monitor, Moon, Palette, Sparkles, Sun, Volume2 } from 'lucide-react';
import { profile } from '../data/portfolio';
import { accentColors, wallpapers } from '../data/wallpapers';
import { AccentId, ThemeMode, WallpaperId } from '../types/os';

interface SettingsAppProps {
  theme: ThemeMode;
  wallpaper: WallpaperId;
  accent: AccentId;
  dockMagnification: boolean;
  soundEnabled: boolean;
  onSetTheme: (t: ThemeMode) => void;
  onSelectWallpaper: (wp: WallpaperId) => void;
  onSetAccent: (a: AccentId) => void;
  onToggleDockMag: () => void;
  onToggleSound: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  theme,
  wallpaper,
  accent,
  dockMagnification,
  soundEnabled,
  onSetTheme,
  onSelectWallpaper,
  onSetAccent,
  onToggleDockMag,
  onToggleSound,
}) => {
  return (
    <div className="settings-app">
      {/* Profile Card */}
      <div className="set-profile-card">
        <div className="set-avatar">UA</div>
        <div>
          <h3>{profile.name}</h3>
          <p>
            {profile.role} · {profile.company}
          </p>
          <span className="set-sub">{profile.macSpecs.os} · {profile.education}</span>
        </div>
      </div>

      {/* Appearance */}
      <section className="set-section">
        <h4>
          <Palette size={14} /> Appearance
        </h4>
        <div className="set-row">
          <span>Mode</span>
          <div className="set-segmented">
            <button
              type="button"
              className={theme === 'dark' ? 'is-active' : ''}
              onClick={() => onSetTheme('dark')}
            >
              <Moon size={13} /> Dark
            </button>
            <button
              type="button"
              className={theme === 'light' ? 'is-active' : ''}
              onClick={() => onSetTheme('light')}
            >
              <Sun size={13} /> Light
            </button>
          </div>
        </div>

        <div className="set-row">
          <span>Accent Color</span>
          <div className="set-accents">
            {(Object.keys(accentColors) as AccentId[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`set-accent-dot ${accent === key ? 'is-selected' : ''}`}
                style={{ background: accentColors[key].value }}
                title={accentColors[key].label}
                onClick={() => onSetAccent(key)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Wallpapers */}
      <section className="set-section">
        <h4>
          <Monitor size={14} /> Wallpaper
        </h4>
        <div className="set-wp-grid">
          {wallpapers.map((wp) => (
            <button
              key={wp.id}
              type="button"
              className={`set-wp-card ${wallpaper === wp.id ? 'is-selected' : ''}`}
              onClick={() => onSelectWallpaper(wp.id)}
            >
              <div className="set-wp-thumb" style={{ background: wp.previewStyle }} />
              <strong>{wp.name}</strong>
              <span>{wp.subtitle}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Desktop & Dock */}
      <section className="set-section">
        <h4>
          <Sparkles size={14} /> Desktop, Dock &amp; Sound
        </h4>
        <div className="set-row">
          <span>Dock Hover Magnification</span>
          <button
            type="button"
            className={`mac-switch ${dockMagnification ? 'is-on' : ''}`}
            onClick={onToggleDockMag}
            aria-pressed={dockMagnification}
          >
            <span />
          </button>
        </div>
        <div className="set-row">
          <span>
            <Volume2 size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />
            Subtle macOS UI Sound Effects
          </span>
          <button
            type="button"
            className={`mac-switch ${soundEnabled ? 'is-on' : ''}`}
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
          >
            <span />
          </button>
        </div>
      </section>
    </div>
  );
};
