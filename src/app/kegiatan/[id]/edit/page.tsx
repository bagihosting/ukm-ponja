
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader, ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// --- Placeholder Data ---
// Di aplikasi nyata, data ini akan diambil dari database
const allPrograms = [
    // UKM Esensial
    { id: "es1", name: "Promosi Kesehatan", pic: "Ahmad Subagja", avatar: "https://placehold.co/100x100.png", description: "Program untuk meningkatkan kesadaran masyarakat akan pentingnya kesehatan.", position: "Koordinator" },
    { id: "es2", name: "Kesehatan Ibu", pic: "Siti Aminah", avatar: "https://placehold.co/100x100.png", description: "Program untuk kesehatan ibu hamil dan menyusui.", position: "Spesialis" },
    { id: "es3", name: "Kesehatan Anak", pic: "Budi Santoso", avatar: "https://placehold.co/100x100.png", description: "Memastikan tumbuh kembang anak yang optimal.", position: "Koordinator" },
    { id: "es4", name: "UKS", pic: "Dewi Lestari", avatar: "https://placehold.co/100x100.png", description: "Usaha Kesehatan Sekolah di wilayah kerja.", position: "Pembina" },
    { id: "es5", name: "Kesehatan Remaja", pic: "Eka Wijaya", avatar: "https://placehold.co/100x100.png", description: "Edukasi dan layanan kesehatan untuk remaja.", position: "Konselor" },
    { id: "es6", name: "Kesehatan Reproduksi", pic: "Fitri Handayani", avatar: "https://placehold.co/100x100.png", description: "Program terkait kesehatan reproduksi dan keluarga berencana.", position: "Edukator" },
    { id: "es7", name: "Kesehatan Lansia", pic: "Gunawan Prasetyo", avatar: "https://placehold.co/100x100.png", description: "Menjaga kualitas hidup para lansia.", position: "Koordinator" },
    { id: "es8", name: "Gizi", pic: "Herlina Sari", avatar: "https://placehold.co/100x100.png", description: "Program perbaikan gizi masyarakat.", position: "Ahli Gizi" },
    { id: "es9", name: "Kesehatan Lingkungan", pic: "Indra Permana", avatar: "https://placehold.co/100x100.png", description: "Menciptakan lingkungan yang sehat dan bersih.", position: "Sanitarian" },
    { id: "es10", name: "TB", pic: "Joko Susilo", avatar: "https://placehold.co/100x100.png", description: "Penanggulangan penyakit Tuberkulosis.", position: "Analis" },
    { id: "es11", name: "HIV", pic: "Kartika Putri", avatar: "https://placehold.co/100x100.png", description: "Pencegahan dan penanggulangan HIV/AIDS.", position: "Konselor" },
    { id: "es12", name: "Kusta dan frambusia", pic: "Lia Kurnia", avatar: "https://placehold.co/100x100.png", description: "Eliminasi penyakit kusta dan frambusia.", position: "Petugas Lapangan" },
    { id: "es13", name: "Ispa", pic: "Muhammad Iqbal", avatar: "https://placehold.co/100x100.png", description: "Penanganan Infeksi Saluran Pernapasan Akut.", position: "Dokter" },
    { id: "es14", name: "Hepatitis", pic: "Nina Agustina", avatar: "https://placehold.co/100x100.png", description: "Program pencegahan dan pengendalian Hepatitis.", position: "Analis" },
    { id: "es15", name: "Diare", pic: "Oscar Mahendra", avatar: "https://placehold.co/100x100.png", description: "Penanggulangan penyakit diare.", position: "Petugas Surveilans" },
    { id: "es16", name: "Imunisasi", pic: "Putri Wulandari", avatar: "https://placehold.co/100x100.png", description: "Cakupan imunisasi dasar lengkap untuk anak.", position: "Koordinator Imunisasi" },
    { id: "es17", name: "Surveilans", pic: "Qori Ramadhan", avatar: "https://placehold.co/100x100.png", description: "Sistem kewaspadaan dini terhadap penyakit.", position: "Epidemiolog" },
    { id: "es18", name: "Penyakit tidak menular", pic: "Rina Melati", avatar: "https://placehold.co/100x100.png", description: "Pengendalian penyakit tidak menular seperti hipertensi dan diabetes.", position: "Koordinator PTM" },
    { id: "es19", name: "Kesehatan Indera", pic: "Surya Wijaya", avatar: "https://placehold.co/100x100.png", description: "Program kesehatan mata dan telinga.", position: "Spesialis" },
    { id: "es20", name: "Kesehatan Jiwa", pic: "Tia Permata", avatar: "https://placehold.co/100x100.png", description: "Layanan kesehatan mental dan jiwa.", position: "Psikolog" },
    { id: "es21", name: "Kanker", pic: "Umar Abdullah", avatar: "https://placehold.co/100x100.png", description: "Deteksi dini kanker serviks dan payudara.", position: "Koordinator" },
    { id: "es22", name: "P2BB (Penyakit bersumber Binatang)", pic: "Vina Lestari", avatar: "https://placehold.co/100x100.png", description: "Pengendalian penyakit yang bersumber dari binatang.", position: "Entomolog" },
    { id: "es23", name: "Perkesmas", pic: "Wahyu Nugroho", avatar: "https://placehold.co/100x100.png", description: "Perawatan Kesehatan Masyarakat.", position: "Perawat Komunitas" },
    { id: "es24", name: "PIS PK", pic: "Yulia Citra", avatar: "https://placehold.co/100x100.png", description: "Program Indonesia Sehat dengan Pendekatan Keluarga.", position: "Koordinator" },
    // UKM Pengembangan
    { id: "pg1", name: "Kesehatan kerja dan olahraga", pic: "Zainal Abidin", avatar: "https://placehold.co/100x100.png", description: "Program kesehatan bagi pekerja dan promosi olahraga.", position: "Spesialis" },
    { id: "pg2", name: "UKGS UKGMD", pic: "Agus Salim", avatar: "https://placehold.co/100x100.png", description: "Usaha Kesehatan Gigi Sekolah dan Masyarakat Desa.", position: "Dokter Gigi" },
    { id: "pg3", name: "Yankestrad", pic: "Citra Kirana", avatar: "https://placehold.co/100x100.png", description: "Pelayanan Kesehatan Tradisional.", position: "Terapis" },
    { id: "pg4", name: "Haji", pic: "Dedi Mulyadi", avatar: "https://placehold.co/100x100.png", description: "Pembinaan kesehatan bagi calon jamaah haji.", position: "Koordinator Haji" },
    { id: "pg5", name: "Ngider sehat", pic: "Farah Quinn", avatar: "https://placehold.co/100x100.png", description: "Program layanan kesehatan keliling.", position: "Petugas Lapangan" },
];
// --- End of Placeholder Data ---

type Program = {
  id: string;
  name: string;
  pic: string;
  avatar: string;
  description: string;
  position: string;
};

export default function EditKegiatanPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [program, setProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({ pic: '', position: '', description: '' });
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProgram = allPrograms.find(p => p.id === id) || null;
      if (foundProgram) {
        setProgram(foundProgram);
        setFormData({
          pic: foundProgram.pic,
          position: foundProgram.position,
          description: foundProgram.description
        });
        setAvatarPreview(foundProgram.avatar);
      }
      setLoading(false);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Di aplikasi nyata, di sini Anda akan mengirim data (termasuk file gambar) ke server
    console.log("Saving data:", { ...formData, newAvatar });

    setSaving(false);
    toast({
      title: "Sukses!",
      description: `Data untuk program "${program?.name}" berhasil diperbarui.`,
    });
    router.push("/kegiatan");
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="Memuat Data Program...">
        <div className="flex h-64 items-center justify-center">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!program) {
    return (
      <DashboardLayout pageTitle="Error">
        <Card>
          <CardHeader>
            <CardTitle>Program Tidak Ditemukan</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Program dengan ID "{id}" tidak dapat ditemukan.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/kegiatan')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Manajemen Kegiatan
            </Button>
          </CardFooter>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle={`Edit Program: ${program.name}`}>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Detail Program</CardTitle>
            <CardDescription>Ubah informasi penanggung jawab dan detail lainnya untuk program ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center gap-2">
                 <Avatar className="h-24 w-24">
                    {avatarPreview && <AvatarImage data-ai-hint="person photo" src={avatarPreview} alt={formData.pic} />}
                    <AvatarFallback>{formData.pic.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button asChild variant="outline" size="sm">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4"/>
                    Ganti Foto
                    <input id="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handleAvatarChange} />
                  </label>
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pic">Nama Penanggung Jawab</Label>
                  <Input 
                    id="pic"
                    name="pic"
                    value={formData.pic}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Jabatan</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Contoh: Koordinator, Spesialis"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Program</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Jelaskan secara singkat tentang program ini..."
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push('/kegiatan')} disabled={saving}>
              Batal
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardLayout>
  );
}
