import { useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import SitePreview from '../components/SitePreview';
import { Link } from 'react-router-dom';

export default function PublicSite() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => {
        console.error("Failed to load config", err);
        setError("Could not load the website configuration.");
      });
  }, []);

  if (error) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#07050f] text-white">
        <p className="text-red-400 mb-4">{error}</p>
        <Link to="/admin" className="text-indigo-400 underline">Go to Admin Dashboard</Link>
      </div>
    );
  }

  if (!config) {
    return <div className="h-screen w-full flex items-center justify-center bg-[#07050f] text-white">Loading...</div>;
  }

  // Pass the config to the preview component.
  // In a real application, you might extract the JSX from SitePreview and render it cleanly here.
  return (
    <div className="h-screen w-full">
      <SitePreview config={config} />
    </div>
  );
}
