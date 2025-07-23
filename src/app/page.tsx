
"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Activity, ClipboardList, Image, ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import NextImage from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const features = [
  {
    name: "Manajemen Kegiatan",
    description: "Rencanakan, kelola, dan pantau seluruh program UKM Esensial dan Pengembangan dengan efisien.",
    icon: <Activity className="size-8 text-primary" />,
    href: "/kegiatan-ukm",
  },
  {
    name: "Sistem Pelaporan",
    description: "Hasilkan laporan yang akurat dan terstruktur untuk dinas kesehatan dan pemangku kepentingan.",
    icon: <ClipboardList className="size-8 text-primary" />,
    href: "/laporan",
  },
  {
    name: "Galeri Aksi Nyata",
    description: "Visualisasikan berbagai program dan dampak positif yang telah kita ciptakan bersama di masyarakat.",
    icon: <Image className="size-8 text-primary" />,
    href: "/galeri",
  },
  {
    name: "Artikel & Wawasan",
    description: "Publikasikan artikel, berita, dan wawasan terkini untuk mengedukasi masyarakat luas.",
    icon: <Newspaper className="size-8 text-primary" />,
    href: "/artikel",
  }
];

const articles = [
  {
    title: "5 Kebiasaan Sederhana untuk Jantung yang Lebih Sehat",
    category: "Gaya Hidup Sehat",
    excerpt: "Pelajari lima kebiasaan mudah yang dapat Anda terapkan setiap hari untuk meningkatkan kesehatan jantung secara signifikan.",
    image: "https://placehold.co/600x400.png",
    hint: "healthy heart",
    href: "/artikel/jantung-sehat",
  },
  {
    title: "Pentingnya Imunisasi Lengkap pada Anak Usia Dini",
    category: "Kesehatan Anak",
    excerpt: "Memahami mengapa imunisasi lengkap sangat krusial untuk melindungi anak Anda dari berbagai penyakit berbahaya.",
    image: "https://placehold.co/600x400.png",
    hint: "child vaccination",
    href: "/artikel/imunisasi-anak",
  },
  {
    title: "Mengelola Stres di Tempat Kerja: Tips dan Trik",
    category: "Kesehatan Mental",
    excerpt: "Stres kerja tidak bisa dihindari, tetapi bisa dikelola. Temukan cara efektif untuk menjaga kesehatan mental Anda di lingkungan kerja.",
    image: "https://placehold.co/600x400.png",
    hint: "mental health work",
    href: "/artikel/mengelola-stres",
  },
];

const galleryImages = [
  { src: "https://placehold.co/600x400.png", alt: "Kegiatan 1", hint: "health activity" },
  { src: "https://placehold.co/600x400.png", alt: "Kegiatan 2", hint: "medical team" },
  { src: "https://placehold.co/600x400.png", alt: "Kegiatan 3", hint: "community health" },
  { src: "https://placehold.co/600x400.png", alt: "Kegiatan 4", hint: "health checkup" },
  { src: "https://placehold.co/600x400.png", alt: "Kegiatan 5", hint: "nutrition advice" },
  { src: "https://placehold.co/600x400.png", alt: "Kegiatan 6", hint: "vaccination drive" },
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
        <section className="w-full py-16 sm:py-20 md:py-28">
          <div className="container">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Memajukan Kesehatan Masyarakat, Bersama UKM PONJA
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Setiap kegiatan untuk memelihara dan meningkatkan kesehatan serta mencegah dan menanggulangi timbulnya masalah kesehatan dengan sasaran keluarga, kelompok, dan masyarakat.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/dasbor">
                    Mulai Berkontribusi
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full bg-gradient-to-b from-background to-secondary/40 py-16 dark:bg-gradient-to-b dark:from-background dark:to-slate-900/40 sm:py-20 md:py-24">
          <div className="container">
            <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Pilar Utama UKM PONJA</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Alat bantu esensial yang dirancang untuk mendukung setiap aspek kegiatan kesehatan masyarakat.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl justify-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Link href={feature.href} key={index} className="group">
                  <Card className="relative h-full overflow-hidden rounded-lg border bg-background p-2 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                        {feature.icon}
                        <div className="space-y-2">
                          <h3 className="font-bold">{feature.name}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <section id="articles" className="w-full py-16 sm:py-20 md:py-24">
          <div className="container">
            <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center space-y-4 text-center">
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Artikel & Wawasan Terkini</h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Dapatkan informasi, tips, dan wawasan terbaru seputar kesehatan untuk Anda, keluarga, dan masyarakat.
                </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <Link key={index} href={article.href} className="group">
                  <Card className="flex h-full flex-col overflow-hidden transition-all group-hover:-translate-y-1 group-hover:shadow-xl">
                    <CardContent className="p-0">
                      <NextImage
                        src={article.image}
                        alt={article.title}
                        data-ai-hint={article.hint}
                        width={600}
                        height={400}
                        className="h-48 w-full object-cover"
                      />
                    </CardContent>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit">{article.category}</Badge>
                      <CardTitle className="mt-2 text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="text-sm font-medium text-primary group-hover:underline">
                        Baca Selengkapnya <ArrowRight className="ml-1 inline-block size-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
             <div className="mt-12 text-center">
                <Button asChild variant="outline">
                  <Link href="/artikel">
                    Lihat Semua Artikel <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
          </div>
        </section>

        <section id="gallery-slider" className="w-full bg-gradient-to-b from-background to-secondary/40 py-16 dark:bg-gradient-to-b dark:from-background dark:to-slate-900/40 sm:py-20 md:py-24">
            <div className="container">
              <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center space-y-4 text-center">
                  <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Galeri Aksi Nyata</h2>
                  <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                      Visualisasi dari berbagai program dan dampak positif yang telah kita ciptakan bersama di tengah masyarakat.
                  </p>
              </div>
              <Carousel
                  opts={{
                      align: "start",
                      loop: true,
                  }}
                  className="mx-auto w-full max-w-6xl"
              >
                  <CarouselContent>
                      {galleryImages.map((image, index) => (
                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-1">
                                  <Card className="overflow-hidden">
                                      <CardContent className="flex aspect-video items-center justify-center p-0">
                                        <NextImage
                                          src={image.src}
                                          alt={image.alt}
                                          data-ai-hint={image.hint}
                                          width={600}
                                          height={400}
                                          className="h-full w-full object-cover transition-transform hover:scale-105"
                                        />
                                      </CardContent>
                                  </Card>
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
              </Carousel>
              <div className="mt-12 text-center">
                <Button asChild variant="outline">
                  <Link href="/galeri">
                    Jelajahi Semua Galeri <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
        </section>
        
        <section className="w-full py-16 text-center sm:py-20 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
              Siap Menjadi Garda Terdepan?
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Mari bersama-sama wujudkan masyarakat yang lebih sehat. Masuk ke dasbor untuk memulai aksi Anda.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                  <Link href="/dasbor">
                    Akses Dasbor Manajemen
                  </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <footer className="w-full border-t py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-center gap-2 text-center md:h-24">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} UKM PONJA. All Rights Reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Dibuat oleh <span className="font-medium">Rani Kirana</span>.
            </p>
          </div>
      </footer>
    </div>
  );
}

    