export interface Role {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  focus: string[];
  chains: string[];
  stack: string[];
  programs: { name: string; ecosystem: string }[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  context: string;
  tags: string[];
  chains: string[];
  status: string;
  href?: string;
  highlights: string[];
}

export type Tier = 'core' | 'working' | 'growing';

export interface StackGroup {
  label: string;
  note: string;
  items: { name: string; tier: Tier }[];
}

export interface Audit {
  target: string;
  subtitle: string;
  engagement: string;
  period: string;
  scope: string;
  method: string[];
  severity: { high: number; medium: number; low: number };
  note: string;
}

export const profile = {
  name: 'Usman Anwar',
  shortName: 'Usman',
  handle: 'usman.anwar.eth',
  username: 'usman',
  hostname: 'Usman-MacBook-Pro',
  role: 'Full-Stack Web3 Engineer',
  company: 'DeFa by InvoiceMate',
  location: 'Pakistan · PKT (UTC+5)',
  education: 'BS Computer Science — FAST-NUCES',
  url: 'https://usmananwar.me',
  headline: 'Building liquidity infrastructure for real-world finance. Then trying to break it.',
  bioLead:
    "I'm a Computer Science graduate from FAST-NUCES and a full-stack Web3 engineer based in Pakistan.",
  bioParagraphs: [
    'My work sits in the part of Web3 that has to hold up in the real world: protocols that connect PayFi and TradFi dealflow with on-chain liquidity, where the contracts move real value and real businesses depend on them.',
    "I'm comfortable across the whole stack: Solidity and Cairo on-chain, Node.js services in the middle, React and Next.js at the edge. I bring that same depth to security: I audit protocol code adversarially before it ships, and I build the tooling that makes those audits sharper.",
  ],
  interests: [
    'DeFi & PayFi',
    'Real-world asset financing',
    'Lending & liquidity design',
    'Multi-chain systems',
    'Smart contract security',
    'AI-assisted engineering',
  ],
  principles: [
    {
      tag: 'INVARIANT_01',
      title: 'Contracts are the product.',
      body: 'Code that holds capital does not get a quiet hotfix. I design for the failure cases first and the happy path second.',
    },
    {
      tag: 'FULL_STACK_02',
      title: 'Own the whole path.',
      body: 'From storage layout to the button a user presses, a system is only as clear as its weakest seam. I like working across all of it.',
    },
    {
      tag: 'ADVERSARIAL_03',
      title: 'Invariants over intuition.',
      body: 'Write down what must always be true, then test it, fuzz it and try to break it before someone else does.',
    },
  ],
  links: {
    github: 'https://github.com/usmananwar11',
    githubAlt: 'https://github.com/usmananwar12',
    linkedin: 'https://www.linkedin.com/in/musman-anwar',
    x: 'https://x.com/Usman_Anwar9957',
    telegram: 'https://t.me/usmananwar9957',
    email: 'usmananwar9957@gmail.com',
  },
  macSpecs: {
    model: 'MacBook Pro · 16-inch (Web3 Edition)',
    chip: 'Solidity / Cairo / Rust Multi-Chain Core',
    memory: 'Full-Stack Context · DeFi + Security',
    os: 'UsmanOS 15.2 (Sequoia)',
    education: 'BS Computer Science · FAST-NUCES',
    company: 'DeFa by InvoiceMate',
    serial: '0xUSM4N-ANW4R-PK5',
  },
};

export const experience: Role[] = [
  {
    company: 'DeFa by InvoiceMate',
    role: 'Full-Stack Web3 Engineer',
    period: 'Dec 2025 — Present',
    location: 'Remote / Pakistan',
    summary:
      'DeFa is Liquidity-as-a-Service infrastructure that connects PayFi and TradFi dealflow with decentralized liquidity. I work across the stack: from the contracts that hold and move capital to the services and interfaces built on top of them.',
    focus: [
      'Develop and integrate EVM smart contracts in Solidity, and Starknet contracts in Cairo.',
      'Design lending pools, liquidity mechanisms and treasury systems.',
      'Build blockchain applications across EVM, Starknet, Stellar, XRPL and Solana.',
      'Wire on-chain logic into backend services and frontend applications end to end.',
      'Work on DeFi, PayFi and real-world asset financing infrastructure.',
      'Audit protocol code before it ships, including the pre-production audit of PayMate: 16 unique findings, including 2 High and 10 Medium severity.',
    ],
    chains: ['EVM', 'Starknet', 'Stellar', 'XRPL', 'Solana'],
    stack: ['Solidity', 'Cairo', 'Foundry', 'Starknet Foundry', 'TypeScript', 'Next.js', 'Node.js'],
    programs: [
      { name: 'Starknet Cohort', ecosystem: 'Starknet' },
      { name: 'Stellar × CV Accelerator', ecosystem: 'Stellar' },
      { name: 'Colosseum Hackathon', ecosystem: 'Solana' },
      { name: 'XRPL × Tenity', ecosystem: 'XRPL' },
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'paymate',
    name: 'PayMate',
    tagline: 'Prefunding protocol for payment flows',
    description:
      'A prefunding protocol that connects liquidity providers with payment service providers, enabling real-world payment settlement backed by decentralized liquidity pools.',
    context: 'DeFa by InvoiceMate',
    tags: ['PayFi', 'Liquidity', 'Smart Contracts'],
    chains: ['EVM'],
    status: 'Production · Audited (16 findings remediated)',
    highlights: [
      'Pool lifecycle, factory, treasury reserve & TVL accounting',
      'Fixed-point math for drawdowns, repayments, fee accrual & defaults',
      'Pre-production internal audit surfaced 2 High, 10 Medium & 4 Low findings',
    ],
  },
  {
    id: 'credmate',
    name: 'CredMate',
    tagline: 'On-chain credit and verification on Starknet',
    description:
      'Blockchain-based credit and verification infrastructure built on Starknet using Cairo smart contracts for verifiable real-world borrower profiles.',
    context: 'DeFa by InvoiceMate',
    tags: ['Starknet', 'Cairo', 'Credit'],
    chains: ['Starknet'],
    status: 'Ecosystem · Starknet Cohort',
    highlights: [
      'Cairo smart contract architecture built with Scarb & Starknet Foundry',
      'On-chain credit attestation & verification primitives',
      'End-to-end integration with TypeScript & Next.js frontend',
    ],
  },
  {
    id: 'defa-marketplace',
    name: 'DeFa Marketplace',
    tagline: 'SME financing marketplace',
    description:
      'A financing marketplace for SMEs, part of the DeFa platform that connects real-world invoice and trade dealflow with decentralized liquidity.',
    context: 'DeFa by InvoiceMate',
    tags: ['RWA', 'Marketplace', 'Full-Stack'],
    chains: ['EVM', 'Stellar', 'XRPL'],
    status: 'Active Platform',
    highlights: [
      'Connects real-world SME financing demand with on-chain liquidity providers',
      'Full-stack architecture spanning smart contracts, Node.js APIs & React UI',
      'Designed around institutional PayFi & RWA settlement flows',
    ],
  },
  {
    id: 'private-rwa',
    name: 'Private RWA & Lending',
    tagline: 'Privacy-focused financing integrations',
    description:
      'Privacy-focused integrations for real-world asset financing and lending where sensitive commercial counterparties and terms must stay confidential.',
    context: 'DeFa by InvoiceMate',
    tags: ['RWA', 'Lending', 'Privacy'],
    chains: ['EVM', 'Starknet'],
    status: 'Internal R&D / Integration',
    highlights: [
      'Confidential financing primitives for institutional RWA workflows',
      'Balancing on-chain settlement guarantees with commercial data privacy',
    ],
  },
  {
    id: 'chainsec',
    name: 'ChainSec',
    tagline: 'Smart contract audit pipeline for AI agents',
    description:
      'An open-source, multi-chain audit pipeline that runs inside AI coding agents like Claude Code. Solidity today, Starknet Cairo in preview, Soroban planned. Used on the PayMate pre-production review.',
    context: 'Open source',
    tags: ['Security', 'AI Agents', 'Solidity', 'Cairo'],
    chains: ['EVM', 'Starknet', 'Stellar'],
    status: 'Open Source · Active',
    href: 'https://github.com/usmananwar11/ChainSec',
    highlights: [
      'Compiler-based fact extraction & automated contract risk scoring',
      'Parallel detection lenses + gated verification of every candidate finding',
      'Benchmark tooling against official Code4rena audit reports',
    ],
  },
  {
    id: 'dekyc',
    name: 'DeKYC',
    tagline: 'Decentralized identity verification',
    description:
      'A "verify once, share many" KYC framework. A sequentially gated AI pipeline (liveness detection, document forensics, OCR validation and face matching) feeds a registry contract on Arbitrum that anchors salted EIP-712 identity commitments, while all personal data stays off-chain.',
    context: 'Personal project',
    tags: ['Identity', 'Arbitrum', 'EIP-712', 'AI Forensics'],
    chains: ['Arbitrum / EVM'],
    status: 'Completed Prototype',
    highlights: [
      'Sequentially gated AI pipeline: liveness, document forensics, OCR & face match',
      'Salted EIP-712 cryptographic identity commitments anchored on Arbitrum',
      'Zero personal identifiable information stored on-chain',
    ],
  },
];

export const stack: StackGroup[] = [
  {
    label: 'Blockchain',
    note: 'Contracts and chains',
    items: [
      { name: 'Solidity', tier: 'core' },
      { name: 'EVM', tier: 'core' },
      { name: 'Smart Contract Development', tier: 'core' },
      { name: 'Cairo', tier: 'working' },
      { name: 'Starknet', tier: 'working' },
      { name: 'Stellar', tier: 'working' },
      { name: 'XRPL', tier: 'working' },
      { name: 'Solana', tier: 'working' },
      { name: 'Smart Contract Security', tier: 'working' },
    ],
  },
  {
    label: 'Frontend',
    note: 'Interfaces on top of protocols',
    items: [
      { name: 'TypeScript', tier: 'core' },
      { name: 'React', tier: 'core' },
      { name: 'Next.js', tier: 'core' },
      { name: 'JavaScript', tier: 'core' },
    ],
  },
  {
    label: 'Backend',
    note: 'Services that talk to chains',
    items: [
      { name: 'Node.js', tier: 'core' },
      { name: 'API Development', tier: 'core' },
      { name: 'MongoDB', tier: 'working' },
    ],
  },
  {
    label: 'Tooling',
    note: 'Build, test, ship',
    items: [
      { name: 'Foundry', tier: 'core' },
      { name: 'Git', tier: 'core' },
      { name: 'VS Code', tier: 'core' },
      { name: 'Scarb', tier: 'working' },
      { name: 'Starknet Foundry', tier: 'working' },
      { name: 'Claude Code', tier: 'working' },
    ],
  },
];

export const focusAreas = [
  {
    title: 'DeFi protocol security',
    detail: 'Lending, liquidity and treasury logic, where most of the value sits.',
  },
  {
    title: 'EVM vulnerabilities',
    detail: 'Reentrancy, storage and call semantics, upgradeability pitfalls.',
  },
  {
    title: 'Access control',
    detail: 'Authorization boundaries, privileged roles and trust assumptions.',
  },
  {
    title: 'Economic attack vectors',
    detail: 'Oracle manipulation, rounding, incentive and liquidity attacks.',
  },
  {
    title: 'Protocol invariants',
    detail: 'Stating what must always hold, then trying to break it.',
  },
  {
    title: 'AI-assisted analysis',
    detail: 'Using LLM tooling to widen coverage of manual review, not replace it.',
  },
];

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

export const chainEcosystems = [
  { id: 'evm', name: 'Ethereum / EVM', vm: 'Solidity · Foundry', color: '#38bdf8' },
  { id: 'starknet', name: 'Starknet', vm: 'Cairo · ZK Rollup', color: '#a78bfa' },
  { id: 'stellar', name: 'Stellar', vm: 'Soroban · PayFi Rails', color: '#34d399' },
  { id: 'xrpl', name: 'XRPL', vm: 'Institutional Settlement', color: '#60a5fa' },
  { id: 'solana', name: 'Solana', vm: 'Rust · High-Throughput', color: '#c084fc' },
];

export const trashItems = [
  {
    name: 'reentrancy_bug_fixed.sol',
    size: '4.2 KB',
    deleted: 'Yesterday, 11:42 PM',
    kind: 'Solidity Contract',
    note: 'Caught before mainnet deployment. Checks-Effects-Interactions wins again.',
  },
  {
    name: 'unchecked_rounding_poc.t.sol',
    size: '6.8 KB',
    deleted: 'Sep 14, 2026',
    kind: 'Foundry Test',
    note: 'PoC exploit from PayMate audit — remediated and verified.',
  },
  {
    name: 'sleep_schedule_hackathon.bak',
    size: '0 bytes',
    deleted: 'Colosseum Hackathon',
    kind: 'Backup File',
    note: 'Cannot be restored during Solana sprint week.',
  },
  {
    name: 'old_portfolio_v0_draft.fig',
    size: '18.4 MB',
    deleted: 'Nov 2026',
    kind: 'Design File',
    note: 'Replaced by UsmanOS.',
  },
];
