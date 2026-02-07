import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { 
  LayoutTemplate, 
  Star, 
  Users, 
  CreditCard,
  MessageSquare,
  Mail,
  Footprints,
  Plus
} from 'lucide-react';
import { useEditor } from '@/context/EditorContext';
import { PageSection, SectionType } from '@/types/editor';
import { cn } from '@/lib/utils';

interface SectionItem {
  type: SectionType;
  icon: React.ElementType;
  label: string;
}

const sectionTypes: SectionItem[] = [
  { type: 'hero', icon: LayoutTemplate, label: 'Hero' },
  { type: 'about', icon: Users, label: 'About' },
  { type: 'features', icon: Star, label: 'Features' },
  { type: 'cta', icon: Plus, label: 'CTA' },
  { type: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
  { type: 'pricing', icon: CreditCard, label: 'Pricing' },
  { type: 'contact', icon: Mail, label: 'Contact' },
  { type: 'footer', icon: Footprints, label: 'Footer' },
];

export function SectionsPalette() {
  const { addSection } = useEditor();

  const handleAddSection = (type: SectionType) => {
    const newSection: PageSection = {
      id: uuidv4(),
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      elements: [],
      styles: {
        padding: '4rem',
        textAlign: 'center',
      },
    };
    addSection(newSection);
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Sections</h3>
      <div className="space-y-2">
        {sectionTypes.map((section, index) => (
          <motion.button
            key={section.type}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleAddSection(section.type)}
            className={cn(
              'w-full flex items-center gap-3 p-3 rounded-lg border border-border',
              'bg-card hover:bg-secondary/50 text-left',
              'transition-all hover:border-primary/50 hover:shadow-sm'
            )}
          >
            <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
              <section.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm text-foreground">{section.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
