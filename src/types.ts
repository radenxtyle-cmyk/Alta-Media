export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TopFeature {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface SiteConfig {
  header: {
    logoText: string;
    ctaText: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
  };
  resume: {
    tagline: string;
    title: string;
    subtitle: string;
    cardTitle: string;
    cardDesc: string;
    ctaText: string;
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
    cardBg: string;
    border: string;
    text: string;
    muted: string;
  };
  topFeatures: TopFeature[];
  stats: Stat[];
  subjects: Subject[];
  footer: {
    cta: string;
    community: string;
  };
}
