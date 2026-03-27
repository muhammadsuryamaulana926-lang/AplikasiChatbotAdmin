# 📱 Cara Menjalankan Aplikasi Mobile Chatbot

## 📋 Daftar Isi
0. [Install Tools yang Dibutuhkan](#0-install-tools-yang-dibutuhkan)
1. [Jalankan di Expo Go (Development)](#1-jalankan-di-expo-go-development)
2. [Build APK untuk Android (Production)](#2-build-apk-untuk-android-production)
3. [Konfigurasi Google Login](#3-konfigurasi-google-login)
4. [Troubleshooting](#4-troubleshooting)

---

## 0. Install Tools yang Dibutuhkan

### A. Install Node.js (jika belum ada)
1. Download dari: https://nodejs.org/
2. Pilih versi **LTS** (Long Term Support)
3. Install dengan default settings
4. Verifikasi instalasi:
```bash
node --version
npm --version
```

### B. Install Expo CLI
```bash
npm install -g expo-cli
```

Verifikasi instalasi:
```bash
expo --version
```

### C. Install EAS CLI (untuk build APK)
```bash
npm install -g eas-cli
```

Verifikasi instalasi:
```bash
eas --version
```

### D. Install Expo Go di HP Android/iOS

#### Untuk Android:
1. Buka **Google Play Store**
2. Cari: **Expo Go**
3. Install aplikasi **Expo Go** (by Expo)

**Atau install via terminal (jika HP terhubung via USB):**
```bash
# Enable USB Debugging di HP terlebih dahulu
# Settings → About Phone → tap Build Number 7x → Developer Options → USB Debugging

# Install Expo Go via ADB
adb install expo-go.apk
```

**Atau download APK langsung:**
```bash
# Download Expo Go APK
curl -o expo-go.apk https://d1ahtucjixef4r.cloudfront.net/Exponent-2.31.1.apk

# Install ke HP (via USB)
adb install expo-go.apk
```

#### Untuk iOS:
1. Buka **App Store**
2. Cari: **Expo Go**
3. Install aplikasi **Expo Go**

### E. Buat Akun Expo (Gratis)
1. Buka: https://expo.dev/signup
2. Daftar dengan email atau GitHub
3. Verifikasi email

**Atau daftar via terminal:**
```bash
expo register
```

---

## 1. Jalankan di Expo Go (Development)

### Prasyarat
- Node.js v18+ terinstall
- Expo Go app terinstall di HP Android/iOS
- Backend server sudah running di `http://10.23.11.225:3000`

### Langkah-langkah

#### A. Install Dependencies
```bash
cd aplikasichatbot-frontend
npm install
```

#### B. Konfigurasi Backend URL
Edit file `config/api-config.ts`:
```typescript
export const API_CONFIG = {
  BACKEND_URL: "http://10.23.11.225:3000"  // Sesuaikan dengan IP backend Anda
};
```

#### C. Jalankan Development Server
```bash
npx expo start
```

#### D. Buka di Expo Go
1. Scan QR code yang muncul di terminal menggunakan:
   - **Android**: Expo Go app
   - **iOS**: Camera app
2. Aplikasi akan terbuka di Expo Go

### ⚠️ Catatan Penting untuk Expo Go
- **Google Login TIDAK AKAN BERFUNGSI** di Expo Go
- Expo Go hanya untuk development/testing fitur lain
- Untuk test Google Login, harus build APK (lihat bagian 2)

---

## 2. Build APK untuk Android (Production)

### Prasyarat
- Akun Expo (gratis): https://expo.dev/signup
- EAS CLI terinstall: `npm install -g eas-cli`

### Langkah-langkah

#### A. Login ke Expo
```bash
eas login
```
Masukkan email dan password akun Expo Anda.

#### B. Konfigurasi Project
```bash
cd aplikasichatbot-frontend
eas build:configure
```

#### C. Konfigurasi Google OAuth untuk Android

##### 1. Dapatkan SHA-1 Certificate Fingerprint
```bash
eas credentials
```
- Pilih: **Android**
- Pilih: **production**
- Pilih: **Keystore: Manage everything needed to build your project**
- Pilih: **Set up a new keystore**
- Copy **SHA-1 Fingerprint** yang muncul

##### 2. Tambahkan SHA-1 ke Google Cloud Console
1. Buka: https://console.cloud.google.com/
2. Pilih project Anda (atau buat baru)
3. Navigasi: **APIs & Services** → **Credentials**
4. Klik **OAuth 2.0 Client IDs** yang sudah ada (atau buat baru)
5. Klik **+ ADD URI** di bagian **Authorized redirect URIs**
6. Tambahkan:
   ```
   https://auth.expo.io/@YOUR_EXPO_USERNAME/aplikasichatbot-frontend
   ```
   Ganti `YOUR_EXPO_USERNAME` dengan username Expo Anda
7. Klik **+ ADD FINGERPRINT** di bagian **SHA-1 certificate fingerprints**
8. Paste SHA-1 yang di-copy tadi
9. Klik **Save**

##### 3. Update app.json
Edit `app.json`:
```json
{
  "expo": {
    "name": "Chatbot AI",
    "slug": "aplikasichatbot-frontend",
    "android": {
      "package": "com.yourcompany.chatbotai",
      "googleServicesFile": "./google-services.json",
      "config": {
        "googleSignIn": {
          "apiKey": "YOUR_ANDROID_API_KEY",
          "certificateHash": "YOUR_SHA1_FINGERPRINT"
        }
      }
    },
    "extra": {
      "eas": {
        "projectId": "YOUR_PROJECT_ID"
      }
    }
  }
}
```

##### 4. Download google-services.json
1. Di Google Cloud Console, klik **Download JSON**
2. Rename file menjadi `google-services.json`
3. Letakkan di root folder project (`aplikasichatbot-frontend/`)

#### D. Build APK
```bash
eas build --platform android --profile preview
```

**Pilihan Build Profile:**
- `preview` → APK (bisa langsung install di HP)
- `production` → AAB (untuk upload ke Play Store)

#### E. Download & Install APK
1. Tunggu build selesai (15-30 menit)
2. Link download APK akan muncul di terminal
3. Download APK ke HP Android
4. Install APK (enable "Install from Unknown Sources" jika perlu)

---

## 3. Konfigurasi Google Login

### A. Setup Google Cloud Console

#### 1. Buat Project Baru (jika belum ada)
1. Buka: https://console.cloud.google.com/
2. Klik **Select a project** → **New Project**
3. Nama project: `Chatbot AI`
4. Klik **Create**

#### 2. Enable Google Sign-In API
1. Navigasi: **APIs & Services** → **Library**
2. Cari: **Google Sign-In API**
3. Klik **Enable**

#### 3. Buat OAuth 2.0 Credentials

##### Untuk Android (APK)
1. **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth client ID**
2. Application type: **Android**
3. Name: `Chatbot AI Android`
4. Package name: `com.yourcompany.chatbotai` (sesuai app.json)
5. SHA-1: Paste SHA-1 dari `eas credentials`
6. Klik **Create**
7. Copy **Client ID** yang muncul

##### Untuk Web (Backend)
1. **Create Credentials** → **OAuth client ID**
2. Application type: **Web application**
3. Name: `Chatbot AI Backend`
4. Authorized redirect URIs:
   ```
   http://localhost:3000/auth/google/callback
   http://10.23.11.225:3000/auth/google/callback
   ```
5. Klik **Create**
6. Copy **Client ID** dan **Client Secret**

### B. Update Backend (.env)
Edit `chatbot-backend/.env`:
```env
GOOGLE_CLIENT_ID=YOUR_WEB_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_WEB_CLIENT_SECRET
```

### C. Update Mobile App
Edit `aplikasichatbot-frontend/screens/auth/LoginScreen.tsx`:
```typescript
const GOOGLE_WEB_CLIENT_ID = "YOUR_WEB_CLIENT_ID";
const GOOGLE_ANDROID_CLIENT_ID = "YOUR_ANDROID_CLIENT_ID";
```

---

## 4. Troubleshooting

### ❌ Google Login tidak berfungsi di Expo Go
**Solusi**: Build APK menggunakan `eas build`. Google Login hanya berfungsi di APK/AAB, tidak di Expo Go.

### ❌ Error: "Invalid client ID"
**Solusi**: 
1. Pastikan SHA-1 fingerprint sudah ditambahkan di Google Cloud Console
2. Pastikan package name di `app.json` sama dengan di Google Cloud Console
3. Tunggu 5-10 menit setelah update Google Cloud Console

### ❌ Error: "Network request failed"
**Solusi**:
1. Pastikan backend running di `http://10.23.11.225:3000`
2. Pastikan HP dan laptop di jaringan yang sama
3. Cek firewall tidak block port 3000

### ❌ Build gagal: "Keystore not found"
**Solusi**:
```bash
eas credentials
# Pilih Android → production → Set up a new keystore
```

### ❌ APK tidak bisa install: "App not installed"
**Solusi**:
1. Uninstall versi lama aplikasi
2. Enable "Install from Unknown Sources" di Settings
3. Download ulang APK

### ❌ Error: "AAPT: error: resource android:attr/lStar not found"
**Solusi**:
```bash
npm install expo@latest
npx expo install --fix
```

---

## 📝 Checklist Sebelum Build Production

- [ ] Backend URL sudah benar di `config/api-config.ts`
- [ ] Google Client ID (Web & Android) sudah benar
- [ ] SHA-1 fingerprint sudah ditambahkan di Google Cloud Console
- [ ] `google-services.json` sudah ada di root folder
- [ ] Package name di `app.json` sudah benar
- [ ] Sudah login ke `eas login`
- [ ] Sudah test di Expo Go (fitur selain Google Login)

---

## 🚀 Quick Commands

### Install Tools
```bash
# Install Expo CLI
npm install -g expo-cli

# Install EAS CLI
npm install -g eas-cli

# Verifikasi instalasi
expo --version
eas --version
```

### Development (Expo Go)
```bash
cd aplikasichatbot-frontend
npm install
npx expo start
```

### Build APK
```bash
cd aplikasichatbot-frontend
eas login
eas build --platform android --profile preview
```

### Build AAB (Play Store)
```bash
eas build --platform android --profile production
```

### Check Build Status
```bash
eas build:list
```

---

## 📞 Support

Jika ada masalah:
1. Cek log error di terminal
2. Cek dokumentasi Expo: https://docs.expo.dev/
3. Cek dokumentasi Google Sign-In: https://developers.google.com/identity

---

**Dibuat oleh**: Tim PKL ITB  
**Terakhir diupdate**: 2024
