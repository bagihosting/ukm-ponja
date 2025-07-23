
import DashboardLayout from "@/components/dashboard-layout";

export default function GaleriPage() {
  return (
    <DashboardLayout pageTitle="Galeri">
        <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 shadow-sm">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    Halaman Galeri
                </h2>
                <p className="text-muted-foreground">
                    Konten untuk galeri akan ditampilkan di sini.
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
