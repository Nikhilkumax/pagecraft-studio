import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEditor } from '@/context/EditorContext';
import { presetThemes } from '@/types/editor';
import { Check, Pipette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ThemePanel() {
  const { state, updateTheme } = useEditor();
  const theme = state.currentPage?.theme;
  const [activePreset, setActivePreset] = useState<string | null>(null);

  if (!theme) return null;

  const handlePresetSelect = (preset: typeof presetThemes[0]) => {
    setActivePreset(preset.name);
    updateTheme(preset.theme);
  };

  const colorFields = [
    { key: 'primaryColor', label: 'Primary' },
    { key: 'secondaryColor', label: 'Secondary' },
    { key: 'backgroundColor', label: 'Background' },
    { key: 'textColor', label: 'Text' },
    { key: 'accentColor', label: 'Accent' },
  ] as const;

  return (
    <div className="p-4 space-y-6">
      {/* Preset themes */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Preset Themes</h3>
        <div className="grid grid-cols-3 gap-2">
          {presetThemes.map((preset, index) => (
            <motion.button
              key={preset.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handlePresetSelect(preset)}
              className={cn(
                'relative flex flex-col items-center gap-1.5 p-2 rounded-lg border',
                'transition-all hover:shadow-sm',
                activePreset === preset.name
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/50'
              )}
            >
              <div className="flex gap-1">
                <div 
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: preset.theme.primaryColor }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: preset.theme.accentColor }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{preset.name}</span>
              {activePreset === preset.name && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom colors */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Pipette className="w-4 h-4" />
          Custom Colors
        </h3>
        <div className="space-y-3">
          {colorFields.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={theme[key]}
                  onChange={(e) => updateTheme({ [key]: e.target.value })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                  className="w-8 h-8 rounded-lg border border-border cursor-pointer"
                  style={{ backgroundColor: theme[key] }}
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">{label}</Label>
                <Input
                  type="text"
                  value={theme[key]}
                  onChange={(e) => updateTheme({ [key]: e.target.value })}
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Border radius */}
      <div>
        <Label className="text-sm font-semibold text-foreground">Border Radius</Label>
        <div className="flex gap-2 mt-2">
          {['0', '0.375rem', '0.75rem', '1rem', '1.5rem'].map((radius) => (
            <button
              key={radius}
              onClick={() => updateTheme({ borderRadius: radius })}
              className={cn(
                'w-10 h-10 border flex items-center justify-center transition-all',
                theme.borderRadius === radius
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              )}
              style={{ borderRadius: radius }}
            >
              <div 
                className="w-4 h-4 bg-muted-foreground/30"
                style={{ borderRadius: radius }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
