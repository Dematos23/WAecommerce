
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is now simplified because the root layout handles user state
  // and the dashboard pages have their own header.
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-secondary/20">{children}</main>
    </div>
  );
}
