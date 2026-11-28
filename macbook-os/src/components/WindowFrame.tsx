import React, { useEffect, useRef } from 'react';
import { AppId, WindowState } from '../types/os';

interface WindowFrameProps {
  win: WindowState;
  isActive: boolean;
  onFocus: (id: AppId) => void;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onToggleMaximize: (id: AppId) => void;
  onUpdateBounds: (id: AppId, partial: Partial<Pick<WindowState, 'x' | 'y' | 'width' | 'height'>>) => void;
  children: React.ReactNode;
}

type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export const WindowFrame: React.FC<WindowFrameProps> = ({
  win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onUpdateBounds,
  children,
}) => {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const resizeRef = useRef<{
    dir: ResizeDir;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
  } | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (dragRef.current) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        const nextX = Math.max(-win.width + 140, Math.min(window.innerWidth - 140, dragRef.current.origX + dx));
        const nextY = Math.max(28, Math.min(window.innerHeight - 90, dragRef.current.origY + dy));
        onUpdateBounds(win.id, { x: nextX, y: nextY });
      } else if (resizeRef.current) {
        const { dir, startX, startY, origX, origY, origW, origH } = resizeRef.current;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let nextX = origX;
        let nextY = origY;
        let nextW = origW;
        let nextH = origH;

        if (dir.includes('e')) {
          nextW = Math.max(win.minWidth, origW + dx);
        }
        if (dir.includes('s')) {
          nextH = Math.max(win.minHeight, origH + dy);
        }
        if (dir.includes('w')) {
          const proposedW = Math.max(win.minWidth, origW - dx);
          nextX = origX + (origW - proposedW);
          nextW = proposedW;
        }
        if (dir.includes('n')) {
          const proposedH = Math.max(win.minHeight, origH - dy);
          const proposedY = origY + (origH - proposedH);
          if (proposedY >= 28) {
            nextY = proposedY;
            nextH = proposedH;
          }
        }

        onUpdateBounds(win.id, { x: nextX, y: nextY, width: nextW, height: nextH });
      }
    };

    const handlePointerUp = () => {
      dragRef.current = null;
      resizeRef.current = null;
      document.body.style.userSelect = '';
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [win.id, win.minWidth, win.minHeight, win.width, onUpdateBounds]);

  if (!win.isOpen || win.isMinimized) return null;

  const startDrag = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('.win-traffic-lights')) return;
    if (win.isMaximized) return;
    if (window.innerWidth <= 768) return;
    onFocus(win.id);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
    };
    document.body.style.userSelect = 'none';
  };

  const startResize = (dir: ResizeDir) => (e: React.PointerEvent) => {
    e.stopPropagation();
    if (win.isMaximized || window.innerWidth <= 768) return;
    onFocus(win.id);
    resizeRef.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
      origW: win.width,
      origH: win.height,
    };
    document.body.style.userSelect = 'none';
  };

  const style: React.CSSProperties = win.isMaximized
    ? {
        zIndex: win.zIndex,
        top: 28,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 28px)',
        borderRadius: 0,
      }
    : {
        zIndex: win.zIndex,
        transform: `translate3d(${win.x}px, ${win.y}px, 0)`,
        width: win.width,
        height: win.height,
      };

  return (
    <section
      className={`mac-window ${isActive ? 'is-active' : 'is-inactive'} ${win.isMaximized ? 'is-maximized' : ''}`}
      style={style}
      onPointerDown={() => onFocus(win.id)}
      aria-label={win.title}
    >
      <header
        className="win-titlebar"
        onPointerDown={startDrag}
        onDoubleClick={() => onToggleMaximize(win.id)}
      >
        <div className="win-traffic-lights" role="group" aria-label="Window controls">
          <button
            type="button"
            className="tl-btn tl-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose(win.id);
            }}
            aria-label="Close window"
            title="Close"
          >
            <svg viewBox="0 0 12 12" width="8" height="8">
              <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className="tl-btn tl-min"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(win.id);
            }}
            aria-label="Minimize window"
            title="Minimize"
          >
            <svg viewBox="0 0 12 12" width="8" height="8">
              <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className="tl-btn tl-max"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize(win.id);
            }}
            aria-label="Zoom window"
            title={win.isMaximized ? 'Restore' : 'Maximize'}
          >
            <svg viewBox="0 0 12 12" width="8" height="8">
              <path d="M3 4.8V3H4.8M9 7.2V9H7.2M3 3L5.2 5.2M9 9L6.8 6.8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="win-title">{win.title}</div>
        <div className="win-title-spacer" />
      </header>

      <div className="win-body">{children}</div>

      {!win.isMaximized && (
        <>
          <div className="resize-handle rh-n" onPointerDown={startResize('n')} />
          <div className="resize-handle rh-s" onPointerDown={startResize('s')} />
          <div className="resize-handle rh-e" onPointerDown={startResize('e')} />
          <div className="resize-handle rh-w" onPointerDown={startResize('w')} />
          <div className="resize-handle rh-ne" onPointerDown={startResize('ne')} />
          <div className="resize-handle rh-nw" onPointerDown={startResize('nw')} />
          <div className="resize-handle rh-se" onPointerDown={startResize('se')} />
          <div className="resize-handle rh-sw" onPointerDown={startResize('sw')} />
        </>
      )}
    </section>
  );
};
