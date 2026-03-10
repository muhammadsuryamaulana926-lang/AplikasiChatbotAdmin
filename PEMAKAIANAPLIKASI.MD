# DOKUMENTASI PROYEK PKL
# SISTEM CHATBOT AI — MANAJEMEN DATA KEKAYAAN INTELEKTUAL

> Dokumentasi ini mencakup tiga komponen utama dalam satu sistem terintegrasi:
> **Backend Server**, **Panel Admin Web**, dan **Aplikasi Mobile**

---

## DAFTAR ISI

1. [Pendahuluan](#1-pendahuluan)
2. [Tujuan Pembuatan Proyek](#2-tujuan-pembuatan-proyek)
3. [Manfaat Proyek](#3-manfaat-proyek)
4. [Deskripsi Umum Aplikasi](#4-deskripsi-umum-aplikasi)
5. [Arsitektur Sistem](#5-arsitektur-sistem)
6. [Struktur Folder dan File](#6-struktur-folder-dan-file)
7. [Teknologi yang Digunakan](#7-teknologi-yang-digunakan)
8. [Fitur-Fitur Aplikasi](#8-fitur-fitur-aplikasi)
9. [Alur Sistem (Workflow)](#9-alur-sistem-workflow)
10. [Keamanan dan Validasi](#10-keamanan-dan-validasi)
11. [Kelebihan dan Kekurangan Sistem](#11-kelebihan-dan-kekurangan-sistem)
12. [Kesimpulan](#12-kesimpulan)
13. [Saran Pengembangan](#13-saran-pengembangan)

---

## 1. PENDAHULUAN

### 1.1 Latar Belakang Proyek

Kekayaan Intelektual (KI) merupakan aset penting bagi institusi pendidikan dan penelitian seperti Institut Teknologi Bandung (ITB). Data KI yang meliputi paten, hak cipta, desain industri, dan merek dagang tersimpan dalam database yang kompleks dan memerlukan pengetahuan teknis untuk mengaksesnya.

Dalam era digital saat ini, kebutuhan akan sistem komunikasi otomatis yang cepat dan efisien semakin meningkat. Untuk menjawab tantangan tersebut, dikembangkanlah **Sistem Chatbot AI untuk Manajemen Data Kekayaan Intelektual** yang terdiri dari tiga komponen utama:

- **Backend Server** — Otak sistem, menangani logika bisnis, integrasi AI, dan manajemen database
- **Panel Admin Web** — Antarmuka berbasis React.js untuk administrator mengelola sistem secara terpusat
- **Aplikasi Mobile** — Aplikasi React Native untuk pengguna akhir berinteraksi dengan chatbot

### 1.2 Permasalahan yang Ingin Diselesaikan

**Dari sisi data KI:**
- Pengguna non-teknis kesulitan mengakses informasi KI karena harus memahami struktur database dan SQL
- Proses pencarian data manual memakan waktu dan tidak efisien
- Data KI tersebar di berbagai database yang berbeda
- Tidak ada sistem yang dapat memberikan analisis dan insight secara otomatis

**Dari sisi manajemen sistem:**
- Administrator tidak memiliki cara mudah untuk memantau aktivitas pengguna secara real-time
- Tidak ada sistem terpusat untuk mengelola pengguna, chat history, dan database
- Proses import data dari API eksternal dilakukan secara manual

**Dari sisi pengalaman pengguna:**
- Layanan bantuan konvensional terbatas pada jam kerja tertentu
- Tidak ada personalisasi layanan; riwayat percakapan tidak tersimpan
- Antarmuka yang kompleks dan tidak ramah pengguna awam

### 1.3 Alasan Pemilihan Teknologi

| Komponen | Teknologi | Alasan |
|---|---|---|
| Backend | Node.js + Express | Performa I/O tinggi, ekosistem npm luas, cocok untuk real-time |
| Database | MySQL | Stabil, mature, mendukung query kompleks |
| AI Provider | Multi-Provider (Groq, Gemini, dll) | Fallback otomatis, cost-effective dengan free tier |
| Real-time | Socket.IO | Bi-directional, auto-reconnect, event-based |
| Admin Frontend | React.js + Vite + Tailwind CSS | Komponen reusable, HMR cepat, utility-first styling |
| Mobile App | React Native + Expo + TypeScript | Cross-platform, native performance, type safety |

---

## 2. TUJUAN PEMBUATAN PROYEK

### 2.1 Tujuan Umum

Mengembangkan sistem chatbot berbasis AI yang memudahkan akses dan analisis data Kekayaan Intelektual melalui interaksi bahasa natural, dilengkapi panel admin terpusat dan aplikasi mobile, sehingga seluruh pengguna — teknis maupun non-teknis — dapat mengakses informasi yang dibutuhkan dengan cepat dan mudah.

### 2.2 Tujuan Khusus

**Backend:**
- Membangun Natural Language Interface yang mengonversi pertanyaan ke SQL query secara akurat
- Mengimplementasikan Multi-Database Support untuk query paralel ke beberapa database
- Membangun sistem pembelajaran adaptif dari pola pertanyaan pengguna
- Menyediakan fitur analisis: deteksi anomali, duplikasi data, dan rekomendasi strategis

**Panel Admin:**
- Dashboard monitoring real-time dengan statistik dan visualisasi grafik
- Sistem manajemen pengguna lengkap (CRUD + toggle status)
- Manajemen database terintegrasi dengan fitur import dari API eksternal
- Sistem autentikasi aman dengan session management

**Aplikasi Mobile:**
- Sistem autentikasi lengkap dengan verifikasi email OTP
- Fitur chat responsif dengan AI Gemini sebagai engine
- Manajemen riwayat percakapan (pin, edit, hapus)
- Personalisasi: pilihan tema dan upload foto profil

---

## 3. MANFAAT PROYEK

### 3.1 Manfaat bagi Pengguna

- **Kemudahan Akses** — Tidak perlu memahami SQL; cukup bertanya dengan bahasa sehari-hari
- **Efisiensi Waktu** — Pencarian yang biasanya 10–15 menit kini hanya 5–10 detik
- **Layanan 24/7** — Chatbot tersedia kapan saja tanpa batasan jam kerja
- **Personalisasi** — Riwayat chat tersimpan, tema dapat disesuaikan

### 3.2 Manfaat bagi Instansi

- **Peningkatan Produktivitas** — Staff tidak perlu menghabiskan waktu untuk query manual
- **Demokratisasi Data** — Semua staff dapat mengakses data KI tanpa training SQL
- **Kualitas Data** — Deteksi otomatis untuk data duplikat dan anomali
- **Cost Reduction** — Menggunakan AI provider dengan free tier; mengurangi error query manual

### 3.3 Manfaat bagi Siswa PKL

- Pengalaman hands-on dengan integrasi AI/LLM dalam aplikasi nyata
- Penguasaan full-stack development (Node.js, React, React Native)
- Pemahaman tentang arsitektur sistem modern dan best practices keamanan
- Portfolio project yang dapat dipresentasikan ke calon employer

---

## 4. DESKRIPSI UMUM APLIKASI

### 4.1 Gambaran Singkat

Sistem ini terdiri dari tiga lapisan yang saling terhubung:

```
┌──────────────────────────────────────────────────────────────┐
│              APLIKASI MOBILE (React Native + Expo)           │
│              Pengguna akhir berinteraksi dengan chatbot       │
└────────────────────────────┬─────────────────────────────────┘
                             │ HTTP / WebSocket
┌────────────────────────────▼─────────────────────────────────┐
│              PANEL ADMIN WEB (React.js + Vite)               │
│              Administrator mengelola sistem                   │
└────────────────────────────┬─────────────────────────────────┘
                             │ HTTP / WebSocket
┌────────────────────────────▼─────────────────────────────────┐
│              BACKEND SERVER (Node.js + Express)              │
│  ┌─────────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │   MySQL DB      │  │  AI Engine   │  │  Socket.IO      │ │
│  │ (chatbot_db,    │  │  (Multi-     │  │  (Real-time     │ │
│  │  itb_db, dll)   │  │   Provider)  │  │   Events)       │ │
│  └─────────────────┘  └──────────────┘  └─────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Cara Kerja Sistem

**Alur Query Chatbot:**

```
User Input (Text/Voice)
        ↓
[Autentikasi JWT]
        ↓
[Natural Language Processing]
        ↓
[Intent Detection & Routing]
        ↓
┌───────────────────┬──────────────────────┐
│   CONVERSATION    │    DATABASE_QUERY     │
└───────────────────┴──────────────────────┘
        ↓                     ↓
  [AI Response]        [SQL Generation]
                              ↓
                       [Execute Query]
                              ↓
                       [Format Results]
                              ↓
                       [Learning System]
                              ↓
                    [Return ke User via WebSocket]
```

### 4.3 Alur Penggunaan Aplikasi

**Pengguna Mobile:**
1. Registrasi → verifikasi email OTP → login otomatis
2. Ketik pertanyaan → tunggu loading → terima jawaban AI
3. Lanjutkan percakapan, lihat riwayat, pin chat penting

**Administrator Web:**
1. Login dengan akun admin
2. Monitor dashboard (statistik, grafik, top pertanyaan)
3. Kelola pengguna, chat history, database, dan API keys

---

## 5. ARSITEKTUR SISTEM

### 5.1 Diagram Arsitektur Lengkap

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│  ┌──────────────────────────┐    ┌──────────────────────────────┐   │
│  │   Panel Admin (Web)      │    │   Aplikasi Mobile (iOS/Android)│ │
│  │   React.js + Vite        │    │   React Native + Expo         │  │
│  │   Tailwind CSS           │    │   TypeScript                  │  │
│  │   Recharts, Socket.IO    │    │   React Navigation            │  │
│  └────────────┬─────────────┘    └──────────────┬───────────────┘   │
└───────────────┼──────────────────────────────────┼───────────────────┘
                │ HTTP/HTTPS + WebSocket            │ HTTP/HTTPS
┌───────────────▼──────────────────────────────────▼───────────────────┐
│                         BACKEND LAYER                                 │
│              Node.js + Express.js (server.js)                        │
│  ┌────────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  chatbot-logic.js  │  │    auth.js        │  │  chat-history.js │  │
│  │  (NLP + SQL Gen)   │  │  (OTP, JWT,       │  │  (Save & Load    │  │
│  │                    │  │   Google OAuth)   │  │   Percakapan)    │  │
│  └────────────────────┘  └──────────────────┘  └──────────────────┘  │
│  ┌────────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  database-config.js│  │  query-learning  │  │  voice-to-text   │  │
│  │  (Multi-DB Mgmt)   │  │  (Pattern Learn) │  │  (Deepgram API)  │  │
│  └────────────────────┘  └──────────────────┘  └──────────────────┘  │
└───────────────────────────────────┬───────────────────────────────────┘
                                    │
┌───────────────────────────────────▼───────────────────────────────────┐
│                         DATA & AI LAYER                               │
│  ┌─────────────────────┐  ┌─────────────────┐  ┌──────────────────┐  │
│  │   MySQL Database    │  │  AI Providers   │  │  External APIs   │  │
│  │  - chatbot_db       │  │  - Groq (Primary)│  │  - Deepgram      │  │
│  │  - itb_db           │  │  - Gemini        │  │  - Google OAuth  │  │
│  │  - API Imports      │  │  - OpenRouter    │  │  - Custom APIs   │  │
│  └─────────────────────┘  │  - Mistral/Cohere│  └──────────────────┘  │
│                           └─────────────────┘                        │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 6. STRUKTUR FOLDER DAN FILE

### 6.1 Backend (`chatbot-backend/`)

```
chatbot-backend/
├── server.js                   # Entry point — Express + Socket.IO + Routes
├── chatbot-logic.js            # Otak chatbot: NLP, SQL generation, formatting
├── chatbot-routes.js           # REST API endpoints chatbot (/api/query)
├── auth.js                     # Autentikasi: OTP, login, Google OAuth, JWT
├── database-config.js          # Manajemen koneksi database (CRUD)
├── db-helper.js                # Helper: load/save config, create connection
├── chat-history.js             # Simpan dan ambil riwayat chat
├── query-learning.js           # Sistem pembelajaran pola query
├── learning-system-v2.js       # Advanced learning per-user
├── voice-to-text.js            # Konversi suara ke teks (Deepgram)
├── profile.js                  # Manajemen profil pengguna
├── api-keys-helper.js          # Manajemen API keys AI provider
├── cors-config.js              # Konfigurasi CORS
├── package.json                # Dependencies
├── .env                        # API keys (tidak di-commit ke Git)
├── active-db.json              # Konfigurasi database aktif (maks. 5)
├── db-connections.json         # Daftar semua koneksi database
├── api-keys.json               # Konfigurasi API keys AI
├── query-patterns.json         # Data pembelajaran query patterns
└── learning-data-v2.json       # Data pembelajaran per-user
```

**Penjelasan file kunci:**

| File | Peran |
|---|---|
| `server.js` | Entry point; setup Express, Socket.IO, semua routes, WebSocket events |
| `chatbot-logic.js` | Memproses pesan, routing intent, generate SQL, format response, learning |
| `auth.js` | Registrasi + OTP, login, Google OAuth, forgot password, JWT |
| `database-config.js` | CRUD database connections, set active DBs, test connection |
| `query-learning.js` | Belajar dari query: keywords, synonym, frekuensi, success rate |
| `learning-system-v2.js` | Learning per-user: preferensi DB, shortcuts, feedback |

### 6.2 Panel Admin (`Chatbot-admin/`)

```
Chatbot-admin/
├── src/
│   ├── components/
│   │   ├── ChatbotWidget.jsx        # Widget chatbot terintegrasi (5 tema)
│   │   ├── Sidebar.jsx              # Navigasi utama (collapsible)
│   │   ├── SearchBar.jsx            # Search bar reusable
│   │   ├── PageHeader.jsx           # Header per halaman
│   │   └── SwipeableChatItem.jsx    # Item chat yang bisa di-swipe
│   ├── pages/
│   │   ├── loginPage/Login.jsx      # Halaman login admin
│   │   ├── dashboardPage/Dashboard.jsx  # Dashboard + statistik + grafik
│   │   ├── user/UserList.jsx        # Manajemen pengguna (CRUD)
│   │   ├── chats/ChatHistory.jsx    # Riwayat percakapan
│   │   ├── database/ApiDatabaseManager.jsx  # Import database dari API
│   │   └── settings/
│   │       ├── AppSettings.jsx      # Konfigurasi database lokal
│   │       └── ApiKeys.jsx          # Manajemen API keys AI
│   ├── contexts/
│   │   ├── AuthContext.jsx          # State autentikasi global
│   │   └── ThemeContext.jsx         # State tema aplikasi
│   ├── services/
│   │   ├── api.js                   # Semua HTTP request ke backend
│   │   ├── chatbotService.js        # Komunikasi dengan chatbot AI
│   │   └── socket.js                # WebSocket connection
│   ├── config/api-config.js         # URL backend (environment-aware)
│   ├── routes/
│   │   ├── AppRoutes.jsx            # Definisi semua route
│   │   └── ProtectedRoute.jsx       # HOC proteksi route
│   └── styles/
│       ├── themes.css               # CSS variables untuk 4 tema
│       └── sidebar-tooltip.css      # Styling tooltip sidebar
├── .env                             # VITE_BACKEND_URL
├── package.json
├── tailwind.config.js
└── vite.config.js
```

### 6.3 Aplikasi Mobile (`aplikasichatbot-frontend/`)

```
aplikasichatbot-frontend/
├── App.tsx                          # Entry point; wraps ThemeProvider + AppNavigator
├── navigation/AppNavigator.tsx      # Stack navigator + auto-login logic
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx          # Login email + password
│   │   ├── SignUpEmailScreen.tsx    # Registrasi step 1: input email
│   │   ├── VerificationCodeScreen.tsx  # Registrasi step 2: verifikasi OTP
│   │   ├── SignUpPasswordScreen.tsx # Registrasi step 3: nama + password
│   │   ├── ForgotPasswordEmailScreen.tsx
│   │   └── ResetPasswordScreen.tsx
│   └── main/
│       ├── ChatScreen.tsx           # ⭐ Screen utama chat + sidebar + riwayat
│       ├── AccountSettingsScreen.tsx # Pengaturan akun + foto profil
│       ├── ThemeSettingsScreen.tsx  # Pilih tema (Light/Dark/Spongebob/Doraemon)
│       └── EditProfileScreen.tsx    # Edit nama dan email
├── contexts/ThemeContext.tsx        # Tema global dengan AsyncStorage
├── config/api-config.ts             # BACKEND_URL
├── components/
│   ├── MessageTextWithLinks.tsx     # Render pesan dengan deteksi link
│   └── SwipeableChatItem.tsx        # Item chat swipeable untuk pin
├── utils/
│   ├── timeUtils.ts                 # Format waktu relatif
│   ├── pinChatUtils.ts              # Logic pin/unpin chat
│   └── soundUtils.ts                # Sound + vibration feedback
└── types/navigation.ts              # TypeScript type untuk navigasi
```

---

## 7. TEKNOLOGI YANG DIGUNAKAN

### 7.1 Backend

| Teknologi | Versi | Fungsi |
|---|---|---|
| Node.js | v18+ | Runtime JavaScript server-side |
| Express.js | 4.18.2 | Web framework, REST API, middleware |
| Socket.IO | 4.8.3 | Real-time WebSocket communication |
| MySQL2 | 3.6.5 | MySQL client dengan Promise support |
| Axios | 1.13.2 | HTTP client untuk AI API calls |
| Bcrypt | 5.1.1 | Hashing password (8 salt rounds) |
| JsonWebToken | 9.0.3 | JWT token generation & verification |
| Nodemailer | 7.0.12 | Kirim email OTP |
| Multer | 1.4.5 | Handle file upload |
| Deepgram SDK | 3.4.0 | Voice-to-text (model Nova-2, Bahasa Indonesia) |
| Google Auth Library | 10.5.0 | Google OAuth integration |
| Natural | 8.1.0 | NLP: tokenization, stemming, similarity |

### 7.2 Panel Admin

| Teknologi | Versi | Fungsi |
|---|---|---|
| React.js | 19.2.0 | Library UI berbasis komponen |
| Vite | 7.2.4 | Build tool dengan HMR instant |
| React Router DOM | 7.13.0 | Routing SPA |
| Tailwind CSS | 3.4.17 | Utility-first CSS framework |
| Recharts | 3.7.0 | Library charting (Bar, Line, Pie) |
| Axios | 1.13.5 | HTTP client |
| Socket.IO Client | 4.8.3 | WebSocket real-time updates |

### 7.3 Aplikasi Mobile

| Teknologi | Versi | Fungsi |
|---|---|---|
| React Native | 0.81.5 | Framework mobile cross-platform |
| Expo | 54.0.31 | Platform + built-in APIs |
| TypeScript | 5.9.2 | Static typing untuk type safety |
| React Navigation | 7.x | Routing dan navigasi |
| AsyncStorage | — | Local persistent storage |
| React Native Paper | 5.14.5 | Material Design components |
| Expo Image Picker | — | Upload foto profil |

### 7.4 AI Providers (Fallback System)

| Provider | Model | Peran |
|---|---|---|
| Groq | LLaMA 3.3 70B Versatile | **Primary** — Inference 500+ tokens/detik |
| Google Gemini | Gemini 2.0 Flash Exp | **Backup 1** — Free tier generous |
| OpenRouter | Gemini 2.0 Flash Free | **Backup 2** — Multi-model access |
| Mistral AI | Mistral Small Latest | **Backup 3** — Structured output baik |
| Cohere | Command R+ | **Backup 4** — 100 req/menit free |
| Hugging Face | Mistral 7B Instruct | **Backup 5** — Unlimited free tier |

### 7.5 Database

```sql
-- chatbot_db (Database Utama)
users          — Data pengguna (id, email, password, nama, telepon, status, google_id)
kode_otp       — OTP verifikasi (email, kode, tipe, kadaluarsa, digunakan)
riwayat_chat   — Metadata chat history (id, user_email, judul, timestamps)
pesan_chat     — Isi pesan (id, riwayat_chat_id, peran, konten, sumber)

-- itb_db (Database KI)
kekayaan_intelektual — Data paten, hak cipta, desain industri, merek
                        (id, judul, jenis_ki, status_ki, tgl_pendaftaran,
                         tgl_sertifikasi, no_permohonan, inventor, fakultas, dll)

-- Database dari API Import (struktur dinamis, auto-generated)
```

---

## 8. FITUR-FITUR APLIKASI

### 8.1 Sistem Autentikasi (Backend + Mobile + Admin)

#### Registrasi dengan OTP Email
1. User input email → backend generate OTP 6 digit
2. OTP dikirim via Nodemailer (valid 5 menit, one-time use)
3. User verifikasi OTP → isi nama & password
4. Password di-hash bcrypt (8 rounds) sebelum disimpan
5. Auto-login dengan JWT token (expire 30 hari)

#### Login
- Email + password biasa dengan bcrypt.compare()
- Google OAuth (verify Google ID token)
- Auto-login via JWT token dari AsyncStorage
- Status akun dicek (active/inactive)

#### Forgot Password
- Kirim OTP ke email → verifikasi → reset password

### 8.2 Natural Language Query (Backend)

#### SQL Generation dari Pertanyaan Bahasa Natural

```
Contoh:
Input : "Berapa total paten tahun 2023 yang sudah tersertifikasi?"
SQL   : SELECT COUNT(*) as total FROM kekayaan_intelektual
        WHERE jenis_ki LIKE '%Paten%'
          AND YEAR(tgl_pendaftaran) = 2023
          AND id_sertifikat IS NOT NULL

Input : "Inventor terbanyak per fakultas"
SQL   : SELECT fakultas_inventor, inventor, COUNT(*) as total
        FROM kekayaan_intelektual
        GROUP BY fakultas_inventor, inventor
        ORDER BY total DESC LIMIT 20
```

**Fitur SQL Generation:**
- Chain-of-thought reasoning untuk akurasi tinggi
- Schema-aware (membaca struktur database terlebih dahulu)
- Deteksi otomatis nama kolom yang relevan
- Support JOIN, GROUP BY, HAVING, subquery, fungsi tanggal
- Validasi keamanan: hanya SELECT, block kata kunci berbahaya

#### Smart Response Formatting

| Tipe Hasil | Format Output |
|---|---|
| COUNT | Angka saja: "156" |
| GROUP BY | List dengan ranking dan total |
| List | Numbered list dengan pagination (10 per halaman) |
| Single Record | Detail lengkap semua field |

#### Context-Aware Conversation

```
User: "Berapa total paten 2023?"  →  Bot: "45"
User: "Tampilkan datanya"         →  Bot: [List 10 paten pertama dari 45]
User: "Lanjut"                    →  Bot: [Paten 11–20]
User: "3"                         →  Bot: [Detail paten nomor 3]
```

### 8.3 Fitur Khusus Analitik (Backend)

| Fitur | Trigger | Fungsi |
|---|---|---|
| Duplicate Detection | "ada duplikat judul?" | Cari judul KI dengan pemilik berbeda |
| Anomaly Detection | "cek anomali data" | Cek inventor null, tanggal tidak valid, no permohonan duplikat |
| Data Quality Check | "ki tanpa inventor" | List data dengan field kosong |
| Scenario Analysis | "jika KI dijual, risikonya?" | Analisis risiko, dampak, rekomendasi |
| Strategic Recommendations | "ki layak dikomersialisasikan" | Filter + rekomendasikan berdasarkan kriteria |

### 8.4 Multi-Database Support (Backend)

- Admin dapat mengaktifkan hingga **5 database sekaligus**
- Saat user bertanya, sistem query semua database aktif secara paralel
- Jika data ditemukan di 1 database: langsung tampilkan
- Jika data di beberapa database: minta user memilih
- Learning system belajar preferensi database per user

### 8.5 Voice Input (Backend + Mobile)

1. User tekan tombol mikrofon → rekam audio
2. Audio dikirim ke backend → diteruskan ke Deepgram Nova-2
3. Deepgram transkripsi (Bahasa Indonesia) → return teks + confidence score
4. Teks otomatis mengisi input field

### 8.6 Dashboard Monitoring Real-time (Panel Admin)

**Stat Cards (4 kartu):**
- Total Pengguna, Chat Hari Ini, Pengguna Aktif, Total Database

**Grafik:**
- Bar Chart: Pengguna Baru (filter: mingguan/bulanan/tahunan)
- Line Chart: Tren Chat (filter: mingguan/bulanan)
- List: Top 5 Pertanyaan Populer

**Real-time via WebSocket:**
- `user_added` → total pengguna update otomatis
- `new_chat` / `new_message` → statistik chat update otomatis

### 8.7 Manajemen Pengguna (Panel Admin)

- Tabel dengan kolom: ID, Nama, Email, No HP, Status, Tanggal Bergabung, Aksi
- CRUD: Tambah, Edit, View Detail, Hapus
- Toggle status aktif/non-aktif
- Search/filter real-time
- Proteksi: akun admin tidak bisa dihapus
- Update real-time via WebSocket ke semua admin yang online

### 8.8 Manajemen Database (Panel Admin)

#### Import Database dari API Eksternal

```
Admin input URL API + API Key
        ↓
Preview: total records, detected fields, sample data
        ↓
Admin beri nama database
        ↓
Backend fetch semua data → detect tipe kolom → create table → insert (chunked)
        ↓
Database siap digunakan oleh chatbot
```

#### Set Active Databases
- Pilih maks. 5 database dari daftar
- Chatbot akan query ke semua database aktif

### 8.9 Riwayat Chat (Panel Admin)

- Tampilan 2 kolom: list chat (kiri) + detail percakapan (kanan)
- Bubble chat user (biru, kanan) dan bot (abu-abu, kiri)
- Support format **markdown**: bold, list, numbering
- Search berdasarkan email atau judul chat
- Auto-scroll ke pesan terbaru
- Analisis pertanyaan populer dan hitung chat hari ini

### 8.10 Chatbot Widget (Panel Admin)

- Widget floating di pojok kanan bawah
- **5 Tema**: Modern, Dark, Minimal, Pink, SpongeBob (masing-masing animasi unik)
- Delete pesan: individual (centang) atau semua sekaligus
- Placeholder animasi typing effect
- Auto-save conversation ke localStorage

### 8.11 Manajemen Riwayat Chat (Aplikasi Mobile)

| Fitur | Cara Kerja |
|---|---|
| Auto-save | Setiap pesan otomatis tersimpan ke database |
| Lanjut chat | Tap item di sidebar → load semua pesan |
| Pin chat | Swipe kanan → tap pin; tersimpan di AsyncStorage; muncul di atas |
| Edit judul | Tap judul chat → edit inline |
| Hapus chat | Long press → modal konfirmasi → DELETE cascade |
| Timestamp relatif | "5 menit lalu", "Kemarin", "12 Jan 2024" |
| Date separator | "Hari ini", "Kemarin", tanggal spesifik |

### 8.12 Personalisasi (Aplikasi Mobile)

**Tema Aplikasi:**

| Tema | Deskripsi |
|---|---|
| Light | Putih dan biru (default) |
| Dark | Hitam dan biru terang |
| Spongebob | Kuning, oranye, ceria |
| Doraemon | Biru dan merah, rounded |

**Lainnya:**
- Upload foto profil dari kamera/galeri (disimpan sebagai base64 di AsyncStorage)
- Edit nama dan email (email perlu verifikasi OTP)

---

## 9. ALUR SISTEM (WORKFLOW)

### 9.1 Registrasi Pengguna Baru

```
[Buka App] → [LoadingScreen: cek token]
        ↓ (tidak ada token)
[LoginScreen] → tap "Buat akun"
        ↓
[SignUpEmailScreen] → input email → validasi format
        ↓
[Backend] → cek email duplikat → generate OTP → kirim email (Nodemailer)
        ↓
[VerificationCodeScreen] → input 6 digit OTP
        ↓
[Backend] → validasi OTP (belum expired, belum digunakan)
        ↓
[SignUpPasswordScreen] → input nama + password + konfirmasi
        ↓
[Backend] → hash password → INSERT users → generate JWT
        ↓
[Frontend] → simpan token ke AsyncStorage → navigate ke ChatScreen
```

### 9.2 Alur Query Database (Detail)

```
[User ketik pertanyaan] → kirim POST /api/query
        ↓
[Emit "processing" event via WebSocket]
        ↓
[Normalize slang: gak→tidak, yg→yang]
        ↓
[Check guardrails: pertanyaan sensitif?]
        ↓
[Detect special intent: duplikat? anomali? scenario?]
        ↓
[AI Router: CONVERSATION atau DATABASE_QUERY?]
        ↓
         ├─ CONVERSATION → AI generate respons langsung
         │
         └─ DATABASE_QUERY
                ↓
           [Get active databases (maks. 5)]
                ↓
           [Get schema cache tiap database]
                ↓
           [AI generate SQL (chain-of-thought)]
                ↓
           [Validasi SQL: hanya SELECT, tidak ada DROP/DELETE/dll]
                ↓
           [Execute query + get total count]
                ↓
           [Hasil dari 1 database?]
              ├─ Ya → Format response
              └─ Tidak → Tanya user pilih database
                ↓
[Add ke conversation context] → [Save ke learning system]
        ↓
[Emit "completed" event] → [Return ke frontend]
        ↓
[Auto-save ke chat history database]
```

### 9.3 Alur Import Database dari API

```
[Admin buka Database Manager] → klik "Import dari API"
        ↓
[Input API URL + API Key]
        ↓
[Klik "Preview Data"]
        ↓
[Backend fetch API] → auto-detect format (array/object/nested)
        ↓
[Flatten nested objects] → detect tipe kolom (VARCHAR/TEXT/INT/DECIMAL)
        ↓
[Tampilkan preview: total records, columns, sample data]
        ↓
[Admin input nama database] → klik "Import"
        ↓
[Backend CREATE DATABASE + CREATE TABLE] → INSERT data (chunked)
        ↓
[Simpan metadata ke api-databases.json] → Add ke db-connections.json
        ↓
[Database siap digunakan chatbot]
```

### 9.4 Alur Learning System

```
[User bertanya] → [Query diproses]
        ↓
[Query Learning System — Global]
  - Extract keywords dari query
  - Normalize via synonym mapping (patent→paten, show→tampilkan)
  - Update frekuensi, success/failed rate, timestamp
        ↓
[Learning System V2 — Per User]
  - Learn database preference untuk user ini
  - Update confidence score (query berhasil → naik, gagal → turun)
  - Detect shortcut jika frekuensi tinggi (threshold 80%)
  - Context learning: link intent antar pertanyaan
        ↓
[Data tersimpan] → [Query berikutnya lebih akurat]
```

---

## 10. KEAMANAN DAN VALIDASI

### 10.1 Keamanan Autentikasi

| Aspek | Implementasi |
|---|---|
| Password | Bcrypt 8 salt rounds; tidak pernah disimpan plain text |
| OTP | Random 6 digit; expire 5 menit; one-time use |
| Token | JWT dengan expiry 30 hari (backend) / 30 menit (admin) |
| Google OAuth | Verifikasi ID token dengan Google Auth Library |
| Auto-logout | Token expired → redirect ke login otomatis |

### 10.2 Keamanan Database

| Ancaman | Mitigasi |
|---|---|
| SQL Injection | Prepared statements; parameterized queries |
| Data Corruption | Hanya SELECT yang diizinkan; block UPDATE/DELETE/DROP/ALTER |
| Query Abuse | Timeout 30 detik; hanya read-only access |
| Koneksi Bocor | Connection pooling; error handling tanpa expose info sensitif |

### 10.3 Keamanan API

- **CORS** — Whitelist origin (localhost:5173, devtunnels)
- **Rate Limiting** — Queue request AI (800ms delay) untuk mencegah spam
- **API Keys** — Disimpan di `.env` (tidak di-commit ke Git)
- **Token Validation** — Setiap request ke endpoint protected wajib sertakan JWT

### 10.4 Validasi Input

**Frontend (Mobile + Admin):**
- Email format regex
- Password minimal 8 karakter (plus kekuatan di mobile)
- Required field check
- URL validation untuk import API

**Backend:**
- Sanitize input sebelum query
- Validasi email unique saat registrasi
- Validasi tipe data dan business rules
- Error message tidak mengekspos info sensitif

---

## 11. KELEBIHAN DAN KEKURANGAN SISTEM

### 11.1 Kelebihan

**Fungsionalitas:**
- ✅ Natural Language Interface — tidak perlu SQL
- ✅ Multi-Database Support (hingga 5 database paralel)
- ✅ Learning system adaptif per user
- ✅ Real-time updates via WebSocket
- ✅ Fallback AI multi-provider (tidak mati jika 1 provider down)
- ✅ Voice input (Bahasa Indonesia)
- ✅ Fitur analitik: duplicate detection, anomaly, recommendations
- ✅ Cross-platform: web admin + mobile iOS/Android

**Teknis:**
- ✅ Kode modular dan terstruktur dengan separation of concerns
- ✅ TypeScript untuk type safety di mobile
- ✅ Keamanan berlapis (bcrypt, JWT, prepared statements, CORS)
- ✅ Cost-effective: menggunakan free tier AI dan open-source tech

### 11.2 Kekurangan

| Area | Kekurangan | Mitigasi Potensial |
|---|---|---|
| Ketersediaan | Jika semua AI provider down, SQL tidak bisa di-generate | Cache query umum; local model fallback |
| Akurasi | SQL generation tidak 100% akurat untuk query sangat kompleks | Lebih banyak schema context; user feedback loop |
| Performance | Query ke database besar bisa lambat | Pagination sudah ada; tambah indexing & caching |
| Keamanan | Token di localStorage rentan XSS | Pindah ke httpOnly cookie; refresh token |
| Mobile | Tidak ada offline mode; tidak ada voice output | Service worker; TTS library |
| Admin | Belum ada RBAC (semua admin setara) | Role system: Super Admin, Admin, Viewer |
| Umum | Tidak ada export data (CSV/PDF) | Fitur export sebagai prioritas berikutnya |

---

## 12. KESIMPULAN

### 12.1 Ringkasan

Sistem Chatbot AI untuk Manajemen Data Kekayaan Intelektual berhasil dibangun sebagai solusi end-to-end yang mencakup:

- **Backend** — Server Node.js dengan AI multi-provider, SQL generation otomatis, sistem pembelajaran adaptif, dan multi-database support
- **Panel Admin** — Dashboard React.js dengan monitoring real-time, manajemen pengguna dan database, serta chatbot widget terintegrasi
- **Aplikasi Mobile** — Aplikasi React Native cross-platform dengan autentikasi lengkap, chat AI, dan personalisasi

### 12.2 Pencapaian Utama

| Tujuan | Status |
|---|---|
| Natural Language → SQL Query | ✅ Akurasi tinggi dengan chain-of-thought |
| Multi-Database Support | ✅ Query paralel hingga 5 database |
| Learning System Adaptif | ✅ Global + per-user learning |
| Dashboard Real-time | ✅ WebSocket updates |
| Autentikasi Aman | ✅ OTP + JWT + Google OAuth |
| Aplikasi Mobile Cross-platform | ✅ Android + iOS |
| Voice Input Bahasa Indonesia | ✅ Deepgram Nova-2 |

### 12.3 Impact

- **Efisiensi** — Pencarian data dari 10–15 menit → 5–10 detik
- **Aksesibilitas** — Staff non-teknis dapat mengakses data KI tanpa training SQL
- **Kualitas** — Deteksi otomatis anomali dan duplikasi data
- **Demokratisasi Data** — Mengurangi dependency pada tim IT

---

## 13. SARAN PENGEMBANGAN

### 13.1 Jangka Pendek (1–3 Bulan)

- **Pagination** pada tabel admin untuk performa lebih baik dengan data besar
- **Export data** ke CSV/Excel untuk kebutuhan reporting
- **Rate limiting** di frontend untuk mencegah spam dan brute force
- **Error Boundary** React untuk mencegah white screen of death
- **Monitoring dashboard** dengan Sentry atau serupa

### 13.2 Jangka Menengah (3–6 Bulan)

- **Role-Based Access Control (RBAC)** — Super Admin, Admin, Viewer
- **Notification system** — in-app, email, browser push notification
- **Audit log** — rekam semua aksi admin (who, what, when, where)
- **Fitur search** dalam riwayat chat (full-text search)
- **Export chat** ke PDF atau teks
- **Redis caching** untuk query yang sering diulang
- **2FA (Two-Factor Authentication)** untuk keamanan lebih kuat

### 13.3 Jangka Panjang (6–12 Bulan)

- **Voice Input/Output** di mobile — enable speech recognition yang sudah ada + TTS
- **Image & file attachment** — analisis dokumen dengan AI multimodal
- **RAG (Retrieval-Augmented Generation)** untuk context yang lebih kaya
- **Multi-language support** — i18n untuk Bahasa Indonesia + Inggris
- **Mobile app native** — build APK/IPA untuk distribusi
- **Custom fine-tuned model** — training dengan data domain KI
- **Integrasi BI tools** — Tableau, Power BI
- **Docker containerization** untuk deployment yang lebih mudah

### 13.4 Upgrade Teknologi yang Disarankan

| Komponen | Sekarang | Rekomendasi Upgrade |
|---|---|---|
| Backend framework | Express.js | NestJS (TypeScript, modular) |
| State management | Context API | Zustand atau React Query |
| Database | MySQL only | + Elasticsearch untuk full-text search |
| Caching | Tidak ada | Redis |
| Monitoring | Log files | Prometheus + Grafana + Sentry |
| AI orchestration | Manual fallback | LangChain untuk orchestration lebih kuat |
| Deployment | Manual | Docker + CI/CD Pipeline |

---

## LAMPIRAN

### A. Environment Variables

**Backend (`.env`):**
```env
DEEPGRAM_API_KEY=your_deepgram_api_key
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
COHERE_API_KEY=your_cohere_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

**Panel Admin (`.env`):**
```env
VITE_BACKEND_URL=http://10.251.108.24:3000
```

**Mobile (`config/api-config.ts`):**
```typescript
export const API_CONFIG = {
  BACKEND_URL: "http://10.251.108.24:3000"
};
```

### B. Cara Menjalankan

**Backend:**
```bash
cd chatbot-backend
npm install
# Isi .env dengan API keys
npm start
# Server berjalan di http://localhost:3000
```

**Panel Admin:**
```bash
cd Chatbot-admin
npm install
# Isi .env dengan VITE_BACKEND_URL
npm run dev
# Akses di http://localhost:5173
```

**Aplikasi Mobile:**
```bash
cd aplikasichatbot-frontend
npm install
# Sesuaikan BACKEND_URL di config/api-config.ts
npx expo start
# Scan QR code dengan Expo Go atau jalankan di emulator
```

### C. Troubleshooting

| Masalah | Solusi |
|---|---|
| WebSocket tidak connect | Pastikan backend running; cek BACKEND_URL; cek firewall |
| OTP tidak diterima | Cek folder spam; cek kredensial Gmail + App Password |
| AI tidak merespons | Cek API key valid; cek quota/rate limit; sistem fallback ke provider lain |
| Query lambat | Tambah index di database; aktifkan Redis caching |
| Build error mobile | Hapus `node_modules`; `npm install` ulang; pastikan Node.js v18+ |

---

**Disusun oleh:** Siswa PKL  
**Instansi:** Institut Teknologi Bandung (ITB)  
**Periode PKL:** 2024–2025  
**Versi Dokumentasi:** 1.0.0 (Gabungan)

---

*Dokumen ini merupakan gabungan dari tiga dokumentasi terpisah (Backend, Panel Admin, Aplikasi Mobile) yang disatukan karena ketiganya merupakan satu sistem terintegrasi.*