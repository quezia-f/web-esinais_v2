import React, { useState } from 'react';
import { toast } from "sonner@2.0.3";
import { 
  LayoutDashboard, 
  Hand, 
  Users, 
  LogOut, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Menu,
  ChevronDown,
  X,
  Sun,
  Moon,
  AlertTriangle,
  User,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SignsScreen } from './SignsScreen';
import { UsersScreen } from './UsersScreen';
import { ProfileScreen } from './ProfileScreen';
import { NotificationsModal } from './NotificationsModal';

interface DashboardScreenProps {
  isDarkMode: boolean;
  onLogout: () => void;
  onThemeToggle: () => void;
}

export function DashboardScreen({ isDarkMode, onLogout, onThemeToggle }: DashboardScreenProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'signs' | 'users' | 'profile'>('dashboard');

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Todos');

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [signToDelete, setSignToDelete] = useState<number | null>(null);

  // Mock data for stats
  const stats = [
    { label: 'Total', value: '1288', sublabel: 'sinais', color: 'bg-[#0B3B68]', textColor: 'text-white' },
    { label: 'Aprovados', value: '500', sublabel: 'sinais', color: 'bg-[#0093C9]', textColor: 'text-white' },
    { label: 'Pendentes', value: '25', sublabel: 'sinais', color: 'bg-[#C6C063]', textColor: 'text-white' },
    { label: 'Recusados', value: '25', sublabel: 'sinais', color: 'bg-[#98007E]', textColor: 'text-white' },
  ];

  // Users stat card is special layout
  const usersStat = { 
    totalP: '25', totalI: '04', totalA: '02',
    color: 'bg-[#9956F6]'
  };

  // Mock data for table
  const [recentSigns, setRecentSigns] = useState([
    { id: 1, sign: 'Computador', user: 'Maria da Silva', date: '12-06-2025', interpreter: 'Dani', status: 'Aprovado' },
    { id: 2, sign: 'Computador', user: 'Carlos da Silva', date: '12-06-2025', interpreter: 'Marcelo', status: 'Recusado' },
    { id: 3, sign: 'Computador', user: 'Fernando Henrique', date: '12-06-2025', interpreter: 'À definir', status: 'Pendente' },
    { id: 4, sign: 'Computador', user: 'José Menezes', date: '12-06-2025', interpreter: 'Dani', status: 'Aprovado' },
    { id: 5, sign: 'Computador', user: 'Carla Moraes', date: '12-06-2025', interpreter: 'Marcelo', status: 'Recusado' },
    { id: 6, sign: 'Computador', user: 'Luis Fernando', date: '12-06-2025', interpreter: 'À definir', status: 'Pendente' },
    { id: 7, sign: 'Internet', user: 'Ana Paula', date: '11-06-2025', interpreter: 'Dani', status: 'Aprovado' },
    { id: 8, sign: 'Mouse', user: 'Roberto Costa', date: '11-06-2025', interpreter: 'Marcelo', status: 'Aprovado' },
  ]);

  const confirmDelete = (id: number) => {
    setSignToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSign = () => {
    if (signToDelete) {
      setRecentSigns(recentSigns.filter(s => s.id !== signToDelete));
      setIsDeleteModalOpen(false);
      setSignToDelete(null);
      toast.success("Sinal excluído com sucesso!", {
        duration: 3000,
      });
    }
  };

  const getFilteredSigns = () => {
    let result = recentSigns;

    // Filter by Status
    if (statusFilter !== 'Todos') {
      result = result.filter(sign => sign.status === statusFilter);
    }

    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(sign => 
        sign.sign.toLowerCase().includes(query) || 
        sign.user.toLowerCase().includes(query)
      );
    }

    return result;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Aprovado': return 'bg-[#5CB8E4] text-white border-transparent';
      case 'Recusado': return 'bg-[#C46bb6] text-white border-transparent';
      case 'Pendente': return 'bg-[#DCD899] text-[#5c5826] border-transparent';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const renderContent = () => {
    if (currentView === 'signs') {
      return <SignsScreen />;
    }

    if (currentView === 'users') {
      return <UsersScreen />;
    }

    if (currentView === 'profile') {
      return <ProfileScreen />;
    }

    // Dashboard View
    return (
      <div className="flex flex-col gap-6 h-full overflow-hidden">
        {/* Stats Section */}
        <div className="shrink-0">
           <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Informações gerais</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Standard Stats */}
              {stats.map((stat, i) => (
                <div key={i} className={`${stat.color} rounded-xl p-5 relative overflow-hidden shadow-lg transition-transform hover:-translate-y-1 duration-300 group`}>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm font-medium ${stat.textColor} opacity-90`}>{stat.label}</p>
                        <h3 className={`text-3xl font-bold ${stat.textColor} mt-1`}>{stat.value}</h3>
                        <p className={`text-xs ${stat.textColor} opacity-70 mt-1`}>{stat.sublabel}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-end">
                      <button className={`text-xs font-bold ${stat.textColor} hover:underline opacity-90`}>
                        veja mais
                      </button>
                    </div>
                  </div>
                  {/* Decorative circle */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                </div>
              ))}
              
              {/* Users Stat Card */}
              <div className={`${usersStat.color} rounded-xl p-5 relative overflow-hidden shadow-lg text-white transition-transform hover:-translate-y-1 duration-300`}>
                <p className="text-sm font-medium text-white/80">Usuários</p>
                <div className="flex items-end justify-between mt-2">
                   <div>
                     <span className="text-3xl font-bold">25</span>
                     <span className="text-[10px] opacity-70 ml-1">padrão</span>
                   </div>
                   <div className="text-right">
                     <span className="text-2xl font-bold opacity-80">04</span>
                     <span className="text-[10px] opacity-70 ml-1 block -mt-1">intérprete</span>
                   </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                   <span className="text-xl font-bold opacity-90">02</span>
                   <span className="text-[10px] opacity-70">administrador</span>
                </div>
                <div className="mt-2 flex items-center justify-end">
                  <button className="text-xs font-bold text-white/80 hover:text-white transition-colors">
                    veja mais
                  </button>
                </div>
              </div>
           </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 min-h-0 bg-white dark:bg-[#1A1A24] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
           <div className="p-4 md:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
             <h2 className="text-lg font-bold text-slate-800 dark:text-white">Últimos sinais cadastrados</h2>
             
             <div className="flex items-center gap-2 w-full sm:w-auto">
               <div className="relative flex-1 sm:flex-none">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50 text-slate-700 dark:text-slate-200 placeholder-slate-400"
                 />
               </div>
               
               <div className="relative">
                 <button 
                    onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
                    className={`p-1.5 rounded-lg transition-colors border ${isFilterModalOpen ? 'text-[#9956F6] bg-[#9956F6]/10 dark:bg-[#9956F6]/20 border-[#9956F6]/50' : 'text-slate-500 hover:text-[#9956F6] hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 border-transparent dark:border-slate-700 dark:text-slate-400'}`}
                 >
                   <Filter className="w-4 h-4" />
                 </button>

                 {/* Filter Modal */}
                 {isFilterModalOpen && (
                   <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#1A1A24] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="text-sm font-bold text-slate-800 dark:text-white">Filtrar por Status</h3>
                       <button onClick={() => setIsFilterModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                         <XCircle className="w-4 h-4" />
                       </button>
                     </div>
                     
                     <div className="space-y-4">
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</label>
                         <select 
                           value={statusFilter}
                           onChange={(e) => setStatusFilter(e.target.value)}
                           className="w-full px-3 py-2 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50"
                         >
                           <option value="Todos">Todos</option>
                           <option value="Aprovado">Aprovado</option>
                           <option value="Pendente">Pendente</option>
                           <option value="Recusado">Recusado</option>
                         </select>
                       </div>
                       
                       <div className="pt-2 flex gap-2">
                         <button 
                           onClick={() => {
                             setStatusFilter('Todos');
                           }}
                           className="flex-1 px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors"
                         >
                           Limpar
                         </button>
                         <button 
                           onClick={() => setIsFilterModalOpen(false)}
                           className="flex-1 px-3 py-2 text-xs font-bold text-white bg-[#9956F6] hover:bg-[#AC6FF7] rounded-lg shadow-md shadow-[#9956F6]/20 transition-colors"
                         >
                           Aplicar
                         </button>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
             </div>
           </div>

           <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-slate-50 dark:bg-[#13131B] sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sinal</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Usuário</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Intérprete</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {getFilteredSigns().map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-3 text-sm font-medium text-slate-800 dark:text-slate-200">{item.sign}</td>
                      <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400">{item.user}</td>
                      <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400 tabular-nums">{item.date}</td>
                      <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-400">{item.interpreter}</td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)} inline-flex items-center gap-1.5`}>
                           {item.status === 'Aprovado' && <CheckCircle2 className="w-3 h-3" />}
                           {item.status === 'Recusado' && <XCircle className="w-3 h-3" />}
                           {item.status === 'Pendente' && <Clock className="w-3 h-3" />}
                           {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button title="Visualizar" className="p-1.5 text-slate-400 hover:text-[#9956F6] hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button title="Editar" className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => confirmDelete(item.id)}
                            title="Excluir" 
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
           
           {/* Pagination */}
           <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 shrink-0">
              <span>Mostrando {getFilteredSigns().length} de {recentSigns.length} sinais</span>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <span>Linhas por página</span>
                  <select className="bg-slate-100 dark:bg-[#13131B] border-none rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-[#9956F6]">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md disabled:opacity-50" disabled>Previous</button>
                  <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">Next</button>
                </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-[#13131B]' : 'bg-[#F5F6FA]'} flex h-screen w-full overflow-hidden transition-colors duration-300`}>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 bg-white dark:bg-[#1A1A24] flex flex-col border-r border-slate-200 dark:border-slate-800 shadow-xl md:shadow-sm transition-all duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isSidebarCollapsed ? 'md:w-20' : 'md:w-64'}
          w-64
        `}
      >
        <div className={`p-6 flex items-center ${isSidebarCollapsed ? 'flex-col justify-center gap-4' : 'justify-between'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-[#9956F6] p-2 rounded-lg shrink-0">
              <Hand className="w-6 h-6 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight whitespace-nowrap animate-in fade-in duration-200">e-Sinais</span>
            )}
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-[#9956F6] hover:bg-[#9956F6]/10 transition-colors ${isSidebarCollapsed ? '' : ''}`}
            title={isSidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
             {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }}
            title={isSidebarCollapsed ? "Dashboard" : ""}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'dashboard' ? 'bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7]' : 'text-slate-500 dark:text-slate-400 hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 hover:text-slate-900 dark:hover:text-slate-200'} ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </button>
          <button 
            onClick={() => { setCurrentView('signs'); setIsSidebarOpen(false); }}
            title={isSidebarCollapsed ? "Sinais" : ""}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'signs' ? 'bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7]' : 'text-slate-500 dark:text-slate-400 hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 hover:text-slate-900 dark:hover:text-slate-200'} ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
          >
            <Hand className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Sinais</span>}
          </button>
          <button 
            onClick={() => { setCurrentView('users'); setIsSidebarOpen(false); }}
            title={isSidebarCollapsed ? "Usuários" : ""}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${currentView === 'users' ? 'bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7]' : 'text-slate-500 dark:text-slate-400 hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 hover:text-slate-900 dark:hover:text-slate-200'} ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
          >
            <Users className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Usuários</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 mt-auto flex flex-col gap-2">
          {/* Theme Toggle Button */}
          <button 
            onClick={onThemeToggle}
            title={isSidebarCollapsed ? (isDarkMode ? 'Modo Claro' : 'Modo Escuro') : ""}
            className={`flex items-center gap-3 px-4 py-3 w-full text-slate-500 dark:text-slate-400 hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 hover:text-slate-900 dark:hover:text-slate-200 rounded-xl font-medium transition-colors ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
            {!isSidebarCollapsed && <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>}
          </button>

          <button 
            onClick={onLogout}
            title={isSidebarCollapsed ? "Sair" : ""}
            className={`flex items-center gap-3 px-4 py-3 w-full text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl font-medium transition-colors ${isSidebarCollapsed ? 'justify-center px-2' : ''}`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isSidebarCollapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-[#1A1A24] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 shrink-0 z-10 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white truncate">
              {currentView === 'dashboard' && 'Dashboard'}
              {currentView === 'signs' && 'Sinais'}
              {currentView === 'users' && 'Usuários'}
              {currentView === 'profile' && 'Meu Perfil'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity select-none"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#9956F6] to-[#7c44c9] p-[2px]">
                  <img 
                    src="https://plus.unsplash.com/premium_photo-1739178656537-ea88ababab9b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-800" 
                    alt="Admin"
                  />
                </div>
                <div className="hidden md:block text-sm">
                  <p className="font-bold text-slate-700 dark:text-slate-200">João Admin</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Administrador</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 hidden sm:block transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-60 bg-white dark:bg-[#1A1A24] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="flex items-center gap-3 p-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9956F6] to-[#7c44c9] p-[2px] shrink-0">
                            <img 
                              src="https://plus.unsplash.com/premium_photo-1739178656537-ea88ababab9b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                              className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-800" 
                              alt="Admin"
                            />
                        </div>
                        <div className="overflow-hidden">
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">João Admin</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrador</p>
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <button 
                          onClick={() => {
                            setCurrentView('profile');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-left"
                        >
                            <User className="w-4 h-4 text-slate-400" />
                            Meu perfil
                        </button>
                        <button 
                          onClick={() => {
                            setIsNotificationsOpen(true);
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-left"
                        >
                            <Bell className="w-4 h-4 text-slate-400" />
                            Notificações
                        </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className={`flex-1 flex flex-col min-h-0 p-4 md:p-6 transition-colors duration-300 ${
          currentView === 'dashboard' 
            ? 'overflow-hidden' 
            : 'overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent'
        }`}>
          {renderContent()}
        </div>
      </main>

       {/* Delete Confirmation Modal */}
       {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-[#1A1A24] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Excluir Sinal</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Deseja realmente excluir este sinal? Esta ação não pode ser desfeita.
                </p>
              </div>
              <div className="flex w-full gap-3 mt-2">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Não
                </button>
                <button 
                  onClick={handleDeleteSign}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      <NotificationsModal 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

    </div>
  );
}