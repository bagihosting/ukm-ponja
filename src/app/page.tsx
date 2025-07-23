
"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Home, LogOut, Settings, LifeBuoy, Activity, ClipboardList, Newspaper, Image, AppWindow, ArrowRight } from "lucide-react";
import Link from "next/link";
import NextImage from 'next/image';

const features = [
  {
    name: "Kegiatan UKM",
    description: "Lihat dan kelola semua program kerja UKM Esensial dan Pengembangan.",
    icon: <Activity className="size-8 text-primary" />,
    href: "/kegiatan-ukm",
  },
  {
    name: "Laporan",
    description: "Akses laporan ke dinas, grafik, log book, dan GDrive data UKM dengan mudah.",
    icon: <ClipboardList className="size-8 text-primary" />,
    href: "/laporan",
  },
  {
    name: "Artikel",
    description: "Buat dan publikasikan artikel kesehatan untuk edukasi masyarakat.",
    icon: <Newspaper className="size-8 text-primary" />,
    href: "/artikel",
  },
  {
    name: "Galeri",
    description: "Simpan dan bagikan dokumentasi foto kegiatan UKM Anda.",
    icon: <Image className="size-8 text-primary" />,
    href: "/galeri",
  },
  {
    name: "Aplikasi AI",
    description: "Buat thumbnail kesehatan menarik secara otomatis dengan bantuan AI.",
    icon: <AppWindow className="size-8 text-primary" />,
    href: "/aplikasi",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="size-7 text-primary" />
              <span className="text-lg font-bold">UKM PONJA</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild>
              <Link href="/dasbor">
                Masuk Dasbor <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 text-center md:py-24 lg:py-32">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Platform Manajemen UKM Kesehatan Modern
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-6">
              Solusi terintegrasi untuk mengelola semua kegiatan, laporan, dan konten digital Unit Kegiatan Masyarakat (UKM) Anda dengan efisien.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/dasbor">
                  Mulai Sekarang
                </Link>
              </Button>
            </div>
        </section>

        <section id="features" className="container space-y-6 bg-slate-50/50 dark:bg-slate-800/20 py-12 md:py-24 lg:py-32 rounded-lg">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Fitur Unggulan</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Semua yang Anda butuhkan untuk membawa manajemen UKM ke level berikutnya.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg border bg-background p-2">
                 <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                    {feature.icon}
                    <div className="space-y-2">
                      <h3 className="font-bold">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="container py-12 md:py-24 lg:py-32 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Siap Meningkatkan Produktivitas?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-6">
              Bergabunglah sekarang dan rasakan kemudahan mengelola UKM Anda.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                  <Link href="/dasbor">
                    Masuk ke Dasbor Anda
                  </Link>
              </Button>
            </div>
        </section>

      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Dibuat oleh <span className="font-medium">Rani Kirana</span>.
            </p>
          </div>
      </footer>
    </div>
  );
}
