// Types for the landing page editor

export type ElementType = 
  | 'heading'
  | 'text'
  | 'image'
  | 'button'
  | 'form'
  | 'divider'
  | 'spacer'
  | 'card';

export type SectionType = 
  | 'hero'
  | 'about'
  | 'features'
  | 'cta'
  | 'testimonials'
  | 'pricing'
  | 'contact'
  | 'footer'
  | 'custom';

export interface PageElement {
  id: string;
  type: ElementType;
  content: Record<string, unknown>;
  styles?: Record<string, string>;
}

export interface PageSection {
  id: string;
  type: SectionType;
  title: string;
  elements: PageElement[];
  styles?: {
    backgroundColor?: string;
    backgroundImage?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface PageTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
}

export interface LandingPage {
  id: string;
  title: string;
  slug: string;
  description: string;
  sections: PageSection[];
  theme: PageTheme;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  category: 'affiliate' | 'product' | 'personal' | 'business' | 'lead-capture';
  description: string;
  thumbnail: string;
  sections: PageSection[];
  theme: PageTheme;
}

export type DeviceView = 'desktop' | 'tablet' | 'mobile';

export interface EditorState {
  currentPage: LandingPage | null;
  selectedSection: string | null;
  selectedElement: string | null;
  deviceView: DeviceView;
  isPreviewMode: boolean;
  isDragging: boolean;
  history: LandingPage[];
  historyIndex: number;
}

// Default theme
export const defaultTheme: PageTheme = {
  primaryColor: '#0891b2',
  secondaryColor: '#f1f5f9',
  backgroundColor: '#ffffff',
  textColor: '#1e293b',
  accentColor: '#f97316',
  fontFamily: 'Inter',
  borderRadius: '0.75rem',
};

// Preset themes
export const presetThemes: { name: string; theme: PageTheme }[] = [
  {
    name: 'Ocean',
    theme: {
      primaryColor: '#0891b2',
      secondaryColor: '#ecfeff',
      backgroundColor: '#ffffff',
      textColor: '#164e63',
      accentColor: '#f97316',
      fontFamily: 'Inter',
      borderRadius: '0.75rem',
    },
  },
  {
    name: 'Forest',
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#ecfdf5',
      backgroundColor: '#ffffff',
      textColor: '#064e3b',
      accentColor: '#fbbf24',
      fontFamily: 'Inter',
      borderRadius: '0.75rem',
    },
  },
  {
    name: 'Sunset',
    theme: {
      primaryColor: '#dc2626',
      secondaryColor: '#fef2f2',
      backgroundColor: '#ffffff',
      textColor: '#450a0a',
      accentColor: '#f59e0b',
      fontFamily: 'Inter',
      borderRadius: '0.75rem',
    },
  },
  {
    name: 'Midnight',
    theme: {
      primaryColor: '#6366f1',
      secondaryColor: '#eef2ff',
      backgroundColor: '#ffffff',
      textColor: '#312e81',
      accentColor: '#ec4899',
      fontFamily: 'Inter',
      borderRadius: '0.75rem',
    },
  },
  {
    name: 'Minimal',
    theme: {
      primaryColor: '#18181b',
      secondaryColor: '#f4f4f5',
      backgroundColor: '#ffffff',
      textColor: '#18181b',
      accentColor: '#18181b',
      fontFamily: 'Inter',
      borderRadius: '0.5rem',
    },
  },
];
