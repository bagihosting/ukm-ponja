
"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ArrowRight, Newspaper, Menu, Loader } from "lucide-react";
import Link from "next/link";
import NextImage from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { name: "Kegiatan UKM", href: "/dasbor" },
  { name: "Laporan", href: "/dasbor" },
  { name: "Artikel", href: "/artikel" },
  { name: "Galeri", href: "/galeri" },
];

const mainArticle = {
  title: "Masa Depan Kesehatan Digital: Inovasi yang Mengubah Hidup",
  category: "Teknologi Kesehatan",
  excerpt: "Jelajahi bagaimana teknologi seperti AI, telemedicine, dan perangkat wearable merevolusi cara kita mengelola kesehatan dan memberikan perawatan yang lebih personal dan efektif.",
  image: "https://placehold.co/1200x800.png",
  hint: "digital health technology",
  href: "/artikel/kesehatan-digital",
};

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
  const { user, loading } = useAuth();
  
  const AuthButton = () => {
    if (loading) {
      return (
        <Button disabled className="w-full md:w-auto">
          <Loader className="mr-2 size-4 animate-spin" />
          Memuat...
        </Button>
      );
    }

    if (user) {
      return (
        <Button asChild className="w-full md:w-auto">
          <Link href="/dasbor">
            Dasbor <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      );
    }

    return (
      <Button asChild className="w-full md:w-auto">
        <Link href="/login">
          Masuk <ArrowRight className="ml-2 size-4" />
        </Link>
      </Button>
    );
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-6 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="size-7 text-primary" />
              <span className="text-lg font-bold">UKM PONJA</span>
            </Link>
          </div>
          <nav className="hidden flex-1 items-center gap-4 text-sm font-medium md:flex">
             {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-2 md:flex-initial">
             <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="size-5" />
                    <span className="sr-only">Buka Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="grid gap-6 py-6">
                    <Link href="/" className="mb-4 flex items-center gap-2">
                        <Icons.logo className="size-7 text-primary" />
                        <span className="text-lg font-bold">UKM PONJA</span>
                    </Link>
                    <div className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.name}>
                          <Link
                              href={link.href}
                              className="flex w-full items-center py-2 text-lg font-semibold"
                          >
                              {link.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                     <div className="pt-4">
                      <SheetClose asChild>
                        <AuthButton />
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
            </Sheet>
            <div className="hidden md:inline-flex">
              <AuthButton />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 sm:py-16 md:py-20">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <Link href={mainArticle.href} className="group block overflow-hidden rounded-lg">
                  <Card className="h-full border-0 shadow-none">
                     <CardContent className="relative p-0">
                      <NextImage
                        src={mainArticle.image}
                        alt={mainArticle.title}
                        data-ai-hint={mainArticle.hint}
                        width={1200}
                        height={800}
                        className="h-auto w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </CardContent>
                    <div className="absolute bottom-0 p-6">
                      <Badge variant="secondary" className="mb-2">{mainArticle.category}</Badge>
                      <CardTitle className="text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">{mainArticle.title}</CardTitle>
                      <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{mainArticle.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              </div>
              
              {/* Top Articles List */}
              <div className="flex flex-col">
                  <h2 className="mb-4 text-2xl font-bold">Terpopuler</h2>
                   <div className="relative flex overflow-x-hidden rounded-lg border bg-secondary/30 py-4">
                      <div className="animate-marquee whitespace-nowrap">
                        {[...topArticles.slice(0, 3), ...topArticles.slice(0, 3)].map((article, index) => (
                          <Link key={index} href={article.href} className="inline-flex items-center mx-4 text-sm font-semibold hover:text-primary transition-colors">
                              <Newspaper className="mr-2 h-4 w-4 text-muted-foreground" />
                              {article.title}
                          </Link>
                        ))}
                      </div>
                   </div>
              </div>
            </div>
          </div>
        </section>

        <section id="articles" className="w-full bg-secondary/40 py-16 sm:py-20 md:py-24">
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

      <footer className="w-full border-t">
          <div className="container flex h-24 flex-col items-center justify-between gap-4 py-10 md:flex-row md:py-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} UKM PONJA. Dibuat oleh <span className="font-medium">Rani Kirana</span>.
            </p>
          </div>
      </footer>
    </div>
  );
}
