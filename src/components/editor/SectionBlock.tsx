import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, Trash2, Copy } from 'lucide-react';
import { PageSection, PageElement } from '@/types/editor';
import { useEditor } from '@/context/EditorContext';
import { cn } from '@/lib/utils';

interface SectionBlockProps {
  section: PageSection;
  isSelected: boolean;
}

export function SectionBlock({ section, isSelected }: SectionBlockProps) {
  const { selectSection, deleteSection, duplicateSection, state } = useEditor();
  const theme = state.currentPage?.theme;
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

  const renderElement = (element: PageElement) => {
    switch (element.type) {
      case 'heading': {
        const level = (element.content.level as string) || 'h2';
        const text = (element.content.text as string) || 'Heading';
        const sizes: Record<string, string> = {
          h1: 'text-3xl font-bold',
          h2: 'text-2xl font-semibold',
          h3: 'text-xl font-medium',
        };
        return (
          <div key={element.id} className={cn(sizes[level], 'mb-2')} style={{ color: theme?.textColor }}>
            {text}
          </div>
        );
      }
      case 'text':
        return (
          <p key={element.id} className="text-sm mb-2" style={{ color: theme?.textColor }}>
            {(element.content.text as string) || 'Text content'}
          </p>
        );
      case 'button': {
        const variant = (element.content.variant as string) || 'primary';
        const buttonStyles: Record<string, React.CSSProperties> = {
          primary: { backgroundColor: theme?.primaryColor, color: '#fff' },
          secondary: { backgroundColor: theme?.secondaryColor, color: theme?.textColor },
          outline: { backgroundColor: 'transparent', border: `2px solid ${theme?.primaryColor}`, color: theme?.primaryColor },
        };
        return (
          <button
            key={element.id}
            className="px-4 py-2 rounded-md text-sm font-medium mb-2"
            style={{ ...buttonStyles[variant], borderRadius: theme?.borderRadius }}
          >
            {(element.content.text as string) || 'Button'}
          </button>
        );
      }
      case 'form':
        return (
          <div key={element.id} className="flex gap-2 mb-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder={(element.content.placeholder as string) || 'Enter your email'}
              className="flex-1 px-3 py-2 text-sm border rounded-md"
              style={{ borderRadius: theme?.borderRadius, borderColor: theme?.secondaryColor }}
              readOnly
            />
            <button
              className="px-4 py-2 text-sm font-medium rounded-md"
              style={{ backgroundColor: theme?.accentColor || theme?.primaryColor, color: '#fff', borderRadius: theme?.borderRadius }}
            >
              {(element.content.buttonText as string) || 'Submit'}
            </button>
          </div>
        );
      case 'image':
        return (
          <div key={element.id} className="mb-2">
            {(element.content.src as string) ? (
              <img 
                src={element.content.src as string} 
                alt={(element.content.alt as string) || ''} 
                className="max-w-full h-auto rounded-lg"
                style={{ borderRadius: theme?.borderRadius }}
              />
            ) : (
              <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                No image set
              </div>
            )}
          </div>
        );
      case 'divider':
        return <hr key={element.id} className="my-4 border-border" />;
      case 'spacer':
        return <div key={element.id} style={{ height: (element.content.height as string) || '2rem' }} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: isSelected ? section.styles?.backgroundColor : undefined,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative group rounded-lg border-2 transition-all cursor-pointer',
        isSelected ? 'ring-2 ring-primary ring-offset-2' : '',
        isDragging ? 'opacity-50 z-50' : '',
        !isSelected && getSectionColor(section.type)
      )}
      onClick={() => selectSection(section.id)}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Section content */}
      <div 
        className="p-8 min-h-[120px]" 
        style={{ 
          padding: section.styles?.padding,
          textAlign: section.styles?.textAlign || 'center',
          backgroundColor: section.styles?.backgroundColor,
        }}
      >
        {section.elements.length > 0 ? (
          <div className="space-y-1">
            {section.elements.map(renderElement)}
          </div>
        ) : (
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {section.type}
            </span>
            <h3 className="text-lg font-semibold text-foreground mt-1">
              {section.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              Click to add elements
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
