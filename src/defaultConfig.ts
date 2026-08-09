import { SiteConfig } from './types';

export const defaultConfig: SiteConfig = {
  header: {
    logoText: 'CODE WITH AI',
    ctaText: 'Login',
  },
  hero: {
    tagline: 'STUDY MATERIAL',
    title: 'Notes for Every Subject',
    subtitle: 'Every subject has a Free version you can download right now. Click Paid to get the detailed premium version via Telegram.',
  },
  resume: {
    tagline: 'FREE TOOL',
    title: 'Build Your Resume',
    subtitle: 'A professional, ATS-optimized resume ready to download in minutes — completely free.',
    cardTitle: 'AI Resume Builder',
    cardDesc: 'Fill in your details, pick a template, and get a clean PDF resume ready to send to recruiters. No account required. No cost. Built for students and freshers.',
    ctaText: 'Open Resume Builder',
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
    { id: '1', title: 'Python', description: 'Basics to advanced - variables, loops, OOP, modules', icon: 'Terminal', category: 'Programming', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: '2', title: 'C Language', description: 'Core C programming - pointers, memory, functions', icon: 'Code', category: 'Programming', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: '3', title: 'C++', description: 'Object oriented programming, STL, and algorithms', icon: 'Code', category: 'Programming', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: '4', title: 'Operating System', description: 'Processes, scheduling, memory management, deadlocks', icon: 'Monitor', category: 'CS Core', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: '5', title: 'JavaScript', description: 'Modern JS - ES6+, DOM manipulation, async, APIs', icon: 'FileJson', category: 'Web Dev', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: '6', title: 'HTML', description: 'Web structure - tags, forms, semantic elements', icon: 'Layout', category: 'Web Dev', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: '7', title: 'CSS', description: 'Styling, Flexbox, Grid, animations - made easy', icon: 'Palette', category: 'Web Dev', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: '8', title: 'DBMS', description: 'SQL, ER diagrams, normalization, transactions', icon: 'Database', category: 'CS Core', previewUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
  ],
  footer: {
    cta: 'Start with free notes — master with premium notes.',
    community: 'Join the Community',
  }
};
