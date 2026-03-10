import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../utils/translations";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(() => {
    return !sessionStorage.getItem("sidebarAnimated");
  });

  useEffect(() => {
    if (isFirstLoad) {
      sessionStorage.setItem("sidebarAnimated", "true");
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isFirstLoad]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpires");
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("sidebarAnimated");
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      label: t(language, 'sidebar.dashboard'),
      path: "/",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      label: t(language, 'sidebar.userManagement'),
      path: "/users",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      label: t(language, 'sidebar.chatHistory'),
      path: "/chats",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    },
    {
      label: t(language, 'sidebar.databaseConfig'),
      path: "/settings",
      icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    },
    {
      label: t(language, 'sidebar.apiConfig'),
      path: "/api-database",
      icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      label: t(language, 'sidebar.apiKeys'),
      path: "/api-keys",
      icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    // Tutup sidebar di mobile setelah navigasi
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`h-screen top-0 left-0 flex flex-col shadow-2xl sidebar-themed
      transition-all duration-300
      ${isFirstLoad ? "animate-slideInLeft" : ""}
      ${sidebarOpen ? "w-72" : "w-20"}
      fixed lg:sticky z-50 lg:z-auto
      ${!sidebarOpen && window.innerWidth < 1024 ? "-translate-x-full" : "translate-x-0"}
      lg:translate-x-0
      ${
        theme === 'default' 
          ? ''
          : theme.startsWith('glass') 
          ? 'glass-sidebar'
          : ''
      }`}
      >
        {/* HEADER */}
        <div className="pt-4 px-4 pb-3 border-b border-theme flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden min-w-0 flex-1">
            <img
              src="/logo_mm-removebg-preview.png"
              alt="Logo"
              className="w-10 h-10 object-contain flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-base lg:text-lg font-bold leading-tight truncate text-primary" style={{ letterSpacing: theme === 'glass_cyber' ? '0.1em' : 'normal' }}>{t(language, 'sidebar.adminPanel')}</h2>
              <p className="text-xs text-secondary truncate" style={{ letterSpacing: theme === 'glass_cyber' ? '0.05em' : 'normal' }}>{t(language, 'sidebar.chatbotManagement')}</p>
            </div>
          </div>

          {/* TOGGLE */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded sidebar-item-hover flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={sidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
              />
            </svg>
          </button>
        </div>

        {/* MENU */}
        <nav className="p-3 space-y-2 flex-1">
          {menuItems.map((item) => (
            <div key={item.path} className="relative group">
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg
              ${
                location.pathname === item.path
                  ? "sidebar-item-active shadow-xl scale-105"
                  : "sidebar-item-hover"
              }`}
                style={{
                  borderRadius: 'var(--button-radius)'
                }}
              >
                <svg
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                    location.pathname === item.path ? "rotate-12 scale-110" : "group-hover:rotate-6"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>

                {/* TEXT */}
                <span
                  className={`whitespace-nowrap transition-all duration-300 font-medium truncate
                ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 overflow-hidden"}`}
                >
                  {item.label}
                </span>
              </button>
              
              {/* TOOLTIP - Muncul saat sidebar tertutup */}
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                  {item.label}
                  {/* Arrow */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="p-3 border-t border-theme">
          <div className="relative group">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-3 py-3 glass-button text-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{
                borderRadius: 'var(--button-radius)'
              }}
            >
              <svg
                className="w-6 h-6 transition-transform duration-300 hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              {sidebarOpen && <span className="font-medium whitespace-nowrap">{t(language, 'sidebar.logout')}</span>}
            </button>
            
            {/* TOOLTIP - Muncul saat sidebar tertutup */}
            {!sidebarOpen && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
                {t(language, 'sidebar.logout')}
                {/* Arrow */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL KONFIRMASI LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full animate-scale-in relative">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{t(language, 'sidebar.logoutConfirm')}</h3>
            <p className="text-gray-600 text-center mb-6">
              {t(language, 'sidebar.logoutMessage')}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition"
              >
                {t(language, 'sidebar.cancel')}
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition"
              >
                {t(language, 'sidebar.yesLogout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
