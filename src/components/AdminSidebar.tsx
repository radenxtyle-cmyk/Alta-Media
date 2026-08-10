import { useState } from 'react';
import { SiteConfig } from '../types';
import { Type, Palette, Layout, Columns, Grid, Tag, FolderPlus, Plus, Trash2, Eye, EyeOff, Search } from 'lucide-react';

interface Props {
  config: SiteConfig;
  onChange: (config: SiteConfig) => void;
}

export default function AdminSidebar({ config, onChange }: Props) {
  const [newCatInput, setNewCatInput] = useState('');

  const updateConfig = (section: keyof SiteConfig, key: string, value: any) => {
    onChange({
      ...config,
      [section]: {
        ...(config[section] as any),
        [key]: value
      }
    });
  };

  const updateColor = (key: keyof SiteConfig['colors'], value: string) => {
    onChange({ ...config, colors: { ...config.colors, [key]: value } });
  };

  const handleAddCategory = () => {
    const trimmed = newCatInput.trim();
    if (!trimmed) return;
    const currentCats = config.categories || ['All', 'Programming', 'Web Dev', 'CS Core'];
    if (!currentCats.map(c => c.toLowerCase()).includes(trimmed.toLowerCase())) {
      onChange({
        ...config,
        categories: [...currentCats, trimmed]
      });
    }
    setNewCatInput('');
  };

  return (
    <div className="p-4 space-y-8 pb-20 overflow-x-hidden min-w-0 w-full">
      <div className="border-b border-[#222] pb-4 mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Editor Controls</h2>
        <p className="text-[11px] text-gray-500">Manage site content in real-time.</p>
      </div>

      {/* Theme Colors */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Palette size={16} /> Theme Colors
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(config.colors).map(([key, value]) => (
            <div key={key}>
              <label className="block text-[11px] font-medium text-gray-500 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
              <div className="flex gap-2 items-center">
                <input type="color" value={value} onChange={(e) => updateColor(key as keyof SiteConfig['colors'], e.target.value)} className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent p-0" />
                <input type="text" value={value} onChange={(e) => updateColor(key as keyof SiteConfig['colors'], e.target.value)} className="w-full px-2 py-1 bg-[#1A1A1A] border border-[#333] rounded text-[10px] text-gray-300 uppercase outline-none focus:border-indigo-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Search Console SEO */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Search size={16} className="text-cyan-400" /> Google Search Console
        </h3>
        <div>
          <label className="block text-[11px] font-medium text-gray-400 mb-1">
            Verification Code (HTML Tag / Content)
          </label>
          <input 
            type="text" 
            value={config.googleSearchConsoleCode || ''} 
            onChange={(e) => onChange({ ...config, googleSearchConsoleCode: e.target.value })} 
            placeholder="misal: Qws0Q_HdGQqQKaNTIDC0KpqDAjsa9v17PZ1" 
            className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-cyan-300 font-mono focus:border-cyan-500 outline-none" 
          />
          <p className="text-[10px] text-gray-500 mt-1">
            Kode verifikasi ini otomatis dimasukkan ke tag <code className="text-cyan-400">&lt;meta name="google-site-verification" content="..."&gt;</code> di head situs Anda.
          </p>
        </div>
      </div>

      {/* Header Content */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Layout size={16} /> Header Section
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Logo Text</label>
            <input type="text" value={config.header.logoText} onChange={(e) => updateConfig('header', 'logoText', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Header Button</label>
            <input type="text" value={config.header.ctaText} onChange={(e) => updateConfig('header', 'ctaText', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Categories (comma separated)</label>
            <input type="text" value={(config.categories || ['All', 'Programming', 'Web Dev', 'CS Core']).join(', ')} onChange={(e) => onChange({...config, categories: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
        </div>
      </div>

      {/* Hero Section Controls */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Type size={16} /> Hero Section
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#151515] border border-[#2b2b2b] rounded-lg">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Title Top</label>
              <input 
                type="text" 
                value={config.hero.titleTop ?? 'CODE'} 
                onChange={(e) => updateConfig('hero', 'titleTop', e.target.value)} 
                className="w-full px-2 py-1 bg-[#202020] border border-[#383838] rounded text-xs font-bold text-white focus:border-cyan-500 outline-none" 
                placeholder="CODE"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Middle Word</label>
              <input 
                type="text" 
                value={config.hero.titleMiddle ?? 'WITH'} 
                onChange={(e) => updateConfig('hero', 'titleMiddle', e.target.value)} 
                className="w-full px-2 py-1 bg-[#202020] border border-[#383838] rounded text-xs text-gray-300 focus:border-cyan-500 outline-none" 
                placeholder="WITH"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-cyan-400 mb-1">Gradient Word</label>
              <input 
                type="text" 
                value={config.hero.titleBottom ?? 'AI'} 
                onChange={(e) => updateConfig('hero', 'titleBottom', e.target.value)} 
                className="w-full px-2 py-1 bg-[#202020] border border-[#383838] rounded text-xs font-bold text-cyan-400 focus:border-cyan-500 outline-none" 
                placeholder="AI"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Top Pill Badge</label>
            <input 
              type="text" 
              value={config.hero.tagline || ''} 
              onChange={(e) => updateConfig('hero', 'tagline', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
              placeholder="</> Free & Premium Study Material"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Hero Subtitle / Description</label>
            <textarea 
              value={config.hero.subtitle || ''} 
              onChange={(e) => updateConfig('hero', 'subtitle', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none h-20 resize-none" 
              placeholder="Everything you need in one place..."
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Badge Left (Purple Pill)</label>
            <input 
              type="text" 
              value={config.hero.subBadgeLeft || ''} 
              onChange={(e) => updateConfig('hero', 'subBadgeLeft', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
              placeholder="NOTES · RESUME BUILDER · COMMUNITY"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Badge Right (Console Code)</label>
            <input 
              type="text" 
              value={config.hero.subBadgeRight || ''} 
              onChange={(e) => updateConfig('hero', 'subBadgeRight', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
              placeholder='print ( "Start learning for free" )'
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Primary Button</label>
              <input 
                type="text" 
                value={config.hero.primaryCtaText || ''} 
                onChange={(e) => updateConfig('hero', 'primaryCtaText', e.target.value)} 
                className="w-full px-2 py-1.5 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
                placeholder="Browse Notes"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Secondary Button</label>
              <input 
                type="text" 
                value={config.hero.secondaryCtaText || ''} 
                onChange={(e) => updateConfig('hero', 'secondaryCtaText', e.target.value)} 
                className="w-full px-2 py-1.5 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
                placeholder="Build Resume Free"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Features Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-2">
          <h3 className="font-semibold flex items-center gap-2 text-gray-300 text-sm">
            <Grid size={16} /> Top Features (Cards)
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...config, showTopFeatures: config.showTopFeatures === false ? true : false })}
              className={`text-[11px] px-2.5 py-1 rounded font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                config.showTopFeatures !== false 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
              }`}
              title={config.showTopFeatures !== false ? 'Sembunyikan Top Features Cards' : 'Tampilkan Top Features Cards'}
            >
              {config.showTopFeatures !== false ? <Eye size={12} /> : <EyeOff size={12} />}
              {config.showTopFeatures !== false ? 'Show' : 'Hide'}
            </button>
            <button 
              onClick={() => {
                const currentFeatures = config.topFeatures || [];
                const newFeatures = [...currentFeatures, {
                  id: Date.now().toString(),
                  title: 'NEW FEATURE',
                  subtitle: 'Feature description text here',
                  icon: 'Sparkles'
                }];
                onChange({ ...config, topFeatures: newFeatures });
              }}
              className="text-[10px] bg-[#222] hover:bg-[#333] px-2 py-1 rounded text-white"
            >
              + Add Card
            </button>
          </div>
        </div>
        <div className="space-y-4 pr-2">
          {(config.topFeatures || []).map((feature, index) => (
            <div key={feature.id} className="p-3 bg-[#1A1A1A] border border-[#333] rounded space-y-3 relative">
              <button 
                onClick={() => {
                  const currentFeatures = config.topFeatures || [];
                  const newFeatures = currentFeatures.filter((_, i) => i !== index);
                  onChange({ ...config, topFeatures: newFeatures });
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-400 text-[10px]"
              >
                Remove
              </button>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Title</label>
                <input 
                  type="text" 
                  value={feature.title} 
                  onChange={(e) => {
                    const newFeatures = [...(config.topFeatures || [])];
                    newFeatures[index].title = e.target.value;
                    onChange({ ...config, topFeatures: newFeatures });
                  }} 
                  className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none pr-12 font-bold" 
                  placeholder="VIDEO TUTORIALS"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Icon Name (Lucide)</label>
                <input 
                  type="text" 
                  value={feature.icon} 
                  onChange={(e) => {
                    const newFeatures = [...(config.topFeatures || [])];
                    newFeatures[index].icon = e.target.value;
                    onChange({ ...config, topFeatures: newFeatures });
                  }} 
                  className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
                  placeholder="Youtube, FileText, Send, Eye, FileCheck..."
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Subtitle / Description</label>
                <textarea 
                  value={feature.subtitle} 
                  onChange={(e) => {
                    const newFeatures = [...(config.topFeatures || [])];
                    newFeatures[index].subtitle = e.target.value;
                    onChange({ ...config, topFeatures: newFeatures });
                  }} 
                  className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none h-14 resize-none" 
                  placeholder="Feature description..."
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Configuration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-2">
          <h3 className="font-semibold flex items-center gap-2 text-gray-300 text-sm">
            <Columns size={16} /> Stats Section
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...config, showStats: config.showStats === false ? true : false })}
              className={`text-[11px] px-2.5 py-1 rounded font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                config.showStats !== false 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
              }`}
              title={config.showStats !== false ? 'Sembunyikan Stats Section' : 'Tampilkan Stats Section'}
            >
              {config.showStats !== false ? <Eye size={12} /> : <EyeOff size={12} />}
              {config.showStats !== false ? 'Show' : 'Hide'}
            </button>
            <button 
              onClick={() => {
                const newStats = [...config.stats, {
                  id: Date.now().toString(),
                  value: '100+',
                  label: 'New Stat'
                }];
                onChange({ ...config, stats: newStats });
              }}
              className="text-[10px] bg-[#222] hover:bg-[#333] px-2 py-1 rounded text-white"
            >
              + Add Stat
            </button>
          </div>
        </div>
        <div className="space-y-4 pr-2">
          {config.stats.map((stat, index) => (
            <div key={stat.id} className="p-3 bg-[#1A1A1A] border border-[#333] rounded space-y-3 relative">
              <button 
                onClick={() => {
                  const newStats = config.stats.filter((_, i) => i !== index);
                  onChange({ ...config, stats: newStats });
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-400 text-[10px]"
              >
                Remove
              </button>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Value</label>
                <input type="text" value={stat.value} onChange={(e) => {
                  const newStats = [...config.stats];
                  newStats[index].value = e.target.value;
                  onChange({ ...config, stats: newStats });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none pr-12" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Label</label>
                <input type="text" value={stat.label} onChange={(e) => {
                  const newStats = [...config.stats];
                  newStats[index].label = e.target.value;
                  onChange({ ...config, stats: newStats });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Type size={16} /> Hero Section
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Tagline</label>
            <input type="text" value={config.hero.tagline} onChange={(e) => updateConfig('hero', 'tagline', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Title</label>
            <input type="text" value={config.hero.title} onChange={(e) => updateConfig('hero', 'title', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Subtitle</label>
            <textarea value={config.hero.subtitle} onChange={(e) => updateConfig('hero', 'subtitle', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none h-20 resize-none" />
          </div>
        </div>
      </div>

      {/* Categories Management */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[#222] pb-2">
          <h3 className="font-semibold flex items-center gap-2 text-gray-300 text-sm">
            <Tag size={16} /> Category Management
          </h3>
        </div>

        <p className="text-[11px] text-gray-400">
          Tambah atau hapus Kategori untuk memfilter Subject/Materi di website.
        </p>

        {/* List of existing categories */}
        <div className="flex flex-wrap gap-1.5 py-1">
          {(config.categories || ['All', 'Programming', 'Web Dev', 'CS Core']).map((cat, idx) => (
            <div 
              key={cat + idx} 
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-200"
            >
              <span className="font-medium text-cyan-400">{cat}</span>
              {cat !== 'All' && (
                <button
                  type="button"
                  title={`Hapus kategori ${cat}`}
                  onClick={() => {
                    const updated = (config.categories || []).filter(c => c !== cat);
                    onChange({ ...config, categories: updated });
                  }}
                  className="text-gray-500 hover:text-red-400 ml-1 text-[11px] font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Category Form */}
        <div className="flex gap-2 pt-1 min-w-0">
          <input
            type="text"
            value={newCatInput}
            onChange={(e) => setNewCatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCategory();
              }
            }}
            placeholder="Kategori Baru (misal: Mobile Apps)"
            className="flex-1 min-w-0 px-3 py-1.5 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-cyan-500 outline-none"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded transition-colors flex items-center gap-1 shrink-0 whitespace-nowrap cursor-pointer"
          >
            <Plus size={14} /> Add Category
          </button>
        </div>
      </div>

      {/* Subjects Configuration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-2">
          <h3 className="font-semibold flex items-center gap-2 text-gray-300 text-sm">
            <Columns size={16} /> Subjects Section
          </h3>
          <button 
            onClick={() => {
              const newSubjects = [...config.subjects, {
                id: Date.now().toString(),
                title: 'New Subject',
                description: 'Description',
                icon: 'Code',
                category: (config.categories && config.categories.length > 1) ? config.categories[1] : 'Programming'
              }];
              onChange({ ...config, subjects: newSubjects });
            }}
            className="text-[10px] bg-[#222] hover:bg-[#333] px-2.5 py-1 rounded text-white font-medium flex items-center gap-1"
          >
            <Plus size={12} /> Add Subject
          </button>
        </div>
        <div className="space-y-4 pr-2">
          {config.subjects.map((subject, index) => (
            <div key={subject.id} className="p-3 bg-[#1A1A1A] border border-[#333] rounded space-y-3 relative">
              <button 
                onClick={() => {
                  const newSubjects = config.subjects.filter((_, i) => i !== index);
                  onChange({ ...config, subjects: newSubjects });
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-400 text-[10px]"
              >
                Remove
              </button>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Title</label>
                <input type="text" value={subject.title} onChange={(e) => {
                  const newSubjects = [...config.subjects];
                  newSubjects[index].title = e.target.value;
                  onChange({ ...config, subjects: newSubjects });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none pr-12" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Icon Name (Lucide)</label>
                <input type="text" value={subject.icon} onChange={(e) => {
                  const newSubjects = [...config.subjects];
                  newSubjects[index].icon = e.target.value;
                  onChange({ ...config, subjects: newSubjects });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Category</label>
                <div className="space-y-1.5">
                  <select 
                    value={(config.categories || []).includes(subject.category) ? subject.category : ''} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) {
                        const newSubjects = [...config.subjects];
                        newSubjects[index].category = val;
                        onChange({ ...config, subjects: newSubjects });
                      }
                    }} 
                    className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none"
                  >
                    <option value="">Pilih / Ketik Kategori...</option>
                    {(config.categories || ['All', 'Programming', 'Web Dev', 'CS Core']).filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <input 
                    type="text" 
                    value={subject.category} 
                    onChange={(e) => {
                      const val = e.target.value;
                      const newSubjects = [...config.subjects];
                      newSubjects[index].category = val;
                      
                      const currentCats = config.categories || ['All', 'Programming', 'Web Dev', 'CS Core'];
                      let newCats = currentCats;
                      if (val.trim() && !currentCats.map(c => c.toLowerCase()).includes(val.trim().toLowerCase())) {
                        newCats = [...currentCats, val.trim()];
                      }
                      onChange({ ...config, categories: newCats, subjects: newSubjects });
                    }} 
                    placeholder="Atau ketik nama Kategori baru..." 
                    className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-cyan-400 font-medium focus:border-cyan-500 outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Description</label>
                <textarea value={subject.description} onChange={(e) => {
                  const newSubjects = [...config.subjects];
                  newSubjects[index].description = e.target.value;
                  onChange({ ...config, subjects: newSubjects });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none h-16 resize-none" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Preview URL (PDF or Link)</label>
                <input type="text" value={subject.previewUrl || ''} onChange={(e) => {
                  const newSubjects = [...config.subjects];
                  newSubjects[index].previewUrl = e.target.value;
                  onChange({ ...config, subjects: newSubjects });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" placeholder="https://example.com/file.pdf" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Free Download URL</label>
                <input type="text" value={subject.freeUrl || ''} onChange={(e) => {
                  const newSubjects = [...config.subjects];
                  newSubjects[index].freeUrl = e.target.value;
                  onChange({ ...config, subjects: newSubjects });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" placeholder="https://example.com/download.pdf" />
              </div>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-[11px] font-medium text-gray-500 cursor-pointer">
                  <input type="checkbox" checked={subject.isFreeEnabled !== false} onChange={(e) => {
                    const newSubjects = [...config.subjects];
                    newSubjects[index].isFreeEnabled = e.target.checked;
                    onChange({ ...config, subjects: newSubjects });
                  }} className="rounded border-gray-400 bg-[#222]" />
                  Enable Free
                </label>
                <label className="flex items-center gap-2 text-[11px] font-medium text-gray-500 cursor-pointer">
                  <input type="checkbox" checked={subject.isPremiumEnabled !== false} onChange={(e) => {
                    const newSubjects = [...config.subjects];
                    newSubjects[index].isPremiumEnabled = e.target.checked;
                    onChange({ ...config, subjects: newSubjects });
                  }} className="rounded border-gray-400 bg-[#222]" />
                  Enable Premium
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Content */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Type size={16} /> Resume Section
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Tagline</label>
            <input type="text" value={config.resume.tagline} onChange={(e) => updateConfig('resume', 'tagline', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Section Title</label>
            <input type="text" value={config.resume.title} onChange={(e) => updateConfig('resume', 'title', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Subtitle</label>
            <textarea value={config.resume.subtitle} onChange={(e) => updateConfig('resume', 'subtitle', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none h-16 resize-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Card Title</label>
            <input type="text" value={config.resume.cardTitle} onChange={(e) => updateConfig('resume', 'cardTitle', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Card Description</label>
            <textarea value={config.resume.cardDesc} onChange={(e) => updateConfig('resume', 'cardDesc', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none h-16 resize-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Feature Badges (Pisahkan dengan koma)</label>
            <input 
              type="text" 
              value={config.resume.featureTags ?? 'ATS Friendly, Multiple Templates, PDF Export, 100% Free'} 
              onChange={(e) => updateConfig('resume', 'featureTags', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
              placeholder="ATS Friendly, Multiple Templates, PDF Export, 100% Free"
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Button Text</label>
            <input type="text" value={config.resume.ctaText} onChange={(e) => updateConfig('resume', 'ctaText', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Button Link URL (Destination Link)</label>
            <input 
              type="text" 
              value={config.resume.ctaUrl || ''} 
              onChange={(e) => updateConfig('resume', 'ctaUrl', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-cyan-400 font-mono focus:border-cyan-500 outline-none" 
              placeholder="https://example.com or https://t.me/yourlink"
            />
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Layout size={16} /> Footer Section
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Badge Text</label>
            <input 
              type="text" 
              value={config.footer.stayConnectedText ?? 'STAY CONNECTED'} 
              onChange={(e) => updateConfig('footer', 'stayConnectedText', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
              placeholder="STAY CONNECTED"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Community Title</label>
            <input 
              type="text" 
              value={config.footer.communityTitle ?? config.footer.community ?? 'Join the Community'} 
              onChange={(e) => {
                onChange({
                  ...config,
                  footer: {
                    ...config.footer,
                    communityTitle: e.target.value,
                    community: e.target.value
                  }
                });
              }} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
              placeholder="Join the Community"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Community Description</label>
            <textarea 
              value={config.footer.communityDescription ?? 'Get updates, ask doubts, and access premium notes — connect with us on every platform.'} 
              onChange={(e) => updateConfig('footer', 'communityDescription', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none h-16 resize-none" 
              placeholder="Get updates, ask doubts, and access premium notes..."
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Brand Tagline</label>
            <input 
              type="text" 
              value={config.footer.brandTagline || ''} 
              onChange={(e) => updateConfig('footer', 'brandTagline', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
              placeholder="LEARN · CODE · BUILD · SUCCEED"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Copyright Text</label>
            <input 
              type="text" 
              value={config.footer.copyrightText || ''} 
              onChange={(e) => updateConfig('footer', 'copyrightText', e.target.value)} 
              className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
              placeholder="© 2026 Code With AI. All rights reserved."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Link Label</label>
              <input 
                type="text" 
                value={config.footer.copyrightLinkText || ''} 
                onChange={(e) => updateConfig('footer', 'copyrightLinkText', e.target.value)} 
                className="w-full px-2 py-1.5 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
                placeholder="Telegram"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">Link URL</label>
              <input 
                type="text" 
                value={config.footer.copyrightLinkUrl || ''} 
                onChange={(e) => updateConfig('footer', 'copyrightLinkUrl', e.target.value)} 
                className="w-full px-2 py-1.5 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
                placeholder="https://t.me"
              />
            </div>
          </div>

          {/* Social Links Editor */}
          <div className="pt-2 border-t border-[#222]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-300">Social Media Buttons</span>
              <button 
                onClick={() => {
                  const currentSocials = config.footer.socials || [
                    { id: '1', name: 'Telegram', url: 'https://t.me', icon: 'Telegram', enabled: true },
                    { id: '2', name: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', enabled: true },
                    { id: '3', name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', enabled: true },
                    { id: '4', name: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', enabled: true }
                  ];
                  const newSocials = [...currentSocials, {
                    id: Date.now().toString(),
                    name: 'New Social',
                    url: 'https://',
                    icon: 'Telegram',
                    enabled: true
                  }];
                  onChange({
                    ...config,
                    footer: {
                      ...config.footer,
                      socials: newSocials
                    }
                  });
                }}
                className="text-[10px] bg-[#222] hover:bg-[#333] px-2 py-1 rounded text-white"
              >
                + Add Social
              </button>
            </div>

            <div className="space-y-3">
              {(config.footer.socials || [
                { id: '1', name: 'Telegram', url: 'https://t.me', icon: 'Telegram', enabled: true },
                { id: '2', name: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', enabled: true },
                { id: '3', name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', enabled: true },
                { id: '4', name: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', enabled: true }
              ]).map((social, index) => (
                <div key={social.id} className="p-3 bg-[#1A1A1A] border border-[#333] rounded space-y-2 relative">
                  <button 
                    onClick={() => {
                      const currentSocials = config.footer.socials || [];
                      const newSocials = currentSocials.filter((_, i) => i !== index);
                      onChange({
                        ...config,
                        footer: {
                          ...config.footer,
                          socials: newSocials
                        }
                      });
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-400 text-[10px]"
                  >
                    Remove
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-gray-500 mb-1">Platform Name</label>
                      <input 
                        type="text" 
                        value={social.name} 
                        onChange={(e) => {
                          const currentSocials = [...(config.footer.socials || [])];
                          currentSocials[index].name = e.target.value;
                          onChange({
                            ...config,
                            footer: {
                              ...config.footer,
                              socials: currentSocials
                            }
                          });
                        }} 
                        className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500 mb-1">Icon Type</label>
                      <select 
                        value={social.icon} 
                        onChange={(e) => {
                          const currentSocials = [...(config.footer.socials || [])];
                          currentSocials[index].icon = e.target.value;
                          onChange({
                            ...config,
                            footer: {
                              ...config.footer,
                              socials: currentSocials
                            }
                          });
                        }} 
                        className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none"
                      >
                        <option value="Telegram">Telegram</option>
                        <option value="Youtube">YouTube</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-500 mb-1">URL</label>
                    <input 
                      type="text" 
                      value={social.url} 
                      onChange={(e) => {
                        const currentSocials = [...(config.footer.socials || [])];
                        currentSocials[index].url = e.target.value;
                        onChange({
                          ...config,
                          footer: {
                            ...config.footer,
                            socials: currentSocials
                          }
                        });
                      }} 
                      className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" 
                    />
                  </div>

                  <div className="pt-1">
                    <label className="flex items-center gap-2 text-[10px] text-gray-400 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={social.enabled !== false} 
                        onChange={(e) => {
                          const currentSocials = [...(config.footer.socials || [])];
                          currentSocials[index].enabled = e.target.checked;
                          onChange({
                            ...config,
                            footer: {
                              ...config.footer,
                              socials: currentSocials
                            }
                          });
                        }} 
                        className="rounded border-gray-400 bg-[#222]" 
                      />
                      Active / Enabled
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
