
import DashboardLayout from "@/components/dashboard-layout";

export default function LaporanPage() {
  return (
    <DashboardLayout pageTitle="Laporan">
        <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 shadow-sm">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    Halaman Laporan
                </h2>
                <p className="text-muted-foreground">
                    Konten untuk laporan akan ditampilkan di sini.
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
