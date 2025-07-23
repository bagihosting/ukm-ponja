
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { get, ref, update, child } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "@/lib/firebase";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader, ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Program = {
  id: string;
  name: string;
  pic: string;
  avatar: string;
  description: string;
  position: string;
  category: 'esensial' | 'pengembangan';
  dbPath: string; // Full path to the item in DB
};

export default function EditKegiatanPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [program, setProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({ name: '', pic: '', position: '', description: '' });
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    
    const fetchProgram = async () => {
      setLoading(true);
      const programsRef = ref(database, 'programs');
      const snapshot = await get(programsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        let foundProgram: Program | null = null;
        
        for (const category of ['esensial', 'pengembangan']) {
            if (data[category] && data[category][id]) {
                foundProgram = {
                    id: id,
                    ...data[category][id],
                    category: category as 'esensial' | 'pengembangan',
                    dbPath: `programs/${category}/${id}`
                };
                break;
            }
        }
        
        if (foundProgram) {
          setProgram(foundProgram);
          setFormData({
            name: foundProgram.name,
            pic: foundProgram.pic,
            position: foundProgram.position,
            description: foundProgram.description
          });
          setAvatarPreview(foundProgram.avatar);
        }
      }
      setLoading(false);
    };

    fetchProgram();
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
    if (!program) return;
    setSaving(true);
    
    try {
      let newAvatarUrl = program.avatar;
      if (newAvatar) {
        const imageRef = storageRef(storage, `avatars/${program.id}-${newAvatar.name}`);
        const uploadResult = await uploadBytes(imageRef, newAvatar);
        newAvatarUrl = await getDownloadURL(uploadResult.ref);
      }

      const programRef = ref(database, program.dbPath);
      await update(programRef, {
        ...formData,
        avatar: newAvatarUrl
      });
      
      toast({
        title: "Sukses!",
        description: `Data untuk program "${formData.name}" berhasil diperbarui.`,
      });
      router.push("/kegiatan");

    } catch (error) {
        console.error("Firebase update error:", error);
        toast({
            title: "Gagal menyimpan data",
            description: "Terjadi kesalahan saat menyimpan perubahan ke server.",
            variant: "destructive",
        });
    } finally {
        setSaving(false);
    }
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
    <DashboardLayout pageTitle={`Edit Program: ${formData.name}`}>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Detail Program</CardTitle>
            <CardDescription>Ubah informasi penanggung jawab dan detail lainnya untuk program ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Nama Program</Label>
                <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama program"
                />
            </div>
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
