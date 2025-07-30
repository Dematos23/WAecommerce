"use client";

import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { config } from "@/lib/config";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  telephone: z.string().min(7, "El teléfono es requerido"),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { cartItems, subtotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      telephone: "",
      address: "",
      notes: "",
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };

  const handleSubmit = (values: CheckoutFormValues) => {
    const whatsAppNumber = config.configuracionGeneral.numeroWhatsApp;
    
    let message = `*¡Nuevo Pedido de TiendaExpress!* 🎉\n\n`;
    message += `*Cliente:* ${values.name}\n`;
    message += `*Teléfono:* ${values.telephone}\n`;
    if (values.address) {
      message += `*Dirección de Entrega:* ${values.address}\n`;
    }
    if (values.notes) {
      message += `*Notas Adicionales:* ${values.notes}\n`;
    }
    message += `\n*Resumen del Pedido:*\n`;
    message += `-------------------------\n`;

    cartItems.forEach(item => {
        message += `▪️ ${item.nombre} (x${item.quantity}) - ${formatCurrency(item.precio * item.quantity)}\n`;
    });

    message += `-------------------------\n`;
    message += `*SUBTOTAL: ${formatCurrency(subtotal)}*\n\n`;
    message += `¡Gracias por tu compra! 😊`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

    clearCart();
    toast({
      title: "¡Pedido en camino!",
      description: "Serás redirigido a WhatsApp para confirmar tu pedido.",
    });
    
    // Using window.open to redirect
    window.open(whatsappUrl, '_blank');
    
    router.push("/");
  };
  
  if (cartItems.length === 0) {
    return (
        <div className="text-center">
            <p>Tu carrito está vacío. Añade productos antes de finalizar la compra.</p>
            <Button asChild className="mt-4">
                <a href="/products">Volver al catálogo</a>
            </Button>
        </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-semibold mb-4">Tus Datos</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono (WhatsApp)</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu número de teléfono" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección de entrega (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu dirección" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas adicionales (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Instrucciones especiales, color, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type="submit" size="lg" className="w-full">
                Enviar pedido por WhatsApp
            </Button>
          </form>
        </Form>
      </div>

      <div className="bg-secondary/50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Resumen de tu pedido</h3>
        <div className="space-y-4">
            {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Image src={item.imagen} alt={item.nombre} width={48} height={48} className="rounded-md" />
                        <div>
                            <p className="font-medium">{item.nombre}</p>
                            <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-medium">{formatCurrency(item.precio * item.quantity)}</p>
                </div>
            ))}
        </div>
        <Separator className="my-6" />
        <div className="flex justify-between text-lg font-bold">
            <p>Subtotal</p>
            <p>{formatCurrency(subtotal)}</p>
        </div>
      </div>
    </div>
  );
}
