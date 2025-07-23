
"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, BookCopy, BookText, FolderKanban, ArrowRight } from "lucide-react";
import Link from "next/link";

const reports = [
  {
    title: "Laporan ke Dinas",
    description: "Kelola dan arsipkan laporan resmi yang dikirimkan ke dinas kesehatan.",
    icon: <BookCopy className="size-8 text-primary" />,
    actionText: "Kelola Laporan",
    href: "/laporan/dinas",
  },
  {
    title: "Laporan Grafik",
    description: "Visualisasikan data kegiatan dan capaian program dalam bentuk grafik interaktif.",
    icon: <BarChart2 className="size-8 text-primary" />,
    actionText: "Lihat Grafik",
    href: "#", // Placeholder
  },
  {
    title: "Log Book UKM",
    description: "Catatan harian digital untuk semua kegiatan program UKM Esensial dan Pengembangan.",
    icon: <BookText className="size-8 text-primary" />,
    actionText: "Buka Log Book",
    href: "#", // Placeholder
  },
  {
    title: "Gdrive Data-data UKM",
    description: "Akses folder pusat berisi semua dokumen, materi, dan data pendukung kegiatan.",
    icon: <FolderKanban className="size-8 text-primary" />,
    actionText: "Buka Gdrive",
    href: "#", // Placeholder
  },
];

export default function LaporanPage() {
  return (
    <DashboardLayout pageTitle="Manajemen Laporan">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

        <div className="mt-8 flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 py-20 shadow-sm">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    Pusat Bantuan Laporan
                </h2>
                <p className="text-muted-foreground">
                    Gunakan menu di atas untuk mengelola setiap jenis laporan.
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
