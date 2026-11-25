export interface Role {
  company: string;
  companyUrl?: string;
  role: string;
  /** e.g. "Dec 2025 — Present" */
  period: string;
  summary: string;
  focus: string[];
  chains: string[];
  stack: string[];
  /** Ecosystem programs, accelerators and hackathons you represented the company at. */
  programs?: { name: string; ecosystem: string }[];
}

export const experience: Role[] = [
  {
    company: 'DeFa by InvoiceMate',
    // TODO: confirm the public URL for DeFa
    companyUrl: undefined,
    role: 'Full-Stack Web3 Engineer',
    period: 'Dec 2025 — Present',
    summary:
      'DeFa is Liquidity-as-a-Service infrastructure that connects PayFi and TradFi dealflow with decentralized liquidity. I work across the stack: from the contracts that hold and move capital to the services and interfaces built on top of them.',
    focus: [
      'Develop and integrate EVM smart contracts in Solidity, and Starknet contracts in Cairo.',
      'Design lending pools, liquidity mechanisms and treasury systems.',
      'Build blockchain applications across EVM, Starknet, Stellar, XRPL and Solana.',
      'Wire on-chain logic into backend services and frontend applications end to end.',
      'Work on DeFi, PayFi and real-world asset financing infrastructure.',
      'Security-review protocol code before it ships, including the pre-production review of PayMate: 7 Low and Medium severity issues, all fixed before launch.',
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
