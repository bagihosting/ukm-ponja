
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LayoutGrid, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    title: "UKM Esensial",
    description: "Program inti yang mencakup pelayanan kesehatan primer, promosi kesehatan, dan pencegahan penyakit untuk masyarakat.",
    icon: <LayoutGrid className="size-8 text-primary" />,
    href: "#"
  },
  {
    title: "UKM Pengembangan",
    description: "Inovasi dan pengembangan program kesehatan untuk menjawab tantangan baru dan kebutuhan spesifik di masyarakat.",
    icon: <TrendingUp className="size-8 text-primary" />,
    href: "#"
  }
];

export default function KegiatanPage() {
  return (
    <DashboardLayout pageTitle="Kegiatan UKM">
        <div className="grid gap-6 md:grid-cols-2">
            {programs.map((program) => (
                <Card key={program.title} className="group flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <div className="rounded-lg bg-primary/10 p-3">
                           {program.icon}
                        </div>
                        <div>
                            <CardTitle>{program.title}</CardTitle>
                            <CardDescription className="mt-1 leading-relaxed">{program.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <Link href={program.href} className="text-sm font-semibold text-primary group-hover:underline">
                          Lihat Detail <ArrowRight className="inline-block size-4 transition-transform group-hover:translate-x-1" />
                       </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="mt-8 flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 shadow-sm">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    Jadwal & Aktivitas
                </h2>
                <p className="text-muted-foreground">
                    Kalender kegiatan dan daftar aktivitas akan ditampilkan di sini.
                </p>
            </div>
        </div>
    </DashboardLayout>
  );
}
