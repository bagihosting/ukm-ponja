
"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ukmEsensialPrograms = [
  { id: "es1", name: "Promosi Kesehatan", pic: "Ahmad Subagja", avatar: "https://placehold.co/100x100.png" },
  { id: "es2", name: "Kesehatan Ibu", pic: "Siti Aminah", avatar: "https://placehold.co/100x100.png" },
  { id: "es3", name: "Kesehatan Anak", pic: "Budi Santoso", avatar: "https://placehold.co/100x100.png" },
  { id: "es4", name: "UKS", pic: "Dewi Lestari", avatar: "https://placehold.co/100x100.png" },
  { id: "es5", name: "Kesehatan Remaja", pic: "Eka Wijaya", avatar: "https://placehold.co/100x100.png" },
  { id: "es6", name: "Kesehatan Reproduksi", pic: "Fitri Handayani", avatar: "https://placehold.co/100x100.png" },
  { id: "es7", name: "Kesehatan Lansia", pic: "Gunawan Prasetyo", avatar: "https://placehold.co/100x100.png" },
  { id: "es8", name: "Gizi", pic: "Herlina Sari", avatar: "https://placehold.co/100x100.png" },
  { id: "es9", name: "Kesehatan Lingkungan", pic: "Indra Permana", avatar: "https://placehold.co/100x100.png" },
  { id: "es10", name: "TB", pic: "Joko Susilo", avatar: "https://placehold.co/100x100.png" },
  { id: "es11", name: "HIV", pic: "Kartika Putri", avatar: "https://placehold.co/100x100.png" },
  { id: "es12", name: "Kusta dan frambusia", pic: "Lia Kurnia", avatar: "https://placehold.co/100x100.png" },
  { id: "es13", name: "Ispa", pic: "Muhammad Iqbal", avatar: "https://placehold.co/100x100.png" },
  { id: "es14", name: "Hepatitis", pic: "Nina Agustina", avatar: "https://placehold.co/100x100.png" },
  { id: "es15", name: "Diare", pic: "Oscar Mahendra", avatar: "https://placehold.co/100x100.png" },
  { id: "es16", name: "Imunisasi", pic: "Putri Wulandari", avatar: "https://placehold.co/100x100.png" },
  { id: "es17", name: "Surveilans", pic: "Qori Ramadhan", avatar: "https://placehold.co/100x100.png" },
  { id: "es18", name: "Penyakit tidak menular", pic: "Rina Melati", avatar: "https://placehold.co/100x100.png" },
  { id: "es19", name: "Kesehatan Indera", pic: "Surya Wijaya", avatar: "https://placehold.co/100x100.png" },
  { id: "es20", name: "Kesehatan Jiwa", pic: "Tia Permata", avatar: "https://placehold.co/100x100.png" },
  { id: "es21", name: "Kanker", pic: "Umar Abdullah", avatar: "https://placehold.co/100x100.png" },
  { id: "es22", name: "P2BB (Penyakit bersumber Binatang)", pic: "Vina Lestari", avatar: "https://placehold.co/100x100.png" },
  { id: "es23", name: "Perkesmas", pic: "Wahyu Nugroho", avatar: "https://placehold.co/100x100.png" },
  { id: "es24", name: "PIS PK", pic: "Yulia Citra", avatar: "https://placehold.co/100x100.png" },
];

const ukmPengembanganPrograms = [
  { id: "pg1", name: "Kesehatan kerja dan olahraga", pic: "Zainal Abidin", avatar: "https://placehold.co/100x100.png" },
  { id: "pg2", name: "UKGS UKGMD", pic: "Agus Salim", avatar: "https://placehold.co/100x100.png" },
  { id: "pg3", name: "Yankestrad", pic: "Citra Kirana", avatar: "https://placehold.co/100x100.png" },
  { id: "pg4", name: "Haji", pic: "Dedi Mulyadi", avatar: "https://placehold.co/100x100.png" },
  { id: "pg5", name: "Ngider sehat", pic: "Farah Quinn", avatar: "https://placehold.co/100x100.png" },
];

type Program = {
  id: string;
  name: string;
  pic: string;
  avatar: string;
};

const ProgramTable = ({ programs }: { programs: Program[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50%]">Program</TableHead>
        <TableHead className="w-[50%]">Penanggung Jawab</TableHead>
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
                <AvatarFallback>{program.pic.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{program.pic}</div>
                <div className="text-sm text-muted-foreground">PIC</div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);


const programs = [
  {
    value: "item-1",
    title: "UKM Esensial",
    description: "Program inti yang mencakup pelayanan kesehatan primer, promosi kesehatan, dan pencegahan penyakit untuk masyarakat.",
    icon: <LayoutGrid className="size-8 text-primary" />,
    programList: ukmEsensialPrograms,
  },
  {
    value: "item-2",
    title: "UKM Pengembangan",
    description: "Inovasi dan pengembangan program kesehatan untuk menjawab tantangan baru dan kebutuhan spesifik di masyarakat.",
    icon: <TrendingUp className="size-8 text-primary" />,
    programList: ukmPengembanganPrograms,
  }
];

export default function KegiatanPublikPage() {
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
          
          <Accordion type="single" collapsible className="w-full space-y-6">
            {programs.map((program) => (
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

    