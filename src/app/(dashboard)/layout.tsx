
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { readConfig } from "@/actions/aiActions";
import { getSession } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, session] = await Promise.all([
      readConfig(),
      getSession()
    ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header config={config} session={session} />
      <main className="flex-1 bg-secondary/20">{children}</main>
      <Footer config={config} />
    </div>
  );
}
