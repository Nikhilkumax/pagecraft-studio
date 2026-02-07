import { motion } from 'framer-motion';
import { 
  Type, 
  Image, 
  MousePointer2, 
  FormInput, 
  LayoutGrid, 
  Minus, 
  Square,
  Heading1,
  AlignLeft,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ElementItem {
  id: string;
  type: string;
  icon: React.ElementType;
  label: string;
}

const elements: ElementItem[] = [
  { id: 'heading', type: 'heading', icon: Heading1, label: 'Heading' },
  { id: 'text', type: 'text', icon: AlignLeft, label: 'Text' },
  { id: 'image', type: 'image', icon: Image, label: 'Image' },
  { id: 'button', type: 'button', icon: MousePointer2, label: 'Button' },
  { id: 'form', type: 'form', icon: FormInput, label: 'Form' },
  { id: 'card', type: 'card', icon: Square, label: 'Card' },
  { id: 'divider', type: 'divider', icon: Minus, label: 'Divider' },
  { id: 'spacer', type: 'spacer', icon: LayoutGrid, label: 'Spacer' },
];

export function ElementsPalette() {
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Elements</h3>
      <div className="grid grid-cols-2 gap-2">
        {elements.map((element, index) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            draggable
            onDragStart={(e) => {
              (e as any).dataTransfer?.setData('elementType', element.type);
            }}
            className={cn(
              'flex flex-col items-center gap-2 p-3 rounded-lg border border-border',
              'bg-card hover:bg-secondary/50 cursor-grab active:cursor-grabbing',
              'transition-all hover:border-primary/50 hover:shadow-sm'
            )}
          >
            <element.icon className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{element.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
