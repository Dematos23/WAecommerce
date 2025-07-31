
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { readConfig } from "@/actions/aiActions";
import { getSession } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For dashboard, we might want to use a simplified or different config
  // For now, we use the global one.
  const [config, session] = await Promise.all([
      readConfig(),
      getSession()
    ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* The regular header might be replaced with a specific DashboardHeader later */}
      <Header config={config} session={session} />
      <main className="flex-1 bg-secondary/20">{children}</main>
      {/* The regular footer might be removed or replaced for the dashboard view */}
      <Footer config={config} />
    </div>
  );
}
