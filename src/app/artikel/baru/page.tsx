
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
import { generateArticleContent } from "@/ai/flows/generateArticleContentFlow";
import { generateArticleExcerpt } from "@/ai/flows/generateArticleExcerptFlow";
import { generateArticleTitle } from "@/ai/flows/generateArticleTitleFlow";


export default function BuatArtikelPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [generatedImageDataUri, setGeneratedImageDataUri] = useState<string | null>(null);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleGenerateTitle = async () => {
    if (!keyword || !category) {
      toast({
        title: "Kata Kunci dan Kategori harus diisi",
        description: "Silakan masukkan kata kunci dan pilih kategori untuk membuat judul.",
        variant: "destructive",
      });
      return;
    }
    setIsGeneratingTitle(true);
    setTitle("");
    try {
      const result = await generateArticleTitle({ keyword, category });
      if (result.title) {
        setTitle(result.title);
        toast({
          title: "Judul berhasil dibuat!",
          description: "Anda sekarang dapat membuat konten dan gambar."
        });
      } else {
        toast({
          title: "Gagal menghasilkan judul",
          description: "AI tidak dapat membuat judul. Silakan coba lagi.",
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
      setIsGeneratingTitle(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!title) {
      toast({
        title: "Judul tidak boleh kosong",
        description: "Silakan buat judul artikel terlebih dahulu untuk membuat gambar.",
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

  const handleGenerateContent = async () => {
    if (!title || !category) {
      toast({
        title: "Judul dan Kategori harus diisi",
        description: "Silakan buat judul dan pilih kategori untuk membuat konten.",
        variant: "destructive",
      });
      return;
    }
    setIsGeneratingContent(true);
    setContent("AI sedang menulis artikel untuk Anda, mohon tunggu...");
    setExcerpt("");
    try {
      const contentResult = await generateArticleContent({ title, category });
      if (contentResult.content) {
        setContent(contentResult.content);
        toast({
            title: "Konten berhasil dibuat!",
            description: "Membuat kutipan singkat..."
        });

        // Auto-generate excerpt from the generated content
        const excerptResult = await generateArticleExcerpt({
          title,
          content: contentResult.content
        });

        if (excerptResult.excerpt) {
            setExcerpt(excerptResult.excerpt);
            toast({
                title: "Kutipan berhasil dibuat!",
                description: "Silakan periksa dan edit jika diperlukan."
            });
        } else {
            setExcerpt(contentResult.content.substring(0, 200));
            toast({
                title: "Gagal membuat kutipan AI",
                description: "Menggunakan 200 karakter pertama sebagai kutipan.",
                variant: "destructive"
            });
        }

      } else {
        toast({
          title: "Gagal menghasilkan konten",
          description: "AI tidak dapat membuat konten. Silakan coba lagi.",
          variant: "destructive",
        });
        setContent("");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal menghubungi layanan AI. Silakan coba lagi.",
        variant: "destructive",
      });
       setContent("");
    } finally {
      setIsGeneratingContent(false);
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
  
  const isAiWorking = isGeneratingImage || isGeneratingContent || isSubmitting || isGeneratingTitle;

  return (
    <DashboardLayout pageTitle="Tulis Artikel Baru">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Konten Artikel</CardTitle>
                        <CardDescription>Mulai dengan kata kunci, lalu biarkan AI membantu Anda membuat judul, konten, dan gambar.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                           <Label htmlFor="category">1. Pilih Kategori Terlebih Dahulu</Label>
                           <Select onValueChange={setCategory} value={category} disabled={isAiWorking}>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Pilih kategori artikel" />
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
                            <Label htmlFor="keyword">2. Masukkan Kata Kunci</Label>
                            <div className="flex items-center gap-2">
                                <Input 
                                    id="keyword"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Contoh: 'jantung sehat' atau 'kesehatan mental remaja'"
                                    disabled={isAiWorking || !category}
                                />
                                <Button
                                  type="button"
                                  onClick={handleGenerateTitle}
                                  variant="outline"
                                  size="icon"
                                  title="Buat Judul dengan AI"
                                  disabled={isAiWorking || !keyword || !category}
                                >
                                  {isGeneratingTitle ? <Loader className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                         {title && (
                            <div className="space-y-2 rounded-md border bg-muted/50 p-4">
                               <p className="text-sm font-medium text-muted-foreground">Judul yang Dihasilkan AI:</p>
                               <p className="text-lg font-semibold">{title}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="content">3. Buat Isi Konten</Label>
                                <Button
                                    type="button"
                                    onClick={handleGenerateContent}
                                    variant="outline"
                                    size="sm"
                                    disabled={isAiWorking || !title}
                                >
                                    {isGeneratingContent ? (
                                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Wand2 className="mr-2 h-4 w-4" />
                                    )}
                                    Buat Konten dengan AI
                                </Button>
                            </div>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                placeholder="Konten artikel akan muncul di sini setelah dibuat oleh AI."
                                disabled={isAiWorking}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                     <CardHeader>
                        <CardTitle>Metadata</CardTitle>
                        <CardDescription>Kutipan singkat dibuat otomatis oleh AI setelah konten selesai dibuat.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="excerpt">Kutipan Singkat (Excerpt)</Label>
                            <Textarea
                                id="excerpt"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={4}
                                placeholder="Ringkasan singkat artikel (maks 250 karakter)."
                                maxLength={250}
                                disabled={isAiWorking}
                            />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>4. Gambar Utama</CardTitle>
                        <CardDescription>Gunakan AI untuk membuat gambar yang relevan.</CardDescription>
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
                        <Button type="button" onClick={handleGenerateImage} disabled={isAiWorking || !title} className="w-full">
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
            <Button type="button" variant="outline" onClick={() => router.push('/artikel')} disabled={isAiWorking}>
              Batal
            </Button>
            <Button type="submit" disabled={isAiWorking}>
              {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Menerbitkan...' : 'Terbitkan Artikel'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardLayout>
  );
}
