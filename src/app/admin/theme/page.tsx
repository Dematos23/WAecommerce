
import { readConfig } from "@/actions/aiActions";
import { ThemeForm } from "./theme-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function AdminThemePage() {
    const config = await readConfig();

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Personalizar la Apariencia del Tema</CardTitle>
                    <CardDescription>
                        Ajusta los colores de tu sitio web para los modos claro y oscuro.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ThemeForm config={config} />
                </CardContent>
            </Card>
        </div>
    )
}
