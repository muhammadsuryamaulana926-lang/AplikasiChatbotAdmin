import Sidebar from "../components/Sidebar";
import ChatbotWidget from "../components/ChatbotWidget";
import { useState, createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../utils/translations";

// Context untuk sidebar state
const SidebarContext = createContext();
const ChatbotContext = createContext();

export const useSidebar = () => useContext(SidebarContext);
export const useChatbot = () => useContext(ChatbotContext);

export default function AdminLayout({ children }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    // Default true untuk desktop, false untuk mobile
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.innerWidth >= 1024; // lg breakpoint
  });
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Tampilkan loading setiap kali route berubah
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Simpan state ke localStorage setiap kali berubah
  const handleSidebarToggle = (newState) => {
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  // Handle resize untuk menutup sidebar di mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // Di mobile, sidebar selalu tertutup saat resize
        setSidebarOpen(false);
      } else {
        // Di desktop, buka sidebar
        const saved = localStorage.getItem('sidebarOpen');
        if (saved !== null) {
          setSidebarOpen(JSON.parse(saved));
        } else {
          setSidebarOpen(true);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen: handleSidebarToggle }}>
      <ChatbotContext.Provider value={{ chatbotOpen, setChatbotOpen }}>
      <div className={`flex min-h-screen ${
        theme === 'default' 
          ? 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
          : ''
      }`}>
        <Sidebar />
        
        {/* Hamburger Button for Mobile - Hidden when sidebar or chatbot is open */}
        {!sidebarOpen && (
          <button
            onClick={() => handleSidebarToggle(true)}
            className={`fixed top-4 left-4 z-[60] lg:hidden bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all ${
              chatbotOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        
        <main 
          className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 w-full min-w-0 pt-20 lg:pt-8 overflow-x-hidden
            ${sidebarOpen ? "lg:ml-0" : "lg:ml-0"}`}
        >
          {loading ? (
            <div className={`flex items-center justify-center h-screen ${
              theme === 'default' 
                ? 'bg-gradient-to-br from-blue-50 to-purple-50'
                : ''
            }`}>
              <div className="text-center">
                <div className="relative mb-8">
                  <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse ${
                    theme === 'glass_cyber' ? 'bg-purple-600' : 'bg-blue-400'
                  }`}></div>
                  <img 
                    src="/Logo_gambar__nya_saja-removebg-preview.png" 
                    alt="Loading" 
                    className="w-48 h-48 mx-auto relative z-10 animate-float"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full animate-bounce ${
                    theme === 'default' ? 'loading-default' :
                    theme === 'glass_light' ? 'loading-glass-light' :
                    theme === 'glass_dark' ? 'loading-glass-dark' :
                    theme === 'glass_cyber' ? 'loading-cyber' : 'bg-blue-600'
                  }`} style={{animationDelay: '0s'}}></div>
                  <div className={`w-3 h-3 rounded-full animate-bounce ${
                    theme === 'default' ? 'loading-default' :
                    theme === 'glass_light' ? 'loading-glass-light' :
                    theme === 'glass_dark' ? 'loading-glass-dark' :
                    theme === 'glass_cyber' ? 'loading-cyber' : 'bg-blue-600'
                  }`} style={{animationDelay: '0.2s'}}></div>
                  <div className={`w-3 h-3 rounded-full animate-bounce ${
                    theme === 'default' ? 'loading-default' :
                    theme === 'glass_light' ? 'loading-glass-light' :
                    theme === 'glass_dark' ? 'loading-glass-dark' :
                    theme === 'glass_cyber' ? 'loading-cyber' : 'bg-blue-600'
                  }`} style={{animationDelay: '0.4s'}}></div>
                </div>
                <p className={`text-2xl font-bold ${
                  theme === 'glass_cyber' ? 'text-accent' : 'text-primary'
                }`}>{t(language, 'dashboard.loading')}</p>
                <p className="text-sm text-secondary mt-2">{t(language, 'dashboard.pleaseWait')}</p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
        <ChatbotWidget />
      </div>
      </ChatbotContext.Provider>
    </SidebarContext.Provider>
  );
}
