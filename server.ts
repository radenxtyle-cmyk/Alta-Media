import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';
import { defaultConfig } from './src/defaultConfig';

const PORT = 3000;
const CONFIG_FILE = path.join(process.cwd(), 'site-config.json');

async function startServer() {
  const app = express();
  app.use(express.json());

  // Ensure default config exists
  try {
    await fs.access(CONFIG_FILE);
  } catch {
    await fs.writeFile(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
  }

  // --- API Routes (Backend) ---
  app.get('/api/config', async (req, res) => {
    try {
      const data = await fs.readFile(CONFIG_FILE, 'utf-8');
      res.json(JSON.parse(data));
    } catch (error) {
      console.error("Error reading config:", error);
      res.status(500).json({ error: 'Failed to read config' });
    }
  });

  app.post('/api/config', async (req, res) => {
    try {
      const newConfig = req.body;
      await fs.writeFile(CONFIG_FILE, JSON.stringify(newConfig, null, 2));
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
