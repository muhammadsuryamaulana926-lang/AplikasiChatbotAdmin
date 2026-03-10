// Deteksi environment otomatis
const getBackendUrl = () => {
  // Jika ada environment variable, gunakan itu
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  
  // Jika menggunakan devtunnels atau forward port
  if (window.location.hostname.includes('devtunnels.ms') || window.location.hostname.includes('ngrok')) {
    // Untuk devtunnels, backend biasanya di port yang berbeda atau URL terpisah
    // Sesuaikan dengan URL backend devtunnels Anda
    return import.meta.env.VITE_BACKEND_URL || 'https://jstlmtmc-3000.asse.devtunnels.ms';
  }
  
  // Jika di production/forward port lain
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Gunakan hostname yang sama dengan frontend tapi port 3000
    return `${window.location.protocol}//${window.location.hostname}:3000`;
  }
  
  // Default untuk local development
  return "http://localhost:3000";
};

export const API_CONFIG = {
  BACKEND_URL: getBackendUrl(),
};

export default API_CONFIG;
