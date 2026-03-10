import { useState, useRef, useEffect } from 'react';
import chatbotService from '../services/chatbotService';
import { useChatbot } from '../layouts/AdminLayout';
import { useTheme } from '../contexts/ThemeContext';

export default function ChatbotWidget() {
  const { setChatbotOpen } = useChatbot();
  const { theme: adminTheme, setTheme: setAdminTheme, themes: adminThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatbot_messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('chatbot_theme') || 'modern');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [chatSessions, setChatSessions] = useState(() => {
    const saved = localStorage.getItem('chat_sessions');
    return []; // Nonaktifkan riwayat sementara
  });
  const [currentSessionId, setCurrentSessionId] = useState(() => {
    return localStorage.getItem('current_session_id') || Date.now().toString();
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize audio on first user interaction (iOS compatibility)
  useEffect(() => {
    const initAudio = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio('/bubble-sound.mp3');
        audioRef.current.volume = 0.9;
        audioRef.current.load();
      }
    };
    
    // Initialize on any user interaction
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'id-ID';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        // Auto send after voice input
        setTimeout(() => {
          if (transcript.trim()) {
            handleSendMessage();
          }
        }, 100);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert('Browser Anda tidak mendukung voice input. Gunakan Chrome/Edge.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Play bubble sound function
  const playBubbleSound = () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/bubble-sound.mp3');
        audioRef.current.volume = 0.9;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.log('🔇 Audio tidak bisa diputar (mungkin iOS/browser policy):', err.message);
      });
    } catch (error) {
      console.log('🔇 Audio error:', error.message);
    }
  };

  const themes = {
    modern: {
      name: 'Modern',
      chatButton: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      header: 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600',
      messagesBg: 'bg-gradient-to-b from-gray-50 to-white',
      userMsg: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none',
      botMsg: 'bg-white text-gray-800 rounded-bl-none border border-gray-100',
      inputBorder: 'border-gray-200 focus:ring-blue-500 focus:border-blue-500',
      sendButton: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      sendIcon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />,
      rounded: 'rounded-2xl',
      textColor: 'text-white',
      bg: 'bg-white',
      border: 'border-blue-100'
    },
    dark: {
      name: 'Dark',
      chatButton: 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black',
      header: 'bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800',
      messagesBg: 'bg-gradient-to-b from-gray-900 to-gray-800',
      userMsg: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none',
      botMsg: 'bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600',
      inputBorder: 'border-gray-600 focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white',
      sendButton: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      sendIcon: <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />,
      rounded: 'rounded-2xl',
      textColor: 'text-white',
      bg: 'bg-gray-800',
      border: 'border-gray-700',
      dotColor: 'bg-purple-400'
    },
    minimal: {
      name: 'Minimal',
      chatButton: 'bg-white hover:bg-gray-50 border-2 border-gray-300',
      header: 'bg-white border-b-2 border-gray-200',
      messagesBg: 'bg-white',
      userMsg: 'bg-gray-900 text-white rounded-none',
      botMsg: 'bg-gray-100 text-gray-900 rounded-none border-l-4 border-gray-900',
      inputBorder: 'border-2 border-gray-900 focus:ring-0 focus:border-gray-900',
      sendButton: 'bg-gray-900 hover:bg-gray-800',
      sendIcon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />,
      rounded: 'rounded-lg',
      textColor: 'text-gray-900',
      bg: 'bg-white',
      border: 'border-blue-100'
    },
    pink: {
      name: 'Pink Cute',
      chatButton: 'bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500',
      header: 'bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300',
      messagesBg: 'bg-gradient-to-b from-pink-50 to-pink-100',
      userMsg: 'bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-br-none',
      botMsg: 'bg-white text-pink-900 rounded-bl-none border-2 border-pink-200',
      inputBorder: 'border-pink-300 focus:ring-pink-400 focus:border-pink-400 bg-pink-50',
      sendButton: 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500',
      sendIcon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
      rounded: 'rounded-3xl',
      textColor: 'text-white',
      bg: 'bg-pink-50',
      border: 'border-pink-300',
      dotColor: 'bg-pink-400',
      inputBg: 'bg-pink-50 border-pink-200'
    },
    spongebob: {
      name: 'SpongeBob',
      chatButton: 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 border-4 border-yellow-600',
      header: 'bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 border-b-4 border-blue-600',
      messagesBg: 'bg-gradient-to-b from-cyan-100 to-blue-200',
      userMsg: 'bg-yellow-400 text-yellow-900 rounded-br-none border-4 border-yellow-600 font-bold',
      botMsg: 'bg-pink-300 text-pink-900 rounded-bl-none border-4 border-pink-500 font-bold',
      inputBorder: 'border-4 border-blue-500 focus:ring-yellow-400 focus:border-yellow-400 bg-white font-bold',
      sendButton: 'bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 border-4 border-red-600',
      sendIcon: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></>,
      rounded: 'rounded-xl',
      textColor: 'text-blue-900',
      bg: 'bg-cyan-100',
      border: 'border-4 border-blue-600',
      dotColor: 'bg-yellow-400',
      inputBg: 'bg-cyan-100 border-blue-500 border-t-4'
    }
  };

  const currentTheme = themes[theme];

  const placeholders = [
    'Berapa pengguna aktif?',
    'Total database?',
    'Chat hari ini?',
    'Gimana cara tambah user?',
    'Cara import database?'
  ];

  // Auto-save theme
  useEffect(() => {
    localStorage.setItem('chatbot_theme', theme);
  }, [theme]);

  // Text-to-Speech function
  const speakText = (text, messageId) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      // Remove markdown and code blocks for cleaner speech
      const cleanText = text
        .replace(/```[\s\S]*?```/g, 'kode program')
        .replace(/`[^`]+`/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/[#*_~`]/g, '')
        .replace(/\n+/g, '. ');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      utterance.onstart = () => setSpeakingMessageId(messageId);
      utterance.onend = () => setSpeakingMessageId(null);
      utterance.onerror = () => setSpeakingMessageId(null);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setShowThemeMenu(false);
  };

  const handleDeleteSelected = () => {
    setMessages(messages.filter(msg => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
    setIsDeleteMode(false);
  };

  const handleDeleteAll = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAll = () => {
    setMessages([]);
    setSelectedMessages([]);
    setIsDeleteMode(false);
    setShowDeleteModal(false);
  };

  const toggleMessageSelection = (id) => {
    setSelectedMessages(prev => 
      prev.includes(id) ? prev.filter(msgId => msgId !== id) : [...prev, id]
    );
  };

  // Animasi ketikan placeholder
  useEffect(() => {
    const currentText = placeholders[placeholderIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentText.length) {
          setTypedText(currentText.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, placeholderIndex]);

  // Auto-scroll saat chat dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => scrollToBottom(), 100);
      setChatbotOpen(true);
    } else {
      setChatbotOpen(false);
    }
  }, [isOpen, setChatbotOpen]);

  // Auto-save messages ke localStorage
  useEffect(() => {
    localStorage.setItem('chatbot_messages', JSON.stringify(messages));
  }, [messages]);

  // Save chat session when new message arrives
  useEffect(() => {
    if (messages.length > 0) {
      saveChatSession();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Nonaktifkan penyimpanan session sementara
  const saveChatSession = () => {
    return;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      console.log('📤 Sending message:', currentInput);
      const response = await chatbotService.sendMessage(currentInput);
      console.log('📥 Received response:', response);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response || 'Maaf, saya tidak dapat memproses pertanyaan Anda.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
      playBubbleSound();
    } catch (error) {
      console.error('❌ Chat Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: `Error: ${error.message}. Cek console (F12) untuk detail.`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
      playBubbleSound();
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Copy code to clipboard
  const copyToClipboard = (code, index) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(index);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  // Format message content dengan support markdown dan code blocks
  const formatMessageContent = (content) => {
    if (!content) return null;
    
    const elements = [];
    let inCodeBlock = false;
    let codeLines = [];
    let codeLanguage = '';
    
    const lines = content.split('\n');
    
    lines.forEach((line, lineIndex) => {
      // Detect markdown links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      if (linkRegex.test(line) && !line.includes('```')) {
        const parts = [];
        let lastIndex = 0;
        const matches = line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
        
        for (const match of matches) {
          if (match.index > lastIndex) {
            parts.push(line.substring(lastIndex, match.index));
          }
          const linkText = match[1];
          const linkUrl = match[2];
          parts.push(
            <a
              key={`link-${lineIndex}-${match.index}`}
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
        
        if (lastIndex < line.length) {
          parts.push(line.substring(lastIndex));
        }
        
        elements.push(
          <div key={lineIndex} className="mb-2">
            {parts}
          </div>
        );
        return;
      }
      
      // Detect code block start
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start code block
          inCodeBlock = true;
          codeLanguage = line.trim().substring(3).trim();
          codeLines = [];
        } else {
          // End code block
          inCodeBlock = false;
          const codeContent = codeLines.join('\n');
          const codeIndex = lineIndex;
          elements.push(
            <div key={`code-${lineIndex}`} className="my-3">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 relative group">
                <div className="bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700 flex items-center justify-between">
                  <span>{codeLanguage || 'code'}</span>
                  <button
                    onClick={() => copyToClipboard(codeContent, codeIndex)}
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                    title="Salin code"
                  >
                    {copiedCode === codeIndex ? (
                      <>
                        <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-400">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 overflow-x-auto">
                  <code className="text-sm" style={{ fontFamily: 'Consolas, Monaco, monospace' }}>
                    {highlightCode(codeContent, codeLanguage)}
                  </code>
                </pre>
              </div>
            </div>
          );
          codeLanguage = '';
        }
        return;
      }
      
      // Inside code block
      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }
      
      // Inline code
      if (line.includes('`') && !line.includes('```')) {
        const parts = line.split('`');
        const formatted = parts.map((part, i) => 
          i % 2 === 0 ? formatInlineMarkdown(part) : (
            <code key={i} className="bg-gray-800 text-pink-400 px-1.5 py-0.5 rounded text-xs" style={{ fontFamily: 'Consolas, Monaco, monospace' }}>
              {part}
            </code>
          )
        );
        elements.push(
          <div key={lineIndex} className="mb-2">
            {formatted}
          </div>
        );
        return;
      }
      
      if (!line.trim()) {
        elements.push(<br key={`br-${lineIndex}`} />);
        return;
      }
      
      // Numbered list
      const numberedMatch = line.match(/^(\d+)\.\s*(.+)$/);
      if (numberedMatch) {
        const [, number, text] = numberedMatch;
        elements.push(
          <div key={lineIndex} className="flex gap-2 mb-2">
            <span className="font-bold text-blue-600 flex-shrink-0">{number}.</span>
            <span>{formatInlineMarkdown(text)}</span>
          </div>
        );
        return;
      }
      
      // Bullet list
      const bulletMatch = line.match(/^[\-\*•]\s*(.+)$/);
      if (bulletMatch) {
        elements.push(
          <div key={lineIndex} className="flex gap-2 mb-2">
            <span className="text-blue-600 flex-shrink-0">•</span>
            <span>{formatInlineMarkdown(bulletMatch[1])}</span>
          </div>
        );
        return;
      }
      
      // Regular line
      elements.push(
        <div key={lineIndex} className="mb-2">
          {formatInlineMarkdown(line)}
        </div>
      );
    });
    
    return <div className="space-y-1">{elements}</div>;
  };
  
  // Syntax highlighting untuk code
  const highlightCode = (code, language) => {
    const lines = code.split('\n');
    const lang = language.toLowerCase();
    
    return lines.map((line, i) => {
      let highlighted = line;
      
      // Escape HTML entities first
      highlighted = highlighted
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      // HTML/XML
      if (lang === 'html' || lang === 'xml' || lang === 'jsx' || lang === 'tsx') {
        highlighted = highlighted
          // HTML Tags
          .replace(/(&lt;\/?)(\w+)([^&]*?)(&gt;)/g, 
            '<span style="color: #808080">$1</span><span style="color: #569CD6">$2</span><span style="color: #9CDCFE">$3</span><span style="color: #808080">$4</span>')
          // Attributes
          .replace(/(\w+)=/g, '<span style="color: #9CDCFE">$1</span>=')
          // Strings in quotes
          .replace(/=(&quot;|&#39;)(.*?)\1/g, '=<span style="color: #CE9178">$1$2$1</span>');
      }
      // CSS
      else if (lang === 'css' || lang === 'scss' || lang === 'sass') {
        highlighted = highlighted
          // Selectors
          .replace(/^([.#]?[\w-]+)\s*\{?/g, '<span style="color: #D7BA7D">$1</span>{')
          // Properties
          .replace(/([\w-]+):/g, '<span style="color: #9CDCFE">$1</span>:')
          // Values
          .replace(/:\s*([^;]+);/g, ': <span style="color: #CE9178">$1</span>;')
          // Units
          .replace(/(\d+)(px|em|rem|%|vh|vw)/g, '<span style="color: #B5CEA8">$1</span><span style="color: #569CD6">$2</span>');
      }
      // Python
      else if (lang === 'python' || lang === 'py') {
        highlighted = highlighted
          // Keywords
          .replace(/\b(def|class|import|from|if|elif|else|for|while|return|try|except|with|as|pass|break|continue|lambda|yield|async|await)\b/g, 
            '<span style="color: #569CD6">$1</span>')
          // Built-in functions
          .replace(/\b(print|len|range|str|int|float|list|dict|set|tuple|open|input)\b/g, 
            '<span style="color: #DCDCAA">$1</span>')
          // Strings
          .replace(/(&quot;|&#39;)(.*?)\1/g, '<span style="color: #CE9178">$1$2$1</span>')
          // Comments
          .replace(/(#.*$)/g, '<span style="color: #6A9955">$1</span>')
          // Numbers
          .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #B5CEA8">$1</span>');
      }
      // JSON
      else if (lang === 'json') {
        highlighted = highlighted
          // Keys
          .replace(/&quot;([^&]+)&quot;:/g, '<span style="color: #9CDCFE">&quot;$1&quot;</span>:')
          // String values
          .replace(/:\s*&quot;([^&]*)&quot;/g, ': <span style="color: #CE9178">&quot;$1&quot;</span>')
          // Numbers
          .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color: #B5CEA8">$1</span>')
          // Booleans
          .replace(/\b(true|false|null)\b/g, '<span style="color: #569CD6">$1</span>');
      }
      // SQL
      else if (lang === 'sql') {
        highlighted = highlighted
          // Keywords
          .replace(/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|NOT|IN|LIKE|ORDER BY|GROUP BY|HAVING|LIMIT|AS)\b/gi, 
            '<span style="color: #569CD6">$1</span>')
          // Functions
          .replace(/\b(COUNT|SUM|AVG|MAX|MIN|DISTINCT)\b/gi, 
            '<span style="color: #DCDCAA">$1</span>')
          // Strings
          .replace(/(&quot;|&#39;)(.*?)\1/g, '<span style="color: #CE9178">$1$2$1</span>')
          // Comments
          .replace(/(--.*$)/g, '<span style="color: #6A9955">$1</span>');
      }
      // Bash/Shell
      else if (lang === 'bash' || lang === 'sh' || lang === 'shell') {
        highlighted = highlighted
          // Commands
          .replace(/^(\w+)/g, '<span style="color: #DCDCAA">$1</span>')
          // Flags
          .replace(/\s(-{1,2}[\w-]+)/g, ' <span style="color: #9CDCFE">$1</span>')
          // Strings
          .replace(/(&quot;|&#39;)(.*?)\1/g, '<span style="color: #CE9178">$1$2$1</span>')
          // Comments
          .replace(/(#.*$)/g, '<span style="color: #6A9955">$1</span>')
          // Variables
          .replace(/(\$\w+)/g, '<span style="color: #9CDCFE">$1</span>');
      }
      // JavaScript/TypeScript (default)
      else {
        highlighted = highlighted
          // Keywords
          .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|new|this|super|extends|static|public|private|protected|interface|type|enum)\b/g, 
            '<span style="color: #C586C0">$1</span>')
          // Strings
          .replace(/(&quot;|&#39;|`)(.*?)\1/g, 
            '<span style="color: #CE9178">$1$2$1</span>')
          // Numbers
          .replace(/\b(\d+)\b/g, 
            '<span style="color: #B5CEA8">$1</span>')
          // Comments
          .replace(/(\/{2,}.*$)/g, 
            '<span style="color: #6A9955">$1</span>')
          // Functions
          .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, 
            '<span style="color: #DCDCAA">$1</span>(')
          // Properties
          .replace(/\.([a-zA-Z_][a-zA-Z0-9_]*)/g, 
            '.<span style="color: #9CDCFE">$1</span>');
      }
      
      return (
        <div key={i} dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} style={{ color: '#D4D4D4' }} />
      );
    });
  };
  
  // Format inline markdown (bold **text**)
  const formatInlineMarkdown = (text) => {
    const parts = [];
    let lastIndex = 0;
    const boldRegex = /\*\*(.+?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={`bold-${match.index}`} className="font-bold">
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideOutDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }
        
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: #3b82f6;
          margin-left: 2px;
          animation: blink 1s infinite;
        }
        
        .chat-button {
          animation: pulse 2s infinite;
        }
        
        .chat-window-enter {
          animation: slideInUp 0.3s ease-out;
        }
        
        .chat-window-exit {
          animation: slideOutDown 0.3s ease-in;
        }
        
        .message-enter {
          animation: messageSlideIn 0.3s ease-out;
        }
        
        @keyframes fallRose {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(220px) rotate(360deg); opacity: 0; }
        }
        .animate-fall-rose { animation: fallRose 4s ease-in infinite; }
        @keyframes drawCircle { to { stroke-dashoffset: 0; } }
        @keyframes drawSmile { to { stroke-dashoffset: 0; } }
        @keyframes drawStar { to { stroke-dashoffset: 0; } }
        @keyframes morphToMoon {
          0% { d: path('M100 20 L110 70 L160 80 L120 110 L130 160 L100 135 L70 160 L80 110 L40 80 L90 70 Z'); }
          100% { d: path('M100 30 Q130 30 145 55 Q160 80 160 100 Q160 120 145 145 Q130 170 100 170 Q85 170 75 160 Q65 150 60 135 Q70 120 80 110 Q90 100 80 90 Q70 80 60 65 Q65 50 75 40 Q85 30 100 30 Z'); }
        }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes drawHeart { to { stroke-dashoffset: 0; } }
        @keyframes drawSquare { to { stroke-dashoffset: 0; } }
        @keyframes drawRose { to { stroke-dashoffset: 0; } }
        @keyframes drawCake { to { stroke-dashoffset: 0; } }
        @keyframes fillRose { from { fill-opacity: 0; } to { fill-opacity: 1; } }
        @keyframes fillCake { from { fill-opacity: 0; } to { fill-opacity: 1; } }
        @keyframes flicker { 
          0%, 100% { transform: scale(1) translateY(0); opacity: 1; } 
          25% { transform: scale(1.15) translateY(-2px); opacity: 0.9; } 
          50% { transform: scale(0.95) translateY(1px); opacity: 0.85; } 
          75% { transform: scale(1.1) translateY(-1px); opacity: 0.95; } 
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sparkle { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } }
        @keyframes pop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        @keyframes write { from { width: 0; opacity: 0; } to { width: 100%; opacity: 1; } }
        
        @keyframes bounceIn {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.3) rotate(10deg); }
          70% { transform: scale(0.9) rotate(-5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        @keyframes rainbow {
          0% { color: #ef4444; }
          20% { color: #f59e0b; }
          40% { color: #10b981; }
          60% { color: #3b82f6; }
          80% { color: #8b5cf6; }
          100% { color: #ec4899; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes jello {
          0%, 100% { transform: skewX(0deg) skewY(0deg); }
          30% { transform: skewX(25deg) skewY(25deg); }
          40% { transform: skewX(-15deg) skewY(-15deg); }
          50% { transform: skewX(15deg) skewY(15deg); }
          65% { transform: skewX(-5deg) skewY(-5deg); }
          75% { transform: skewX(5deg) skewY(5deg); }
        }
        @keyframes moveDot1 {
          0% { cx: 40; cy: 60; opacity: 0; }
          20% { opacity: 1; }
          100% { cx: 70; cy: 80; opacity: 0; }
        }
        @keyframes moveDot2 {
          0% { cx: 160; cy: 60; opacity: 0; }
          20% { opacity: 1; }
          100% { cx: 130; cy: 80; opacity: 0; }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        
        .animate-draw-circle { animation: drawCircle 2s ease-out forwards; }
        .animate-draw-smile { animation: drawSmile 1s ease-out forwards; }
        .animate-draw-star { animation: drawStar 2s ease-out forwards; stroke: url(#starGrad); stroke-width: 2; }
        .animate-morph-moon { animation: morphToMoon 1s ease-in-out 3s forwards; }
        .animate-rotate { animation: rotate 20s linear infinite; transform-origin: center; }
        .animate-draw-heart { animation: drawHeart 2.5s ease-out forwards; }
        .animate-draw-square { animation: drawSquare 1.5s ease-out forwards; }
        .animate-draw-rose { animation: drawRose 1.5s ease-out forwards; }
        .animate-draw-cake { animation: drawCake 1.5s ease-out forwards; }
        .animate-fill-rose { animation: fillRose 1s ease-out forwards; fill-opacity: 0; }
        .animate-fill-cake { animation: fillCake 1s ease-out forwards; fill-opacity: 0; }
        .animate-flicker { animation: flicker 0.6s ease-in-out infinite; transform-origin: center bottom; }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; opacity: 0; }
        .animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
        .animate-pop { animation: pop 0.5s ease-out forwards; transform: scale(0); }
        .animate-write { display: inline-block; overflow: hidden; white-space: nowrap; animation: write 2s steps(40) forwards; width: 0; opacity: 0; }
        .animate-bounce-in { animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; opacity: 0; }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
        .animate-rainbow { animation: rainbow 3s linear infinite; }
        .animate-slide-left { animation: slideInLeft 0.6s ease-out forwards; opacity: 0; }
        .animate-slide-right { animation: slideInRight 0.6s ease-out forwards; opacity: 0; }
        .animate-float { animation: float 2s ease-in-out infinite; }
        .animate-jello { animation: jello 1s ease-in-out; }
      `}</style>
      
      <div className="fixed bottom-4 sm:bottom-12 right-4 sm:right-8 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`chat-button ${currentTheme.chatButton} rounded-full shadow-2xl transition-all duration-300 hover:scale-110 px-4 py-3 sm:px-6 sm:py-4 group relative flex items-center gap-2 sm:gap-3`}
        >
          <svg 
            className={`w-6 h-6 sm:w-8 sm:h-8 ${currentTheme.textColor} group-hover:scale-110 transition-transform duration-300`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
          <span className={`${currentTheme.textColor} font-semibold text-base sm:text-lg`}>Chat</span>
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-bold">{unreadCount}</span>
            </div>
          )}
          {unreadCount === 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          )}
        </button>
      )}

      {isOpen && (
        <>
        {/* Backdrop Blur */}
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10" onClick={() => setIsOpen(false)}></div>
        
        <div className={`chat-window-enter ${currentTheme.bg} ${currentTheme.rounded} shadow-2xl w-full sm:w-[450px] lg:w-[500px] h-[100vh] sm:h-[600px] lg:h-[700px] flex flex-col overflow-hidden border-2 ${currentTheme.border} fixed sm:relative inset-0 sm:inset-auto`}>
          {/* Header */}
          <div className={`${currentTheme.header} p-3 sm:p-4 flex items-center justify-between relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
            <div className="flex items-center gap-2 sm:gap-3 relative z-10">
              {!showChatHistory && (
                <button
                  onClick={() => setShowChatHistory(true)}
                  className={`${currentTheme.textColor} ${theme === 'minimal' ? 'hover:bg-gray-100' : theme === 'pink' ? 'hover:bg-pink-200/30' : theme === 'spongebob' ? 'hover:bg-cyan-300/30' : 'hover:bg-white/20'} rounded-lg p-2 transition-all duration-200`}
                  title="Lihat Riwayat"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="relative">
                <img 
                  src="/Gemini_Generated_Image_y8ny9ry8ny9ry8ny__1_-removebg-preview.png" 
                  alt="AI Bot" 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white p-1 shadow-lg" 
                />
              </div>
              <div>
                <h3 className={`${currentTheme.textColor} font-semibold text-base sm:text-lg`}>{showChatHistory ? 'Chat Anda' : 'Asisten Chatbot AI'}</h3>
                {!showChatHistory && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className={`${currentTheme.textColor} text-xs sm:text-sm`}>Online</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              {showChatHistory && (
                <button
                  onClick={() => setShowChatHistory(false)}
                  className={`${currentTheme.textColor} ${theme === 'minimal' ? 'hover:bg-gray-100' : theme === 'pink' ? 'hover:bg-pink-200/30' : theme === 'spongebob' ? 'hover:bg-cyan-300/30' : 'hover:bg-white/20'} rounded-lg p-2 transition-all duration-200`}
                  title="Kembali ke Chat"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className={`${currentTheme.textColor} ${theme === 'minimal' ? 'hover:bg-gray-100' : theme === 'pink' ? 'hover:bg-pink-200/30' : theme === 'spongebob' ? 'hover:bg-cyan-300/30' : 'hover:bg-white/20'} rounded-lg p-2 transition-all duration-200 hover:rotate-90`}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-3 sm:p-4 ${currentTheme.messagesBg} space-y-3 sm:space-y-4`}>
            {showChatHistory ? (
              /* Chat History Panel */
              <div className="h-full">

                {chatSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Belum ada riwayat chat</p>
                  </div>
                ) : (
                  <>
                  <button
                    onClick={() => {
                      setChatSessions([]);
                      localStorage.setItem('chat_sessions', JSON.stringify([]));
                    }}
                    className="w-full mb-3 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    Kosongkan Riwayat
                  </button>
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {chatSessions.filter(s => s.id !== currentSessionId).map((session) => (
                      <div
                        key={session.id}
                        onClick={() => {
                          setMessages(session.messages || []);
                          setCurrentSessionId(session.id);
                          setShowChatHistory(false);
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                        } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} shadow-sm hover:shadow-md`}
                      >
                        <div className="flex items-start gap-3">
                          <img 
                            src="/Gemini_Generated_Image_y8ny9ry8ny9ry8ny__1_-removebg-preview.png" 
                            alt="Bot" 
                            className="w-10 h-10 rounded-full bg-white p-1 flex-shrink-0" 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                Asisten Chatbot
                              </h4>
                              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex-shrink-0`}>
                                {new Date(session.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                              {session.lastMessage?.includes('[') && session.lastMessage?.includes('](') ? (
                                <span dangerouslySetInnerHTML={{
                                  __html: session.lastMessage.replace(
                                    /\[([^\]]+)\]\(([^)]+)\)/g,
                                    '<a href="$2" download class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
                                  )
                                }} />
                              ) : (
                                session.lastMessage || 'Chat telah berakhir.'
                              )}
                            </p>
                            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                              {session.messageCount} pesan
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  </>
                )}
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                {theme === 'modern' && (
                  <div className="text-center">
                    <svg className="w-40 h-40 mx-auto mb-4" viewBox="0 0 200 200">
                      <defs>
                        <linearGradient id="modernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6"/>
                          <stop offset="100%" stopColor="#1d4ed8"/>
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="85" fill="none" stroke="url(#modernGrad)" strokeWidth="6" strokeDasharray="534" strokeDashoffset="534" className="animate-draw-circle"/>
                      <circle cx="100" cy="100" r="70" fill="#dbeafe" className="animate-fade-in" style={{animationDelay: '1.5s'}}/>
                      <circle cx="75" cy="80" r="10" fill="#3b82f6" className="animate-pop" style={{animationDelay: '2s'}}/>
                      <circle cx="125" cy="80" r="10" fill="#3b82f6" className="animate-pop" style={{animationDelay: '2.2s'}}/>
                      <circle cx="75" cy="80" r="5" fill="#fff" className="animate-sparkle" style={{animationDelay: '2.5s'}}/>
                      <circle cx="125" cy="80" r="5" fill="#fff" className="animate-sparkle" style={{animationDelay: '2.7s'}}/>
                      <path d="M70 115 Q100 135 130 115" fill="none" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="100" className="animate-draw-smile" style={{animationDelay: '2.8s'}}/>
                      <circle cx="100" cy="50" r="4" fill="#60a5fa" className="animate-sparkle" style={{animationDelay: '3s'}}/>
                      <circle cx="50" cy="100" r="4" fill="#60a5fa" className="animate-sparkle" style={{animationDelay: '3.2s'}}/>
                      <circle cx="150" cy="100" r="4" fill="#60a5fa" className="animate-sparkle" style={{animationDelay: '3.4s'}}/>
                    </svg>
                    <p className="text-blue-600 text-xl font-bold animate-fade-in" style={{animationDelay: '3.5s'}}>Halo! Mulai percakapan baru!</p>
                  </div>
                )}
                {theme === 'dark' && (
                  <div className="text-center">
                    <svg className="w-40 h-40 mx-auto mb-4" viewBox="0 0 200 200">
                      <defs>
                        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7"/>
                          <stop offset="100%" stopColor="#ec4899"/>
                        </linearGradient>
                        <radialGradient id="moonGrad" cx="50%" cy="50%">
                          <stop offset="0%" stopColor="#fbbf24"/>
                          <stop offset="100%" stopColor="#f59e0b"/>
                        </radialGradient>
                      </defs>
                      <g className="animate-rotate">
                        <path d="M100 20 L110 70 L160 80 L120 110 L130 160 L100 135 L70 160 L80 110 L40 80 L90 70 Z" fill="url(#starGrad)" strokeDasharray="500" strokeDashoffset="500" className="animate-draw-star animate-morph-moon"/>
                        <circle cx="100" cy="100" r="50" fill="url(#moonGrad)" opacity="0" className="animate-fade-in" style={{animationDelay: '3s'}}/>
                        <circle cx="85" cy="85" r="8" fill="#78350f" opacity="0" className="animate-fade-in" style={{animationDelay: '3.5s'}}/>
                        <circle cx="120" cy="95" r="6" fill="#78350f" opacity="0" className="animate-fade-in" style={{animationDelay: '3.7s'}}/>
                        <circle cx="100" cy="120" r="5" fill="#78350f" opacity="0" className="animate-fade-in" style={{animationDelay: '3.9s'}}/>
                      </g>
                      <circle cx="40" cy="40" r="2" fill="#a855f7" className="animate-sparkle" style={{animationDelay: '2s'}}/>
                      <circle cx="160" cy="50" r="2" fill="#ec4899" className="animate-sparkle" style={{animationDelay: '2.3s'}}/>
                      <circle cx="30" cy="150" r="2" fill="#a855f7" className="animate-sparkle" style={{animationDelay: '2.6s'}}/>
                    </svg>
                    <p className="text-purple-300 text-lg font-medium animate-fade-in" style={{animationDelay: '2s'}}>Ruang gelap menanti cerita...</p>
                  </div>
                )}
                {theme === 'minimal' && (
                  <div className="text-center px-6">
                    <div className="text-4xl mb-3 animate-bounce-in" style={{animationDelay: '0s'}}>🌸</div>
                    <div className="text-lg font-serif text-gray-800 leading-relaxed space-y-1">
                      <p className="animate-slide-left font-bold" style={{animationDelay: '0.3s', color: '#ef4444'}}>Bunga mawar di taman sari,</p>
                      <p className="animate-slide-right" style={{animationDelay: '0.6s', color: '#f59e0b'}}>Harum semerbak pagi hari.</p>
                      <p className="animate-slide-left font-bold" style={{animationDelay: '0.9s', color: '#10b981'}}>Mari bertanya apa saja,</p>
                      <p className="animate-bounce-in animate-rainbow font-bold text-xl" style={{animationDelay: '1.2s'}}>Saya siap membantu! ✨</p>
                    </div>
                    <div className="mt-4 flex justify-center gap-2">
                      <span className="text-2xl animate-bounce-in" style={{animationDelay: '1.5s'}}>💬</span>
                      <span className="text-2xl animate-bounce-in" style={{animationDelay: '1.7s'}}>🤖</span>
                    </div>
                  </div>
                )}
                {theme === 'pink' && (
                  <div className="text-center">
                    <svg className="w-48 h-48 mx-auto mb-4" viewBox="-20 -10 280 220">
                      <defs>
                        <linearGradient id="roseGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fda4af"/>
                          <stop offset="100%" stopColor="#f472b6"/>
                        </linearGradient>
                        <linearGradient id="roseGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f9a8d4"/>
                          <stop offset="100%" stopColor="#ec4899"/>
                        </linearGradient>
                        <linearGradient id="roseGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fbcfe8"/>
                          <stop offset="100%" stopColor="#f472b6"/>
                        </linearGradient>
                        <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fce7f3"/>
                          <stop offset="100%" stopColor="#fbcfe8"/>
                        </linearGradient>
                        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fef3c7"/>
                          <stop offset="30%" stopColor="#fde047"/>
                          <stop offset="60%" stopColor="#fb923c"/>
                          <stop offset="100%" stopColor="#f97316"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Bouquet Wrapper - Outline */}
                      <path d="M35 115 L35 145 Q40 150 50 150 L50 150 Q60 150 65 145 L65 115 Z" fill="none" stroke="#d946ef" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" className="animate-draw-rose" style={{animationDelay: '0s'}}/>
                      
                      {/* Mawar 1 (Kiri) - Outline */}
                      <circle cx="40" cy="75" r="12" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="75" strokeDashoffset="75" className="animate-draw-rose" style={{animationDelay: '0.2s'}}/>
                      <circle cx="38" cy="72" r="7" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="44" strokeDashoffset="44" className="animate-draw-rose" style={{animationDelay: '0.4s'}}/>
                      <path d="M40 87 L40 115" stroke="#22c55e" strokeWidth="2" strokeDasharray="28" strokeDashoffset="28" className="animate-draw-rose" style={{animationDelay: '0.6s'}}/>
                      
                      {/* Mawar 2 (Tengah) - Outline */}
                      <circle cx="50" cy="65" r="14" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="88" strokeDashoffset="88" className="animate-draw-rose" style={{animationDelay: '0.3s'}}/>
                      <circle cx="48" cy="62" r="8" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="50" strokeDashoffset="50" className="animate-draw-rose" style={{animationDelay: '0.5s'}}/>
                      <path d="M50 79 L50 115" stroke="#22c55e" strokeWidth="2" strokeDasharray="36" strokeDashoffset="36" className="animate-draw-rose" style={{animationDelay: '0.7s'}}/>
                      
                      {/* Mawar 3 (Kanan) - Outline */}
                      <circle cx="60" cy="75" r="12" fill="none" stroke="#f9a8d4" strokeWidth="2" strokeDasharray="75" strokeDashoffset="75" className="animate-draw-rose" style={{animationDelay: '0.25s'}}/>
                      <circle cx="62" cy="72" r="7" fill="none" stroke="#f9a8d4" strokeWidth="1.5" strokeDasharray="44" strokeDashoffset="44" className="animate-draw-rose" style={{animationDelay: '0.45s'}}/>
                      <path d="M60 87 L60 115" stroke="#22c55e" strokeWidth="2" strokeDasharray="28" strokeDashoffset="28" className="animate-draw-rose" style={{animationDelay: '0.65s'}}/>
                      
                      {/* Daun */}
                      <ellipse cx="35" cy="100" rx="5" ry="8" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="30" strokeDashoffset="30" className="animate-draw-rose" style={{animationDelay: '0.8s'}}/>
                      <ellipse cx="65" cy="100" rx="5" ry="8" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="30" strokeDashoffset="30" className="animate-draw-rose" style={{animationDelay: '0.8s'}}/>
                      
                      {/* Bouquet - Fill */}
                      <path d="M35 115 L35 145 Q40 150 50 150 L50 150 Q60 150 65 145 L65 115 Z" fill="#d946ef" className="animate-fill-rose" style={{animationDelay: '1s'}}/>
                      <circle cx="40" cy="75" r="12" fill="url(#roseGrad1)" className="animate-fill-rose" style={{animationDelay: '1.1s'}}/>
                      <circle cx="38" cy="72" r="7" fill="#f472b6" className="animate-fill-rose" style={{animationDelay: '1.2s'}}/>
                      <circle cx="50" cy="65" r="14" fill="url(#roseGrad2)" className="animate-fill-rose" style={{animationDelay: '1.15s'}}/>
                      <circle cx="48" cy="62" r="8" fill="#ec4899" className="animate-fill-rose" style={{animationDelay: '1.25s'}}/>
                      <circle cx="60" cy="75" r="12" fill="url(#roseGrad3)" className="animate-fill-rose" style={{animationDelay: '1.12s'}}/>
                      <circle cx="62" cy="72" r="7" fill="#f9a8d4" className="animate-fill-rose" style={{animationDelay: '1.22s'}}/>
                      <ellipse cx="35" cy="100" rx="5" ry="8" fill="#22c55e" className="animate-fill-rose" style={{animationDelay: '1.3s'}}/>
                      <ellipse cx="65" cy="100" rx="5" ry="8" fill="#22c55e" className="animate-fill-rose" style={{animationDelay: '1.3s'}}/>
                      
                      {/* Pita Bouquet */}
                      <path d="M45 140 Q40 145 35 140" fill="none" stroke="#fff" strokeWidth="2" opacity="0" className="animate-fade-in" style={{animationDelay: '1.4s'}}/>
                      <path d="M55 140 Q60 145 65 140" fill="none" stroke="#fff" strokeWidth="2" opacity="0" className="animate-fade-in" style={{animationDelay: '1.4s'}}/>
                      
                      {/* 3 Mawar Terpisah - Formasi V (Kiri ke Kanan) */}
                      {/* Mawar 4 (Kiri) - Outline */}
                      <circle cx="185" cy="155" r="10" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="63" strokeDashoffset="63" className="animate-draw-rose" style={{animationDelay: '1.5s'}}/>
                      <circle cx="184" cy="153" r="6" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="37" strokeDashoffset="37" className="animate-draw-rose" style={{animationDelay: '1.6s'}}/>
                      <path d="M185 165 L185 180" stroke="#22c55e" strokeWidth="2" strokeDasharray="15" strokeDashoffset="15" className="animate-draw-rose" style={{animationDelay: '1.7s'}}/>
                      <ellipse cx="180" cy="172" rx="4" ry="6" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" className="animate-draw-rose" style={{animationDelay: '1.8s'}}/>
                      
                      {/* Mawar 5 (Tengah Atas) - Outline */}
                      <circle cx="205" cy="140" r="11" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="69" strokeDashoffset="69" className="animate-draw-rose" style={{animationDelay: '1.55s'}}/>
                      <circle cx="204" cy="138" r="6.5" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="40" strokeDashoffset="40" className="animate-draw-rose" style={{animationDelay: '1.65s'}}/>
                      <path d="M205 151 L205 168" stroke="#22c55e" strokeWidth="2" strokeDasharray="17" strokeDashoffset="17" className="animate-draw-rose" style={{animationDelay: '1.75s'}}/>
                      <ellipse cx="200" cy="159" rx="4" ry="6" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" className="animate-draw-rose" style={{animationDelay: '1.85s'}}/>
                      
                      {/* Mawar 6 (Kanan) - Outline */}
                      <circle cx="225" cy="155" r="10" fill="none" stroke="#f9a8d4" strokeWidth="2" strokeDasharray="63" strokeDashoffset="63" className="animate-draw-rose" style={{animationDelay: '1.52s'}}/>
                      <circle cx="226" cy="153" r="6" fill="none" stroke="#f9a8d4" strokeWidth="1.5" strokeDasharray="37" strokeDashoffset="37" className="animate-draw-rose" style={{animationDelay: '1.62s'}}/>
                      <path d="M225 165 L225 180" stroke="#22c55e" strokeWidth="2" strokeDasharray="15" strokeDashoffset="15" className="animate-draw-rose" style={{animationDelay: '1.72s'}}/>
                      <ellipse cx="230" cy="172" rx="4" ry="6" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="20" className="animate-draw-rose" style={{animationDelay: '1.82s'}}/>
                      
                      {/* Mawar 4-6 - Fill */}
                      <circle cx="185" cy="155" r="10" fill="url(#roseGrad1)" className="animate-fill-rose" style={{animationDelay: '1.9s'}}/>
                      <circle cx="184" cy="153" r="6" fill="#f472b6" className="animate-fill-rose" style={{animationDelay: '2s'}}/>
                      <ellipse cx="180" cy="172" rx="4" ry="6" fill="#22c55e" className="animate-fill-rose" style={{animationDelay: '2.1s'}}/>
                      
                      <circle cx="205" cy="140" r="11" fill="url(#roseGrad2)" className="animate-fill-rose" style={{animationDelay: '1.95s'}}/>
                      <circle cx="204" cy="138" r="6.5" fill="#ec4899" className="animate-fill-rose" style={{animationDelay: '2.05s'}}/>
                      <ellipse cx="200" cy="159" rx="4" ry="6" fill="#22c55e" className="animate-fill-rose" style={{animationDelay: '2.15s'}}/>
                      
                      <circle cx="225" cy="155" r="10" fill="url(#roseGrad3)" className="animate-fill-rose" style={{animationDelay: '1.92s'}}/>
                      <circle cx="226" cy="153" r="6" fill="#f9a8d4" className="animate-fill-rose" style={{animationDelay: '2.02s'}}/>
                      <ellipse cx="230" cy="172" rx="4" ry="6" fill="#22c55e" className="animate-fill-rose" style={{animationDelay: '2.12s'}}/>
                      
                      {/* Kue - Outline */}
                      <rect x="110" y="120" width="60" height="40" rx="3" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200" className="animate-draw-cake" style={{animationDelay: '1.6s'}}/>
                      <rect x="110" y="100" width="60" height="20" rx="3" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="160" strokeDashoffset="160" className="animate-draw-cake" style={{animationDelay: '1.9s'}}/>
                      <line x1="125" y1="120" x2="125" y2="160" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="40" strokeDashoffset="40" className="animate-draw-cake" style={{animationDelay: '2.2s'}}/>
                      <line x1="140" y1="120" x2="140" y2="160" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="40" strokeDashoffset="40" className="animate-draw-cake" style={{animationDelay: '2.2s'}}/>
                      <line x1="155" y1="120" x2="155" y2="160" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="40" strokeDashoffset="40" className="animate-draw-cake" style={{animationDelay: '2.2s'}}/>
                      <rect x="135" y="85" width="4" height="15" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="38" strokeDashoffset="38" className="animate-draw-cake" style={{animationDelay: '2.4s'}}/>
                      
                      {/* Kue - Fill */}
                      <rect x="110" y="120" width="60" height="40" rx="3" fill="url(#cakeGrad)" className="animate-fill-cake" style={{animationDelay: '2.7s'}}/>
                      <rect x="110" y="100" width="60" height="20" rx="3" fill="#fda4af" className="animate-fill-cake" style={{animationDelay: '2.9s'}}/>
                      <rect x="135" y="85" width="4" height="15" fill="#fbbf24" className="animate-fill-cake" style={{animationDelay: '3.1s'}}/>
                      
                      {/* Api Lilin - Lebih Besar & Jelas */}
                      <g opacity="0" className="animate-fade-in" style={{animationDelay: '3.3s'}}>
                        <ellipse cx="137" cy="78" rx="5" ry="8" fill="url(#flameGrad)"/>
                        <ellipse cx="137" cy="78" rx="3" ry="5" fill="#fef3c7"/>
                        <path d="M137 70 Q134 66 137 62 Q140 66 137 70" fill="#fde047"/>
                      </g>
                      
                      {/* Sparkles */}
                      <g opacity="0" className="animate-fade-in" style={{animationDelay: '3.6s'}}>
                        <circle cx="25" cy="60" r="2" fill="#fda4af" className="animate-sparkle" style={{animationDelay: '3.6s'}}/>
                        <circle cx="75" cy="50" r="2" fill="#f472b6" className="animate-sparkle" style={{animationDelay: '3.7s'}}/>
                        <circle cx="90" cy="80" r="2" fill="#ec4899" className="animate-sparkle" style={{animationDelay: '3.8s'}}/>
                        <circle cx="180" cy="90" r="2" fill="#fda4af" className="animate-sparkle" style={{animationDelay: '3.9s'}}/>
                        <circle cx="175" cy="130" r="2" fill="#f472b6" className="animate-sparkle" style={{animationDelay: '4s'}}/>
                      </g>
                      
                      {/* Hujan Mawar */}
                      <g opacity="0" className="animate-fade-in" style={{animationDelay: '4.5s'}}>
                        <text x="20" y="0" fontSize="16" className="animate-fall-rose" style={{animationDelay: '0s'}}>🌹</text>
                        <text x="80" y="0" fontSize="14" className="animate-fall-rose" style={{animationDelay: '0.8s'}}>🌹</text>
                        <text x="140" y="0" fontSize="15" className="animate-fall-rose" style={{animationDelay: '1.6s'}}>🌹</text>
                        <text x="200" y="0" fontSize="16" className="animate-fall-rose" style={{animationDelay: '2.4s'}}>🌹</text>
                        <text x="50" y="0" fontSize="14" className="animate-fall-rose" style={{animationDelay: '3.2s'}}>🌹</text>
                        <text x="170" y="0" fontSize="15" className="animate-fall-rose" style={{animationDelay: '1.2s'}}>🌹</text>
                        <text x="110" y="0" fontSize="16" className="animate-fall-rose" style={{animationDelay: '2s'}}>🌹</text>
                      </g>
                    </svg>
                    <p className="text-pink-600 text-lg font-medium animate-fade-in" style={{animationDelay: '4.2s'}}>Hai! ayo memulai pertanyaan~ 💐🎂</p>
                  </div>
                )}
                {theme === 'spongebob' && (
                  <div className="text-center">
                    <svg className="w-40 h-40 mx-auto mb-4" viewBox="0 0 200 200">
                      <rect x="50" y="50" width="100" height="100" fill="#fbbf24" stroke="#ca8a04" strokeWidth="4" strokeDasharray="400" strokeDashoffset="400" className="animate-draw-square"/>
                      <circle cx="75" cy="80" r="12" fill="#fff" className="animate-pop" style={{animationDelay: '1.5s'}}/>
                      <circle cx="125" cy="80" r="12" fill="#fff" className="animate-pop" style={{animationDelay: '1.7s'}}/>
                      <circle cx="75" cy="80" r="6" fill="#0ea5e9" className="animate-pop" style={{animationDelay: '2s'}}/>
                      <circle cx="125" cy="80" r="6" fill="#0ea5e9" className="animate-pop" style={{animationDelay: '2.2s'}}/>
                      <path d="M70 110 Q100 130 130 110" fill="none" stroke="#ca8a04" strokeWidth="3" strokeDasharray="100" strokeDashoffset="100" className="animate-draw-smile" style={{animationDelay: '2.5s'}}/>
                      <g opacity="0" style={{animationDelay: '3s'}}>
                        <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3s" fill="freeze"/>
                        <rect x="155" y="55" width="8" height="40" fill="#fbbf24" stroke="#ca8a04" strokeWidth="2" rx="2">
                          <animateTransform attributeName="transform" type="rotate" values="0 159 75; -30 159 75; 30 159 75; -30 159 75; 30 159 75; 0 159 75" dur="1.5s" begin="3s" repeatCount="indefinite"/>
                        </rect>
                        <g>
                          <animateTransform attributeName="transform" type="rotate" values="0 159 75; -30 159 75; 30 159 75; -30 159 75; 30 159 75; 0 159 75" dur="1.5s" begin="3s" repeatCount="indefinite"/>
                          <circle cx="163" cy="48" r="3" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1.5"/>
                          <circle cx="168" cy="52" r="3" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1.5"/>
                          <circle cx="168" cy="60" r="3" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1.5"/>
                          <circle cx="168" cy="68" r="3" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1.5"/>
                        </g>
                      </g>
                      <g opacity="0">
                        <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3s" fill="freeze"/>
                        <ellipse cx="115" cy="25" rx="32" ry="18" fill="#fff" stroke="#ca8a04" strokeWidth="3"/>
                        <text x="115" y="31" textAnchor="middle" fill="#ca8a04" fontSize="14" fontWeight="bold">HALLO!</text>
                      </g>
                    </svg>
                    <p className="text-yellow-900 text-xl font-bold animate-bounce" style={{animationDelay: '3s'}}>AKU SIAP! AKU SIAP!</p>
                  </div>
                )}
              </div>
            ) : (
              messages.map((message, index) => (
              <div
                key={message.id}
                className={`message-enter flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {isDeleteMode && (
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)}
                    onChange={() => toggleMessageSelection(message.id)}
                    className="mt-2 w-4 h-4 cursor-pointer"
                  />
                )}
                <div
                  onClick={() => isDeleteMode && toggleMessageSelection(message.id)}
                  className={`max-w-[85%] sm:max-w-[80%] ${currentTheme.rounded} px-3 py-2 sm:px-4 sm:py-3 relative ${
                    message.type === 'user'
                      ? currentTheme.userMsg + ' shadow-lg'
                      : currentTheme.botMsg + ' shadow-md'
                  } ${isDeleteMode ? 'cursor-pointer' : ''} ${selectedMessages.includes(message.id) ? 'ring-2 ring-red-500' : ''}`}
                >
                  {message.type === 'bot' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (speakingMessageId === message.id) {
                          stopSpeaking();
                        } else {
                          speakText(message.text, message.id);
                        }
                      }}
                      className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all ${
                        speakingMessageId === message.id
                          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                          : theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                      title={speakingMessageId === message.id ? 'Stop' : 'Dengar'}
                    >
                      {speakingMessageId === message.id ? (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                        </svg>
                      )}
                    </button>
                  )}
                  <div className={`text-xs sm:text-sm leading-relaxed ${message.type === 'bot' ? 'pr-8' : ''}`}>{formatMessageContent(message.text)}</div>
                </div>
              </div>
              ))
            )}

            {isTyping && (
              <div className="message-enter flex justify-start">
                <div className={`${currentTheme.botMsg} ${currentTheme.rounded} shadow-md px-4 py-3`}>
                  <div className="flex gap-1">
                    <div className={`w-2 h-2 ${currentTheme.dotColor || 'bg-blue-400'} rounded-full animate-bounce`}></div>
                    <div className={`w-2 h-2 ${currentTheme.dotColor || 'bg-blue-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                    <div className={`w-2 h-2 ${currentTheme.dotColor || 'bg-blue-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!showChatHistory && (
          <div className={`p-3 sm:p-4 ${currentTheme.inputBg || (theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')} border-t`}>
            {isDeleteMode && (
              <div className="flex gap-2 mb-3">
                <button
                  onClick={handleDeleteSelected}
                  disabled={selectedMessages.length === 0}
                  className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
                >
                  Hapus Terpilih ({selectedMessages.length})
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all text-sm font-medium"
                >
                  Hapus Semua
                </button>
                <button
                  onClick={() => { setIsDeleteMode(false); setSelectedMessages([]); }}
                  className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all text-sm font-medium"
                >
                  Batal
                </button>
              </div>
            )}
            <div className="flex gap-2 items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder=""
                  className={`w-full pl-3 pr-10 py-2 sm:py-3 border-2 ${currentTheme.inputBorder} ${currentTheme.rounded} text-xs sm:text-sm transition-all duration-200`}
                />
                {!inputMessage && (
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${theme === 'pink' ? 'text-pink-400' : theme === 'spongebob' ? 'text-blue-500' : 'text-gray-400'} text-xs sm:text-sm flex items-center`}>
                    <span>{typedText}</span>
                    <span className="typing-cursor"></span>
                  </div>
                )}
                
                {/* Theme Button Inside Input - Right Side */}
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : theme === 'pink' ? 'text-pink-400 hover:text-pink-600' : theme === 'spongebob' ? 'text-blue-500 hover:text-blue-700' : 'text-gray-400 hover:text-gray-600'} p-1 transition-all duration-200`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="12" cy="18" r="2"/>
                  </svg>
                  
                  {showThemeMenu && (
                    <div className={`absolute bottom-full right-0 mb-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : theme === 'pink' ? 'bg-pink-100 border-pink-300' : theme === 'spongebob' ? 'bg-yellow-100 border-yellow-400 border-4' : 'bg-white border-gray-200'} ${currentTheme.rounded} shadow-xl border p-2 min-w-[180px] max-h-[400px] overflow-y-auto`}>
                      <div className="mb-2 pb-2 border-b">
                        <p className="text-xs font-bold px-3 py-1 text-gray-500">Tema Chatbot</p>
                      </div>
                      {Object.keys(themes).map((themeName) => (
                        <button
                          key={themeName}
                          onClick={() => handleThemeChange(themeName)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all ${theme === 'spongebob' ? 'font-bold' : ''} ${
                            theme === themeName 
                              ? (theme === 'dark' ? 'bg-purple-600 text-white' : theme === 'pink' ? 'bg-pink-500 text-white' : theme === 'spongebob' ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-600 text-white')
                              : (theme === 'dark' ? 'text-gray-200 hover:bg-gray-600' : theme === 'pink' ? 'text-pink-900 hover:bg-pink-200' : theme === 'spongebob' ? 'text-blue-900 hover:bg-yellow-200' : 'text-gray-700 hover:bg-gray-100')
                          }`}
                        >
                          {themes[themeName].name}
                        </button>
                      ))}
                      
                      <hr className="my-2" />
                      
                      <button
                        onClick={() => { setIsDeleteMode(!isDeleteMode); setShowThemeMenu(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-600' : theme === 'pink' ? 'text-pink-900 hover:bg-pink-200' : theme === 'spongebob' ? 'text-blue-900 hover:bg-yellow-200' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {isDeleteMode ? '✓ Mode Hapus' : 'Hapus Pesan'}
                      </button>
                    </div>
                  )}
                </button>
              </div>
              
              {/* Send/Voice Button - Dynamic */}
              <button
                onClick={inputMessage.trim() ? handleSendMessage : undefined}
                onMouseDown={!inputMessage.trim() ? startListening : undefined}
                onMouseUp={!inputMessage.trim() ? stopListening : undefined}
                onTouchStart={!inputMessage.trim() ? startListening : undefined}
                onTouchEnd={!inputMessage.trim() ? stopListening : undefined}
                disabled={inputMessage.trim() ? !inputMessage.trim() : false}
                className={`${
                  isListening 
                    ? 'bg-red-500 animate-pulse' 
                    : currentTheme.sendButton
                } text-white ${currentTheme.rounded} p-2 sm:p-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 shadow-lg group`}
                title={inputMessage.trim() ? 'Kirim pesan' : 'Tekan & tahan untuk bicara'}
              >
                {inputMessage.trim() ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                    {currentTheme.sendIcon}
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          )}
        </div>
        
        {/* Delete All Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`${currentTheme.bg} ${currentTheme.rounded} shadow-2xl p-6 max-w-sm mx-4`}>
              <h3 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Hapus Semua Pesan?</h3>
              <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Semua pesan akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={`flex-1 px-4 py-2 ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-all`}
                >
                  Batal
                </button>
                <button
                  onClick={confirmDeleteAll}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                >
                  Hapus Semua
                </button>
              </div>
            </div>
          </div>
        )}
        </>
      )}
    </div>
    </>
  );
}
