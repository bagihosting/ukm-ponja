
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/dasbor">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Dasbor
                  </Link>
                </Button>
            </div>
        </div>
    </DashboardLayout>
  );
}
