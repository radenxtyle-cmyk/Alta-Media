import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { defaultConfig } from './src/defaultConfig';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const appFirebase = initializeApp({
  credential: applicationDefault(),
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'gen-lang-client-0214630999'
});
const db = getFirestore(appFirebase);
const configRef = db.collection('app').doc('config');

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  const AUTH_TOKEN = 'secret-admin-token-xyz';

  // --- API Routes (Backend) ---
  app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ token: AUTH_TOKEN });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  });

  app.get('/api/config', async (req, res) => {
    try {
      const doc = await configRef.get();
      if (!doc.exists) {
        // Seed default config if not exists
        await configRef.set(defaultConfig);
        res.json(defaultConfig);
      } else {
        res.json(doc.data());
      }
    } catch (error) {
      console.error("Error reading config:", error);
      res.status(500).json({ error: 'Failed to read config' });
    }
  });

  app.post('/api/config', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${AUTH_TOKEN}`) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const newConfig = req.body;
      await configRef.set(newConfig);
      res.json({ success: true });
    } catch (error) {
      console.error("Error writing config:", error);
      res.status(500).json({ error: 'Failed to save config' });
    }
  });

  // --- Vite Middleware (Frontend) ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
