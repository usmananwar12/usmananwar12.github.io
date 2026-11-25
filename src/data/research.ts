/**
 * Security research data.
 *
 * - Audits: add an entry to `audits` (only publicly shareable details).
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

export type Severity = 'high' | 'medium' | 'low';

export interface Audit {
  target: string;
  subtitle: string;
  engagement: string;
  period: string;
  scope: string;
  method: string[];
  /** Unique findings after consolidating every review pass (duplicates counted once). */
  severity: Record<Severity, number>;
  note: string;
}

export const audits: Audit[] = [
  {
    target: 'PayMate',
    subtitle: 'Prefunding protocol',
    engagement: 'Private audit · DeFa by InvoiceMate',
    period: 'Aug – Sep 2026',
    scope:
      'Pool lifecycle, factory, treasury reserve, TVL tracking and fixed-point math: deposits, drawdowns, repayments, fee accrual, defaults and terminal settlement.',
    method: [
      'Manual line-by-line review',
      'Adversarial state-transition analysis',
      'Multi-agent AI analysis',
      'Proof-of-concept exploit tests',
    ],
    severity: { high: 2, medium: 10, low: 4 },
    note: 'Findings from every review pass were consolidated into a single report and de-duplicated by root cause.',
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
