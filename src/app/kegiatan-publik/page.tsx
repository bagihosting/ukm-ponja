
"use client";

import { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { database } from "@/lib/firebase";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, TrendingUp, Loader } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Program = {
  id: string;
  name: string;
  pic: string;
  avatar: string;
  position: string;
  description: string;
};

const ProgramTable = ({ programs }: { programs: Program[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[30%]">Program</TableHead>
        <TableHead className="w-[30%]">Penanggung Jawab</TableHead>
        <TableHead className="w-[40%]">Deskripsi</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {programs.map((program) => (
        <TableRow key={program.id}>
          <TableCell className="font-medium">{program.name}</TableCell>
          <TableCell>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage data-ai-hint="person photo" src={program.avatar} alt={program.pic} />
                <AvatarFallback>{program.pic ? program.pic.charAt(0) : '?'}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{program.pic}</div>
                <div className="text-sm text-muted-foreground">{program.position}</div>
              </div>
            </div>
          </TableCell>
          <TableCell className="text-sm text-muted-foreground">{program.description}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function KegiatanPublikPage() {
  const [ukmEsensial, setUkmEsensial] = useState<Program[]>([]);
  const [ukmPengembangan, setUkmPengembangan] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

   const fetchPrograms = async () => {
    setLoading(true);
    const programsRef = ref(database, 'programs');
    const snapshot = await get(programsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const processData = (categoryData: any = []) => {
        return Object.entries(categoryData).map(([id, value]) => ({ id, ...(value as Omit<Program, 'id'>) }));
      };
      setUkmEsensial(processData(data.esensial));
      setUkmPengembangan(processData(data.pengembangan));
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchPrograms();
  }, []);

  const programCategories = [
    {
      value: "item-1",
      title: "UKM Esensial",
      description: "Program inti yang mencakup pelayanan kesehatan primer, promosi kesehatan, dan pencegahan penyakit untuk masyarakat.",
      icon: <LayoutGrid className="size-8 text-primary" />,
      programList: ukmEsensial,
    },
    {
      value: "item-2",
      title: "UKM Pengembangan",
      description: "Inovasi dan pengembangan program kesehatan untuk menjawab tantangan baru dan kebutuhan spesifik di masyarakat.",
      icon: <TrendingUp className="size-8 text-primary" />,
      programList: ukmPengembangan,
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-16">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Kegiatan UKM PONJA</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Temukan berbagai program dan inisiatif yang kami jalankan untuk meningkatkan kesehatan masyarakat. Klik setiap kategori untuk melihat detail program.
            </p>
          </div>
          
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader className="h-8 w-8 animate-spin" />
              <p className="ml-2">Memuat data program...</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-6" defaultValue="item-1">
              {programCategories.map((program) => (
                <AccordionItem value={program.value} key={program.title} className="border-b-0">
                   <Card className="group flex flex-col justify-between transition-all hover:shadow-xl">
                      <AccordionTrigger className="hover:no-underline">
                        <CardHeader className="flex-row items-center gap-4 space-y-0 p-4 md:p-6 w-full">
                            <div className="rounded-lg bg-primary/10 p-4">
                              {program.icon}
                            </div>
                            <div className="text-left">
                                <CardTitle>{program.title}</CardTitle>
                                <CardDescription className="mt-1 leading-relaxed">{program.description}</CardDescription>
                            </div>
                        </CardHeader>
                      </AccordionTrigger>
                      <AccordionContent>
                        <CardContent>
                            <ProgramTable programs={program.programList} />
                        </CardContent>
                      </AccordionContent>
                    </Card>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          <div className="mt-12 flex flex-1 items-center justify-center rounded-lg border-2 border-dashed bg-card/50 py-20 shadow-sm">
              <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight">
                      Jadwal & Aktivitas Mendatang
                  </h2>
                  <p className="text-muted-foreground">
                      Kalender kegiatan dan daftar aktivitas akan ditampilkan di sini.
                  </p>
              </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
