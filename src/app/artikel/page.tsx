
import DashboardLayout from "@/components/dashboard-layout";

export default function ArtikelPage() {
  return (
    <DashboardLayout pageTitle="Artikel">
        <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 shadow-sm">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    Halaman Artikel
                </h2>
                <p className="text-muted-foreground">
                    Konten untuk artikel akan ditampilkan di sini.
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
