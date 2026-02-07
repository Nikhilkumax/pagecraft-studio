import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, Trash2, Copy, Settings } from 'lucide-react';
import { PageSection } from '@/types/editor';
import { useEditor } from '@/context/EditorContext';
import { cn } from '@/lib/utils';

interface SectionBlockProps {
  section: PageSection;
  isSelected: boolean;
}

export function SectionBlock({ section, isSelected }: SectionBlockProps) {
  const { selectSection, deleteSection, duplicateSection } = useEditor();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getSectionColor = (type: string) => {
    const colors: Record<string, string> = {
      hero: 'bg-blue-50 border-blue-200',
      about: 'bg-green-50 border-green-200',
      features: 'bg-purple-50 border-purple-200',
      cta: 'bg-orange-50 border-orange-200',
      testimonials: 'bg-pink-50 border-pink-200',
      pricing: 'bg-yellow-50 border-yellow-200',
      contact: 'bg-cyan-50 border-cyan-200',
      footer: 'bg-gray-50 border-gray-200',
      custom: 'bg-slate-50 border-slate-200',
    };
    return colors[type] || colors.custom;
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative group rounded-lg border-2 transition-all',
        getSectionColor(section.type),
        isSelected && 'ring-2 ring-primary ring-offset-2',
        isDragging && 'opacity-50 z-50'
      )}
      onClick={() => selectSection(section.id)}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Section content */}
      <div className="p-8 min-h-[120px] flex items-center justify-center" style={{ padding: section.styles?.padding }}>
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {section.type}
          </span>
          <h3 className="text-lg font-semibold text-foreground mt-1">
            {section.title}
          </h3>
          {section.elements.length > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              {section.elements.length} element{section.elements.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            duplicateSection(section.id);
          }}
          className="p-1.5 rounded-md bg-background/80 hover:bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteSection(section.id);
          }}
          className="p-1.5 rounded-md bg-background/80 hover:bg-destructive border border-border text-muted-foreground hover:text-destructive-foreground transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
