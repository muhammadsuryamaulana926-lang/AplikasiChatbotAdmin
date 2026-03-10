import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const ContextMenu = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [animationKey, setAnimationKey] = useState(0);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleContextMenu = (e) => {
      const isSidebar = e.target.closest('aside') || 
                        e.target.closest('[class*="sidebar"]') || 
                        e.target.closest('nav');
      
      if (isSidebar) {
        return;
      }
      
      e.preventDefault();
      setPosition({ x: e.pageX, y: e.pageY });
      setVisible(true);
      setAnimationKey(prev => prev + 1); // Reset animasi setiap klik kanan
    };

    const handleClick = () => setVisible(false);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!visible) return null;

  const isLight = theme === 'default';
  const isDark = theme === 'glass_light';

  return (
    <div
      key={animationKey}
      className="fixed z-[9999] bg-white dark:bg-[#2a2f32] rounded-2xl shadow-2xl py-3 w-72 animate-context-menu"
      style={{ top: position.y, left: position.x }}
    >
      {/* Light Mode */}
      <button
        onClick={() => setTheme('default')}
        className="w-full text-left px-6 py-3.5 hover:bg-gray-100 dark:hover:bg-[#3b4145] flex items-center gap-4 text-gray-800 dark:text-gray-200 transition-colors animate-menu-item"
        style={{ animationDelay: '0ms' }}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span className="flex-1 text-lg">Light Mode</span>
        {isLight && <span className="text-green-500 text-2xl font-bold">✓</span>}
      </button>

      {/* Dark Mode */}
      <button
        onClick={() => setTheme('glass_light')}
        className="w-full text-left px-6 py-3.5 hover:bg-gray-100 dark:hover:bg-[#3b4145] flex items-center gap-4 text-gray-800 dark:text-gray-200 transition-colors animate-menu-item"
        style={{ animationDelay: '50ms' }}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <span className="flex-1 text-lg">Dark Mode</span>
        {isDark && <span className="text-green-500 text-2xl font-bold">✓</span>}
      </button>

      <div className="border-t border-gray-200 dark:border-gray-600 my-2 animate-menu-item" style={{ animationDelay: '100ms' }}></div>

      {/* Indonesia */}
      <button
        onClick={() => setLanguage('id')}
        className="w-full text-left px-6 py-3.5 hover:bg-gray-100 dark:hover:bg-[#3b4145] flex items-center gap-4 text-gray-800 dark:text-gray-200 transition-colors animate-menu-item"
        style={{ animationDelay: '150ms' }}
      >
        <span className="text-2xl">🇮🇩</span>
        <span className="flex-1 text-lg">Indonesia</span>
        {language === 'id' && <span className="text-green-500 text-2xl font-bold">✓</span>}
      </button>

      {/* English */}
      <button
        onClick={() => setLanguage('en')}
        className="w-full text-left px-6 py-3.5 hover:bg-gray-100 dark:hover:bg-[#3b4145] flex items-center gap-4 text-gray-800 dark:text-gray-200 transition-colors animate-menu-item"
        style={{ animationDelay: '200ms' }}
      >
        <span className="text-2xl">🇬🇧</span>
        <span className="flex-1 text-lg">English</span>
        {language === 'en' && <span className="text-green-500 text-2xl font-bold">✓</span>}
      </button>
    </div>
  );
};

export default ContextMenu;
