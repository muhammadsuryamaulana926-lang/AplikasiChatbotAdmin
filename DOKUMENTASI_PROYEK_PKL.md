# DOKUMENTASI PROYEK PKL
# SISTEM PANEL ADMIN CHATBOT AI BERBASIS WEB

---

## 1. PENDAHULUAN

### 1.1 Latar Belakang Proyek

Dalam era digital saat ini, kebutuhan akan sistem komunikasi otomatis yang cepat dan efisien semakin meningkat. Chatbot berbasis kecerdasan buatan (AI) telah menjadi solusi populer untuk memberikan layanan informasi dan bantuan kepada pengguna secara real-time tanpa memerlukan intervensi manusia secara langsung.

Namun, sebuah sistem chatbot yang baik memerlukan sistem manajemen yang terstruktur untuk mengelola pengguna, memantau percakapan, dan mengatur database pengetahuan yang digunakan oleh chatbot. Tanpa sistem manajemen yang baik, administrator akan kesulitan dalam:
- Memantau aktivitas pengguna dan chatbot
- Mengelola data pengguna yang terdaftar
- Menganalisis pola percakapan dan pertanyaan yang sering diajukan
- Mengelola database pengetahuan chatbot
- Mengintegrasikan sumber data eksternal melalui API

Oleh karena itu, dikembangkanlah **Panel Admin Chatbot AI** sebagai solusi untuk mengatasi permasalahan tersebut. Sistem ini dirancang khusus untuk memberikan kontrol penuh kepada administrator dalam mengelola seluruh aspek sistem chatbot.

### 1.2 Permasalahan yang Ingin Diselesaikan

Beberapa permasalahan utama yang ingin diselesaikan melalui proyek ini adalah:

1. **Kesulitan Monitoring Aktivitas**
   - Administrator tidak memiliki cara mudah untuk memantau jumlah pengguna aktif
   - Tidak ada visualisasi data statistik penggunaan chatbot
   - Sulit melacak tren percakapan dan pertanyaan populer

2. **Manajemen Pengguna yang Tidak Efisien**
   - Tidak ada sistem terpusat untuk mengelola data pengguna
   - Sulit mengaktifkan atau menonaktifkan akses pengguna
   - Tidak ada pencatatan riwayat pendaftaran pengguna

3. **Keterbatasan Analisis Percakapan**
   - Tidak ada sistem untuk melihat riwayat percakapan lengkap
   - Sulit mengidentifikasi masalah atau error dalam respons chatbot
   - Tidak ada cara untuk menganalisis pertanyaan yang sering diajukan

4. **Pengelolaan Database yang Rumit**
   - Proses import data dari API eksternal dilakukan manual
   - Tidak ada preview data sebelum import
   - Sulit melacak sumber data yang telah diimport

5. **Tidak Ada Sistem Keamanan Terpusat**
   - Tidak ada autentikasi khusus untuk administrator
   - Akses ke sistem tidak terkontrol dengan baik

### 1.3 Alasan Pemilihan Teknologi

Pemilihan teknologi dalam proyek ini didasarkan pada beberapa pertimbangan teknis dan praktis:

#### **Frontend: React.js**
- **Komponen Reusable**: React memungkinkan pembuatan komponen yang dapat digunakan kembali, meningkatkan efisiensi pengembangan
- **Virtual DOM**: Memberikan performa rendering yang cepat dan efisien
- **Ekosistem yang Luas**: Banyak library pendukung seperti React Router untuk navigasi dan Recharts untuk visualisasi data
- **Mudah Dipelajari**: Dokumentasi lengkap dan komunitas yang besar memudahkan proses pembelajaran

#### **Build Tool: Vite**
- **Kecepatan Development**: Hot Module Replacement (HMR) yang sangat cepat
- **Build Optimized**: Menghasilkan bundle yang lebih kecil dan optimal
- **Modern**: Mendukung ES Modules secara native

#### **Styling: Tailwind CSS**
- **Utility-First**: Memudahkan styling tanpa menulis CSS custom
- **Responsive Design**: Built-in class untuk membuat tampilan responsif
- **Konsistensi**: Memastikan desain yang konsisten di seluruh aplikasi
- **Customizable**: Mudah dikustomisasi sesuai kebutuhan desain

#### **State Management: React Context API**
- **Built-in**: Tidak memerlukan library eksternal tambahan
- **Sederhana**: Mudah diimplementasikan untuk aplikasi skala menengah
- **Efisien**: Menghindari prop drilling dan memudahkan sharing state

#### **HTTP Client: Axios**
- **Promise-based**: Mudah menangani operasi asynchronous
- **Interceptors**: Memudahkan penanganan request dan response secara global
- **Error Handling**: Penanganan error yang lebih baik dibanding fetch API

#### **Real-time Communication: Socket.IO Client**
- **Bi-directional**: Komunikasi dua arah antara client dan server
- **Auto-reconnection**: Otomatis reconnect saat koneksi terputus
- **Event-based**: Mudah menangani berbagai jenis event real-time

#### **Data Visualization: Recharts**
- **React Native**: Dibuat khusus untuk React
- **Responsive**: Otomatis menyesuaikan dengan ukuran container
- **Customizable**: Mudah dikustomisasi sesuai kebutuhan
- **Dokumentasi Lengkap**: Memudahkan implementasi berbagai jenis chart

---

## 2. TUJUAN PEMBUATAN PROYEK

### 2.1 Tujuan Umum

Tujuan umum dari pembuatan proyek ini adalah:

1. **Menyediakan Sistem Manajemen Terpusat**
   - Membangun platform web yang dapat diakses administrator untuk mengelola seluruh aspek sistem chatbot dari satu tempat

2. **Meningkatkan Efisiensi Operasional**
   - Mengotomatisasi proses-proses manual dalam pengelolaan chatbot dan pengguna

3. **Memberikan Insight Berbasis Data**
   - Menyediakan visualisasi dan analisis data untuk membantu pengambilan keputusan

4. **Memastikan Keamanan Sistem**
   - Mengimplementasikan sistem autentikasi dan otorisasi untuk melindungi data sensitif

### 2.2 Tujuan Khusus

Tujuan khusus yang ingin dicapai meliputi:

1. **Dashboard Monitoring Real-time**
   - Menampilkan statistik pengguna aktif, total pengguna, dan chat hari ini
   - Visualisasi tren penggunaan dalam bentuk grafik (mingguan, bulanan, tahunan)
   - Menampilkan top 5 pertanyaan yang paling sering diajukan
   - Update data secara real-time menggunakan WebSocket

2. **Sistem Manajemen Pengguna Lengkap**
   - CRUD (Create, Read, Update, Delete) data pengguna
   - Fitur pencarian dan filter pengguna
   - Toggle status aktif/non-aktif pengguna
   - Proteksi khusus untuk akun administrator
   - Pencatatan tanggal bergabung setiap pengguna

3. **Riwayat Chat Terstruktur**
   - Menampilkan semua riwayat percakapan pengguna dengan chatbot
   - Fitur pencarian berdasarkan email pengguna atau judul chat
   - Tampilan detail percakapan dengan format yang mudah dibaca
   - Support untuk format markdown dalam pesan (bold, list, numbering)
   - Update real-time saat ada chat baru

4. **Manajemen Database Terintegrasi**
   - Import data dari API eksternal dengan mudah
   - Preview data sebelum melakukan import
   - Deteksi otomatis struktur data dari API
   - Pencatatan metadata import (tanggal, jumlah record, sumber API)
   - Fitur pencarian database yang telah diimport

5. **Sistem Autentikasi Aman**
   - Login khusus untuk administrator
   - Session management dengan token expiration
   - Protected routes untuk halaman admin
   - Auto-redirect ke login jika session expired

6. **User Interface yang Intuitif**
   - Desain modern dan responsif (mobile, tablet, desktop)
   - Multiple theme options (Default, Glass Light, Glass Dark, Cyberpunk)
   - Sidebar yang dapat di-collapse untuk menghemat ruang layar
   - Loading states dan feedback visual untuk setiap aksi
   - Animasi smooth untuk meningkatkan user experience

7. **Chatbot Widget Terintegrasi**
   - Widget chatbot yang dapat diakses dari panel admin
   - Multiple theme chatbot (Modern, Dark, Minimal, Pink, SpongeBob)
   - Fitur delete message (individual atau semua)
   - Animasi menarik untuk setiap theme
   - Auto-save conversation ke localStorage

---

## 3. MANFAAT PROYEK

### 3.1 Manfaat bagi Pengguna (Administrator)

1. **Efisiensi Waktu**
   - Mengurangi waktu yang dibutuhkan untuk mengelola pengguna dan data
   - Proses import database yang sebelumnya manual kini otomatis
   - Pencarian data yang cepat dengan fitur search

2. **Kemudahan Monitoring**
   - Dashboard yang informatif memberikan gambaran cepat tentang kondisi sistem
   - Visualisasi data memudahkan identifikasi tren dan pola
   - Notifikasi real-time untuk aktivitas penting

3. **Kontrol Penuh**
   - Dapat mengaktifkan/menonaktifkan pengguna kapan saja
   - Akses ke semua riwayat percakapan untuk audit
   - Kontrol penuh terhadap database yang digunakan chatbot

4. **Pengambilan Keputusan Berbasis Data**
   - Analisis pertanyaan populer membantu mengidentifikasi kebutuhan pengguna
   - Statistik penggunaan membantu evaluasi performa sistem
   - Data historis untuk perencanaan pengembangan

### 3.2 Manfaat bagi Instansi

1. **Peningkatan Kualitas Layanan**
   - Chatbot yang terkelola dengan baik memberikan respons lebih akurat
   - Monitoring real-time memastikan sistem selalu berjalan optimal
   - Analisis data membantu continuous improvement

2. **Efisiensi Operasional**
   - Mengurangi beban kerja tim support dengan otomasi
   - Satu platform untuk semua kebutuhan manajemen chatbot
   - Mengurangi biaya operasional jangka panjang

3. **Keamanan Data**
   - Sistem autentikasi melindungi data sensitif
   - Audit trail melalui riwayat chat
   - Kontrol akses yang ketat

4. **Skalabilitas**
   - Mudah menambah pengguna baru
   - Dapat mengintegrasikan multiple sumber data
   - Arsitektur yang mendukung pertumbuhan

### 3.3 Manfaat bagi Siswa PKL

1. **Pengalaman Praktis**
   - Pengalaman langsung membangun aplikasi web full-stack
   - Pemahaman tentang arsitektur aplikasi modern
   - Praktik langsung dengan teknologi industri terkini

2. **Peningkatan Skill Teknis**
   - Menguasai React.js dan ekosistemnya
   - Memahami konsep state management
   - Belajar implementasi real-time communication dengan WebSocket
   - Praktik REST API integration
   - Pengalaman dengan responsive design

3. **Soft Skills**
   - Problem solving dalam menghadapi tantangan teknis
   - Manajemen waktu dalam menyelesaikan proyek
   - Dokumentasi teknis yang baik
   - Pemahaman tentang user experience

4. **Portfolio**
   - Proyek nyata yang dapat ditampilkan dalam portfolio
   - Demonstrasi kemampuan teknis kepada calon employer
   - Bukti kemampuan menyelesaikan proyek end-to-end

---

## 4. DESKRIPSI UMUM APLIKASI

### 4.1 Gambaran Singkat Aplikasi

**Panel Admin Chatbot AI** adalah aplikasi web berbasis React.js yang berfungsi sebagai sistem manajemen terpusat untuk chatbot AI. Aplikasi ini menyediakan interface yang user-friendly bagi administrator untuk:

- Memantau aktivitas dan statistik penggunaan chatbot secara real-time
- Mengelola data pengguna yang terdaftar dalam sistem
- Melihat dan menganalisis riwayat percakapan
- Mengatur database pengetahuan chatbot
- Mengimport data dari sumber eksternal melalui API
- Berinteraksi langsung dengan chatbot melalui widget terintegrasi

Aplikasi ini dibangun dengan arsitektur modern menggunakan komponen-komponen yang modular dan reusable, memastikan kemudahan maintenance dan pengembangan di masa depan.

### 4.2 Cara Kerja Sistem Secara Umum

Sistem bekerja dengan alur sebagai berikut:

1. **Autentikasi**
   - Administrator mengakses halaman login
   - Sistem memvalidasi kredensial (email dan password)
   - Jika valid, sistem membuat token session dan menyimpannya di localStorage
   - Token memiliki masa berlaku 30 menit
   - Setelah login berhasil, administrator diarahkan ke dashboard

2. **Dashboard & Monitoring**
   - Sistem mengambil data dari backend API
   - Data ditampilkan dalam bentuk statistik dan grafik
   - WebSocket connection dibuat untuk update real-time
   - Setiap ada perubahan data (user baru, chat baru), dashboard otomatis update

3. **Manajemen Data**
   - Administrator dapat melakukan operasi CRUD pada data pengguna
   - Setiap perubahan data langsung disinkronkan ke database
   - WebSocket mengirim notifikasi ke semua client yang terhubung
   - Perubahan langsung terlihat tanpa perlu refresh halaman

4. **Real-time Communication**
   - Aplikasi membuat koneksi WebSocket ke server saat pertama kali dimuat
   - Koneksi ini tetap aktif selama aplikasi berjalan
   - Server mengirim event saat ada perubahan data (user_added, new_chat, dll)
   - Client mendengarkan event dan update UI secara otomatis
   - Jika koneksi terputus, sistem otomatis mencoba reconnect

5. **Session Management**
   - Setiap request ke API menyertakan token autentikasi
   - Sistem memeriksa validitas token sebelum mengakses halaman
   - Jika token expired, user otomatis di-redirect ke halaman login
   - Protected routes memastikan hanya user terautentikasi yang dapat akses

### 4.3 Alur Penggunaan Aplikasi

#### **Alur Login**
```
1. User membuka aplikasi → Redirect ke /login
2. User memasukkan email dan password
3. Sistem validasi: email harus "chatbotaiasistent@gmail.com"
4. Jika valid → Kirim request ke backend API
5. Backend validasi kredensial
6. Jika berhasil → Backend kirim token
7. Frontend simpan token + expiry time di localStorage
8. Redirect ke dashboard (/)
```

#### **Alur Dashboard**
```
1. User masuk dashboard
2. Sistem fetch data:
   - Total users dari /api/users
   - Chat history dari /api/chat-history
   - Database info dari /api/databases
3. Sistem analisis data:
   - Hitung user aktif
   - Hitung chat hari ini
   - Analisis top 5 pertanyaan
   - Generate data untuk grafik
4. Tampilkan dalam bentuk cards dan charts
5. Setup WebSocket listener untuk real-time update
```

#### **Alur Manajemen User**
```
1. User klik menu "Manajemen Pengguna"
2. Sistem fetch semua user dari API
3. Tampilkan dalam tabel dengan fitur:
   - Search/filter
   - View detail
   - Edit data
   - Delete user
   - Toggle status
4. Saat ada perubahan:
   - Kirim request ke API
   - API update database
   - API broadcast event via WebSocket
   - Semua client update UI
```

#### **Alur Riwayat Chat**
```
1. User klik menu "Riwayat Chat"
2. Sistem fetch semua chat history
3. Tampilkan list chat di sidebar kiri
4. User klik salah satu chat
5. Sistem fetch messages untuk chat tersebut
6. Tampilkan percakapan di area utama
7. Format message dengan markdown support
8. WebSocket listener untuk chat baru
```

#### **Alur Import Database**
```
1. User klik "Import dari API"
2. Modal terbuka dengan form:
   - Nama koneksi
   - API URL
   - API Key (optional)
3. User klik "Preview Data"
4. Sistem kirim request ke API preview endpoint
5. Backend fetch data dari API eksternal
6. Backend analisis struktur data
7. Tampilkan preview: jumlah record, columns, sample data
8. User input nama database
9. User klik "Import to Database"
10. Backend import data ke database
11. Simpan metadata import
12. Update list database yang sudah diimport
```

---

## 5. STRUKTUR FOLDER DAN FILE

### 5.1 Struktur Folder Utama

```
Chatbot-admin/
├── public/              # File statis (gambar, icon, manifest)
├── src/                 # Source code aplikasi
│   ├── assets/         # Asset seperti gambar, icon
│   ├── components/     # Komponen React reusable
│   ├── config/         # File konfigurasi
│   ├── contexts/       # React Context untuk state management
│   ├── layouts/        # Layout komponen
│   ├── pages/          # Halaman-halaman aplikasi
│   ├── routes/         # Konfigurasi routing
│   ├── services/       # Service untuk API calls
│   ├── styles/         # File CSS global
│   └── utils/          # Utility functions
├── .env                # Environment variables
├── index.html          # HTML entry point
├── package.json        # Dependencies dan scripts
├── tailwind.config.js  # Konfigurasi Tailwind CSS
└── vite.config.js      # Konfigurasi Vite
```

### 5.2 Penjelasan Detail Setiap Folder

#### **📁 public/**
Folder ini berisi file-file statis yang dapat diakses langsung oleh browser.

**File-file penting:**
- `favicon.ico`, `favicon.svg` - Icon aplikasi yang muncul di tab browser
- `logo_mm-removebg-preview.png` - Logo aplikasi yang digunakan di sidebar
- `Gemini_Generated_Image_y8ny9ry8ny9ry8ny__1_-removebg-preview.png` - Gambar ilustrasi chatbot
- `android-chrome-*.png`, `apple-touch-icon.png` - Icon untuk berbagai device
- `site.webmanifest` - Manifest untuk Progressive Web App (PWA)

**Fungsi:** Menyimpan asset statis yang tidak perlu diproses oleh bundler dan dapat diakses langsung melalui URL.

#### **📁 src/assets/**
Folder untuk menyimpan asset yang akan diimport dalam komponen React.

**File:**
- `react.svg` - Logo React (default dari template)

**Fungsi:** Asset yang diimport akan diproses oleh Vite dan di-optimize saat build.

#### **📁 src/components/**
Folder berisi komponen React yang dapat digunakan kembali di berbagai halaman.

**File dan Fungsinya:**

1. **ChatbotWidget.jsx**
   - Komponen widget chatbot yang muncul di pojok kanan bawah
   - Fitur: multiple themes, delete messages, markdown support
   - Terintegrasi dengan chatbot service untuk komunikasi dengan AI
   - Menyimpan conversation history di localStorage

2. **GlassComponents.jsx**
   - Komponen dengan efek glass morphism
   - Digunakan untuk theme glass (light, dark, cyber)
   - Memberikan efek visual modern dengan backdrop blur

3. **PageHeader.jsx**
   - Komponen header untuk setiap halaman
   - Menampilkan judul halaman
   - Konsisten di seluruh aplikasi

4. **SearchBar.jsx**
   - Komponen search bar reusable
   - Digunakan di halaman User List, Chat History, Database Manager
   - Fitur: real-time search, clear button, responsive

5. **Sidebar.jsx**
   - Komponen navigasi utama aplikasi
   - Fitur: collapsible, responsive, theme support
   - Menu items: Dashboard, Users, Chats, Settings, API Database, API Keys
   - Logout functionality dengan konfirmasi modal

**Fungsi Folder:** Memisahkan komponen reusable agar dapat digunakan di berbagai tempat tanpa duplikasi kode.


#### **📁 src/config/**
Folder untuk file konfigurasi aplikasi.

**File:**

1. **api-config.js**
   - Konfigurasi URL backend API
   - Fungsi `getBackendUrl()` untuk deteksi environment otomatis
   - Support untuk localhost, devtunnels, dan production
   - Export `API_CONFIG` object dengan `BACKEND_URL`

**Fungsi:** Centralisasi konfigurasi agar mudah diubah tanpa mengubah banyak file.

#### **📁 src/contexts/**
Folder berisi React Context untuk state management global.

**File dan Fungsinya:**

1. **AuthContext.jsx**
   - Mengelola state autentikasi user
   - Fungsi: `checkAuth()`, `logout()`
   - Menyediakan `isAuthenticated` state ke seluruh aplikasi
   - Auto-redirect ke login jika tidak terautentikasi

2. **PageContext.jsx**
   - Context untuk state halaman (jika ada)
   - Mengelola state yang perlu di-share antar halaman

3. **ThemeContext.jsx**
   - Mengelola theme aplikasi (Default, Glass Light, Glass Dark, Cyberpunk)
   - Menyimpan pilihan theme di localStorage
   - Fungsi: `setTheme()` untuk ganti theme
   - Apply theme ke document root dengan data-attribute

**Fungsi Folder:** Menghindari prop drilling dan memudahkan sharing state global.

#### **📁 src/layouts/**
Folder berisi layout komponen yang membungkus halaman.

**File:**

1. **AdminLayout.jsx**
   - Layout utama untuk semua halaman admin
   - Berisi: Sidebar, Main Content Area, ChatbotWidget
   - Mengelola state sidebar (open/close)
   - Loading state saat perpindahan halaman
   - Responsive design (mobile, tablet, desktop)
   - Context providers: SidebarContext, ChatbotContext

**Fungsi:** Konsistensi layout di seluruh aplikasi dan menghindari duplikasi kode layout.

#### **📁 src/pages/**
Folder berisi halaman-halaman utama aplikasi, diorganisir per fitur.

**Struktur:**
```
pages/
├── chatbot/
│   └── ChatbotWidget.jsx
├── chats/
│   └── ChatHistory.jsx
├── dashboardPage/
│   └── Dashboard.jsx
├── database/
│   └── ApiDatabaseManager.jsx
├── loginPage/
│   └── Login.jsx
├── settings/
│   ├── ApiKeys.jsx
│   └── AppSettings.jsx
└── user/
    └── UserList.jsx
```

**Penjelasan Setiap Halaman:**

1. **loginPage/Login.jsx**
   - Halaman login untuk administrator
   - Validasi: hanya email "chatbotaiasistent@gmail.com" yang bisa login
   - Fitur: show/hide password on hover, animated background
   - Responsive design dengan ilustrasi
   - Auto-redirect jika sudah login

2. **dashboardPage/Dashboard.jsx**
   - Halaman utama setelah login
   - Menampilkan 4 stat cards: Total Users, Chat Hari Ini, User Aktif, Total Database
   - 3 grafik:
     * Bar Chart: Pengguna Baru (filter: mingguan, bulanan, tahunan)
     * List: Top 5 Chat Tren
     * Line Chart: Tren Chat (filter: mingguan, bulanan)
   - Real-time update via WebSocket
   - Responsive grid layout

3. **user/UserList.jsx**
   - Halaman manajemen pengguna
   - Fitur CRUD lengkap: Create, Read, Update, Delete
   - Tabel dengan kolom: ID, Nama, Email, No HP, Status, Tanggal Bergabung, Aksi
   - Search/filter pengguna
   - Modal untuk view detail, add, edit
   - Toggle status aktif/non-aktif
   - Proteksi: admin tidak bisa dihapus
   - Real-time update via WebSocket
   - Toast notification untuk feedback

4. **chats/ChatHistory.jsx**
   - Halaman riwayat percakapan
   - Layout 2 kolom: List chat (kiri) dan Detail chat (kanan)
   - Search chat berdasarkan email atau judul
   - Format message dengan markdown support (bold, list, numbering)
   - Tampilan bubble chat seperti aplikasi messaging
   - Auto-scroll ke pesan terbaru
   - Real-time update saat ada chat/message baru
   - Analisis pertanyaan populer dan chat hari ini

5. **database/ApiDatabaseManager.jsx**
   - Halaman untuk import database dari API eksternal
   - Fitur:
     * Input API URL dan API Key
     * Preview data sebelum import
     * Deteksi otomatis struktur data (columns, total records)
     * Import data ke database dengan nama custom
     * Tabel database yang sudah diimport
   - Search database
   - Modal dengan layout 2 kolom (konfigurasi dan preview)

6. **settings/AppSettings.jsx**
   - Halaman konfigurasi database lokal
   - Manajemen database yang digunakan chatbot

7. **settings/ApiKeys.jsx**
   - Halaman manajemen API keys untuk AI (Gemini, OpenAI, dll)
   - CRUD API keys
   - Keamanan: API key di-mask saat ditampilkan

**Fungsi Folder:** Organisasi halaman berdasarkan fitur memudahkan navigasi kode dan maintenance.

#### **📁 src/routes/**
Folder berisi konfigurasi routing aplikasi.

**File:**

1. **AppRoutes.jsx**
   - Definisi semua route aplikasi
   - Route public: `/login`
   - Route protected (butuh autentikasi):
     * `/` dan `/dashboard` → Dashboard
     * `/users` → UserList
     * `/chats` → ChatHistory
     * `/api-database` → ApiDatabaseManager
     * `/settings` → AppSettings
     * `/api-keys` → ApiKeys
   - Menggunakan `ProtectedRoute` wrapper untuk route yang butuh auth

2. **ProtectedRoute.jsx**
   - Higher-Order Component untuk proteksi route
   - Cek token dan expiry time di localStorage
   - Jika tidak valid → redirect ke `/login`
   - Jika valid → render `<Outlet />` (child routes)
   - Menyimpan location sebelumnya untuk redirect setelah login

**Fungsi Folder:** Centralisasi routing dan security logic.

#### **📁 src/services/**
Folder berisi service layer untuk komunikasi dengan backend.

**File:**

1. **api.js**
   - Service untuk semua HTTP request ke backend
   - Menggunakan fetch API
   - Fungsi-fungsi:
     * `loginApi(data)` - Login
     * `getUsers()` - Get all users
     * `addUser(data)` - Create user
     * `updateUser(id, data)` - Update user
     * `deleteUser(id)` - Delete user
     * `toggleUserStatus(id, status)` - Toggle user status
     * `getChatHistory()` - Get all chat histories
     * `getChatMessages(chatHistoryId)` - Get messages for specific chat
     * `deleteChatHistory(id)` - Delete chat
     * `previewApiData(data)` - Preview data from external API
     * `importDatabaseFromApi(data)` - Import database from API
   - Semua fungsi return Promise dengan JSON response

2. **chatbotService.js**
   - Service untuk komunikasi dengan chatbot AI
   - Fungsi `sendMessage(message)` - Kirim pesan ke chatbot dan terima respons
   - Handle error dan timeout

3. **socket.js**
   - Service untuk WebSocket connection
   - Fungsi:
     * `connectSocket()` - Buat koneksi WebSocket
     * `disconnectSocket()` - Tutup koneksi
     * `getSocket()` - Get socket instance
   - Auto-reconnection dengan exponential backoff
   - Heartbeat mechanism (ping/pong) setiap 25 detik
   - Event listeners: connect, disconnect, connect_error, pong

**Fungsi Folder:** Abstraksi logic komunikasi dengan backend, memudahkan testing dan maintenance.

#### **📁 src/styles/**
Folder berisi file CSS global.

**File:**

1. **themes.css**
   - Definisi CSS variables untuk setiap theme
   - Theme: default, glass_light, glass_dark, glass_cyber
   - Variables: colors, backgrounds, borders, shadows, fonts
   - Animations: slideInLeft, scale-in, slide-in, float
   - Loading animations untuk setiap theme

2. **sidebar-tooltip.css**
   - Styling khusus untuk tooltip sidebar
   - Animasi fade in/out
   - Positioning dan arrow

**Fungsi:** Styling global yang dapat digunakan di seluruh aplikasi.

#### **📁 src/utils/**
Folder untuk utility functions (helper functions).

**Fungsi:** Menyimpan fungsi-fungsi helper yang dapat digunakan di berbagai tempat.

### 5.3 File Konfigurasi Root

#### **.env**
File environment variables untuk konfigurasi yang berbeda per environment.

**Isi:**
```
VITE_BACKEND_URL=http://10.251.108.24:3000
```

**Fungsi:** Menyimpan URL backend yang dapat berbeda antara development dan production.

#### **package.json**
File konfigurasi npm yang berisi informasi proyek dan dependencies.

**Dependencies Utama:**
- `react` & `react-dom` (v19.2.0) - Library React
- `react-router-dom` (v7.13.0) - Routing
- `axios` (v1.13.5) - HTTP client
- `socket.io-client` (v4.8.3) - WebSocket client
- `recharts` (v3.7.0) - Charting library

**DevDependencies:**
- `vite` (v7.2.4) - Build tool
- `tailwindcss` (v3.4.17) - CSS framework
- `eslint` - Code linting
- `prettier` - Code formatting

**Scripts:**
- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview production build
- `npm run lint` - Jalankan linter
- `npm run format` - Format code dengan Prettier

#### **tailwind.config.js**
Konfigurasi Tailwind CSS.

**Isi:**
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**Fungsi:** Menentukan file mana yang akan di-scan untuk class Tailwind dan konfigurasi theme.

#### **vite.config.js**
Konfigurasi Vite build tool.

**Isi:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**Fungsi:** Konfigurasi plugin React untuk Vite (Fast Refresh, JSX transform).

#### **index.html**
File HTML entry point aplikasi.

**Fungsi:** 
- Menyediakan root element (`<div id="root">`)
- Import script utama (`/src/main.jsx`)
- Meta tags untuk SEO dan responsive design

---

## 6. TEKNOLOGI YANG DIGUNAKAN

### 6.1 Bahasa Pemrograman

#### **JavaScript (ES6+)**
JavaScript adalah bahasa pemrograman yang digunakan untuk membangun seluruh aplikasi frontend.

**Fitur ES6+ yang digunakan:**
- **Arrow Functions** - Sintaks function yang lebih ringkas
- **Destructuring** - Ekstrak nilai dari object/array dengan mudah
- **Spread Operator** - Copy dan merge object/array
- **Template Literals** - String interpolation dengan backticks
- **Async/Await** - Penanganan operasi asynchronous yang lebih clean
- **Modules (import/export)** - Organisasi kode modular
- **Optional Chaining (?.)** - Akses property nested dengan aman
- **Nullish Coalescing (??)** - Default value yang lebih baik

**Contoh penggunaan:**
```javascript
// Arrow function & destructuring
const { users, loading } = await getUsers();

// Spread operator
setUsers([newUser, ...users]);

// Template literals
const message = `Total: ${users.length} users`;

// Async/await
const fetchData = async () => {
  try {
    const data = await api.getUsers();
    setUsers(data);
  } catch (error) {
    console.error(error);
  }
};
```

### 6.2 Framework dan Library

#### **1. React.js (v19.2.0)**
Library JavaScript untuk membangun user interface berbasis komponen.

**Fitur yang digunakan:**
- **Functional Components** - Komponen berbasis function (bukan class)
- **Hooks** - useState, useEffect, useContext, useRef, useCallback
- **JSX** - Sintaks XML-like untuk menulis UI
- **Virtual DOM** - Rendering yang efisien
- **Component Composition** - Membangun UI dari komponen kecil

**Alasan pemilihan:**
- Ekosistem yang matang dan komunitas besar
- Performa tinggi dengan Virtual DOM
- Mudah dipelajari dan banyak resource
- Cocok untuk aplikasi single-page (SPA)

#### **2. React Router DOM (v7.13.0)**
Library untuk routing di aplikasi React.

**Fitur yang digunakan:**
- **BrowserRouter** - Router utama menggunakan HTML5 History API
- **Routes & Route** - Definisi route
- **Navigate** - Programmatic navigation
- **useNavigate** - Hook untuk navigasi
- **useLocation** - Hook untuk akses location object
- **Outlet** - Render child routes (untuk nested routing)

**Contoh:**
```javascript
<Routes>
  <Route path="/login" element={<Login />} />
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/users" element={<UserList />} />
  </Route>
</Routes>
```

#### **3. Tailwind CSS (v3.4.17)**
Utility-first CSS framework untuk styling.

**Fitur yang digunakan:**
- **Utility Classes** - Class untuk setiap style property
- **Responsive Design** - Prefix untuk breakpoints (sm:, md:, lg:, xl:)
- **Flexbox & Grid** - Layout modern
- **Colors & Spacing** - System warna dan spacing konsisten
- **Hover & Focus States** - Interactive states
- **Animations** - Built-in animations (animate-pulse, animate-bounce, dll)

**Contoh:**
```jsx
<div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
  <h1 className="text-2xl font-bold text-gray-800 mb-4">Title</h1>
  <p className="text-gray-600">Content</p>
</div>
```

**Alasan pemilihan:**
- Development lebih cepat tanpa menulis CSS custom
- Konsistensi design system
- File size kecil (hanya class yang digunakan)
- Responsive design yang mudah

#### **4. Recharts (v3.7.0)**
Library charting untuk React.

**Komponen yang digunakan:**
- **BarChart** - Grafik batang untuk data pengguna
- **LineChart** - Grafik garis untuk tren chat
- **PieChart** - Grafik pie (jika diperlukan)
- **ResponsiveContainer** - Container responsive untuk chart
- **CartesianGrid** - Grid background
- **XAxis & YAxis** - Axis chart
- **Tooltip** - Tooltip saat hover
- **Legend** - Legend chart

**Contoh:**
```jsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={monthlyUsersData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="users" fill="#10b981" />
  </BarChart>
</ResponsiveContainer>
```

**Alasan pemilihan:**
- Dibuat khusus untuk React
- Responsive dan customizable
- Dokumentasi lengkap
- Performa baik

#### **5. Axios (v1.13.5)**
HTTP client berbasis Promise untuk request ke backend.

**Fitur yang digunakan:**
- **GET, POST, PUT, DELETE, PATCH** - HTTP methods
- **Promise-based** - Async/await support
- **Request/Response Interceptors** - Modify request/response globally
- **Error Handling** - Centralized error handling
- **Timeout** - Set timeout untuk request

**Contoh:**
```javascript
const response = await axios.post(`${API_URL}/api/users`, {
  nama: 'John Doe',
  email: 'john@example.com'
}, {
  headers: { 'Content-Type': 'application/json' }
});
```

**Alasan pemilihan:**
- Lebih powerful dari fetch API
- Interceptors untuk global config
- Better error handling
- Automatic JSON transformation

#### **6. Socket.IO Client (v4.8.3)**
Library untuk real-time bidirectional communication.

**Fitur yang digunakan:**
- **Event-based Communication** - Emit dan listen events
- **Auto-reconnection** - Otomatis reconnect saat disconnect
- **Heartbeat** - Ping/pong untuk keep-alive
- **Multiple Transports** - WebSocket, polling fallback

**Events yang digunakan:**
- `connect` - Saat koneksi berhasil
- `disconnect` - Saat koneksi terputus
- `user_added` - Saat user baru ditambahkan
- `user_updated` - Saat user diupdate
- `user_deleted` - Saat user dihapus
- `user_status_changed` - Saat status user berubah
- `new_chat` - Saat chat baru dibuat
- `new_message` - Saat message baru dikirim

**Contoh:**
```javascript
const socket = connectSocket();

socket.on('user_added', (newUser) => {
  setUsers(prev => [newUser, ...prev]);
});

socket.on('new_message', (message) => {
  setMessages(prev => [...prev, message]);
});
```

**Alasan pemilihan:**
- Real-time update tanpa polling
- Reliable dengan auto-reconnection
- Event-based yang mudah digunakan
- Support untuk berbagai transport

### 6.3 Build Tools

#### **Vite (v7.2.4)**
Next-generation frontend build tool.

**Fitur:**
- **Instant Server Start** - Server development yang sangat cepat
- **Lightning Fast HMR** - Hot Module Replacement instant
- **Optimized Build** - Build production yang optimal dengan Rollup
- **Plugin Ecosystem** - Banyak plugin tersedia
- **Native ES Modules** - Menggunakan ES modules native browser

**Keunggulan dibanding Webpack:**
- Development server 10-100x lebih cepat
- HMR yang instant tanpa lag
- Konfigurasi yang lebih simple
- Build time lebih cepat

### 6.4 Database (Backend)

Meskipun ini adalah aplikasi frontend, aplikasi ini terhubung dengan backend yang menggunakan:

**PostgreSQL**
- Database relational untuk menyimpan data users, chat history, messages
- Struktur tabel yang terorganisir dengan foreign keys
- Support untuk complex queries dan transactions

**Tabel utama:**
1. **users** - Data pengguna (id, nama, email, telepon, status, dibuat_pada)
2. **chat_history** - Riwayat chat (id, user_email, judul, dibuat_pada, diperbarui_pada)
3. **messages** - Pesan dalam chat (id, chat_history_id, peran, konten, dibuat_pada)
4. **databases** - Metadata database yang diimport (id, name, apiUrl, apiKey, records, importedAt)

### 6.5 Alasan Pemilihan Teknologi

**Kombinasi teknologi ini dipilih karena:**

1. **Modern & Up-to-date**
   - Semua teknologi menggunakan versi terbaru
   - Mengikuti best practices industri
   - Support jangka panjang

2. **Developer Experience**
   - Vite memberikan development experience yang sangat baik
   - React Hooks membuat kode lebih clean
   - Tailwind mempercepat styling
   - Hot reload yang instant

3. **Performance**
   - Virtual DOM React untuk rendering efisien
   - Vite build yang optimal
   - WebSocket untuk real-time tanpa polling
   - Lazy loading dan code splitting

4. **Maintainability**
   - Kode modular dengan komponen
   - Type safety dengan PropTypes (jika digunakan)
   - Consistent code style dengan Prettier & ESLint
   - Clear separation of concerns

5. **Scalability**
   - Arsitektur yang mendukung pertumbuhan
   - Easy to add new features
   - Component reusability
   - State management yang scalable

6. **Community & Ecosystem**
   - Dokumentasi lengkap
   - Banyak tutorial dan resource
   - Active community
   - Banyak library pendukung

---


## 7. FITUR-FITUR APLIKASI

### 7.1 Sistem Autentikasi

#### **Fungsi**
Memastikan hanya administrator yang berwenang yang dapat mengakses panel admin.

#### **Cara Kerja**
1. User membuka aplikasi → otomatis redirect ke `/login` jika belum login
2. User memasukkan email dan password
3. Sistem validasi di frontend: email harus `chatbotaiasistent@gmail.com`
4. Jika lolos validasi frontend, kirim request ke backend `/api/auth/login`
5. Backend validasi kredensial dengan database
6. Jika valid, backend generate JWT token dan kirim ke frontend
7. Frontend simpan token dan expiry time (30 menit) di localStorage
8. Redirect ke dashboard
9. Setiap request ke API menyertakan token di header
10. Jika token expired, auto-redirect ke login

#### **Output yang Dihasilkan**
- Token JWT disimpan di localStorage
- User terautentikasi dapat akses semua halaman admin
- Session otomatis expired setelah 30 menit
- Error message jika kredensial salah

#### **Keamanan**
- Password tidak ditampilkan (type password)
- Token memiliki expiry time
- Protected routes mencegah akses tanpa autentikasi
- Validasi di frontend dan backend (double validation)

### 7.2 Dashboard Monitoring

#### **Fungsi**
Memberikan overview cepat tentang kondisi sistem chatbot dengan visualisasi data yang informatif.

#### **Cara Kerja**

**1. Fetch Data Awal**
```javascript
// Saat dashboard dimuat
useEffect(() => {
  fetchTotalUsers();      // Get data users
  fetchTotalDatabases();  // Get data databases
  fetchChatData();        // Get chat history
  fetchAndAnalyzeChats(); // Analisis pertanyaan populer
}, []);
```

**2. Kalkulasi Statistik**
- **Total Pengguna**: Hitung semua user dari API
- **Pengguna Aktif**: Filter user dengan status 'active'
- **Chat Hari Ini**: Loop semua chat, ambil messages, filter yang hari ini
- **Total Database**: Hitung database yang sudah diimport

**3. Analisis Top 5 Pertanyaan**
```javascript
// Pseudocode
for (setiap chat) {
  ambil semua messages
  filter hanya pesan dari user
  hitung frekuensi setiap pertanyaan
}
sort berdasarkan frekuensi (descending)
ambil top 5
```

**4. Generate Data Grafik**

**Grafik Pengguna (Mingguan):**
```javascript
// Hitung user yang bergabung per hari dalam seminggu ini
const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const counts = [0, 0, 0, 0, 0, 0, 0];

users.forEach(user => {
  const userDate = new Date(user.dibuat_pada);
  if (userDate dalam minggu ini) {
    const dayIndex = userDate.getDay();
    counts[dayIndex]++;
  }
});

return days.map((name, index) => ({ name, users: counts[index] }));
```

**Grafik Chat (Bulanan):**
```javascript
// Hitung total messages per bulan dalam tahun ini
const months = ["Jan", "Feb", "Mar", ...];
const counts = [0, 0, 0, ...]; // 12 bulan

for (setiap chat) {
  const messages = await getChatMessages(chat.id);
  messages.forEach(message => {
    if (message tahun ini) {
      const monthIndex = message.getMonth();
      counts[monthIndex]++;
    }
  });
}

return months.map((name, index) => ({ name, chats: counts[index] }));
```

**5. Real-time Update**
```javascript
// Setup WebSocket listeners
socket.on('user_added', () => {
  fetchTotalUsers(); // Refresh data users
});

socket.on('new_chat', () => {
  fetchChatData();        // Refresh chat data
  fetchAndAnalyzeChats(); // Re-analisis pertanyaan
});

socket.on('new_message', () => {
  fetchChatData();
  fetchAndAnalyzeChats();
});
```

#### **Output yang Dihasilkan**

**1. Stat Cards (4 cards)**
- Total Pengguna: Angka total + icon users
- Chat Hari Ini: Jumlah pesan hari ini + icon chat
- Pengguna Aktif: Jumlah user aktif + icon user-check
- Total Database: Jumlah database + icon database

**2. Bar Chart - Pengguna**
- X-axis: Hari/Bulan/Tahun (tergantung filter)
- Y-axis: Jumlah pengguna
- Warna: Hijau (#10b981)
- Filter: Mingguan, Bulanan, Tahunan

**3. Top 5 Chat Tren**
- List dengan ranking (1-5)
- Pertanyaan yang paling sering diajukan
- Jumlah kemunculan setiap pertanyaan
- Badge dengan nomor ranking

**4. Line Chart - Chat**
- X-axis: Hari/Bulan (tergantung filter)
- Y-axis: Jumlah chat
- Warna: Biru (#1e40af)
- Filter: Mingguan, Bulanan

#### **Responsive Design**
- Mobile: Cards stack vertikal, charts full width
- Tablet: Grid 2 kolom
- Desktop: Grid 4 kolom untuk cards, 2 kolom untuk charts

### 7.3 Manajemen Pengguna

#### **Fungsi**
Mengelola data pengguna yang terdaftar dalam sistem chatbot (Create, Read, Update, Delete).

#### **Cara Kerja**

**1. Tampilkan Data Pengguna**
```javascript
// Fetch semua users dari API
const fetchUsers = async () => {
  const data = await getUsers();
  setUsers(data.users);
  
  // Hitung user aktif
  const activeUsers = data.users.filter(u => u.status === 'active');
  setActiveUsers(activeUsers.length);
};
```

**2. Tambah Pengguna Baru**
```
User klik "Tambah Pengguna"
→ Modal terbuka dengan form kosong
→ User isi: Nama, Email, No HP, Status
→ User klik "Simpan"
→ Validasi: Email wajib diisi
→ Kirim POST request ke /api/users
→ Backend insert ke database
→ Backend broadcast event 'user_added' via WebSocket
→ Semua client yang terhubung terima event
→ Update UI tanpa refresh
→ Tampilkan toast notification "Pengguna berhasil ditambahkan!"
```

**3. Edit Pengguna**
```
User klik icon edit pada row user
→ Modal terbuka dengan data user yang dipilih
→ Form terisi otomatis dengan data existing
→ User ubah data yang ingin diubah
→ User klik "Simpan"
→ Kirim PUT request ke /api/users/:id
→ Backend update database
→ Backend broadcast event 'user_updated'
→ Update UI
→ Toast notification "Pengguna berhasil diupdate!"
```

**4. Hapus Pengguna**
```
User klik icon delete
→ Modal konfirmasi muncul
→ User klik "Hapus"
→ Kirim DELETE request ke /api/users/:id
→ Backend delete dari database
→ Backend broadcast event 'user_deleted'
→ User hilang dari tabel
→ Toast notification "Pengguna berhasil dihapus!"
```

**5. Toggle Status**
```
User klik toggle switch pada kolom status
→ Kirim PATCH request ke /api/users/:id/status
→ Backend update status (active ↔ inactive)
→ Backend broadcast event 'user_status_changed'
→ Badge status berubah warna
→ Toast notification "Status pengguna diubah!"
```

**6. Search/Filter**
```javascript
// Real-time search
const filteredUsers = users.filter(user => {
  const query = searchQuery.toLowerCase();
  return (
    user.id.toString().includes(query) ||
    user.nama?.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.telepon?.toLowerCase().includes(query) ||
    (user.status === 'active' ? 'aktif' : 'tidak aktif').includes(query)
  );
});
```

**7. Real-time Update**
```javascript
// WebSocket listeners
socket.on('user_added', (newUser) => {
  setUsers(prev => [newUser, ...prev]); // Tambah ke awal array
  showToast('Pengguna baru ditambahkan!');
});

socket.on('user_updated', (updatedUser) => {
  setUsers(prev => prev.map(u => 
    u.id === updatedUser.id ? updatedUser : u
  ));
  showToast('Data pengguna diupdate!');
});

socket.on('user_deleted', (deletedUserId) => {
  setUsers(prev => prev.filter(u => u.id !== deletedUserId));
  showToast('Pengguna dihapus!');
});

socket.on('user_status_changed', ({ userId, status }) => {
  setUsers(prev => prev.map(u => 
    u.id === userId ? { ...u, status } : u
  ));
  showToast(`Status diubah menjadi ${status}!`);
});
```

#### **Output yang Dihasilkan**

**1. Tabel Pengguna**
Kolom:
- ID: Nomor unik pengguna
- Nama: Nama lengkap (atau "-" jika kosong)
- Email: Email pengguna
- No HP: Nomor telepon (atau "-" jika kosong)
- Status Akun: Badge (Aktif=hijau, Tidak Aktif=merah, Admin=biru)
- Tanggal Bergabung: Format: "1 Januari 2025"
- Aksi: Dropdown menu (View, Edit, Delete)

**2. Modal View Detail**
- Tampilan tabel 2 kolom (Label | Value)
- Semua informasi user ditampilkan
- Read-only (tidak bisa edit)
- Button "Tutup"

**3. Modal Add/Edit**
- Form dengan fields: Nama, Email, No HP, Status
- Toggle switch untuk status (Aktif/Tidak Aktif)
- Validasi: Email wajib diisi
- Button: "Batal" dan "Simpan"

**4. Modal Delete Confirmation**
- Icon warning merah
- Pesan konfirmasi dengan nama user
- Button: "Batal" dan "Hapus"

**5. Toast Notification**
- Muncul di pojok kanan atas
- Background hijau untuk success
- Icon checkmark
- Auto-hide setelah 3 detik
- Button close manual

**6. Search Bar**
- Input dengan icon search
- Placeholder: "Cari pengguna..."
- Real-time filtering
- Clear button (X)

#### **Proteksi Khusus**
- Admin (chatbotaiasistent@gmail.com) tidak bisa dihapus
- Admin selalu aktif (status tidak bisa diubah)
- Badge khusus "Admin" untuk akun admin

### 7.4 Riwayat Chat

#### **Fungsi**
Menampilkan dan menganalisis semua percakapan antara pengguna dan chatbot.

#### **Cara Kerja**

**1. Fetch Chat Histories**
```javascript
const fetchChatHistories = async () => {
  const data = await getChatHistory();
  setChatHistories(data);
  
  // Analisis pertanyaan populer
  await analyzeFrequentQuestions(data);
  
  // Hitung chat hari ini
  await calculateTodayChats(data);
  
  // Set chat pertama sebagai selected (jika ada)
  if (data.length > 0) {
    setSelectedChat(data[0]);
    fetchMessages(data[0].id);
  }
};
```

**2. Fetch Messages untuk Chat Tertentu**
```javascript
const fetchMessages = async (chatHistoryId) => {
  const data = await getChatMessages(chatHistoryId);
  setMessages(data);
  
  // Auto-scroll ke pesan terbaru
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};
```

**3. Analisis Pertanyaan Populer**
```javascript
const analyzeFrequentQuestions = async (allChats) => {
  const questionCount = {};
  
  // Loop semua chat
  for (const chat of allChats) {
    const messages = await getChatMessages(chat.id);
    
    // Filter hanya pesan dari user
    const userMessages = messages.filter(msg => msg.peran === 'user');
    
    // Hitung frekuensi setiap pertanyaan
    userMessages.forEach(msg => {
      const content = msg.konten.toLowerCase().trim();
      if (content) {
        questionCount[content] = (questionCount[content] || 0) + 1;
      }
    });
  }
  
  // Sort dan ambil top 5
  const sortedQuestions = Object.entries(questionCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([question, count]) => ({ name: question, value: count }));
  
  setTopQuestions(sortedQuestions);
};
```

**4. Hitung Chat Hari Ini**
```javascript
const calculateTodayChats = async (allChats) => {
  const today = new Date().toDateString();
  let todayMessagesCount = 0;
  
  for (const chat of allChats) {
    const messages = await getChatMessages(chat.id);
    const todayMessages = messages.filter(message => {
      const messageDate = new Date(message.dibuat_pada);
      return messageDate.toDateString() === today;
    });
    todayMessagesCount += todayMessages.length;
  }
  
  setTodayChats(todayMessagesCount);
};
```

**5. Format Message dengan Markdown**
```javascript
const formatMessageContent = (content) => {
  const lines = content.split('\n');
  const elements = [];
  
  lines.forEach((line, index) => {
    // Numbered list: "1. Item"
    if (line.match(/^\d+\.\s*(.+)$/)) {
      const [, number, text] = line.match(/^(\d+)\.\s*(.+)$/);
      elements.push(
        <div key={index}>
          <span className="font-bold">{number}.</span> {text}
        </div>
      );
    }
    // Bullet list: "- Item" atau "* Item"
    else if (line.match(/^[-*•]\s*(.+)$/)) {
      const text = line.match(/^[-*•]\s*(.+)$/)[1];
      elements.push(
        <div key={index}>
          <span>•</span> {text}
        </div>
      );
    }
    // Bold: "**text**"
    else if (line.includes('**')) {
      const formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      elements.push(<div key={index} dangerouslySetInnerHTML={{ __html: formatted }} />);
    }
    // Regular text
    else {
      elements.push(<div key={index}>{line}</div>);
    }
  });
  
  return elements;
};
```

**6. Real-time Update**
```javascript
socket.on('new_chat', (newChat) => {
  // Tambah chat baru ke list
  setChatHistories(prev => [newChat, ...prev]);
  
  // Re-analisis pertanyaan
  analyzeFrequentQuestions([newChat, ...chatHistories]);
});

socket.on('new_message', (newMessage) => {
  // Jika message untuk chat yang sedang dibuka
  if (selectedChat && newMessage.chat_history_id === selectedChat.id) {
    setMessages(prev => [...prev, newMessage]);
  }
  
  // Update timestamp chat
  setChatHistories(prev => prev.map(chat => 
    chat.id === newMessage.chat_history_id 
      ? { ...chat, diperbarui_pada: new Date().toISOString() }
      : chat
  ).sort((a, b) => new Date(b.diperbarui_pada) - new Date(a.diperbarui_pada)));
});
```

**7. Search Chat**
```javascript
const filteredChatHistories = chatHistories.filter(chat => {
  const query = searchQuery.toLowerCase();
  return (
    chat.user_email.toLowerCase().includes(query) ||
    chat.judul.toLowerCase().includes(query) ||
    new Date(chat.dibuat_pada).toLocaleDateString('id-ID').includes(query)
  );
});
```

#### **Output yang Dihasilkan**

**1. Layout 2 Kolom**

**Kolom Kiri (List Chat):**
- Header: "Riwayat Chat" + Search bar
- List chat dengan info:
  * Email pengguna
  * Judul chat
  * Tanggal dibuat
- Chat yang dipilih highlight dengan background biru
- Scrollable jika banyak chat

**Kolom Kanan (Detail Chat):**
- Header: Email pengguna + Judul chat
- Area chat dengan bubble messages:
  * User message: Biru, align kanan, avatar user
  * Bot message: Abu-abu, align kiri, avatar bot
  * Timestamp di bawah setiap message
  * Support markdown (bold, list, numbering)
- Auto-scroll ke pesan terbaru
- Empty state jika belum pilih chat

**2. Message Bubble**
- User: Background biru, text putih, rounded kanan bawah flat
- Bot: Background abu-abu, text hitam, rounded kiri bawah flat
- Avatar: User (icon user), Bot (icon robot)
- Timestamp: Format "14:30"
- Max width 85% untuk mobile, 75% untuk desktop

**3. Empty States**
- Jika belum ada chat: Icon + "Belum ada riwayat chat"
- Jika chat kosong: Icon + "Tidak ada pesan"
- Jika search tidak ada hasil: "Tidak ada hasil pencarian"

**4. Loading State**
- Saat fetch data: Gambar chatbot + "Memuat riwayat chat..."
- Animasi bounce pada gambar

### 7.5 Manajemen Database API

#### **Fungsi**
Mengimport data dari API eksternal untuk digunakan sebagai knowledge base chatbot.

#### **Cara Kerja**

**1. Preview Data dari API**
```javascript
const handlePreview = async () => {
  // Kirim request ke backend
  const response = await axios.post(`${API_URL}/api/databases/preview-api-v2`, {
    apiUrl: apiUrl,
    headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}
  });
  
  // Backend akan:
  // 1. Fetch data dari API eksternal
  // 2. Analisis struktur data (detect field, columns)
  // 3. Hitung total records
  // 4. Ambil sample data (1-3 records)
  // 5. Return preview info
  
  setPreviewData(response.data);
  // Preview berisi: totalRecords, detectedField, columns, sample
};
```

**2. Import Data ke Database**
```javascript
const handleImport = async () => {
  // Kirim request import
  const response = await axios.post(`${API_URL}/api/databases/import-from-api-v2`, {
    apiUrl: apiUrl,
    databaseName: databaseName,
    headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}
  });
  
  // Backend akan:
  // 1. Fetch semua data dari API
  // 2. Create table baru dengan nama databaseName
  // 3. Insert semua data ke table
  // 4. Return jumlah data yang diimport
  
  // Simpan metadata import
  await axios.post(`${API_URL}/api/databases/save-api-import`, {
    name: databaseName,
    apiUrl: apiUrl,
    apiKey: apiKey || null,
    records: response.data.imported,
    importedAt: new Date().toISOString()
  });
  
  // Refresh list database
  fetchImportedDatabases();
};
```

**3. Fetch Database yang Sudah Diimport**
```javascript
const fetchImportedDatabases = async () => {
  const res = await fetch(`${API_URL}/api/databases/api-imports`);
  const data = await res.json();
  setImportedDatabases(data.databases);
};
```

**4. Search Database**
```javascript
const filteredDatabases = importedDatabases.filter(db => {
  const query = searchQuery.toLowerCase();
  return (
    db.name.toLowerCase().includes(query) ||
    db.apiUrl?.toLowerCase().includes(query) ||
    db.records?.toString().includes(query)
  );
});
```

#### **Output yang Dihasilkan**

**1. Tabel Database yang Sudah Diimport**
Kolom:
- Nama Database: Nama yang diberikan saat import
- Sumber API: URL API eksternal (truncated jika panjang)
- API Key: Masked (hanya 15 karakter pertama + "...")
- Total Records: Jumlah data yang diimport
- Tanggal Import: Format "01/01/2025, 14:30"
- Status: Badge "Tersedia" (hijau)

**2. Modal Import**
Layout 2 kolom:

**Kolom Kiri (Konfigurasi):**
- Form input:
  * Nama Koneksi (untuk identifikasi)
  * API URL (required)
  * API Key / Bearer Token (optional)
- Info: "Sistem akan otomatis menambahkan 'Bearer' jika diperlukan"
- Button "Preview Data" (hijau)

**Kolom Kanan (Preview & Import):**
- Sebelum preview: Empty state dengan icon + "Preview akan muncul di sini"
- Setelah preview:
  * Card info: Total Records, Detected Field
  * Card columns: Badge untuk setiap column
  * Card sample data: JSON formatted
  * Input: Nama Database (required)
  * Button "Import to Database" (biru)

**3. Preview Data**
```
Total Records: 150
Detected Field: data

Columns:
[id] [nama] [email] [telepon] [alamat]

Sample Data:
{
  "id": 1,
  "nama": "John Doe",
  "email": "john@example.com",
  "telepon": "08123456789",
  "alamat": "Jakarta"
}
```

**4. Success/Error Messages**
- Success: "✅ Import berhasil! 150 data telah diimport ke database my_database"
- Error: "❌ Error: Failed to fetch data from API"
- Preview success: "✅ Preview berhasil! Ditemukan 150 records"

**5. Info Box**
Background biru dengan icon info:
"Fitur ini memungkinkan Anda untuk mengimport data dari API eksternal dan menyimpannya sebagai database baru. Pastikan API endpoint dapat diakses dan mengembalikan data dalam format JSON."

### 7.6 Chatbot Widget

#### **Fungsi**
Widget chatbot terintegrasi yang memungkinkan administrator berinteraksi langsung dengan chatbot AI dari dalam panel admin.

#### **Cara Kerja**

**1. Toggle Widget**
```javascript
// Button floating di pojok kanan bawah
<button onClick={() => setIsOpen(true)}>
  <ChatIcon /> Chat
</button>

// Saat diklik, widget expand menjadi chat window
```

**2. Send Message**
```javascript
const handleSendMessage = async () => {
  // Tambah user message ke state
  const userMessage = {
    id: Date.now(),
    type: 'user',
    text: inputMessage,
    timestamp: new Date().toISOString()
  };
  setMessages([...messages, userMessage]);
  
  // Tampilkan typing indicator
  setIsTyping(true);
  
  // Kirim ke chatbot service
  const response = await chatbotService.sendMessage(inputMessage);
  
  // Tambah bot response ke state
  const botMessage = {
    id: Date.now() + 1,
    type: 'bot',
    text: response,
    timestamp: new Date().toISOString()
  };
  setMessages(prev => [...prev, botMessage]);
  
  // Hide typing indicator
  setIsTyping(false);
  
  // Auto-save ke localStorage
  localStorage.setItem('chatbot_messages', JSON.stringify(messages));
};
```

**3. Theme System**
```javascript
// 5 theme tersedia
const themes = {
  modern: { /* blue gradient */ },
  dark: { /* dark with purple */ },
  minimal: { /* black & white */ },
  pink: { /* pink cute */ },
  spongebob: { /* yellow & blue */ }
};

// User bisa ganti theme dari menu
const handleThemeChange = (newTheme) => {
  setTheme(newTheme);
  localStorage.setItem('chatbot_theme', newTheme);
};
```

**4. Delete Messages**
```javascript
// Mode delete
const [isDeleteMode, setIsDeleteMode] = useState(false);
const [selectedMessages, setSelectedMessages] = useState([]);

// Toggle delete mode
<button onClick={() => setIsDeleteMode(!isDeleteMode)}>
  Hapus Pesan
</button>

// Saat delete mode aktif, tampilkan checkbox di setiap message
{isDeleteMode && (
  <input 
    type="checkbox"
    checked={selectedMessages.includes(message.id)}
    onChange={() => toggleMessageSelection(message.id)}
  />
)}

// Delete selected
const handleDeleteSelected = () => {
  setMessages(messages.filter(msg => !selectedMessages.includes(msg.id)));
  setSelectedMessages([]);
  setIsDeleteMode(false);
};

// Delete all
const handleDeleteAll = () => {
  setMessages([]);
  localStorage.removeItem('chatbot_messages');
};
```

**5. Animated Placeholder**
```javascript
// Placeholder yang berubah-ubah dengan efek typing
const placeholders = [
  'Berapa pengguna aktif?',
  'Total database?',
  'Chat hari ini?',
  'Gimana cara tambah user?',
  'Cara import database?'
];

// Animasi typing effect
useEffect(() => {
  const currentText = placeholders[placeholderIndex];
  
  if (!isDeleting) {
    if (typedText.length < currentText.length) {
      setTypedText(currentText.slice(0, typedText.length + 1));
    } else {
      setTimeout(() => setIsDeleting(true), 2000);
    }
  } else {
    if (typedText.length > 0) {
      setTypedText(typedText.slice(0, -1));
    } else {
      setIsDeleting(false);
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }
  }
}, [typedText, isDeleting]);
```

**6. Empty State Animations**
Setiap theme memiliki animasi unik saat chat kosong:
- **Modern**: Smiley face dengan animasi draw circle & smile
- **Dark**: Star yang morph menjadi moon dengan sparkles
- **Minimal**: Pantun dengan animasi slide & rainbow text
- **Pink**: Bouquet mawar + kue ulang tahun dengan animasi kompleks
- **SpongeBob**: SpongeBob character dengan tangan wave

#### **Output yang Dihasilkan**

**1. Floating Button**
- Posisi: Fixed bottom-right
- Ukuran: Responsive (lebih kecil di mobile)
- Animasi: Pulse effect
- Badge: Dot hijau "online"
- Text: "Chat"

**2. Chat Window**
Ukuran:
- Mobile: Full screen (100vh)
- Desktop: 500px x 700px

**Header:**
- Avatar chatbot
- Nama: "Asisten Chatbot AI"
- Status: "Online" dengan dot hijau
- Button close (X)
- Background: Gradient sesuai theme

**Messages Area:**
- Background: Sesuai theme
- Empty state: Animasi unik per theme
- Message bubbles:
  * User: Align kanan, warna theme
  * Bot: Align kiri, background kontras
  * Avatar di samping bubble
  * Timestamp di bawah
- Typing indicator: 3 dots bouncing
- Auto-scroll ke bawah

**Input Area:**
- Input field dengan placeholder animasi
- Theme button (3 dots) di dalam input
- Send button dengan icon sesuai theme
- Keyboard support: Enter untuk send

**Theme Menu (Dropdown):**
- Muncul saat klik theme button
- List theme: Modern, Dark, Minimal, Pink, SpongeBob
- Active theme di-highlight
- Separator
- Option: "Hapus Pesan" toggle delete mode

**Delete Mode:**
- Checkbox muncul di setiap message
- Button bar di atas input:
  * "Hapus Terpilih (n)" - hapus yang dicentang
  * "Hapus Semua" - hapus semua dengan konfirmasi
  * "Batal" - keluar dari delete mode

**3. Themes Visual**

**Modern:**
- Warna: Biru gradient
- Button: Rounded-2xl
- Font: Sans-serif
- Animasi: Smooth transitions

**Dark:**
- Warna: Abu-abu gelap + purple/pink
- Background: Gradient gelap
- Text: Putih
- Animasi: Lightning bolt icon

**Minimal:**
- Warna: Hitam putih
- Button: Rounded-lg (tidak terlalu rounded)
- Border: Tegas (2px)
- Font: Clean sans-serif

**Pink:**
- Warna: Pink gradient
- Background: Pink soft
- Button: Rounded-3xl (sangat rounded)
- Icon: Heart
- Animasi: Hujan mawar

**SpongeBob:**
- Warna: Kuning + biru + pink
- Border: Tebal (4px)
- Font: Bold
- Background: Cyan gradient
- Icon: Smiley face
- Animasi: Bouncy

---


## 8. ALUR SISTEM (WORKFLOW)

### 8.1 Alur Lengkap dari Pengguna Membuka Aplikasi

#### **Skenario 1: User Belum Login**

```
1. User buka browser dan akses URL aplikasi
   ↓
2. React Router cek current path
   ↓
3. ProtectedRoute component cek localStorage:
   - Cari "token"
   - Cari "tokenExpires"
   ↓
4. Jika tidak ada atau expired:
   ↓
5. Navigate ke /login dengan state { from: location }
   ↓
6. Login page render dengan animasi background
   ↓
7. User input email dan password
   ↓
8. User klik "MASUK"
   ↓
9. Frontend validasi:
   - Email dan password tidak boleh kosong
   - Email harus "chatbotaiasistent@gmail.com"
   ↓
10. Jika lolos validasi frontend:
    ↓
11. Kirim POST request ke backend /api/auth/login
    Body: { email, password }
    ↓
12. Backend validasi kredensial dengan database
    ↓
13. Jika valid:
    - Backend generate JWT token
    - Backend return { success: true, token: "..." }
    ↓
14. Frontend terima response:
    - Simpan token ke localStorage
    - Simpan tokenExpires (now + 30 menit)
    - Simpan userEmail
    ↓
15. Navigate ke "/" (dashboard)
    ↓
16. Dashboard render dengan data
```

#### **Skenario 2: User Sudah Login**

```
1. User buka aplikasi
   ↓
2. ProtectedRoute cek token
   ↓
3. Token valid dan belum expired
   ↓
4. Render <Outlet /> (child routes)
   ↓
5. Dashboard component mount
   ↓
6. useEffect() triggered:
   ↓
7. Fetch data parallel:
   - fetchTotalUsers() → GET /api/users
   - fetchTotalDatabases() → GET /api/databases
   - fetchChatData() → GET /api/chat-history
   - fetchAndAnalyzeChats() → Analisis data
   ↓
8. Saat data diterima:
   - Update state (setUsers, setTotalDatabases, dll)
   - React re-render dengan data baru
   ↓
9. Setup WebSocket connection:
   - connectSocket() dipanggil
   - Socket connect ke backend
   - Register event listeners
   ↓
10. Dashboard tampil dengan:
    - 4 stat cards
    - 2 grafik
    - 1 list top questions
    ↓
11. User dapat navigasi ke halaman lain via sidebar
```

### 8.2 Proses Data (Data Flow)

#### **Flow 1: Tambah User Baru**

```
FRONTEND:
1. User klik "Tambah Pengguna"
   ↓
2. setShowModal(true)
   ↓
3. Modal render dengan form kosong
   ↓
4. User isi form dan klik "Simpan"
   ↓
5. handleSubmit() triggered
   ↓
6. Kirim POST /api/users
   Body: { nama, email, phone, status }
   ↓

BACKEND:
7. Receive request
   ↓
8. Validasi data (email unique, format valid)
   ↓
9. INSERT INTO users (nama, email, telepon, status, dibuat_pada)
   ↓
10. Get inserted user data
    ↓
11. Broadcast via WebSocket:
    io.emit('user_added', newUser)
    ↓
12. Return response:
    { success: true, user: newUser }
    ↓

FRONTEND (Originator):
13. Receive response
    ↓
14. fetchUsers() - refresh data
    ↓
15. setShowModal(false)
    ↓
16. showToast("Pengguna berhasil ditambahkan!")
    ↓

FRONTEND (Other Clients):
17. Socket listener 'user_added' triggered
    ↓
18. setUsers(prev => [newUser, ...prev])
    ↓
19. React re-render
    ↓
20. User baru muncul di tabel semua client
```

#### **Flow 2: Real-time Chat Update**

```
USER APP (Mobile/Web):
1. User kirim pesan ke chatbot
   ↓
2. POST /api/chat-history/:id/messages
   Body: { peran: 'user', konten: 'Halo' }
   ↓

BACKEND:
3. Insert message ke database
   ↓
4. Broadcast via WebSocket:
   io.emit('new_message', messageData)
   ↓
5. Return response ke user app
   ↓

ADMIN PANEL:
6. Socket listener 'new_message' triggered
   ↓
7. Check: apakah message untuk chat yang sedang dibuka?
   ↓
8. Jika ya:
   - setMessages(prev => [...prev, newMessage])
   - Auto-scroll ke bawah
   ↓
9. Update chat list:
   - Update timestamp chat
   - Sort ulang (chat terbaru di atas)
   ↓
10. Dashboard juga update:
    - Re-calculate "Chat Hari Ini"
    - Re-analyze top questions
    ↓
11. UI update tanpa refresh
```

### 8.3 Respon Sistem

#### **Respon Success**

**1. Visual Feedback**
- Toast notification muncul (hijau, icon checkmark)
- Loading spinner hilang
- Button kembali ke state normal
- Modal tertutup (jika ada)

**2. Data Update**
- State React update
- UI re-render dengan data baru
- Animasi smooth transition

**3. User Feedback**
- Pesan sukses yang jelas
- Konfirmasi aksi yang dilakukan
- Auto-hide setelah 3 detik

**Contoh:**
```
Action: Tambah user
Response: 
- Toast: "✅ Pengguna berhasil ditambahkan!"
- User muncul di tabel
- Modal tertutup
- Form di-reset
```

#### **Respon Error**

**1. Visual Feedback**
- Alert box merah muncul
- Loading spinner hilang
- Button kembali ke state normal
- Form tetap terbuka (data tidak hilang)

**2. Error Message**
- Pesan error yang deskriptif
- Saran solusi (jika ada)
- Icon warning

**3. User Action**
- User dapat memperbaiki input
- User dapat retry
- User dapat cancel

**Contoh:**
```
Action: Tambah user dengan email duplikat
Response:
- Alert: "❌ Error: Email sudah terdaftar"
- Form tetap terbuka
- User dapat ubah email dan retry
```

#### **Respon Loading**

**1. Visual Feedback**
- Loading spinner/skeleton
- Button disabled dengan text "Loading..."
- Cursor wait
- Opacity reduced

**2. User Experience**
- User tahu sistem sedang proses
- Prevent double-submit
- Smooth transition

**Contoh:**
```
Action: Fetch users
Response:
- Tabel: Skeleton loading (shimmer effect)
- Text: "Memuat data..."
- Duration: 0.5-2 detik (tergantung koneksi)
```

#### **Respon Real-time**

**1. Instant Update**
- Data muncul tanpa refresh
- Animasi slide-in untuk item baru
- Highlight item yang baru ditambah

**2. Notification**
- Toast notification untuk perubahan penting
- Badge count update
- Sound notification (optional)

**Contoh:**
```
Event: User baru ditambahkan oleh admin lain
Response:
- User muncul di tabel dengan animasi slide-in
- Toast: "Pengguna baru ditambahkan!"
- Row baru highlight kuning selama 2 detik
```

---

## 9. KEAMANAN & VALIDASI

### 9.1 Validasi Input

#### **Frontend Validation**

**1. Login Form**
```javascript
// Validasi email dan password tidak kosong
if (!email || !password) {
  setError("Email dan password wajib diisi");
  return;
}

// Validasi email harus admin
if (email !== 'chatbotaiasistent@gmail.com') {
  setError("Akses ditolak. Hanya admin yang dapat login.");
  return;
}
```

**2. User Form**
```javascript
// Email wajib diisi
if (!formData.email) {
  setError("Email wajib diisi");
  return;
}

// Format email valid
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(formData.email)) {
  setError("Format email tidak valid");
  return;
}

// Nomor telepon (jika diisi) harus angka
if (formData.phone && !/^\d+$/.test(formData.phone)) {
  setError("Nomor telepon harus berupa angka");
  return;
}
```

**3. Database Import Form**
```javascript
// API URL wajib diisi
if (!apiUrl) {
  setError("API URL wajib diisi");
  return;
}

// URL harus valid
try {
  new URL(apiUrl);
} catch {
  setError("Format URL tidak valid");
  return;
}

// Nama database wajib diisi saat import
if (!databaseName) {
  setError("Nama database harus diisi!");
  return;
}
```

**4. Chat Input**
```javascript
// Pesan tidak boleh kosong atau hanya spasi
if (!inputMessage.trim()) {
  return; // Tidak kirim
}
```

#### **Backend Validation**

Backend juga melakukan validasi untuk keamanan berlapis:

**1. Token Validation**
```javascript
// Setiap request cek token
const token = req.headers.authorization;
if (!token) {
  return res.status(401).json({ error: "Unauthorized" });
}

// Verify token
const decoded = jwt.verify(token, SECRET_KEY);
if (!decoded) {
  return res.status(401).json({ error: "Invalid token" });
}
```

**2. Data Validation**
```javascript
// Validasi email unique
const existingUser = await db.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);
if (existingUser.rows.length > 0) {
  return res.status(400).json({ error: "Email sudah terdaftar" });
}

// Validasi required fields
if (!email || !nama) {
  return res.status(400).json({ error: "Field wajib tidak lengkap" });
}
```

**3. SQL Injection Prevention**
```javascript
// Menggunakan parameterized queries
const result = await db.query(
  "INSERT INTO users (nama, email) VALUES ($1, $2)",
  [nama, email] // Parameter binding, bukan string concatenation
);
```

### 9.2 Keamanan Data

#### **1. Authentication & Authorization**

**Token-based Authentication:**
- JWT (JSON Web Token) untuk autentikasi
- Token disimpan di localStorage (client-side)
- Token dikirim di header setiap request
- Token memiliki expiry time (30 menit)

**Session Management:**
```javascript
// Simpan token dengan expiry
localStorage.setItem("token", token);
localStorage.setItem("tokenExpires", Date.now() + (30 * 60 * 1000));

// Cek token sebelum akses halaman
const token = localStorage.getItem("token");
const tokenExpires = localStorage.getItem("tokenExpires");

if (!token || Date.now() > parseInt(tokenExpires)) {
  // Token expired, redirect ke login
  navigate("/login");
}
```

**Protected Routes:**
```javascript
// Hanya user terautentikasi yang bisa akses
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<Dashboard />} />
  <Route path="/users" element={<UserList />} />
  {/* ... */}
</Route>
```

#### **2. Data Protection**

**Password Security:**
- Password tidak ditampilkan (type="password")
- Password di-hash di backend (bcrypt)
- Tidak pernah return password dalam response API

**Sensitive Data Masking:**
```javascript
// API Key di-mask saat ditampilkan
{db.apiKey ? (
  <span>{db.apiKey.substring(0, 15)}...</span>
) : (
  <span>Tidak ada</span>
)}
```

**HTTPS (Production):**
- Semua komunikasi melalui HTTPS
- Prevent man-in-the-middle attacks
- Enkripsi data in transit

#### **3. XSS Prevention**

**React Built-in Protection:**
- React otomatis escape string dalam JSX
- Prevent injection melalui user input

**Careful with dangerouslySetInnerHTML:**
```javascript
// Hanya digunakan untuk markdown yang sudah di-sanitize
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
```

#### **4. CSRF Protection**

**Token Verification:**
- Setiap mutating request (POST, PUT, DELETE) memerlukan token
- Token di-verify di backend

**SameSite Cookies:**
- Cookie dengan SameSite attribute
- Prevent CSRF attacks

#### **5. Rate Limiting**

Backend mengimplementasikan rate limiting untuk prevent abuse:
- Max 100 requests per 15 menit per IP
- Prevent brute force attacks
- Prevent DDoS

#### **6. Input Sanitization**

**Frontend:**
```javascript
// Trim whitespace
const cleanEmail = email.trim().toLowerCase();

// Remove special characters dari nama
const cleanNama = nama.replace(/[<>]/g, '');
```

**Backend:**
```javascript
// Sanitize input sebelum insert ke database
const sanitizedInput = validator.escape(userInput);
```

#### **7. Error Handling**

**Tidak Expose Sensitive Info:**
```javascript
// ❌ Bad
catch (error) {
  res.status(500).json({ error: error.stack });
}

// ✅ Good
catch (error) {
  console.error(error); // Log di server
  res.status(500).json({ error: "Internal server error" });
}
```

**User-Friendly Error Messages:**
```javascript
// Frontend
catch (error) {
  if (error.response?.status === 401) {
    setError("Sesi Anda telah berakhir. Silakan login kembali.");
  } else if (error.response?.status === 400) {
    setError(error.response.data.error || "Data tidak valid");
  } else {
    setError("Terjadi kesalahan. Silakan coba lagi.");
  }
}
```

### 9.3 Best Practices yang Diterapkan

1. **Principle of Least Privilege**
   - User hanya dapat akses fitur yang diperlukan
   - Admin tidak bisa hapus dirinya sendiri

2. **Defense in Depth**
   - Validasi di frontend dan backend
   - Multiple layers of security

3. **Secure by Default**
   - Default settings yang aman
   - User harus opt-in untuk fitur berisiko

4. **Audit Trail**
   - Semua aksi tercatat (timestamp, user)
   - Chat history sebagai audit log

5. **Regular Updates**
   - Dependencies di-update secara berkala
   - Security patches diterapkan

---

## 10. KELEBIHAN DAN KEKURANGAN SISTEM

### 10.1 Kelebihan Sistem

#### **1. User Interface yang Modern dan Intuitif**
- Desain clean dan profesional
- Navigasi yang mudah dipahami
- Responsive di semua device (mobile, tablet, desktop)
- Multiple theme options untuk personalisasi
- Animasi smooth yang meningkatkan UX

#### **2. Real-time Updates**
- Data update otomatis tanpa refresh halaman
- WebSocket connection untuk komunikasi instant
- Notifikasi real-time untuk perubahan data
- Collaborative: multiple admin dapat bekerja bersamaan

#### **3. Visualisasi Data yang Informatif**
- Dashboard dengan statistik lengkap
- Grafik interaktif (bar chart, line chart)
- Top 5 pertanyaan populer
- Filter data (mingguan, bulanan, tahunan)

#### **4. Manajemen Data yang Komprehensif**
- CRUD lengkap untuk pengguna
- Search dan filter yang powerful
- Bulk operations (delete multiple)
- Export data (future feature)

#### **5. Integrasi API yang Mudah**
- Preview data sebelum import
- Auto-detect struktur data
- Support untuk API dengan authentication
- Metadata tracking untuk setiap import

#### **6. Keamanan yang Baik**
- Autentikasi dengan JWT token
- Protected routes
- Session management dengan expiry
- Validasi berlapis (frontend & backend)
- Password hashing

#### **7. Performance yang Optimal**
- Fast loading dengan Vite
- Lazy loading untuk komponen besar
- Optimized bundle size
- Efficient re-rendering dengan React

#### **8. Maintainability**
- Kode modular dan terorganisir
- Component reusability
- Clear separation of concerns
- Dokumentasi lengkap
- Consistent code style

#### **9. Scalability**
- Arsitektur yang mendukung pertumbuhan
- Easy to add new features
- Database schema yang extensible
- API-first approach

#### **10. Developer Experience**
- Hot Module Replacement (HMR) instant
- Clear error messages
- ESLint & Prettier untuk code quality
- Git version control

### 10.2 Kekurangan Sistem

#### **1. Ketergantungan pada Backend**
- Aplikasi tidak dapat berfungsi tanpa backend
- Jika backend down, seluruh sistem tidak dapat digunakan
- Tidak ada offline mode

**Solusi Potensial:**
- Implementasi service worker untuk offline capability
- Cache data di IndexedDB
- Fallback UI saat backend tidak tersedia

#### **2. Keamanan Token di localStorage**
- Token disimpan di localStorage rentan terhadap XSS
- Jika ada XSS vulnerability, token dapat dicuri

**Solusi Potensial:**
- Pindah ke httpOnly cookies
- Implementasi refresh token mechanism
- Shorter token expiry time

#### **3. Tidak Ada Role-Based Access Control (RBAC)**
- Hanya ada satu level akses (admin)
- Tidak ada pembedaan permission antar admin
- Semua admin memiliki akses penuh

**Solusi Potensial:**
- Implementasi role system (Super Admin, Admin, Viewer)
- Permission-based access untuk setiap fitur
- Audit log untuk tracking aksi admin

#### **4. Tidak Ada Fitur Export Data**
- Data tidak dapat di-export ke Excel/CSV
- Sulit untuk reporting eksternal
- Tidak ada backup manual

**Solusi Potensial:**
- Tambah button "Export to CSV"
- Generate PDF report
- Scheduled backup otomatis

#### **5. Keterbatasan Search**
- Search hanya exact match atau substring
- Tidak ada fuzzy search
- Tidak ada advanced filter (date range, multiple criteria)

**Solusi Potensial:**
- Implementasi fuzzy search algorithm
- Advanced filter dengan multiple criteria
- Saved search/filter presets

#### **6. Tidak Ada Pagination**
- Semua data di-load sekaligus
- Jika data banyak (1000+ records), performa menurun
- Memory usage tinggi

**Solusi Potensial:**
- Implementasi pagination (10-50 items per page)
- Infinite scroll
- Virtual scrolling untuk list panjang

#### **7. Tidak Ada Notification System**
- Tidak ada email notification
- Tidak ada push notification
- Admin harus buka aplikasi untuk tahu ada update

**Solusi Potensial:**
- Email notification untuk event penting
- Browser push notification
- Notification center dalam aplikasi

#### **8. Keterbatasan Error Handling**
- Beberapa error tidak di-handle dengan baik
- Error message kadang tidak deskriptif
- Tidak ada error boundary untuk catch React errors

**Solusi Potensial:**
- Implementasi Error Boundary component
- Centralized error handling
- Better error messages dengan solusi

#### **9. Tidak Ada Multi-language Support**
- Hanya bahasa Indonesia
- Tidak cocok untuk international use

**Solusi Potensial:**
- Implementasi i18n (internationalization)
- Support untuk English, Indonesia, dll
- Language switcher

#### **10. Keterbatasan Mobile Experience**
- Beberapa fitur kurang optimal di mobile
- Grafik sulit dibaca di layar kecil
- Tabel horizontal scroll di mobile

**Solusi Potensial:**
- Mobile-first design approach
- Simplified mobile view
- Native mobile app (React Native)

---


## 11. KESIMPULAN

### 11.1 Ringkasan Proyek

Panel Admin Chatbot AI adalah aplikasi web modern yang dibangun menggunakan React.js sebagai solusi manajemen terpusat untuk sistem chatbot berbasis kecerdasan buatan. Proyek ini berhasil mengimplementasikan berbagai fitur penting yang dibutuhkan administrator untuk mengelola chatbot secara efektif dan efisien.

### 11.2 Pencapaian Tujuan

Proyek ini telah berhasil mencapai tujuan-tujuan yang ditetapkan:

**1. Sistem Manajemen Terpusat**
✅ Berhasil membangun platform web yang mengintegrasikan semua fungsi manajemen dalam satu tempat, mulai dari monitoring, manajemen pengguna, analisis chat, hingga konfigurasi database.

**2. Dashboard Monitoring Real-time**
✅ Dashboard informatif dengan 4 statistik utama, 3 visualisasi grafik, dan update real-time melalui WebSocket telah diimplementasikan dengan baik.

**3. Manajemen Pengguna Lengkap**
✅ Fitur CRUD lengkap dengan search, filter, toggle status, dan proteksi khusus untuk admin telah berfungsi dengan sempurna.

**4. Riwayat Chat Terstruktur**
✅ Sistem riwayat chat dengan format markdown, real-time update, dan analisis pertanyaan populer telah berhasil diimplementasikan.

**5. Integrasi API Database**
✅ Fitur import database dari API eksternal dengan preview dan auto-detect struktur data telah berfungsi dengan baik.

**6. Keamanan Sistem**
✅ Sistem autentikasi dengan JWT token, protected routes, dan validasi berlapis telah diterapkan untuk melindungi data sensitif.

**7. User Experience yang Baik**
✅ Interface modern, responsive, multiple themes, dan animasi smooth telah meningkatkan pengalaman pengguna secara signifikan.

### 11.3 Manfaat yang Diperoleh

**Bagi Administrator:**
- Efisiensi waktu dalam mengelola pengguna dan data meningkat drastis
- Monitoring sistem menjadi lebih mudah dengan dashboard visual
- Pengambilan keputusan lebih cepat dengan data yang tersaji real-time
- Kontrol penuh terhadap sistem chatbot

**Bagi Instansi:**
- Peningkatan kualitas layanan chatbot
- Efisiensi operasional dengan otomasi
- Keamanan data yang lebih baik
- Sistem yang scalable untuk pertumbuhan

**Bagi Siswa PKL:**
- Pengalaman praktis membangun aplikasi web full-stack
- Penguasaan teknologi modern (React, WebSocket, REST API)
- Pemahaman tentang software architecture
- Portfolio project yang dapat ditampilkan

### 11.4 Pembelajaran yang Didapat

Selama pengerjaan proyek ini, berbagai pembelajaran berharga telah diperoleh:

**1. Technical Skills**
- Penguasaan React.js dan ekosistemnya (Hooks, Context, Router)
- Implementasi real-time communication dengan WebSocket
- REST API integration dan error handling
- State management untuk aplikasi kompleks
- Responsive design dengan Tailwind CSS
- Data visualization dengan Recharts

**2. Software Development Practices**
- Component-based architecture
- Separation of concerns
- Code reusability dan modularity
- Version control dengan Git
- Code documentation

**3. Problem Solving**
- Debugging complex issues
- Performance optimization
- Handling edge cases
- User experience considerations

**4. Project Management**
- Planning dan breakdown tasks
- Time management
- Testing dan quality assurance
- Documentation

### 11.5 Kontribusi Proyek

Proyek ini memberikan kontribusi signifikan dalam:

**1. Teknologi**
- Implementasi modern web technologies
- Best practices dalam React development
- Real-time communication patterns
- Security implementation

**2. Bisnis**
- Meningkatkan efisiensi operasional
- Mengurangi biaya maintenance
- Meningkatkan kualitas layanan
- Scalable solution untuk pertumbuhan

**3. Pendidikan**
- Dokumentasi lengkap sebagai referensi pembelajaran
- Code yang clean dan well-structured sebagai contoh
- Real-world application example

---

## 12. SARAN PENGEMBANGAN

### 12.1 Pengembangan Jangka Pendek (1-3 Bulan)

#### **1. Implementasi Pagination**
**Prioritas: Tinggi**

Menambahkan pagination untuk tabel dengan data banyak agar performa tetap optimal.

**Implementasi:**
```javascript
// State untuk pagination
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(20);

// Hitung data yang ditampilkan
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

// Pagination controls
<Pagination 
  currentPage={currentPage}
  totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
  onPageChange={setCurrentPage}
/>
```

**Manfaat:**
- Performa lebih baik dengan data banyak
- Loading time lebih cepat
- Memory usage lebih efisien

#### **2. Export Data ke CSV/Excel**
**Prioritas: Tinggi**

Menambahkan fitur export data untuk reporting.

**Implementasi:**
```javascript
import { exportToCSV } from './utils/export';

const handleExport = () => {
  const data = users.map(user => ({
    ID: user.id,
    Nama: user.nama,
    Email: user.email,
    'No HP': user.telepon,
    Status: user.status,
    'Tanggal Bergabung': new Date(user.dibuat_pada).toLocaleDateString('id-ID')
  }));
  
  exportToCSV(data, 'users-export.csv');
};
```

**Manfaat:**
- Memudahkan reporting
- Data dapat dianalisis di Excel
- Backup manual data

#### **3. Advanced Search & Filter**
**Prioritas: Sedang**

Menambahkan filter berdasarkan multiple criteria.

**Fitur:**
- Filter by date range
- Filter by status (active/inactive)
- Filter by multiple fields
- Save filter presets

**Manfaat:**
- Pencarian lebih powerful
- Analisis data lebih mendalam
- User experience lebih baik

#### **4. Error Boundary**
**Prioritas: Tinggi**

Implementasi Error Boundary untuk catch React errors.

**Implementasi:**
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

**Manfaat:**
- Prevent white screen of death
- Better error handling
- Improved user experience

#### **5. Loading Skeleton**
**Prioritas: Sedang**

Mengganti loading spinner dengan skeleton screen.

**Manfaat:**
- Better perceived performance
- Smoother user experience
- Modern loading pattern

### 12.2 Pengembangan Jangka Menengah (3-6 Bulan)

#### **1. Role-Based Access Control (RBAC)**
**Prioritas: Tinggi**

Implementasi sistem role dan permission.

**Roles:**
- Super Admin: Full access
- Admin: Manage users, view chats
- Viewer: Read-only access

**Implementasi:**
```javascript
// Check permission
const hasPermission = (action) => {
  const userRole = localStorage.getItem('userRole');
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions.includes(action);
};

// Conditional rendering
{hasPermission('delete_user') && (
  <button onClick={handleDelete}>Delete</button>
)}
```

**Manfaat:**
- Security lebih baik
- Granular access control
- Audit trail lebih detail

#### **2. Notification System**
**Prioritas: Sedang**

Implementasi notification center dan email notification.

**Fitur:**
- In-app notification center
- Email notification untuk event penting
- Browser push notification
- Notification preferences

**Manfaat:**
- Admin tidak perlu selalu buka aplikasi
- Real-time awareness
- Better communication

#### **3. Analytics Dashboard**
**Prioritas: Sedang**

Dashboard analytics yang lebih advanced.

**Fitur:**
- User engagement metrics
- Chatbot performance metrics
- Response time analytics
- Error rate tracking
- Custom date range

**Manfaat:**
- Deeper insights
- Better decision making
- Performance monitoring

#### **4. Audit Log**
**Prioritas: Tinggi**

Sistem logging untuk semua aksi admin.

**Data yang di-log:**
- Who: Admin yang melakukan aksi
- What: Aksi yang dilakukan
- When: Timestamp
- Where: IP address
- Details: Data sebelum dan sesudah

**Manfaat:**
- Accountability
- Security audit
- Troubleshooting
- Compliance

#### **5. Backup & Restore**
**Prioritas: Tinggi**

Fitur backup dan restore database.

**Fitur:**
- Manual backup
- Scheduled automatic backup
- Restore from backup
- Backup history

**Manfaat:**
- Data protection
- Disaster recovery
- Peace of mind

### 12.3 Pengembangan Jangka Panjang (6-12 Bulan)

#### **1. Multi-language Support (i18n)**
**Prioritas: Sedang**

Implementasi internationalization.

**Languages:**
- Bahasa Indonesia (default)
- English
- Bahasa lainnya sesuai kebutuhan

**Implementasi:**
```javascript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<h1>{t('dashboard.title')}</h1>
```

**Manfaat:**
- International reach
- Wider user base
- Professional appearance

#### **2. Mobile App (React Native)**
**Prioritas: Sedang**

Develop native mobile app untuk iOS dan Android.

**Fitur:**
- Semua fitur web app
- Push notification
- Offline mode
- Better mobile UX

**Manfaat:**
- Better mobile experience
- Native performance
- Wider accessibility

#### **3. AI-Powered Insights**
**Prioritas: Rendah**

Implementasi AI untuk analisis data.

**Fitur:**
- Predictive analytics
- Anomaly detection
- Automated insights
- Recommendation system

**Manfaat:**
- Proactive management
- Automated decision support
- Advanced analytics

#### **4. Integration dengan Third-party Services**
**Prioritas: Sedang**

Integrasi dengan services eksternal.

**Services:**
- Google Analytics
- Slack notification
- Email service (SendGrid, Mailgun)
- Cloud storage (AWS S3, Google Cloud)

**Manfaat:**
- Extended functionality
- Better ecosystem
- Professional features

#### **5. Microservices Architecture**
**Prioritas: Rendah**

Refactor ke microservices untuk scalability.

**Services:**
- Auth service
- User service
- Chat service
- Analytics service
- Notification service

**Manfaat:**
- Better scalability
- Independent deployment
- Fault isolation
- Technology flexibility

### 12.4 Improvement Suggestions

#### **Performance Optimization**
1. Implement code splitting
2. Lazy load components
3. Optimize images (WebP format)
4. Use React.memo untuk prevent unnecessary re-renders
5. Implement virtual scrolling untuk list panjang

#### **Security Enhancement**
1. Implement refresh token mechanism
2. Add rate limiting di frontend
3. Implement Content Security Policy (CSP)
4. Add CAPTCHA untuk login
5. Two-factor authentication (2FA)

#### **User Experience**
1. Add keyboard shortcuts
2. Implement dark mode toggle
3. Add onboarding tutorial
4. Improve error messages
5. Add help documentation

#### **Testing**
1. Unit testing dengan Jest
2. Integration testing
3. E2E testing dengan Cypress
4. Performance testing
5. Security testing

#### **DevOps**
1. CI/CD pipeline
2. Automated testing
3. Automated deployment
4. Monitoring dan alerting
5. Log aggregation

---

## 13. PENUTUP

### 13.1 Kata Penutup

Proyek Panel Admin Chatbot AI ini merupakan hasil dari proses pembelajaran dan pengembangan yang intensif selama periode PKL. Melalui proyek ini, telah berhasil dibangun sebuah sistem manajemen yang komprehensif, modern, dan user-friendly untuk mengelola chatbot berbasis kecerdasan buatan.

Aplikasi ini tidak hanya memenuhi kebutuhan fungsional yang ditetapkan, tetapi juga mengimplementasikan best practices dalam pengembangan web modern, termasuk real-time communication, responsive design, dan security measures yang baik.

### 13.2 Harapan

Diharapkan aplikasi ini dapat:

1. **Memberikan Manfaat Nyata**
   - Meningkatkan efisiensi operasional dalam pengelolaan chatbot
   - Memudahkan monitoring dan analisis data
   - Meningkatkan kualitas layanan chatbot

2. **Menjadi Referensi Pembelajaran**
   - Dokumentasi lengkap dapat menjadi panduan bagi developer lain
   - Code structure yang baik dapat menjadi contoh best practices
   - Arsitektur aplikasi dapat menjadi referensi untuk proyek serupa

3. **Terus Berkembang**
   - Aplikasi dapat terus ditingkatkan dengan fitur-fitur baru
   - Dapat beradaptasi dengan kebutuhan yang berubah
   - Dapat menjadi foundation untuk sistem yang lebih besar

### 13.3 Ucapan Terima Kasih

Terima kasih kepada:
- Pembimbing PKL yang telah memberikan guidance dan feedback
- Tim backend yang telah menyediakan API yang robust
- Rekan-rekan yang telah membantu dalam testing dan feedback
- Semua pihak yang telah mendukung penyelesaian proyek ini

### 13.4 Informasi Kontak

Untuk pertanyaan, saran, atau diskusi lebih lanjut mengenai proyek ini, dapat menghubungi:

**Email:** chatbotaiasistent@gmail.com

**Repository:** [Link ke repository jika ada]

**Demo:** [Link ke demo aplikasi jika ada]

---

## LAMPIRAN

### A. Struktur Database

#### Tabel: users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  telepon VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  diperbarui_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabel: chat_history
```sql
CREATE TABLE chat_history (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  judul VARCHAR(255) NOT NULL,
  dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  diperbarui_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_email) REFERENCES users(email)
);
```

#### Tabel: messages
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  chat_history_id INTEGER NOT NULL,
  peran VARCHAR(20) NOT NULL, -- 'user' atau 'assistant'
  konten TEXT NOT NULL,
  dibuat_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chat_history_id) REFERENCES chat_history(id) ON DELETE CASCADE
);
```

#### Tabel: api_imports
```sql
CREATE TABLE api_imports (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  api_url TEXT NOT NULL,
  api_key TEXT,
  records INTEGER,
  imported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### B. Environment Variables

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:3000

# Untuk production
# VITE_BACKEND_URL=https://api.yourdomain.com

# Untuk devtunnels
# VITE_BACKEND_URL=https://your-tunnel.devtunnels.ms
```

### C. Instalasi dan Setup

#### Prerequisites
- Node.js v18 atau lebih tinggi
- npm atau yarn
- Backend API sudah running

#### Langkah Instalasi

1. **Clone Repository**
```bash
git clone [repository-url]
cd Chatbot-admin
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
```bash
cp .env.example .env
# Edit .env dan sesuaikan VITE_BACKEND_URL
```

4. **Run Development Server**
```bash
npm run dev
```

5. **Build untuk Production**
```bash
npm run build
```

6. **Preview Production Build**
```bash
npm run preview
```

### D. Scripts yang Tersedia

```json
{
  "dev": "vite",                    // Development server
  "build": "vite build",            // Production build
  "preview": "vite preview",        // Preview production build
  "lint": "eslint .",               // Run linter
  "format": "prettier --write ..."  // Format code
}
```

### E. Browser Support

Aplikasi ini support browser modern:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Tidak support:
- Internet Explorer
- Browser lama (< 2 tahun)

### F. Troubleshooting

#### Problem: WebSocket tidak connect
**Solution:**
- Pastikan backend sudah running
- Cek VITE_BACKEND_URL di .env
- Cek firewall tidak block WebSocket

#### Problem: Token expired terus
**Solution:**
- Cek system time (harus akurat)
- Cek token expiry time di backend
- Clear localStorage dan login ulang

#### Problem: Data tidak update real-time
**Solution:**
- Cek WebSocket connection status
- Cek console untuk error
- Refresh halaman

#### Problem: Build error
**Solution:**
- Delete node_modules dan package-lock.json
- Run `npm install` lagi
- Cek Node.js version (harus v18+)

---

## REFERENSI

### Dokumentasi Resmi
1. React.js - https://react.dev/
2. Vite - https://vitejs.dev/
3. Tailwind CSS - https://tailwindcss.com/
4. React Router - https://reactrouter.com/
5. Recharts - https://recharts.org/
6. Socket.IO - https://socket.io/
7. Axios - https://axios-http.com/

### Tutorial dan Artikel
1. React Hooks - https://react.dev/reference/react
2. WebSocket dengan React - https://socket.io/docs/v4/client-api/
3. JWT Authentication - https://jwt.io/introduction
4. Tailwind CSS Best Practices - https://tailwindcss.com/docs/utility-first

### Tools
1. VS Code - https://code.visualstudio.com/
2. Git - https://git-scm.com/
3. Postman - https://www.postman.com/
4. Chrome DevTools - https://developer.chrome.com/docs/devtools/

---

**Dokumen ini dibuat pada:** Januari 2025

**Versi:** 1.0

**Status:** Final

---

*Dokumentasi ini merupakan bagian dari laporan Praktik Kerja Lapangan (PKL) dan dapat digunakan sebagai referensi untuk pengembangan lebih lanjut.*
