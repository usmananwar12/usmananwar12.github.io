# UsmanOS — Interactive MacBook Portfolio Prototype

This folder contains the standalone macOS Sequoia/Sonoma-inspired portfolio prototype for **Usman Anwar**. None of the existing root website files were modified.

## Run Locally

```bash
cd macbook-os
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Live Email Sending (Nodemailer)

The Mail app posts to `/api/send-email` (handled automatically during `npm run dev` via Vite middleware, and ready for Vercel serverless deployment via `api/send-email.mjs`). It sends **two** emails:
1. The visitor's message to `usmananwar9957@gmail.com` (with `Reply-To` set to the visitor's email).
2. A branded confirmation email back to the visitor's `From:` email address.

To deliver straight into real Gmail inboxes:
```bash
cp .env.example .env
```
Then paste a 16-character Gmail App Password into `SMTP_PASS` inside `macbook-os/.env` and restart `npm run dev`. Without `.env`, Nodemailer automatically falls back to an Ethereal sandbox test account and displays clickable preview URLs for both emails directly inside the Mail window.

## What's Inside

- **macOS Lock Screen**: Live date/clock, Usman's profile avatar, click or press `Enter` to unlock as Guest.
- **Desktop & Widgets**: Live status widget, interactive multi-chain switcher (EVM, Starknet, Stellar, XRPL, Solana), Quick Tour sticky note, desktop icons, and right-click context menu.
- **Full Window Manager**: Drag windows, resize from any edge/corner, minimize to Dock, maximize/double-click titlebar, z-index focus stacking, and `⌘K` / `Ctrl+K` Spotlight Search.
- **Control Center & System Settings**: Dark/Light mode toggle, 5 wallpapers, 5 accent colors, brightness slider, Dock magnification toggle, subtle macOS UI sound effects, and **About This Mac**.
- **10 Interactive Apps**:
  1. **Finder** — Projects (`PayMate`, `CredMate`, `DeFa Marketplace`, `Private RWA & Lending`, `ChainSec`, `DeKYC`), Experience, Audits & Tech Stack with Grid/List view and Inspector pane.
  2. **Notes** — About Me, Engineering Principles, DeFa Experience, plus an editable Visitor Scratchpad & ability to create new notes.
  3. **VS Code** — Tech Stack matrix (`Core` / `Working`) plus Solidity (`PayMatePool.sol`), Cairo (`cred_mate.cairo`), and `chainsec.config.json`.
  4. **Terminal** — Interactive Zsh CLI (`help`, `whoami`, `neofetch`, `projects`, `experience`, `skills`, `audits`, `socials`, `open <app>`, `theme dark|light`, `clear`, Tab autocomplete & command history).
  5. **ChainSec Audit Lab** — PayMate Pre-Production Audit (2 High, 10 Medium, 4 Low = 16 findings), visual severity bars, ChainSec 5-stage AI audit pipeline, Focus Areas & Audit Platforms.
  6. **Safari** — Bookmarks, GitHub profiles (`usmananwar11` & `usmananwar12`), ChainSec README & Multi-Chain overview.
  7. **Preview (`Resume.pdf`)** — Zoomable, print/save-to-PDF resume view.
  8. **Mail** — Pre-addressed email composer (`usmananwar9957@gmail.com`), one-click copy email, and social links.
  9. **System Settings** — Customize appearance, wallpaper, accent color, dock & sounds.
  10. **Trash** — Developer easter egg (`reentrancy_bug_fixed.sol`, `sleep_schedule_hackathon.bak`, etc.) with working Empty Trash.
