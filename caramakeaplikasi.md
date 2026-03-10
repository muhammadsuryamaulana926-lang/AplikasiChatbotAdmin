# PANDUAN PEMAKAIAN APLIKASI
# SISTEM CHATBOT AI — MANAJEMEN DATA KEKAYAAN INTELEKTUAL

> **Panduan ini ditujukan untuk:** Pengguna akhir aplikasi mobile, administrator sistem, dan pembimbing PKL/penguji.
> Dokumen ini menjelaskan setiap layar, tombol, dan fitur secara rinci lengkap dengan contoh penggunaan nyata.

---

## DAFTAR ISI

- [BAGIAN 1 — APLIKASI MOBILE (Pengguna)](#bagian-1--aplikasi-mobile-pengguna)
  - [1.1 Layar Loading](#11-layar-loading)
  - [1.2 Layar Login](#12-layar-login)
  - [1.3 Alur Registrasi (3 Langkah)](#13-alur-registrasi-3-langkah)
  - [1.4 Lupa Password](#14-lupa-password)
  - [1.5 Layar Chat Utama](#15-layar-chat-utama)
  - [1.6 Sidebar Menu & Riwayat Chat](#16-sidebar-menu--riwayat-chat)
  - [1.7 Pengaturan Akun](#17-pengaturan-akun)
  - [1.8 Pengaturan Tema](#18-pengaturan-tema)
  - [1.9 Edit Profil](#19-edit-profil)

---

═══════════════════════════════════════════════════════════════════
# BAGIAN 1 — APLIKASI MOBILE (Pengguna)
═══════════════════════════════════════════════════════════════════

> Aplikasi mobile digunakan oleh **pengguna akhir** untuk berinteraksi dengan chatbot AI.
> Tersedia untuk Android dan iOS, dibangun dengan React Native + Expo.

---

## 1.1 Layar Loading

### Tampilan Layar
Layar hitam/putih dengan **logo aplikasi** di tengah dan **animasi loading spinner** di bawahnya. Tidak ada tombol — layar ini muncul otomatis selama 1–2 detik.

### Yang Terjadi di Balik Layar
Saat layar loading muncul, aplikasi secara otomatis:
1. Mengecek apakah ada token login tersimpan di perangkat
2. Jika token ditemukan → memverifikasi ke server apakah masih valid
3. Jika valid → langsung masuk ke **Layar Chat** (tanpa perlu login ulang)
4. Jika tidak ada token / token kedaluwarsa → diarahkan ke **Layar Login**

### Catatan untuk Pengguna
Pengguna tidak perlu melakukan apa pun pada layar ini. Layar ini bersifat otomatis.

---

## 1.2 Layar Login

### Tampilan Layar
Layar dengan latar belakang bergradasi. Di bagian atas terdapat **logo dan nama aplikasi**. Di tengah terdapat form login, dan di bawah terdapat tautan ke halaman registrasi dan lupa password.

### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Kolom Email** | Input teks | Tempat mengetik alamat email yang sudah terdaftar |
| **Kolom Password** | Input kata sandi | Tempat mengetik password; teks tersembunyi secara default |
| **Ikon Mata (👁)** | Tombol ikon | Arahkan kursor/tahan untuk menampilkan password; lepas untuk menyembunyikan kembali |
| **Tombol MASUK** | Tombol utama (biru) | Memproses login dengan data yang diisi |
| **Tautan "Lupa password?"** | Tautan teks | Membuka alur reset password |
| **Tautan "Buat akun"** | Tautan teks | Membuka halaman registrasi langkah pertama |

### Langkah Penggunaan
1. Ketik alamat email pada kolom **Email** (contoh: `john.doe@itb.ac.id`)
2. Ketik password pada kolom **Password**
3. Tekan **MASUK**
4. Jika berhasil → aplikasi langsung masuk ke Layar Chat
5. Jika gagal → muncul pesan error di bawah form

### Contoh Pesan Error

| Kondisi | Pesan yang Muncul |
|---|---|
| Email tidak diisi | *"Email wajib diisi"* |
| Password tidak diisi | *"Password wajib diisi"* |
| Email/password salah | *"Email atau password tidak valid"* |
| Akun dinonaktifkan | Modal khusus muncul: *"Akun Anda telah dinonaktifkan. Hubungi administrator."* |

### Catatan
- Setelah login berhasil, token disimpan di perangkat sehingga pengguna **tidak perlu login ulang** setiap kali membuka aplikasi.
- Token berlaku selama **30 hari**.

---

## 1.3 Alur Registrasi (3 Langkah)

Registrasi terdiri dari tiga layar yang harus diselesaikan secara berurutan.

---

### Langkah 1 — Input Email (`SignUpEmailScreen`)

#### Tampilan Layar
Layar sederhana dengan judul **"Daftar Akun Baru"**, kolom input email, dan tombol lanjut. Terdapat tombol kembali di pojok kiri atas.

#### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Tombol ← (kembali)** | Tombol ikon | Kembali ke layar Login |
| **Kolom Email** | Input teks | Tempat mengetik alamat email baru |
| **Tombol LANJUTKAN** | Tombol utama (biru) | Memeriksa email dan mengirim kode OTP |

#### Langkah Penggunaan
1. Ketik alamat email yang ingin didaftarkan (contoh: `budi.santoso@gmail.com`)
2. Tekan **LANJUTKAN**
3. Sistem memeriksa apakah email sudah terdaftar:
   - Jika sudah → muncul error *"Email sudah terdaftar"*
   - Jika belum → sistem mengirim **kode OTP 6 digit** ke email tersebut
4. Jika kode berhasil dikirim → otomatis pindah ke Langkah 2

#### Contoh
```
Input  : budi.santoso@itb.ac.id
Hasil  : Kode OTP dikirim ke budi.santoso@itb.ac.id
         Subjek email: "Kode Verifikasi OTP"
         Isi: "Kode OTP Anda adalah: 847291 (berlaku 5 menit)"
```

---

### Langkah 2 — Verifikasi OTP (`VerificationCodeScreen`)

#### Tampilan Layar
Layar dengan judul **"Verifikasi Email"** dan keterangan email tujuan. Di tengah terdapat **6 kotak input** untuk memasukkan kode OTP satu per satu. Di bawahnya ada tombol kirim ulang kode dengan timer hitung mundur.

#### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Tombol ← (kembali)** | Tombol ikon | Kembali ke Langkah 1 |
| **6 Kotak OTP** | Input angka | Setiap kotak diisi 1 digit; fokus berpindah otomatis ke kotak berikutnya |
| **Tombol VERIFIKASI** | Tombol utama (biru) | Mengirim kode ke server untuk diperiksa |
| **Tombol "Kirim ulang kode"** | Tautan teks | Aktif setelah timer 60 detik habis; mengirim OTP baru ke email |
| **Timer hitung mundur** | Teks | Menampilkan sisa waktu sebelum tombol kirim ulang aktif |

#### Langkah Penggunaan
1. Buka email yang didaftarkan dan cari email dengan subjek **"Kode Verifikasi OTP"**
2. Lihat kode 6 digit di email (contoh: `847291`)
3. Ketik setiap angka ke kotak yang tersedia — kursor berpindah otomatis
4. Setelah semua terisi, tekan **VERIFIKASI**
5. Jika kode benar → pindah ke Langkah 3
6. Jika kode salah atau kedaluwarsa → muncul pesan error

#### Contoh Pesan Error

| Kondisi | Pesan |
|---|---|
| Kode salah | *"Kode verifikasi tidak valid"* |
| Kode kedaluwarsa (> 5 menit) | *"Kode telah kedaluwarsa. Kirim ulang kode."* |

#### Catatan
Jika kode tidak kunjung datang, cek folder **Spam/Junk** di email. Jika sudah 60 detik tidak ada, tekan **"Kirim ulang kode"**.

---

### Langkah 3 — Input Nama & Password (`SignUpPasswordScreen`)

#### Tampilan Layar
Layar dengan judul **"Lengkapi Akun"**. Terdapat kolom nama, kolom password, kolom konfirmasi password, dan indikator kekuatan password.

#### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Tombol ← (kembali)** | Tombol ikon | Kembali ke Langkah 2 |
| **Kolom Nama Lengkap** | Input teks | Nama yang akan ditampilkan di profil |
| **Kolom Password** | Input kata sandi | Password baru (min. 8 karakter) |
| **Ikon Mata (👁) Password** | Tombol ikon | Tampilkan/sembunyikan password |
| **Indikator Kekuatan Password** | Bar warna | Merah = lemah, Kuning = sedang, Hijau = kuat |
| **Kolom Konfirmasi Password** | Input kata sandi | Ketik ulang password untuk memastikan kecocokan |
| **Tombol DAFTAR** | Tombol utama (biru) | Membuat akun dan langsung masuk ke aplikasi |

#### Aturan Password
- Minimal **8 karakter**
- Mengandung **huruf besar** (A–Z)
- Mengandung **huruf kecil** (a–z)
- Mengandung **angka** (0–9)

#### Langkah Penggunaan
1. Ketik nama lengkap (contoh: `Budi Santoso`)
2. Ketik password yang memenuhi aturan di atas
3. Lihat indikator kekuatan — pastikan sudah **hijau**
4. Ketik ulang password di kolom konfirmasi
5. Tekan **DAFTAR**
6. Jika berhasil → akun dibuat dan langsung masuk ke Layar Chat

#### Contoh
```
Nama     : Budi Santoso
Password : BudiKI@2024
Konfirmasi: BudiKI@2024
Hasil    : ✅ Akun berhasil dibuat, masuk ke halaman chat
```

---

## 1.4 Lupa Password

### Alur Umum
Lupa password menggunakan 2 layar: input email dan reset password baru.

---

### Layar 1 — Input Email (`ForgotPasswordEmailScreen`)

#### Tampilan Layar
Layar dengan judul **"Lupa Password"**, kolom email, dan tombol kirim kode.

#### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Tombol ← (kembali)** | Tombol ikon | Kembali ke layar Login |
| **Kolom Email** | Input teks | Email akun yang ingin direset passwordnya |
| **Tombol KIRIM KODE** | Tombol utama | Mengirim OTP reset password ke email |

#### Langkah Penggunaan
1. Ketik email yang sudah terdaftar
2. Tekan **KIRIM KODE**
3. Cek email → kode OTP 6 digit dikirim
4. Jika email belum terdaftar → muncul error *"Email tidak ditemukan"*

---

### Layar 2 — Reset Password (`ResetPasswordScreen`)

#### Tampilan Layar
Layar dengan **6 kotak OTP**, kolom password baru, kolom konfirmasi, dan tombol simpan.

#### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **6 Kotak OTP** | Input angka | Masukkan kode OTP dari email |
| **Kolom Password Baru** | Input kata sandi | Password pengganti yang baru |
| **Kolom Konfirmasi Password** | Input kata sandi | Ketik ulang password baru |
| **Tombol SIMPAN PASSWORD** | Tombol utama | Menyimpan password baru dan kembali ke Login |

#### Langkah Penggunaan
1. Masukkan kode OTP dari email
2. Ketik password baru (ikuti aturan password)
3. Ketik ulang password di kolom konfirmasi
4. Tekan **SIMPAN PASSWORD**
5. Jika berhasil → diarahkan kembali ke layar Login untuk masuk dengan password baru

---

## 1.5 Layar Chat Utama (`ChatScreen`)

Ini adalah layar **paling utama** dan paling sering digunakan. Semua interaksi dengan AI chatbot terjadi di sini.

### Tampilan Layar
Layar dibagi menjadi tiga bagian utama:
- **Header** di bagian atas (bar navigasi)
- **Area percakapan** di tengah (daftar pesan)
- **Area input** di bagian bawah (kolom ketik + tombol kirim)

---

### Header (Bagian Atas)

#### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Ikon ☰ (hamburger/menu)** | Tombol ikon — kiri | Membuka sidebar riwayat chat dari sisi kiri layar |
| **Nama Aplikasi** | Teks judul — tengah | Menampilkan nama aplikasi (tidak dapat ditekan) |
| **Foto Profil / Ikon Pengguna** | Tombol ikon — kanan | Membuka halaman Pengaturan Akun |

---

### Area Percakapan (Tengah)

#### Welcome Screen (Chat Baru)
Saat belum ada percakapan, area tengah menampilkan **animasi selamat datang** dengan teks panduan seperti:
> *"Halo! Saya siap membantu. Silakan ajukan pertanyaan tentang data Kekayaan Intelektual."*

#### Tampilan Pesan Saat Ada Percakapan

| Elemen | Keterangan |
|---|---|
| **Bubble biru (kanan)** | Pesan yang dikirim oleh pengguna |
| **Bubble abu-abu (kiri)** | Jawaban dari chatbot AI |
| **Timestamp** | Waktu pengiriman ditampilkan di bawah setiap bubble (format: 14:30) |
| **Ikon sumber** | `📊` = jawaban dari database; `🤖` = jawaban dari AI |
| **Date separator** | Garis pemisah dengan label "Hari ini", "Kemarin", atau tanggal spesifik |

#### Tombol/Interaksi pada Pesan

| Aksi | Cara | Hasil |
|---|---|---|
| **Salin pesan** | Tekan lama (long press) pada bubble chat | Teks otomatis tersalin ke clipboard; muncul notifikasi *"Pesan tersalin"* |

#### Indikator Loading
Saat AI sedang memproses pertanyaan, muncul **tiga titik beranimasi** (•••) di bubble abu-abu sebelah kiri — menandakan chatbot sedang mengetik jawaban.

#### Tombol Scroll ke Bawah
Saat pengguna menggulir ke atas untuk melihat pesan lama, muncul **tombol panah bawah (↓)** di pojok kanan bawah area percakapan. Tekan untuk langsung lompat ke pesan terbaru.

---

### Area Input (Bagian Bawah)

#### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Kolom teks input** | Input teks multiline | Tempat mengetik pertanyaan; bisa menekan Enter untuk baris baru |
| **Tombol × (hapus teks)** | Tombol ikon — dalam kolom | Muncul saat ada teks; menghapus semua teks dalam kolom sekaligus |
| **Tombol 🎤 (mikrofon)** | Tombol ikon | Mengaktifkan input suara; rekam pertanyaan lisan dalam Bahasa Indonesia |
| **Tombol ➤ (kirim)** | Tombol bulat biru | Mengirim pesan ke chatbot; aktif hanya jika kolom tidak kosong |
| **Tombol ✕ (batal)** | Tombol ikon merah | Muncul saat AI sedang memproses; membatalkan permintaan yang sedang berjalan |

---

### Cara Menggunakan Chat — Langkah demi Langkah

#### Mengirim Pertanyaan (Teks)
1. Ketuk kolom teks di bagian bawah
2. Ketik pertanyaan (contoh: `"Berapa total paten tahun 2023?"`)
3. Tekan tombol **➤ (kirim)**
4. Bubble biru (pesan Anda) muncul di kanan
5. Tiga titik animasi muncul — menandakan AI sedang memproses
6. Jawaban AI muncul di bubble abu-abu sebelah kiri

#### Contoh Percakapan Nyata
```
Pengguna : "Berapa total paten tahun 2023?"
Chatbot  : 📊 45

Pengguna : "Tampilkan datanya"
Chatbot  : 📊 Menampilkan 1–10 dari 45 data:
           1. Sistem Monitoring Kualitas Air Berbasis IoT
              Jenis: Paten | Status: Tersertifikasi
              Tanggal: 15 Januari 2023 | Inventor: Dr. Ahmad Fauzi
           2. Metode Deteksi Dini Penyakit Tanaman
              ...
           Masih ada 35 data. Ketik "lanjut" untuk melihat berikutnya.

Pengguna : "lanjut"
Chatbot  : 📊 Menampilkan 11–20 dari 45 data: ...

Pengguna : "3"
Chatbot  : 📊 Detail paten nomor 3:
           Judul       : Metode Ekstraksi Minyak Nabati Ramah Lingkungan
           Jenis       : Paten
           Status      : Tersertifikasi
           Tgl Daftar  : 20 Maret 2023
           No Sertifikat: IDP000067891
           Inventor    : Prof. Budi Santoso (FTMD), Ir. Citra Dewi (STEI)
           Abstrak     : ...
```

#### Menggunakan Input Suara
1. Tekan tombol **🎤 (mikrofon)**
2. Izinkan akses mikrofon jika diminta
3. Ucapkan pertanyaan dengan jelas dalam Bahasa Indonesia
4. Hentikan perekaman (otomatis atau tekan tombol stop)
5. Teks hasil transkripsi otomatis muncul di kolom input
6. Periksa teks — edit jika perlu — lalu tekan **➤ (kirim)**

#### Contoh Input Suara
```
Ucapan  : "Tampilkan daftar hak cipta dari fakultas FMIPA"
Teks    : "Tampilkan daftar hak cipta dari fakultas FMIPA"
Chatbot : 📊 Menampilkan 1–10 dari 23 data hak cipta FMIPA: ...
```

#### Pertanyaan Analisis Khusus

```
Pengguna : "ada duplikat judul?"
Chatbot  : 🤖 Ditemukan 3 judul dengan pemilik berbeda:
           1. Sistem Monitoring Suhu Real-Time
              Pemilik: Dr. Ahmad | Prof. Budi
           ...
           ⚠️ Potensi konflik kepemilikan. Disarankan verifikasi lebih lanjut.

Pengguna : "ki tanpa inventor"
Chatbot  : 📊 Ditemukan 12 KI tanpa data inventor:
           1. Sistem ABC (P00202300456)
           ...

Pengguna : "breakdown KI per jenis"
Chatbot  : 📊 Breakdown berdasarkan jenis_ki:
           1. Paten         : 156
           2. Hak Cipta     : 89
           3. Desain Industri: 34
           4. Merek         : 23
           Total            : 302
```

---

## 1.6 Sidebar Menu & Riwayat Chat

### Cara Membuka Sidebar
- Tekan tombol **☰ (hamburger)** di pojok kiri atas header, **ATAU**
- Geser layar dari tepi kiri ke kanan (swipe gesture)

### Tampilan Sidebar
Panel yang muncul dari sisi kiri layar. Berisi logo aplikasi, tombol chat baru, dan daftar percakapan sebelumnya.

---

### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Logo + Nama Aplikasi** | Tampilan | Identitas aplikasi di bagian atas sidebar |
| **Tombol "+ Percakapan Baru"** | Tombol hijau | Memulai sesi chat kosong baru; chat yang sedang aktif disimpan otomatis |
| **Daftar riwayat chat** | List item | Semua percakapan sebelumnya, diurutkan dari yang terbaru |
| **Judul chat** | Teks di tiap item | Judul diambil otomatis dari pertanyaan pertama pengguna |
| **Timestamp relatif** | Teks kecil | "5 menit lalu", "Kemarin", "12 Jan 2024" |
| **Ikon 📌 (pin)** | Ikon — muncul setelah swipe | Chat yang di-pin selalu muncul di bagian atas |
| **Tombol × (hapus)** | Tombol merah — muncul setelah long press | Menghapus chat dari riwayat |
| **Tombol tutup (×)** | Pojok kanan atas sidebar | Menutup sidebar kembali |

---

### Cara Menggunakan Sidebar

#### Membuka Chat Lama
1. Buka sidebar
2. Cari chat yang ingin dilanjutkan dari daftar
3. Ketuk item chat tersebut
4. Semua pesan dalam percakapan itu dimuat kembali
5. Ketik pertanyaan lanjutan seperti biasa

#### Men-pin Chat Penting
1. Buka sidebar
2. Pada item chat yang ingin di-pin, **geser ke kanan** perlahan
3. Tombol **📌 (pin)** muncul di sisi kiri
4. Tekan tombol **📌**
5. Chat berpindah ke bagian **"Disematkan"** di atas daftar

Untuk melepas pin: ulangi langkah yang sama — tombol berubah menjadi **"Lepas Pin"**.

#### Mengedit Judul Chat
1. Buka sidebar
2. **Ketuk judul chat** yang ingin diubah
3. Judul berubah menjadi kolom teks yang bisa diedit
4. Ubah teks sesuai keinginan
5. Tekan **Enter** atau ketuk di luar kolom untuk menyimpan

#### Menghapus Chat
1. Buka sidebar
2. **Tekan lama (long press)** pada item chat
3. Terdengar suara + getaran sebagai konfirmasi
4. Modal konfirmasi muncul: *"Hapus percakapan ini? Tindakan ini tidak dapat dibatalkan."*
5. Tekan **HAPUS** untuk menghapus, atau **BATAL** untuk membatalkan

#### Contoh Tampilan Sidebar
```
┌─────────────────────────────┐
│  🤖 Asisten Chatbot AI      │
│                             │
│  [+ Percakapan Baru]        │
│                             │
│  📌 DISEMATKAN              │
│  ┌─────────────────────┐    │
│  │ 📌 Data Paten 2023  │    │
│  │    Kemarin          │    │
│  └─────────────────────┘    │
│                             │
│  PERCAKAPAN LAINNYA         │
│  ┌─────────────────────┐    │
│  │ Inventor Terbanyak  │    │
│  │    5 menit lalu     │    │
│  ├─────────────────────┤    │
│  │ Hak Cipta FMIPA     │    │
│  │    12 Jan 2024      │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

---

## 1.7 Pengaturan Akun (`AccountSettingsScreen`)

### Cara Membuka
Tekan **foto profil / ikon pengguna** di pojok kanan atas header layar chat.

### Tampilan Layar
Layar dengan foto profil besar di atas, nama dan email pengguna, lalu daftar menu pengaturan.

### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Foto Profil** | Gambar bulat (dapat ditekan) | Membuka pilihan ganti foto (kamera / galeri) |
| **Ikon Kamera (📷)** | Ikon kecil di atas foto | Shortcut untuk mengganti foto profil |
| **Nama Pengguna** | Teks | Menampilkan nama yang tersimpan |
| **Email** | Teks | Menampilkan email akun |
| **Menu "Edit Profil"** | Item menu | Membuka halaman edit nama dan email |
| **Menu "Pengaturan Tema"** | Item menu | Membuka halaman pilihan tema tampilan |
| **Menu "Kebijakan Privasi"** | Item menu | Membuka halaman kebijakan privasi |
| **Menu "Syarat & Ketentuan"** | Item menu | Membuka halaman syarat dan ketentuan |
| **Tombol KELUAR** | Tombol merah | Logout dari akun; muncul modal konfirmasi terlebih dahulu |

### Cara Mengganti Foto Profil
1. Ketuk **foto profil** atau **ikon kamera (📷)**
2. Muncul pilihan:
   - **Ambil Foto** — membuka kamera perangkat
   - **Pilih dari Galeri** — membuka galeri foto
3. Pilih/ambil foto
4. Foto dapat di-crop menjadi format persegi
5. Tekan **Simpan** / **Gunakan Foto**
6. Foto profil langsung berubah di seluruh aplikasi

### Cara Logout
1. Gulir ke bawah → tekan **KELUAR**
2. Muncul modal: *"Apakah Anda yakin ingin keluar?"*
3. Tekan **YA, KELUAR** untuk konfirmasi
4. Diarahkan kembali ke layar Login

---

## 1.8 Pengaturan Tema (`ThemeSettingsScreen`)

### Cara Membuka
Dari **Pengaturan Akun** → ketuk **"Pengaturan Tema"**

### Tampilan Layar
Layar dengan daftar kartu tema yang dapat dipilih. Tema yang sedang aktif ditandai dengan **ikon centang (✓)** atau border berwarna.

### Pilihan Tema

| Nama Tema | Warna Utama | Karakter |
|---|---|---|
| **Light** (default) | Putih & Biru | Bersih, profesional, nyaman di siang hari |
| **Dark** | Hitam & Biru Terang | Hemat baterai, nyaman di malam hari |
| **Spongebob** | Kuning & Oranye | Ceria, penuh warna |
| **Doraemon** | Biru & Merah | Bulat, ramah, nostalgik |

### Cara Mengganti Tema
1. Buka halaman Pengaturan Tema
2. Ketuk kartu tema yang diinginkan
3. Tema langsung berubah **secara real-time** tanpa perlu restart aplikasi
4. Tanda centang berpindah ke tema yang baru dipilih
5. Preferensi disimpan otomatis — tema tetap sama walaupun aplikasi ditutup dan dibuka kembali

### Contoh Perubahan
```
Sebelum : Tema Light (latar putih, teks hitam)
Pilih   : Tema Dark
Setelah : Seluruh tampilan berubah → latar hitam, teks putih, aksen biru terang
```

---

## 1.9 Edit Profil (`EditProfileScreen`)

### Cara Membuka
Dari **Pengaturan Akun** → ketuk **"Edit Profil"**

### Tampilan Layar
Layar dengan kolom nama dan email yang sudah terisi dengan data saat ini, serta tombol simpan.

### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Tombol ← (kembali)** | Tombol ikon | Kembali ke Pengaturan Akun tanpa menyimpan |
| **Kolom Nama** | Input teks | Edit nama tampilan |
| **Kolom Email** | Input teks | Edit alamat email (memerlukan verifikasi OTP baru) |
| **Tombol SIMPAN PERUBAHAN** | Tombol utama biru | Menyimpan perubahan ke database |

### Cara Mengedit Nama
1. Hapus nama lama di kolom **Nama**
2. Ketik nama baru (contoh: `Dr. Budi Santoso`)
3. Tekan **SIMPAN PERUBAHAN**
4. Nama langsung berubah di seluruh aplikasi

### Cara Mengedit Email
1. Ubah teks di kolom **Email**
2. Tekan **SIMPAN PERUBAHAN**
3. Sistem mengirim OTP ke email **baru** untuk verifikasi
4. Masukkan kode OTP yang diterima
5. Email berhasil diperbarui

---

═══════════════════════════════════════════════════════════════════
# BAGIAN 2 — PANEL ADMIN WEB (Administrator)
═══════════════════════════════════════════════════════════════════

> Panel Admin digunakan oleh **administrator** untuk memantau dan mengelola seluruh sistem chatbot.
> Diakses melalui browser web (Chrome, Firefox, Edge) di komputer atau laptop.
> URL: `http://localhost:5173` (development) atau URL server yang dikonfigurasi.

---

## 2.1 Layar Login Admin

### Tampilan Layar
Halaman login dengan latar belakang animasi gradasi. Di sisi kiri terdapat **ilustrasi chatbot AI**, di sisi kanan terdapat **form login**. Di atas form tertera logo dan nama aplikasi.

### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Kolom Email** | Input teks | Masukkan email administrator |
| **Kolom Password** | Input kata sandi | Masukkan password administrator |
| **Ikon Mata (👁) — hover** | Efek hover | Arahkan kursor ke ikon untuk melihat password |
| **Tombol MASUK** | Tombol utama biru | Memproses login admin |

### Langkah Penggunaan
1. Buka browser dan akses URL panel admin
2. Masukkan email admin: `chatbotaiasistent@gmail.com`
3. Masukkan password admin
4. Klik **MASUK**
5. Jika berhasil → diarahkan ke halaman Dashboard

### Catatan Penting
- Hanya akun dengan email `chatbotaiasistent@gmail.com` yang dapat masuk
- Session berlaku **30 menit**; setelah itu akan otomatis logout dan diminta login ulang

### Contoh Pesan Error

| Kondisi | Pesan |
|---|---|
| Email bukan admin | *"Akses ditolak. Hanya admin yang dapat login."* |
| Password salah | *"Email atau password tidak valid"* |
| Session kedaluwarsa | Otomatis diarahkan kembali ke halaman login |

---

## 2.2 Navigasi Sidebar (Semua Halaman)

### Tampilan
Sidebar vertikal di sisi kiri layar yang selalu terlihat di semua halaman (kecuali login). Berisi logo, menu navigasi, dan tombol logout.

### Daftar Menu & Fungsi

| Menu | Ikon | Fungsi |
|---|---|---|
| **Dashboard** | 📊 | Halaman utama dengan statistik dan grafik |
| **Manajemen Pengguna** | 👥 | Kelola data semua pengguna yang terdaftar |
| **Riwayat Chat** | 💬 | Lihat semua percakapan pengguna dengan chatbot |
| **Pengaturan DB** | 🗄️ | Konfigurasi database lokal yang digunakan chatbot |
| **Import Database API** | 🔌 | Import data dari API eksternal |
| **API Keys** | 🔑 | Kelola API keys untuk provider AI |
| **Tombol Logout** | 🚪 | Keluar dari sesi admin |

### Fitur Sidebar Collapsible
- Klik **tombol ← (collapse)** di sisi sidebar untuk **menyempitkan** sidebar menjadi hanya ikon
- Klik tombol **→ (expand)** untuk mengembalikan sidebar ke ukuran penuh
- Berguna untuk memperluas area kerja di layar kecil

### Tooltip
Saat sidebar dalam mode collapsed (hanya ikon), arahkan kursor ke ikon untuk melihat **tooltip** nama menu.

---

## 2.3 Dashboard

### Cara Membuka
Klik menu **Dashboard** di sidebar, atau akses URL `/` setelah login.

### Tampilan Layar
Halaman yang dibagi menjadi beberapa bagian: baris kartu statistik di atas, lalu dua kolom grafik di bawahnya.

---

### Bagian 1 — Kartu Statistik (4 Kartu)

Empat kartu berjajar di bagian atas dashboard. Data diperbarui **secara real-time**.

| Kartu | Ikon | Isi |
|---|---|---|
| **Total Pengguna** | 👤 | Jumlah total semua akun yang terdaftar |
| **Chat Hari Ini** | 💬 | Jumlah pesan yang dikirim hari ini (user + bot) |
| **Pengguna Aktif** | ✅ | Jumlah akun dengan status aktif |
| **Total Database** | 🗄️ | Jumlah database yang sudah diimport/terhubung |

#### Contoh Tampilan
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  👤           │ │  💬           │ │  ✅           │ │  🗄️           │
│ Total        │ │ Chat Hari    │ │ Pengguna     │ │ Total        │
│ Pengguna     │ │ Ini          │ │ Aktif        │ │ Database     │
│              │ │              │ │              │ │              │
│    127       │ │     43       │ │    119       │ │      5       │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

---

### Bagian 2 — Grafik Pengguna Baru (Bar Chart)

#### Tampilan
Grafik batang (bar chart) berwarna **hijau** yang menunjukkan jumlah pengguna baru per periode waktu.

#### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Judul "Pengguna Baru"** | Teks | Label grafik |
| **Tombol "Mingguan"** | Tombol filter | Tampilkan data per hari dalam 7 hari terakhir |
| **Tombol "Bulanan"** | Tombol filter | Tampilkan data per minggu dalam bulan ini |
| **Tombol "Tahunan"** | Tombol filter | Tampilkan data per bulan dalam tahun ini |
| **Batang grafik** | Interaktif | Arahkan kursor ke batang untuk melihat angka pasti |
| **Tooltip** | Popup | Muncul saat hover pada batang; menampilkan nilai |

#### Cara Menggunakan
1. Klik salah satu tombol filter (**Mingguan / Bulanan / Tahunan**)
2. Grafik langsung berubah menampilkan data sesuai periode
3. Arahkan kursor ke batang untuk melihat angka detail

#### Contoh
```
Filter: Mingguan
Sumbu X: Sen | Sel | Rab | Kam | Jum | Sab | Min
Sumbu Y: 0 — 10

Batang: Sen=3, Sel=7, Rab=2, Kam=5, Jum=8, Sab=1, Min=0
```

---

### Bagian 3 — Top 5 Pertanyaan Populer

#### Tampilan
Daftar 5 pertanyaan yang paling sering diajukan oleh pengguna, dilengkapi badge ranking (1–5) dan jumlah kemunculan.

#### Contoh Tampilan
```
Top 5 Chat Tren

1️⃣  "berapa total paten 2023"           ── 47 kali
2️⃣  "tampilkan paten terbaru"           ── 38 kali
3️⃣  "inventor terbanyak per fakultas"   ── 29 kali
4️⃣  "ki tanpa inventor"                 ── 21 kali
5️⃣  "breakdown ki per jenis"            ── 18 kali
```

---

### Bagian 4 — Grafik Tren Chat (Line Chart)

#### Tampilan
Grafik garis (line chart) berwarna **biru** yang menunjukkan jumlah pesan per periode.

#### Daftar Elemen & Tombol

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Tombol "Mingguan"** | Tombol filter | Data per hari dalam 7 hari terakhir |
| **Tombol "Bulanan"** | Tombol filter | Data per bulan dalam tahun ini |
| **Garis grafik** | Interaktif | Arahkan kursor ke titik untuk detail |
| **Tooltip** | Popup | Nilai detail saat hover |

---

### Real-time Update
Dashboard memperbarui data **secara otomatis** tanpa perlu me-refresh halaman ketika:
- Ada pengguna baru mendaftar
- Ada percakapan baru dibuat
- Ada pesan baru dikirim

---

## 2.4 Manajemen Pengguna

### Cara Membuka
Klik menu **Manajemen Pengguna (👥)** di sidebar.

### Tampilan Layar
Halaman dengan header, search bar, tombol tambah, dan tabel daftar pengguna.

---

### Area Atas (Header & Search)

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Judul "Manajemen Pengguna"** | Teks | Nama halaman |
| **Kolom Pencarian 🔍** | Input teks | Cari pengguna secara real-time berdasarkan nama, email, atau nomor HP |
| **Tombol ✕ (hapus pencarian)** | Tombol ikon | Muncul saat ada teks di kolom pencarian; hapus filter pencarian |
| **Tombol "+ Tambah Pengguna"** | Tombol hijau | Membuka modal form tambah pengguna baru |

---

### Tabel Pengguna

Tabel menampilkan semua pengguna dengan kolom berikut:

| Kolom | Keterangan |
|---|---|
| **ID** | Nomor unik pengguna di database |
| **Nama** | Nama lengkap (atau "-" jika belum diisi) |
| **Email** | Alamat email akun |
| **No HP** | Nomor telepon (atau "-" jika belum diisi) |
| **Status Akun** | Badge hijau "Aktif", merah "Tidak Aktif", atau biru "Admin" |
| **Tanggal Bergabung** | Format: "1 Januari 2025" |
| **Aksi** | Dropdown menu berisi opsi aksi |

---

### Tombol di Kolom Aksi (Dropdown per Baris)

Klik ikon **⋮ (tiga titik)** atau tombol aksi di kolom paling kanan untuk melihat opsi:

| Opsi | Fungsi |
|---|---|
| **👁 Lihat Detail** | Membuka modal yang menampilkan semua informasi pengguna (read-only) |
| **✏️ Edit** | Membuka modal form edit data pengguna |
| **🔄 Aktifkan / Nonaktifkan** | Mengubah status akun; muncul modal konfirmasi |
| **🗑️ Hapus** | Menghapus akun pengguna; muncul modal konfirmasi |

---

### Cara Menambah Pengguna Baru
1. Klik **"+ Tambah Pengguna"**
2. Modal form terbuka dengan field kosong:
   - **Nama**: isi nama lengkap
   - **Email**: isi alamat email (wajib, harus unik)
   - **No HP**: isi nomor telepon (opsional)
   - **Status**: toggle switch Aktif/Tidak Aktif
3. Klik **SIMPAN**
4. Pengguna baru muncul di tabel semua admin yang sedang online (real-time)
5. Muncul notifikasi hijau: *"Pengguna berhasil ditambahkan!"*

#### Contoh
```
Nama   : Siti Rahayu
Email  : siti.rahayu@itb.ac.id
No HP  : 081234567890
Status : Aktif

→ Klik SIMPAN
→ Muncul di baris pertama tabel
```

---

### Cara Mengedit Pengguna
1. Temukan pengguna di tabel (gunakan pencarian jika perlu)
2. Klik **⋮ → ✏️ Edit**
3. Modal terbuka dengan data pengguna yang sudah terisi
4. Ubah field yang ingin diperbarui
5. Klik **SIMPAN**
6. Data langsung berubah di tabel

---

### Cara Mengaktifkan / Menonaktifkan Pengguna
1. Klik **⋮ → 🔄 Aktifkan** atau **🔄 Nonaktifkan**
2. Modal konfirmasi: *"Ubah status pengguna ini menjadi [Aktif/Tidak Aktif]?"*
3. Klik **KONFIRMASI**
4. Badge status berubah warna di tabel
5. Pengguna yang **Tidak Aktif tidak dapat login** ke aplikasi mobile

---

### Cara Menghapus Pengguna
1. Klik **⋮ → 🗑️ Hapus**
2. Modal konfirmasi: *"Hapus pengguna [nama]? Tindakan ini tidak dapat dibatalkan."*
3. Klik **HAPUS**
4. Pengguna hilang dari tabel semua admin yang online

> ⚠️ **Perhatian:** Akun administrator (`chatbotaiasistent@gmail.com`) **tidak dapat dihapus** dan tidak dapat dinonaktifkan. Opsi Hapus tidak akan muncul untuk akun ini.

---

### Cara Menggunakan Pencarian
1. Klik kolom **🔍 Cari pengguna...**
2. Ketik kata kunci (nama, email, atau status)
3. Tabel langsung difilter **secara real-time** tanpa menekan Enter

#### Contoh
```
Ketik: "siti"
Hasil: Hanya menampilkan pengguna dengan nama/email yang mengandung "siti"

Ketik: "aktif"
Hasil: Hanya menampilkan pengguna dengan status aktif

Ketik: "081"
Hasil: Hanya menampilkan pengguna dengan nomor HP yang dimulai/mengandung 081
```

---

## 2.5 Riwayat Chat

### Cara Membuka
Klik menu **Riwayat Chat (💬)** di sidebar.

### Tampilan Layar
Halaman dibagi menjadi **dua kolom**:
- **Kolom kiri** (≈35% lebar): Daftar semua percakapan
- **Kolom kanan** (≈65% lebar): Isi percakapan yang dipilih

---

### Kolom Kiri — Daftar Chat

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Search bar 🔍** | Input teks | Cari chat berdasarkan email pengguna atau judul chat |
| **Item chat** | List item (dapat diklik) | Setiap item menampilkan email pengguna, judul, dan tanggal |
| **Highlight biru** | Visual | Chat yang sedang dibuka ditandai dengan background biru |
| **Jumlah chat** | Teks kecil | Menampilkan total jumlah percakapan yang ditemukan |

---

### Kolom Kanan — Detail Percakapan

#### Jika Belum Ada Chat Dipilih
Menampilkan ilustrasi kosong dengan teks: *"Pilih percakapan untuk melihat detailnya"*

#### Jika Chat Sudah Dipilih

| Elemen | Keterangan |
|---|---|
| **Header** | Email pengguna + judul percakapan |
| **Bubble biru (kanan)** | Pesan dari pengguna |
| **Bubble abu-abu (kiri)** | Jawaban dari chatbot |
| **Timestamp** | Waktu pengiriman setiap pesan (HH:MM) |
| **Format markdown** | Teks tebal, daftar bernomor, dan poin ditampilkan dengan rapi |
| **Auto-scroll** | Halaman otomatis menggulir ke pesan terbaru saat chat dibuka |

---

### Cara Menggunakan Riwayat Chat

#### Mencari Percakapan Tertentu
1. Ketik di **Search bar** kolom kiri
2. Cari berdasarkan email: contoh `siti.rahayu@itb.ac.id`
3. Atau cari berdasarkan judul: contoh `paten 2023`
4. Daftar langsung difilter secara real-time

#### Melihat Isi Percakapan
1. Klik item chat di kolom kiri
2. Seluruh percakapan dimuat di kolom kanan
3. Gulir ke atas untuk melihat pesan lebih lama

#### Contoh Tampilan Detail Chat
```
Email: siti.rahayu@itb.ac.id
Judul: "Total paten FMIPA 2023"

─────────────────────────────────
14:20  [Siti Rahayu]
       "Berapa total paten dari FMIPA tahun 2023?"

14:21  [Chatbot]
       📊 12

14:21  [Siti Rahayu]
       "Tampilkan daftarnya"

14:22  [Chatbot]
       📊 Menampilkan 1–10 dari 12 data:
       1. Sistem Sensor Tanah Berbasis IoT
          Inventor: Dr. Ahmad (FMIPA)
          Status  : Tersertifikasi
       ...
─────────────────────────────────
```

---

### Panel Statistik Chat (Atas Kolom Kiri)
Di bagian atas kolom kiri, terdapat dua angka ringkasan:
- **Chat Hari Ini** — jumlah pesan yang dikirim hari ini
- **Pertanyaan Populer** — jumlah pertanyaan yang dianalisis

---

## 2.6 Manajemen Database API (Import)

### Cara Membuka
Klik menu **Import Database API (🔌)** di sidebar.

### Tampilan Layar
Halaman dengan tabel database yang sudah diimport di bagian bawah, dan tombol **"+ Import dari API"** di bagian atas.

---

### Tabel Database yang Sudah Diimport

Menampilkan semua database yang telah berhasil diimport:

| Kolom | Keterangan |
|---|---|
| **Nama Database** | Nama yang diberikan saat import |
| **Sumber API** | URL API sumber data (dipotong jika terlalu panjang) |
| **API Key** | Ditampilkan sebagian saja (contoh: `Bearer eyJhbGc...`) untuk keamanan |
| **Total Records** | Jumlah baris data yang berhasil diimport |
| **Tanggal Import** | Format: "01/01/2025, 14:30" |
| **Status** | Badge hijau "Tersedia" |

---

### Cara Mengimport Database dari API Baru

#### Langkah 1 — Buka Modal Import
Klik tombol **"+ Import dari API"** (tombol hijau di kanan atas).

Modal besar terbuka dengan **dua kolom**: kiri untuk konfigurasi, kanan untuk preview.

---

#### Langkah 2 — Isi Konfigurasi (Kolom Kiri)

| Field | Keterangan | Wajib? |
|---|---|---|
| **Nama Koneksi** | Label identifikasi untuk database ini | Ya |
| **API URL** | Alamat URL endpoint API yang mengembalikan data JSON | Ya |
| **API Key / Bearer Token** | Token autentikasi jika API memerlukan auth | Tidak |

> 💡 Sistem otomatis menambahkan `"Bearer "` di depan API key jika diperlukan.

#### Contoh Isi
```
Nama Koneksi : data_ki_2024
API URL      : https://api.example.com/kekayaan-intelektual
API Key      : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

#### Langkah 3 — Preview Data
Klik tombol **"Preview Data"** (tombol hijau di bawah form konfigurasi).

Sistem akan:
1. Mengambil data dari URL API yang diisi
2. Menganalisis struktur data secara otomatis
3. Menampilkan hasil di **kolom kanan**:

```
Preview Data:
✅ Preview berhasil! Ditemukan 150 records

Total Records : 150
Detected Field: data

Kolom yang Terdeteksi:
[id] [judul] [jenis_ki] [inventor] [fakultas] [tgl_pendaftaran]

Sample Data (1 record):
{
  "id": 1,
  "judul": "Sistem Monitoring Suhu Real-Time",
  "jenis_ki": "Paten",
  "inventor": "Dr. Ahmad Fauzi",
  "fakultas": "FMIPA",
  "tgl_pendaftaran": "2023-01-15"
}
```

Jika ada error (URL salah, API key tidak valid):
```
❌ Error: Failed to fetch data from API. Periksa URL dan API Key.
```

---

#### Langkah 4 — Import ke Database

1. Setelah preview berhasil, isi field **"Nama Database"** di kolom kanan
2. Klik tombol **"Import to Database"** (tombol biru)
3. Sistem akan:
   - Mengambil **semua data** dari API
   - Membuat tabel baru di MySQL dengan nama yang diisi
   - Memasukkan semua data (diproses bertahap/chunked)
4. Muncul pesan sukses:
```
✅ Import berhasil! 150 data telah diimport ke database "data_ki_2024"
```
5. Database baru muncul di tabel bawah

---

## 2.7 Pengaturan Database Lokal (`AppSettings`)

### Cara Membuka
Klik menu **Pengaturan DB (🗄️)** di sidebar.

### Fungsi Halaman
Halaman ini mengelola **database mana yang aktif** — yaitu database yang akan di-query oleh chatbot saat pengguna bertanya.

### Tampilan Layar
Daftar semua database yang tersedia dengan toggle atau checkbox untuk mengaktifkan/menonaktifkan.

### Aturan Penting
- Maksimal **5 database** dapat diaktifkan sekaligus
- Chatbot akan **mencari ke semua database yang aktif** secara paralel
- Jika data ditemukan di lebih dari 1 database, pengguna akan diminta memilih

### Cara Mengaktifkan Database
1. Cari database yang ingin diaktifkan di daftar
2. Klik **toggle** atau **checkbox** di samping nama database
3. Klik **Simpan Konfigurasi**
4. Chatbot langsung menggunakan database yang baru dipilih

---

## 2.8 Manajemen API Keys

### Cara Membuka
Klik menu **API Keys (🔑)** di sidebar.

### Fungsi Halaman
Mengelola API keys untuk provider AI (Groq, Gemini, OpenRouter, dll). Sistem menggunakan fallback otomatis — jika provider utama tidak merespons, sistem beralih ke provider berikutnya.

### Tampilan Layar
Tabel daftar API keys yang sudah dikonfigurasi.

### Tabel API Keys

| Kolom | Keterangan |
|---|---|
| **Nama** | Label untuk API key (contoh: "Groq Primary") |
| **Provider** | Nama layanan AI (groq, gemini, openrouter, dll) |
| **API Key** | Ditampilkan tersembunyi (masked) untuk keamanan |
| **Model** | Nama model yang digunakan |
| **Status** | Toggle aktif/nonaktif |
| **Aksi** | Tombol Edit dan Hapus |

### Daftar Elemen & Tombol

| Elemen | Fungsi |
|---|---|
| **Tombol "+ Tambah API Key"** | Membuka form tambah API key baru |
| **Toggle Status** | Aktifkan atau nonaktifkan API key tertentu |
| **Tombol ✏️ Edit** | Mengubah nama, key, atau model |
| **Tombol 🗑️ Hapus** | Menghapus API key (muncul konfirmasi) |

### Cara Menambah API Key Baru
1. Klik **"+ Tambah API Key"**
2. Isi form:
   - **Nama**: label deskriptif (contoh: `Groq Backup`)
   - **Provider**: pilih dari daftar (groq, gemini, openrouter, mistral, cohere, huggingface)
   - **API Key**: paste API key dari dashboard provider
   - **Model**: nama model (contoh: `llama-3.3-70b-versatile`)
   - **URL**: endpoint API
   - **Status**: aktif/nonaktif
3. Klik **SIMPAN**

### Urutan Prioritas Fallback
Provider dicoba **dari atas ke bawah** sesuai urutan di tabel. Jika provider pertama gagal (timeout/error), sistem otomatis mencoba provider berikutnya.

---

## 2.9 Chatbot Widget (Terintegrasi di Admin)

### Cara Membuka
Klik tombol **"💬 Chat"** yang selalu terlihat di **pojok kanan bawah** semua halaman panel admin.

### Fungsi
Administrator dapat langsung berinteraksi dengan chatbot tanpa harus membuka aplikasi mobile.

### Tampilan
Jendela chat berukuran sedang (500×700 piksel) muncul di pojok kanan bawah, di atas halaman yang sedang dibuka.

---

### Daftar Elemen & Tombol Widget

| Elemen | Jenis | Fungsi |
|---|---|---|
| **Header widget** | Bar atas | Menampilkan nama "Asisten Chatbot AI" + status online |
| **Tombol × (tutup)** | Pojok kanan atas | Menutup/menyembunyikan jendela chat |
| **Area percakapan** | Scrollable | Menampilkan semua pesan dalam sesi ini |
| **Animasi kosong** | Animasi unik | Muncul saat belum ada pesan; berbeda untuk tiap tema |
| **Kolom input** | Input teks | Tempat mengetik pertanyaan |
| **Placeholder animasi** | Efek typing | Contoh pertanyaan yang berubah-ubah otomatis |
| **Tombol ••• (tema)** | Tombol ikon dalam input | Membuka menu pilihan tema dan opsi hapus pesan |
| **Tombol kirim ➤** | Tombol bulat | Mengirim pesan |

---

### Menu Tema Widget (Tombol •••)

Klik tombol **•••** di dalam kolom input untuk membuka menu:

| Opsi | Fungsi |
|---|---|
| **Modern** | Tema biru gradasi (default) |
| **Dark** | Tema gelap dengan aksen ungu/pink |
| **Minimal** | Tema hitam putih, bersih |
| **Pink** | Tema merah muda, ceria |
| **SpongeBob** | Tema kuning-biru dengan animasi bouncy |
| **─── (garis pemisah)** | Pemisah visual |
| **Hapus Pesan** | Masuk ke mode hapus pesan |

---

### Cara Menggunakan Mode Hapus Pesan
1. Klik **••• → Hapus Pesan**
2. Checkbox muncul di setiap bubble pesan
3. Centang pesan yang ingin dihapus
4. Di atas input muncul bar aksi:
   - **"Hapus Terpilih (n)"** — hapus pesan yang sudah dicentang
   - **"Hapus Semua"** — hapus seluruh percakapan (muncul konfirmasi)
   - **"Batal"** — keluar dari mode hapus tanpa menghapus apa pun

---

═══════════════════════════════════════════════════════════════════
# BAGIAN 3 — BACKEND (Developer / Teknisi)
═══════════════════════════════════════════════════════════════════

> Bagian ini menjelaskan cara berinteraksi dengan backend server melalui API dan konfigurasi.
> Ditujukan untuk **developer** atau **teknisi** yang mengelola server.

---

## 3.1 Menjalankan Backend Server

### Prasyarat
- Node.js v18 atau lebih baru
- MySQL 8.0 atau lebih baru (sudah berjalan)
- File `.env` sudah diisi dengan API keys

### Langkah Menjalankan

```bash
# Masuk ke folder backend
cd chatbot-backend

# Install dependencies (hanya pertama kali atau setelah ada update)
npm install

# Jalankan server
npm start

# Output yang muncul jika berhasil:
# ✅ Server berjalan di port 3000
# ✅ Terhubung ke database chatbot_db
# ✅ WebSocket siap
```

### Verifikasi Server Aktif
Buka browser dan akses: `http://localhost:3000/health`

Jika server aktif, akan muncul respons:
```json
{ "status": "ok", "uptime": 12345 }
```

---

## 3.2 Konfigurasi File Penting

### File `.env` — API Keys

File ini berisi semua API keys yang dibutuhkan sistem. **Jangan di-commit ke Git.**

```
# Isi file .env:
DEEPGRAM_API_KEY=dg_xxxxxxxxxxxxxx        ← Voice-to-text
GROQ_API_KEY=gsk_xxxxxxxxxxxxxx           ← AI utama (paling cepat)
GEMINI_API_KEY=AIzaxxxxxxxxxxxxxx         ← AI backup 1
MISTRAL_API_KEY=xxxxxxxxxxxxxx            ← AI backup 2
COHERE_API_KEY=xxxxxxxxxxxxxx             ← AI backup 3
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxx     ← AI backup 4
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxx   ← AI backup 5
```

Cara mendapatkan API key:
- **Groq**: console.groq.com → API Keys
- **Gemini**: aistudio.google.com → API Keys
- **Deepgram**: console.deepgram.com → API Keys

---

### File `active-db.json` — Database Aktif

Berisi daftar nama database yang sedang aktif digunakan chatbot.

```json
{
  "activeDatabases": ["itb_db", "data_ki_2024"]
}
```

**Cara mengubah**: Gunakan halaman **Pengaturan DB** di Panel Admin (tidak perlu edit manual).

---

### File `db-connections.json` — Koneksi Database

Berisi konfigurasi koneksi semua database yang tersedia.

```json
[
  {
    "name": "itb_db",
    "host": "localhost",
    "port": 3306,
    "database": "itb_db",
    "user": "root",
    "password": "password123"
  }
]
```

**Cara menambah database baru**: Gunakan halaman **Import Database API** di Panel Admin atau endpoint `/api/databases`.

---

## 3.3 Endpoint API Utama

Semua endpoint menggunakan base URL: `http://localhost:3000`

---

### Autentikasi

| Method | Endpoint | Fungsi | Body |
|---|---|---|---|
| POST | `/api/auth/register/send-code` | Kirim OTP ke email | `{ email }` |
| POST | `/api/auth/register/verify` | Verifikasi OTP + buat akun | `{ email, otp, nama, password }` |
| POST | `/api/auth/login` | Login | `{ email, password }` |
| POST | `/api/auth/google-login` | Login dengan Google | `{ idToken }` |
| POST | `/api/auth/verify-token` | Cek validitas token | `{ token }` |
| POST | `/api/auth/forgot-password/send-code` | Kirim OTP reset password | `{ email }` |
| POST | `/api/auth/reset-password` | Reset password | `{ email, otp, password }` |

#### Contoh Request Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@itb.ac.id", "password": "Password123"}'
```

#### Contoh Response Sukses
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 42,
    "email": "user@itb.ac.id",
    "nama": "Budi Santoso"
  }
}
```

---

### Chatbot

| Method | Endpoint | Fungsi | Body |
|---|---|---|---|
| POST | `/api/query` | Kirim pertanyaan ke chatbot | `{ question, userId, userEmail, socketId? }` |
| POST | `/api/confirmation` | Konfirmasi pilihan pengguna | `{ userId, choice }` |
| POST | `/api/database-selection` | Pilih database jika ada hasil ganda | `{ userId, databaseName }` |

#### Contoh Request Query
```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"question": "Berapa total paten 2023?", "userId": "42", "userEmail": "user@itb.ac.id"}'
```

#### Contoh Response
```json
{
  "success": true,
  "result": "📊 45",
  "source": "database",
  "queryInfo": {
    "database": "itb_db",
    "sql": "SELECT COUNT(*) as total FROM kekayaan_intelektual WHERE jenis_ki LIKE '%Paten%' AND YEAR(tgl_pendaftaran) = 2023"
  }
}
```

---

### Chat History

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/chat/save` | Simpan chat baru |
| PUT | `/api/chat/update` | Update chat yang ada |
| GET | `/api/chat/history/:email` | Ambil riwayat chat per user |
| GET | `/api/chat-history/:id/messages` | Ambil pesan dalam satu chat |
| DELETE | `/api/chat-history/:id` | Hapus chat |

---

### Manajemen User (Admin)

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/users` | Ambil semua user |
| POST | `/api/users` | Tambah user baru |
| PUT | `/api/users/:id` | Update data user |
| DELETE | `/api/users/:id` | Hapus user |
| PATCH | `/api/users/:id/status` | Ubah status aktif/nonaktif |

---

### Database Management

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/databases` | Daftar semua database |
| GET | `/api/databases/active` | Daftar database aktif |
| POST | `/api/databases/set-active` | Set database aktif |
| POST | `/api/databases/test` | Test koneksi database |
| POST | `/api/databases/preview-api-v2` | Preview data dari API eksternal |
| POST | `/api/databases/import-from-api-v2` | Import database dari API |

---

### Voice-to-Text

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/voice-to-text` | Upload audio → terima transkrip |

#### Cara Penggunaan
```bash
curl -X POST http://localhost:3000/api/voice-to-text \
  -F "audio=@/path/ke/audio.webm"
```

#### Response
```json
{
  "success": true,
  "transcript": "Berapa total paten dari fakultas FMIPA tahun 2023?",
  "confidence": 0.94
}
```

---

## 3.4 WebSocket Events

Backend menggunakan **Socket.IO** untuk komunikasi real-time. Koneksi ke `ws://localhost:3000`.

### Events dari Server ke Client

| Event | Kapan Dikirim | Data |
|---|---|---|
| `processing` | Saat query sedang diproses | `{ status, message: "Menganalisis pertanyaan..." }` |
| `completed` | Saat query selesai | `{ status, result }` |
| `error` | Saat terjadi error | `{ status, error }` |
| `heartbeat` | Setiap 25 detik | `{ timestamp }` |
| `user_added` | Saat admin tambah user | `{ id, email, nama, ... }` |
| `user_updated` | Saat admin edit user | Data user terbaru |
| `user_deleted` | Saat admin hapus user | `{ userId }` |
| `user_status_changed` | Saat status user diubah | `{ userId, status }` |
| `new_chat` | Saat chat baru dibuat | Metadata chat |
| `new_message` | Saat pesan baru dikirim | Data pesan |

### Contoh Penggunaan di Frontend
```javascript
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

// Dengarkan progress query
socket.on("processing", (data) => {
  console.log(data.message); // "Menganalisis pertanyaan..."
});

socket.on("completed", (data) => {
  console.log(data.result); // Jawaban chatbot
});

// Kirim query dengan socketId
fetch("/api/query", {
  method: "POST",
  body: JSON.stringify({
    question: "Berapa total paten?",
    userId: "42",
    userEmail: "user@itb.ac.id",
    socketId: socket.id  // ← sertakan untuk terima progress
  })
});
```

---

## 3.5 Struktur Database MySQL

### Database `chatbot_db` (Utama)

```sql
-- Tabel pengguna
CREATE TABLE users (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  email          VARCHAR(255) UNIQUE NOT NULL,
  kata_sandi     VARCHAR(255) NOT NULL,       -- Tersimpan dalam bentuk hash bcrypt
  nama           VARCHAR(255),
  telepon        VARCHAR(20),
  foto_profil    VARCHAR(255),
  status         ENUM('active','inactive') DEFAULT 'active',
  google_id      VARCHAR(255),
  dibuat_pada    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  diperbarui_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel kode OTP
CREATE TABLE kode_otp (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  email          VARCHAR(255) NOT NULL,
  kode           VARCHAR(6) NOT NULL,
  tipe           ENUM('signup','forgot') NOT NULL,
  digunakan      BOOLEAN DEFAULT FALSE,
  kadaluarsa_pada DATETIME NOT NULL,
  dibuat_pada    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel riwayat chat (metadata)
CREATE TABLE riwayat_chat (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  user_email     VARCHAR(255) NOT NULL,
  judul          VARCHAR(255) NOT NULL,
  dibuat_pada    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  diperbarui_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
);

-- Tabel pesan chat
CREATE TABLE pesan_chat (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  riwayat_chat_id   INT NOT NULL,
  peran             ENUM('user','assistant') NOT NULL,
  konten            TEXT NOT NULL,
  sumber            VARCHAR(50),               -- 'database' atau 'ai'
  dibuat_pada       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (riwayat_chat_id) REFERENCES riwayat_chat(id) ON DELETE CASCADE
);
```

---

## 3.6 Troubleshooting Backend

| Masalah | Penyebab Umum | Solusi |
|---|---|---|
| `Cannot connect to database` | MySQL belum berjalan atau kredensial salah | Jalankan MySQL; periksa `db-connections.json` |
| `AI API error: rate limit` | Quota free tier habis | Cek dashboard provider; sistem otomatis beralih ke provider lain |
| `WebSocket connection failed` | Port 3000 terblokir atau CORS salah | Periksa firewall; update `cors-config.js` |
| `OTP email not received` | Kredensial Gmail salah atau App Password belum diset | Aktifkan 2FA Gmail; buat App Password di akun Google |
| Query lambat (> 10 detik) | Database belum memiliki index | Tambahkan index pada kolom yang sering di-query |
| `Token expired` | Token JWT kedaluwarsa | Login ulang; atau perpanjang `expiresIn` di `auth.js` |

---

## RINGKASAN TOMBOL PENTING

### Aplikasi Mobile — Tombol Utama

| Tombol | Lokasi | Fungsi |
|---|---|---|
| ☰ | Header kiri | Buka sidebar riwayat chat |
| 👤 / Foto | Header kanan | Buka pengaturan akun |
| ➤ | Input kanan | Kirim pesan |
| 🎤 | Input | Input suara |
| × | Input | Hapus teks input |
| ✕ merah | Input (saat loading) | Batalkan query |
| ↓ | Chat (saat scroll naik) | Scroll ke pesan terbaru |
| 📌 | Sidebar (swipe item) | Pin/unpin chat |

### Panel Admin — Tombol Utama

| Tombol | Lokasi | Fungsi |
|---|---|---|
| ← Collapse | Sidebar | Sempitkan sidebar |
| + Tambah Pengguna | Halaman Users | Form tambah user baru |
| ⋮ | Baris tabel User | Menu aksi (view/edit/hapus/toggle status) |
| 🔍 | Semua halaman | Pencarian real-time |
| + Import dari API | Halaman Database | Buka modal import |
| Preview Data | Modal Import | Ambil preview dari URL API |
| Import to Database | Modal Import | Jalankan import setelah preview |
| 💬 Chat | Pojok kanan bawah | Buka widget chatbot |
| ••• | Widget chat | Menu tema + hapus pesan |

---

*Dokumen ini adalah bagian dari Laporan Praktik Kerja Lapangan (PKL)*
*Sistem Chatbot AI — Manajemen Data Kekayaan Intelektual*
*Versi 1.0 | 2024–2025*