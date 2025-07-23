
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { get, ref, push, set } from "firebase/database";
import { database } from "@/lib/firebase";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Edit, Loader, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Program = {
  id: string;
  name: string;
  pic: string;
  avatar: string;
  position: string;
  description: string;
};

const formSchema = z.object({
  name: z.string().min(3, { message: "Nama program harus diisi (minimal 3 karakter)." }),
  category: z.enum(["esensial", "pengembangan"], { required_error: "Kategori harus dipilih." }),
  pic: z.string().min(3, { message: "Nama penanggung jawab harus diisi." }),
  position: z.string().min(3, { message: "Jabatan harus diisi." }),
  description: z.string().min(10, { message: "Deskripsi harus diisi (minimal 10 karakter)." }),
});


const ProgramTable = ({ programs }: { programs: Program[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[30%]">Program</TableHead>
        <TableHead className="w-[30%]">Penanggung Jawab</TableHead>
        <TableHead>Deskripsi</TableHead>
        <TableHead className="text-right">Aksi</TableHead>
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
          <TableCell className="text-sm text-muted-foreground truncate max-w-xs">{program.description}</TableCell>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "esensial",
      pic: "",
      position: "",
      description: "",
    },
  });

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const categoryRef = ref(database, `programs/${values.category}`);
      const newProgramRef = push(categoryRef);
      await set(newProgramRef, {
        name: values.name,
        pic: values.pic,
        position: values.position,
        description: values.description,
        avatar: "https://placehold.co/100x100.png",
      });

      toast({
        title: "Program Ditambahkan!",
        description: `Program "${values.name}" berhasil dibuat.`,
      });
      
      form.reset();
      setIsDialogOpen(false);
      fetchPrograms(); // Re-fetch data to show the new program
    } catch (error) {
      console.error(error);
      toast({
        title: "Gagal Menambahkan Program",
        description: "Terjadi kesalahan saat menyimpan data ke server.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <DashboardLayout pageTitle="Manajemen Kegiatan UKM">
        <div className="flex justify-end mb-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tambah Program
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Tambah Program Kegiatan Baru</DialogTitle>
                    <DialogDescription>
                        Isi detail di bawah ini untuk menambahkan program baru ke UKM Esensial atau Pengembangan.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nama Program</FormLabel>
                                <FormControl>
                                    <Input placeholder="Contoh: Promosi Kesehatan" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kategori</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori program" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="esensial">UKM Esensial</SelectItem>
                                        <SelectItem value="pengembangan">UKM Pengembangan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="pic"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Penanggung Jawab</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama lengkap PIC" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Jabatan</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Koordinator" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Deskripsi Singkat</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Jelaskan secara singkat tujuan dari program ini..."
                                    className="resize-none"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" disabled={isSubmitting}>Batal</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                Simpan Program
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
          </Dialog>
        </div>
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
