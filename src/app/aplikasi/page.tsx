
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, LogOut, Settings, LifeBuoy, Activity, ClipboardList, Newspaper, Image, AppWindow, Loader, Download } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NextImage from "next/image";
import { generateThumbnail } from "@/ai/flows/generateThumbnailFlow";
import { useToast } from "@/hooks/use-toast";


export default function AplikasiPage() {
  const pathname = usePathname();
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

    const image = new window.Image();
    image.src = generatedImage;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'thumbnail.webp';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
          }
        }, 'image/webp');
      }
    };
  };


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Icons.logo className="size-8 text-primary" />
            <h1 className="text-xl font-semibold">UKM PONJA</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton isActive={pathname === "/"} tooltip="Dasbor">
                  <Home className="size-4" />
                  <span className="truncate">Dasbor</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/kegiatan-ukm">
                <SidebarMenuButton isActive={pathname === "/kegiatan-ukm"} tooltip="Kegiatan UKM">
                  <Activity className="size-4" />
                  <span className="truncate">Kegiatan UKM</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/laporan">
                <SidebarMenuButton isActive={pathname === "/laporan"} tooltip="Laporan">
                  <ClipboardList className="size-4" />
                  <span className="truncate">Laporan</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/artikel">
                <SidebarMenuButton isActive={pathname === "/artikel"} tooltip="Artikel">
                  <Newspaper className="size-4" />
                  <span className="truncate">Artikel</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/galeri">
                <SidebarMenuButton isActive={pathname === "/galeri"} tooltip="Galeri">
                  <Image className="size-4" />
                  <span className="truncate">Galeri</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/aplikasi">
                <SidebarMenuButton isActive={pathname === "/aplikasi"} tooltip="Aplikasi">
                  <AppWindow className="size-4" />
                  <span className="truncate">Aplikasi</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto w-full justify-start gap-2 p-2">
                <Avatar className="size-8">
                  <AvatarImage data-ai-hint="profile avatar" src="https://placehold.co/100x100.png" alt="Pengguna" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div className="text-left group-data-[collapsible=icon]:hidden">
                  <p className="truncate text-sm font-medium">Pengguna</p>
                  <p className="truncate text-xs text-muted-foreground">pengguna@contoh.com</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="top" align="start">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Dukungan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-semibold md:text-xl">Aplikasi</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col p-4 md:p-6">
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
                    Unduh (WebP)
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
          <footer className="mt-8 text-center text-sm text-muted-foreground">
            Dibuat oleh Rani Kirana
          </footer>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
