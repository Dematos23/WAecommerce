
"use client";

import { useFormStatus } from "react-dom";
import type { SiteConfig } from "@/types";
import { updateTheme } from "@/actions/aiActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Sun, Moon, Palette, ShoppingBag, Eye, AlignLeft, AlignCenter, Image as ImageIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function ThemeForm({ config }: { config: SiteConfig }) {
    const [colors, setColors] = useState(config.variablesCss);
    const [productCard, setProductCard] = useState(config.productCard);

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
            <Accordion type="multiple" defaultValue={['theme-colors', 'card-appearance']} className="w-full">
                <AccordionItem value="theme-colors">
                    <AccordionTrigger className="text-xl font-semibold flex items-center gap-2"><Palette/> Colores del Tema</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
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
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="card-appearance">
                     <AccordionTrigger className="text-xl font-semibold flex items-center gap-2"><ShoppingBag /> Apariencia de la Tarjeta de Producto</AccordionTrigger>
                     <AccordionContent className="space-y-4 pt-4">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Posición de la Imagen</Label>
                                    <Select name="productCardImagePosition" defaultValue={productCard.imagePosition} onValueChange={(v) => setProductCard(p => ({...p, imagePosition: v as any}))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione posición..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="top">Arriba (estándar)</SelectItem>
                                            <SelectItem value="afterName">Debajo del Nombre</SelectItem>
                                            <SelectItem value="afterDescription">Debajo de la Descripción</SelectItem>
                                            <SelectItem value="afterPrice">Debajo del Precio</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                     <Label>Alineación del Texto</Label>
                                     <div className="space-y-3 mt-2">
                                        <AlignmentSelect 
                                            label="Nombre"
                                            name="productCardNameAlign"
                                            value={productCard.nameAlign}
                                            onValueChange={(v) => setProductCard(p => ({...p, nameAlign: v as any}))}
                                        />
                                         <AlignmentSelect 
                                            label="Descripción"
                                            name="productCardDescriptionAlign"
                                            value={productCard.descriptionAlign}
                                            onValueChange={(v) => setProductCard(p => ({...p, descriptionAlign: v as any}))}
                                        />
                                         <AlignmentSelect 
                                            label="Precio"
                                            name="productCardPriceAlign"
                                            value={productCard.priceAlign}
                                            onValueChange={(v) => setProductCard(p => ({...p, priceAlign: v as any}))}
                                        />
                                     </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="productCardButtonStyle">Estilo del Botón</Label>
                                    <Select name="productCardButtonStyle" defaultValue={productCard.buttonStyle} onValueChange={(v) => setProductCard(p => ({...p, buttonStyle: v as any}))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione estilo..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">Sólido</SelectItem>
                                            <SelectItem value="outline">Contorno</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="productCardShadow">Sombra de la Tarjeta</Label>
                                    <Select name="productCardShadow" defaultValue={productCard.shadow} onValueChange={(v) => setProductCard(p => ({...p, shadow: v as any}))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione sombra..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Ninguna</SelectItem>
                                            <SelectItem value="sm">Pequeña</SelectItem>
                                            <SelectItem value="md">Mediana</SelectItem>
                                            <SelectItem value="lg">Grande</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <div className="flex items-center justify-center">
                                <ProductCardPreview productCard={productCard} />
                            </div>
                        </div>
                     </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            <div className="flex justify-end pt-4">
                <SubmitButton />
            </div>
        </form>
    )
}

function AlignmentSelect({label, name, value, onValueChange}: {label: string, name: string, value: 'left' | 'center', onValueChange: (value: string) => void}) {
    return (
        <div className="flex items-center justify-between">
            <Label htmlFor={name} className="text-muted-foreground">{label}</Label>
             <Select name={name} value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Seleccione..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="left"><span className="flex items-center gap-2"><AlignLeft/> Izquierda</span></SelectItem>
                    <SelectItem value="center"><span className="flex items-center gap-2"><AlignCenter/> Centro</span></SelectItem>
                </SelectContent>
            </Select>
        </div>
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

function ProductCardPreview({ productCard }: { productCard: SiteConfig['productCard'] }) {
    const cardClasses = cn(
        "flex h-full w-full max-w-[280px] flex-col overflow-hidden transition-shadow duration-300 group rounded-lg border bg-card text-card-foreground",
        {
        'shadow-none': productCard.shadow === 'none',
        'shadow-sm': productCard.shadow === 'sm',
        'shadow-md': productCard.shadow === 'md',
        'shadow-lg': productCard.shadow === 'lg',
        'shadow-xl': productCard.shadow === 'xl',
        }
    );

    const nameClasses = cn("h-4 w-3/4 rounded-sm bg-primary/80 mb-2", {
      "mx-auto": productCard.nameAlign === 'center'
    });
    const descriptionClasses = cn("space-y-1", {
        "text-center": productCard.descriptionAlign === 'center',
    });
     const priceClasses = cn("h-6 w-1/3 rounded-sm bg-primary mt-4", {
        "mx-auto": productCard.priceAlign === 'center'
    });

    const ImagePreview = () => (
        <div className="relative aspect-square w-full bg-muted flex items-center justify-center p-4">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
    );

    const NamePreview = () => <div className={cn("p-4", {"pt-0": productCard.imagePosition === 'afterName' })}><div className={nameClasses} /></div>
    const DescPreview = () => <div className={cn("p-4 pt-0", {"pt-4": productCard.imagePosition === 'afterDescription'})}><div className={descriptionClasses}><div className="h-3 w-full rounded-sm bg-muted-foreground/50"/><div className="h-3 w-5/6 rounded-sm bg-muted-foreground/50"/></div></div>
    const PricePreview = () => <div className={cn("p-4 pt-0", {"pt-4": productCard.imagePosition === 'afterPrice'})}><div className={priceClasses} /></div>

    const renderOrder = () => {
        const components: Record<string, React.ReactNode> = {
            image: <ImagePreview key="image" />,
            name: <NamePreview key="name" />,
            description: <DescPreview key="desc" />,
            price: <PricePreview key="price" />,
        };

        const order = ['name', 'description', 'price'];
        
        switch (productCard.imagePosition) {
            case 'top': return [components.image, ...order.map(key => components[key])];
            case 'afterName': 
                order.splice(1, 0, 'image');
                return order.map(key => components[key]);
            case 'afterDescription':
                order.splice(2, 0, 'image');
                return order.map(key => components[key]);
            case 'afterPrice':
                return [...order.map(key => components[key]), components.image];
            default:
                return [components.image, ...order.map(key => components[key])];
        }
    };


    return (
        <div className={cardClasses}>
            <div className="flex-1 flex flex-col">
                {renderOrder()}
            </div>
            <div className="p-4 pt-0">
                <Button className="w-full" variant={productCard.buttonStyle}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}
