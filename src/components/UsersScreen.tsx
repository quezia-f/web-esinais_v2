import React, { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner@2.0.3";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Shield,
  User,
  Languages,
  Clock,
  AlertTriangle,
  X,
  ChevronDown,
  ImageIcon
} from 'lucide-react';

export function UsersScreen() {
  const [activeFilter, setActiveFilter] = React.useState('Todos');
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState('Todos');
  const [dateFilter, setDateFilter] = React.useState('');
  
  // Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: 'João Admin', email: 'joao.admin@esinais.com', role: 'Administrador', status: 'Ativo', date: '10-01-2025' },
    { id: 2, name: 'Maria da Silva', email: 'maria.silva@email.com', role: 'Padrão', status: 'Ativo', date: '12-02-2025' },
    { id: 3, name: 'Dani Intérprete', email: 'dani.libras@esinais.com', role: 'Intérprete', status: 'Ativo', date: '15-03-2025' },
    { id: 4, name: 'Carlos Souza', email: 'carlos.souza@email.com', role: 'Padrão', status: 'Inativo', date: '20-03-2025' },
    { id: 5, name: 'Marcelo Oliveira', email: 'marcelo.inter@esinais.com', role: 'Intérprete', status: 'Ativo', date: '22-03-2025' },
    { id: 6, name: 'Ana Paula', email: 'ana.paula@email.com', role: 'Padrão', status: 'Ativo', date: '05-04-2025' },
    { id: 7, name: 'Roberto Costa', email: 'roberto.costa@email.com', role: 'Padrão', status: 'Bloqueado', date: '10-04-2025' },
    { id: 8, name: 'Fernanda Lima', email: 'fernanda.lima@email.com', role: 'Administrador', status: 'Ativo', date: '12-04-2025' },
    { id: 9, name: 'Paulo Santos', email: 'paulo.santos@email.com', role: 'Padrão', status: 'Inativo', date: '15-04-2025' },
    { id: 10, name: 'Juliana Costa', email: 'juliana.costa@email.com', role: 'Intérprete', status: 'Ativo', date: '18-04-2025' },
  ]);

  const confirmDelete = (id: number) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      toast.success("Usuário excluído com sucesso!", {
        duration: 3000,
      });
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreateModalOpen(false);
    toast.success("Usuário cadastrado com sucesso!", {
        duration: 3000,
    });
    // Here you would typically handle the actual user creation logic
  };

  const getFilteredUsers = () => {
    let result = users;

    // Filter by Role
    if (activeFilter !== 'Todos') {
      result = result.filter(user => user.role === activeFilter);
    }

    // Filter by Status
    if (statusFilter !== 'Todos') {
      result = result.filter(user => user.status === statusFilter);
    }

    // Filter by Date (simple string match for now, could be improved)
    if (dateFilter) {
      result = result.filter(user => user.date.includes(dateFilter));
    }

    return result;
  };

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'Administrador': 
        return (
          <span className="px-2.5 py-1 bg-[#9956F6]/10 dark:bg-[#9956F6]/30 text-[#9956F6] dark:text-[#AC6FF7] rounded-md text-xs font-bold flex items-center gap-1.5 w-fit">
            <Shield className="w-3 h-3" />
            {role}
          </span>
        );
      case 'Intérprete': 
        return (
          <span className="px-2.5 py-1 bg-[#9956F6]/10 dark:bg-[#9956F6]/30 text-[#9956F6] dark:text-[#AC6FF7] rounded-md text-xs font-bold flex items-center gap-1.5 w-fit">
            <Languages className="w-3 h-3" />
            {role}
          </span>
        );
      default: 
        return (
          <span className="px-2.5 py-1 bg-slate-100 dark:bg-[#13131B] border border-transparent dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-xs font-bold flex items-center gap-1.5 w-fit">
            <User className="w-3 h-3" />
            {role}
          </span>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Ativo': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30';
      case 'Inativo': return 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
      case 'Bloqueado': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-6 h-full overflow-hidden relative">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Gerenciar Usuários</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Administre o acesso e permissões dos membros</p>
        </div>
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#9956F6] hover:bg-[#AC6FF7] text-white rounded-xl font-bold shadow-lg shadow-[#9956F6]/20 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Novo Usuário
        </button>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 min-h-0 bg-white dark:bg-[#1A1A24] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
         
         {/* Filters Header */}
         <div className="p-4 md:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
           <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              <button 
                onClick={() => setActiveFilter('Todos')}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  activeFilter === 'Todos' 
                  ? 'bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7]' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveFilter('Administrador')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === 'Administrador' 
                  ? 'bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7]' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                Administradores
              </button>
              <button 
                onClick={() => setActiveFilter('Intérprete')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === 'Intérprete' 
                  ? 'bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7]' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                Intérpretes
              </button>
              <button 
                onClick={() => setActiveFilter('Padrão')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === 'Padrão' 
                  ? 'bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7]' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                Padrão
              </button>
           </div>
           
             <div className="flex items-center gap-2 w-full sm:w-auto relative">
               {/* Search Input */}
               <div className="relative flex-1 sm:flex-none">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Buscar usuário..." 
                    className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50 text-slate-700 dark:text-slate-200 placeholder-slate-400"
                 />
               </div>

               {/* Filter Button & Modal */}
               <div className="relative">
                 <button 
                   onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
                   className={`p-2 rounded-lg transition-colors border ${isFilterModalOpen ? 'text-[#9956F6] bg-[#9956F6]/10 dark:bg-[#9956F6]/20 border-[#9956F6]/50' : 'text-slate-500 hover:text-[#9956F6] hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 border-slate-200 dark:border-slate-700 dark:text-slate-400'}`}
                 >
                   <Filter className="w-4 h-4" />
                 </button>

                 {/* Filter Modal */}
                 {isFilterModalOpen && (
                   <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-[#1A1A24] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="text-sm font-bold text-slate-800 dark:text-white">Filtrar Usuários</h3>
                       <button onClick={() => setIsFilterModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                         <XCircle className="w-4 h-4" />
                       </button>
                     </div>
                     
                     <div className="space-y-4">
                       {/* Status Filter */}
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</label>
                         <select 
                           value={statusFilter}
                           onChange={(e) => setStatusFilter(e.target.value)}
                           className="w-full px-3 py-2 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50"
                         >
                           <option value="Todos">Todos</option>
                           <option value="Ativo">Ativo</option>
                           <option value="Inativo">Inativo</option>
                           <option value="Bloqueado">Bloqueado</option>
                         </select>
                       </div>

                       {/* Date Filter */}
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Data de Cadastro</label>
                         <input 
                           type="text"
                           placeholder="Ex: 10-01-2025" 
                           value={dateFilter}
                           onChange={(e) => setDateFilter(e.target.value)}
                           className="w-full px-3 py-2 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50"
                         />
                       </div>
                       
                       {/* Actions */}
                       <div className="pt-2 flex gap-2">
                         <button 
                           onClick={() => {
                             setStatusFilter('Todos');
                             setDateFilter('');
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

         {/* Table */}
         <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-slate-50 dark:bg-[#13131B] sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Usuário</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Perfil</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data Cadastro</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {getFilteredUsers().map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm bg-slate-200 dark:bg-slate-700">
                          <ImageWithFallback 
                            src="https://images.unsplash.com/photo-1652549752120-d9beb4c86bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGZhY2V8ZW58MXx8fHwxNzcwMzIwNjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(item.role)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)} inline-flex items-center gap-1.5`}>
                         {item.status === 'Ativo' && <CheckCircle2 className="w-3 h-3" />}
                         {item.status === 'Inativo' && <Clock className="w-3 h-3" />}
                         {item.status === 'Bloqueado' && <XCircle className="w-3 h-3" />}
                         {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 tabular-nums">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button title="Visualizar" className="p-2 text-slate-400 hover:text-[#9956F6] hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button title="Editar" className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => confirmDelete(item.id)}
                          title="Excluir" 
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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
         <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 shrink-0">
            <span>Mostrando 1 - 10 de 50 usuários</span>
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
                <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md disabled:opacity-50 font-medium transition-colors" disabled>Anterior</button>
                <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md font-medium transition-colors">Próxima</button>
              </div>
            </div>
         </div>
      </div>

      {/* Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white dark:bg-[#1A1A24] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Excluir Usuário</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Deseja realmente excluir este usuário? Esta ação não pode ser desfeita.
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
                  onClick={handleDeleteUser}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white dark:bg-[#1A1A24] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 animate-in zoom-in-95 duration-200 relative">
                 <button 
                   onClick={() => setIsCreateModalOpen(false)} 
                   className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                 >
                    <X className="w-5 h-5" />
                 </button>
                 
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Cadastrar Usuário</h2>
                 
                 <form onSubmit={handleCreateUser} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nome</label>
                        <input type="text" placeholder="Digite o nome completo" className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none transition-all dark:text-white" required />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">E-mail</label>
                        <input type="email" placeholder="Digite o e-mail" className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none transition-all dark:text-white" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Senha</label>
                            <input type="password" placeholder="Digite a senha padrão" className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none transition-all dark:text-white" required />
                        </div>
                        
                         <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Perfil</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none appearance-none transition-all text-slate-600 dark:text-slate-300" defaultValue="">
                                    <option value="" disabled>Selecione o perfil</option>
                                    <option value="admin">Administrador</option>
                                    <option value="standard">Padrão</option>
                                    <option value="interpreter">Intérprete</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Foto de perfil</label>
                            <div className="relative">
                                <input type="file" className="hidden" id="file-upload" />
                                <label htmlFor="file-upload" className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-[#9956F6] transition-colors group">
                                    <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 text-sm truncate pr-2">Escolher arquivo</span>
                                    <div className="w-6 h-6 shrink-0 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center text-slate-500">
                                        <ImageIcon className="w-4 h-4" />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-8 py-3 bg-[#9956F6] hover:bg-[#AC6FF7] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#9956F6]/20">
                            Cadastrar
                        </button>
                    </div>
                 </form>
            </div>
        </div>
      )}
    </div>
  );
}