
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { initializeConfig } from "@/actions/siteActions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

function InitializeConfigForm() {
    const [pending, setPending] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);
        try {
            await initializeConfig();
            toast({
                title: "¡Configuración Inicializada!",
                description: "Los datos de config.json se han guardado en Firestore.",
            });
        } catch (error) {
             toast({
                title: "Error",
                description: "No se pudo inicializar la configuración.",
                variant: "destructive",
            });
            console.error(error);
        }
        setPending(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Button type="submit" disabled={pending}>
                {pending ? 'Initializing...' : 'Initialize Configuration from JSON'}
            </Button>
        </form>
    );
}


export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Site Configuration</h1>
            <p className="text-muted-foreground mb-8">Manage the global settings for your public-facing website. Changes made here will be reflected across your entire site.</p>
            
             <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Initialize Firestore Data</CardTitle>
                    <CardDescription>
                        Click this button once to migrate your settings from the local `config.json` file into your Firestore database. After this is done, this button can be removed.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <InitializeConfigForm />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Configuration Management</CardTitle>
                    <CardDescription>
                        The form to edit site settings will be implemented here. This will allow you to update content like homepage text, footer links, and theme colors directly from this dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Under construction...</p>
                </CardContent>
            </Card>
        </div>
    );
}
