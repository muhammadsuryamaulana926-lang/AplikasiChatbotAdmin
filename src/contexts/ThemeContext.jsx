import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('admin_theme') || 'default';
  });

  useEffect(() => {
    localStorage.setItem('admin_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply font family to body
    const fontFamily = themes[theme]?.fontFamily || 'Inter, system-ui, sans-serif';
    document.body.style.fontFamily = fontFamily;
  }, [theme]);

  const themes = {
    default: {
      name: 'Light Mode',
      fontFamily: 'Inter, system-ui, sans-serif'
    },
    glass_light: {
      name: 'Dark Mode',
      fontFamily: 'Poppins, sans-serif'
    },
    glass_dark: {
      name: 'Glass Dark',
      fontFamily: 'Roboto, sans-serif'
    },
    glass_cyber: {
      name: 'Cyberpunk',
      fontFamily: 'Orbitron, monospace'
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
