// Site-wide settings for Kiah Harpool.

import type { UIKey } from './i18n/en';

export const SITE = {
  locale: 'en',
  title: 'Kiah Harpool',
  description: 'Media leader, builder, and product-minded problem solver working across media, technology, and culture.',
  rssDescription: 'Notes and projects from Kiah Harpool.',
  ogImage: '/og.jpg',
  author: 'Kiah Harpool',
  footerText: 'Kiah Harpool / Chicago / 2026',
} as const;

export type SocialIcon = 'github' | 'x' | 'linkedin' | 'rss' | 'email';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/iphiginea', icon: 'github' },
];

export interface GiscusConfig {
  enabled: boolean;
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  strict: boolean;
  reactionsEnabled: boolean;
  inputPosition: 'top' | 'bottom';
  lang: string;
  lightTheme: string;
  darkTheme: string;
}

export const GISCUS: GiscusConfig = {
  enabled: false,
  repo: '',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname',
  strict: true,
  reactionsEnabled: true,
  inputPosition: 'bottom',
  lang: 'en',
  lightTheme: 'light',
  darkTheme: 'dark',
};

export type NavItem =
  | { href: string; label: string; labelKey?: never }
  | { href: string; labelKey: UIKey; label?: never };

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/works/', label: 'Work' },
  { href: '/about/', label: 'About' },
];
