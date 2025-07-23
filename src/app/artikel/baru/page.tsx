
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ref, push, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "@/lib/firebase";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NextImage from "next/image";

export default function BuatArtikelPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content || !excerpt || !imageFile) {
        toast({ title: "Formulir tidak lengkap", description: "Harap isi semua kolom dan unggah gambar.", variant: "destructive"});
        return;
    }

    setIsSubmitting(true);
    try {
        // 1. Upload image to Firebase Storage
        const imageRef = storageRef(storage, `articles/${Date.now()}-${imageFile.name}`);
        const uploadResult = await uploadBytes(imageRef, imageFile);
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                           <Select onValueChange={setCategory} value={category} disabled={isSubmitting}>
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
                                disabled={isSubmitting}
                            />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Gambar Utama</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="w-full aspect-video rounded-md border-2 border-dashed bg-card/50 flex items-center justify-center">
                        {imagePreview ? (
                            <NextImage
                                src={imagePreview}
                                alt="Preview"
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
                        <Button asChild variant="outline" size="sm" className="w-full" disabled={isSubmitting}>
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <Upload className="mr-2 h-4 w-4"/>
                                Unggah Gambar
                                <input id="image-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} disabled={isSubmitting} />
                            </label>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
        <Card className="mt-6">
          <CardFooter className="justify-end gap-2 pt-6">
            <Button type="button" variant="outline" onClick={() => router.push('/artikel')} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Menerbitkan...' : 'Terbitkan Artikel'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardLayout>
  );
}
