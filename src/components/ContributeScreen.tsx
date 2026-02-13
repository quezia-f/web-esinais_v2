import React from 'react';
import { Trophy, Video, Star, Medal, ArrowRight, CheckCircle2, FilePlus, Heart, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ContributeScreenProps {
  isDarkMode: boolean;
}

export function ContributeScreen({ isDarkMode }: ContributeScreenProps) {
  const topContributors = [
    {
      name: "Maria da Silva",
    //   avatar: "https://images.unsplash.com/photo-1590905775253-a4f0f3c426ff?auto=format&fit=crop&w=300&q=80",
      avatar: "https://plus.unsplash.com/premium_photo-1738449258742-f98da1490e2d?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      count: 1290,
      role: "Super Colaborador",
      rank: 1
    },
    {
      name: "João Oliveira",
    //   avatar: "https://images.unsplash.com/photo-1599566147214-ce487862ea4f?auto=format&fit=crop&w=300&q=80",
      avatar: "https://plus.unsplash.com/premium_photo-1739178656537-ea88ababab9b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      count: 1150,
      role: "Intérprete",
      rank: 2
    },
    {
      name: "Ana Costa",
      avatar: "https://images.unsplash.com/photo-1750535135733-4ade39b4d487?auto=format&fit=crop&w=300&q=80",
      count: 980,
      role: "Estudante",
      rank: 3
    }
  ];

  const contributionOptions = [
    {
      title: "Gravar Sinais",
      description: "Grave vídeos curtos de sinais em Libras.",
      icon: Video,
    },
    {
      title: "Validar Sinais",
      description: "Revise vídeos enviados por outros usuários.",
      icon: CheckCircle2,
    },
    {
      title: "Sugerir Palavras",
      description: "Sugira novas expressões para a plataforma.",
      icon: FilePlus,
    }
  ];

  const getRankBadge = (rank: number) => {
    switch (rank) {
        case 1:
            return (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30 border-2 border-white dark:border-[#1A1A24]">
                    <span className="text-white font-black text-sm">1</span>
                </div>
            );
        case 2:
            return (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-500/30 border-2 border-white dark:border-[#1A1A24]">
                    <span className="text-white font-black text-sm">2</span>
                </div>
            );
        case 3:
            return (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 border-2 border-white dark:border-[#1A1A24]">
                    <span className="text-white font-black text-sm">3</span>
                </div>
            );
        default:
            return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0D0D12] p-4 lg:p-6 gap-4">
      
      {/* Header Section - Compact */}
      <div className="flex justify-between items-center shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
             <Trophy className="w-6 h-6 text-[#9956F6]" />
             Ranking
           </h1>
           <p className="text-sm text-slate-500 dark:text-slate-400">
             Top colaboradores da semana
           </p>
        </div>
        
        
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 min-h-0 grid grid-rows-[auto_1fr] gap-4">
        
        {/* Top Contributors Ranking - Compact */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 items-end justify-center px-2 py-4 h-full max-h-[220px]">
            {/* 2nd Place */}
            <div className="order-1 flex flex-col items-center justify-end h-full pb-2">
                <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        {getRankBadge(2)}
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-1 bg-slate-200 dark:bg-slate-800">
                        <ImageWithFallback src={topContributors[1].avatar} alt={topContributors[1].name} className="w-full h-full rounded-full object-cover" />
                    </div>
                </div>
                <div className="text-center mt-2">
                    <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm md:text-base leading-tight line-clamp-1">{topContributors[1].name}</h3>
                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mb-1">{topContributors[1].role}</p>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">
                        {topContributors[1].count} pts
                    </span>
                </div>
            </div>

            {/* 1st Place */}
            <div className="order-2 flex flex-col items-center h-full relative z-10">
                 <div className="absolute top-0 w-full h-full bg-gradient-to-b from-[#9956F6]/10 to-transparent blur-xl -z-10 rounded-full" />
                 <div className="relative mt-auto pb-4">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        {getRankBadge(1)}
                    </div>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-[#9956F6] to-[#AC6FF7] shadow-xl shadow-[#9956F6]/20">
                        <ImageWithFallback src={topContributors[0].avatar} alt={topContributors[0].name} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-[#0D0D12]" />
                    </div>
                    <div className="absolute -bottom-2 right-0 bg-[#9956F6] p-1 rounded-full border-2 border-white dark:border-[#0D0D12]">
                        <Sparkles className="w-3 h-3 text-white" />
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-[#9956F6] dark:text-[#AC6FF7] text-base md:text-lg leading-tight line-clamp-1">{topContributors[0].name}</h3>
                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mb-1">{topContributors[0].role}</p>
                    <span className="px-3 py-1 bg-[#9956F6] text-white rounded-full text-xs font-bold shadow-md shadow-[#9956F6]/20">
                        {topContributors[0].count} pts
                    </span>
                </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 flex flex-col items-center justify-end h-full pb-2">
                <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        {getRankBadge(3)}
                    </div>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-1 bg-slate-200 dark:bg-slate-800">
                        <ImageWithFallback src={topContributors[2].avatar} alt={topContributors[2].name} className="w-full h-full rounded-full object-cover" />
                    </div>
                </div>
                <div className="text-center mt-2">
                    <h3 className="font-bold text-slate-700 dark:text-slate-200 text-sm md:text-base leading-tight line-clamp-1">{topContributors[2].name}</h3>
                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mb-1">{topContributors[2].role}</p>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">
                        {topContributors[2].count} pts
                    </span>
                </div>
            </div>
        </div>

        {/* Contribution Methods - Fill Remaining Space */}
        <div className="flex flex-col gap-2 min-h-0">
             <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                Como ajudar
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 min-h-0">
                {contributionOptions.map((option, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white dark:bg-[#1A1A24] rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex flex-row md:flex-col gap-4 items-center md:items-start hover:border-[#9956F6] dark:hover:border-[#9956F6] transition-all cursor-pointer group shadow-sm hover:shadow-md h-full"
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-[#9956F6]/10 dark:bg-[#9956F6]/20 flex items-center justify-center text-[#9956F6] dark:text-[#AC6FF7] group-hover:scale-110 transition-transform duration-300">
                            <option.icon className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        
                        <div className="flex-1 min-w-0 w-full">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-lg group-hover:text-[#9956F6] dark:group-hover:text-[#AC6FF7] transition-colors">{option.title}</h3>
                            </div>
                            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 md:line-clamp-none">{option.description}</p>
                        </div>
                        
                        <div className="hidden md:flex justify-end w-full mt-auto">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 group-hover:bg-[#9956F6] group-hover:text-white transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="md:hidden text-slate-300">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
}
