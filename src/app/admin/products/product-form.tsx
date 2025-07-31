
"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addProduct, updateProduct } from "@/actions/aiActions";
import type { Product } from "@/types";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { X, UploadCloud } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export function ProductForm({ product, categories = [] }: { product?: Product, categories?: string[] }) {
  const action = product ? updateProduct : addProduct;
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [currentImages, setCurrentImages] = useState<string[]>(product?.imagenes || []);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState(product?.categoria || '');
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const previewsArray = filesArray.map(file => URL.createObjectURL(file));
      setNewImagePreviews(prev => [...prev, ...previewsArray]);
    }
  };
  
  const handleRemoveNewImage = (index: number) => {
    setNewImagePreviews(previews => previews.filter((_, i) => i !== index));
    if (fileInputRef.current?.files) {
        const dataTransfer = new DataTransfer();
        const files = Array.from(fileInputRef.current.files);
        files.splice(index, 1);
        files.forEach(file => dataTransfer.items.add(file));
        fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleRemoveExistingImage = (imageUrl: string) => {
    setImagesToDelete(prev => [...prev, imageUrl]);
    setCurrentImages(prev => prev.filter(img => img !== imageUrl));
  };

  const handleCategoryChange = (value: string) => {
    if (value === 'create-new') {
        setIsCreatingNewCategory(true);
        setSelectedCategory('');
    } else {
        setIsCreatingNewCategory(false);
        setSelectedCategory(value);
    }
  };


  return (
    <form action={action}>
      <input type="hidden" name="imagesToDelete" value={imagesToDelete.join(',')} />
      {product && <input type="hidden" name="id" value={product.id} />}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Producto</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Ej: Camisa de Algodón"
                defaultValue={product?.nombre}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Ej: Camisa de alta calidad, suave al tacto..."
                defaultValue={product?.descripcion || ""}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="precio">Precio</Label>
                <Input
                  id="precio"
                  name="precio"
                  type="number"
                  placeholder="Ej: 25.99"
                  step="0.01"
                  defaultValue={product?.precio}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                 <Select
                    name="categoria"
                    onValueChange={handleCategoryChange}
                    defaultValue={selectedCategory}
                    required={!isCreatingNewCategory}
                    disabled={isCreatingNewCategory}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione una categoría..." />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                        <SelectItem value="create-new">
                            Crear nueva categoría...
                        </SelectItem>
                    </SelectContent>
                </Select>
                 {isCreatingNewCategory && (
                    <div className="flex gap-2 items-center mt-2">
                        <Input
                            name="new_category"
                            placeholder="Nombre de la nueva categoría"
                            required
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsCreatingNewCategory(false)}
                        >
                            Cancelar
                        </Button>
                    </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Imágenes del Producto</Label>
               {(currentImages.length > 0 || newImagePreviews.length > 0) && (
                 <div className="my-4 p-4 border rounded-md grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {/* Existing Images */}
                    {currentImages.map((img, index) => (
                       <div key={img} className="relative group aspect-square">
                          <Image src={img} alt={`${product?.nombre} - imagen ${index+1}`} fill className="rounded-md object-cover" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveExistingImage(img)}
                          >
                            <X className="h-4 w-4" /><span className="sr-only">Eliminar imagen guardada</span>
                          </Button>
                      </div>
                    ))}
                    {/* New Image Previews */}
                    {newImagePreviews.map((previewUrl, index) => (
                       <div key={previewUrl} className="relative group aspect-square">
                          <Image src={previewUrl} alt={`Nueva imagen ${index+1}`} fill className="rounded-md object-cover" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveNewImage(index)}
                          >
                            <X className="h-4 w-4" /><span className="sr-only">Eliminar nueva imagen</span>
                          </Button>
                      </div>
                    ))}
                  </div>
               )}
              
              <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="my-2 text-sm text-muted-foreground">
                  Arrastra y suelta imágenes o haz clic para seleccionarlas.
                </p>
                <Input
                  id="imagenes"
                  name="imagenes"
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
             <div className="flex items-center space-x-2">
                <Checkbox 
                  id="destacado" 
                  name="destacado" 
                  defaultChecked={product?.destacado}
                />
                <Label
                  htmlFor="destacado"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Marcar como producto destacado
                </Label>
              </div>
             <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                    <Link href="/admin/products">Cancelar</Link>
                </Button>
                <SubmitButton />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Guardando..." : "Guardar Producto"}
    </Button>
  );
}
