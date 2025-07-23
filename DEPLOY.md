
# Panduan Deployment Aplikasi di Ubuntu 22.04

Dokumen ini menjelaskan langkah-langkah untuk melakukan deployment aplikasi Next.js ini di server Ubuntu 22.04.

## 1. Persiapan Server

Hubungkan ke server Anda melalui SSH dan pastikan semuanya terbaru.

```bash
sudo apt update && sudo apt upgrade -y
```

### Instalasi Node.js

Aplikasi Next.js membutuhkan Node.js. Sebaiknya instal versi LTS terbaru.

```bash
# Mengunduh dan menjalankan skrip setup NodeSource untuk Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Menginstal Node.js dan npm
sudo apt-get install -y nodejs
```

Verifikasi instalasi:
```bash
node -v # Seharusnya menampilkan v20.x.x
npm -v
```

### Instalasi Git

Anda akan memerlukan Git untuk mengkloning repositori proyek Anda.

```bash
sudo apt install -y git
```

### Instalasi PM2 (Process Manager)

PM2 adalah manajer proses untuk aplikasi Node.js yang akan menjaga aplikasi Anda tetap berjalan.

```bash
sudo npm install -g pm2
```

## 2. Setup Aplikasi

### Kloning Repositori

Kloning kode aplikasi Anda dari repositori Git. Ganti `<URL_REPOSITORI_ANDA>` dengan URL Git Anda.

```bash
git clone <URL_REPOSITORI_ANDA>
cd <NAMA_DIREKTORI_PROYEK>
```

### Instalasi Dependensi

Instal semua paket yang dibutuhkan oleh proyek.

```bash
npm install
```

### Konfigurasi Environment Variables

Buat file `.env.local` untuk menyimpan variabel lingkungan, seperti kredensial Firebase.

```bash
nano .env.local
```

Salin dan tempel konfigurasi Firebase Anda ke dalam file ini. Contohnya seperti ini (gunakan nilai Anda sendiri dari `src/lib/firebase.ts`):

```
NEXT_PUBLIC_FIREBASE_API_KEY="API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="PROJECT_ID.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_DATABASE_URL="https://PROJECT_ID.firebaseio.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="PROJECT_ID.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="APP_ID"
```

Simpan file dengan menekan `Ctrl+X`, lalu `Y`, dan `Enter`.

### Build Aplikasi

Buat versi produksi dari aplikasi Anda.

```bash
npm run build
```

## 3. Menjalankan Aplikasi dengan PM2

Jalankan aplikasi Anda menggunakan PM2. Ini akan memulai aplikasi di latar belakang. Secara default, Next.js berjalan di port 3000.

```bash
pm2 start npm --name "ukm-ponja-app" -- start
```

Untuk memastikan PM2 memulai aplikasi secara otomatis setelah server reboot:

```bash
pm2 startup
# Salin dan jalankan perintah yang dihasilkan oleh pm2 startup
pm2 save
```

## 4. Konfigurasi Nginx sebagai Reverse Proxy

Nginx akan bertindak sebagai "pintu depan" untuk aplikasi Anda.

### Instalasi Nginx

```bash
sudo apt install -y nginx
```

### Konfigurasi Firewall

Izinkan lalu lintas HTTP dan HTTPS.

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Buat File Konfigurasi Nginx

Buat file konfigurasi baru untuk situs Anda. Ganti `domainanda.com` dengan nama domain atau alamat IP server Anda.

```bash
sudo nano /etc/nginx/sites-available/ukm-ponja
```

Salin dan tempel konfigurasi berikut ke dalam file tersebut:

```nginx
server {
    listen 80;
    server_name domainanda.com www.domainanda.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Aktifkan Konfigurasi

Buat tautan simbolis ke direktori `sites-enabled` untuk mengaktifkan konfigurasi Anda.

```bash
sudo ln -s /etc/nginx/sites-available/ukm-ponja /etc/nginx/sites-enabled/
```

Hapus konfigurasi default jika perlu:
```bash
sudo rm /etc/nginx/sites-enabled/default
```

Uji konfigurasi Nginx:

```bash
sudo nginx -t
```

Jika tidak ada error, restart Nginx untuk menerapkan perubahan:

```bash
sudo systemctl restart nginx
```

Selesai! Aplikasi Anda sekarang seharusnya dapat diakses melalui nama domain atau alamat IP server Anda. Untuk keamanan tambahan, sangat disarankan untuk menginstal sertifikat SSL/TLS menggunakan Certbot.
