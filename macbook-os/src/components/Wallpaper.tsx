import React, { useEffect, useRef } from 'react';
import { wallpapers } from '../data/wallpapers';
import { WallpaperId } from '../types/os';

interface WallpaperProps {
  wallpaper: WallpaperId;
  blurred?: boolean;
}

const LiveCanvasWallpaper: React.FC<{ mode: 'protocol-mesh' | 'cipher-rain' }> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    if (mode === 'protocol-mesh') {
      const nodeCount = Math.min(78, Math.max(42, Math.floor((width * height) / 22000)));
      const palette = ['#38bdf8', '#a78bfa', '#34d399', '#60a5fa'];
      const nodes = Array.from({ length: nodeCount }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        r: 1.5 + Math.random() * 2,
        color: palette[i % palette.length],
      }));

      const render = () => {
        // Obsidian deep space base
        const grad = ctx.createRadialGradient(width * 0.5, height * 0.42, 40, width * 0.5, height * 0.5, Math.max(width, height) * 0.78);
        grad.addColorStop(0, '#0a1628');
        grad.addColorStop(0.55, '#050b16');
        grad.addColorStop(1, '#02050c');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Faint precision hex/dot grid
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.035)';
        ctx.lineWidth = 1;
        const step = 64;
        for (let x = 0; x < width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Move and connect nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Subtle cursor attraction/glow
          const mdx = mouse.x - n.x;
          const mdy = mouse.y - n.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 190) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - mdist / 190) * 0.34})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }

          for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const dist = Math.hypot(n.x - m.x, n.y - m.y);
            if (dist < 155) {
              const alpha = (1 - dist / 155) * 0.22;
              ctx.strokeStyle = `rgba(125, 211, 252, ${alpha})`;
              ctx.lineWidth = 0.9;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.stroke();
            }
          }
        }

        for (const n of nodes) {
          ctx.fillStyle = n.color;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = n.color + '28';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }

        raf = requestAnimationFrame(render);
      };
      raf = requestAnimationFrame(render);
    } else {
      // Refined dark Cipher Rain (hex, EVM opcodes & math symbols)
      const tokens = ['0', '1', 'x', 'a', 'f', '9', 'e', '7', 'c', 'λ', '∑', '⊕', '≠', 'Ξ', '◈'];
      const fontSize = 14;
      const colWidth = 22;
      const cols = Math.ceil(width / colWidth);
      const drops = Array.from({ length: cols }, () => Math.random() * -40);
      const speeds = Array.from({ length: cols }, () => 0.16 + Math.random() * 0.28);

      ctx.fillStyle = '#03080c';
      ctx.fillRect(0, 0, width, height);

      const render = () => {
        ctx.fillStyle = 'rgba(3, 8, 12, 0.08)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = `500 ${fontSize}px "SF Mono", "JetBrains Mono", monospace`;

        for (let i = 0; i < drops.length; i++) {
          const x = i * colWidth;
          const y = drops[i] * fontSize;

          if (y > 0 && y < height + fontSize) {
            const char = tokens[Math.floor(Math.random() * tokens.length)];
            const nearMouse = Math.hypot(x - mouse.x, y - mouse.y) < 130;
            ctx.fillStyle = nearMouse
              ? 'rgba(56, 189, 248, 0.85)'
              : i % 5 === 0
                ? 'rgba(56, 189, 248, 0.36)'
                : 'rgba(16, 185, 129, 0.34)';
            ctx.fillText(char, x, y);
          }

          drops[i] += speeds[i];
          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = -Math.random() * 14;
          }
        }

        raf = requestAnimationFrame(render);
      };
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="wp-canvas" />;
};

export const Wallpaper: React.FC<WallpaperProps> = ({ wallpaper, blurred = false }) => {
  const current = wallpapers.find((w) => w.id === wallpaper) ?? wallpapers[0];

  return (
    <div className={`os-wallpaper ${blurred ? 'is-blurred' : ''}`} aria-hidden="true">
      {current.kind === 'image' && current.image ? (
        <img
          key={current.id}
          src={current.image}
          alt=""
          className="wp-img"
          draggable={false}
        />
      ) : (
        <LiveCanvasWallpaper
          key={current.id}
          mode={current.id === 'cipher-rain' ? 'cipher-rain' : 'protocol-mesh'}
        />
      )}
      <div className="wp-vignette" />
    </div>
  );
};
