import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteConfig } from '../types';
import { defaultConfig } from '../defaultConfig';

export default function BlogPost() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  // Load config from local storage (similar to other pages)
  useEffect(() => {
    const saved = localStorage.getItem('siteConfig');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing config', e);
      }
    }
  }, []);

  const blog = config.blog;
  if (!blog) return null;

  return (
    <div className="min-h-screen bg-[#07050f] text-white font-sans selection:bg-indigo-500/30 pb-20">
      {/* Top Navbar / Breadcrumbs */}
      <header className="px-6 py-4 border-b border-white/5 bg-[#07050f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Icons.Home size={14} /> Home
            </Link>
            <Icons.ChevronRight size={12} className="opacity-50" />
            <span className="hover:text-white transition-colors cursor-pointer">Components</span>
            <Icons.ChevronRight size={12} className="opacity-50" />
            <span className="text-white">{blog.title.split(' ')[0]} {blog.title.split(' ')[1]} {blog.title.split(' ')[2]}...</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icons.X size={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icons.HelpCircle size={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icons.Share2 size={14} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-8 space-y-8">
        
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Animated Gradient Form</h1>

        {/* Preview Container */}
        <div className="bg-[#111118] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#15151c]">
            <div className="flex items-center bg-black/40 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'preview' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Icons.Eye size={14} /> Preview
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'code' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
              >
                <Icons.Code size={14} /> Code
              </button>
            </div>
            
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${activeTab === 'code' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center bg-black/40 p-1 rounded-lg mr-2">
                <button 
                  onClick={() => setDevice('desktop')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${device === 'desktop' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Icons.Monitor size={14} />
                </button>
                <button 
                  onClick={() => setDevice('tablet')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${device === 'tablet' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Icons.Tablet size={14} />
                </button>
                <button 
                  onClick={() => setDevice('mobile')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${device === 'mobile' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Icons.Smartphone size={14} />
                </button>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/40 text-gray-400 hover:text-white border border-white/5">
                <Icons.RefreshCw size={14} />
              </button>
            </div>
          </div>
          
          {/* Main Canvas Area */}
          <div className="w-full h-[600px] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative flex items-center justify-center overflow-hidden transition-colors">
            
            {/* Preview Mode */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${activeTab === 'preview' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-10 pointer-events-none'}`}>
              <div 
                className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl p-8 flex flex-col transition-all duration-500 ease-in-out origin-top"
                style={{
                  width: device === 'mobile' ? '320px' : device === 'tablet' ? '500px' : '400px',
                  borderRadius: device === 'mobile' ? '24px' : '4px',
                  transform: device === 'mobile' ? 'scale(0.9)' : 'scale(1)',
                  height: device === 'mobile' ? '580px' : 'auto'
                }}
              >
                <h2 className="text-2xl font-bold text-center text-black mb-8">Login Here</h2>
                
                <div className="space-y-6 mb-4">
                  <div className="relative">
                    <input type="text" placeholder="Enter email" className="w-full bg-transparent border-b-2 border-black/80 pb-2 text-black font-medium placeholder-black/50 focus:outline-none focus:border-indigo-600" />
                    <Icons.User size={16} className="absolute right-0 top-1 text-black/80" />
                  </div>
                  <div className="relative">
                    <input type="password" placeholder="Enter password" className="w-full bg-transparent border-b-2 border-black/80 pb-2 text-black font-medium placeholder-black/50 focus:outline-none focus:border-indigo-600" />
                    <Icons.Lock size={16} className="absolute right-0 top-1 text-black/80" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs font-medium text-black/70 mb-8 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded-sm border-black/50" />
                    Save login information
                  </label>
                  <span className="cursor-pointer hover:underline">Forgot password?</span>
                </div>
                
                <button className="w-full bg-black text-white font-bold py-3 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
                  <Icons.LogIn size={16} /> Login
                </button>
                
                <p className="text-center text-xs font-medium text-black/70 mt-6">
                  Don't have an account? <span className="font-bold cursor-pointer hover:underline">Create Account</span>
                </p>
              </div>
            </div>

            {/* Code Mode */}
            <div className={`absolute inset-0 bg-[#0d0d12] flex flex-col transition-all duration-500 ease-in-out ${activeTab === 'code' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 -translate-y-10 pointer-events-none'}`}>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#16161e] border-b border-white/10">
                <button className="px-3 py-1.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded">HTML</button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">CSS</button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">JS</button>
              </div>
              <div className="flex-1 p-6 overflow-auto font-mono text-[13px] leading-loose text-gray-300">
<pre><code><span className="text-gray-500">&lt;!-- Animated Gradient Form HTML Structure --&gt;</span>
<span className="text-blue-400">&lt;div</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"gradient-wrapper"</span><span className="text-blue-400">&gt;</span>
  <span className="text-blue-400">&lt;form</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"glass-form"</span><span className="text-blue-400">&gt;</span>
    <span className="text-blue-400">&lt;h2&gt;</span>Login Here<span className="text-blue-400">&lt;/h2&gt;</span>
    
    <span className="text-blue-400">&lt;div</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"input-group"</span><span className="text-blue-400">&gt;</span>
      <span className="text-blue-400">&lt;input</span> <span className="text-purple-400">type</span>=<span className="text-green-400">"email"</span> <span className="text-purple-400">placeholder</span>=<span className="text-green-400">"Enter email"</span><span className="text-blue-400">&gt;</span>
      <span className="text-blue-400">&lt;i</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"fas fa-user"</span><span className="text-blue-400">&gt;&lt;/i&gt;</span>
    <span className="text-blue-400">&lt;/div&gt;</span>

    <span className="text-blue-400">&lt;div</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"input-group"</span><span className="text-blue-400">&gt;</span>
      <span className="text-blue-400">&lt;input</span> <span className="text-purple-400">type</span>=<span className="text-green-400">"password"</span> <span className="text-purple-400">placeholder</span>=<span className="text-green-400">"Enter password"</span><span className="text-blue-400">&gt;</span>
      <span className="text-blue-400">&lt;i</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"fas fa-lock"</span><span className="text-blue-400">&gt;&lt;/i&gt;</span>
    <span className="text-blue-400">&lt;/div&gt;</span>

    <span className="text-blue-400">&lt;div</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"form-options"</span><span className="text-blue-400">&gt;</span>
      <span className="text-blue-400">&lt;label&gt;</span>
        <span className="text-blue-400">&lt;input</span> <span className="text-purple-400">type</span>=<span className="text-green-400">"checkbox"</span><span className="text-blue-400">&gt;</span> Save login information
      <span className="text-blue-400">&lt;/label&gt;</span>
      <span className="text-blue-400">&lt;a</span> <span className="text-purple-400">href</span>=<span className="text-green-400">"#"</span><span className="text-blue-400">&gt;</span>Forgot password?<span className="text-blue-400">&lt;/a&gt;</span>
    <span className="text-blue-400">&lt;/div&gt;</span>

    <span className="text-blue-400">&lt;button</span> <span className="text-purple-400">type</span>=<span className="text-green-400">"submit"</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"login-btn"</span><span className="text-blue-400">&gt;</span>
      <span className="text-blue-400">&lt;i</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"fas fa-sign-in-alt"</span><span className="text-blue-400">&gt;&lt;/i&gt;</span> Login
    <span className="text-blue-400">&lt;/button&gt;</span>
  <span className="text-blue-400">&lt;/form&gt;</span>
<span className="text-blue-400">&lt;/div&gt;</span></code></pre>
              </div>
            </div>

          </div>
        </div>

        {/* Content and Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* MAIN CONTENT (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Article Header */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {blog.title}
              </h2>
              
              <div className="flex items-center gap-3">
                <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                  <Icons.Github size={12} /> github.com/source
                </a>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                  <Icons.Youtube size={12} /> {blog.views} Views
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed pt-2" dangerouslySetInnerHTML={{ 
                __html: blog.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
            </div>

            {/* About Box */}
            <div className="bg-blue-950/20 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-blue-400 text-xs font-black tracking-widest uppercase mb-3 flex items-center gap-2">
                About Animated Gradient Form
              </h3>
              <p className="text-blue-100/70 text-sm leading-relaxed font-medium">
                {blog.aboutText}
              </p>
            </div>

            {/* Project Specs */}
            <div className="border border-white/10 bg-white/[0.02] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-white/70 flex items-center gap-2">
                  <Icons.Layout size={14} className="text-indigo-400" /> Project Specifications & Metadata
                </h3>
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-white/50 tracking-wider">
                  <Icons.Code size={10} className="inline mr-1"/> LIVE FEATURES
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
                  <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Price / License</div>
                  <div className="text-indigo-400 font-black text-sm">{blog.price}</div>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
                  <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Total Views</div>
                  <div className="text-white font-bold text-sm flex items-center gap-1">
                    <Icons.TrendingUp size={12} className="text-orange-400" /> {blog.views}
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
                  <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Tech Stack</div>
                  <div className="text-white font-bold text-sm">{blog.techStack}</div>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
                  <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Source Assets</div>
                  <div className="text-white font-bold text-sm">{blog.sourceAssets}</div>
                </div>
              </div>
            </div>

            {/* Architecture Box */}
            <div className="border border-white/10 bg-white/[0.02] rounded-xl p-6">
              <h3 className="text-xs font-black tracking-widest uppercase text-white/70 mb-6">
                Technical Overview & Architecture
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-white/5 p-4 rounded-lg">
                  <div className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1.5">
                    <Icons.FileCode size={14} /> HTML5 STRUCTURE
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Semantic tags, structural containers, form elements, accessible ARIA attributes, and clean DOM markup.
                  </p>
                </div>
                <div className="border border-white/5 p-4 rounded-lg">
                  <div className="text-xs font-bold text-pink-400 mb-2 flex items-center gap-1.5">
                    <Icons.Palette size={14} /> CSS3 STYLING & FX
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Flexbox/Grid layout, custom CSS variables, keyframe animations, glassmorphism, and responsive breakpoints.
                  </p>
                </div>
                <div className="border border-white/5 p-4 rounded-lg">
                  <div className="text-xs font-bold text-yellow-400 mb-2 flex items-center gap-1.5">
                    <Icons.Terminal size={14} /> VANILLA JS LOGIC
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    DOM element selection, event listeners (click, input, submit), dynamic state toggling, and interaction UI states.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1 */}
            <div className="space-y-6 pt-4">
              <h2 className="text-xl font-bold text-blue-400 border-b border-white/10 pb-4">
                Step 1: HTML Markup <span className="text-white"> — Building the DOM Hierarchy</span>
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                The HTML structure acts as the foundational skeleton for <strong>Animated Gradient Form</strong>. It defines the main wrapper containers, inner content sections, text headings, form controls, and interactive elements.
              </p>
              <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                <li><strong className="text-white">Container Wrappers:</strong> Encloses the entire component to manage central positioning, margin auto-alignment, and max-width boundaries.</li>
                <li><strong className="text-white">Semantic Headings:</strong> Uses structured <code className="bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded text-xs">h1</code> / <code className="bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded text-xs">h2</code> elements to ensure SEO search crawler accessibility.</li>
                <li><strong className="text-white">Interactive Elements:</strong> Incorporates buttons, input controls, and trigger targets with explicit id and class tags for styling and JavaScript binding.</li>
              </ul>

              {/* Code Block */}
              <div className="bg-[#0d0d12] border border-white/10 rounded-xl overflow-hidden mt-6">
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#16161e]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <span className="text-xs font-bold text-gray-400 ml-2">index.html</span>
                  </div>
                  <button className="text-[10px] font-bold text-gray-400 hover:text-white bg-white/5 px-2 py-1 rounded transition-colors">
                    Copy HTML
                  </button>
                </div>
                <div className="p-4 overflow-x-auto text-xs font-mono leading-loose text-gray-300">
<pre><code>{blog.htmlCode.split('\n').map((line, i) => (
  <span key={i} className="block">{line}</span>
))}</code></pre>
                </div>
              </div>
            </div>

          </div>

          {/* SIDEBAR (Right) */}
          <div className="space-y-6">
            
            {/* Action Card */}
            <div className="bg-[#111116] border border-white/10 p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50"></div>
              <h3 className="font-bold text-lg mb-4">Animated Gradient Form</h3>
              
              <div className="mb-6">
                <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Access Type</div>
                <div className="text-green-400 font-black text-2xl">FREE</div>
              </div>

              <div className="w-full h-px bg-white/10 mb-6"></div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Icons.ShoppingCart size={16} /> Add to Cart
                </button>
                <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Icons.Eye size={16} /> Live Preview Component
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1.5 text-green-400"><Icons.CheckCircle2 size={12} /> Instant Access</span>
                <span className="flex items-center gap-1.5"><Icons.Clock size={12} /> Lifetime updates</span>
              </div>
            </div>

            {/* Upsell Card */}
            <div className="bg-gradient-to-b from-[#1a1c29] to-[#0f111a] border border-blue-500/20 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
              
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-4 border border-blue-500/30">
                <Icons.Star size={10} className="fill-blue-400" /> LIMITED SERIES
              </div>
              
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                Ship <span className="text-blue-400">Faster</span> with Agentic Pro
              </h3>
              
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Stop building from scratch. Get premium components & templates and create websites without limit.
              </p>
              
              <ul className="space-y-2.5 text-xs text-gray-300 font-medium mb-6">
                <li className="flex items-center gap-2"><Icons.Check size={14} className="text-blue-400" /> 1000+ premium blocks</li>
                <li className="flex items-center gap-2"><Icons.Check size={14} className="text-blue-400" /> 500+ components</li>
                <li className="flex items-center gap-2"><Icons.Check size={14} className="text-blue-400" /> 10 early templates</li>
                <li className="flex items-center gap-2"><Icons.Check size={14} className="text-blue-400" /> Lifetime updates</li>
              </ul>

              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl font-black text-white">$99</div>
                <div className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/10 uppercase">/ year</div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                Get Lifetime Access &rarr;
              </button>
            </div>

            {/* Trending Components */}
            <div className="bg-[#111116] border border-white/10 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2 text-sm">
                  <Icons.Flame size={16} className="text-orange-500" /> Trending Components
                </h3>
                <span className="text-[10px] font-bold text-gray-500 hover:text-white cursor-pointer transition-colors">View All &rarr;</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Modern Responsive Webpage", views: "15.4K Views", color: "bg-teal-500/20" },
                  { title: "Password Reveal Animation", views: "12.8K Views", color: "bg-purple-500/20" },
                  { title: "Cursor Interaction", views: "9.2K Views", color: "bg-pink-500/20" },
                  { title: "Death Launching Webpage", views: "19.1K Views", color: "bg-green-500/20" },
                  { title: "Animated Login Screen", views: "14.5K Views", color: "bg-blue-500/20" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className={`w-12 h-10 rounded-lg ${item.color} border border-white/10 flex items-center justify-center overflow-hidden relative shrink-0`}>
                      <div className="w-6 h-4 bg-white/20 rounded shadow-sm border border-white/30 group-hover:scale-110 transition-transform"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-200 truncate group-hover:text-blue-400 transition-colors">{item.title}</h4>
                      <div className="flex items-center gap-1 text-[10px] text-red-400 font-bold mt-0.5">
                        <Icons.TrendingUp size={10} /> {item.views}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
