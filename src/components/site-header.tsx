
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ArrowRight, Menu, Loader } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { name: "Kegiatan UKM", href: "/kegiatan-publik" },
  { name: "Laporan", href: "/laporan-publik" },
  { name: "Artikel", href: "/artikel" },
  { name: "Galeri", href: "/galeri" },
];

const AuthButton = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Button disabled className="w-full md:w-auto">
        <Loader className="mr-2 size-4 animate-spin" />
        Memuat...
      </Button>
    );
  }

  if (user) {
    return (
      <Button asChild className="w-full md:w-auto">
        <Link href="/dasbor">
          Dasbor <ArrowRight className="ml-2 size-4" />
        </Link>
      </Button>
    );
  }

  return (
    <Button asChild className="w-full md:w-auto">
      <Link href="/login">
        Masuk <ArrowRight className="ml-2 size-4" />
      </Link>
    </Button>
  );
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="size-7 text-primary" />
            <span className="text-lg font-bold">UKM PONJA</span>
          </Link>
        </div>
        <nav className="hidden flex-1 items-center gap-4 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-initial">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Buka Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="grid gap-6 py-6">
                <Link href="/" className="mb-4 flex items-center gap-2">
                  <Icons.logo className="size-7 text-primary" />
                  <span className="text-lg font-bold">UKM PONJA</span>
                </Link>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className="flex w-full items-center py-2 text-lg font-semibold"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="pt-4">
                  <SheetClose asChild>
                    <AuthButton />
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden md:inline-flex">
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}
