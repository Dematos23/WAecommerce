"use client";

import { useFormStatus } from "react-dom";
import type { SiteConfig } from "@/types";
import { updateConfig } from "@/actions/aiActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Save } from "lucide-react";

export function ConfigForm({ config }: { config: SiteConfig }) {

    return (
        <form action={updateConfig} className="space-y-8">
            <Accordion type="multiple" defaultValue={['general', 'titulos', 'textos', 'contacto']} className="w-full">
                {/* General Settings */}
                <AccordionItem value="general">
                    <AccordionTrigger className="text-xl font-semibold">Configuración General</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="generalEslogan">Eslogan</Label>
                            <Input id="generalEslogan" name="generalEslogan" defaultValue={config.configuracionGeneral.eslogan} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="generalNumeroWhatsApp">Número de WhatsApp</Label>
                            <Input id="generalNumeroWhatsApp" name="generalNumeroWhatsApp" defaultValue={config.configuracionGeneral.numeroWhatsApp} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                {/* Titles */}
                <AccordionItem value="titulos">
                    <AccordionTrigger className="text-xl font-semibold">Títulos</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="tituloHomepageHero">Título Hero (Inicio)</Label>
                                <Input id="tituloHomepageHero" name="tituloHomepageHero" defaultValue={config.titulos.homepageHero} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tituloCatalogo">Título Catálogo</Label>
                                <Input id="tituloCatalogo" name="tituloCatalogo" defaultValue={config.titulos.catalogo} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="tituloCarrito">Título Carrito</Label>
                                <Input id="tituloCarrito" name="tituloCarrito" defaultValue={config.titulos.carrito} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tituloCheckout">Título Checkout</Label>
                                <Input id="tituloCheckout" name="tituloCheckout" defaultValue={config.titulos.checkout} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tituloSobreNosotros">Título Sobre Nosotros</Label>
                                <Input id="tituloSobreNosotros" name="tituloSobreNosotros" defaultValue={config.titulos.sobreNosotros} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tituloContacto">Título Contacto</Label>
                                <Input id="tituloContacto" name="tituloContacto" defaultValue={config.titulos.contacto} />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Texts */}
                <AccordionItem value="textos">
                    <AccordionTrigger className="text-xl font-semibold">Textos</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="textoDescripcionHomepage">Descripción (Homepage)</Label>
                            <Textarea id="textoDescripcionHomepage" name="textoDescripcionHomepage" defaultValue={config.textos.descripcionHomepage} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="textoMensajeBienvenida">Mensaje de Bienvenida</Label>
                            <Textarea id="textoMensajeBienvenida" name="textoMensajeBienvenida" defaultValue={config.textos.mensajeBienvenida} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="textoDescripcionSobreNosotros">Descripción (Sobre Nosotros)</Label>
                            <Textarea id="textoDescripcionSobreNosotros" name="textoDescripcionSobreNosotros" defaultValue={config.textos.descripcionSobreNosotros} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="textoInfoContacto">Info (Contacto)</Label>
                            <Textarea id="textoInfoContacto" name="textoInfoContacto" defaultValue={config.textos.infoContacto} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="textoInstruccionesCheckout">Instrucciones (Checkout)</Label>
                            <Textarea id="textoInstruccionesCheckout" name="textoInstruccionesCheckout" defaultValue={config.textos.instruccionesCheckout} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="textoPieDePagina">Pie de Página</Label>
                            <Input id="textoPieDePagina" name="textoPieDePagina" defaultValue={config.textos.pieDePagina} />
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                 {/* Contact */}
                <AccordionItem value="contacto">
                    <AccordionTrigger className="text-xl font-semibold">Información de Contacto</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                       <div className="grid md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="contactoTelefono">Teléfono</Label>
                                <Input id="contactoTelefono" name="contactoTelefono" defaultValue={config.contacto.telefono} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contactoCorreo">Correo Electrónico</Label>
                                <Input id="contactoCorreo" name="contactoCorreo" type="email" defaultValue={config.contacto.correo} />
                            </div>
                       </div>
                       <div className="space-y-2">
                            <Label htmlFor="contactoDireccion">Dirección</Label>
                            <Input id="contactoDireccion" name="contactoDireccion" defaultValue={config.contacto.direccion} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactoHorarioAtencion">Horario de Atención</Label>
                            <Input id="contactoHorarioAtencion" name="contactoHorarioAtencion" defaultValue={config.contacto.horarioAtencion} />
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

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} size="lg">
            <Save className="mr-2 h-4 w-4" />
            {pending ? "Guardando..." : "Guardar Cambios"}
        </Button>
    )
}
