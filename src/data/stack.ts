/**
 * Proficiency tiers. These are a first pass, so adjust them to match reality.
 *  - core:    used daily in production work
 *  - working: used regularly and comfortable shipping with
 *  - growing: actively learning and deepening
 */
export type Tier = 'core' | 'working' | 'growing';

export interface StackGroup {
  label: string;
  note: string;
  items: { name: string; tier: Tier }[];
}

export const tierLabel: Record<Tier, string> = {
  core: 'Core',
  working: 'Working',
  growing: 'Growing',
};

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
      { name: 'Scarb', tier: 'working' },
      { name: 'Starknet Foundry', tier: 'working' },
      { name: 'Claude Code', tier: 'working' },
      { name: 'VS Code', tier: 'core' },
    ],
  },
];
