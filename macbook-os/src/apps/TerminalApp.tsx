import React, { useEffect, useRef, useState } from 'react';
import { audits, experience, profile, projects, stack } from '../data/portfolio';
import { AppId, ThemeMode } from '../types/os';

interface TerminalLine {
  id: number;
  type: 'cmd' | 'out' | 'accent' | 'error';
  text: string;
}

interface TerminalAppProps {
  onOpenApp: (id: AppId, payload?: string) => void;
  onSetTheme: (theme: ThemeMode) => void;
}

const NEOFETCH = [
  '                 usman@Usman-MacBook-Pro',
  '    .:/++/:.     -----------------------------------------',
  '  `/++++++++`    OS:       UsmanOS 15.2 (macOS Sequoia)',
  '  /++++++++++    Role:     Full-Stack Web3 Engineer',
  '  +++++++++++    Company:  DeFa by InvoiceMate',
  '  /++++++++++    Edu:      BS Computer Science · FAST-NUCES',
  '   `/++++++/     Chains:   EVM · Starknet · Stellar · XRPL · Solana',
  '     `://:`      Writes:   Solidity · Cairo · Rust · TypeScript',
  '                 Security: PayMate Audit (16 findings) · ChainSec',
  '                 Location: Pakistan (UTC+5)',
];

const AVAILABLE_COMMANDS = [
  'help',
  'whoami',
  'about',
  'ls',
  'projects',
  'experience',
  'skills',
  'audits',
  'socials',
  'contact',
  'neofetch',
  'open',
  'theme',
  'date',
  'clear',
];

export const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp, onSetTheme }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 1, type: 'accent', text: 'Last login: Today on ttys001 — Usman-MacBook-Pro' },
    ...NEOFETCH.map((text, idx) => ({ id: idx + 2, type: 'out' as const, text })),
    {
      id: 99,
      type: 'accent',
      text: 'Type "help" to see available commands, or "open security" / "projects" / "audits".',
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const pushLines = (entries: { type: TerminalLine['type']; text: string }[]) => {
    setLines((prev) => [
      ...prev,
      ...entries.map((e, i) => ({ id: Date.now() + i + Math.random(), ...e })),
    ]);
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setHistory((h) => [trimmed, ...h]);
    setHistIdx(-1);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(' ').toLowerCase();

    const header: { type: TerminalLine['type']; text: string }[] = [
      { type: 'cmd', text: `usman@macbook ~ % ${trimmed}` },
    ];

    switch (cmd.toLowerCase()) {
      case 'help':
        pushLines([
          ...header,
          { type: 'accent', text: 'Available commands:' },
          { type: 'out', text: '  whoami        Quick identity & current role' },
          { type: 'out', text: '  about         Read Usman bio & engineering principles' },
          { type: 'out', text: '  ls            List virtual portfolio directories' },
          { type: 'out', text: '  projects      List all Web3 & security projects' },
          { type: 'out', text: '  experience    Work experience & ecosystem cohorts' },
          { type: 'out', text: '  skills        Full-stack & blockchain tech stack' },
          { type: 'out', text: '  audits        Smart contract security audit summary' },
          { type: 'out', text: '  socials       GitHub, LinkedIn, X, Telegram, Email' },
          { type: 'out', text: '  open <app>    Launch app (finder|notes|vscode|security|safari|resume|mail|settings)' },
          { type: 'out', text: '  theme <mode>  Switch theme: dark | light' },
          { type: 'out', text: '  neofetch      Display UsmanOS system banner' },
          { type: 'out', text: '  clear         Clear terminal output' },
        ]);
        break;

      case 'whoami':
        pushLines([
          ...header,
          { type: 'out', text: `${profile.name} (${profile.handle})` },
          { type: 'out', text: `${profile.role} @ ${profile.company}` },
          { type: 'out', text: `${profile.education} | ${profile.location}` },
        ]);
        break;

      case 'about':
        pushLines([
          ...header,
          { type: 'out', text: profile.bioLead },
          ...profile.bioParagraphs.map((p) => ({ type: 'out' as const, text: p })),
        ]);
        break;

      case 'ls':
        pushLines([
          ...header,
          { type: 'accent', text: 'Projects/   SecurityAudits/   Experience/   Resume.pdf   README.md   ChainSec/' },
        ]);
        break;

      case 'projects':
        pushLines([
          ...header,
          ...projects.map((p) => ({
            type: 'out' as const,
            text: `• ${p.name.padEnd(22)} — ${p.tagline} [${p.chains.join(', ')}]`,
          })),
          { type: 'accent', text: 'Tip: run "open finder" to inspect full project details.' },
        ]);
        break;

      case 'experience':
        pushLines([
          ...header,
          ...experience.flatMap((role) => [
            { type: 'accent' as const, text: `${role.role} @ ${role.company} (${role.period})` },
            ...role.focus.map((f) => ({ type: 'out' as const, text: `  - ${f}` })),
          ]),
        ]);
        break;

      case 'skills':
        pushLines([
          ...header,
          ...stack.map((g) => ({
            type: 'out' as const,
            text: `${g.label.padEnd(12)}: ${g.items.map((i) => i.name).join(', ')}`,
          })),
        ]);
        break;

      case 'audits':
        pushLines([
          ...header,
          ...audits.flatMap((a) => [
            { type: 'accent' as const, text: `[AUDIT] ${a.target} (${a.period}) — ${a.engagement}` },
            {
              type: 'out' as const,
              text: `Findings: ${a.severity.high} High | ${a.severity.medium} Medium | ${a.severity.low} Low (16 unique)`,
            },
            { type: 'out' as const, text: `Scope: ${a.scope}` },
          ]),
          { type: 'accent', text: 'Tip: run "open security" to view ChainSec Audit Lab.' },
        ]);
        break;

      case 'socials':
      case 'contact':
        pushLines([
          ...header,
          { type: 'out', text: `Email    : ${profile.links.email}` },
          { type: 'out', text: `GitHub   : ${profile.links.github} (alt: ${profile.links.githubAlt})` },
          { type: 'out', text: `LinkedIn : ${profile.links.linkedin}` },
          { type: 'out', text: `X        : ${profile.links.x}` },
          { type: 'out', text: `Telegram : ${profile.links.telegram}` },
        ]);
        break;

      case 'neofetch':
        pushLines([...header, ...NEOFETCH.map((text) => ({ type: 'out' as const, text }))]);
        break;

      case 'date':
        pushLines([...header, { type: 'out', text: new Date().toString() }]);
        break;

      case 'theme':
        if (arg === 'dark' || arg === 'light') {
          onSetTheme(arg);
          pushLines([...header, { type: 'accent', text: `Switched macOS appearance to ${arg} mode.` }]);
        } else {
          pushLines([...header, { type: 'error', text: 'Usage: theme dark | theme light' }]);
        }
        break;

      case 'open': {
        const map: Record<string, AppId> = {
          finder: 'finder',
          projects: 'finder',
          notes: 'notes',
          about: 'notes',
          vscode: 'vscode',
          code: 'vscode',
          stack: 'vscode',
          security: 'security',
          audits: 'security',
          chainsec: 'security',
          safari: 'safari',
          resume: 'resume',
          cv: 'resume',
          mail: 'mail',
          contact: 'mail',
          settings: 'settings',
          trash: 'trash',
        };
        const target = map[arg];
        if (target) {
          onOpenApp(target);
          pushLines([...header, { type: 'accent', text: `Launching ${target}...` }]);
        } else {
          pushLines([
            ...header,
            {
              type: 'error',
              text: 'Unknown app. Try: open finder | notes | vscode | security | safari | resume | mail | settings',
            },
          ]);
        }
        break;
      }

      case 'clear':
        setLines([]);
        break;

      default:
        pushLines([
          ...header,
          { type: 'error', text: `zsh: command not found: ${cmd}. Type "help" for available commands.` },
        ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const next = Math.min(histIdx + 1, history.length - 1);
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx <= 0) {
        setHistIdx(-1);
        setInput('');
      } else {
        const next = histIdx - 1;
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <div className="terminal-app mono" onClick={() => inputRef.current?.focus()}>
      <div className="term-output">
        {lines.map((line) => (
          <pre key={line.id} className={`term-line is-${line.type}`}>
            {line.text}
          </pre>
        ))}

        <div className="term-input-row">
          <span className="term-prompt">usman@macbook ~ %</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command input"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
