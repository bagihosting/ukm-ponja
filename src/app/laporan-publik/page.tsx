
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, BarChart2, BookText, FolderKanban, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const reports = [
  {
    title: "Laporan ke Dinas",
    description: "Arsip laporan resmi yang dikirimkan ke dinas kesehatan.",
    icon: <BookCopy className="size-8 text-primary" />,
    actionText: "Lihat Hasil",
    href: "/laporan-publik/dinas",
  },
  {
    title: "Laporan Grafik",
    description: "Visualisasi data kegiatan dan capaian program dalam bentuk grafik.",
    icon: <BarChart2 className="size-8 text-primary" />,
    actionText: "Lihat Grafik",
    href: "/laporan-publik/grafik",
  },
  {
    title: "Log Book UKM",
    description: "Catatan harian digital untuk semua kegiatan program UKM.",
    icon: <BookText className="size-8 text-primary" />,
    actionText: "Lihat Log Book",
    href: "/laporan-publik/logbook",
  },
  {
    title: "Data Pendukung",
    description: "Akses dokumen, materi, dan data pendukung kegiatan UKM.",
    icon: <FolderKanban className="size-8 text-primary" />,
    actionText: "Lihat Data",
    href: "/laporan-publik/gdrive",
  },
];


export default function LaporanPublikPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-16">
            <div className="mb-12 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Laporan & Transparansi</h1>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Kami berkomitmen pada transparansi. Temukan laporan kegiatan, data, dan pencapaian program kami di sini.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {reports.map((report) => (
                    <Card key={report.title} className="flex flex-col justify-between transition-all hover:shadow-lg">
                        <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                            <div className="rounded-lg bg-primary/10 p-4">
                                {report.icon}
                            </div>
                            <div>
                                <CardTitle>{report.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{report.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" className="w-full">
                                <Link href={report.href}>
                                    {report.actionText}
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-12 flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 py-20 shadow-sm">
                <div className="text-center">
                    <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-2xl font-bold tracking-tight">
                        Sorotan Laporan Utama
                    </h2>
                    <p className="text-muted-foreground">
                        Ringkasan dan infografis pencapaian kunci akan ditampilkan di sini.
                    </p>
                </div>
            </div>

        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

