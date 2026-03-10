import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import PageHeader from "../../components/PageHeader";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getUsers, getChatHistory, getChatMessages } from "../../services/api";
import { connectSocket } from "../../services/socket";
import { API_CONFIG } from '../../config/api-config';
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../utils/translations";

export default function Dashboard() {
  const { theme, setTheme, themes } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalDatabases, setTotalDatabases] = useState(0);
  const [chartFilter, setChartFilter] = useState("monthly");
  const [userChartFilter, setUserChartFilter] = useState("monthly");
  const [errorCount, setErrorCount] = useState(0);
  const [topQuestions, setTopQuestions] = useState([]);
  const [todayChats, setTodayChats] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyUsersData, setWeeklyUsersData] = useState([]);
  const [monthlyUsersData, setMonthlyUsersData] = useState([]);
  const [yearlyUsersData, setYearlyUsersData] = useState([]);

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalDatabases();
    fetchChatData();
    fetchAndAnalyzeChats();

    // Setup WebSocket untuk real-time updates
    const socket = connectSocket();
    
    socket.on('user_added', () => {
      console.log('📊 Dashboard: User added, refreshing...');
      fetchTotalUsers();
    });
    
    socket.on('user_updated', () => {
      fetchTotalUsers();
    });
    
    socket.on('user_deleted', () => {
      fetchTotalUsers();
    });
    
    socket.on('user_status_changed', () => {
      fetchTotalUsers();
    });
    
    socket.on('new_chat', () => {
      console.log('📊 Dashboard: New chat, refreshing...');
      fetchChatData();
      fetchAndAnalyzeChats();
    });
    
    socket.on('new_message', () => {
      console.log('📊 Dashboard: New message, refreshing...');
      fetchChatData();
      fetchAndAnalyzeChats();
    });

    return () => {
      socket.off('user_added');
      socket.off('user_updated');
      socket.off('user_deleted');
      socket.off('user_status_changed');
      socket.off('new_chat');
      socket.off('new_message');
    };
  }, []);

  // Refresh data when language changes
  useEffect(() => {
    fetchTotalUsers();
    fetchChatData();
  }, [language]);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSettings && !event.target.closest('.settings-dropdown')) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  const fetchAndAnalyzeChats = async () => {
    try {
      const allChats = await getChatHistory();
      if (allChats && allChats.length > 0) {
        await analyzeFrequentQuestions(allChats);
        await calculateTodayChats(allChats);
      }
    } catch (error) {
      console.error('Error fetching and analyzing chats:', error);
    }
  };

  const analyzeFrequentQuestions = async (allChats) => {
    const questionCount = {};
    
    for (const chat of allChats) {
      try {
        const messages = await getChatMessages(chat.id);
        const userMessages = messages.filter(msg => msg.peran === 'user');
        
        userMessages.forEach(msg => {
          const content = msg.konten.toLowerCase().trim();
          if (content) {
            questionCount[content] = (questionCount[content] || 0) + 1;
          }
        });
      } catch (error) {
        console.error(`Error fetching messages for chat ${chat.id}:`, error);
      }
    }
    
    const sortedQuestions = Object.entries(questionCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([question, count]) => ({
        name: question,
        value: count,
        color: "#1e40af"
      }));
    
    if (sortedQuestions.length > 0) {
      setTopQuestions(sortedQuestions);
    } else {
      setTopQuestions([{ name: "Belum ada data", value: 0, color: "#1e40af" }]);
    }
  };

  const calculateTodayChats = async (allChats) => {
    const today = new Date();
    const todayStr = today.toDateString();
    let todayMessagesCount = 0;
    
    for (const chat of allChats) {
      try {
        const messages = await getChatMessages(chat.id);
        const todayMessages = messages.filter(message => {
          const messageDate = new Date(message.dibuat_pada);
          return messageDate.toDateString() === todayStr;
        });
        todayMessagesCount += todayMessages.length;
      } catch (error) {
        console.error(`Error fetching messages for chat ${chat.id}:`, error);
      }
    }
    
    setTodayChats(todayMessagesCount);
  };

  const fetchChatData = async () => {
    try {
      const data = await getChatHistory();
      if (data && data.length > 0) {
        const weekly = await calculateWeeklyChatData(data);
        const monthly = await calculateMonthlyChatData(data);
        setWeeklyData(weekly);
        setMonthlyData(monthly);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  const calculateWeeklyChatData = async (chats) => {
    const days = language === 'id' ? ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = Array(7).fill(0);
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    // Hitung total pesan dari semua chat
    for (const chat of chats) {
      try {
        const messages = await getChatMessages(chat.id);
        messages.forEach(message => {
          const messageDate = new Date(message.dibuat_pada);
          if (messageDate >= startOfWeek && messageDate <= today) {
            const dayIndex = messageDate.getDay();
            counts[dayIndex]++;
          }
        });
      } catch (error) {
        console.error(`Error fetching messages for chat ${chat.id}:`, error);
      }
    }

    return days.map((name, index) => ({ name, chats: counts[index] }));
  };

  const calculateMonthlyChatData = async (chats) => {
    const months = language === 'id' ? ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts = Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    // Hitung total pesan dari semua chat
    for (const chat of chats) {
      try {
        const messages = await getChatMessages(chat.id);
        messages.forEach(message => {
          const messageDate = new Date(message.dibuat_pada);
          if (messageDate.getFullYear() === currentYear) {
            const monthIndex = messageDate.getMonth();
            counts[monthIndex]++;
          }
        });
      } catch (error) {
        console.error(`Error fetching messages for chat ${chat.id}:`, error);
      }
    }

    return months.map((name, index) => ({ name, chats: counts[index] }));
  };

  const fetchTotalDatabases = async () => {
    try {
      const res = await fetch(`${API_CONFIG.BACKEND_URL}/api/databases`);
      const data = await res.json();
      if (data.success) {
        setTotalDatabases(data.databases.length);
      }
    } catch (error) {
      console.error('Error fetching databases:', error);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const data = await getUsers();
      if (data.success) {
        setTotalUsers(data.users.length);
        const activeUsers = data.users.filter((user) => user.status === "active");
        setActiveUsers(activeUsers.length);
        
        // Hitung data user per periode
        calculateUserData(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const calculateUserData = (users) => {
    // Mingguan
    const days = language === 'id' ? ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weeklyCounts = Array(7).fill(0);
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    users.forEach(user => {
      const userDate = new Date(user.dibuat_pada);
      if (userDate >= startOfWeek && userDate <= today) {
        const dayIndex = userDate.getDay();
        weeklyCounts[dayIndex]++;
      }
    });
    setWeeklyUsersData(days.map((name, index) => ({ name, users: weeklyCounts[index] })));

    // Bulanan
    const months = language === 'id' ? ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyCounts = Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    users.forEach(user => {
      const userDate = new Date(user.dibuat_pada);
      if (userDate.getFullYear() === currentYear) {
        const monthIndex = userDate.getMonth();
        monthlyCounts[monthIndex]++;
      }
    });
    setMonthlyUsersData(months.map((name, index) => ({ name, users: monthlyCounts[index] })));

    // Tahunan (2026-2031)
    const yearCounts = {};
    users.forEach(user => {
      const year = new Date(user.dibuat_pada).getFullYear();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });
    
    const years = [2026, 2027, 2028, 2029, 2030, 2031];
    setYearlyUsersData(years.map(year => ({ name: year.toString(), users: yearCounts[year] || 0 })));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 overflow-x-hidden">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{t(language, 'dashboard.title')}</h1>
          </div>
          
          {/* Settings Button */}
          <div className="relative settings-dropdown flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'default' ? 'glass_light' : 'default')}
              className="p-3 hover:bg-gray-100 rounded-xl transition-all"
              title={theme === 'default' ? t(language, 'settings.enableDarkMode') : t(language, 'settings.enableLightMode')}
            >
              {theme === 'default' ? (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 hover:bg-gray-100 rounded-xl transition-all"
              title={t(language, 'settings.changeLanguage')}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </button>

            {/* Language Dropdown */}
            {showSettings && (
              <div className="absolute right-0 mt-2 top-full w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50">
                <h3 className="text-lg font-bold text-gray-800 mb-4">{t(language, 'settings.language')}</h3>
                
                <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                  <span className="text-sm font-medium text-gray-700">Indonesia</span>
                  <button
                    onClick={toggleLanguage}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      language === 'en' ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        language === 'en' ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-sm font-medium text-gray-700">English</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Stat
            title={t(language, 'dashboard.totalUsers')}
            value={totalUsers.toString()}
            change="+0%"
            icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            color="blue"
          />
          <Stat
            title={t(language, 'dashboard.todayChats')}
            value={todayChats.toString()}
            change="+0%"
            icon="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            color="green"
          />
          <Stat
            title={t(language, 'dashboard.activeUsers')}
            value={activeUsers.toString()}
            change="+5%"
            icon="M12 3c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 14c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5z"
            color="purple"
          />
          <Stat
            title={t(language, 'dashboard.totalDatabases')}
            value={totalDatabases.toString()}
            change="+0%"
            icon="M4 7v10c0 2.21 3.589 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.589 4 8 4s8-1.79 8-4M4 7c0-2.21 3.589-4 8-4s8 1.79 8 4m0 5c0 2.21-3.589 4-8 4s8-1.79 8-4"
            color="orange"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Bar Chart - Pengguna Baru Bulanan */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">{t(language, 'dashboard.users')}</h3>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setUserChartFilter("weekly")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    userChartFilter === "weekly"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t(language, 'dashboard.weekly')}
                </button>
                <button
                  onClick={() => setUserChartFilter("monthly")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    userChartFilter === "monthly"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t(language, 'dashboard.monthly')}
                </button>
                <button
                  onClick={() => setUserChartFilter("yearly")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    userChartFilter === "yearly"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t(language, 'dashboard.yearly')}
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <BarChart
                data={
                  userChartFilter === "weekly"
                    ? weeklyUsersData
                    : userChartFilter === "yearly"
                      ? yearlyUsersData
                      : monthlyUsersData
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top 5 Chat List */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{t(language, 'dashboard.topChatTrends')}</h3>
            <div className="space-y-3">
              {topQuestions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-blue-600">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  <span className="text-gray-900 font-bold">{item.value} {t(language, 'dashboard.times')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart - Tren Chat dengan Filter */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{t(language, 'dashboard.chats')}</h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setChartFilter("weekly")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  chartFilter === "weekly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t(language, 'dashboard.weekly')}
              </button>
              <button
                onClick={() => setChartFilter("monthly")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  chartFilter === "monthly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t(language, 'dashboard.monthly')}
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <LineChart data={chartFilter === "monthly" ? monthlyData : weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="chats" stroke="#1e40af" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}

function Stat({ title, value, change, icon, color }) {
  const colors = {
    blue: "bg-blue-800",
    green: "bg-green-600",
    purple: "bg-purple-600",
    red: "bg-red-600",
    orange: "bg-orange-600",
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{value}</p>
        </div>
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 ${colors[color]} rounded-xl flex items-center justify-center shadow-lg`}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </div>
  );
}
