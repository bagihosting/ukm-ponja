
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { get, ref, update } from "firebase/database";
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
  const [formData, setFormData] = useState({ name: '', pic: '', position: '', description: '', avatar: '' });
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

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
          if (data[category]) {
            const programData = Object.entries(data[category]).find(([key]) => key === id);
            if (programData) {
              const [key, value] = programData;
              foundProgram = {
                id: key,
                ...(value as any),
                category: category as 'esensial' | 'pengembangan',
                dbPath: `programs/${category}/${key}`
              };
              break;
            }
          }
        }
        
        if (foundProgram) {
          setProgram(foundProgram);
          setFormData({
            name: foundProgram.name,
            pic: foundProgram.pic,
            position: foundProgram.position,
            description: foundProgram.description,
            avatar: foundProgram.avatar
          });
        } else {
           console.error(`Program with ID "${id}" not found.`);
           toast({
            title: "Program Tidak Ditemukan",
            description: `Program dengan ID "${id}" tidak dapat ditemukan di database.`,
            variant: "destructive",
          });
        }
      }
      setLoading(false);
    };

    fetchProgram();
  }, [id, toast]);

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const scaleSize = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
          
          canvas.width = img.width * scaleSize;
          canvas.height = img.height * scaleSize;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return reject(new Error('Could not get canvas context.'));
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          }, 'image/jpeg', 0.7);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };
  
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && program) {
      const file = e.target.files[0];
      setUploading(true);
      try {
        const compressedFile = await compressImage(file);
        
        // Show local preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({...prev, avatar: reader.result as string}));
        };
        reader.readAsDataURL(compressedFile);

        // Upload to storage in the background
        toast({ title: "Mengunggah foto...", description: "Mohon tunggu sebentar, proses berjalan di latar belakang." });
        const imageRef = storageRef(storage, `avatars/${program.id}-${Date.now()}-${compressedFile.name}`);
        const uploadResult = await uploadBytes(imageRef, compressedFile);
        const newAvatarUrl = await getDownloadURL(uploadResult.ref);
        
        // Once uploaded, update the form data with the actual URL
        setFormData(prev => ({ ...prev, avatar: newAvatarUrl }));
        toast({ title: "Sukses!", description: "Foto berhasil diunggah. Jangan lupa simpan perubahan." });

      } catch (error) {
        console.error("Image processing/upload error:", error);
        toast({
            title: "Gagal memproses/mengunggah gambar",
            description: "Terjadi kesalahan. Silakan coba gambar lain.",
            variant: "destructive",
        });
         // Revert to original avatar if upload fails
        setFormData(prev => ({ ...prev, avatar: program.avatar }));
      } finally {
        setUploading(false);
      }
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program) return;
    setSaving(true);
    
    try {
      const programRef = ref(database, program.dbPath);
      // The formData.avatar already contains the new URL if a new image was uploaded
      await update(programRef, {
        name: formData.name,
        pic: formData.pic,
        position: formData.position,
        description: formData.description,
        avatar: formData.avatar
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
                    disabled={saving || uploading}
                />
            </div>
            <div className="flex items-start gap-6">
              <div className="relative flex flex-col items-center gap-2">
                 <Avatar className="h-24 w-24">
                    {formData.avatar && <AvatarImage data-ai-hint="person photo" src={formData.avatar} alt={formData.pic} />}
                    <AvatarFallback>{formData.pic.charAt(0)}</AvatarFallback>
                </Avatar>
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                    <Loader className="h-8 w-8 animate-spin text-white" />
                  </div>
                )}
                <Button asChild variant="outline" size="sm" disabled={uploading || saving}>
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4"/>
                    Ganti Foto
                    <input id="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handleAvatarChange} disabled={uploading || saving} />
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
                    disabled={saving || uploading}
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
                    disabled={saving || uploading}
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
                disabled={saving || uploading}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push('/kegiatan')} disabled={saving || uploading}>
              Batal
            </Button>
            <Button type="submit" disabled={saving || uploading}>
              {(saving || uploading) && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {saving ? 'Menyimpan...' : (uploading ? 'Mengunggah...' : 'Simpan Perubahan')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardLayout>
  );
}
