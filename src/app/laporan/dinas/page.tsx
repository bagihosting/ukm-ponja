
"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader, Upload, FileText, Download, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for now
const initialReports = [
  { id: '1', name: 'Laporan Bulanan - Januari 2024', date: '2024-02-01', url: '#' },
  { id: '2', name: 'Laporan Triwulan I 2024', date: '2024-04-05', url: '#' },
  { id: '3', name: 'Laporan Tahunan 2023', date: '2024-01-15', url: '#' },
];

export default function LaporanDinasPage() {
  const { toast } = useToast();
  const [reports, setReports] = useState(initialReports);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportName, setReportName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName || !file) {
      toast({
        title: "Input tidak lengkap",
        description: "Nama laporan dan file harus diisi.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newReport = {
      id: (reports.length + 1).toString(),
      name: reportName,
      date: new Date().toISOString().split('T')[0],
      url: '#', // In a real app, this would be the Firebase Storage URL
    };
    
    setReports(prev => [newReport, ...prev]);

    setIsSubmitting(false);
    setIsDialogOpen(false);
    setReportName("");
    setFile(null);
    toast({
      title: "Laporan Ditambahkan!",
      description: `Laporan "${reportName}" berhasil diunggah.`,
    });
  };

  return (
    <DashboardLayout pageTitle="Laporan ke Dinas">
        <div className="flex justify-end mb-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tambah Laporan Baru
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Unggah Laporan Baru</DialogTitle>
                    <DialogDescription>
                        Isi detail di bawah ini untuk menambahkan laporan baru ke arsip.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="reportName">Nama Laporan</Label>
                        <Input 
                            id="reportName"
                            placeholder="Contoh: Laporan Bulanan - Februari 2024"
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fileUpload">File Laporan</Label>
                        <Input 
                            id="fileUpload"
                            type="file"
                            onChange={handleFileChange}
                            disabled={isSubmitting}
                            accept=".pdf,.doc,.docx,.xls,.xlsx"
                        />
                        {file && <p className="text-sm text-muted-foreground">File dipilih: {file.name}</p>}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isSubmitting}>Batal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                            Simpan & Unggah
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Arsip Laporan</CardTitle>
          <CardDescription>Daftar semua laporan yang telah diunggah dan dikirimkan ke dinas terkait.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Nama Laporan</TableHead>
                <TableHead>Tanggal Unggah</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {report.name}
                  </TableCell>
                  <TableCell>{new Date(report.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Unduh
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
