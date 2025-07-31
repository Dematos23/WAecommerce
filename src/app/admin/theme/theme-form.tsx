
"use client";

import { useFormStatus } from "react-dom";
import type { SiteConfig } from "@/types";
import { updateTheme } from "@/actions/aiActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export function ThemeForm({ config }: { config: SiteConfig }) {

    return (
        <form action={updateTheme} className="space-y-8">
            <div className="space-y-6 pt-4">
                <div>
                    <h4 className="font-medium text-lg mb-3">Tema Claro</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ColorInput label="Primario" name="colorPrimario" defaultValue={config.variablesCss.colorPrimario} />
                        <ColorInput label="Secundario" name="colorSecundario" defaultValue={config.variablesCss.colorSecundario} />
                        <ColorInput label="Acento" name="colorAcento" defaultValue={config.variablesCss.colorAcento} />
                        <ColorInput label="Fondo" name="colorFondo" defaultValue={config.variablesCss.colorFondo} />
                        <ColorInput label="Texto" name="colorTexto" defaultValue={config.variablesCss.colorTexto} />
                    </div>
                </div>
                 <div>
                    <h4 className="font-medium text-lg mb-3">Tema Oscuro</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ColorInput label="Primario (Oscuro)" name="darkColorPrimario" defaultValue={config.variablesCss.darkColorPrimario} />
                        <ColorInput label="Secundario (Oscuro)" name="darkColorSecundario" defaultValue={config.variablesCss.darkColorSecundario} />
                         <ColorInput label="Acento (Oscuro)" name="darkColorAcento" defaultValue={config.variablesCss.darkColorAcento} />
                        <ColorInput label="Fondo (Oscuro)" name="darkColorFondo" defaultValue={config.variablesCss.darkColorFondo} />
                        <ColorInput label="Texto (Oscuro)" name="darkColorTexto" defaultValue={config.variablesCss.darkColorTexto} />
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end pt-4">
                <SubmitButton />
            </div>
        </form>
    )
}

function ColorInput({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    type="color"
                    defaultValue={defaultValue}
                    className="w-full h-10 p-1 cursor-pointer"
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
