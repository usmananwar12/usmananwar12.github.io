/**
 * Security research data.
 *
 * - Security reviews: add an entry to `reviews` (only publicly shareable details).
 * - Writeups live as Markdown files in src/content/research/ (see _template.md).
 * - Audit contests: add an entry to `contests` when you take part in one.
 * - Tools & experiments: add an entry to `experiments`.
 *
 * Only list things that have actually happened. Empty lists show an honest
 * "in progress" state on the site.
 */

export const focusAreas = [
  { title: 'DeFi protocol security', detail: 'Lending, liquidity and treasury logic, where most of the value sits.' },
  { title: 'EVM vulnerabilities', detail: 'Reentrancy, storage and call semantics, upgradeability pitfalls.' },
  { title: 'Access control', detail: 'Authorization boundaries, privileged roles and trust assumptions.' },
  { title: 'Economic attack vectors', detail: 'Oracle manipulation, rounding, incentive and liquidity attacks.' },
  { title: 'Protocol invariants', detail: 'Stating what must always hold, then trying to break it.' },
  { title: 'AI-assisted analysis', detail: 'Using LLM tooling to widen coverage of manual review, not replace it.' },
];

export interface Review {
  target: string;
  context: string;
  method: string;
  summary: string;
  stats: { value: string; label: string }[];
  note?: string;
  href?: string;
}

export const reviews: Review[] = [
  {
    target: 'PayMate',
    context: 'Pre-production review',
    method: 'Manual review + AI-assisted analysis (ChainSec)',
    summary:
      "Security review of PayMate's smart contracts ahead of production: a manual, line-by-line review run alongside an AI-assisted pass with ChainSec, my own audit tooling.",
    stats: [
      { value: '7', label: 'Low & Medium severity issues found in manual review' },
      { value: '7/7', label: 'Fixed before production' },
    ],
    note: 'The AI-assisted pass surfaced a broad set of findings of its own. All seven manual findings were issues it missed, which is why I treat AI tooling as a way to widen coverage rather than a replacement for careful human review.',
  },
];

export const platforms = ['Code4rena', 'Cantina', 'Sherlock', 'SpecSiege'];

export interface Contest {
  platform: string;
  protocol: string;
  date: string; // e.g. "2026-12"
  /** Only fill in once results are public, e.g. "1 Medium". */
  result?: string;
  href?: string;
}

export const contests: Contest[] = [
  // { platform: 'Code4rena', protocol: 'Example Protocol', date: '2026-12', result: undefined, href: '' },
];

export interface Experiment {
  name: string;
  description: string;
  tags?: string[];
  href?: string;
}

export const experiments: Experiment[] = [
  {
    name: 'ChainSec',
    description:
      'Multi-chain smart contract audit pipeline for AI coding agents, packaged as a Claude Code plugin. It runs compiler-based fact extraction, risk scoring, parallel detection lenses and gated verification of every candidate finding, with tooling to benchmark results against official Code4rena reports.',
    tags: ['Solidity', 'Cairo (preview)', 'Soroban (planned)', 'Claude Code'],
    href: 'https://github.com/usmananwar11/ChainSec',
  },
];
