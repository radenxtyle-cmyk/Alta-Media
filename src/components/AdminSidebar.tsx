import { SiteConfig } from '../types';
import { Type, Palette, Layout, Columns } from 'lucide-react';

interface Props {
  config: SiteConfig;
  onChange: (config: SiteConfig) => void;
}

export default function AdminSidebar({ config, onChange }: Props) {
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

  return (
    <div className="p-4 space-y-8 pb-20">
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

      {/* Global Content */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Layout size={16} /> Global Content
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

      {/* Hero Content */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Type size={16} /> Subjects Section
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

      {/* Resume Content */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2 text-gray-300 border-b border-[#222] pb-2 text-sm">
          <Columns size={16} /> Resume Section
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Section Title</label>
            <input type="text" value={config.resume.title} onChange={(e) => updateConfig('resume', 'title', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Card Title</label>
            <input type="text" value={config.resume.cardTitle} onChange={(e) => updateConfig('resume', 'cardTitle', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-2">Button Text</label>
            <input type="text" value={config.resume.ctaText} onChange={(e) => updateConfig('resume', 'ctaText', e.target.value)} className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
          </div>
        </div>
      </div>

      {/* Top Features Configuration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-2">
          <h3 className="font-semibold flex items-center gap-2 text-gray-300 text-sm">
            <Columns size={16} /> Edit Top Features
          </h3>
          <button 
            onClick={() => {
              const newFeatures = [...config.topFeatures, {
                id: Date.now().toString(),
                title: 'New Feature',
                subtitle: 'Description',
                icon: 'Star'
              }];
              onChange({ ...config, topFeatures: newFeatures });
            }}
            className="text-[10px] bg-[#222] hover:bg-[#333] px-2 py-1 rounded text-white"
          >
            + Add Feature
          </button>
        </div>
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {config.topFeatures.map((feature, index) => (
            <div key={feature.id} className="p-3 bg-[#1A1A1A] border border-[#333] rounded space-y-3 relative">
              <button 
                onClick={() => {
                  const newFeatures = config.topFeatures.filter((_, i) => i !== index);
                  onChange({ ...config, topFeatures: newFeatures });
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-400 text-[10px]"
              >
                Remove
              </button>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Title</label>
                <input type="text" value={feature.title} onChange={(e) => {
                  const newFeatures = [...config.topFeatures];
                  newFeatures[index].title = e.target.value;
                  onChange({ ...config, topFeatures: newFeatures });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none pr-12" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Icon Name (Lucide)</label>
                <input type="text" value={feature.icon} onChange={(e) => {
                  const newFeatures = [...config.topFeatures];
                  newFeatures[index].icon = e.target.value;
                  onChange({ ...config, topFeatures: newFeatures });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Subtitle</label>
                <textarea value={feature.subtitle} onChange={(e) => {
                  const newFeatures = [...config.topFeatures];
                  newFeatures[index].subtitle = e.target.value;
                  onChange({ ...config, topFeatures: newFeatures });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none h-16 resize-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subjects Configuration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#222] pb-2">
          <h3 className="font-semibold flex items-center gap-2 text-gray-300 text-sm">
            <Columns size={16} /> Edit Subjects
          </h3>
          <button 
            onClick={() => {
              const newSubjects = [...config.subjects, {
                id: Date.now().toString(),
                title: 'New Subject',
                description: 'Description',
                icon: 'Code',
                category: (config.categories && config.categories.length > 1) ? config.categories[1] : 'All'
              }];
              onChange({ ...config, subjects: newSubjects });
            }}
            className="text-[10px] bg-[#222] hover:bg-[#333] px-2 py-1 rounded text-white"
          >
            + Add Subject
          </button>
        </div>
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
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
                <select value={subject.category} onChange={(e) => {
                  const newSubjects = [...config.subjects];
                  newSubjects[index].category = e.target.value;
                  onChange({ ...config, subjects: newSubjects });
                }} className="w-full px-2 py-1 bg-[#222] border border-[#444] rounded text-xs text-gray-300 focus:border-indigo-500 outline-none">
                  <option value="">Select Category...</option>
                  {(config.categories || ['All', 'Programming', 'Web Dev', 'CS Core']).filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
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
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
