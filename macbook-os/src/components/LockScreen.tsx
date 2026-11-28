import React, { useEffect, useState } from 'react';
import { ArrowRight, BatteryCharging, Lock, ShieldCheck, Wifi } from 'lucide-react';
import { profile } from '../data/portfolio';
import { WallpaperId } from '../types/os';
import { Wallpaper } from './Wallpaper';

interface LockScreenProps {
  wallpaper: WallpaperId;
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ wallpaper, onUnlock }) => {
  const [now, setNow] = useState(() => new Date());
  const [unlocking, setUnlocking] = useState(false);
  const [passInput, setPassInput] = useState('');

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const triggerUnlock = () => {
    if (unlocking) return;
    setUnlocking(true);
    window.setTimeout(() => {
      onUnlock();
    }, 420);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement?.tagName !== 'INPUT') {
        triggerUnlock();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [unlocking]);

  const dateLabel = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const timeLabel = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className={`lock-screen ${unlocking ? 'is-unlocking' : ''}`}>
      <Wallpaper wallpaper={wallpaper} />
      <div className="lock-dim" />

      {/* Top macOS lock status bar */}
      <div className="lock-topbar">
        <div className="lock-top-left">
          <span className="lock-dot" />
          <span>{profile.hostname}</span>
        </div>
        <div className="lock-top-right">
          <span className="lock-pill">PKT · UTC+5</span>
          <Wifi size={14} />
          <span className="lock-battery">
            <span>100%</span>
            <BatteryCharging size={16} />
          </span>
        </div>
      </div>

      {/* Large Sonoma/Sequoia Date & Clock */}
      <div className="lock-clock-block">
        <div className="lock-date">{dateLabel}</div>
        <div className="lock-time">{timeLabel}</div>
      </div>

      {/* Center-bottom user profile & unlock pill */}
      <div className="lock-user-block">
        <div className="lock-avatar" onClick={triggerUnlock} role="button" tabIndex={0}>
          <div className="lock-avatar-ring" />
          <span className="lock-avatar-initials">UA</span>
          <span className="lock-verified-badge" title="Verified Web3 Engineer">
            <ShieldCheck size={14} />
          </span>
        </div>

        <h1 className="lock-name">{profile.name}</h1>
        <p className="lock-role">
          {profile.role} · {profile.company}
        </p>

        <form
          className="lock-form"
          onSubmit={(e) => {
            e.preventDefault();
            triggerUnlock();
          }}
        >
          <div className="lock-input-wrap">
            <Lock size={13} className="lock-input-icon" />
            <input
              type="password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              placeholder="Press Enter or click to unlock as Guest"
              aria-label="Unlock Usman's MacBook"
              autoFocus
            />
            <button type="submit" className="lock-submit-btn" aria-label="Unlock">
              <ArrowRight size={14} />
            </button>
          </div>

          <button type="button" className="lock-guest-btn" onClick={triggerUnlock}>
            <span>Enter Usman&apos;s Mac as Guest</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <p className="lock-hint">
          No password required · Interactive macOS portfolio with live apps &amp; terminal
        </p>
      </div>
    </div>
  );
};
