
"use client";

import { useEffect, useState } from "react";
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
  Briefcase, Smile, Leaf, Ship, Route, ClipboardList, Newspaper, Image, AppWindow, LucideProps
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { Skeleton } from "@/components/ui/skeleton";

type Program = {
  name: string;
  icon: keyof typeof iconComponents;
  personInCharge: string;
  personInChargePhoto: string;
};

const iconComponents: { [key: string]: React.FC<LucideProps> } = {
  HeartPulse, PersonStanding, Baby, School, Users, Venus, Utensils, Recycle, HeartCrack, Shield, Bug, Thermometer, Biohazard, Droplets, Syringe, BarChart, Stethoscope, Brain, Dna, FileText, Group, Briefcase, Smile, Leaf, Ship, Route, TrendingUp
};


export default function KegiatanUkmPage() {
  const pathname = usePathname();
  const [essentialPrograms, setEssentialPrograms] = useState<Program[]>([]);
  const [developmentPrograms, setDevelopmentPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const essentialRef = ref(database, 'essentialPrograms');
    const developmentRef = ref(database, 'developmentPrograms');

    const unsubscribeEssential = onValue(essentialRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEssentialPrograms(Object.values(data));
      } else {
        setEssentialPrograms([]);
      }
      setLoading(false);
    }, (err) => {
      console.error("Firebase read failed (essential): ", err);
      setError("Gagal memuat data program esensial.");
      setLoading(false);
    });

    const unsubscribeDevelopment = onValue(developmentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDevelopmentPrograms(Object.values(data));
      } else {
        setDevelopmentPrograms([]);
      }
    }, (err) => {
      console.error("Firebase read failed (development): ", err);
      setError("Gagal memuat data program pengembangan.");
    });

    return () => {
      unsubscribeEssential();
      unsubscribeDevelopment();
    };
  }, []);

  const ProgramCard = ({ program }: { program: Program }) => {
    const IconComponent = iconComponents[program.icon] || Star;
    return (
      <Card className="flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-start gap-4">
            <IconComponent className="h-7 w-7 text-primary flex-shrink-0" />
            <CardTitle className="text-base font-semibold leading-tight">{program.name}</CardTitle>
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
    )
  }

  const ProgramSkeleton = () => (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Skeleton className="h-7 w-7 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex items-center gap-3 pt-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </CardContent>
    </Card>
  );

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
            <h1 className="text-lg font-semibold md:text-xl">Kegiatan UKM</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {error && <div className="text-red-500 text-center p-4 bg-red-100 rounded-md">{error}</div>}
          
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6" />
            <h1 className="text-lg font-semibold md:text-2xl">UKM Esensial</h1>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, index) => <ProgramSkeleton key={index} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {essentialPrograms.map((program, index) => (
                <ProgramCard key={index} program={program} />
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            <h1 className="text-lg font-semibold md:text-2xl">UKM Pengembangan</h1>
          </div>
           {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => <ProgramSkeleton key={index} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {developmentPrograms.map((program, index) => (
                <ProgramCard key={index} program={program} />
              ))}
            </div>
           )}

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
