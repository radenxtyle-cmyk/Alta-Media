import { useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import AdminSidebar from '../components/AdminSidebar';
import SitePreview from '../components/SitePreview';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function AdminDashboard() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config", err));
  }, []);

  const handlePublish = async () => {
    if (!config) return;
    setIsPublishing(true);
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      alert('Site published successfully!');
    } catch (err) {
      console.error("Failed to publish", err);
      alert('Failed to publish site.');
    } finally {
      setIsPublishing(false);
    }
  };

  if (!config) {
    return <div className="h-screen w-full flex items-center justify-center bg-[#0A0A0A] text-white">Loading Editor...</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0A0A0A] text-gray-300 font-sans">
      {/* Global Header */}
      <header className="h-14 border-b border-[#222] bg-[#111] flex items-center justify-between px-4 shrink-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-[#333] rounded-md text-gray-400 transition-colors"
            title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">W</div>
          <span className="font-semibold text-white tracking-tight hidden sm:block">
            WebEditor AI <span className="text-gray-500 font-normal">/ Admin Dashboard</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Real-time Sync Active
          </div>
          <div className="h-6 w-[1px] bg-[#333] mx-2 hidden sm:block"></div>
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPublishing ? 'Publishing...' : 'Publish Site'}
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Admin Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full'
          } transition-all duration-300 ease-in-out bg-[#0F0F0F] border-r border-[#222] flex-shrink-0 z-20 flex flex-col`}
        >
          <div className="h-full overflow-y-auto w-72">
            <AdminSidebar config={config} onChange={setConfig} />
          </div>
        </aside>

        {/* Website Preview Area */}
        <main className="flex-1 bg-[#1A1A1A] p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-5xl h-full bg-white rounded-lg shadow-2xl relative overflow-auto border-2 border-[#222] ring-1 ring-black/5">
             <SitePreview config={config} />
          </div>
          <div className="absolute top-4 left-4 text-[10px] text-gray-600 flex gap-4 hidden md:flex">
            <span>Canvas View</span>
          </div>
        </main>
      </div>

      {/* Global Footer */}
      <footer className="h-8 bg-[#0F0F0F] border-t border-[#222] px-4 flex items-center justify-between text-[10px] text-gray-600 shrink-0">
        <div className="flex gap-4">
          <span>Elements: Dynamic</span>
          <span>Lat: &lt;10ms</span>
        </div>
        <div className="flex items-center gap-2">
          Design Mode
        </div>
      </footer>
    </div>
  );
}
