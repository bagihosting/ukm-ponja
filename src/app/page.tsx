
"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import NextImage from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const galleryImages = [
  {
    src: "https://placehold.co/1200x500.png",
    alt: "Kegiatan penyuluhan kesehatan di masyarakat.",
    hint: "community health education",
    title: "Penyuluhan Kesehatan Masyarakat",
    description: "Meningkatkan kesadaran akan pentingnya pola hidup sehat di lingkungan sekitar."
  },
  {
    src: "https://placehold.co/1200x500.png",
    alt: "Tim medis UKM PONJA sedang bertugas.",
    hint: "medical team action",
    title: "Bakti Sosial dan Pemeriksaan Gratis",
    description: "Memberikan layanan pemeriksaan kesehatan dasar kepada masyarakat yang membutuhkan."
  },
  {
    src: "https://placehold.co/1200x500.png",
    alt: "Pelatihan pertolongan pertama pada kecelakaan.",
    hint: "first aid training",
    title: "Pelatihan Pertolongan Pertama",
    description: "Membekali anggota dengan keterampilan pertolongan pertama yang krusial."
  },
];

const topArticles = [
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
    excerpt: "Stres kerja tidak bisa dihindari, tetapi bisa dikelola. Temukan cara efektif untuk menjaga kesehatan mental Anda.",
    image: "https://placehold.co/600x400.png",
    hint: "mental health work",
    href: "/artikel/mengelola-stres",
  },
   {
    title: "Gizi Seimbang untuk Produktivitas Maksimal",
    category: "Nutrisi",
    excerpt: "Pola makan yang tepat adalah kunci energi dan fokus sepanjang hari. Temukan panduan praktis untuk gizi seimbang.",
    image: "https://placehold.co/600x400.png",
    hint: "balanced nutrition",
    href: "/artikel/gizi-seimbang",
  },
];


export default function HomePage() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-6 md:py-12">
            <div className="container">
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {galleryImages.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[300px] w-full md:h-[500px]">
                                <NextImage
                                    src={image.src}
                                    alt={image.alt}
                                    data-ai-hint={image.hint}
                                    fill
                                    className="rounded-lg object-cover"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/50 p-4 text-center">
                                    <h2 className="text-2xl font-bold text-white md:text-4xl">{image.title}</h2>
                                    <p className="mt-2 max-w-2xl text-base text-gray-200 md:text-lg">{image.description}</p>
                                </div>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white" />
                </Carousel>
            </div>
        </section>

        <section id="articles" className="w-full bg-secondary/40 py-16 sm:py-20">
          <div className="container">
            <div className="mb-12 flex items-center justify-between">
                <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl">Artikel Terbaru</h2>
                <Button asChild variant="outline">
                  <Link href="/artikel">
                    Lihat Semua <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {topArticles.map((article, index) => (
                <Link key={index} href={article.href} className="group">
                  <Card className="flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-0">
                      <NextImage
                        src={article.image}
                        alt={article.title}
                        data-ai-hint={article.hint}
                        width={600}
                        height={400}
                        className="h-40 w-full object-cover"
                      />
                    </CardContent>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit">{article.category}</Badge>
                      <CardTitle className="mt-2 text-base">{article.title}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <div className="text-sm font-medium text-primary group-hover:underline">
                        Baca Selengkapnya
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
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
                  <Link href="/login">
                    Akses Dasbor Manajemen
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
