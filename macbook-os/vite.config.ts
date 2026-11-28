import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { sendPortfolioEmails } from './server/mailer.mjs';
import type { IncomingMessage, ServerResponse } from 'node:http';

function readJsonBody(req: IncomingMessage): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 100_000) {
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

function registerMailMiddleware(middlewares: { use: (path: string, fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) => void }) {
  middlewares.use('/api/send-email', async (req, res, next) => {
    if (req.method !== 'POST') {
      next();
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    try {
      const body = await readJsonBody(req);
      const result = await sendPortfolioEmails({
        fromName: body.fromName,
        fromEmail: body.fromEmail,
        subject: body.subject,
        message: body.message,
      });
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          ok: false,
          error: err instanceof Error ? err.message : 'Failed to send email.',
        }),
      );
    }
  });
}

function mailApiPlugin(): Plugin {
  return {
    name: 'usman-mail-api',
    configureServer(server) {
      registerMailMiddleware(server.middlewares);
    },
    configurePreviewServer(server) {
      registerMailMiddleware(server.middlewares);
    },
  };
}

export default defineConfig({
  plugins: [react(), mailApiPlugin()],
  server: {
    port: 5173,
    open: false,
  },
});
