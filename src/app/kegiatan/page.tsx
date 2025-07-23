
"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Edit } from "lucide-react";

// Placeholder data, nantinya akan diganti dengan data dari database
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
        <TableHead className="w-[40%]">Program</TableHead>
        <TableHead className="w-[40%]">Penanggung Jawab</TableHead>
        <TableHead className="text-right w-[20%]">Aksi</TableHead>
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
          <TableCell className="text-right">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function KegiatanPage() {
  return (
    <DashboardLayout pageTitle="Manajemen Kegiatan UKM">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        UKM Essensial
                    </CardTitle>
                    <CardDescription>Daftar program inti yang mencakup pelayanan kesehatan primer, promosi kesehatan, dan pencegahan penyakit untuk masyarakat.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProgramTable programs={ukmEsensialPrograms} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                         UKM Pengembangan
                    </CardTitle>
                    <CardDescription>Inovasi dan pengembangan program kesehatan untuk menjawab tantangan baru dan kebutuhan spesifik di masyarakat.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProgramTable programs={ukmPengembanganPrograms} />
                </CardContent>
            </Card>
        </div>
    </DashboardLayout>
  );
}
