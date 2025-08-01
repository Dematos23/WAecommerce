
import { readConfig } from "@/actions/siteActions";
import { ReclamacionesForm } from "./ReclamacionesForm";

export default async function ReclamacionesPage() {
  const config = await readConfig();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-2">Libro de Reclamaciones</h1>
        <p className="text-muted-foreground text-lg">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor – Ley N° 29571
        </p>
      </div>
      <ReclamacionesForm config={config} />
    </div>
  )
}
