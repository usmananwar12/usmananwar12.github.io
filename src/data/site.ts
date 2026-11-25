/**
 * Global site configuration.
 *
 * Anything marked `TODO:` is a placeholder that still needs real information.
 * A warning is printed during `npm run build` for every placeholder left here.
 */

export const site = {
  name: 'Usman Anwar',
  shortName: 'Usman',
  url: 'https://usmananwar.me',
  role: 'Full-Stack Web3 Engineer',
  location: 'Pakistan',
  title: 'Usman Anwar · Full-Stack Web3 Engineer',
  description:
    'Usman Anwar is a full-stack Web3 engineer at DeFa by InvoiceMate, building liquidity infrastructure for PayFi and real-world finance across EVM, Starknet, Stellar, XRPL and Solana, and working toward smart contract security research.',
  keywords: [
    'Usman Anwar',
    'Web3 engineer',
    'Solidity',
    'Cairo',
    'Starknet',
    'Stellar',
    'XRPL',
    'Solana',
    'EVM',
    'DeFi',
    'PayFi',
    'RWA',
    'smart contract security',
  ],
  ogImage: '/og.png',
};

export const links = {
  github: 'https://github.com/usmananwar11',
  /** Secondary GitHub account, shown under the main one in Contact. */
  githubAlt: 'https://github.com/usmananwar12',
  linkedin: 'https://www.linkedin.com/in/musman-anwar',
  x: 'https://x.com/Usman_Anwar9957',
  telegram: 'https://t.me/usmananwar9957',
  email: 'usmananwar9957@gmail.com',
};

/** Strips the TODO: marker so placeholder links still render while you fill them in. */
export const clean = (value: string) => value.replace(/^TODO:/, '');
export const isPlaceholder = (value: string) => value.startsWith('TODO:');

/** "https://x.com/name" -> "@name" */
export const handle = (url: string) => '@' + clean(url).replace(/\/$/, '').split('/').pop();

const pending = Object.entries(links).filter(([, v]) => isPlaceholder(v));
if (pending.length && typeof process !== 'undefined') {
  console.warn(
    `\n[portfolio] Placeholder values in src/data/site.ts: ${pending.map(([k]) => k).join(', ')}\n`,
  );
}
