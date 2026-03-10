import { useTheme } from '../contexts/ThemeContext';

export const GlassCard = ({ children, className = '', hover = true, ...props }) => {
  const { theme } = useTheme();
  
  const isGlass = theme.startsWith('glass');
  
  return (
    <div
      className={`
        ${isGlass ? 'glass-card' : 'bg-white border border-gray-200'}
        shadow-lg
        ${hover && isGlass ? 'float-animation' : ''}
        ${!isGlass ? 'p-6' : ''}
        ${className}
      `}
      style={!isGlass ? {
        borderRadius: 'var(--border-radius)',
        padding: 'var(--card-padding)',
        boxShadow: 'var(--shadow-lg)'
      } : {}}
      {...props}
    >
      {children}
    </div>
  );
};

export const GlassButton = ({ children, className = '', variant = 'primary', ...props }) => {
  const { theme } = useTheme();
  
  const isGlass = theme.startsWith('glass');
  
  const variants = {
    primary: isGlass 
      ? 'glass-button text-primary hover:scale-105' 
      : 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: isGlass
      ? 'glass-button text-secondary hover:scale-105'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: isGlass
      ? 'glass-button text-red-500 hover:scale-105'
      : 'bg-red-600 hover:bg-red-700 text-white'
  };
  
  return (
    <button
      className={`
        px-4 py-2 font-medium transition-all duration-300
        ${variants[variant]}
        ${className}
      `}
      style={{
        borderRadius: 'var(--button-radius)'
      }}
      {...props}
    >
      {children}
    </button>
  );
};

// Layout Container per tema
export const ThemedContainer = ({ children, className = '' }) => {
  const { theme } = useTheme();
  
  const containerClasses = {
    default: 'space-y-6',
    glass_light: 'space-y-8',
    glass_dark: 'space-y-6',
    glass_cyber: 'space-y-4'
  };
  
  return (
    <div className={`${containerClasses[theme] || 'space-y-6'} ${className}`}>
      {children}
    </div>
  );
};

// Grid Layout per tema
export const ThemedGrid = ({ children, className = '' }) => {
  const { theme } = useTheme();
  
  const gridClasses = {
    default: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
    glass_light: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8',
    glass_dark: 'flex flex-wrap gap-6',
    glass_cyber: 'grid grid-cols-2 lg:grid-cols-4 gap-4'
  };
  
  return (
    <div className={`${gridClasses[theme] || 'grid grid-cols-1 gap-6'} ${className}`}>
      {children}
    </div>
  );
};
