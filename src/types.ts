export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  previewUrl?: string;
  freeUrl?: string;
  isFreeEnabled?: boolean;
  isPremiumEnabled?: boolean;
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

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  enabled?: boolean;
}

export interface SiteConfig {
  header: {
    logoText: string;
    ctaText: string;
  };
  hero: {
    tagline: string;
    title: string;
    titleTop?: string;
    titleMiddle?: string;
    titleBottom?: string;
    subtitle: string;
    subBadgeLeft?: string;
    subBadgeRight?: string;
    primaryCtaText?: string;
    secondaryCtaText?: string;
  };
  resume: {
    tagline: string;
    title: string;
    subtitle: string;
    cardTitle: string;
    cardDesc: string;
    ctaText: string;
    ctaUrl?: string;
    featureTags?: string;
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
  categories: string[];
  googleSearchConsoleCode?: string;
  showTopFeatures?: boolean;
  showStats?: boolean;
  topFeatures: TopFeature[];
  stats: Stat[];
  subjects: Subject[];
  footer: {
    cta: string;
    community: string;
    stayConnectedText?: string;
    communityTitle?: string;
    communityDescription?: string;
    socials?: SocialLink[];
    brandTagline?: string;
    copyrightText?: string;
    copyrightLinkText?: string;
    copyrightLinkUrl?: string;
  };
}
