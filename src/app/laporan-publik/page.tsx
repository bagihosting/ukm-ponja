
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LaporanPublikPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <section className="container flex h-[calc(100vh-10rem)] items-center justify-center py-12 md:py-16">
            <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 shadow-sm h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Halaman Laporan Publik
                    </h2>
                    <p className="text-muted-foreground">
                        Hasil laporan yang dapat diakses publik akan ditampilkan di sini.
                    </p>
                    <Button asChild variant="outline" className="mt-4">
                      <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Halaman Utama
                      </Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
