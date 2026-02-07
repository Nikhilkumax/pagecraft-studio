import { motion } from 'framer-motion';
import { Template } from '@/types/editor';
import { getCategoryLabel } from '@/data/templates';
import { ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
  index: number;
}

export function TemplateCard({ template, onClick, index }: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative bg-card rounded-xl overflow-hidden border border-border card-hover">
        {/* Thumbnail */}
        <div 
          className="aspect-[4/3] relative overflow-hidden"
          style={{ backgroundColor: template.theme.secondaryColor }}
        >
          {/* Preview mockup */}
          <div className="absolute inset-4 bg-white rounded-lg shadow-lg overflow-hidden">
            <div 
              className="h-1/3 flex items-center justify-center"
              style={{ backgroundColor: template.theme.primaryColor + '20' }}
            >
              <div 
                className="w-16 h-2 rounded-full"
                style={{ backgroundColor: template.theme.primaryColor }}
              />
            </div>
            <div className="p-3 space-y-2">
              <div className="w-full h-2 bg-gray-200 rounded" />
              <div className="w-3/4 h-2 bg-gray-200 rounded" />
              <div className="w-1/2 h-2 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium">
                Use Template
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {template.description}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <span 
              className="inline-block px-2.5 py-1 text-xs font-medium rounded-full"
              style={{ 
                backgroundColor: template.theme.primaryColor + '15',
                color: template.theme.primaryColor 
              }}
            >
              {getCategoryLabel(template.category)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
