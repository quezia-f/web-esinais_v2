import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, Chrome, Eye, EyeOff, Hand } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onLogin: () => void;
}

export function AuthModal({ isOpen, onClose, isDarkMode, onLogin }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot-password'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setAuthMode('login');
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      onLogin();
    }
    // Handle register and forgot password cases here if needed in future
  };

  if (!isOpen) return null;

  const getTitle = () => {
    switch (authMode) {
      case 'login': return 'Bem-vindo de volta!';
      case 'register': return 'Crie sua conta';
      case 'forgot-password': return 'Recuperar senha';
    }
  };

  const getSubtitle = () => {
    switch (authMode) {
      case 'login': return 'Digite suas credenciais para acessar sua conta';
      case 'register': return 'Preencha os dados abaixo para começar a usar';
      case 'forgot-password': return 'Digite seu e-mail para receber o link de recuperação';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#1A1A24] rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95 ring-1 ring-slate-900/5 dark:ring-slate-700/50 border border-transparent dark:border-slate-800">
        
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-slate-50 dark:bg-[#0D0D12]">
          <div className="absolute inset-0 bg-[#9956F6]/10 pattern-grid-lg opacity-30" />
          {/* Abstract Shapes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#9956F6]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#9956F6]/10 rounded-full blur-3xl" />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-black/10 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative pt-8 px-8 pb-8 flex flex-col items-center">
          
          {/* Logo/Icon */}
          <div className="bg-white dark:bg-[#1A1A24] p-3 rounded-2xl shadow-xl mb-6 ring-4 ring-[#9956F6]/20">
            <Hand className="w-8 h-8 text-[#9956F6] dark:text-[#AC6FF7]" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              {getTitle()}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {getSubtitle()}
            </p>
          </div>

          {/* Social Buttons - Only show for Login and Register */}
          {authMode !== 'forgot-password' && (
            <>
              <div className="w-full mb-6">
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 dark:bg-[#13131B] hover:bg-slate-100 dark:hover:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl transition-all duration-200 group w-full">
                  <Chrome className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-[#9956F6] transition-colors" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Google</span>
                </button>
              </div>

              <div className="relative w-full mb-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <span className="relative bg-white dark:bg-[#1A1A24] px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Ou continue com
                </span>
              </div>
            </>
          )}

          {/* Form */}
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            
            {authMode === 'register' && (
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#9956F6] transition-colors" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9956F6]/20 focus:border-[#9956F6] transition-all"
                  placeholder="Nome completo"
                />
              </div>
            )}

            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#9956F6] transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9956F6]/20 focus:border-[#9956F6] transition-all"
                placeholder="Seu e-mail"
              />
            </div>

            {authMode !== 'forgot-password' && (
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#9956F6] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9956F6]/20 focus:border-[#9956F6] transition-all"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            )}

            {authMode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot-password')}
                  className="text-sm font-medium text-[#9956F6] hover:text-[#AC6FF7] dark:text-[#9956F6] dark:hover:text-[#AC6FF7] transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#9956F6] hover:opacity-90 text-white font-bold rounded-xl shadow-lg shadow-[#9956F6]/30 transform active:scale-[0.98] transition-all duration-200"
            >
              {authMode === 'login' ? 'Entrar na conta' : 
               authMode === 'register' ? 'Criar conta gratuita' : 'Enviar link de recuperação'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Toggle Login/Register/Back */}
          <div className="mt-6 text-center">
            {authMode === 'forgot-password' ? (
              <button 
                onClick={() => setAuthMode('login')}
                className="font-bold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors hover:underline"
              >
                Voltar para o login
              </button>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {authMode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="ml-2 font-bold text-[#9956F6] hover:text-[#AC6FF7] dark:text-[#9956F6] dark:hover:text-[#AC6FF7] transition-colors hover:underline"
                >
                  {authMode === 'login' ? 'Cadastre-se' : 'Entrar'}
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
