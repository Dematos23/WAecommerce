
"use client";

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


export function ProductForm({ product }: { product?: Product }) {
  const action = product ? updateProduct : addProduct;

  return (
    <form action={action}>
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
                <Input
                  id="categoria"
                  name="categoria"
                  placeholder="Ej: Ropa"
                  defaultValue={product?.categoria}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imagenes">Imágenes del Producto</Label>
               {product?.imagenes && product.imagenes.length > 0 && (
                <div className="my-4">
                  <p className="text-sm text-muted-foreground mb-2">Imágenes Actuales:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.imagenes.map((img, index) => (
                      <Image key={index} src={img} alt={`${product.nombre} - imagen ${index+1}`} width={100} height={100} className="rounded-md object-cover" />
                    ))}
                  </div>
                </div>
              )}
              <Input
                id="imagenes"
                name="imagenes"
                type="file"
                accept="image/*"
                multiple
              />
               <p className="text-sm text-muted-foreground">
                {product ? "Sube una o más imágenes para añadir al producto." : "Sube una o más imágenes para el producto."}
              </p>
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
