import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FinderApp } from './apps/FinderApp';
import { MailApp } from './apps/MailApp';
import { NotesApp } from './apps/NotesApp';
import { ResumeApp } from './apps/ResumeApp';
import { SafariApp } from './apps/SafariApp';
import { SecurityApp } from './apps/SecurityApp';
import { SettingsApp } from './apps/SettingsApp';
import { TerminalApp } from './apps/TerminalApp';
import { TrashApp } from './apps/TrashApp';
import { VSCodeApp } from './apps/VSCodeApp';
import { AboutMacModal } from './components/AboutMacModal';
import { DesktopWidgets } from './components/DesktopWidgets';
import { Dock } from './components/Dock';
import { LockScreen } from './components/LockScreen';
import { MenuBar } from './components/MenuBar';
import { Spotlight } from './components/Spotlight';
import { Wallpaper } from './components/Wallpaper';
import { WindowFrame } from './components/WindowFrame';
import { accentColors } from './data/wallpapers';
import { AccentId, AppId, DesktopContextMenuState, ThemeMode, WallpaperId, WindowState } from './types/os';
import { playSound } from './utils/sound';

const APP_TITLES: Record<AppId, string> = {
  finder: 'Finder',
  notes: 'Notes — About Usman Anwar',
  vscode: 'Visual Studio Code — usman-workspace',
  terminal: 'Terminal — usman@macbook — -zsh',
  security: 'ChainSec — Smart Contract Audit Lab',
  safari: 'Safari — Usman Anwar',
  resume: 'Preview — Usman_Anwar_Resume.pdf',
  mail: 'Mail — Contact Usman',
  settings: 'System Settings',
  trash: 'Trash',
};

const APP_SHORT_NAME: Record<AppId, string> = {
  finder: 'Finder',
  notes: 'Notes',
  vscode: 'Code',
  terminal: 'Terminal',
  security: 'ChainSec',
  safari: 'Safari',
  resume: 'Preview',
  mail: 'Mail',
  settings: 'System Settings',
  trash: 'Finder',
};

function createInitialWindows(): Record<AppId, WindowState> {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;

  const center = (w: number, h: number, offsetX = 0, offsetY = 0) => ({
    x: Math.max(24, Math.round((vw - w) / 2 + offsetX)),
    y: Math.max(46, Math.round((vh - h) / 2 - 24 + offsetY)),
  });

  const notesPos = center(780, 540, 36, -12);
  const finderPos = center(880, 560, -24, 6);
  const vscodePos = center(900, 580, 12, 16);
  const termPos = center(740, 470, 54, 28);
  const secPos = center(860, 590, -10, 4);
  const safPos = center(860, 560, 26, 12);
  const resPos = center(780, 620, 0, -4);
  const mailPos = center(780, 520, -20, 18);
  const setPos = center(680, 540, 18, 0);
  const trPos = center(560, 390, 40, 20);

  return {
    notes: {
      id: 'notes',
      title: APP_TITLES.notes,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      ...notesPos,
      width: Math.min(780, vw - 48),
      height: Math.min(540, vh - 140),
      minWidth: 520,
      minHeight: 360,
    },
    finder: {
      id: 'finder',
      title: APP_TITLES.finder,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      ...finderPos,
      width: Math.min(880, vw - 48),
      height: Math.min(560, vh - 140),
      minWidth: 580,
      minHeight: 400,
    },
    vscode: {
      id: 'vscode',
      title: APP_TITLES.vscode,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      ...vscodePos,
      width: Math.min(900, vw - 48),
      height: Math.min(580, vh - 140),
      minWidth: 600,
      minHeight: 400,
    },
    terminal: {
      id: 'terminal',
      title: APP_TITLES.terminal,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      ...termPos,
      width: Math.min(740, vw - 48),
      height: Math.min(470, vh - 150),
      minWidth: 460,
      minHeight: 320,
    },
    security: {
      id: 'security',
      title: APP_TITLES.security,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      ...secPos,
      width: Math.min(860, vw - 48),
      height: Math.min(590, vh - 135),
      minWidth: 560,
      minHeight: 420,
    },
    safari: {
      id: 'safari',
      title: APP_TITLES.safari,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      ...safPos,
      width: Math.min(860, vw - 48),
      height: Math.min(560, vh - 140),
      minWidth: 540,
      minHeight: 380,
    },
    resume: {
      id: 'resume',
      title: APP_TITLES.resume,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      ...resPos,
      width: Math.min(780, vw - 48),
      height: Math.min(620, vh - 130),
      minWidth: 500,
      minHeight: 420,
    },
    mail: {
      id: 'mail',
      title: APP_TITLES.mail,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      ...mailPos,
      width: Math.min(780, vw - 48),
      height: Math.min(520, vh - 140),
      minWidth: 520,
      minHeight: 380,
    },
    settings: {
      id: 'settings',
      title: APP_TITLES.settings,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      ...setPos,
      width: Math.min(680, vw - 48),
      height: Math.min(540, vh - 140),
      minWidth: 480,
      minHeight: 400,
    },
    trash: {
      id: 'trash',
      title: APP_TITLES.trash,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      ...trPos,
      width: Math.min(560, vw - 48),
      height: Math.min(390, vh - 150),
      minWidth: 400,
      minHeight: 280,
    },
  };
}

export function App() {
  const [locked, setLocked] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [wallpaper, setWallpaper] = useState<WallpaperId>('event-horizon');
  const [accent, setAccent] = useState<AccentId>('cyan');
  const [brightness, setBrightness] = useState(100);
  const [dockMagnification, setDockMagnification] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [windows, setWindows] = useState<Record<AppId, WindowState>>(createInitialWindows);
  const topZRef = useRef(12);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [aboutMacOpen, setAboutMacOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<DesktopContextMenuState | null>(null);

  // Sync theme & accent CSS vars onto documentElement
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const a = accentColors[accent];
    document.documentElement.style.setProperty('--accent', a.value);
    document.documentElement.style.setProperty('--accent-rgb', a.rgb);
  }, [accent]);

  // Global macOS keyboard shortcuts (⌘K / Ctrl+K for Spotlight)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (locked) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setContextMenu(null);
        setAboutMacOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [locked]);

  const activeAppId = useMemo<AppId | null>(() => {
    let best: WindowState | null = null;
    (Object.values(windows) as WindowState[]).forEach((w) => {
      if (w.isOpen && !w.isMinimized) {
        if (!best || w.zIndex > best.zIndex) best = w;
      }
    });
    return best ? (best as WindowState).id : null;
  }, [windows]);

  const focusWindow = useCallback((id: AppId) => {
    const nextZ = ++topZRef.current;
    setWindows((wins) => ({
      ...wins,
      [id]: { ...wins[id], zIndex: nextZ, isMinimized: false },
    }));
  }, []);

  const openApp = useCallback(
    (id: AppId, payload?: string) => {
      playSound('open', soundEnabled);
      const nextZ = ++topZRef.current;
      setWindows((wins) => {
        const cur = wins[id];
        return {
          ...wins,
          [id]: {
            ...cur,
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
            payload: payload ?? cur.payload,
          },
        };
      });
    },
    [soundEnabled],
  );

  const launchFromDock = useCallback(
    (id: AppId) => {
      const cur = windows[id];
      if (cur.isOpen && !cur.isMinimized && activeAppId === id) {
        playSound('click', soundEnabled);
        setWindows((wins) => ({ ...wins, [id]: { ...wins[id], isMinimized: true } }));
      } else {
        openApp(id);
      }
    },
    [windows, activeAppId, openApp, soundEnabled],
  );

  const closeWindow = useCallback(
    (id: AppId) => {
      playSound('close', soundEnabled);
      setWindows((wins) => ({
        ...wins,
        [id]: { ...wins[id], isOpen: false, isMinimized: false, isMaximized: false },
      }));
    },
    [soundEnabled],
  );

  const minimizeWindow = useCallback(
    (id: AppId) => {
      playSound('click', soundEnabled);
      setWindows((wins) => ({
        ...wins,
        [id]: { ...wins[id], isMinimized: true },
      }));
    },
    [soundEnabled],
  );

  const toggleMaximizeWindow = useCallback(
    (id: AppId) => {
      playSound('click', soundEnabled);
      setWindows((wins) => ({
        ...wins,
        [id]: { ...wins[id], isMaximized: !wins[id].isMaximized },
      }));
    },
    [soundEnabled],
  );

  const updateWindowBounds = useCallback(
    (id: AppId, partial: Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height'>>) => {
      setWindows((wins) => ({
        ...wins,
        [id]: { ...wins[id], ...partial },
      }));
    },
    [],
  );

  const closeAllWindows = useCallback(() => {
    setWindows((wins) => {
      const next = { ...wins };
      (Object.keys(next) as AppId[]).forEach((k) => {
        next[k] = { ...next[k], isOpen: false, isMinimized: false, isMaximized: false };
      });
      return next;
    });
  }, []);

  const resetLayout = useCallback(() => {
    setWindows(createInitialWindows());
    topZRef.current = 12;
  }, []);

  const handleSelectWallpaper = useCallback((wp: WallpaperId) => {
    setWallpaper(wp);
  }, []);

  const handleUnlock = useCallback(() => {
    playSound('unlock', soundEnabled);
    setLocked(false);
  }, [soundEnabled]);

  const handleContextMenu = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.mac-window, .macos-dock, .macos-menubar')) return;
    e.preventDefault();
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - 220),
      y: Math.min(e.clientY, window.innerHeight - 230),
    });
  };

  if (locked) {
    return <LockScreen wallpaper={wallpaper} onUnlock={handleUnlock} />;
  }

  return (
    <div
      className="macos-desktop-shell"
      style={{ filter: brightness < 100 ? `brightness(${brightness}%)` : undefined }}
      onContextMenu={handleContextMenu}
      onMouseDown={() => setContextMenu(null)}
    >
      <Wallpaper wallpaper={wallpaper} />

      <MenuBar
        activeAppName={activeAppId ? APP_SHORT_NAME[activeAppId] : 'Finder'}
        theme={theme}
        wallpaper={wallpaper}
        brightness={brightness}
        soundEnabled={soundEnabled}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        onSelectWallpaper={handleSelectWallpaper}
        onChangeBrightness={setBrightness}
        onToggleSound={() => setSoundEnabled((s) => !s)}
        onOpenSpotlight={() => setSpotlightOpen(true)}
        onOpenAboutMac={() => setAboutMacOpen(true)}
        onOpenApp={openApp}
        onLockScreen={() => setLocked(true)}
        onCloseAllWindows={closeAllWindows}
        onResetLayout={resetLayout}
      />

      <main className="desktop-stage">
        <DesktopWidgets onOpenApp={openApp} />

        {/* Render Active Windows */}
        {(Object.values(windows) as WindowState[]).map((win) => (
          <WindowFrame
            key={win.id}
            win={win}
            isActive={activeAppId === win.id}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleMaximizeWindow}
            onUpdateBounds={updateWindowBounds}
          >
            {win.id === 'finder' && <FinderApp payload={win.payload} onOpenApp={openApp} />}
            {win.id === 'notes' && <NotesApp payload={win.payload} />}
            {win.id === 'vscode' && <VSCodeApp payload={win.payload} />}
            {win.id === 'terminal' && <TerminalApp onOpenApp={openApp} onSetTheme={setTheme} />}
            {win.id === 'security' && <SecurityApp />}
            {win.id === 'safari' && <SafariApp />}
            {win.id === 'resume' && <ResumeApp />}
            {win.id === 'mail' && <MailApp />}
            {win.id === 'settings' && (
              <SettingsApp
                theme={theme}
                wallpaper={wallpaper}
                accent={accent}
                dockMagnification={dockMagnification}
                soundEnabled={soundEnabled}
                onSetTheme={setTheme}
                onSelectWallpaper={handleSelectWallpaper}
                onSetAccent={setAccent}
                onToggleDockMag={() => setDockMagnification((m) => !m)}
                onToggleSound={() => setSoundEnabled((s) => !s)}
              />
            )}
            {win.id === 'trash' && <TrashApp />}
          </WindowFrame>
        ))}
      </main>

      <Dock
        windows={windows}
        magnification={dockMagnification}
        onLaunchApp={launchFromDock}
      />

      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenApp={openApp}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        onLockScreen={() => setLocked(true)}
      />

      <AboutMacModal
        isOpen={aboutMacOpen}
        onClose={() => setAboutMacOpen(false)}
        onOpenResume={() => openApp('resume')}
      />

      {/* Desktop Right-Click Context Menu */}
      {contextMenu && (
        <div
          className="desktop-ctx-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => {
              setContextMenu(null);
              openApp('finder', 'projects');
            }}
          >
            Open Projects Folder
          </button>
          <button
            type="button"
            onClick={() => {
              setContextMenu(null);
              openApp('terminal');
            }}
          >
            Open Terminal Here
          </button>
          <div className="mb-sep" />
          <button
            type="button"
            onClick={() => {
              setContextMenu(null);
              openApp('settings');
            }}
          >
            Change Wallpaper...
          </button>
          <button
            type="button"
            onClick={() => {
              setContextMenu(null);
              setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
            }}
          >
            Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
          <div className="mb-sep" />
          <button
            type="button"
            onClick={() => {
              setContextMenu(null);
              closeAllWindows();
            }}
          >
            Hide All Windows
          </button>
          <button
            type="button"
            onClick={() => {
              setContextMenu(null);
              setLocked(true);
            }}
          >
            Lock Screen
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
