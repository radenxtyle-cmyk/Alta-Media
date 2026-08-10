import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { defaultConfig } from './src/defaultConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase, firebaseConfig.firestoreDatabaseId);
const configRef = doc(db, 'app', 'config');

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  const AUTH_TOKEN = 'secret-admin-token-xyz';

  // --- Sitemap & Robots.txt Routes ---
  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.sendFile(sitemapPath);
    } else {
      res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://alta-media.vercel.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
    }
  });

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.sendFile(robotsPath);
    } else {
      res.send(`User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://alta-media.vercel.app/sitemap.xml`);
    }
  });

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
      const docSnap = await getDoc(configRef);
      if (!docSnap.exists()) {
        // Seed default config if not exists
        await setDoc(configRef, defaultConfig);
        res.json(defaultConfig);
      } else {
        res.json(docSnap.data());
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
      await setDoc(configRef, newConfig);
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
