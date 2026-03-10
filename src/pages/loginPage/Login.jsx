import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpires = localStorage.getItem("tokenExpires");
    if (token && tokenExpires && Date.now() < parseInt(tokenExpires)) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      setLoading(false);
      return;
    }

    // Cek apakah email adalah admin
    if (email !== 'chatbotaiasistent@gmail.com') {
      setError("Akses ditolak. Hanya admin yang dapat login ke panel ini.");
      setLoading(false);
      return;
    }

    try {
      console.log('🔐 Attempting login with:', { email, password: '***' });
      console.log('🌐 API URL:', import.meta.env.VITE_BACKEND_URL);
      
      const response = await loginApi({ email, password });
      console.log('📥 Login response:', response);
      
      if (response.success && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("tokenExpires", Date.now() + (30 * 60 * 1000)); // 30 menit
        localStorage.setItem("userEmail", email);
        console.log('✅ Login successful, redirecting...');
        navigate("/", { replace: true });
      } else {
        console.error('❌ Login failed:', response.error);
        setError(response.error || "Login gagal");
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setError(error.message || "Username atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col md:flex-row bg-white relative overflow-hidden">
      {/* SVG Definitions for smooth wave clip-path */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="waveClipLeft" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 0.95,0 Q 0.97,0.1 0.95,0.2 Q 0.97,0.3 0.95,0.4 Q 0.97,0.5 0.95,0.6 Q 0.97,0.7 0.95,0.8 Q 0.97,0.9 0.95,1 L 0,1 Z" />
          </clipPath>
          <clipPath id="waveClipRight" clipPathUnits="objectBoundingBox">
            <path d="M 0.05,0 L 1,0 L 1,1 L 0.05,1 Q 0.03,0.9 0.05,0.8 Q 0.03,0.7 0.05,0.6 Q 0.03,0.5 0.05,0.4 Q 0.03,0.3 0.05,0.2 Q 0.03,0.1 0.05,0 Z" />
          </clipPath>
        </defs>
      </svg>
      {/* Animated Background Elements */}
      {/* Animated Gradient Orbs */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-1000 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.6) 0%, rgba(147,197,253,0.4) 100%)',
          left: `${20 + mousePosition.x * 0.03}%`,
          top: `${10 + mousePosition.y * 0.03}%`,
        }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-30 transition-all duration-1000 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(147,197,253,0.6) 0%, rgba(96,165,250,0.4) 100%)',
          right: `${10 + mousePosition.x * 0.02}%`,
          bottom: `${15 + mousePosition.y * 0.02}%`,
        }}
      />
      
      {/* Floating Dots with varied sizes */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none transition-all ease-out"
          style={{
            left: `${(i % 5) * 20 + mousePosition.x * (0.01 + i * 0.001)}%`,
            top: `${Math.floor(i / 5) * 20 + mousePosition.y * (0.01 + i * 0.001)}%`,
            width: `${8 + (i % 3) * 4}px`,
            height: `${8 + (i % 3) * 4}px`,
            borderRadius: '50%',
            background: i % 2 === 0 
              ? `rgba(96, 165, 250, ${0.6 - i * 0.015})` 
              : `rgba(147, 197, 253, ${0.6 - i * 0.015})`,
            boxShadow: i % 2 === 0 
              ? '0 0 20px rgba(96, 165, 250, 0.6)' 
              : '0 0 20px rgba(147, 197, 253, 0.6)',
          }}
        />
      ))}
      
      {/* Connecting Lines Effect */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`line-${i}`}
          className="absolute pointer-events-none transition-all duration-700"
          style={{
            left: `${10 + i * 12 + mousePosition.x * 0.015}%`,
            top: `${20 + mousePosition.y * 0.02}%`,
            width: '3px',
            height: `${40 + i * 10}px`,
            background: `linear-gradient(180deg, rgba(96,165,250,${0.5 - i * 0.03}) 0%, transparent 100%)`,
            transform: `rotate(${i * 45 + mousePosition.x * 0.05}deg)`,
          }}
        />
      ))}
      
      {/* Floating Rings */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`ring-${i}`}
          className="absolute pointer-events-none transition-all duration-1000 ease-out"
          style={{
            right: `${5 + i * 15 + mousePosition.x * 0.025}%`,
            bottom: `${10 + i * 12 + mousePosition.y * 0.025}%`,
            width: `${30 + i * 15}px`,
            height: `${30 + i * 15}px`,
            borderRadius: '50%',
            border: `3px solid rgba(147, 197, 253, ${0.4 - i * 0.03})`,
            boxShadow: `0 0 25px rgba(147, 197, 253, ${0.3 - i * 0.02})`,
          }}
        />
      ))}
      
      {/* Small Sparkles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute pointer-events-none transition-all duration-500"
          style={{
            left: `${15 + (i % 4) * 25 + mousePosition.x * 0.02}%`,
            top: `${30 + Math.floor(i / 4) * 20 + mousePosition.y * 0.02}%`,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(191, 219, 254, 0.9)',
            boxShadow: '0 0 15px rgba(191, 219, 254, 1)',
          }}
        />
      ))}

      {/* Background decorative elements */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none transition-all ease-out"
          style={{
            left: `${(i % 5) * 20 + mousePosition.x * (0.008 + i * 0.0005)}%`,
            top: `${Math.floor(i / 5) * 25 + mousePosition.y * (0.008 + i * 0.0005)}%`,
            width: `${60 + (i % 4) * 40}px`,
            height: `${60 + (i % 4) * 40}px`,
            borderRadius: '50%',
            background: i % 3 === 0 
              ? 'rgba(96, 165, 250, 0.15)' 
              : i % 3 === 1
              ? 'rgba(147, 197, 253, 0.15)'
              : 'rgba(191, 219, 254, 0.15)',
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Left Side - Illustration Area - Tampil di mobile juga */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6 lg:p-12 relative order-1 overflow-hidden" style={{
        clipPath: window.innerWidth >= 768 ? 'url(#waveClipLeft)' : 'none'
      }}>
        <div className="relative">
          {/* Organic blob shape background - Hidden on mobile */}
          <div className="hidden md:block absolute inset-0 -m-20">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <defs>
                <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#60A5FA', stopOpacity: 0.8}} />
                  <stop offset="50%" style={{stopColor: '#93C5FD', stopOpacity: 0.6}} />
                  <stop offset="100%" style={{stopColor: '#BFDBFE', stopOpacity: 0.4}} />
                </linearGradient>
              </defs>
              <path
                d="M100,250 Q150,100 250,120 T400,250 Q380,400 250,380 T100,250 Z"
                fill="url(#blobGradient)"
              />
            </svg>
          </div>
          
          {/* Decorative circles - Hidden on mobile */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`circle-${i}`}
              className="hidden md:block absolute rounded-full"
              style={{
                width: `${40 + i * 15}px`,
                height: `${40 + i * 15}px`,
                background: i % 2 === 0 ? 'rgba(147, 197, 253, 0.3)' : 'rgba(191, 219, 254, 0.3)',
                left: `${(i % 3) * 30 - 10}%`,
                top: `${Math.floor(i / 3) * 25}%`,
                filter: 'blur(2px)',
              }}
            />
          ))}
          
          {/* Center illustration */}
          <div className="relative z-10 text-center">
            <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto flex items-center justify-center">
              <img 
                src="/Gemini_Generated_Image_y8ny9ry8ny9ry8ny__1_-removebg-preview.png" 
                alt="Illustration" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div 
        className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-blue-400 bg-opacity-30 relative backdrop-blur-sm order-2 overflow-y-auto"
        style={{
          clipPath: window.innerWidth >= 768 ? 'url(#waveClipRight)' : 'none'
        }}
      >
        <div className="w-full max-w-lg px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-white border-opacity-50 shadow-2xl">
            <div className="mb-4 sm:mb-6 lg:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 text-center mb-2 tracking-wide">MASUK</h1>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-sm text-red-700 text-center font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-7">
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">Email</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="contoh@gmail.com"
                    className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 bg-white border-2 border-gray-400 rounded-xl text-gray-800 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">Kata Sandi</label>
                <div 
                  className="relative"
                  onMouseEnter={() => setShowPassword(true)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 bg-white border-2 border-gray-400 rounded-xl text-gray-800 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6 sm:mt-10"
              >
                {loading ? "Memproses..." : "MASUK"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
