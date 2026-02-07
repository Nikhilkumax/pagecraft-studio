import { Template, defaultTheme } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const templates: Template[] = [
  {
    id: 'affiliate-1',
    name: 'Affiliate Pro',
    category: 'affiliate',
    description: 'Perfect for promoting products and earning commissions',
    thumbnail: '/placeholder.svg',
    theme: {
      ...defaultTheme,
      primaryColor: '#7c3aed',
      accentColor: '#f97316',
    },
    sections: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Hero Section',
        elements: [
          {
            id: uuidv4(),
            type: 'heading',
            content: { text: 'Discover the Best Products', level: 'h1' },
          },
          {
            id: uuidv4(),
            type: 'text',
            content: { text: 'Curated recommendations you can trust' },
          },
          {
            id: uuidv4(),
            type: 'button',
            content: { text: 'Get Started', link: '#' },
          },
        ],
        styles: { textAlign: 'center', padding: '6rem' },
      },
      {
        id: uuidv4(),
        type: 'features',
        title: 'Features',
        elements: [],
        styles: { padding: '4rem' },
      },
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Call to Action',
        elements: [],
        styles: { textAlign: 'center', padding: '4rem' },
      },
    ],
  },
  {
    id: 'product-1',
    name: 'Product Launch',
    category: 'product',
    description: 'Launch your product with style and impact',
    thumbnail: '/placeholder.svg',
    theme: {
      ...defaultTheme,
      primaryColor: '#0891b2',
      accentColor: '#ec4899',
    },
    sections: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Hero Section',
        elements: [
          {
            id: uuidv4(),
            type: 'heading',
            content: { text: 'Introducing Your Product', level: 'h1' },
          },
          {
            id: uuidv4(),
            type: 'text',
            content: { text: 'The solution you\'ve been waiting for' },
          },
        ],
        styles: { textAlign: 'center', padding: '6rem' },
      },
      {
        id: uuidv4(),
        type: 'features',
        title: 'Key Features',
        elements: [],
        styles: { padding: '4rem' },
      },
      {
        id: uuidv4(),
        type: 'pricing',
        title: 'Pricing',
        elements: [],
        styles: { textAlign: 'center', padding: '4rem' },
      },
    ],
  },
  {
    id: 'personal-1',
    name: 'Personal Brand',
    category: 'personal',
    description: 'Showcase your personal brand beautifully',
    thumbnail: '/placeholder.svg',
    theme: {
      ...defaultTheme,
      primaryColor: '#18181b',
      secondaryColor: '#fafafa',
      accentColor: '#18181b',
    },
    sections: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Hero Section',
        elements: [
          {
            id: uuidv4(),
            type: 'heading',
            content: { text: 'Hi, I\'m [Your Name]', level: 'h1' },
          },
          {
            id: uuidv4(),
            type: 'text',
            content: { text: 'Designer, Developer, Creator' },
          },
        ],
        styles: { textAlign: 'center', padding: '8rem' },
      },
      {
        id: uuidv4(),
        type: 'about',
        title: 'About Me',
        elements: [],
        styles: { padding: '4rem' },
      },
      {
        id: uuidv4(),
        type: 'contact',
        title: 'Contact',
        elements: [],
        styles: { textAlign: 'center', padding: '4rem' },
      },
    ],
  },
  {
    id: 'business-1',
    name: 'Business Services',
    category: 'business',
    description: 'Professional landing page for your business',
    thumbnail: '/placeholder.svg',
    theme: {
      ...defaultTheme,
      primaryColor: '#1d4ed8',
      accentColor: '#f59e0b',
    },
    sections: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Hero Section',
        elements: [
          {
            id: uuidv4(),
            type: 'heading',
            content: { text: 'Grow Your Business', level: 'h1' },
          },
          {
            id: uuidv4(),
            type: 'text',
            content: { text: 'Professional services tailored to your needs' },
          },
        ],
        styles: { textAlign: 'center', padding: '6rem' },
      },
      {
        id: uuidv4(),
        type: 'features',
        title: 'Our Services',
        elements: [],
        styles: { padding: '4rem' },
      },
      {
        id: uuidv4(),
        type: 'testimonials',
        title: 'Testimonials',
        elements: [],
        styles: { padding: '4rem' },
      },
    ],
  },
  {
    id: 'lead-1',
    name: 'Lead Capture',
    category: 'lead-capture',
    description: 'Capture leads and grow your email list',
    thumbnail: '/placeholder.svg',
    theme: {
      ...defaultTheme,
      primaryColor: '#059669',
      accentColor: '#f97316',
    },
    sections: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Hero Section',
        elements: [
          {
            id: uuidv4(),
            type: 'heading',
            content: { text: 'Get Your Free Guide', level: 'h1' },
          },
          {
            id: uuidv4(),
            type: 'text',
            content: { text: 'Enter your email to download instantly' },
          },
          {
            id: uuidv4(),
            type: 'form',
            content: { fields: ['email'], buttonText: 'Download Now' },
          },
        ],
        styles: { textAlign: 'center', padding: '8rem' },
      },
      {
        id: uuidv4(),
        type: 'features',
        title: 'What You\'ll Learn',
        elements: [],
        styles: { padding: '4rem' },
      },
    ],
  },
  {
    id: 'blank',
    name: 'Blank Canvas',
    category: 'personal',
    description: 'Start from scratch with a blank page',
    thumbnail: '/placeholder.svg',
    theme: defaultTheme,
    sections: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Hero Section',
        elements: [
          {
            id: uuidv4(),
            type: 'heading',
            content: { text: 'Your Title Here', level: 'h1' },
          },
        ],
        styles: { textAlign: 'center', padding: '6rem' },
      },
    ],
  },
];

export const getCategoryLabel = (category: Template['category']) => {
  const labels: Record<Template['category'], string> = {
    affiliate: 'Affiliate Marketing',
    product: 'Product Launch',
    personal: 'Personal Brand',
    business: 'Business Services',
    'lead-capture': 'Lead Capture',
  };
  return labels[category];
};
