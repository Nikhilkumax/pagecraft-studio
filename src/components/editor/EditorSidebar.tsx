import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  LayoutGrid, 
  Palette, 
  Settings,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ElementsPalette } from './ElementsPalette';
import { SectionsPalette } from './SectionsPalette';
import { ThemePanel } from './ThemePanel';

type Tab = 'elements' | 'sections' | 'theme' | 'settings';

const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: 'sections', icon: LayoutGrid, label: 'Sections' },
  { id: 'elements', icon: Layers, label: 'Elements' },
  { id: 'theme', icon: Palette, label: 'Theme' },
];

interface EditorSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function EditorSidebar({ isCollapsed, onToggle }: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState<Tab>('sections');

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        'h-full bg-card border-r border-border flex flex-col transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-72'
      )}
    >
      {/* Tab navigation */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            )}
          >
            <tab.icon className="w-4 h-4" />
            {!isCollapsed && <span>{tab.label}</span>}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed && (
          <>
            {activeTab === 'sections' && <SectionsPalette />}
            {activeTab === 'elements' && <ElementsPalette />}
            {activeTab === 'theme' && <ThemePanel />}
          </>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center py-3 border-t border-border text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
      >
        <ChevronLeft className={cn('w-5 h-5 transition-transform', isCollapsed && 'rotate-180')} />
      </button>
    </motion.aside>
  );
}
