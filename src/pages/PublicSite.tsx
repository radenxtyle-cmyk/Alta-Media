import { useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import SitePreview from '../components/SitePreview';
import { Link } from 'react-router-dom';
import { defaultConfig } from '../defaultConfig';
import { getConfigDoc } from '../firebase';

export default function PublicSite() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    getConfigDoc().then(({ snap }) => {
      if (snap.exists()) {
        setConfig(snap.data() as SiteConfig);
      } else {
        setConfig(defaultConfig);
      }
    }).catch(err => {
      console.warn("Firebase read error, falling back to local config.", err);
      // Fallback to local storage if available, otherwise default config
      const localConfig = localStorage.getItem('siteConfig');
      if (localConfig) {
        try {
          setConfig(JSON.parse(localConfig));
        } catch (e) {
          setConfig(defaultConfig);
        }
      } else {
        setConfig(defaultConfig);
      }
    });
  }, []);

  useEffect(() => {
    if (config?.googleSearchConsoleCode) {
      let meta = document.querySelector('meta[name="google-site-verification"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'google-site-verification');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', config.googleSearchConsoleCode);
    }
  }, [config?.googleSearchConsoleCode]);

  if (!config) {
    return <div className="h-screen w-full flex items-center justify-center bg-[#07050f] text-white">Loading...</div>;
  }

  return (
    <div className="h-screen w-full">
      <SitePreview config={config} />
    </div>
  );
}
