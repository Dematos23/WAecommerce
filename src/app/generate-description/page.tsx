import { config } from "@/lib/config";
import { GenerateDescriptionForm } from "./GenerateDescriptionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GenerateDescriptionPage() {
    return (
        <div className="container mx-auto max-w-2xl py-12 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold tracking-tight font-headline">{config.titulos.generateDescription}</CardTitle>
                    <CardDescription>{config.textos.generateDescriptionInstrucciones}</CardDescription>
                </CardHeader>
                <CardContent>
                    <GenerateDescriptionForm />
                </CardContent>
            </Card>
        </div>
    );
}
