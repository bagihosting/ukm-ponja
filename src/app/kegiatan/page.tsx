
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { get, ref } from "firebase/database";
import { database } from "@/lib/firebase";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Edit, Loader } from "lucide-react";

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
                <AvatarFallback>{program.pic ? program.pic.charAt(0) : '?'}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{program.pic}</div>
                <div className="text-sm text-muted-foreground">PIC</div>
              </div>
            </div>
          </TableCell>
          <TableCell className="text-right">
             <Button asChild variant="outline" size="sm">
              <Link href={`/kegiatan/${program.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default function KegiatanPage() {
  const [ukmEsensial, setUkmEsensial] = useState<Program[]>([]);
  const [ukmPengembangan, setUkmPengembangan] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      const programsRef = ref(database, 'programs');
      const snapshot = await get(programsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUkmEsensial(data.esensial || []);
        setUkmPengembangan(data.pengembangan || []);
      }
      setLoading(false);
    };

    fetchPrograms();
  }, []);

  return (
    <DashboardLayout pageTitle="Manajemen Kegiatan UKM">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader className="h-8 w-8 animate-spin" />
            <p className="ml-2">Memuat data program...</p>
          </div>
        ) : (
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
                      <ProgramTable programs={ukmEsensial} />
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
                      <ProgramTable programs={ukmPengembangan} />
                  </CardContent>
              </Card>
          </div>
        )}
    </DashboardLayout>
  );
}
