import React from 'react';
import { X, CheckCircle2, AlertTriangle, Info, Clock, Check } from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Sinal Aprovado',
      message: 'O sinal "Computador" foi aprovado e já está disponível na plataforma.',
      time: 'Há 2 horas',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Correção Solicitada',
      message: 'O sinal "Internet" precisa de ajustes na iluminação do vídeo.',
      time: 'Há 5 horas',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Novo Usuário',
      message: 'Um novo intérprete solicitou acesso à plataforma.',
      time: 'Ontem',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Meta Atingida',
      message: 'Parabéns! Você alcançou a marca de 50 contribuições este mês.',
      time: 'Há 2 dias',
      read: true
    }
  ]);

  if (!isOpen) return null;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 pointer-events-none">
      {/* Backdrop (invisible but clickable to close) */}
      <div 
        className="fixed inset-0 bg-transparent pointer-events-auto transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="w-full max-w-sm bg-white dark:bg-[#1A1A24] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 pointer-events-auto flex flex-col max-h-[85vh] animate-in slide-in-from-right-5 duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">Notificações</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Você tem {notifications.filter(n => !n.read).length} novas notificações
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleMarkAllAsRead}
              title="Marcar todas como lidas"
              className="p-2 text-slate-400 hover:text-[#9956F6] hover:bg-[#9956F6]/10 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-3">
                <Info className="w-8 h-8 opacity-50" />
              </div>
              <p className="text-sm">Nenhuma notificação por enquanto.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id)}
                className={`
                  relative p-4 rounded-xl cursor-pointer transition-all group
                  ${notification.read 
                    ? 'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 opacity-70 hover:opacity-100' 
                    : 'bg-slate-50 dark:bg-[#13131B] hover:bg-slate-100 dark:hover:bg-[#1c1c26]'}
                `}
              >
                {!notification.read && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#9956F6] shadow-lg shadow-[#9956F6]/50" />
                )}
                
                <div className="flex gap-3">
                  <div className={`mt-0.5 shrink-0 ${notification.read ? 'opacity-50' : ''}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-semibold mb-0.5 truncate ${notification.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                      {notification.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-medium">
                      <Clock className="w-3 h-3" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#13131B]/50 shrink-0 rounded-b-2xl">
          <button className="w-full py-2 text-xs font-bold text-[#9956F6] hover:bg-[#9956F6]/10 rounded-lg transition-colors">
            Ver todo o histórico
          </button>
        </div>
      </div>
    </div>
  );
}
