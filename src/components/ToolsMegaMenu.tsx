import React, { useState } from 'react';
import * as Icons from 'lucide-react';

const CATEGORIES = [
  { id: 'others', name: 'Others', icon: 'Sparkles', count: 235, description: 'Miscellaneous elements' },
  { id: 'alerts', name: 'Alerts & Modals', icon: 'Bell', count: 11, description: 'Dialogs, toasts, and overlays' },
  { id: 'badges', name: 'Badges & Tags', icon: 'Tag', count: 3, description: 'Status badges and labels' },
  { id: 'buttons', name: 'Buttons', icon: 'Zap', count: 30, description: 'Interactive button styles' },
  { id: 'cards', name: 'Cards & Grids', icon: 'Folder', count: 38, description: 'Product grids and cards' },
  { id: 'charts', name: 'Charts & Data', icon: 'BarChart2', count: 7, description: 'Data visualization layouts' },
];

const COMPONENTS = {
  charts: [
    { title: 'Ai Usage Chart', description: 'A professional AI Usage & A...' },
    { title: 'Scroll Paragraph', description: 'A professional scroll-trigger...' },
    { title: 'Holographic Wave', description: 'A premium WebGL-based h...' },
    { title: 'Liquid Glass Chart', description: 'A 3D glassmorphic chart vis...' },
    { title: '3d Scroll Paragraph', description: 'A premium 3D typography c...' },
    { title: 'Chart', description: 'A versatile chart componen...' },
    { title: '3d Holographic Deck', description: '3D layer showcase featurin...' }
  ]
};

export function ToolsMegaMenu() {
  const [activeCategory, setActiveCategory] = useState('charts');
  
  return (
    <div className="relative group">
      <a href="#resume" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer py-4">
        <Icons.Wrench size={14}/> TOOLS <Icons.ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
      </a>
      
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex gap-4 text-left cursor-default normal-case tracking-normal">
        {/* Left side categories */}
        <div className="w-1/3 border-r border-white/5 pr-4 flex flex-col gap-1">
          <div className="text-[10px] font-bold text-white/40 tracking-wider mb-2 px-3">CATEGORIES</div>
          {CATEGORIES.map(cat => {
            const Icon = (Icons as any)[cat.icon];
            const isActive = activeCategory === cat.id;
            return (
              <div 
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-[#1a1e2b] text-blue-400' : 'text-white/40'}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-white/70'}`}>{cat.name}</div>
                    <div className="text-xs text-white/40">{cat.description}</div>
                  </div>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-[#1a1e2b] text-blue-400' : 'bg-white/5 text-white/40'}`}>
                  {cat.count}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Right side components */}
        <div className="w-2/3 pl-2">
          {activeCategory === 'charts' ? (
            <div>
               <div className="flex items-center justify-between mb-4 px-2">
                 <div>
                   <h3 className="text-white font-bold text-lg">Charts & Data</h3>
                   <p className="text-sm text-white/40">Data visualization layouts</p>
                 </div>
                 <div className="text-sm text-white/40">7 components</div>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                 {COMPONENTS.charts.map((comp, i) => (
                   <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer flex items-center justify-between group/card">
                     <div>
                       <div className="text-sm font-semibold text-white/90 group-hover/card:text-white mb-1">{comp.title}</div>
                       <div className="text-xs text-white/40">{comp.description}</div>
                     </div>
                     <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
                       FREE <Icons.ChevronRight size={12} className="opacity-70 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 transition-all" />
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white/40 text-sm">
              Select a category to view components
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
