
import { readConfig } from "@/actions/aiActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteConfig } from "@/types";

export default async function ContactPage() {
    const config: SiteConfig = await readConfig();

    return (
        <div className="bg-background text-foreground">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-5xl font-semibold text-primary">Contáctanos</h1>
                    <p className="mt-4 text-xl text-muted-foreground">
                        Estamos aquí para ayudarte. Rellena el formulario o utiliza nuestros datos de contacto.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl">Envíanos un Mensaje</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action="#" method="POST" className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input id="name" name="name" type="text" placeholder="Tu nombre completo" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input id="email" name="email" type="email" placeholder="tu@ejemplo.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea id="message" name="message" rows={5} placeholder="¿En qué podemos ayudarte?" />
                                </div>
                                <Button type="submit" size="lg" variant="accent" className="w-full text-lg">
                                    Enviar Mensaje
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-3xl">Información de Contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 text-lg">
                                <div className="flex items-start gap-4">
                                    <Phone className="h-7 w-7 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">Teléfono</h3>
                                        <a href={`tel:${config.contacto.telefono}`} className="text-muted-foreground hover:text-primary">{config.contacto.telefono}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-7 w-7 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">Correo Electrónico</h3>
                                        <a href={`mailto:${config.contacto.correo}`} className="text-muted-foreground hover:text-primary">{config.contacto.correo}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-7 w-7 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">Dirección</h3>
                                        <p className="text-muted-foreground">{config.contacto.direccion}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
