
"use client";

import { useFormStatus } from "react-dom";
import type { SiteConfig } from "@/types";
import { updateTheme } from "@/actions/aiActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Sun, Moon } from "lucide-react";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";


export function ThemeForm({ config }: { config: SiteConfig }) {
    const [colors, setColors] = useState(config.variablesCss);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setColors(prev => ({...prev, [name]: value}));
    }

    const lightThemePreviewColors = useMemo(() => ({
        '--background': colors.colorFondo,
        '--foreground': colors.colorTexto,
        '--primary': colors.colorPrimario,
        '--secondary': colors.colorSecundario,
        '--accent': colors.colorAcento,
        '--card': '#ffffff',
        '--card-foreground': colors.colorTexto,
        '--muted-foreground': '#6b7280'
    }), [colors]);

     const darkThemePreviewColors = useMemo(() => ({
        '--background': colors.darkColorFondo,
        '--foreground': colors.darkColorTexto,
        '--primary': colors.darkColorPrimario,
        '--secondary': colors.darkColorSecundario,
        '--accent': colors.darkColorAcento,
        '--card': '#1f2937',
        '--card-foreground': colors.darkColorTexto,
        '--muted-foreground': '#9ca3af'
    }), [colors]);


    return (
        <form action={updateTheme} className="space-y-8">
             <div className="grid lg:grid-cols-2 gap-8">
                {/* Color Pickers */}
                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium text-lg mb-3">Tema Claro</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ColorInput label="Primario" name="colorPrimario" value={colors.colorPrimario} onChange={handleColorChange} />
                            <ColorInput label="Secundario" name="colorSecundario" value={colors.colorSecundario} onChange={handleColorChange} />
                            <ColorInput label="Acento" name="colorAcento" value={colors.colorAcento} onChange={handleColorChange} />
                            <ColorInput label="Fondo" name="colorFondo" value={colors.colorFondo} onChange={handleColorChange} />
                            <ColorInput label="Texto" name="colorTexto" value={colors.colorTexto} onChange={handleColorChange} />
                        </div>
                    </div>
                     <div>
                        <h4 className="font-medium text-lg mb-3">Tema Oscuro</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ColorInput label="Primario (Oscuro)" name="darkColorPrimario" value={colors.darkColorPrimario} onChange={handleColorChange} />
                            <ColorInput label="Secundario (Oscuro)" name="darkColorSecundario" value={colors.darkColorSecundario} onChange={handleColorChange} />
                             <ColorInput label="Acento (Oscuro)" name="darkColorAcento" value={colors.darkColorAcento} onChange={handleColorChange} />
                            <ColorInput label="Fondo (Oscuro)" name="darkColorFondo" value={colors.darkColorFondo} onChange={handleColorChange} />
                            <ColorInput label="Texto (Oscuro)" name="darkColorTexto" value={colors.darkColorTexto} onChange={handleColorChange} />
                        </div>
                    </div>
                </div>

                {/* Previews */}
                <div className="space-y-6">
                    <div>
                        <h4 className="font-medium text-lg mb-3 flex items-center gap-2"><Sun className="h-5 w-5"/> Vista Previa (Claro)</h4>
                        <ThemePreview colors={lightThemePreviewColors} />
                    </div>
                    <div>
                        <h4 className="font-medium text-lg mb-3 flex items-center gap-2"><Moon className="h-5 w-5" /> Vista Previa (Oscuro)</h4>
                        <ThemePreview colors={darkThemePreviewColors} />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end pt-4">
                <SubmitButton />
            </div>
        </form>
    )
}

function ColorInput({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <div className="flex items-center gap-2">
                 <Input
                    id={name}
                    name={name}
                    type="color"
                    value={value}
                    onChange={onChange}
                    className="w-10 h-10 p-1 cursor-pointer"
                />
                <Input
                    type="text"
                    value={value}
                    onChange={onChange}
                    name={name}
                    className="flex-1"
                />
            </div>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} size="lg">
            <Save className="mr-2 h-4 w-4" />
            {pending ? "Guardando..." : "Guardar Cambios"}
        </Button>
    )
}

function ThemePreview({ colors }: { colors: Record<string, string> }) {
  return (
    <Card
      className="p-4 w-full overflow-hidden"
      style={colors as React.CSSProperties}
    >
      <div className="bg-[var(--background)] text-[var(--foreground)] rounded-md border border-gray-300 dark:border-gray-700">
        {/* Header */}
        <header 
          className="flex items-center justify-between p-2 border-b"
          style={{ backgroundColor: 'var(--secondary)' }}
        >
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: 'var(--primary)'}} />
            <div className="w-12 h-3 rounded-sm" style={{ backgroundColor: 'var(--foreground)'}} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-3 rounded-sm" style={{ backgroundColor: 'var(--muted-foreground)'}} />
            <div className="w-8 h-3 rounded-sm" style={{ backgroundColor: 'var(--muted-foreground)'}} />
          </div>
        </header>

        {/* Body */}
        <div className="p-4 space-y-4">
          <h1 
            className="w-3/4 h-6 rounded-sm" 
            style={{ backgroundColor: 'var(--foreground)' }}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="w-full h-3 rounded-sm" style={{ backgroundColor: 'var(--muted-foreground)'}} />
              <div className="w-5/6 h-3 rounded-sm" style={{ backgroundColor: 'var(--muted-foreground)'}} />
            </div>
            <div className="flex items-center justify-end">
              <div 
                className="w-20 h-8 rounded-md"
                style={{ backgroundColor: 'var(--primary)' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="p-2 rounded-md space-y-2" style={{ backgroundColor: 'var(--card)' }}>
                 <div className="w-full h-16 rounded" style={{ backgroundColor: 'var(--accent)'}} />
                 <div className="w-full h-3 rounded-sm" style={{ backgroundColor: 'var(--card-foreground)'}} />
                 <div className="w-1/2 h-3 rounded-sm" style={{ backgroundColor: 'var(--card-foreground)'}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
