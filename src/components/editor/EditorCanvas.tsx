import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { useEditor } from '@/context/EditorContext';
import { SectionBlock } from './SectionBlock';
import { DeviceView } from '@/types/editor';
import { cn } from '@/lib/utils';

const deviceWidths: Record<DeviceView, string> = {
  desktop: 'max-w-4xl',
  tablet: 'max-w-md',
  mobile: 'max-w-xs',
};

export function EditorCanvas() {
  const { state, reorderSections, selectSection } = useEditor();
  const { currentPage, selectedSectionId, deviceView, isPreviewMode } = state;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !currentPage) return;

    if (active.id !== over.id) {
      const oldIndex = currentPage.sections.findIndex((s) => s.id === active.id);
      const newIndex = currentPage.sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(currentPage.sections, oldIndex, newIndex);
      reorderSections(newSections);
    }
  };

  if (!currentPage) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">No page selected</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-muted/30 p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'mx-auto bg-background rounded-xl shadow-xl overflow-hidden transition-all duration-300',
          deviceWidths[deviceView]
        )}
        style={{
          backgroundColor: currentPage.theme.backgroundColor,
          fontFamily: currentPage.theme.fontFamily,
        }}
      >
        {isPreviewMode ? (
          // Preview mode - static view
          <div className="min-h-[600px]">
            {currentPage.sections.map((section) => (
              <div
                key={section.id}
                className="p-8"
                style={{ 
                  padding: section.styles?.padding,
                  backgroundColor: section.styles?.backgroundColor,
                  textAlign: section.styles?.textAlign,
                }}
              >
                <div className="text-center">
                  <span 
                    className="text-4xl font-bold"
                    style={{ color: currentPage.theme.textColor }}
                  >
                    {section.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Edit mode - draggable sections
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentPage.sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="min-h-[600px] p-4 space-y-4">
                {currentPage.sections.length === 0 ? (
                  <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">
                      Add sections from the left panel to get started
                    </p>
                  </div>
                ) : (
                  currentPage.sections.map((section) => (
                    <SectionBlock
                      key={section.id}
                      section={section}
                      isSelected={selectedSectionId === section.id}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </motion.div>
    </div>
  );
}
