import { useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import AdminSidebar from '../components/AdminSidebar';
import SitePreview from '../components/SitePreview';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { defaultConfig } from '../defaultConfig';
import { getConfigDoc, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLampOn, setIsLampOn] = useState(true);
  const [isPulling, setIsPulling] = useState(false);

  const handleLampPull = () => {
    setIsPulling(true);
    setTimeout(() => {
      setIsPulling(false);
      setIsLampOn(prev => !prev);
    }, 200);
  };

  useEffect(() => {
    if (!token) return;

    getConfigDoc().then(({ snap, configRef }) => {
      if (snap.exists()) {
        setConfig(snap.data() as SiteConfig);
      } else {
        setConfig(defaultConfig);
        setDoc(configRef, defaultConfig).catch(console.error);
      }
    }).catch(err => {
      console.error("Firebase read error", err);
      // Fallback
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
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    // Mock login for frontend since we don't have Firebase Auth set up for the admin
    setTimeout(() => {
      if (password === 'admin123') {
        const localToken = 'local-admin-token';
        setToken(localToken);
        localStorage.setItem('adminToken', localToken);
      } else {
        setLoginError('Invalid password. Hint: default is admin123');
      }
      setIsLoggingIn(false);
    }, 500);
  };

  const handlePublish = async () => {
    if (!config) return;
    setIsPublishing(true);
    
    try {
      const configRef = doc(db, 'app', 'config');
      await setDoc(configRef, config);
      alert('Site published successfully to online database!');
    } catch (err) {
      console.error("Failed to publish", err);
      // Fallback
      localStorage.setItem('siteConfig', JSON.stringify(config));
      alert('Failed to publish to server, but changes were saved locally to your browser!');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
    setConfig(null);
  };

  if (!token) {
    return (
      <div className={`h-screen w-full flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 transition-colors duration-1000 ${isLampOn ? 'bg-[#171615]' : 'bg-[#0a0a0a]'} text-white font-sans relative overflow-hidden`}>
        {/* Background ambient glow */}
        <div className={`absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${isLampOn ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Lamp CSS Art */}
        <div className="relative flex flex-col items-center z-10 hidden md:flex">
          {/* Intense Glow */}
          <div className={`absolute top-10 w-96 h-96 bg-yellow-100/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 ${isLampOn ? 'opacity-100' : 'opacity-0'}`}></div>
          
          {/* Lampshade */}
          <div className={`w-56 h-24 rounded-t-[100px] relative z-10 transition-all duration-500 ${isLampOn ? 'bg-[#f4f4f5] shadow-[inset_0_-5px_15px_rgba(0,0,0,0.1),0_10px_40px_rgba(255,255,255,0.2)]' : 'bg-[#a1a1aa] shadow-[inset_0_-5px_15px_rgba(0,0,0,0.3)]'}`}></div>
          
          {/* Pull chain */}
          <div 
            onClick={handleLampPull}
            className="absolute top-24 left-1/2 ml-8 w-[2px] h-20 bg-gray-400/40 z-10 flex flex-col items-center justify-end group cursor-pointer"
          >
            <div className={`w-4 h-4 bg-[#b5835a] rounded-full shadow-md transition-transform duration-200 ${isPulling ? 'translate-y-8' : 'group-hover:translate-y-2'}`}></div>
          </div>
          
          {/* Stand */}
          <div className="w-4 h-56 bg-[#e4e4e7] z-10 shadow-[-5px_0_10px_rgba(0,0,0,0.05)]"></div>
          
          {/* Base */}
          <div className="w-40 h-5 bg-[#f4f4f5] rounded-full z-10 shadow-[0_5px_15px_rgba(0,0,0,0.3)]"></div>
        </div>

        {/* Login Form Card */}
        <form onSubmit={handleLogin} className={`backdrop-blur-2xl border transition-all duration-1000 p-10 rounded-[32px] w-full max-w-[360px] flex flex-col gap-6 z-10 mx-4 md:mx-0 ${isLampOn ? 'bg-white/[0.03] border-white/5 shadow-2xl opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <h2 className="text-white text-[22px] font-semibold text-center mb-2">Welcome</h2>
          
          <div className="flex flex-col gap-2">
            <label className="text-white/50 text-xs ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="bg-black/20 border border-white/5 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-yellow-500/30 transition-colors"
              required
            />
          </div>
          
          {loginError && <p className="text-red-400 text-xs text-center">{loginError}</p>}
          
          <button 
            type="submit"
            disabled={isLoggingIn}
            className="mt-2 w-full bg-gradient-to-r from-[#e3c178] via-[#ffd770] to-[#e3c178] text-yellow-950 font-bold text-sm py-3.5 rounded-2xl shadow-[0_0_20px_rgba(255,215,112,0.15)] hover:shadow-[0_0_30px_rgba(255,215,112,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {isLoggingIn ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    );
  }

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
          <button 
            onClick={handleLogout}
            className="bg-transparent hover:bg-red-500/10 text-red-500 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-red-500/20"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Admin Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-84 md:w-96 translate-x-0' : 'w-0 -translate-x-full'
          } transition-all duration-300 ease-in-out bg-[#0F0F0F] border-r border-[#222] flex-shrink-0 z-20 flex flex-col overflow-x-hidden`}
        >
          <div className="h-full overflow-y-auto overflow-x-hidden w-84 md:w-96">
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
