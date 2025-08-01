
import { readConfig } from "@/actions/siteActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteConfig } from "@/types";

export default async function ContactPage() {
    const config: SiteConfig = await readConfig();
    const { contactPage, footer } = config;

    return (
        <div className="bg-background text-foreground">
            <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="h1 text-primary">{contactPage.title}</h1>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto p">
                        {contactPage.description}
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
                    {/* Contact Form */}
                    <Card className="border-none shadow-none bg-transparent">
                        <CardHeader>
                            <CardTitle className="h3">{contactPage.formTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action="#" method="POST" className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-base">Nombre</Label>
                                    <Input id="name" name="name" type="text" placeholder="Tu nombre completo" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-base">Correo Electrónico</Label>
                                    <Input id="email" name="email" type="email" placeholder="tu@ejemplo.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-base">Mensaje</Label>
                                    <Textarea id="message" name="message" rows={5} placeholder="¿En qué podemos ayudarte?" />
                                </div>
                                <Button type="submit" size="lg" variant="accent" className="w-full font-bold text-base">
                                    Enviar Mensaje
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-none bg-transparent">
                             <CardHeader>
                                <CardTitle className="h3">Información de Contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Phone className="h-7 w-7 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-lg">Teléfono</h3>
                                        <a href={`tel:${footer.contacto.telefono}`} className="text-base text-muted-foreground hover:text-primary">{footer.contacto.telefono}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-7 w-7 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-lg">Correo Electrónico</h3>
                                        <a href={`mailto:${footer.contacto.correo}`} className="text-base text-muted-foreground hover:text-primary">{footer.contacto.correo}</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-7 w-7 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-lg">Dirección</h3>
                                        <p className="text-base text-muted-foreground">{footer.contacto.direccion}</p>
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
