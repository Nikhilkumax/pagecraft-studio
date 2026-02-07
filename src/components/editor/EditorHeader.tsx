import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye,
  Edit3,
  Undo,
  Redo,
  Save,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/context/EditorContext';
import { DeviceView } from '@/types/editor';
import { cn } from '@/lib/utils';

const deviceOptions: { view: DeviceView; icon: React.ElementType; label: string }[] = [
  { view: 'desktop', icon: Monitor, label: 'Desktop' },
  { view: 'tablet', icon: Tablet, label: 'Tablet' },
  { view: 'mobile', icon: Smartphone, label: 'Mobile' },
];

export function EditorHeader() {
  const { state, setDeviceView, togglePreview } = useEditor();
  const { currentPage, deviceView, isPreviewMode } = state;

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-14 bg-card border-b border-border flex items-center justify-between px-4"
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Link 
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Layers className="w-4 h-4 text-primary-foreground" />
          </div>
        </Link>
        <div className="h-6 w-px bg-border" />
        <span className="font-medium text-foreground truncate max-w-[200px]">
          {currentPage?.title || 'Untitled'}
        </span>
      </div>

      {/* Center section - Device toggle */}
      <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
        {deviceOptions.map((option) => (
          <button
            key={option.view}
            onClick={() => setDeviceView(option.view)}
            className={cn(
              'p-2 rounded-md transition-all',
              deviceView === option.view
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title={option.label}
          >
            <option.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-border" />

        {/* Preview toggle */}
        <Button
          variant={isPreviewMode ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => togglePreview()}
          className="gap-2"
        >
          {isPreviewMode ? (
            <>
              <Edit3 className="w-4 h-4" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Preview
            </>
          )}
        </Button>

        {/* Publish */}
        <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
          <Globe className="w-4 h-4" />
          Publish
        </Button>
      </div>
    </motion.header>
  );
}
