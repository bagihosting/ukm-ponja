
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { get, ref } from "firebase/database";
import { database } from "@/lib/firebase";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader, PlusCircle, FileText, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Article = {
  id: string;
  title: string;
  category: string;
  createdAt: string;
};

export default function ArtikelAdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  useEffect(() => {
    fetchArticles();
  }, []);
  
  const handleDelete = (id: string) => {
    // Mock delete for now
    toast({
        title: "Fungsi Hapus Belum Tersedia",
        description: `Fungsionalitas untuk menghapus artikel dengan ID ${id} akan diimplementasikan.`,
    });
  }

  return (
    <DashboardLayout pageTitle="Manajemen Artikel">
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link href="/artikel/baru">
            <PlusCircle className="mr-2 h-4 w-4" />
            Tulis Artikel Baru
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Artikel</CardTitle>
          <CardDescription>Kelola semua artikel yang telah Anda publikasikan.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
             <div className="flex h-64 items-center justify-center">
                <Loader className="h-8 w-8 animate-spin" />
                <p className="ml-2">Memuat data artikel...</p>
            </div>
          ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[50%]">Judul Artikel</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tanggal Publikasi</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {articles.length > 0 ? (
                    articles.map((article) => (
                    <TableRow key={article.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {article.title}
                        </TableCell>
                        <TableCell>
                            <Badge variant="secondary">{article.category}</Badge>
                        </TableCell>
                         <TableCell>{new Date(article.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                        <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" disabled>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(article.id)} disabled>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                            Belum ada artikel.
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
