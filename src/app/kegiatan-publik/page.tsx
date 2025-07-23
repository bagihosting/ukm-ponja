
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function KegiatanPublikPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-16">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Kegiatan UKM PONJA</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Temukan berbagai program dan inisiatif yang kami jalankan untuk meningkatkan kesehatan masyarakat.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {programs.map((program) => (
                <Card key={program.title} className="group flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <div className="rounded-lg bg-primary/10 p-4">
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
        <div className="mt-12 flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 py-20 shadow-sm">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    Jadwal & Aktivitas Mendatang
                </h2>
                <p className="text-muted-foreground">
                    Kalender kegiatan dan daftar aktivitas akan ditampilkan di sini.
                </p>
            </div>
        </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
