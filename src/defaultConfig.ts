import { SiteConfig } from './types';

export const defaultConfig: SiteConfig = {
  header: {
    logoText: 'CODE WITH AI',
    ctaText: 'Login',
  },
  hero: {
    tagline: '</> Free & Premium Study Material',
    title: 'CODE WITH AI',
    titleTop: 'CODE',
    titleMiddle: 'WITH',
    titleBottom: 'AI',
    subtitle: 'Everything you need in one place — from Python to DBMS. Download free notes instantly, or message on Telegram for detailed premium notes. Build your resume for free.',
    subBadgeLeft: 'NOTES · RESUME BUILDER · COMMUNITY',
    subBadgeRight: 'print ( "Start learning for free" )',
    primaryCtaText: 'Browse Notes',
    secondaryCtaText: 'Build Resume Free',
  },
  resume: {
    tagline: 'FREE TOOL',
    title: 'Build Your Resume',
    subtitle: 'A professional, ATS-optimized resume ready to download in minutes — completely free.',
    cardTitle: 'AI Resume Builder',
    cardDesc: 'Fill in your details, pick a template, and get a clean PDF resume ready to send to recruiters. No account required. No cost. Built for students and freshers.',
    ctaText: 'Open Resume Builder',
    ctaUrl: 'https://example.com',
    featureTags: 'ATS Friendly, Multiple Templates, PDF Export, 100% Free',
  },
  colors: {
    primary: '#00e5ff',
    secondary: '#b026ff',
    background: '#07050f',
    cardBg: '#131127',
    border: '#262445',
    text: '#ffffff',
    muted: '#8a8dab',
  },
  categories: ['All', 'Programming', 'Web Dev', 'CS Core'],
  googleSearchConsoleCode: 'Qws0Q_HdGQqQKaNTIDC0KpqDAjsa9v17PZ1',
  showTopFeatures: true,
  showStats: true,
  topFeatures: [
    { id: '1', title: 'VIDEO TUTORIALS', subtitle: 'Watch concept videos on YouTube - beginner to advanced', icon: 'Youtube' },
    { id: '2', title: 'FREE PDF NOTES', subtitle: 'Download clean notes for every subject - no signup', icon: 'FileText' },
    { id: '3', title: 'PREMIUM ON TELEGRAM', subtitle: 'Detailed notes delivered directly in Telegram chat', icon: 'Send' },
    { id: '4', title: 'INSTANT PREVIEW', subtitle: 'Read before you download - no surprises', icon: 'Eye' },
    { id: '5', title: 'RESUME BUILDER', subtitle: 'Create an ATS ready resume in minutes, for free', icon: 'FileCheck' }
  ],
  stats: [
    { id: '1', value: '8+', label: 'SUBJECTS COVERED' },
    { id: '2', value: '100%', label: 'FREE PDFS' },
    { id: '3', value: '24/7', label: 'TELEGRAM SUPPORT' },
    { id: '4', value: 'Free', label: 'RESUME BUILDER' }
  ],
  subjects: [
    { id: '1', title: 'Python', description: 'Basics to advanced - variables, loops, OOP, modules', icon: 'Terminal', category: 'Programming', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isFreeEnabled: true, isPremiumEnabled: true },
    { id: '2', title: 'C Language', description: 'Core C programming - pointers, memory, functions', icon: 'Code', category: 'Programming', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isFreeEnabled: true, isPremiumEnabled: true },
    { id: '3', title: 'C++', description: 'Object oriented programming, STL, and algorithms', icon: 'Code', category: 'Programming', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isFreeEnabled: true, isPremiumEnabled: true },
    { id: '4', title: 'Operating System', description: 'Processes, scheduling, memory management, deadlocks', icon: 'Monitor', category: 'CS Core', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isFreeEnabled: true, isPremiumEnabled: true },
    { id: '5', title: 'JavaScript', description: 'Modern JS - ES6+, DOM manipulation, async, APIs', icon: 'FileJson', category: 'Web Dev', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isFreeEnabled: true, isPremiumEnabled: true },
    { id: '6', title: 'HTML', description: 'Web structure - tags, forms, semantic elements', icon: 'Layout', category: 'Web Dev', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isFreeEnabled: true, isPremiumEnabled: true },
    { id: '7', title: 'CSS', description: 'Styling, Flexbox, Grid, animations - made easy', icon: 'Palette', category: 'Web Dev', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isFreeEnabled: true, isPremiumEnabled: true },
    { id: '8', title: 'DBMS', description: 'SQL, ER diagrams, normalization, transactions', icon: 'Database', category: 'CS Core', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isFreeEnabled: true, isPremiumEnabled: true }
  ],
  footer: {
    cta: 'Start with free notes — master with premium notes.',
    community: 'Join the Community',
    stayConnectedText: 'STAY CONNECTED',
    communityTitle: 'Join the Community',
    communityDescription: 'Get updates, ask doubts, and access premium notes — connect with us on every platform.',
    socials: [
      { id: '1', name: 'Telegram', url: 'https://t.me', icon: 'Telegram', enabled: true },
      { id: '2', name: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', enabled: true },
      { id: '3', name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', enabled: true },
      { id: '4', name: 'Facebook', url: 'https://facebook.com', icon: 'Facebook', enabled: true }
    ],
    brandTagline: 'LEARN · CODE · BUILD · SUCCEED',
    copyrightText: '© 2026 Code With AI. All rights reserved.',
    copyrightLinkText: 'Telegram',
    copyrightLinkUrl: 'https://t.me'
  }
};
