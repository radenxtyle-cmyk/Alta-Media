import { useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import AdminSidebar from '../components/AdminSidebar';
import SitePreview from '../components/SitePreview';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { defaultConfig } from '../defaultConfig';

export default function AdminDashboard() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [useLocalFallback, setUseLocalFallback] = useState(false);
  
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch('/api/config')
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => setConfig(data))
      .catch(err => {
        console.warn("Backend not available, falling back to local config.", err);
        setUseLocalFallback(true);
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
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        if (!res.ok) throw new Error('Invalid password');
        const data = await res.json();
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
      } else {
        throw new Error('API not available');
      }
    } catch (err: any) {
      if (err.message === 'Invalid password') {
        setLoginError('Invalid password. Hint: default is admin123');
      } else {
        if (password === 'admin123') {
          const localToken = 'local-admin-token';
          setToken(localToken);
          localStorage.setItem('adminToken', localToken);
        } else {
          setLoginError('Invalid password. Hint: default is admin123');
        }
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handlePublish = async () => {
    if (!config) return;
    setIsPublishing(true);
    
    if (useLocalFallback) {
      // Simulate network request then save to localStorage
      setTimeout(() => {
        localStorage.setItem('siteConfig', JSON.stringify(config));
        alert('Site published successfully (saved to browser local storage)!');
        setIsPublishing(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(config),
      });
      if (res.status === 401) {
        setToken(null);
        localStorage.removeItem('adminToken');
        alert('Session expired. Please log in again.');
        return;
      }
      if (!res.ok) throw new Error("Failed to save");
      alert('Site published successfully!');
    } catch (err) {
      console.error("Failed to publish", err);
      // Fallback
      localStorage.setItem('siteConfig', JSON.stringify(config));
      setUseLocalFallback(true);
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
      <div className="h-screen w-full flex items-center justify-center bg-[#07050f] text-white font-sans">
        <form onSubmit={handleLogin} className="bg-[#131127] p-8 rounded-xl border border-[#262445] w-full max-w-sm flex flex-col gap-4 shadow-2xl">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white text-xl mx-auto mb-4 shadow-lg shadow-indigo-500/20">
              W
            </div>
            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-[#8a8dab] mt-1">Please enter your password</p>
          </div>
          
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#07050f] border border-[#262445] rounded-lg text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              required
            />
          </div>
          
          {loginError && <p className="text-red-400 text-xs text-center">{loginError}</p>}
          
          <button 
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 mt-2"
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
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
