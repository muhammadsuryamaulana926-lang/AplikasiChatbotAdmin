# 🤖 Aplikasi Chatbot Admin

Aplikasi admin panel untuk mengelola chatbot, pengguna, database, dan riwayat chat. Dibangun dengan React + Vite dan menggunakan MySQL sebagai database.

## ✨ Fitur Utama

- 📊 **Dashboard** - Statistik real-time pengguna, chat, dan database
- 👥 **Manajemen Pengguna** - CRUD pengguna dengan status aktif/tidak aktif
- 💾 **API Database Manager** - Import data dari API eksternal ke MySQL
- 💬 **Riwayat Chat** - Monitoring percakapan chat secara real-time
- 🎨 **Multi-tema** - 10+ tema warna yang dapat disesuaikan
- 🌐 **Multi-bahasa** - Mendukung Bahasa Indonesia dan Inggris
- 🤖 **Chatbot Widget** - Asisten AI dengan multi-API fallback

## 🚀 Teknologi

- **Frontend**: React 18, Vite, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Real-time**: Socket.io
- **AI APIs**: DeepSeek, Groq, Gemini, OpenRouter, Cohere, HuggingFace, DeepInfra

## 📋 Prasyarat

- Node.js (v16 atau lebih tinggi)
- MySQL (v8 atau lebih tinggi)
- npm atau yarn

## 🛠️ Instalasi

1. **Clone repository**
```bash
git clone https://github.com/muhammadsuryamaulana926-lang/AplikasiChatbotAdmin.git
cd AplikasiChatbotAdmin
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Edit file `.env` dan sesuaikan konfigurasi:
```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:3000

# AI API Keys (Optional - untuk chatbot widget)
VITE_DEEPSEEK_API_KEY=your_api_key_here
VITE_GROQ_API_KEY=your_api_key_here
VITE_GEMINI_API_KEY=your_api_key_here
# ... dan seterusnya
```

4. **Setup database**

Buat database MySQL dan jalankan script SQL yang diperlukan (lihat dokumentasi backend).

5. **Jalankan aplikasi**

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm run preview
```

## 📱 Cara Menggunakan

### Login
- Email: admin@example.com
- Password: (sesuai konfigurasi backend)

### Dashboard
- Lihat statistik pengguna, chat, dan database
- Grafik pengguna (mingguan/bulanan/tahunan)
- Top 5 chat tren

### Manajemen Pengguna
1. Klik "**+ Tambah Pengguna**" untuk menambah pengguna baru
2. Isi form: Nama, Email, No HP, Password
3. Klik "**Edit**" untuk mengubah data pengguna
4. Toggle switch untuk mengaktifkan/menonaktifkan pengguna
5. Klik "**Hapus**" untuk menghapus pengguna

### API Database Manager
1. Klik "**+ Import dari API**"
2. Isi Nama Koneksi dan API URL
3. (Opsional) Masukkan API Key jika diperlukan
4. Klik "**Preview Data**" untuk melihat data
5. Isi Nama Database
6. Klik "**Import to Database**"

### Riwayat Chat
- Pilih chat dari daftar di sebelah kiri
- Lihat detail percakapan di sebelah kanan
- Indikator "Live" menunjukkan chat real-time

## 🎨 Tema

Aplikasi mendukung 10+ tema warna:
- Default (Biru)
- Purple Dream
- Ocean Blue
- Forest Green
- Sunset Orange
- Rose Pink
- Midnight Dark
- Dan lainnya...

Ubah tema melalui menu pengaturan di sidebar.

## 🌐 Multi-bahasa

Aplikasi mendukung:
- 🇮🇩 Bahasa Indonesia
- 🇬🇧 English

Ubah bahasa melalui menu pengaturan di sidebar.

## 🤖 Chatbot Widget

Chatbot widget menggunakan multiple AI APIs dengan fallback otomatis:
1. DeepSeek
2. Groq (Llama 3.3)
3. Google Gemini
4. OpenRouter
5. Cohere
6. HuggingFace
7. DeepInfra

Jika satu API gagal, otomatis beralih ke API berikutnya.

## 📚 Dokumentasi Lengkap

Lihat file-file dokumentasi berikut untuk informasi lebih detail:
- `DOKUMENTASI_PROYEK_PKL.md` - Dokumentasi lengkap proyek
- `PEMAKAIANAPLIKASI.MD` - Panduan penggunaan aplikasi
- `WEBSOCKET_SETUP.md` - Setup WebSocket untuk real-time chat
- `CARA_JALANKAN_MOBILE_APP.md` - Panduan menjalankan versi mobile

## 🔒 Keamanan

- API keys disimpan di environment variables (`.env`)
- File `.env` tidak di-commit ke repository
- Gunakan `.env.example` sebagai template
- Pastikan tidak membagikan API keys Anda

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:
1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dibuat untuk keperluan PKL (Praktik Kerja Lapangan).

## 👨‍💻 Developer

Muhammad Surya Maulana

## 📞 Kontak

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

⭐ Jangan lupa beri star jika proyek ini bermanfaat!
