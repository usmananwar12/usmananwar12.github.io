/**
 * Generates static image assets in /public:
 *   og.png (1200x630), apple-touch-icon.png (180x180), favicon.ico (32x32)
 *
 * Run with: npm run og   (re-run after changing the text below)
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const pub = new URL('../public/', import.meta.url);
const sans = "'Helvetica Neue', Inter, Arial, sans-serif";
const mono = "Menlo, 'SF Mono', monospace";

const dots = Array.from({ length: 23 * 43 }, (_, i) => {
  const x = (i % 43) * 28 + 14;
  const y = Math.floor(i / 43) * 28 + 14;
  return `<circle cx="${x}" cy="${y}" r="1" fill="#fff" opacity="0.07"/>`;
}).join('');

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0" stop-color="#7cf5c8" stop-opacity="0.16"/>
      <stop offset="0.5" stop-color="#7888ff" stop-opacity="0.05"/>
      <stop offset="1" stop-color="#08090a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fade" cx="50%" cy="0%" r="85%">
      <stop offset="0.3" stop-color="#fff"/>
      <stop offset="1" stop-color="#000"/>
    </radialGradient>
    <mask id="m"><rect width="1200" height="630" fill="url(#fade)"/></mask>
  </defs>
  <rect width="1200" height="630" fill="#08090a"/>
  <g mask="url(#m)">${dots}</g>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g transform="translate(80 84)">
    <rect x="0.5" y="0.5" width="47" height="47" rx="13" fill="#0e0f11" stroke="#2a2c30"/>
    <path d="M15 14.25v11.25a9 9 0 0 0 18 0V14.25" fill="none" stroke="#f4f5f6" stroke-width="3.6" stroke-linecap="round"/>
    <circle cx="33" cy="14.25" r="3.45" fill="#7cf5c8"/>
    <text x="68" y="32" font-family="${sans}" font-size="24" font-weight="500" fill="#f4f5f6" letter-spacing="-0.5">Usman Anwar</text>
  </g>

  <text x="80" y="300" font-family="${sans}" font-size="64" font-weight="600" fill="#f4f5f6" letter-spacing="-2.6">Building liquidity infrastructure</text>
  <text x="80" y="374" font-family="${sans}" font-size="64" font-weight="600" fill="#f4f5f6" letter-spacing="-2.6">for real-world finance.</text>
  <text x="80" y="448" font-family="${sans}" font-size="64" font-weight="600" fill="#6b7079" letter-spacing="-2.6">Then trying to break it.</text>

  <line x1="80" y1="530" x2="1120" y2="530" stroke="#ffffff" stroke-opacity="0.08"/>
  <circle cx="86" cy="566" r="5" fill="#7cf5c8"/>
  <text x="104" y="572" font-family="${mono}" font-size="19" fill="#a1a5ad">Full-Stack Web3 Engineer · DeFa by InvoiceMate</text>
  <text x="1120" y="572" text-anchor="end" font-family="${mono}" font-size="19" fill="#6b7079">usmananwar.me</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile(new URL('og.png', pub).pathname);

const favicon = await readFile(new URL('favicon.svg', pub));

// apple-touch-icon: solid background, no transparency
const touch = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0e0f11"/>
  <path d="M10 9.5v7.5a6 6 0 0 0 12 0V9.5" fill="none" stroke="#f4f5f6" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="22" cy="9.5" r="2.3" fill="#7cf5c8"/>
</svg>`;
await sharp(Buffer.from(touch)).png().toFile(new URL('apple-touch-icon.png', pub).pathname);

// favicon.ico containing a single 32x32 PNG
const png = await sharp(favicon, { density: 300 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bpp
header.writeUInt32LE(png.length, 14); // size
header.writeUInt32LE(22, 18); // offset
await writeFile(new URL('favicon.ico', pub), Buffer.concat([header, png]));

console.log('Generated og.png, apple-touch-icon.png, favicon.ico');
