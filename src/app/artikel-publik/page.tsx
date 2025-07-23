
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { get, ref } from "firebase/database";
import { database } from "@/lib/firebase";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";

type Article = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  createdAt: string;
};

export default function ArtikelPublikPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const articlesRef = ref(database, 'articles');
      const snapshot = await get(articlesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedArticles = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<Article, 'id'>)
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setArticles(loadedArticles);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-16">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Artikel Kesehatan</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Jelajahi wawasan, tips, dan informasi terbaru seputar kesehatan dari tim kami.
            </p>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader className="h-8 w-8 animate-spin" />
              <p className="ml-2">Memuat artikel...</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <Link key={article.id} href={`/artikel/${article.id}`} className="group">
                    <Card className="flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                      <CardContent className="p-0">
                        <NextImage
                          src={article.imageUrl || 'https://placehold.co/600x400.png'}
                          alt={article.title}
                          data-ai-hint="health article"
                          width={600}
                          height={400}
                          className="h-48 w-full object-cover"
                        />
                      </CardContent>
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit">{article.category}</Badge>
                        <CardTitle className="mt-2 text-lg">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                         <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                      </CardContent>
                      <CardFooter>
                        <div className="text-sm font-medium text-primary group-hover:underline">
                          Baca Selengkapnya
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))
              ) : (
                 <div className="col-span-full flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 py-20 shadow-sm">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Belum Ada Artikel
                        </h2>
                        <p className="text-muted-foreground">
                            Saat ini belum ada artikel yang dipublikasikan. Silakan kembali lagi nanti.
                        </p>
                    </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
