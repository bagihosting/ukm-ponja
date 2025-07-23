
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NextImage from "next/image";
import { generateThumbnail } from "@/ai/flows/generateThumbnailFlow";
import { useToast } from "@/hooks/use-toast";
import { Loader, Download } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";

export default function AplikasiPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [character, setCharacter] = useState("doctor");
  const [platform, setPlatform] = useState("youtube");
  const [theme, setTheme] = useState("default");
  const [generatedImage, setGeneratedImage] = useState("");

  const handleGenerate = async () => {
    if (!prompt) {
        toast({
            title: "Teks tidak boleh kosong",
            description: "Silakan masukkan teks untuk thumbnail.",
            variant: "destructive",
        });
        return;
    }
    setLoading(true);
    setGeneratedImage("");
    try {
      const result = await generateThumbnail({ prompt, character, platform, theme });
      if (result.imageUrl) {
        setGeneratedImage(result.imageUrl);
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
        description: "Gagal menghubungi layanan AI. Silakan periksa koneksi Anda dan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    const fileName = prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 50) || 'thumbnail';
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <DashboardLayout pageTitle="Aplikasi">
      <div className="grid flex-grow grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thumbnail Kesehatan</CardTitle>
              <CardDescription>
                Buat thumbnail menarik bertema kesehatan dengan karakter animasi 3D. Cukup masukkan teks informatif Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Teks Informasi</Label>
                <Textarea
                  id="prompt"
                  placeholder="Contoh: 5 Tips Menjaga Kesehatan Jantung"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="character">Pilih Karakter</Label>
                    <Select value={character} onValueChange={setCharacter}>
                    <SelectTrigger id="character" className="w-full">
                      <SelectValue placeholder="Pilih karakter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Dokter</SelectItem>
                      <SelectItem value="nurse">Perawat</SelectItem>
                      <SelectItem value="midwife">Bidan</SelectItem>
                      <SelectItem value="adult_man">Pria Dewasa</SelectItem>
                      <SelectItem value="adult_woman">Wanita Dewasa</SelectItem>
                      <SelectItem value="boy">Anak Laki-laki</SelectItem>
                      <SelectItem value="girl">Anak Perempuan</SelectItem>
                      <SelectItem value="baby">Bayi</SelectItem>
                      <SelectItem value="elderly_man">Lansia Pria</SelectItem>
                      <SelectItem value="elderly_woman">Lansia Wanita</SelectItem>
                      <SelectItem value="bakteri">Bakteri</SelectItem>
                      <SelectItem value="virus">Virus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema Busana</Label>
                  <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme" className="w-full">
                          <SelectValue placeholder="Pilih tema" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="default">Seragam (Default)</SelectItem>
                          <SelectItem value="idul_fitri">Idul Fitri</SelectItem>
                          <SelectItem value="idul_adha">Idul Adha</SelectItem>
                          <SelectItem value="imlek">Imlek</SelectItem>
                          <SelectItem value="natal">Natal</SelectItem>
                          <SelectItem value="ramadhan">Ramadhan</SelectItem>
                          <SelectItem value="hari_batik">Hari Batik</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Pilih Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger id="platform" className="w-full">
                      <SelectValue placeholder="Pilih platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="instagram">Instagram / Facebook</SelectItem>
                      <SelectItem value="tiktok">TikTok / X</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={loading} className="w-full">
                {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Buat Thumbnail
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Hasil Thumbnail</CardTitle>
              <CardDescription>
                Pratinjau thumbnail yang dihasilkan akan muncul di sini.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-center">
              <div className="aspect-video w-full rounded-lg border-2 border-dashed bg-card/50 shadow-sm flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader className="h-8 w-8 animate-spin" />
                    <p>Menghasilkan gambar...</p>
                  </div>
                ) : generatedImage ? (
                  <NextImage
                    src={generatedImage}
                    alt="Generated Thumbnail"
                    width={512}
                    height={288}
                    className="object-contain rounded-md"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Gambar akan tampil di sini</p>
                  </div>
                )}
              </div>
            </CardContent>
            {generatedImage && !loading && (
              <CardFooter>
                <Button onClick={handleDownload} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh (PNG)
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
    </DashboardLayout>
  );
}
