import React, { useEffect, useRef, useState } from 'react';
import {
  BatteryCharging,
  Lock,
  Moon,
  Search,
  SlidersHorizontal,
  Sun,
  Volume2,
  VolumeX,
  Wifi,
} from 'lucide-react';
import { profile } from '../data/portfolio';
import { wallpapers } from '../data/wallpapers';
import { AppId, ThemeMode, WallpaperId } from '../types/os';

interface MenuBarProps {
  activeAppName: string;
  theme: ThemeMode;
  wallpaper: WallpaperId;
  brightness: number;
  soundEnabled: boolean;
  onToggleTheme: () => void;
  onSelectWallpaper: (wp: WallpaperId) => void;
  onChangeBrightness: (v: number) => void;
  onToggleSound: () => void;
  onOpenSpotlight: () => void;
  onOpenAboutMac: () => void;
  onOpenApp: (app: AppId, payload?: string) => void;
  onLockScreen: () => void;
  onCloseAllWindows: () => void;
  onResetLayout: () => void;
}

export const MenuBar: React.FC<MenuBarProps> = ({
  activeAppName,
  theme,
  wallpaper,
  brightness,
  soundEnabled,
  onToggleTheme,
  onSelectWallpaper,
  onChangeBrightness,
  onToggleSound,
  onOpenSpotlight,
  onOpenAboutMac,
  onOpenApp,
  onLockScreen,
  onCloseAllWindows,
  onResetLayout,
}) => {
  const [now, setNow] = useState(() => new Date());
  const [openMenu, setOpenMenu] = useState<'apple' | 'file' | 'window' | 'control' | 'notif' | null>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, []);

  const clockStr = now.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const runAction = (fn: () => void) => {
    setOpenMenu(null);
    fn();
  };

  return (
    <header className="macos-menubar" ref={barRef}>
      <div className="mb-left">
        {/* Apple Menu */}
        <div className="mb-item-wrap">
          <button
            type="button"
            className={`mb-btn mb-apple ${openMenu === 'apple' ? 'is-open' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'apple' ? null : 'apple')}
            aria-label="Apple menu"
          >
            <svg viewBox="0 0 17 20" width="13" height="15" fill="currentColor">
              <path d="M13.6 10.6c0-2.1 1.7-3.2 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.6 1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.3 1.1-2.3-.1 0-2.2-.8-2.2-3.5zM11.5 4.4c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z" />
            </svg>
          </button>

          {openMenu === 'apple' && (
            <div className="mb-dropdown">
              <button type="button" onClick={() => runAction(onOpenAboutMac)}>
                About This Mac
              </button>
              <div className="mb-sep" />
              <button type="button" onClick={() => runAction(() => onOpenApp('settings'))}>
                System Settings...
              </button>
              <button type="button" onClick={() => runAction(() => onOpenApp('resume'))}>
                Preview Resume.pdf
              </button>
              <div className="mb-sep" />
              <button type="button" onClick={() => runAction(onResetLayout)}>
                Reset Desktop Layout
              </button>
              <button type="button" onClick={() => runAction(onLockScreen)}>
                <span>Lock Screen</span>
                <kbd>⌃⌘Q</kbd>
              </button>
            </div>
          )}
        </div>

        {/* Active App Name */}
        <span className="mb-app-name">{activeAppName}</span>

        {/* File Menu */}
        <div className="mb-item-wrap mb-hide-mobile">
          <button
            type="button"
            className={`mb-btn ${openMenu === 'file' ? 'is-open' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
          >
            File
          </button>
          {openMenu === 'file' && (
            <div className="mb-dropdown">
              <button type="button" onClick={() => runAction(() => onOpenApp('finder', 'projects'))}>
                Open Projects Folder
              </button>
              <button type="button" onClick={() => runAction(() => onOpenApp('terminal'))}>
                New Terminal Window
              </button>
              <button type="button" onClick={() => runAction(() => onOpenApp('notes'))}>
                Open Notes (About Me)
              </button>
              <button type="button" onClick={() => runAction(() => onOpenApp('security'))}>
                Open ChainSec Audit Lab
              </button>
              <div className="mb-sep" />
              <button type="button" onClick={() => runAction(() => onOpenApp('mail'))}>
                Compose Email to Usman
              </button>
            </div>
          )}
        </div>

        {/* Window Menu */}
        <div className="mb-item-wrap mb-hide-mobile">
          <button
            type="button"
            className={`mb-btn ${openMenu === 'window' ? 'is-open' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'window' ? null : 'window')}
          >
            Window
          </button>
          {openMenu === 'window' && (
            <div className="mb-dropdown">
              <button type="button" onClick={() => runAction(onResetLayout)}>
                Restore Default Layout
              </button>
              <button type="button" onClick={() => runAction(onCloseAllWindows)}>
                Close All Windows
              </button>
              <div className="mb-sep" />
              <button type="button" onClick={() => runAction(onToggleTheme)}>
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Status Tray */}
      <div className="mb-right">
        <button
          type="button"
          className="mb-icon-btn"
          onClick={onOpenSpotlight}
          title="Spotlight Search (⌘K)"
          aria-label="Spotlight Search"
        >
          <Search size={13} />
        </button>

        <span className="mb-icon-static mb-hide-mobile" title="Connected to DeFa-Lab-5G">
          <Wifi size={13} />
        </span>

        <span className="mb-battery mb-hide-mobile" title="Battery 100% — Charged">
          <span>100%</span>
          <BatteryCharging size={15} />
        </span>

        {/* Control Center */}
        <div className="mb-item-wrap">
          <button
            type="button"
            className={`mb-icon-btn ${openMenu === 'control' ? 'is-open' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'control' ? null : 'control')}
            title="Control Center"
            aria-label="Control Center"
          >
            <SlidersHorizontal size={13} />
          </button>

          {openMenu === 'control' && (
            <div className="cc-panel">
              <div className="cc-row-2">
                <button
                  type="button"
                  className={`cc-tile ${theme === 'dark' ? 'is-on' : ''}`}
                  onClick={onToggleTheme}
                >
                  <span className="cc-tile-icon">
                    {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
                  </span>
                  <div className="cc-tile-text">
                    <strong>Appearance</strong>
                    <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`cc-tile ${soundEnabled ? 'is-on' : ''}`}
                  onClick={onToggleSound}
                >
                  <span className="cc-tile-icon">
                    {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  </span>
                  <div className="cc-tile-text">
                    <strong>UI Sound</strong>
                    <span>{soundEnabled ? 'On' : 'Muted'}</span>
                  </div>
                </button>
              </div>

              <div className="cc-card">
                <div className="cc-card-head">
                  <span>Display Brightness</span>
                  <span>{brightness}%</span>
                </div>
                <input
                  type="range"
                  min={55}
                  max={100}
                  value={brightness}
                  onChange={(e) => onChangeBrightness(Number(e.target.value))}
                  className="cc-slider"
                />
              </div>

              <div className="cc-card">
                <div className="cc-card-head">
                  <span>Wallpaper</span>
                  <button
                    type="button"
                    className="cc-link"
                    onClick={() => runAction(() => onOpenApp('settings'))}
                  >
                    All Settings
                  </button>
                </div>
                <div className="cc-wallpapers">
                  {wallpapers.map((wp) => (
                    <button
                      key={wp.id}
                      type="button"
                      className={`cc-wp-swatch ${wallpaper === wp.id ? 'is-selected' : ''}`}
                      style={{ background: wp.previewStyle }}
                      title={wp.name}
                      onClick={() => onSelectWallpaper(wp.id)}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="cc-lock-btn"
                onClick={() => runAction(onLockScreen)}
              >
                <Lock size={13} />
                <span>Lock Usman&apos;s Mac</span>
              </button>
            </div>
          )}
        </div>

        {/* Clock & Quick Info Popover */}
        <div className="mb-item-wrap">
          <button
            type="button"
            className={`mb-btn mb-clock ${openMenu === 'notif' ? 'is-open' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'notif' ? null : 'notif')}
          >
            {clockStr}
          </button>

          {openMenu === 'notif' && (
            <div className="notif-panel">
              <div className="notif-card">
                <div className="notif-badge">
                  <span className="live-dot" />
                  <span>Currently Shipping</span>
                </div>
                <h4>{profile.name}</h4>
                <p>
                  {profile.role} at <strong>{profile.company}</strong>. Building liquidity infrastructure
                  across EVM, Starknet, Stellar, XRPL &amp; Solana.
                </p>
              </div>
              <div className="notif-card">
                <div className="notif-meta">Security Research · Aug – Sep 2026</div>
                <h4>PayMate Pre-Production Audit</h4>
                <p>16 unique findings consolidated (2 High, 10 Medium, 4 Low) using manual review + ChainSec.</p>
                <button
                  type="button"
                  className="notif-action"
                  onClick={() => runAction(() => onOpenApp('security'))}
                >
                  Inspect Audit Report →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
