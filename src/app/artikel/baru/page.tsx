
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ref, push, set } from "firebase/database";
import { ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";
import { database, storage } from "@/lib/firebase";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, ArrowLeft, Wand2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NextImage from "next/image";
import { generateArticleImage } from "@/ai/flows/generateArticleImageFlow";

export default function BuatArtikelPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [generatedImageDataUri, setGeneratedImageDataUri] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateImage = async () => {
    if (!title) {
      toast({
        title: "Judul tidak boleh kosong",
        description: "Silakan masukkan judul artikel untuk membuat gambar.",
        variant: "destructive",
      });
      return;
    }
    setIsGeneratingImage(true);
    setGeneratedImageDataUri(null);
    try {
      const result = await generateArticleImage({ title });
      if (result.imageUrl) {
        setGeneratedImageDataUri(result.imageUrl);
      } else {
        toast({
          title: "Gagal menghasilkan gambar",
          description: "AI tidak dapat membuat gambar. Silakan coba lagi.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal menghubungi layanan AI. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content || !excerpt || !generatedImageDataUri) {
        toast({ title: "Formulir tidak lengkap", description: "Harap isi semua kolom dan buat gambar dengan AI.", variant: "destructive"});
        return;
    }

    setIsSubmitting(true);
    try {
        // 1. Upload image to Firebase Storage from data URI
        const imageRef = storageRef(storage, `articles/${Date.now()}-${title.replace(/[^a-z0-9]/gi, '_')}.png`);
        // The data URI is expected to be 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...
        const uploadResult = await uploadString(imageRef, generatedImageDataUri, 'data_url');
        const imageUrl = await getDownloadURL(uploadResult.ref);

        // 2. Save article data to Realtime Database
        const articlesRef = ref(database, 'articles');
        const newArticleRef = push(articlesRef);
        await set(newArticleRef, {
            title,
            category,
            content,
            excerpt,
            imageUrl,
            createdAt: new Date().toISOString(),
        });
        
        toast({ title: "Sukses!", description: `Artikel "${title}" berhasil diterbitkan.` });
        router.push("/artikel");

    } catch (error) {
        console.error("Error creating article:", error);
        toast({ title: "Gagal Menerbitkan Artikel", description: "Terjadi kesalahan saat menyimpan data.", variant: "destructive" });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Tulis Artikel Baru">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Konten Artikel</CardTitle>
                        <CardDescription>Isi detail utama artikel Anda di sini.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Artikel</Label>
                            <Input 
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Judul yang menarik dan informatif"
                                disabled={isSubmitting || isGeneratingImage}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="content">Isi Konten</Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                placeholder="Tulis konten artikel lengkap Anda di sini..."
                                disabled={isSubmitting || isGeneratingImage}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                     <CardHeader>
                        <CardTitle>Metadata</CardTitle>
                        <CardDescription>Pengaturan tambahan untuk artikel.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                           <Label htmlFor="category">Kategori</Label>
                           <Select onValueChange={setCategory} value={category} disabled={isSubmitting || isGeneratingImage}>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Gaya Hidup Sehat">Gaya Hidup Sehat</SelectItem>
                                    <SelectItem value="Kesehatan Anak">Kesehatan Anak</SelectItem>
                                    <SelectItem value="Kesehatan Mental">Kesehatan Mental</SelectItem>
                                    <SelectItem value="Nutrisi">Nutrisi</SelectItem>
                                    <SelectItem value="Penyakit">Penyakit</SelectItem>
                                    <SelectItem value="Info Terkini">Info Terkini</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Kutipan Singkat (Excerpt)</Label>
                            <Textarea
                                id="excerpt"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={4}
                                placeholder="Ringkasan singkat artikel (maks 200 karakter)"
                                maxLength={200}
                                disabled={isSubmitting || isGeneratingImage}
                            />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gambar Utama</CardTitle>
                        <CardDescription>Gunakan AI untuk membuat gambar berdasarkan judul artikel Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="w-full aspect-video rounded-md border-2 border-dashed bg-card/50 flex items-center justify-center">
                        {isGeneratingImage ? (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Loader className="h-8 w-8 animate-spin" />
                                <p>AI sedang membuat gambar...</p>
                             </div>
                        ) : generatedImageDataUri ? (
                            <NextImage
                                src={generatedImageDataUri}
                                alt="AI Generated Image"
                                width={300}
                                height={169}
                                className="object-contain rounded-md"
                            />
                        ) : (
                            <div className="text-center text-muted-foreground p-4">
                                <ImageIcon className="mx-auto h-10 w-10" />
                                <p className="mt-2">Pratinjau gambar akan muncul di sini</p>
                            </div>
                        )}
                        </div>
                        <Button type="button" onClick={handleGenerateImage} disabled={isGeneratingImage || isSubmitting || !title} className="w-full">
                            {isGeneratingImage ? (
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Wand2 className="mr-2 h-4 w-4" />
                            )}
                            Buat Gambar dengan AI
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
        <Card className="mt-6">
          <CardFooter className="justify-end gap-2 pt-6">
            <Button type="button" variant="outline" onClick={() => router.push('/artikel')} disabled={isSubmitting || isGeneratingImage}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting || isGeneratingImage}>
              {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Menerbitkan...' : 'Terbitkan Artikel'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardLayout>
  );
}
