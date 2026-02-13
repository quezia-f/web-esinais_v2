import React, { useState } from 'react';
import { Camera, Mail, User, Lock, Save, Shield } from 'lucide-react';
import { toast } from "sonner@2.0.3";

export function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'João Admin',
    email: 'admin@esinais.com',
    role: 'Administrador',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Perfil atualizado com sucesso!");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header Banner & Profile Photo */}
      <div className="relative">
        {/* Banner Background */}
        <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-[#9956F6] to-[#7c44c9] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -right-10 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute left-10 bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Profile Card Overlay */}
        <div className="relative px-6 -mt-20 sm:px-10 flex flex-col sm:flex-row items-end sm:items-end gap-6">
          <div className="relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-white dark:bg-[#1A1A24]">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1739178656537-ea88ababab9b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <button className="absolute bottom-2 right-2 bg-[#9956F6] text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-[#1A1A24] hover:bg-[#8b4de3] transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 pb-2 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">João Admin</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Administrador do Sistema</p>
          </div>
          
          <div className="pb-2 hidden sm:block">
            <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#9956F6] hover:bg-[#8b4de3] text-white font-bold rounded-xl shadow-lg shadow-[#9956F6]/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Personal Information Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1A1A24] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2 bg-[#9956F6]/10 rounded-lg">
                <User className="w-5 h-5 text-[#9956F6]" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Informações Pessoais</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50 text-slate-700 dark:text-slate-200 transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50 text-slate-700 dark:text-slate-200 transition-all"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Bio</label>
                <textarea 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50 text-slate-700 dark:text-slate-200 min-h-[100px] resize-none transition-all"
                  placeholder="Conte um pouco sobre você..."
                  defaultValue="Sua bio aqui..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A24] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="p-2 bg-[#9956F6]/10 rounded-lg">
                <Lock className="w-5 h-5 text-[#9956F6]" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Segurança</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
               <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Senha Atual</label>
                <input 
                  type="password"
                  name="currentPassword" 
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50 text-slate-700 dark:text-slate-200 transition-all"
                  placeholder="••••••••••••"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Nova Senha</label>
                    <input 
                    type="password" 
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50 text-slate-700 dark:text-slate-200 transition-all"
                    placeholder="••••••••••••"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Confirmar Nova Senha</label>
                    <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50 text-slate-700 dark:text-slate-200 transition-all"
                    placeholder="••••••••••••"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
           {/* Role Card */}
           <div className="bg-white dark:bg-[#1A1A24] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Shield className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white">Permissões</h3>
             </div>
             
             <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-900/20">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">Administrador</p>
                <p className="text-xs text-amber-700/80 dark:text-amber-300/70">
                    Você tem acesso total a todas as funcionalidades do sistema, incluindo gerenciamento de usuários e aprovação de sinais.
                </p>
             </div>
           </div>

           {/* Stats Summary */}
           <div className="bg-white dark:bg-[#1A1A24] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
             <h3 className="font-bold text-slate-800 dark:text-white mb-4">Suas Contribuições</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#13131B] rounded-xl">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Sinais Cadastrados</span>
                    <span className="font-bold text-[#9956F6]">124</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#13131B] rounded-xl">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Sinais Aprovados</span>
                    <span className="font-bold text-emerald-500">118</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#13131B] rounded-xl">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Avaliações</span>
                    <span className="font-bold text-amber-500">45</span>
                </div>
             </div>
           </div>
           
           {/* Mobile Save Button */}
           <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full sm:hidden flex items-center justify-center gap-2 px-6 py-3 bg-[#9956F6] hover:bg-[#8b4de3] text-white font-bold rounded-xl shadow-lg shadow-[#9956F6]/20 transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              Salvar Alterações
            </button>
        </div>
      </div>
    </div>
  );
}
