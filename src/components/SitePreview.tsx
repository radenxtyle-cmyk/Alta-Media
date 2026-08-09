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
        <div className="flex flex-col">
          <div className="font-display text-lg md:text-xl font-black tracking-widest uppercase flex items-center gap-2" style={{ color: colors.primary }}>
            {config.header.logoText}
          </div>
          <div className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-400">
            {config.footer.brandTagline || 'LEARN · CODE · BUILD'}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase" style={{ color: colors.muted }}>
          <a href="#subjects" className="flex items-center gap-2 hover:text-white transition-colors"><Icons.BookOpen size={14}/> Notes</a>
          <a href="#resume" className="flex items-center gap-2 hover:text-white transition-colors"><Icons.Wrench size={14}/> Tools</a>
          <a href="#community" className="flex items-center gap-2 hover:text-white transition-colors"><Icons.Users size={14}/> Community</a>
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

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-20">
         
        {/* HERO SECTION */}
        <div className="text-center py-6 md:py-12 relative overflow-hidden">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono mb-8 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            <span>{config.hero.tagline || '</> Free & Premium Study Material'}</span>
          </div>

          {/* Large Graphic Title */}
          <div className="mb-8 flex flex-col items-center justify-center">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-widest text-white drop-shadow-md uppercase">
              {config.hero.titleTop ?? 'CODE'}
            </h1>
            {(config.hero.titleMiddle ?? 'WITH') ? (
              <div className="text-xs md:text-sm font-bold tracking-[0.5em] uppercase text-gray-500 my-2">
                {config.hero.titleMiddle ?? 'WITH'}
              </div>
            ) : null}
            <div className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_35px_rgba(0,229,255,0.4)]">
              {config.hero.titleBottom ?? 'AI'}
            </div>
          </div>

          {/* Middle Badge Row */}
          <div className="flex items-center justify-center gap-3 mb-8 max-w-3xl mx-auto overflow-x-auto py-1">
            <div className="h-10 px-4 flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase shadow-lg whitespace-nowrap shrink-0">
              <Icons.Zap size={14} className="fill-current" />
              <span>{config.hero.subBadgeLeft || 'NOTES · RESUME BUILDER · COMMUNITY'}</span>
            </div>
            <div className="h-10 px-4 flex items-center gap-2 rounded-lg bg-[#111025] border border-[#262445] text-gray-300 font-mono text-[10px] sm:text-xs whitespace-nowrap shrink-0">
              <span className="text-purple-400">print</span>
              <span className="text-gray-400">(</span>
              <span className="text-cyan-400">"{config.hero.subBadgeRight || 'Start learning for free'}"</span>
              <span className="text-gray-400">)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
            </div>
          </div>

          {/* Subtitle Paragraph */}
          <p className="max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-gray-400 font-medium mb-10">
            {config.hero.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#subjects" 
              className="px-7 py-3.5 rounded-full text-xs font-bold text-white transition-all hover:scale-105 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_25px_rgba(99,102,241,0.4)]"
            >
              <Icons.BookOpen size={16} />
              <span>{config.hero.primaryCtaText || 'Browse Notes'}</span>
            </a>
            <a 
              href="#resume" 
              className="px-7 py-3.5 rounded-full text-xs font-bold text-white transition-all hover:scale-105 flex items-center gap-2 border border-[#33315c] bg-[#131127] hover:border-cyan-500/50"
            >
              <Icons.FileText size={16} />
              <span>{config.hero.secondaryCtaText || 'Build Resume Free'}</span>
            </a>
          </div>
        </div>

        {/* Top Features */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(config.topFeatures || []).map(f => (
            <div key={f.id} className="p-4 rounded-xl border border-transparent transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] group" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
              <div className="mb-4 w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform shadow-inner" style={{ color: colors.primary }}>
                {getIcon(f.icon, 20)}
              </div>
              <h4 className="font-display text-[11px] font-black tracking-wider uppercase mb-1.5">{f.title}</h4>
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
        <div id="subjects">
          <div className="max-w-2xl mb-10 text-left">
            <div className="text-[10px] font-black tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
              <Icons.Sparkles size={12} /> {config.hero.tagline}
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black mb-5 tracking-tight">Notes For Every Subject</h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.muted }}>
              Every subject has a Free version you can download right now. Click Paid to get the detailed premium version via Telegram.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map((pill) => {
              let IconComponent;
              switch (pill) {
                case 'All': IconComponent = Icons.LayoutGrid; break;
                case 'Programming': IconComponent = Icons.Code; break;
                case 'Web Dev': IconComponent = Icons.Globe; break;
                case 'CS Core': IconComponent = Icons.Cpu; break;
                default: IconComponent = Icons.Folder; break;
              }
              return (
                <button 
                  key={pill} 
                  onClick={() => setActiveCategory(pill)}
                  className="px-5 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider cursor-pointer hover:brightness-110 flex items-center gap-2" 
                  style={activeCategory === pill ? { backgroundColor: colors.primary, color: colors.background } : { backgroundColor: colors.cardBg, color: colors.muted, border: `1px solid ${colors.border}` }}
                >
                  <IconComponent size={14} />
                  {pill}
                </button>
              );
            })}
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
                
                <div className="mt-auto flex flex-row flex-wrap gap-2 mb-6">
                  {s.isFreeEnabled !== false && (
                    <div className="flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded w-fit text-green-400 bg-green-400/10 uppercase tracking-wider">
                      <Icons.CheckCircle size={10} /> FREE
                    </div>
                  )}
                  {s.isPremiumEnabled !== false && (
                    <div className="flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded w-fit text-orange-400 bg-orange-400/10 uppercase tracking-wider">
                      <Icons.Send size={10} /> PREMIUM
                    </div>
                  )}
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
                  <button 
                    onClick={() => {
                      if (s.freeUrl) {
                        window.open(s.freeUrl, '_blank');
                      } else {
                        alert('Free download URL not available for this subject.');
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 text-[10px] font-bold py-2.5 rounded-lg hover:brightness-125 transition-all text-green-400 bg-green-400/10"
                  >
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
        <div id="resume">
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

        {/* Footer */}
        <div id="community" className="pt-16 pb-12">
          {/* Top Footer: Community & Socials */}
          <div className="text-center mb-16">
            <div className="text-[11px] font-black tracking-widest uppercase mb-3 flex items-center justify-center gap-2 text-cyan-400">
              <Icons.MessageCircle size={14} /> {config.footer.stayConnectedText || 'STAY CONNECTED'}
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight mb-4">{config.footer.communityTitle || config.footer.community || 'Join the Community'}</h2>
            <p className="text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8 font-medium" style={{ color: colors.muted }}>
              {config.footer.communityDescription || 'Get updates, ask doubts, and access premium notes — connect with us on every platform.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {(config.footer.socials || [
                { id: '1', name: 'Telegram', url: 'https://t.me', icon: 'Telegram', enabled: true },
                { id: '2', name: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', enabled: true },
                { id: '3', name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', enabled: true },
                { id: '4', name: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', enabled: true }
              ]).filter(s => s.enabled !== false).map((social) => {
                const getSocialIcon = (iconName: string) => {
                  const name = iconName.toLowerCase();
                  if (name.includes('telegram') || name.includes('send')) {
                    return (
                      <svg className="w-4 h-4 fill-current text-[#0088cc]" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                      </svg>
                    );
                  }
                  if (name.includes('youtube')) {
                    return (
                      <svg className="w-4 h-4 fill-current text-[#FF0000]" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    );
                  }
                  if (name.includes('instagram')) {
                    return (
                      <svg className="w-4 h-4 fill-current text-[#E1306C]" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    );
                  }
                  if (name.includes('facebook')) {
                    return (
                      <svg className="w-4 h-4 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    );
                  }
                  return <Icons.Globe size={16} className="text-cyan-400" />;
                };

                return (
                  <a 
                    key={social.id}
                    href={social.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-6 py-3 rounded-xl border font-bold text-xs transition-all hover:scale-105"
                    style={{ backgroundColor: colors.cardBg, borderColor: colors.border, color: colors.text }}
                  >
                    {getSocialIcon(social.icon)}
                    <span className="font-display font-bold">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom Footer Section */}
          <div className="w-full border-t pt-10 pb-6 text-center" style={{ borderColor: colors.border }}>
            <div className="font-display text-xl font-black tracking-widest uppercase mb-2" style={{ color: colors.primary }}>
              {config.header.logoText}
            </div>
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-8" style={{ color: colors.muted }}>
              {config.footer.brandTagline || 'LEARN · CODE · BUILD · SUCCEED'}
            </div>
            <div className="text-xs font-medium" style={{ color: colors.muted }}>
              {config.footer.copyrightText || '© 2026 Code With AI. All rights reserved.'}
              {config.footer.copyrightLinkText && (
                <>
                  {' • Premium notes via '}
                  <a 
                    href={config.footer.copyrightLinkUrl || 'https://t.me'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold hover:underline"
                    style={{ color: colors.primary }}
                  >
                    {config.footer.copyrightLinkText}
                  </a>
                </>
              )}
            </div>
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
                src={previewingUrl.includes('drive.google.com') ? previewingUrl.replace('/view', '/preview').split('?')[0] : previewingUrl} 
                className="w-full h-full border-none"
                title={`${previewingTitle} Preview`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
