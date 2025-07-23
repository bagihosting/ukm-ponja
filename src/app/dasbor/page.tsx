
import DashboardLayout from "@/components/dashboard-layout";

export default function DashboardPage() {
  return (
    <DashboardLayout pageTitle="Dasbor">
      <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Selamat Datang di Dasbor UKM PONJA
          </h2>
          <p className="text-muted-foreground">
            Pilih menu di samping untuk memulai.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
