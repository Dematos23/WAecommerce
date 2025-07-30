"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { generateDescriptionAction } from "@/actions/aiActions";
import { Loader2, Plus, Trash2, Sparkles } from "lucide-react";

const attributeSchema = z.object({
  key: z.string().min(1, "Clave requerida"),
  value: z.string().min(1, "Valor requerido"),
});

const generateDescriptionSchema = z.object({
  name: z.string().min(2, "El nombre del producto es requerido"),
  attributes: z.array(attributeSchema).optional(),
});

type GenerateDescriptionFormValues = z.infer<typeof generateDescriptionSchema>;

export function GenerateDescriptionForm() {
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<GenerateDescriptionFormValues>({
    resolver: zodResolver(generateDescriptionSchema),
    defaultValues: {
      name: "",
      attributes: [{ key: "", value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const handleSubmit = async (values: GenerateDescriptionFormValues) => {
    setIsLoading(true);
    setGeneratedDescription("");

    const attributesObject = values.attributes?.reduce((acc, { key, value }) => {
        if(key && value) {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, string>);

    try {
        const result = await generateDescriptionAction({
            name: values.name,
            attributes: attributesObject,
        });
        setGeneratedDescription(result.description);
    } catch (error) {
        console.error(error);
        setGeneratedDescription("Ocurrió un error al generar la descripción. Por favor, intenta de nuevo.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Producto</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Camisa de Algodón" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <div>
                    <FormLabel>Atributos (Opcional)</FormLabel>
                    <div className="space-y-4 mt-2">
                        {fields.map((field, index) => (
                           <div key={field.id} className="flex gap-4 items-center">
                               <FormField
                                   control={form.control}
                                   name={`attributes.${index}.key`}
                                   render={({ field }) => (
                                       <FormItem className="flex-1">
                                           <FormControl>
                                               <Input placeholder="Atributo (ej: Color)" {...field} />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                               />
                               <FormField
                                   control={form.control}
                                   name={`attributes.${index}.value`}
                                   render={({ field }) => (
                                       <FormItem className="flex-1">
                                           <FormControl>
                                               <Input placeholder="Valor (ej: Azul)" {...field} />
                                           </FormControl>
                                            <FormMessage/>
                                       </FormItem>
                                   )}
                               />
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                           </div>
                        ))}
                    </div>
                    <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({key: "", value: ""})}>
                        <Plus className="mr-2 h-4 w-4" /> Añadir Atributo
                    </Button>
                </div>
                
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generando...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generar Descripción
                        </>
                    )}
                </Button>
            </form>
        </Form>

        {generatedDescription && (
            <Card className="mt-8">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Descripción Generada
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{generatedDescription}</p>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
