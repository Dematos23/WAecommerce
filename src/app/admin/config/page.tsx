
import { readConfig } from "@/actions/aiActions";
import { ConfigForm } from "./config-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function AdminConfigPage() {
    const config = await readConfig();

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Editar Configuración del Sitio</CardTitle>
                    <CardDescription>
                        Realiza cambios en la apariencia, textos, e información de contacto que se muestran en tu sitio web.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ConfigForm config={config} />
                </CardContent>
            </Card>
        </div>
    )
}
