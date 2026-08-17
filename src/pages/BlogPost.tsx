import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogPost() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

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
            <span className="text-white">Animated Gradient Form</span>
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
            
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/40 p-1 rounded-lg mr-2">
                <button className="px-3 py-1.5 rounded-md text-gray-400 hover:text-white bg-white/10">
                  <Icons.Monitor size={14} />
                </button>
                <button className="px-3 py-1.5 rounded-md text-gray-400 hover:text-white">
                  <Icons.Tablet size={14} />
                </button>
                <button className="px-3 py-1.5 rounded-md text-gray-400 hover:text-white">
                  <Icons.Smartphone size={14} />
                </button>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/40 text-gray-400 hover:text-white border border-white/5">
                <Icons.RefreshCw size={14} />
              </button>
            </div>
          </div>
          
          {/* Preview Canvas */}
          <div className="w-full h-[600px] bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative flex items-center justify-center">
            {/* The mockup form */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl p-8 rounded-sm w-[400px] flex flex-col">
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
        </div>

        {/* Content and Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* MAIN CONTENT (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Article Header */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                How to Make Animated Gradient Form in HTML, CSS & JavaScript
              </h2>
              
              <div className="flex items-center gap-3">
                <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                  <Icons.Github size={12} /> github.com/source
                </a>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                  <Icons.Youtube size={12} /> 9,850 Views
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed pt-2">
                In this comprehensive tutorial, we will build a production-ready, fully responsive <strong>Animated Gradient Form</strong> from scratch using <strong>HTML5, CSS3, and modern JavaScript (ES6+)</strong>.
              </p>
            </div>

            {/* About Box */}
            <div className="bg-blue-950/20 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-blue-400 text-xs font-black tracking-widest uppercase mb-3 flex items-center gap-2">
                About Animated Gradient Form
              </h3>
              <p className="text-blue-100/70 text-sm leading-relaxed font-medium">
                This project is a modern and responsive login form designed with HTML, CSS, and Font Awesome icons, featuring a clean and attractive UI. It includes animated background gradients, sleek input fields, and a "Login" button, along with options for saving login information and password recovery. The design incorporates engaging animations, a blur effect for visual depth, and easy navigation with social media links. This project is beginner-friendly, demonstrating key web development concepts like form handling, responsive design, and basic animations, while also being visually professional and aesthetically pleasing.
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
                  <div className="text-indigo-400 font-black text-sm">FREE</div>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
                  <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Total Views</div>
                  <div className="text-white font-bold text-sm flex items-center gap-1">
                    <Icons.TrendingUp size={12} className="text-orange-400" /> 9,850
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
                  <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Tech Stack</div>
                  <div className="text-white font-bold text-sm">HTML5 / CSS3 / JS</div>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-lg">
                  <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase">Source Assets</div>
                  <div className="text-white font-bold text-sm">20+ Files Included</div>
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
<pre><code><span className="text-gray-500">&lt;!DOCTYPE html&gt;</span>
<span className="text-blue-400">&lt;html</span> <span className="text-purple-400">lang</span>=<span className="text-green-400">"en"</span><span className="text-blue-400">&gt;</span>
<span className="text-blue-400">&lt;head&gt;</span>
    <span className="text-blue-400">&lt;meta</span> <span className="text-purple-400">charset</span>=<span className="text-green-400">"UTF-8"</span><span className="text-blue-400">&gt;</span>
    <span className="text-blue-400">&lt;meta</span> <span className="text-purple-400">name</span>=<span className="text-green-400">"viewport"</span> <span className="text-purple-400">content</span>=<span className="text-green-400">"width=device-width, initial-scale=1.0"</span><span className="text-blue-400">&gt;</span>
    <span className="text-blue-400">&lt;title&gt;</span>Document<span className="text-blue-400">&lt;/title&gt;</span>
    <span className="text-gray-500">&lt;!-- Link to Font Awesome Icons --&gt;</span>
    <span className="text-blue-400">&lt;link</span> <span className="text-purple-400">rel</span>=<span className="text-green-400">"stylesheet"</span> <span className="text-purple-400">href</span>=<span className="text-green-400">"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"</span><span className="text-blue-400">&gt;</span>
<span className="text-blue-400">&lt;/head&gt;</span>
<span className="text-blue-400">&lt;body&gt;</span>
    <span className="text-gray-500">&lt;!-- Form Wrapper --&gt;</span>
    <span className="text-blue-400">&lt;div</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"container"</span><span className="text-blue-400">&gt;</span>
        <span className="text-blue-400">&lt;form</span> <span className="text-purple-400">action</span>=<span className="text-green-400">""</span><span className="text-blue-400">&gt;</span>
            <span className="text-blue-400">&lt;h2&gt;</span>Login Here<span className="text-blue-400">&lt;/h2&gt;</span>
            <span className="text-blue-400">&lt;div</span> <span className="text-purple-400">class</span>=<span className="text-green-400">"input-group"</span><span className="text-blue-400">&gt;</span>
                <span className="text-blue-400">&lt;input</span> <span className="text-purple-400">type</span>=<span className="text-green-400">"text"</span> <span className="text-purple-400">required</span><span className="text-blue-400">&gt;</span>
            <span className="text-blue-400">&lt;/div&gt;</span>
        <span className="text-blue-400">&lt;/form&gt;</span>
    <span className="text-blue-400">&lt;/div&gt;</span>
<span className="text-blue-400">&lt;/body&gt;</span>
<span className="text-blue-400">&lt;/html&gt;</span></code></pre>
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
