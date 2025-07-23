
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Home, LogOut, Settings, LifeBuoy, Activity, ClipboardList, FileText, BarChart2, BookOpen, FolderKanban, Newspaper, Image, AppWindow } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LaporanPage() {
  const pathname = usePathname();

  const reportItems = [
    { name: "Laporan ke Dinas", icon: <FileText className="h-8 w-8 text-primary" /> },
    { name: "Laporan Grafik", icon: <BarChart2 className="h-8 w-8 text-primary" /> },
    { name: "Log Book UKM", icon: <BookOpen className="h-8 w-8 text-primary" /> },
    { name: "GDrive Data UKM", icon: <FolderKanban className="h-8 w-8 text-primary" /> },
  ];

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
              <Link href="/dasbor">
                <SidebarMenuButton isActive={pathname === "/dasbor"} tooltip="Dasbor">
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
            <h1 className="text-lg font-semibold md:text-xl">Laporan</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reportItems.map((item, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-6">
                    {item.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <footer className="mt-8 border-t pt-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} UKM PONJA. All Rights Reserved.</p>
              <p className="mt-1">Dibuat oleh <span className="font-medium">Rani Kirana</span></p>
            </div>
          </footer>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
