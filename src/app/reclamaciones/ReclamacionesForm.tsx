
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addReclamacion } from "@/actions/aiActions";
import type { SiteConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, User, ShoppingBag, FileWarning, Send } from 'lucide-react';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

const reclamacionSchema = z.object({
  fechaReclamo: z.date({ required_error: "La fecha es obligatoria." }),
  nombreCompleto: z.string().min(3, "El nombre es obligatorio."),
  domicilio: z.string().optional(),
  tipoDocumento: z.string({ required_error: "Seleccione un tipo de documento." }),
  numeroDocumento: z.string().min(5, "El número de documento es obligatorio."),
  email: z.string().email("Debe ser un correo electrónico válido."),
  telefono: z.string().optional(),
  nombreApoderado: z.string().optional(),
  
  tipoBien: z.enum(["producto", "servicio"], { required_error: "Seleccione el tipo de bien." }),
  montoReclamado: z.coerce.number().min(0, "El monto debe ser positivo.").optional().or(z.literal('')),
  descripcionBien: z.string().optional(),

  tipoReclamacion: z.enum(["reclamo", "queja"], { required_error: "Seleccione el tipo de reclamación." }),
  detalleReclamacion: z.string().min(10, "El detalle es obligatorio."),
  pedido: z.string().optional(),
  
  aceptaTerminos: z.literal(true, {
    errorMap: () => ({ message: "Debe aceptar los términos." }),
  }),
});

type ReclamacionFormValues = z.infer<typeof reclamacionSchema>;

export function ReclamacionesForm({ config }: { config: SiteConfig }) {
  const [isClient, setIsClient] = useState(false);
  const [fechaReclamo, setFechaReclamo] = useState<Date | undefined>(undefined);


  const form = useForm<ReclamacionFormValues>({
    resolver: zodResolver(reclamacionSchema),
    defaultValues: {
      fechaReclamo: undefined,
      nombreCompleto: "",
      domicilio: "",
      numeroDocumento: "",
      email: "",
      telefono: "",
      nombreApoderado: "",
      montoReclamado: "",
      descripcionBien: "",
      detalleReclamacion: "",
      pedido: "",
      aceptaTerminos: false,
    },
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    setFechaReclamo(today);
    form.setValue('fechaReclamo', today);
  }, [form]);
  
  const calendarDisabled = (date: Date) => {
    return date > new Date() || date < new Date("1900-01-01")
  }


  const onSubmit = async (data: ReclamacionFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof Date) {
            formData.append(key, value.toISOString());
        } else if (typeof value === 'number') {
            formData.append(key, value.toString());
        }
         else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });

    await addReclamacion(formData);
  };
  
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* --- Info General --- */}
            <div className="space-y-4 rounded-lg border p-4">
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="fechaReclamo"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Fecha de reclamo</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                >
                                {field.value ? (
                                    format(field.value, "PPP", { locale: es })
                                ) : (
                                    <span>Seleccione una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={isClient ? calendarDisabled : undefined}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div>
                        <Label>Hoja de reclamación</Label>
                        <Input readOnly value="N° (se genera automáticamente)" className="bg-secondary/50" />
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <Label>Razón Social</Label>
                        <Input readOnly value={config.informacionLegal.razonSocial} className="bg-secondary/50" />
                    </div>
                    <div>
                        <Label>RUC</Label>
                        <Input readOnly value={config.informacionLegal.ruc} className="bg-secondary/50" />
                    </div>
                    <div>
                        <Label>Dirección</Label>
                        <Input readOnly value={config.informacionLegal.direccionLegal} className="bg-secondary/50" />
                    </div>
                </div>
            </div>

            {/* --- Sección 1 --- */}
            <Section title="1. Identificación del consumidor" icon={<User className="h-5 w-5" />}>
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="nombreCompleto" render={({ field }) => (
                        <FormItem><FormLabel>Nombres y Apellidos</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="domicilio" render={({ field }) => (
                        <FormItem><FormLabel>Domicilio (Opcional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                 </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="tipoDocumento"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tipo de Documento</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="dni">DNI</SelectItem>
                                <SelectItem value="ce">Carnet de Extranjería</SelectItem>
                                <SelectItem value="pasaporte">Pasaporte</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="numeroDocumento" render={({ field }) => (
                        <FormItem><FormLabel>Número de Documento</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                 </div>
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="telefono" render={({ field }) => (
                        <FormItem><FormLabel>Teléfono (Opcional)</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                 </div>
                 <FormField control={form.control} name="nombreApoderado" render={({ field }) => (
                    <FormItem><FormLabel>En caso de menor de edad: Nombre del padre/madre o apoderado (Opcional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </Section>

            {/* --- Sección 2 --- */}
            <Section title="2. Identificación del bien contratado" icon={<ShoppingBag className="h-5 w-5" />}>
                 <FormField
                    control={form.control}
                    name="tipoBien"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="producto" /></FormControl>
                                <FormLabel className="font-normal">Producto</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="servicio" /></FormControl>
                                <FormLabel className="font-normal">Servicio</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="montoReclamado" render={({ field }) => (
                        <FormItem><FormLabel>Monto Reclamado (Opcional)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="descripcionBien" render={({ field }) => (
                        <FormItem><FormLabel>Descripción del Producto/Servicio (Opcional)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                 </div>
            </Section>

            {/* --- Sección 3 --- */}
            <Section title="3. Detalle de la reclamación" icon={<FileWarning className="h-5 w-5" />}>
                 <FormField
                    control={form.control}
                    name="tipoReclamacion"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Tipo de Reclamación</FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                                <FormItem className="flex items-start space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="reclamo" /></FormControl>
                                    <div>
                                        <FormLabel className="font-normal">Reclamo</FormLabel>
                                        <FormDescription>Disconformidad relacionada a los productos o servicios.</FormDescription>
                                    </div>
                                </FormItem>
                                <FormItem className="flex items-start space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="queja" /></FormControl>
                                    <div>
                                        <FormLabel className="font-normal">Queja</FormLabel>
                                        <FormDescription>Disconformidad no relacionada a los productos o servicios; o malestar o descontento respecto a la atención al público.</FormDescription>
                                    </div>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField control={form.control} name="detalleReclamacion" render={({ field }) => (
                    <FormItem><FormLabel>Detalle de su reclamo o queja</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="pedido" render={({ field }) => (
                    <FormItem><FormLabel>Pedido (Opcional)</FormLabel><FormControl><Textarea rows={2} {...field} placeholder="Ej: Devolución del dinero, cambio de producto, etc." /></FormControl><FormMessage /></FormItem>
                )} />
            </Section>
            
            {/* --- Sección 4 --- */}
            <Section title="4. Acciones adoptadas por el vendedor" icon={<User className="h-5 w-5" />}>
                 <div>
                    <Label>Observaciones y acciones adoptadas por el proveedor</Label>
                    <Textarea readOnly value="Para uso exclusivo del vendedor." className="bg-secondary/50 mt-2" />
                </div>
            </Section>

            {/* --- Envío --- */}
            <FormField
                control={form.control}
                name="aceptaTerminos"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>Aceptación de Términos</FormLabel>
                        <FormDescription>
                            Acepto los Términos del artículo 150° de la Ley N° 29571 del Código de Protección y Defensa del Consumidor.
                        </FormDescription>
                        <FormMessage />
                    </div>
                    </FormItem>
                )}
                />
            
            <div className="flex justify-end">
                <SubmitButton />
            </div>

        </form>
    </Form>
  )
}


function Section({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <div className="space-y-4 rounded-lg border p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
                {icon} {title}
            </h3>
            <div className="space-y-4 ml-7">
                {children}
            </div>
        </div>
    )
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? "Enviando..." : "Enviar Reclamo"}
      <Send className="ml-2 h-4 w-4" />
    </Button>
  );
}
