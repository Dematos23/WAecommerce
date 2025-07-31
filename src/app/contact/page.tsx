import { readConfig } from "@/actions/aiActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default async function ContactPage() {
  const config = await readConfig();

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Teléfono",
      value: config.contacto.telefono,
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Correo Electrónico",
      value: config.contacto.correo,
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Dirección",
      value: config.contacto.direccion,
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Horario de Atención",
      value: config.contacto.horarioAtencion,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          {config.titulos.contacto}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {config.textos.infoContacto}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactInfo.map((item, index) => (
          <Card key={index} className="text-center p-6">
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
