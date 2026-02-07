import { motion } from 'framer-motion';
import { X, Trash2, Type, Image, MousePointer2, FormInput, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useEditor } from '@/context/EditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PageElement } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export function PropertiesPanel() {
  const { state, getSelectedSection, getSelectedElement, updateSection, updateElement, deleteElement, addElement, selectSection } = useEditor();
  const section = getSelectedSection();
  const element = getSelectedElement();

  if (!section) {
    return (
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-80 bg-card border-l border-border h-full flex items-center justify-center p-6"
      >
        <p className="text-sm text-muted-foreground text-center">
          Select a section to edit its properties
        </p>
      </motion.aside>
    );
  }

  const handleAddElement = (type: PageElement['type']) => {
    const newElement: PageElement = {
      id: uuidv4(),
      type,
      content: getDefaultContent(type),
    };
    addElement(section.id, newElement);
  };

  const getDefaultContent = (type: PageElement['type']): Record<string, unknown> => {
    switch (type) {
      case 'heading':
        return { text: 'New Heading', level: 'h2' };
      case 'text':
        return { text: 'Add your text here...' };
      case 'button':
        return { text: 'Click Me', link: '#', variant: 'primary' };
      case 'image':
        return { src: '', alt: 'Image description' };
      case 'form':
        return { fields: ['email'], buttonText: 'Submit', placeholder: 'Enter your email' };
      case 'divider':
        return { style: 'solid' };
      case 'spacer':
        return { height: '2rem' };
      default:
        return {};
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 bg-card border-l border-border h-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">
            {element ? 'Edit Element' : 'Section Properties'}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {element ? element.type : section.type}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => selectSection(null)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Section Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Section Settings</h4>
          
          <div className="space-y-2">
            <Label className="text-xs">Section Title</Label>
            <Input
              value={section.title}
              onChange={(e) => updateSection(section.id, { title: e.target.value })}
              className="h-9"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Text Alignment</Label>
            <div className="flex gap-1">
              {[
                { value: 'left', icon: AlignLeft },
                { value: 'center', icon: AlignCenter },
                { value: 'right', icon: AlignRight },
              ].map(({ value, icon: Icon }) => (
                <Button
                  key={value}
                  variant={section.styles?.textAlign === value ? 'secondary' : 'ghost'}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => updateSection(section.id, { styles: { ...section.styles, textAlign: value as 'left' | 'center' | 'right' } })}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Background Color</Label>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="color"
                  value={section.styles?.backgroundColor || '#ffffff'}
                  onChange={(e) => updateSection(section.id, { styles: { ...section.styles, backgroundColor: e.target.value } })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                  className="w-9 h-9 rounded-md border border-border cursor-pointer"
                  style={{ backgroundColor: section.styles?.backgroundColor || '#ffffff' }}
                />
              </div>
              <Input
                value={section.styles?.backgroundColor || ''}
                onChange={(e) => updateSection(section.id, { styles: { ...section.styles, backgroundColor: e.target.value } })}
                placeholder="#ffffff"
                className="h-9 flex-1 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Add Elements */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Add Element</h4>
          <div className="grid grid-cols-4 gap-2">
            {[
              { type: 'heading', icon: Type, label: 'Heading' },
              { type: 'text', icon: AlignLeft, label: 'Text' },
              { type: 'button', icon: MousePointer2, label: 'Button' },
              { type: 'form', icon: FormInput, label: 'Form' },
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => handleAddElement(type as PageElement['type'])}
                className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all"
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Elements List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            Elements ({section.elements.length})
          </h4>
          
          {section.elements.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">
              No elements yet. Add one above.
            </p>
          ) : (
            <div className="space-y-2">
              {section.elements.map((el) => (
                <ElementEditor
                  key={el.id}
                  element={el}
                  sectionId={section.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

interface ElementEditorProps {
  element: PageElement;
  sectionId: string;
}

function ElementEditor({ element, sectionId }: ElementEditorProps) {
  const { updateElement, deleteElement, state, selectElement } = useEditor();
  const isSelected = state.selectedElementId === element.id;

  const handleUpdate = (updates: Partial<PageElement['content']>) => {
    updateElement(sectionId, element.id, { content: updates });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-lg border p-3 transition-all',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-border bg-secondary/30 hover:border-primary/30'
      )}
      onClick={() => selectElement(element.id)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {element.type}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            deleteElement(sectionId, element.id);
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Heading Editor */}
      {element.type === 'heading' && (
        <div className="space-y-2">
          <Input
            value={(element.content.text as string) || ''}
            onChange={(e) => handleUpdate({ text: e.target.value })}
            placeholder="Heading text"
            className="h-8 text-sm"
          />
          <Select
            value={(element.content.level as string) || 'h2'}
            onValueChange={(value) => handleUpdate({ level: value })}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="h1">Heading 1 (Large)</SelectItem>
              <SelectItem value="h2">Heading 2 (Medium)</SelectItem>
              <SelectItem value="h3">Heading 3 (Small)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Text Editor */}
      {element.type === 'text' && (
        <Textarea
          value={(element.content.text as string) || ''}
          onChange={(e) => handleUpdate({ text: e.target.value })}
          placeholder="Enter your text..."
          className="text-sm min-h-[80px] resize-none"
        />
      )}

      {/* Button Editor */}
      {element.type === 'button' && (
        <div className="space-y-2">
          <Input
            value={(element.content.text as string) || ''}
            onChange={(e) => handleUpdate({ text: e.target.value })}
            placeholder="Button text"
            className="h-8 text-sm"
          />
          <Input
            value={(element.content.link as string) || ''}
            onChange={(e) => handleUpdate({ link: e.target.value })}
            placeholder="https://..."
            className="h-8 text-sm"
          />
          <Select
            value={(element.content.variant as string) || 'primary'}
            onValueChange={(value) => handleUpdate({ variant: value })}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Image Editor */}
      {element.type === 'image' && (
        <div className="space-y-2">
          <Input
            value={(element.content.src as string) || ''}
            onChange={(e) => handleUpdate({ src: e.target.value })}
            placeholder="Image URL"
            className="h-8 text-sm"
          />
          <Input
            value={(element.content.alt as string) || ''}
            onChange={(e) => handleUpdate({ alt: e.target.value })}
            placeholder="Alt text"
            className="h-8 text-sm"
          />
        </div>
      )}

      {/* Form Editor */}
      {element.type === 'form' && (
        <div className="space-y-2">
          <Input
            value={(element.content.placeholder as string) || ''}
            onChange={(e) => handleUpdate({ placeholder: e.target.value })}
            placeholder="Input placeholder"
            className="h-8 text-sm"
          />
          <Input
            value={(element.content.buttonText as string) || ''}
            onChange={(e) => handleUpdate({ buttonText: e.target.value })}
            placeholder="Button text"
            className="h-8 text-sm"
          />
        </div>
      )}
    </motion.div>
  );
}
