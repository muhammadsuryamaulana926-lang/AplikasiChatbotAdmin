import axios from 'axios';

// Multi-API Configuration dengan fallback otomatis
// API Keys disimpan di environment variables untuk keamanan
const API_CONFIGS = [
  {
    name: 'DeepSeek',
    key: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
    url: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    enabled: !!import.meta.env.VITE_DEEPSEEK_API_KEY
  },
  {
    name: 'Groq',
    key: import.meta.env.VITE_GROQ_API_KEY || '',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    enabled: !!import.meta.env.VITE_GROQ_API_KEY
  },
  {
    name: 'Gemini',
    key: import.meta.env.VITE_GEMINI_API_KEY || '',
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    model: 'gemini-1.5-flash',
    enabled: !!import.meta.env.VITE_GEMINI_API_KEY,
    isGemini: true
  },
  {
    name: 'OpenRouter',
    key: import.meta.env.VITE_OPENROUTER_API_KEY || '',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'google/gemini-2.0-flash-exp:free',
    enabled: !!import.meta.env.VITE_OPENROUTER_API_KEY
  },
  {
    name: 'Cohere',
    key: import.meta.env.VITE_COHERE_API_KEY || '',
    url: 'https://api.cohere.ai/v1/chat',
    model: 'command',
    enabled: !!import.meta.env.VITE_COHERE_API_KEY,
    isCohere: true
  },
  {
    name: 'HuggingFace',
    key: import.meta.env.VITE_HUGGINGFACE_API_KEY || '',
    url: 'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct',
    model: 'meta-llama/Meta-Llama-3-8B-Instruct',
    enabled: !!import.meta.env.VITE_HUGGINGFACE_API_KEY,
    isHuggingFace: true
  },
  {
    name: 'DeepInfra',
    key: import.meta.env.VITE_DEEPINFRA_API_KEY || '',
    url: 'https://api.deepinfra.com/v1/openai/chat/completions',
    model: 'meta-llama/Meta-Llama-3-70B-Instruct',
    enabled: !!import.meta.env.VITE_DEEPINFRA_API_KEY
  }
];

class ChatbotService {
  constructor() {
    this.currentApiIndex = 0;
    this.conversationHistory = this.loadHistory();
    this.userPreferences = this.loadPreferences();
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('chatbot_conversation_history');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('chatbot_conversation_history', JSON.stringify(this.conversationHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }

  loadPreferences() {
    try {
      const saved = localStorage.getItem('chatbot_user_preferences');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error loading preferences:', error);
      return {};
    }
  }

  savePreferences() {
    try {
      localStorage.setItem('chatbot_user_preferences', JSON.stringify(this.userPreferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }

  extractPreferences(message, response) {
    const lowerMsg = message.toLowerCase();
    const lowerRes = response.toLowerCase();
    
    // Deteksi preferensi panggilan
    if (/(panggil|sebut|bilang).*(aku|saya|gue|gw).*(sayang|bos|kak|mas|mbak|bang|teman)/i.test(lowerMsg)) {
      const match = lowerMsg.match(/(sayang|bos|kak|mas|mbak|bang|teman|boss|dear|honey)/i);
      if (match) {
        this.userPreferences.nickname = match[0];
        this.savePreferences();
      }
    }
    
    // Deteksi preferensi gaya bahasa
    if (/(jawab|bicara|ngomong).*(formal|santai|gaul|sopan)/i.test(lowerMsg)) {
      const match = lowerMsg.match(/(formal|santai|gaul|sopan)/i);
      if (match) {
        this.userPreferences.style = match[0];
        this.savePreferences();
      }
    }
    
    // Deteksi preferensi emoji
    if (/(pakai|pake|gunakan).*(banyak|sedikit).*(emoji)/i.test(lowerMsg)) {
      this.userPreferences.emoji = lowerMsg.includes('banyak') ? 'banyak' : 'sedikit';
      this.savePreferences();
    }
  }

  getPreferencesContext() {
    let context = '';
    if (this.userPreferences.nickname) {
      context += `\n- User ingin dipanggil: "${this.userPreferences.nickname}"`;
    }
    if (this.userPreferences.style) {
      context += `\n- Gaya bahasa: ${this.userPreferences.style}`;
    }
    if (this.userPreferences.emoji) {
      context += `\n- Penggunaan emoji: ${this.userPreferences.emoji}`;
    }
    return context;
  }

  getApiKeysInfo() {
    return {
      apis: API_CONFIGS.map(api => ({
        name: api.name,
        key: api.key,
        url: api.url,
        model: api.model,
        enabled: api.enabled,
        type: api.isGemini ? 'Gemini' : api.isCohere ? 'Cohere' : api.isHuggingFace ? 'HuggingFace' : 'OpenAI-Compatible'
      })),
      totalApis: API_CONFIGS.length,
      enabledApis: API_CONFIGS.filter(a => a.enabled).length
    };
  }

  async fetchDashboardData() {
    try {
      // Fetch users
      const usersRes = await fetch('http://localhost:3000/api/users');
      if (!usersRes.ok) throw new Error('Users API failed');
      const users = await usersRes.json();
      
      // Fetch databases
      const dbRes = await fetch('http://localhost:3000/api/databases');
      if (!dbRes.ok) throw new Error('Databases API failed');
      const databases = await dbRes.json();
      
      // Fetch chat history
      const chatsRes = await fetch('http://localhost:3000/api/chat-history');
      const chats = chatsRes.ok ? await chatsRes.json() : [];
      
      const today = new Date().toDateString();
      let todayChats = 0;
      
      // Hitung chat hari ini
      if (Array.isArray(chats)) {
        for (const chat of chats) {
          try {
            const msgRes = await fetch(`http://localhost:3000/api/chat-history/${chat.id}/messages`);
            if (msgRes.ok) {
              const messages = await msgRes.json();
              if (Array.isArray(messages)) {
                todayChats += messages.filter(m => new Date(m.dibuat_pada).toDateString() === today).length;
              }
            }
          } catch (err) {
            // Skip error
          }
        }
      }
      
      const result = {
        totalUsers: users.success ? users.users.length : 0,
        activeUsers: users.success ? users.users.filter(u => u.status === 'active').length : 0,
        totalDatabases: databases.success ? databases.databases.length : 0,
        todayChats,
        // Data detail untuk AI
        usersList: users.success ? users.users : [],
        databasesList: databases.success ? databases.databases : [],
        chatsList: Array.isArray(chats) ? chats : [],
        // Tambahkan info API keys
        apiKeys: this.getApiKeysInfo()
      };
      
      console.log('✅ Fetched data:', result);
      return result;
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        totalDatabases: 0,
        todayChats: 0,
        usersList: [],
        databasesList: [],
        chatsList: [],
        apiKeys: this.getApiKeysInfo()
      };
    }
  }

  getPageContext() {
    const path = window.location.pathname;
    const contexts = {
      '/dashboard': {
        name: 'Dashboard',
        info: 'Halaman ini menampilkan statistik: Total Pengguna, Chat Hari Ini, Pengguna Aktif, Total Database. Ada grafik pengguna (mingguan/bulanan/tahunan), Top 5 Chat Tren, dan grafik chat (mingguan/bulanan).',
        tutorials: [
          'Untuk melihat statistik pengguna mingguan: Klik tombol "Mingguan" di grafik Pengguna',
          'Untuk melihat statistik pengguna bulanan: Klik tombol "Bulanan" di grafik Pengguna',
          'Untuk melihat statistik pengguna tahunan: Klik tombol "Tahunan" di grafik Pengguna',
          'Untuk melihat tren chat mingguan: Klik tombol "Mingguan" di grafik Chat',
          'Untuk melihat tren chat bulanan: Klik tombol "Bulanan" di grafik Chat',
          'Top 5 Chat Tren menampilkan pertanyaan yang paling sering ditanyakan pengguna'
        ]
      },
      '/users': {
        name: 'Manajemen Pengguna',
        info: 'Halaman untuk mengelola pengguna. Fitur: Tambah pengguna baru, lihat detail, edit data, hapus pengguna, dan ubah status aktif/tidak aktif.',
        tutorials: [
          'Cara menambah pengguna baru: 1) Klik tombol "+ Tambah Pengguna" di kanan atas, 2) Isi form: Nama, Email, No HP, Password, 3) Klik "Simpan"',
          'Cara edit pengguna: 1) Klik tombol "Edit" (ikon pensil) pada baris pengguna, 2) Ubah data yang diperlukan, 3) Klik "Simpan"',
          'Cara hapus pengguna: 1) Klik tombol "Hapus" (ikon tempat sampah) pada baris pengguna, 2) Konfirmasi penghapusan',
          'Cara mengubah status pengguna: Klik toggle switch pada kolom "Status Akun" untuk mengaktifkan/menonaktifkan pengguna',
          'Tabel menampilkan: ID, Nama, Email, No HP, Status Akun (Aktif/Tidak Aktif), dan Tanggal Bergabung'
        ]
      },
      '/database': {
        name: 'API Database Manager',
        info: 'Halaman untuk import data dari API eksternal ke database lokal.',
        tutorials: [
          'Cara import database dari API: 1) Klik tombol "+ Import dari API" di kanan atas',
          '2) Isi "Nama Koneksi" (contoh: API Produk, API Pelanggan)',
          '3) Masukkan "API URL" (contoh: https://api.example.com/data)',
          '4) Opsional: Jika API memerlukan autentikasi, masukkan "API Key" atau "Bearer Token"',
          '5) Klik tombol "Preview Data" untuk melihat data yang akan diimport',
          '6) Jika data sudah sesuai, isi "Nama Database" (contoh: db_produk)',
          '7) Klik "Import to Database" untuk menyimpan data ke database',
          'Tabel menampilkan: Nama Database, Sumber API, Total Records (jumlah data), Tanggal Import, dan Status (Success/Failed)'
        ]
      },
      '/chats': {
        name: 'Riwayat Chat',
        info: 'Halaman untuk melihat riwayat percakapan chat dengan pengguna.',
        tutorials: [
          'Cara melihat riwayat chat: 1) Pilih chat dari daftar di sebelah kiri',
          '2) Detail percakapan akan muncul di sebelah kanan',
          'Chat ditampilkan secara real-time dengan indikator "Live" di pojok kanan atas',
          'Pesan pengguna ditampilkan di sebelah kanan dengan bubble biru',
          'Pesan bot ditampilkan di sebelah kiri dengan bubble abu-abu',
          'Setiap pesan menampilkan waktu pengiriman',
          'Chat terbaru akan muncul di atas daftar'
        ]
      },
      '/settings': {
        name: 'Pengaturan',
        info: 'Halaman untuk konfigurasi aplikasi dan pengaturan sistem.',
        tutorials: [
          'Halaman ini untuk mengatur konfigurasi aplikasi',
          'Anda dapat mengubah pengaturan API, tema, dan preferensi lainnya'
        ]
      }
    };
    return contexts[path] || { 
      name: 'Admin Panel', 
      info: 'Sistem admin untuk mengelola chatbot, pengguna, dan database.',
      tutorials: ['Gunakan menu sidebar untuk navigasi ke halaman yang diinginkan']
    };
  }

  async sendMessage(message) {
    try {
      const pageContext = this.getPageContext();
      const dashboardData = await this.fetchDashboardData();
      
      console.log('📊 Dashboard Data:', dashboardData);
      
      // Tambahkan ke history
      this.conversationHistory.push({
        role: 'user',
        content: message
      });
      this.saveHistory();

      // Buat prompt dengan data real-time, tutorial, dan memory
      const tutorialText = pageContext.tutorials ? `\n\nTUTORIAL HALAMAN INI:\n${pageContext.tutorials.map((t, i) => `${i + 1}. ${t}`).join('\n')}` : '';
      
      const topQuestions = JSON.parse(localStorage.getItem('frequentQuestions') || '[]');
      const topQuestionsText = topQuestions.length > 0 
        ? `\n\nTOP 5 CHAT TREN (Pertanyaan Paling Sering):\n${topQuestions.map((q, i) => `${i + 1}. "${q.question}" - ${q.count} kali ditanyakan`).join('\n')}`
        : '';
      
      const preferencesContext = this.getPreferencesContext();
      const memoryContext = preferencesContext ? `\n\nMEMORY & PREFERENSI USER:${preferencesContext}\n(WAJIB ikuti preferensi ini dalam setiap jawaban!)` : '';
      
      // Ambil 10 percakapan terakhir untuk konteks
      const recentHistory = this.conversationHistory.slice(-10);
      const historyContext = recentHistory.length > 1 
        ? `\n\nRIWAYAT PERCAKAPAN TERAKHIR:\n${recentHistory.slice(0, -1).map(h => `${h.role === 'user' ? 'User' : 'Bot'}: ${h.content}`).join('\n')}`
        : '';
      
      // Buat data detail untuk AI
      let detailedData = `\n\nDATA DETAIL LENGKAP:`;
      
      // Detail API Keys
      if (dashboardData.apiKeys && dashboardData.apiKeys.apis) {
        detailedData += `\n\nAPI KEYS (${dashboardData.apiKeys.totalApis} API, ${dashboardData.apiKeys.enabledApis} aktif):`;
        dashboardData.apiKeys.apis.forEach((api, i) => {
          detailedData += `\n${i + 1}. ${api.name}:`;
          detailedData += `\n   - API Key: ${api.key}`;
          detailedData += `\n   - URL: ${api.url}`;
          detailedData += `\n   - Model: ${api.model}`;
          detailedData += `\n   - Type: ${api.type}`;
          detailedData += `\n   - Status: ${api.enabled ? 'Aktif' : 'Tidak Aktif'}`;
        });
      }
      
      // Detail Database
      if (dashboardData.databasesList && dashboardData.databasesList.length > 0) {
        detailedData += `\n\nDATABASE (${dashboardData.databasesList.length} database):`;
        dashboardData.databasesList.forEach((db, i) => {
          detailedData += `\n${i + 1}. Nama: "${db.nama_database}", Sumber: ${db.sumber_api}, Records: ${db.total_records || 0}, Status: ${db.status}, Tanggal Import: ${new Date(db.dibuat_pada).toLocaleDateString('id-ID')}`;
        });
      } else {
        detailedData += `\n\nDATABASE: Belum ada database yang diimport`;
      }
      
      // Detail Users
      if (dashboardData.usersList && dashboardData.usersList.length > 0) {
        detailedData += `\n\nUSERS (${dashboardData.usersList.length} pengguna):`;
        dashboardData.usersList.forEach((user, i) => {
          detailedData += `\n${i + 1}. Nama: "${user.nama}", Email: ${user.email}, No HP: ${user.no_hp || '-'}, Status: ${user.status}, Bergabung: ${new Date(user.dibuat_pada).toLocaleDateString('id-ID')}`;
        });
      } else {
        detailedData += `\n\nUSERS: Belum ada pengguna terdaftar`;
      }
      
      // Detail Chat History
      if (dashboardData.chatsList && dashboardData.chatsList.length > 0) {
        detailedData += `\n\nCHAT HISTORY (${dashboardData.chatsList.length} chat):`;
        dashboardData.chatsList.slice(0, 10).forEach((chat, i) => {
          detailedData += `\n${i + 1}. User: ${chat.user_email}, Judul: "${chat.judul}", Tanggal: ${new Date(chat.dibuat_pada).toLocaleDateString('id-ID')}`;
        });
        if (dashboardData.chatsList.length > 10) {
          detailedData += `\n... dan ${dashboardData.chatsList.length - 10} chat lainnya`;
        }
      } else {
        detailedData += `\n\nCHAT HISTORY: Belum ada riwayat chat`;
      }
      
      const contextPrompt = `Kamu adalah asisten admin panel chatbot yang SANGAT PINTAR, ramah, dan ahli dalam troubleshooting. 

⚠️ ATURAN PALING PENTING:
- JANGAN PERNAH memberikan informasi umum tentang MongoDB, PostgreSQL, atau platform lain yang TIDAK ADA di sistem ini
- HANYA jawab berdasarkan HALAMAN ADMIN PANEL INI yang menggunakan MySQL dan React.js
- Jika user tanya cara membuat database API, WAJIB gunakan tutorial dari halaman "API Database Manager" di admin panel ini
- JANGAN menyarankan platform eksternal seperti MongoDB Atlas, PostgreSQL, dll
- FOKUS HANYA pada fitur yang ADA di admin panel ini${memoryContext}${historyContext}

📍 KONTEKS HALAMAN ADMIN PANEL SAAT INI: ${pageContext.name}
${pageContext.info}${tutorialText}${topQuestionsText}

⚠️ PENTING: User sedang berada di halaman "${pageContext.name}" dari admin panel ini. SEMUA jawaban HARUS berdasarkan halaman ini, BUKAN informasi umum dari internet!

📊 DATA REAL-TIME TERSEDIA (JANGAN tampilkan kecuali user minta):
- Total Pengguna: ${dashboardData.totalUsers} pengguna
- Pengguna Aktif: ${dashboardData.activeUsers} pengguna
- Total Database: ${dashboardData.totalDatabases} database
- Chat Hari Ini: ${dashboardData.todayChats} pesan
- Total API Keys: ${dashboardData.apiKeys?.totalApis || 0} API (${dashboardData.apiKeys?.enabledApis || 0} aktif)${detailedData}

⚡ ATURAN PENTING:

📊 DATA & INFORMASI:
1. ⚠️ JANGAN tampilkan data real-time kecuali user EKSPLISIT minta ("berapa pengguna?", "total database?", dll)
2. Jika user tanya tentang DATA ADMIN PANEL (berapa pengguna, chat hari ini, dll), WAJIB gunakan angka dari DATA REAL-TIME di atas
3. Jika user minta DAFTAR/LIST (database apa saja, siapa saja usernya, API key apa saja, dll), WAJIB tampilkan dari DATA DETAIL LENGKAP dengan format rapi dan lengkap
4. Jika user tanya tentang API KEY, tampilkan SEMUA informasi (nama, key, url, model, type, status)
5. Jika user tanya tentang konfigurasi/teknis, berikan penjelasan DETAIL dan LENGKAP
6. ⚠️ JIKA user tanya "cara bikin database API", WAJIB jawab dengan tutorial dari halaman "API Database Manager" yang ADA di admin panel ini, JANGAN kasih info tentang MongoDB Atlas atau platform lain!

🔧 TROUBLESHOOTING & ERROR:
7. Jika user tanya "kenapa error", "kenapa gagal", "kenapa tidak bisa", ANALISIS kemungkinan penyebab:
   - Cek validasi data (email format, password length, required fields)
   - Cek koneksi backend/API (apakah backend running di port 3000?)
   - Cek duplikasi data (email sudah terdaftar?)
   - Cek permission/authorization (user punya akses?)
   - Berikan SOLUSI KONKRET untuk setiap kemungkinan

8. Untuk error saat TAMBAH USER, jelaskan:
   - Pastikan semua field required terisi (Nama, Email, Password)
   - Email harus format valid (contoh@email.com)
   - Email tidak boleh duplikat dengan user lain
   - Password minimal 6 karakter
   - Backend harus running di http://localhost:3000
   - Cek console browser (F12) untuk error detail

9. Untuk error saat IMPORT DATABASE, jelaskan:
   - API URL harus valid dan accessible
   - Jika API butuh authentication, masukkan API Key/Token
   - Preview data dulu sebelum import
   - Pastikan response API dalam format JSON
   - Cek CORS policy jika ada error
   - ⚠️ PENTING: Ini adalah fitur import dari API eksternal ke MySQL database lokal, BUKAN membuat akun di MongoDB Atlas atau platform lain!

📚 TUTORIAL & CARA:
10. ⚠️ WAJIB: Jika user tanya "cara", "bagaimana", "tutorial", "gimana", berikan step-by-step DETAIL dari TUTORIAL HALAMAN INI yang ada di atas
11. JANGAN PERNAH kasih tutorial umum tentang platform lain (MongoDB, PostgreSQL, dll) yang TIDAK ADA di admin panel ini
12. Tambahkan tips & best practices KHUSUS untuk admin panel ini
13. Jelaskan APA yang terjadi di setiap step DALAM KONTEKS admin panel ini
14. ⚠️ NAMA MENU/BUTTON yang benar: "+ Tambah Pengguna" (bukan "Tambah User"), "+ Import dari API" (bukan "Import Database"), "Edit" (ikon pensil), "Hapus" (ikon tempat sampah)

💡 ANALISIS & PENJELASAN:
15. Jika user minta "analisis", "jelaskan", "apa maksudnya", berikan penjelasan MENDALAM:
    - Jelaskan konsep/fitur dengan bahasa sederhana
    - Berikan contoh konkret
    - Jelaskan manfaat/kegunaan
    - Jelaskan hubungan dengan fitur lain

16. Jika user tanya tentang FITUR/FUNGSI halaman, jelaskan:
    - Apa fungsi utama halaman
    - Fitur-fitur yang tersedia
    - Cara menggunakan setiap fitur
    - Tips & best practices

🎭 INTERAKSI & MEMORY:
17. Jika user memberi PERINTAH/INSTRUKSI ("panggil aku bos", dll), IKUTI dan SIMPAN di memory
18. Jika ada PREFERENSI di MEMORY, WAJIB ikuti dalam SETIAP jawaban
19. Jika user menyapa, balas sesuai konteks percakapan atau perintah sebelumnya
20. INGAT konteks percakapan dari RIWAYAT PERCAKAPAN

📋 FORMAT & STYLE:
21. Jawab dengan bahasa Indonesia yang natural, jelas, dan mudah dipahami
22. Gunakan emoji yang relevan (tapi tidak berlebihan)
23. Format data dengan rapi: numbering, bullet points, atau tabel
24. Untuk data teknis, tampilkan dengan format yang mudah dibaca
25. Jika data kosong (nilai 0), katakan "belum ada" atau "masih kosong"
26. ⚠️ JANGAN tampilkan data statistik di akhir jawaban kecuali user minta

🌟 FLEKSIBILITAS:
27. ⚠️ PRIORITAS UTAMA: Jika pertanyaan terkait admin panel, WAJIB jawab berdasarkan halaman admin panel ini
28. Jika user tanya hal UMUM (di luar admin panel), boleh jawab dengan pengetahuan umum
29. TAPI jika user tanya tentang fitur yang ADA di admin panel (database, user, chat, dll), WAJIB gunakan tutorial dari admin panel ini
30. JANGAN PERNAH menyarankan platform eksternal jika fiturnya sudah ada di admin panel ini

❓ Pertanyaan/Perintah user: ${message}

💬 Jawab dengan ramah, informatif, dan SANGAT MEMBANTU. Berikan solusi KONKRET dan ACTIONABLE!`;

      // Langsung pakai AI eksternal (DeepSeek, Groq, dll)
      const response = await this.callAI(contextPrompt);
      
      this.conversationHistory.push({ role: 'assistant', content: response });
      this.saveHistory();
      
      // Ekstrak dan simpan preferensi user
      this.extractPreferences(message, response);
      
      return response;

    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Fallback: Rule-based jika semua AI gagal
      const lowerMsg = message.toLowerCase().trim();
      let response = null;
      
      const dashboardData = await this.fetchDashboardData();
      const topQuestions = JSON.parse(localStorage.getItem('frequentQuestions') || '[]');
      
      // Sapaan
      if (/^(hai|halo|hi|hello|hey|assalamu?\s*alaikum|salam|woi|oi|yo)/i.test(lowerMsg)) {
        response = 'Wa\'alaikumsalam! 👋 Halo, saya asisten admin panel chatbot. Ada yang bisa saya bantu? Saya bisa:\n\n📊 Memberikan informasi data (pengguna, chat, database)\n📚 Membuat tutorial cara menggunakan fitur\n💡 Menjelaskan fungsi halaman\n\nSilakan tanya apa saja!';
      }
      // Chat tren posisi pertama
      else if (/(chat.*tren.*pertama|pertanyaan.*pertama|tren.*posisi.*1|top.*1.*chat)/i.test(lowerMsg)) {
        if (topQuestions.length > 0 && topQuestions[0].count > 0) {
          response = `🏆 Chat tren posisi pertama adalah:\n\n"${topQuestions[0].question}"\n\nPertanyaan ini sudah ditanyakan sebanyak ${topQuestions[0].count} kali.`;
        } else {
          response = '📊 Maaf, belum ada data chat hari ini, jadi tidak ada tren atau posisi pertama. Chat hari ini masih 0.';
        }
      }
      // Top 5 chat tren
      else if (/(top.*chat|chat.*tren|pertanyaan.*sering)/i.test(lowerMsg)) {
        if (topQuestions.length > 0) {
          const list = topQuestions.map((q, i) => `${i + 1}. "${q.question}" - ${q.count} kali`).join('\n');
          response = `🏆 Top 5 Chat Tren:\n\n${list}`;
        } else {
          response = '📊 Belum ada data chat tren. Silakan cek kembali nanti.';
        }
      }
      // Pengguna aktif
      else if (/(pengguna|user).*aktif|aktif.*(pengguna|user)/i.test(lowerMsg)) {
        response = `👥 Saat ini ada ${dashboardData.activeUsers} pengguna aktif dari total ${dashboardData.totalUsers} pengguna.`;
      }
      // Total pengguna
      else if (/(total|berapa|jumlah).*(pengguna|user)|^(pengguna|user)\??$/i.test(lowerMsg)) {
        response = `👥 Total pengguna saat ini ada ${dashboardData.totalUsers} pengguna.`;
      }
      // API Keys
      else if (/(api.*key|key.*api|api.*apa)/i.test(lowerMsg)) {
        const apiInfo = this.getApiKeysInfo();
        if (apiInfo.apis.length > 0) {
          const apiList = apiInfo.apis.map((api, i) => 
            `${i + 1}. ${api.name}\n   Key: ${api.key}\n   Model: ${api.model}\n   Status: ${api.enabled ? 'Aktif ✅' : 'Tidak Aktif ❌'}`
          ).join('\n\n');
          response = `🔑 Daftar API Keys (${apiInfo.totalApis} API):\n\n${apiList}`;
        } else {
          response = `🔑 Tidak ada API key yang terkonfigurasi.`;
        }
      }
      // Database
      else if (/(database|db).*(apa|mana|list|daftar|siapa)/i.test(lowerMsg)) {
        if (dashboardData.databasesList && dashboardData.databasesList.length > 0) {
          const dbList = dashboardData.databasesList.map((db, i) => 
            `${i + 1}. ${db.nama_database} (${db.sumber_api}) - ${db.total_records || 0} records`
          ).join('\n');
          response = `📊 Daftar Database (${dashboardData.databasesList.length} database):\n\n${dbList}`;
        } else {
          response = `📊 Belum ada database yang diimport. Total database saat ini: ${dashboardData.totalDatabases}`;
        }
      }
      // Users
      else if (/(user|pengguna).*(apa|siapa|list|daftar)/i.test(lowerMsg)) {
        if (dashboardData.usersList && dashboardData.usersList.length > 0) {
          const userList = dashboardData.usersList.map((user, i) => 
            `${i + 1}. ${user.nama} (${user.email}) - ${user.status}`
          ).join('\n');
          response = `👥 Daftar Pengguna (${dashboardData.usersList.length} pengguna):\n\n${userList}`;
        } else {
          response = `👥 Belum ada pengguna terdaftar.`;
        }
      }
      // Chat hari ini
      else if (/chat.*hari.*ini|pesan.*hari.*ini|^chat\??$/i.test(lowerMsg)) {
        response = `💬 Chat hari ini ada ${dashboardData.todayChats} pesan.`;
      }
      // Tutorial/cara
      else if (/(cara|bagaimana|tutorial|gimana).*(tambah|buat|hapus|edit|ubah)/i.test(lowerMsg)) {
        const pageContext = this.getPageContext();
        if (pageContext.tutorials && pageContext.tutorials.length > 0) {
          response = `📚 Tutorial ${pageContext.name}:\n\n${pageContext.tutorials.join('\n\n')}`;
        } else {
          response = '📚 Silakan pilih halaman tertentu untuk melihat tutorial yang tersedia.';
        }
      }
      // Error/Troubleshooting - Tambah User
      else if (/(kenapa|mengapa|error|gagal|tidak bisa).*(tambah|buat|add).*(user|pengguna)/i.test(lowerMsg)) {
        response = `🔧 Troubleshooting Error Tambah User:\n\n❌ Kemungkinan Penyebab:\n\n1. Field Required Kosong\n   ✅ Solusi: Pastikan Nama, Email, dan Password terisi\n\n2. Email Tidak Valid\n   ✅ Solusi: Gunakan format email yang benar (contoh@email.com)\n\n3. Email Sudah Terdaftar\n   ✅ Solusi: Gunakan email lain yang belum terdaftar\n\n4. Password Terlalu Pendek\n   ✅ Solusi: Password minimal 6 karakter\n\n5. Backend Tidak Running\n   ✅ Solusi: Pastikan backend berjalan di http://localhost:3000\n   Cek dengan: npm start atau node server.js\n\n6. CORS Error\n   ✅ Solusi: Pastikan backend sudah setup CORS\n\n💡 Tips: Buka Console Browser (F12) untuk melihat error detail!`;
      }
      // Error/Troubleshooting - Import Database
      else if (/(kenapa|mengapa|error|gagal|tidak bisa).*(import|database|db)/i.test(lowerMsg)) {
        response = `🔧 Troubleshooting Error Import Database:\n\n❌ Kemungkinan Penyebab:\n\n1. API URL Tidak Valid\n   ✅ Solusi: Pastikan URL lengkap dan benar (https://...)\n\n2. API Tidak Accessible\n   ✅ Solusi: Test API di browser/Postman dulu\n\n3. API Butuh Authentication\n   ✅ Solusi: Masukkan API Key atau Bearer Token\n\n4. Response Bukan JSON\n   ✅ Solusi: Pastikan API return JSON format\n\n5. CORS Policy Error\n   ✅ Solusi: API harus allow CORS atau gunakan proxy\n\n6. Timeout\n   ✅ Solusi: API terlalu lambat, coba lagi atau gunakan API lain\n\n💡 Tips: Gunakan Preview Data untuk cek response API sebelum import!`;
      }
      // Error/Troubleshooting - General
      else if (/(kenapa|mengapa|error|gagal|tidak bisa|masalah)/i.test(lowerMsg)) {
        response = `🔧 Troubleshooting Umum Admin Panel:\n\n✅ Langkah Debugging:\n\n1. Cek Console Browser (F12)\n   - Lihat error message detail\n   - Cek network tab untuk API calls\n\n2. Cek Backend Status\n   - Pastikan backend running di port 3000\n   - Test: buka http://localhost:3000/api/users\n\n3. Cek Koneksi Internet\n   - Pastikan internet stabil\n   - Cek firewall/antivirus\n\n4. Clear Cache & Reload\n   - Ctrl+Shift+R (hard reload)\n   - Clear browser cache\n\n5. Cek Data Input\n   - Validasi format (email, nomor, dll)\n   - Pastikan tidak ada field required yang kosong\n\n💡 Jika masih error, screenshot error dan tanyakan detail masalahnya!`;
      }
      // Analisis/Jelaskan
      else if (/(analisis|jelaskan|apa itu|apa maksud|kenapa harus)/i.test(lowerMsg)) {
        response = `💡 Saya siap membantu analisis! Tapi saya butuh info lebih detail:\n\n📋 Silakan tanya lebih spesifik:\n- "Analisis kenapa user tidak bisa login"\n- "Jelaskan cara kerja import database"\n- "Apa itu API key dan fungsinya"\n- "Kenapa harus pakai authentication"\n\nAtau tanya tentang data admin panel:\n- "Analisis data pengguna"\n- "Jelaskan statistik dashboard"\n- "Apa maksud chat tren"\n\n🤔 Apa yang ingin Anda ketahui?`;
      }
      // Default
      else {
        response = '🤖 Maaf, AI sedang bermasalah. Tapi saya bisa bantu dengan:\n\n📊 Data: "Berapa pengguna aktif?", "Chat hari ini?", "Total database?"\n📋 List: "Database apa saja?", "Siapa saja usernya?"\n🏆 Tren: "Chat tren posisi pertama?"\n📚 Tutorial: "Cara tambah pengguna?", "Cara import database?"\n\nSilakan tanya!';
      }
      
      this.conversationHistory.push({ role: 'assistant', content: response });
      this.saveHistory();
      return response;
    }
  }

  async callAI(prompt, apiIndex = 0, retry = 0) {
    if (apiIndex >= API_CONFIGS.length) {
      throw new Error('Semua API tidak tersedia');
    }

    const api = API_CONFIGS[apiIndex];
    console.log(`🤖 Trying ${api.name}...`);

    try {
      let response;
      const timeout = 30000; // 30 detik

      if (api.isGemini) {
        // Gemini format
        response = await axios.post(
          `${api.url}?key=${api.key}`,
          {
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024
            }
          },
          { timeout }
        );
        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      } else if (api.isCohere) {
        // Cohere format
        response = await axios.post(
          api.url,
          {
            message: prompt,
            model: api.model,
            temperature: 0.7
          },
          {
            timeout,
            headers: {
              'Authorization': `Bearer ${api.key}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data?.text?.trim();
      } else if (api.isHuggingFace) {
        // HuggingFace format
        response = await axios.post(
          api.url,
          {
            inputs: prompt,
            parameters: {
              max_new_tokens: 1024,
              temperature: 0.7,
              return_full_text: false
            }
          },
          {
            timeout: 60000, // HF butuh waktu lebih lama
            headers: {
              'Authorization': `Bearer ${api.key}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data?.[0]?.generated_text?.trim() || response.data?.generated_text?.trim();
      } else {
        // OpenAI-compatible format (Groq, OpenRouter, DeepInfra)
        response = await axios.post(
          api.url,
          {
            model: api.model,
            messages: [
              {
                role: 'system',
                content: 'Kamu adalah asisten chatbot yang ramah dan membantu. Jawab dengan singkat dan jelas.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 1024
          },
          {
            timeout,
            headers: {
              'Authorization': `Bearer ${api.key}`,
              'Content-Type': 'application/json'
            }
          }
        );
        return response.data?.choices?.[0]?.message?.content?.trim();
      }
    } catch (error) {
      const status = error.response?.status;

      // Rate limit - coba API berikutnya
      if (status === 429) {
        console.log(`⚠️ ${api.name} rate limited, trying next API...`);
        return this.callAI(prompt, apiIndex + 1, 0);
      }

      // HuggingFace model loading - retry
      if (status === 503 && api.isHuggingFace && retry < 1) {
        console.log(`⏳ ${api.name} loading model, retrying in 10s...`);
        await new Promise(r => setTimeout(r, 10000));
        return this.callAI(prompt, apiIndex, retry + 1);
      }

      // Timeout - retry sekali
      if ((error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') && retry < 1) {
        console.log(`🔄 ${api.name} timeout, retrying...`);
        return this.callAI(prompt, apiIndex, retry + 1);
      }

      // Error lain - coba API berikutnya
      console.error(`❌ ${api.name} error:`, error.message);
      return this.callAI(prompt, apiIndex + 1, 0);
    }
  }

  clearHistory() {
    this.conversationHistory = [];
    this.saveHistory();
  }

  clearPreferences() {
    this.userPreferences = {};
    this.savePreferences();
  }

  clearAll() {
    this.clearHistory();
    this.clearPreferences();
  }

  getHistory() {
    return this.conversationHistory;
  }
}

export default new ChatbotService();
