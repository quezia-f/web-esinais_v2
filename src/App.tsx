import React, { useState, useRef } from 'react';
import { 
  Hand, 
  Menu, 
  Pause, 
  Accessibility, 
  X, 
  Maximize2, 
  Volume2, 
  Copy, 
  Share2,
  Moon,
  Sun,
  Github,
  Info,
  Instagram,
  Image as ImageIcon,
  Edit,
  ZoomIn,
  ZoomOut,
  Move,
  MapPin,
  Book,
  Type,
  Quote
} from 'lucide-react';
import Draggable from 'react-draggable';
import mangaSignImage from 'figma:asset/bca3c619236b539839d1170fbe5b9b3c2dc2c4f7.png';
import accessibilityIcon from 'figma:asset/b1fc831af1590579ab8fa6c0857b7ca69b7b8238.png';
import { AboutScreen } from './components/AboutScreen';
import { ContributeScreen } from './components/ContributeScreen';
import { AuthModal } from './components/AuthModal';
import { DashboardScreen } from './components/DashboardScreen';

const AVATAR_URL = "https://images.unsplash.com/photo-1658633385412-a9d6d921571f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMG1hbGUlMjBjaGFyYWN0ZXIlMjBhdmF0YXIlMjBncmV5JTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzAyOTkyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface TranslationItem {
  id: number;
  word: string;
  context: string;
  image: string;
  grammarClass?: string;
  definition?: string;
  example?: string;
  regionalisms?: string[];
}

export default function App() {
  const [inputText, setInputText] = useState("Manga Manga Manga...");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<'translator' | 'about' | 'contribute'>('translator');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Image Viewer State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const imageViewerRef = useRef(null);
  
  // Expand Viewer State
  const [isExpanded, setIsExpanded] = useState(false);
  const expandViewerRef = useRef(null);

  // Details Modal State
  const [selectedDetailItem, setSelectedDetailItem] = useState<TranslationItem | null>(null);
  
  // Mock data for the grid based on the "Manga" example
  const translationItems: TranslationItem[] = [
    { 
      id: 1, 
      word: "MANGA", 
      context: "FRUTA", 
      image: AVATAR_URL,
      grammarClass: "Substantivo",
      definition: "Fruto da mangueira, com um grande caroço central que envolve sua semente, muito conhecido por sua polpa amarelada, doce e suculenta.",
      example: "A manga estava tão doce e madura.",
      regionalisms: ["Nordeste", "Sudeste", "Centro-Oeste"]
    },
    { 
      id: 2, 
      word: "MANGA", 
      context: "ROUPA", 
      image: AVATAR_URL,
      grammarClass: "Substantivo",
      definition: "Parte do vestuário que cobre o braço, total ou parcialmente.",
      example: "A manga da minha camisa está suja de tinta.",
      regionalisms: ["Universal"]
    },
    { id: 3, word: "MANGA", context: "FRUTA", image: AVATAR_URL },
    { id: 4, word: "MANGA", context: "ROUPA", image: AVATAR_URL },
    { id: 5, word: "MANGA", context: "GERAL", image: AVATAR_URL },
    { id: 6, word: "MANGA", context: "FRUTA", image: AVATAR_URL },
    { id: 7, word: "MANGA", context: "ROUPA", image: AVATAR_URL },
    { id: 8, word: "MANGA", context: "GERAL", image: AVATAR_URL },
    { id: 9, word: "MANGA", context: "FRUTA", image: AVATAR_URL },
    { id: 10, word: "MANGA", context: "ROUPA", image: AVATAR_URL },
  ];

  const handleClear = () => {
    setInputText("");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openImageViewer = (image: string) => {
    setSelectedImage(image);
    setZoomLevel(1);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };
  
  const openDetails = (item: TranslationItem) => {
    setSelectedDetailItem(item);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  if (isLoggedIn) {
    return (
      <DashboardScreen 
        isDarkMode={isDarkMode} 
        onLogout={handleLogout} 
        onThemeToggle={toggleTheme}
      />
    );
  }

  return (
    <div className={`${isDarkMode ? 'dark bg-[#1A1A24]' : 'bg-[#F8F9FA]'} h-screen overflow-hidden font-sans flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300`}>
      
      {/* Header */}
      <header className="shrink-0 bg-[#1A1A24] text-white px-6 py-4 shadow-md z-20 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-[#9956F6]/20 p-2 rounded-lg">
              <Hand className="w-6 h-6 text-[#9956F6]" />
            </div>
            <span className="text-xl font-bold tracking-tight">e-Sinais Web</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button 
              onClick={() => setCurrentView('translator')}
              className={`${currentView === 'translator' ? 'text-white' : 'hover:text-[#9956F6]'} transition-colors`}
            >
              Tradutor
            </button>
            <button 
              onClick={() => setCurrentView('about')}
              className={`${currentView === 'about' ? 'text-white' : 'hover:text-[#9956F6]'} transition-colors`}
            >
              Sobre
            </button>
            <button 
              onClick={() => setCurrentView('contribute')}
              className={`${currentView === 'contribute' ? 'text-white' : 'hover:text-[#9956F6]'} transition-colors`}
            >
              Contribua
            </button>
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden md:block bg-[#9956F6] hover:bg-[#AC6FF7] text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-[#9956F6]/20 active:scale-95"
            >
              Entrar
            </button>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Sub-header */}
      {currentView === 'translator' && (
        <div className="shrink-0 bg-white dark:bg-[#1A1A24] text-slate-600 dark:text-blue-100 py-3 text-center text-sm font-medium shadow-sm z-10 transition-colors duration-300">
          Seu tradutor de Português para Libras
        </div>
      )}

      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto p-4 md:p-6 flex flex-col overflow-hidden">
        
        {currentView === 'translator' ? (
          /* Translator Container */
          <div className="grid lg:grid-cols-2 gap-6 h-full">
          
          {/* Input Card */}
          <section className="bg-white dark:bg-[#13131B] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden h-full transition-colors duration-300">
            <div className="bg-white dark:bg-[#13131B] border-b border-slate-100 dark:border-slate-700 p-4 md:px-6 md:py-5 flex justify-between items-center shrink-0 transition-colors duration-300">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#9956F6] rounded-full inline-block"></span>
                Português (Brasil)
              </h2>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-[#9956F6] hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 rounded-lg transition-colors" title="Colar">
                   <Copy className="w-4 h-4" />
                </button>

              </div>
            </div>
            
            <div className="flex-1 p-6 relative">
              <textarea
                className="w-full h-full resize-none outline-none text-xl md:text-2xl text-slate-700 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 bg-transparent leading-relaxed"
                placeholder="Digite seu texto aqui..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <div className="p-4 md:px-6 md:py-5 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-[#13131B] shrink-0 transition-colors duration-300">
              <button 
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                Limpar
              </button>
              <span className={`text-sm font-mono font-medium ${inputText.length > 4000 ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}>
                {inputText.length} / 5.000
              </span>
            </div>
          </section>

          {/* Output Card */}
          <section className="relative bg-white dark:bg-[#13131B] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden h-full transition-colors duration-300">

            <div className="bg-white dark:bg-[#13131B] border-b border-slate-100 dark:border-slate-700 p-4 md:px-6 md:py-5 flex justify-between items-center shrink-0 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                   <span className="w-2 h-6 bg-[#9956F6] rounded-full inline-block"></span>
                   Libras
                </h2>
                <span className="hidden sm:inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-xs font-bold rounded-full uppercase tracking-wider transition-colors duration-300">
                  Tradução
                </span>
              </div>
              
              <div className="flex gap-2">

                <button 
                  onClick={() => setIsExpanded(true)}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-[#9956F6] hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 rounded-lg transition-colors" 
                  title="Expandir"
                >
                   <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grid Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/30 dark:bg-[#13131B] scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent transition-colors duration-300">
              <style>{`
                .scrollbar-thin::-webkit-scrollbar {
                  width: 8px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                  background: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                  background-color: ${isDarkMode ? '#475569' : '#cbd5e1'};
                  border-radius: 20px;
                  border: 3px solid transparent;
                  background-clip: content-box;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                  background-color: ${isDarkMode ? '#64748b' : '#94a3b8'};
                }
              `}</style>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {translationItems.map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`} 
                    className="group relative bg-white dark:bg-[#13131B] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all duration-300 aspect-[3/4] flex flex-col"
                  >
                    {/* Action Buttons Overlay */}
                    <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="bg-[#9956F6] hover:opacity-90 text-white p-2 rounded-lg shadow-lg hover:scale-105 transition-all transform" 
                        title="Visualizar imagem"
                        onClick={() => openImageViewer(mangaSignImage)}
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button 
                        className="bg-[#9956F6] hover:opacity-90 text-white p-2 rounded-lg shadow-lg hover:scale-105 transition-all transform" 
                        title="Detalhes"
                        onClick={() => openDetails(item)}
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 3D Avatar Area */}
                    <div className="flex-1 bg-slate-100 dark:bg-[#13131B] relative overflow-hidden transition-colors duration-300">
                      <img 
                        src={mangaSignImage} 
                        alt={`Sinal de ${item.word}`} 
                        className="w-full h-full object-cover object-top mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 dark:from-slate-900/40 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Footer Label */}
                    <div className="p-3 bg-white dark:bg-[#13131B] border-t border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center transition-colors duration-300">
                       <span className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest mb-0.5">{item.word}</span>
                       <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 text-[10px] font-bold rounded-full uppercase transition-colors duration-300">
                         {item.context}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Playback Controls */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-[#13131B] flex items-center justify-between gap-4 shrink-0 transition-colors duration-300">
               <div className="flex w-full justify-center items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Velocidade</span>
                  <div className="flex bg-slate-100 dark:bg-[#13131B] rounded-lg p-1 transition-colors duration-300">
                    <button className="px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded transition-all">-</button>
                    <button className="px-2 py-1 text-xs font-bold text-white bg-[#9956F6] shadow-sm rounded transition-all">1x</button>
                    <button className="px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded transition-all">+</button>
                  </div>
               </div>

            </div>
          </section>
        </div>
        ) : currentView === 'about' ? (
          <AboutScreen isDarkMode={isDarkMode} />
        ) : (
          <ContributeScreen isDarkMode={isDarkMode} />
        )}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        isDarkMode={isDarkMode}
        onLogin={handleLogin}
      />

      {/* Draggable Image Viewer Popup */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
          <Draggable handle=".drag-handle" nodeRef={imageViewerRef}>
            <div ref={imageViewerRef} className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col pointer-events-auto">
              {/* Header with Drag Handle */}
              <div className="drag-handle cursor-move bg-slate-50 dark:bg-slate-900/50 p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center select-none">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold">
                  <Move className="w-4 h-4" />
                  Visualizar Imagem
                </div>
                <button 
                  onClick={closeImageViewer}
                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500 dark:text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Content Area */}
              <div className="relative h-[400px] bg-slate-100 dark:bg-[#13131B] overflow-hidden flex items-center justify-center p-4">
                <div 
                  className="transition-transform duration-200 ease-out"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1669207334420-66d0e3450283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMGZydWl0fGVufDF8fHx8MTc3MDI2Nzg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="Visualização" 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Footer Controls */}
              <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                 <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                   Zoom: {Math.round(zoomLevel * 100)}%
                 </div>
                 <div className="flex items-center gap-2">
                   <button 
                     onClick={handleZoomOut}
                     className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-50"
                     disabled={zoomLevel <= 0.5}
                     title="Diminuir Zoom"
                   >
                     <ZoomOut className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={handleZoomIn}
                     className="p-2 bg-[#9956F6] hover:opacity-90 rounded-lg text-white transition-colors disabled:opacity-50"
                     disabled={zoomLevel >= 5}
                     title="Aumentar Zoom"
                   >
                     <ZoomIn className="w-4 h-4" />
                   </button>
                 </div>
              </div>
            </div>
          </Draggable>
        </div>
      )}

      {/* Draggable Expand Viewer Popup */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
          <Draggable handle=".drag-handle" nodeRef={expandViewerRef}>
            <div ref={expandViewerRef} className="w-full max-w-5xl h-[85vh] bg-white dark:bg-[#13131B] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col pointer-events-auto">
              {/* Header with Drag Handle */}
              <div className="drag-handle cursor-move bg-slate-50 dark:bg-[#1A1A24] p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center select-none">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold">
                  <Maximize2 className="w-4 h-4 text-[#9956F6]" />
                  Visualizar Sinais
                </div>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500 dark:text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Content Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 dark:bg-[#0F0F16] scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {translationItems.map((item, index) => (
                      <div 
                        key={`expanded-${item.id}-${index}`} 
                        className="group relative bg-white dark:bg-[#1A1A24] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all duration-300 aspect-[3/4] flex flex-col"
                      >
                         {/* Action Buttons Overlay */}
                        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button 
                            className="bg-[#9956F6] hover:opacity-90 text-white p-2 rounded-lg shadow-lg hover:scale-105 transition-all transform" 
                            title="Visualizar imagem"
                            onClick={() => openImageViewer(mangaSignImage)}
                          >
                            <ImageIcon className="w-3 h-3" />
                          </button>
                          <button 
                            className="bg-[#9956F6] hover:opacity-90 text-white p-2 rounded-lg shadow-lg hover:scale-105 transition-all transform" 
                            title="Detalhes"
                            onClick={() => openDetails(item)}
                          >
                            <Info className="w-3 h-3" />
                          </button>
                        </div>

                        {/* 3D Avatar Area */}
                        <div className="flex-1 bg-slate-100 dark:bg-[#13131B] relative overflow-hidden transition-colors duration-300">
                          <img 
                            src={mangaSignImage} 
                            alt={`Sinal de ${item.word}`} 
                            className="w-full h-full object-cover object-top mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 dark:from-slate-900/40 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Footer Label */}
                        <div className="p-3 bg-white dark:bg-[#1A1A24] border-t border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center transition-colors duration-300">
                          <span className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest mb-0.5">{item.word}</span>
                          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 text-[10px] font-bold rounded-full uppercase transition-colors duration-300">
                            {item.context}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          </Draggable>
        </div>
      )}

      {/* Details Modal - Standardized Style */}
      {selectedDetailItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[calc(100vh-2rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200 dark:border-slate-700">
                {/* Header - Clean Style */}
                <div className="shrink-0 flex justify-between items-start p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{selectedDetailItem.word}</h2>
                        <span className="inline-block px-3 py-1 bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7] text-xs font-bold rounded-full uppercase tracking-wider">
                            {selectedDetailItem.context}
                        </span>
                    </div>
                    <button 
                        onClick={() => setSelectedDetailItem(null)}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 grid gap-6 bg-white dark:bg-slate-900">
                    {/* Sections */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="p-2 bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7] rounded-lg h-fit">
                                    <Book className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wide">Definição</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                                        {selectedDetailItem.definition || "Definição não disponível."}
                                    </p>
                                </div>
                            </div>
                             <div className="flex gap-3">
                                <div className="p-2 bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7] rounded-lg h-fit">
                                    <Type className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wide">Classe Gramatical</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                        {selectedDetailItem.grammarClass || "Substantivo"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                             <div className="flex gap-3">
                                <div className="p-2 bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] rounded-lg h-fit">
                                    <Quote className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wide">Exemplo de Uso</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 italic">
                                        "{selectedDetailItem.example || "Exemplo não disponível."}"
                                    </p>
                                </div>
                            </div>
                             <div className="flex gap-3">
                                <div className="p-2 bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] rounded-lg h-fit">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wide">Regionalismo</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {(selectedDetailItem.regionalisms || ["Universal"]).map(reg => (
                                            <span key={reg} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded border border-slate-200 dark:border-slate-700 font-medium">
                                                {reg}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 dark:bg-slate-800" />

                    {/* Homonyms/Synonyms */}
                     <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Homônimos / Sinônimos</h3>
                        <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {translationItems.filter(item => item.id !== selectedDetailItem.id).map((item, index) => (
                                  <div 
                                    key={`${item.id}-${index}`} 
                                    className="group relative bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 overflow-hidden hover:shadow-md transition-all duration-300 aspect-[3/4] flex flex-col cursor-pointer"
                                    onClick={() => setSelectedDetailItem(item)}
                                  >
                                    {/* 3D Avatar Area */}
                                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 relative overflow-hidden transition-colors duration-300">
                                      <img 
                                        src={mangaSignImage} 
                                        alt={`Sinal de ${item.word}`} 
                                        className="w-full h-full object-cover object-top mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:scale-105 transition-transform duration-700"
                                      />
                                      {/* Gradient overlay */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 dark:from-slate-900/40 to-transparent pointer-events-none"></div>
                                    </div>

                                    {/* Footer Label */}
                                    <div className="p-3 bg-white dark:bg-slate-700 border-t border-slate-100 dark:border-slate-600 flex flex-col items-center justify-center text-center transition-colors duration-300">
                                       <span className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest mb-0.5">{item.word}</span>
                                       <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-200 text-[10px] font-bold rounded-full uppercase transition-colors duration-300">
                                         {item.context}
                                       </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}