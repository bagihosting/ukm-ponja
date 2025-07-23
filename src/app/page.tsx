
"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Home, LogOut, Settings, LifeBuoy, Activity, ClipboardList, Newspaper, Image, AppWindow, Loader, RefreshCw } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import NextImage from "next/image";
import { generateQuote, GenerateQuoteOutput } from "@/ai/flows/generateQuoteFlow";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const pathname = usePathname();
  const { toast } = useToast();
  const [quoteData, setQuoteData] = useState<GenerateQuoteOutput | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = useCallback(async (regenerateImage = false) => {
    setLoading(true);
    try {
      // If we aren't regenerating the image, we can pass the existing character
      // to avoid creating a new image, which might have a different character.
      const character = regenerateImage || !quoteData?.character ? undefined : quoteData.character;
      const data = await generateQuote(character);
      setQuoteData(data);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      toast({
        title: "Gagal Memuat Kata Mutiara",
        description: "Terjadi kesalahan saat mengambil data baru. Silakan coba lagi.",
        variant: "destructive",
      });
      // Don't clear previous data on error, so the user can still see it.
    } finally {
      setLoading(false);
    }
  }, [toast, quoteData?.character]);

  useEffect(() => {
    // Fetch quote only once on initial load.
    fetchQuote(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The empty dependency array ensures this runs only once on mount.


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
            <h1 className="text-lg font-semibold md:text-xl">Dasbor</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col p-4 md:p-6">
            <div className="flex flex-1 items-center justify-center">
              <Card className="w-full max-w-4xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                  {loading && !quoteData ? (
                    <div className="p-6">
                        <Skeleton className="h-96 w-full" />
                        <Skeleton className="mt-4 h-6 w-3/4" />
                    </div>
                  ) : quoteData ? (
                    <>
                      <CardContent className="p-0">
                        <div className="relative aspect-video w-full">
                           <NextImage
                              src={quoteData.imageUrl}
                              alt={quoteData.quote}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                      </CardContent>
                       <CardFooter className="flex items-center justify-between bg-card/80 backdrop-blur-sm p-4 mt-auto">
                        <p className="max-w-[85%] text-sm font-medium text-card-foreground italic">
                            "{quoteData.quote}"
                        </p>
                        <Button variant="ghost" size="icon" onClick={() => fetchQuote(false)} disabled={loading} aria-label="Muat Ulang Kutipan">
                            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                      </CardFooter>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-10 text-center">
                       <p className="text-muted-foreground">Tidak dapat memuat kata mutiara.</p>
                       <Button onClick={() => fetchQuote(true)} className="mt-4" disabled={loading}>
                        {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                        Coba Lagi
                       </Button>
                    </div>
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
