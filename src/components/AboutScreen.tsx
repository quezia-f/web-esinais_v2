import React from 'react';
import { Github, FileText, AlertCircle, MessageSquare } from 'lucide-react';

interface AboutScreenProps {
  isDarkMode: boolean;
}

export function AboutScreen({ isDarkMode }: AboutScreenProps) {
  const features = [
    {
      title: "Tradutor",
      description: "Tradução de palavras e frases para libras"
    },
    {
      title: "Cadastro colaborativo",
      description: "Cadastre sinais via webcam ou upload de arquivos"
    },
    {
      title: "Imagem associativa",
      description: "Imagens associadas aos sinais para facilitar compreensão"
    },
    {
      title: "Homônimos e sinônimos",
      description: "Tratamento da tradução de acordo com a Libras"
    },
    {
      title: "Ranking",
      description: "Ranqueamento para usuários que cadastram sinais"
    },
    {
      title: "Responsivo",
      description: "Interface intuitiva e adaptável a diferentes dispositivos"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0D0D12] p-4 lg:p-6 gap-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full animate-in fade-in duration-500">
      
      {/* Hero Section - Compact */}
      <div className="text-center space-y-3 shrink-0 mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
          Com o e-Sinais web você consegue traduzir palavras e textos do português para sinais em Libras
        </h1>
      </div>

      {/* Features Section - Flexible height */}
      <div className="flex-1 flex flex-col justify-center min-h-0 space-y-3 md:space-y-4 overflow-hidden">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 shrink-0">
          Funcionalidades que ajudam seu aprendizado
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-hidden h-full">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-[#1A1A24] p-3 lg:p-4 rounded-xl shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 hover:border-[#9956F6] dark:hover:border-[#9956F6] hover:transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center group h-full"
            >
              <h3 className="text-sm lg:text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#9956F6] dark:group-hover:text-[#AC6FF7] transition-colors mb-1">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs lg:text-sm leading-snug line-clamp-3">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Section - Bottom pinned */}
      <div className="shrink-0 flex flex-col items-center text-center space-y-4 pt-4 md:pt-6 mt-2 border-t border-slate-200 dark:border-slate-800/50">
        <div className="flex items-center gap-6 md:gap-8 w-full max-w-3xl justify-center">
            <div className="flex flex-col items-end gap-1 flex-1 text-right">
                 <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    Projeto
                 </h2>
                 <p className="text-sm text-slate-600 dark:text-slate-400">
                    Visite o projeto no repositório do github
                 </p>
            </div>
            
            <a 
              href="#" 
              className="group relative p-3 md:p-4 bg-white dark:bg-[#1A1A24] border border-slate-200 dark:border-slate-800 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-[#9956F6] dark:hover:border-[#9956F6] shrink-0"
            >
              <div className="absolute inset-0 bg-[#9956F6]/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
              <Github className="w-10 h-10 md:w-12 md:h-12 text-slate-800 dark:text-white group-hover:text-[#9956F6] dark:group-hover:text-[#AC6FF7] transition-colors" />
            </a>

            <div className="flex-1 flex flex-col items-start gap-2 text-xs md:text-sm font-medium text-[#9956F6] dark:text-[#AC6FF7]">
              <a href="#" className="hover:underline hover:text-[#7c44c9] dark:hover:text-[#AC6FF7] transition-colors flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                Documentação
              </a>
              <a href="#" className="hover:underline hover:text-[#7c44c9] dark:hover:text-[#AC6FF7] transition-colors flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                Requisitar funcionalidade
              </a>
              <a href="#" className="hover:underline hover:text-[#7c44c9] dark:hover:text-[#AC6FF7] transition-colors flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5" />
                Reportar problema
              </a>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}
