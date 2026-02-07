import { useState } from 'react';
import { motion } from 'framer-motion';
import { templates, getCategoryLabel } from '@/data/templates';
import { TemplateCard } from './TemplateCard';
import { Template } from '@/types/editor';
import { cn } from '@/lib/utils';

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
}

const categories = [
  { id: 'all', label: 'All Templates' },
  { id: 'affiliate', label: 'Affiliate' },
  { id: 'product', label: 'Product' },
  { id: 'personal', label: 'Personal' },
  { id: 'business', label: 'Business' },
  { id: 'lead-capture', label: 'Lead Capture' },
];

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTemplates = activeCategory === 'all'
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Start with a template
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates, 
            then customize everything to match your brand.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === category.id
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Template grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={index}
              onClick={() => onSelectTemplate(template)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
