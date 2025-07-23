
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
import { 
  Home, LogOut, Settings, LifeBuoy, Activity, Star, 
  HeartPulse, Baby, Stethoscope, School, Users, Venus, PersonStanding, 
  Utensils, Recycle, Shield, Bug, Syringe, Biohazard, Droplets, 
  BarChart, Thermometer, Brain, Dna, FileText, Group, HeartCrack, TrendingUp,
  Briefcase, Smile, Leaf, Ship, Route, ClipboardList, Newspaper, Image, AppWindow
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KegiatanUkmPage() {
  const pathname = usePathname();

  const essentialPrograms = [
    { name: "Promosi Kesehatan", icon: <HeartPulse className="h-6 w-6 text-primary" />, personInCharge: "Budi Santoso", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kesehatan Ibu", icon: <PersonStanding className="h-6 w-6 text-primary" />, personInCharge: "Citra Lestari", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kesehatan Anak", icon: <Baby className="h-6 w-6 text-primary" />, personInCharge: "Dewi Anggraini", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "UKS", icon: <School className="h-6 w-6 text-primary" />, personInCharge: "Eko Prasetyo", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kesehatan Remaja", icon: <Users className="h-6 w-6 text-primary" />, personInCharge: "Fitriani", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kesehatan Reproduksi", icon: <Venus className="h-6 w-6 text-primary" />, personInCharge: "Gunawan", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kesehatan Lansia", icon: <PersonStanding className="h-6 w-6 text-primary" />, personInCharge: "Hasanah", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Gizi", icon: <Utensils className="h-6 w-6 text-primary" />, personInCharge: "Indra Wijaya", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kesehatan Lingkungan", icon: <Recycle className="h-6 w-6 text-primary" />, personInCharge: "Joko Susilo", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "TB", icon: <HeartCrack className="h-6 w-6 text-primary" />, personInCharge: "Kartika", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "HIV", icon: <Shield className="h-6 w-6 text-primary" />, personInCharge: "Lestari", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kusta dan frambusia", icon: <Bug className="h-6 w-6 text-primary" />, personInCharge: "Muhammad Ali", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Ispa", icon: <Thermometer className="h-6 w-6 text-primary" />, personInCharge: "Nadia", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Hepatitis", icon: <Biohazard className="h-6 w-6 text-primary" />, personInCharge: "Olivia", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Diare", icon: <Droplets className="h-6 w-6 text-primary" />, personInCharge: "Putra", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Imunisasi", icon: <Syringe className="h-6 w-6 text-primary" />, personInCharge: "Qurrota", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Surveilans", icon: <BarChart className="h-6 w-6 text-primary" />, personInCharge: "Rina", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Penyakit tidak menular", icon: <Stethoscope className="h-6 w-6 text-primary" />, personInCharge: "Sari", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kesehatan Indera", icon: <Brain className="h-6 w-6 text-primary" />, personInCharge: "Toni", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kesehatan Jiwa", icon: <Brain className="h-6 w-6 text-primary" />, personInCharge: "Utami", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Kanker", icon: <Dna className="h-6 w-6 text-primary" />, personInCharge: "Vina", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "P2BB (Penyakit bersumber Binatang)", icon: <Bug className="h-6 w-6 text-primary" />, personInCharge: "Wahyu", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Perkesmas", icon: <Group className="h-6 w-6 text-primary" />, personInCharge: "Yanti", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "PIS PK", icon: <FileText className="h-6 w-6 text-primary" />, personInCharge: "Zainal", personInChargePhoto: "https://placehold.co/100x100.png" },
  ];

  const developmentPrograms = [
    { name: "Kesehatan kerja dan olahraga", icon: <Briefcase className="h-6 w-6 text-primary" />, personInCharge: "Ahmad", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "UKGS UKGMD", icon: <Smile className="h-6 w-6 text-primary" />, personInCharge: "Bella", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Yankestrad", icon: <Leaf className="h-6 w-6 text-primary" />, personInCharge: "Chandra", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Haji", icon: <Ship className="h-6 w-6 text-primary" />, personInCharge: "Dina", personInChargePhoto: "https://placehold.co/100x100.png" },
    { name: "Ngider sehat", icon: <Route className="h-6 w-6 text-primary" />, personInCharge: "Edwin", personInChargePhoto: "https://placehold.co/100x100.png" },
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
            <h1 className="text-lg font-semibold md:text-xl">Kegiatan UKM</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6" />
            <h1 className="text-lg font-semibold md:text-2xl">UKM Esensial</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {essentialPrograms.map((program, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {program.icon}
                    <CardTitle className="text-base leading-tight">{program.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto flex items-center gap-3 pt-4">
                    <Avatar className="size-10">
                        <AvatarImage data-ai-hint="person face" src={program.personInChargePhoto} alt={program.personInCharge} />
                        <AvatarFallback>{program.personInCharge.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{program.personInCharge}</p>
                        <p className="text-xs text-muted-foreground">Penanggung Jawab</p>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <h1 className="text-lg font-semibold md:text-2xl">UKM Pengembangan</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {developmentPrograms.map((program, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {program.icon}
                    <CardTitle className="text-base leading-tight">{program.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto flex items-center gap-3 pt-4">
                    <Avatar className="size-10">
                        <AvatarImage data-ai-hint="person face" src={program.personInChargePhoto} alt={program.personInCharge} />
                        <AvatarFallback>{program.personInCharge.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{program.personInCharge}</p>
                        <p className="text-xs text-muted-foreground">Penanggung Jawab</p>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <footer className="mt-8 text-center text-sm text-muted-foreground">
            Dibuat oleh Rani Kirana
          </footer>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
