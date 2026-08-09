import { SiteConfig } from '../types';
import * as Icons from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SitePreview({ config }: { config: SiteConfig }) {
  const categories = config.categories || ['All', 'Programming', 'Web Dev', 'CS Core'];
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'All');
  const [previewingUrl, setPreviewingUrl] = useState<string | null>(null);
  const [previewingTitle, setPreviewingTitle] = useState<string | null>(null);

  const getIcon = (name: string, size = 20) => {
    const Icon = (Icons as any)[name] || Icons.Code;
    return <Icon size={size} />;
  };

  const { colors } = config;

  const filteredSubjects = activeCategory === 'All' 
    ? config.subjects 
    : config.subjects.filter(s => s.category === activeCategory);

  return (
    <div 
      className="w-full min-h-full font-sans overflow-y-auto" 
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: colors.border }}>
        <div className="text-xl font-black tracking-widest uppercase flex items-center gap-2" style={{ color: colors.primary }}>
          <Icons.Code2 size={24} />
          {config.header.logoText}
        </div>
        <div className="hidden md:flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase" style={{ color: colors.muted }}>
          <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Icons.FileText size={14}/> Notes</span>
          <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Icons.Wrench size={14}/> Tools</span>
          <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Icons.Users size={14}/> Community</span>
        </div>
        <Link to="/admin">
          <button 
            className="px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all hover:brightness-110 flex items-center gap-2"
            style={{ backgroundColor: colors.secondary, boxShadow: `0 0 20px ${colors.secondary}40` }}
          >
            <Icons.LogIn size={14} />
            {config.header.ctaText || "Login"}
          </button>
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-24">
         
        {/* Top Features */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {config.topFeatures.map(f => (
            <div key={f.id} className="p-4 rounded-xl border border-transparent transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] group" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <div className="mb-4 w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform shadow-inner" style={{ color: colors.primary }}>
                {getIcon(f.icon, 20)}
              </div>
              <h4 className="text-[11px] font-black tracking-wider uppercase mb-1.5">{f.title}</h4>
              <p className="text-[10px] leading-relaxed" style={{ color: colors.muted }}>{f.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 py-10 border-y" style={{ borderColor: colors.border }}>
          {config.stats.map(s => (
            <div key={s.id} className="text-center">
              <div className="text-4xl font-black mb-2 tracking-tighter" style={{ color: colors.primary }}>{s.value}</div>
              <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: colors.muted }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Study Material */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-[10px] font-black tracking-widest uppercase mb-4 flex items-center justify-center gap-2" style={{ color: colors.primary }}>
              <Icons.Sparkles size={12} /> {config.hero.tagline}
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight">{config.hero.title}</h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.muted }}>{config.hero.subtitle}</p>
          </div>

          <div className="flex justify-center gap-2 flex-wrap mb-10">
            {categories.map((pill) => (
              <button 
                key={pill} 
                onClick={() => setActiveCategory(pill)}
                className="px-5 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider cursor-pointer hover:brightness-110" 
                style={activeCategory === pill ? { backgroundColor: colors.primary, color: colors.background } : { backgroundColor: colors.cardBg, color: colors.muted, border: `1px solid ${colors.border}` }}
              >
                {pill}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredSubjects.map(s => (
              <div key={s.id} className="p-6 rounded-xl border flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-2xl" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
                <div className="flex gap-4 mb-6">
                  <div className="p-3 rounded-xl h-fit flex-shrink-0 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${colors.primary}20, transparent)`, color: colors.primary, border: `1px solid ${colors.primary}30` }}>
                    {getIcon(s.icon, 24)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg tracking-tight mb-1">{s.title}</h4>
                    <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: colors.muted }}>{s.description}</p>
                  </div>
                </div>
                
                <div className="mt-auto space-y-2 mb-6">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded w-fit text-green-400 bg-green-400/10 uppercase tracking-wider">
                    <Icons.CheckCircle size={10} /> FREE AVAILABLE
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded w-fit text-orange-400 bg-orange-400/10 uppercase tracking-wider">
                    <Icons.Send size={10} /> PREMIUM ON TELEGRAM
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => {
                      if (s.previewUrl) {
                        setPreviewingUrl(s.previewUrl);
                        setPreviewingTitle(s.title);
                      } else {
                        alert('Preview URL not available for this subject.');
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 text-[10px] font-bold py-2.5 rounded-lg hover:brightness-125 transition-all bg-white/5" style={{ color: colors.muted }}
                  >
                    <Icons.Eye size={12}/> Preview
                  </button>
                  <button className="flex items-center justify-center gap-1.5 text-[10px] font-bold py-2.5 rounded-lg hover:brightness-125 transition-all text-green-400 bg-green-400/10">
                    <Icons.Download size={12}/> Free
                  </button>
                  <button className="flex items-center justify-center gap-1.5 text-[10px] font-bold py-2.5 rounded-lg hover:brightness-125 transition-all" style={{ color: colors.primary, backgroundColor: `${colors.primary}15` }}>
                    <Icons.Lock size={12}/> Paid
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto pt-4 mb-10">
            <div className="text-[10px] font-black tracking-widest uppercase mb-4 flex items-center justify-center gap-2" style={{ color: colors.primary }}>
              <Icons.Award size={12} /> {config.resume.tagline}
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{config.resume.title}</h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.muted }}>{config.resume.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 group transition-colors" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 transition-opacity opacity-50 group-hover:opacity-100" style={{ backgroundColor: colors.secondary }}></div>
            
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 z-10 border shadow-2xl bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, ${colors.secondary}40, transparent)`, color: colors.text, borderColor: `${colors.secondary}50` }}>
              <Icons.FileText size={36} />
            </div>
            
            <div className="flex-1 z-10 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3 tracking-tight">{config.resume.cardTitle}</h3>
              <p className="text-xs leading-relaxed mb-6 max-w-xl" style={{ color: colors.muted }}>{config.resume.cardDesc}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                 {['ATS Friendly', 'Multiple Templates', 'PDF Export', '100% Free'].map(tag => (
                   <span key={tag} className="text-[10px] font-bold px-2.5 py-1.5 rounded-md bg-white/5 flex items-center gap-1.5 uppercase tracking-wider border border-white/5">
                     <Icons.Check size={10} style={{ color: colors.secondary }}/> {tag}
                   </span>
                 ))}
              </div>
              
              <button 
                className="px-8 py-3.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 hover:shadow-2xl w-full md:w-auto"
                style={{ backgroundColor: colors.secondary, boxShadow: `0 0 20px ${colors.secondary}40` }}
              >
                <span className="flex items-center justify-center gap-2 uppercase tracking-wider">
                   <Icons.ExternalLink size={14} /> {config.resume.ctaText}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center pt-16 border-t pb-12" style={{ borderColor: colors.border }}>
           <h3 className="text-xl md:text-3xl font-black tracking-tight mb-10" dangerouslySetInnerHTML={{__html: config.footer.cta.replace('free notes', `<span style="color: ${colors.primary}">free notes</span>`).replace('premium notes', `<span style="color: ${colors.secondary}">premium notes</span>`)}}></h3>
           
           <div className="text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-6" style={{ color: colors.muted }}>
             <div className="h-[1px] w-12" style={{ backgroundColor: colors.border }}></div>
             <span className="flex items-center gap-2"><Icons.Code2 size={14} /> {config.header.logoText}</span>
             <div className="h-[1px] w-12" style={{ backgroundColor: colors.border }}></div>
           </div>
           
           <div className="mt-24">
             <div className="text-[10px] font-black tracking-widest uppercase mb-4 flex items-center justify-center gap-2" style={{ color: colors.primary }}>
              <Icons.MessageCircle size={12} /> STAY CONNECTED
             </div>
             <h2 className="text-3xl font-black tracking-tight mb-3">{config.footer.community}</h2>
             <p className="text-xs max-w-md mx-auto leading-relaxed" style={{ color: colors.muted }}>Get updates, ask doubts, and access premium notes — connect with us on every platform.</p>
           </div>
        </div>

      </div>

      {/* Preview Modal */}
      {previewingUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl h-[85vh] bg-[#07050f] rounded-2xl border border-[#262445] flex flex-col shadow-2xl overflow-hidden relative">
            <div className="flex items-center justify-between p-4 border-b border-[#262445] bg-[#131127]">
              <div className="flex items-center gap-2 text-white font-bold">
                <Icons.Eye size={16} style={{ color: colors.primary }} />
                <span>{previewingTitle} — Preview</span>
              </div>
              <button 
                onClick={() => {
                  setPreviewingUrl(null);
                  setPreviewingTitle(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <Icons.X size={16} />
              </button>
            </div>
            <div className="flex-1 w-full bg-white relative">
              <iframe 
                src={previewingUrl} 
                className="w-full h-full border-none"
                title={`${previewingTitle} Preview`}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
