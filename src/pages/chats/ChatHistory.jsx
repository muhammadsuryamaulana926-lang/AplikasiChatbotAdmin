import { useState, useEffect, useRef } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getChatHistory, getChatMessages } from "../../services/api";
import { connectSocket, disconnectSocket } from "../../services/socket";
import SearchBar from "../../components/SearchBar";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../utils/translations";

export default function ChatHistory() {
  const { language } = useLanguage();
  const [chatHistories, setChatHistories] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageSearchQuery, setMessageSearchQuery] = useState('');
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [socketStatus, setSocketStatus] = useState('connecting');
  const [connectionInfo, setConnectionInfo] = useState({ attempts: 0, lastConnected: null });
  const messagesEndRef = useRef(null);
  const selectedChatRef = useRef(null);
  
  // Update ref setiap kali selectedChat berubah
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // Find search results and update search index
  useEffect(() => {
    if (!messageSearchQuery) {
      setSearchResults([]);
      setCurrentSearchIndex(0);
      return;
    }

    const results = [];
    const query = messageSearchQuery.toLowerCase();
    
    messages.forEach((message, messageIndex) => {
      const content = message.konten.toLowerCase();
      let startIndex = 0;
      let matchIndex = content.indexOf(query, startIndex);
      let matchCount = 0;
      
      while (matchIndex !== -1) {
        results.push({ 
          messageIndex, 
          textIndex: matchIndex,
          matchCount: matchCount,
          id: `${messageIndex}-${matchCount}`
        });
        matchCount++;
        startIndex = matchIndex + 1;
        matchIndex = content.indexOf(query, startIndex);
      }
    });
    
    setSearchResults(results);
    setCurrentSearchIndex(0);
    
    // Auto scroll to first result
    if (results.length > 0) {
      setTimeout(() => {
        const messageElement = document.getElementById(`message-${results[0].messageIndex}`);
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [messageSearchQuery, messages]);

  // Navigate to search result
  const navigateToSearchResult = (direction) => {
    if (searchResults.length === 0) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = currentSearchIndex >= searchResults.length - 1 ? 0 : currentSearchIndex + 1;
    } else {
      newIndex = currentSearchIndex <= 0 ? searchResults.length - 1 : currentSearchIndex - 1;
    }
    
    setCurrentSearchIndex(newIndex);
    
    // Scroll to the message with delay to ensure DOM is updated
    setTimeout(() => {
      const messageElement = document.getElementById(`message-${searchResults[newIndex].messageIndex}`);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  // Analisis pertanyaan berdasarkan semua pesan dalam chat history
  const analyzeFrequentQuestions = async (allChats) => {
    console.log('🔍 Starting analysis with', allChats.length, 'chats');
    const questionCount = {};
    
    // Ambil semua pesan dari setiap chat
    for (const chat of allChats) {
      try {
        const messages = await getChatMessages(chat.id);
        const userMessages = messages.filter(msg => msg.peran === 'user');
        
        console.log(`📝 Chat "${chat.title}": ${userMessages.length} user messages`);
        
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
    
    console.log('📊 Question counts:', questionCount);
    
    // Sort dan ambil top 5
    const sortedQuestions = Object.entries(questionCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([question, count], index) => ({
        rank: index + 1,
        question,
        count
      }));
    
    console.log('🏆 Top 5 questions:', sortedQuestions);
    
    // Data sudah tersimpan di backend, tidak perlu localStorage
    console.log('✅ Analysis completed');
    
    return sortedQuestions;
  };

  // Hitung pesan hari ini dari semua chat (termasuk chat lama yang dilanjutkan)
  const calculateTodayChats = async (allChats) => {
    const today = new Date();
    const todayStr = today.toDateString();
    let todayMessagesCount = 0;
    
    // Ambil semua pesan dari setiap chat dan hitung yang hari ini
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
    
    console.log('📅 Messages sent today:', todayMessagesCount);
    // Data sudah tersimpan di backend, tidak perlu localStorage
    return todayMessagesCount;
  };

  useEffect(() => {
    fetchChatHistories();
    
    // TIDAK ADA AUTO REFRESH - hanya socket yang update
    // const refreshInterval = setInterval(() => {
    //   fetchChatHistories();
    // }, 5000);
    
    // Setup socket dengan aggressive reconnection
    const socketInstance = connectSocket();
    let reconnectAttempts = 0;
    let reconnectTimer = null;

    const handleConnect = () => {
      console.log('✅ ChatHistory: Socket connected successfully');
      console.log('🔌 Socket ID:', socketInstance.id);
      setSocketStatus('connected');
      setConnectionInfo(prev => ({ 
        ...prev, 
        attempts: 0, 
        lastConnected: new Date().toISOString() 
      }));
      reconnectAttempts = 0;
      
      // Clear any pending reconnect timer
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    const handleDisconnect = (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setSocketStatus('disconnected');
      
      // Immediate reconnection for network issues
      if (reason === 'transport close' || reason === 'transport error') {
        setSocketStatus('reconnecting');
        reconnectTimer = setTimeout(() => {
          if (!socketInstance.connected) {
            socketInstance.connect();
          }
        }, 1000);
      }
    };

    const handleReconnect = () => {
      console.log('🔄 Socket reconnected, re-attaching listeners...');
      setSocketStatus('connected');
      reconnectAttempts = 0;
      
      // Re-attach event listeners setelah reconnect
      socketInstance.off('new_chat');
      socketInstance.off('new_message');
      
      socketInstance.on('new_chat', handleNewChat);
      socketInstance.on('new_message', handleNewMessage);
    };

    const handleReconnectAttempt = () => {
      reconnectAttempts++;
      console.log(`🔄 Reconnection attempt ${reconnectAttempts}`);
      setSocketStatus('reconnecting');
      setConnectionInfo(prev => ({ 
        ...prev, 
        attempts: reconnectAttempts 
      }));
    };

    socketInstance.on('connect', handleConnect);
    socketInstance.on('disconnect', handleDisconnect);
    socketInstance.on('reconnect', handleReconnect);
    socketInstance.on('reconnect_attempt', handleReconnectAttempt);

    // Define handlers sebagai named functions agar bisa di-reattach
    const handleNewChat = (newChat) => {
      console.log('📨 ChatHistory: new_chat event received:', newChat);
      setChatHistories(prev => {
        // Cek duplikat
        if (prev.find(c => c.id === newChat.id)) {
          console.log('⚠️ Duplicate chat, skipping...');
          return prev;
        }
        console.log('✅ Adding new chat to list');
        const updatedChats = [newChat, ...prev];
        // Analisis ulang dengan data terbaru (async)
        analyzeFrequentQuestions(updatedChats).catch(console.error);
        return updatedChats;
      });
    };

    const handleNewMessage = (newMessage) => {
      console.log('💬 ChatHistory: new_message event received:', newMessage);
      
      // Update messages jika chat sedang aktif (gunakan ref untuk nilai terbaru)
      setMessages(prev => {
        // Cek apakah message sudah ada untuk menghindari duplikat
        const messageExists = prev.some(msg => msg.id === newMessage.id);
        const currentSelected = selectedChatRef.current;
        
        console.log('🔍 Current selected chat:', currentSelected?.id);
        console.log('🔍 Message for chat:', newMessage.chat_history_id);
        console.log('🔍 Message exists:', messageExists);
        
        if (!messageExists && currentSelected && newMessage.chat_history_id === currentSelected.id) {
          console.log('✅ Adding message to current chat');
          return [...prev, newMessage];
        }
        console.log('⏭️ Skipping message (not for current chat or duplicate)');
        return prev;
      });
      
      // Update chat histories untuk menampilkan chat terbaru di atas
      setChatHistories(prev => {
        const updatedChats = prev.map(chat => {
          if (chat.id === newMessage.chat_history_id) {
            console.log('🔄 Updating chat timestamp for chat:', chat.id);
            return { ...chat, diperbarui_pada: new Date().toISOString() };
          }
          return chat;
        });
        
        // Sort berdasarkan diperbarui_pada terbaru
        return updatedChats.sort((a, b) => 
          new Date(b.diperbarui_pada || b.dibuat_pada) - new Date(a.diperbarui_pada || a.dibuat_pada)
        );
      });
    };

    socketInstance.on('new_chat', handleNewChat);
    socketInstance.on('new_message', handleNewMessage);

    return () => {
      // clearInterval(refreshInterval); // Tidak ada interval lagi
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      
      socketInstance.off('connect', handleConnect);
      socketInstance.off('disconnect', handleDisconnect);
      socketInstance.off('reconnect', handleReconnect);
      socketInstance.off('reconnect_attempt', handleReconnectAttempt);
      socketInstance.off('new_chat');
      socketInstance.off('new_message');
      // JANGAN disconnect socket karena masih digunakan komponen lain
    };
  }, []);

  // Auto scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchChatHistories = async () => {
    console.log('🚀 Starting fetchChatHistories...');
    try {
      const data = await getChatHistory();
      console.log('📊 Received chat data:', data.length, 'chats');
      
      // Simpan ID chat yang sedang dipilih
      const currentSelectedId = selectedChat?.id;
      
      setChatHistories(data);
      
      // Analisis pertanyaan dari data aktual
      console.log('🔍 About to analyze questions...');
      try {
        await analyzeFrequentQuestions(data);
        
        // Hitung pesan hari ini
        const todayChats = await calculateTodayChats(data);
        console.log('📅 Today messages:', todayChats);
        
        console.log('✅ Analysis completed successfully');
      } catch (analysisError) {
        console.error('❌ Analysis failed:', analysisError);
      }
      
      // Jika ada chat yang sedang dipilih, pertahankan pilihan tersebut (JANGAN fetch messages lagi)
      if (currentSelectedId) {
        const stillExists = data.find(chat => chat.id === currentSelectedId);
        if (stillExists) {
          setSelectedChat(stillExists);
        }
      } else if (data.length > 0 && !currentSelectedId) {
        // Hanya set ke chat pertama jika belum ada yang dipilih sama sekali
        setSelectedChat(data[0]);
        fetchMessages(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching chat histories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatHistoryId) => {
    try {
      const data = await getChatMessages(chatHistoryId);
      setMessages(data);
      
      // Deteksi error dari AI (data sudah di backend)
      const errorMessages = data.filter(msg => 
        msg.peran === 'assistant' && (
          msg.konten.toLowerCase().includes('error') ||
          msg.konten.toLowerCase().includes('maaf') ||
          msg.konten.toLowerCase().includes('tidak dapat') ||
          msg.konten.toLowerCase().includes('gagal')
        )
      );
      
      if (errorMessages.length > 0) {
        console.log('⚠️ Found error messages:', errorMessages.length);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setMessageSearchQuery(''); // Clear message search when switching chats
    setSearchResults([]);
    setCurrentSearchIndex(0);
    fetchMessages(chat.id);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Highlight search terms in text with current result highlighting
  const highlightSearchTerm = (text, searchTerm, messageIndex) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    let matchCountInThisMessage = 0;
    
    return parts.map((part, index) => {
      if (regex.test(part)) {
        const currentResult = searchResults[currentSearchIndex];
        const isCurrentMatch = currentResult && 
                              currentResult.messageIndex === messageIndex && 
                              currentResult.matchCount === matchCountInThisMessage;
        
        matchCountInThisMessage++;
        
        return (
          <span 
            key={`highlight-${messageIndex}-${matchCountInThisMessage}-${index}`} 
            className={isCurrentMatch 
              ? "bg-yellow-400 text-black px-2 py-1 rounded font-bold shadow-lg border-2 border-orange-500" 
              : "bg-blue-200 text-blue-900 px-1 rounded"
            }
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Format message content dengan support markdown (bold, list, numbering, dll)
  const formatMessageContent = (content, searchTerm = '', messageIndex = 0) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    const elements = [];
    
    lines.forEach((line, lineIndex) => {
      // Skip empty lines
      if (!line.trim()) {
        elements.push(<br key={`br-${lineIndex}`} />);
        return;
      }
      
      // Check if line is a numbered list (1. 2. 3. etc)
      const numberedMatch = line.match(/^(\d+)\.\s*(.+)$/);
      if (numberedMatch) {
        const [, number, text] = numberedMatch;
        elements.push(
          <div key={lineIndex} className="flex gap-2 mb-2">
            <span className="font-bold text-blue-600 flex-shrink-0">{number}.</span>
            <span>{formatInlineMarkdown(text, searchTerm, messageIndex)}</span>
          </div>
        );
        return;
      }
      
      // Check if line is a bullet list (- or * or •)
      const bulletMatch = line.match(/^[\-\*•]\s*(.+)$/);
      if (bulletMatch) {
        elements.push(
          <div key={lineIndex} className="flex gap-2 mb-2">
            <span className="text-blue-600 flex-shrink-0">•</span>
            <span>{formatInlineMarkdown(bulletMatch[1], searchTerm, messageIndex)}</span>
          </div>
        );
        return;
      }
      
      // Regular line with inline markdown
      elements.push(
        <div key={lineIndex} className="mb-2">
          {formatInlineMarkdown(line, searchTerm, messageIndex)}
        </div>
      );
    });
    
    return <div className="space-y-1">{elements}</div>;
  };
  
  // Format inline markdown (bold **text**) with search highlighting
  const formatInlineMarkdown = (text, searchTerm = '', messageIndex = 0) => {
    // Detect markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    if (linkRegex.test(text)) {
      const parts = [];
      let lastIndex = 0;
      const matches = text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
      
      for (const match of matches) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        const linkText = match[1];
        const linkUrl = match[2];
        parts.push(
          <a
            key={`link-${messageIndex}-${match.index}`}
            href={linkUrl}
            download
            className="text-blue-600 hover:text-blue-800 underline font-medium inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }
      
      return parts;
    }
    
    const parts = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.+?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index);
        parts.push(highlightSearchTerm(beforeText, searchTerm, messageIndex));
      }
      // Add bold text with highlighting
      parts.push(
        <strong key={`bold-${match.index}`} className="font-bold">
          {highlightSearchTerm(match[1], searchTerm, messageIndex)}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      parts.push(highlightSearchTerm(remainingText, searchTerm, messageIndex));
    }
    
    return parts.length > 0 ? parts : highlightSearchTerm(text, searchTerm, messageIndex);
  };

  const filteredChatHistories = chatHistories.filter(chat => {
    const query = searchQuery.toLowerCase();
    return (
      chat.user_email.toLowerCase().includes(query) ||
      chat.judul.toLowerCase().includes(query) ||
      new Date(chat.dibuat_pada).toLocaleDateString('id-ID').includes(query)
    );
  });

  // Filter messages based on search query
  const filteredMessages = messages.filter(message => {
    if (!messageSearchQuery) return true;
    const query = messageSearchQuery.toLowerCase();
    return message.konten.toLowerCase().includes(query);
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <img 
              src="/Gemini_Generated_Image_y8ny9ry8ny9ry8ny__1_-removebg-preview.png" 
              alt="Loading" 
              className="w-32 h-32 mx-auto animate-bounce mb-4"
            />
            <p className="text-gray-600 text-lg font-medium">{t(language, 'chats.loading')}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 overflow-x-hidden">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{t(language, 'chats.title')}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-auto lg:h-[82vh]">

        {/* ===== LIST CHAT HISTORY ===== */}
        <div className="lg:col-span-4 bg-white rounded-2xl shadow border flex flex-col h-[50vh] lg:h-[82vh]">
          <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{t(language, 'chats.title')}</h2>
              <p className="text-sm text-gray-500">{t(language, 'chats.selectChat')}</p>
            </div>
            <div className="ml-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t(language, 'chats.search')}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredChatHistories.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery ? t(language, 'chats.noResults') : t(language, 'chats.noChats')}
              </div>
            ) : (
              filteredChatHistories.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatSelect(chat)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                    selectedChat?.id === chat.id ? "bg-blue-50" : ""
                  }`}
                >
                  <p className="font-semibold text-gray-800">{chat.user_email}</p>
                  <p className="text-sm text-gray-600 font-medium">{chat.judul}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(chat.dibuat_pada).toLocaleDateString('id-ID')}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ===== DETAIL CHAT ===== */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow border flex flex-col h-[50vh] lg:h-[82vh]">

          {/* HEADER */}
          <div className="p-4 border-b flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                {selectedChat ? (
                  <>
                    <h2 className="font-bold text-gray-800">{selectedChat.user_email}</h2>
                    <p className="text-sm text-gray-600">{selectedChat.judul}</p>
                  </>
                ) : (
                  <h2 className="font-bold text-gray-800">{t(language, 'chats.selectChatPrompt')}</h2>
                )}
              </div>
              {selectedChat && (
                <div className="ml-4 flex items-center gap-2">
                  <SearchBar
                    value={messageSearchQuery}
                    onChange={setMessageSearchQuery}
                    placeholder="Cari dalam pesan..."
                  />
                  {searchResults.length > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {currentSearchIndex + 1}/{searchResults.length}
                      </span>
                      <button
                        onClick={() => navigateToSearchResult('prev')}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Hasil sebelumnya"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigateToSearchResult('next')}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Hasil berikutnya"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white min-h-0 rounded-b-2xl">
            {!selectedChat ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg font-medium">{t(language, 'chats.selectChatMessage')}</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg font-medium">{t(language, 'chats.noMessages')}</p>
                <p className="text-gray-300 text-sm mt-1">{t(language, 'chats.noMessagesDetail')}</p>
              </div>
            ) : filteredMessages.length === 0 && messageSearchQuery ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg font-medium">Tidak ada pesan yang ditemukan</p>
                <p className="text-gray-300 text-sm mt-1">Coba kata kunci yang berbeda</p>
              </div>
            ) : (
              filteredMessages.map((message, index) => (
                <div
                  key={message.id}
                  id={`message-${index}`}
                  className={`flex items-end mb-3 ${
                    message.peran === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Bot Avatar */}
                  {message.peran === "assistant" && (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2 mb-1 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H1V9H3V15H1V17H3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V17H23V15H21V9H23ZM19 21H5V3H14.17L19 7.83V21Z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
                      message.peran === "user"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    <div className="text-sm leading-relaxed">{formatMessageContent(message.konten, messageSearchQuery, index)}</div>
                    <p className={`text-xs mt-2 ${
                      message.peran === "user" ? "text-blue-100" : "text-gray-500"
                    }`}>
                      {formatTime(message.dibuat_pada)}
                    </p>
                  </div>

                  {/* User Avatar */}
                  {message.peran === "user" && (
                    <div className="w-8 h-8 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center ml-2 mb-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        </div>
      </div>
    </AdminLayout>
  );
}
