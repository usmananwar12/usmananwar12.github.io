export interface Project {
  name: string;
  /** One-line positioning statement. */
  tagline: string;
  description: string;
  context: string;
  tags: string[];
  /** Optional public link. Leave undefined if the project is not public. */
  href?: string;
}

/**
 * Only publicly shareable information belongs here.
 * Add more entries to the end of the array; the layout adapts automatically.
 */
export const projects: Project[] = [
  {
    name: 'PayMate',
    tagline: 'Prefunding protocol for payment flows',
    description:
      'A prefunding protocol that connects liquidity providers with payment service providers.',
    context: 'DeFa by InvoiceMate',
    tags: ['PayFi', 'Liquidity', 'Smart Contracts'],
  },
  {
    name: 'CredMate',
    tagline: 'On-chain credit and verification on Starknet',
    description:
      'Blockchain-based credit and verification infrastructure built on Starknet.',
    context: 'DeFa by InvoiceMate',
    tags: ['Starknet', 'Cairo', 'Credit'],
  },
  {
    name: 'DeFa Marketplace',
    tagline: 'SME financing marketplace',
    description:
      'A financing marketplace for SMEs, part of the DeFa platform that connects real-world dealflow with decentralized liquidity.',
    context: 'DeFa by InvoiceMate',
    tags: ['RWA', 'Marketplace', 'Full-Stack'],
  },
  {
    name: 'Private RWA & Lending',
    tagline: 'Privacy-focused financing integrations',
    description:
      'Privacy-focused integrations for real-world asset financing and lending.',
    context: 'DeFa by InvoiceMate',
    tags: ['RWA', 'Lending', 'Privacy'],
  },
  {
    name: 'ChainSec',
    tagline: 'Smart contract audit pipeline for AI agents',
    description:
      'An open-source, multi-chain audit pipeline that runs inside AI coding agents like Claude Code. Solidity today, Starknet Cairo in preview, Soroban planned. Used on the PayMate pre-production review.',
    context: 'Open source',
    tags: ['Security', 'AI Agents', 'Solidity'],
    href: 'https://github.com/usmananwar11/ChainSec',
  },
  // Add other public projects here.
];
