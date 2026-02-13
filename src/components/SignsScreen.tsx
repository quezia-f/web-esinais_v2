import React, { useState, useRef } from 'react';
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
  Clock,
  X,
  ChevronDown,
  Upload,
  Video,
  Image as ImageIcon,
  FileText,
  MapPin,
  Book,
  Type,
  Quote,
  AlertTriangle,
  Paperclip
} from 'lucide-react';

export function SignsScreen() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUploadMethod, setSelectedUploadMethod] = useState<string | null>(null);
  
  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Filter & Search State
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [signToDelete, setSignToDelete] = useState<number | null>(null);

  // Mock data for signs
  const [signs, setSigns] = useState([
    { id: 1, name: 'Computador', category: 'Tecnologia', user: 'Maria da Silva', date: '12-06-2025', status: 'Aprovado' },
    { id: 2, name: 'Internet', category: 'Tecnologia', user: 'Carlos da Silva', date: '12-06-2025', status: 'Recusado' },
    { id: 3, name: 'Mouse', category: 'Tecnologia', user: 'Fernando Henrique', date: '12-06-2025', status: 'Pendente' },
    { id: 4, name: 'Teclado', category: 'Tecnologia', user: 'José Menezes', date: '12-06-2025', status: 'Aprovado' },
    { id: 5, name: 'Monitor', category: 'Tecnologia', user: 'Carla Moraes', date: '12-06-2025', status: 'Recusado' },
    { id: 6, name: 'Software', category: 'Tecnologia', user: 'Luis Fernando', date: '12-06-2025', status: 'Pendente' },
    { id: 7, name: 'Hardware', category: 'Tecnologia', user: 'Ana Paula', date: '11-06-2025', status: 'Aprovado' },
    { id: 8, name: 'Rede', category: 'Tecnologia', user: 'Roberto Costa', date: '11-06-2025', status: 'Aprovado' },
    { id: 9, name: 'Wifi', category: 'Tecnologia', user: 'Julia Santos', date: '11-06-2025', status: 'Pendente' },
    { id: 10, name: 'Bluetooth', category: 'Tecnologia', user: 'Pedro Lima', date: '11-06-2025', status: 'Aprovado' },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Aprovado': return 'bg-[#5CB8E4] text-white border-transparent';
      case 'Recusado': return 'bg-[#C46bb6] text-white border-transparent';
      case 'Pendente': return 'bg-[#DCD899] text-[#5c5826] border-transparent';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const handleCreateSign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreateModalOpen(false);
    
    // Reset form state
    setSelectedUploadMethod(null);
    setSelectedFile(null);
    setSelectedImage(null);
    
    toast.success("Sinal cadastrado com sucesso!", {
        duration: 3000,
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setSelectedUploadMethod('file');
      toast.success("Arquivo selecionado: " + e.target.files[0].name);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setSelectedUploadMethod('image');
      toast.success("Imagem selecionada: " + e.target.files[0].name);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const triggerImageInput = () => {
    if (imageInputRef.current) {
        imageInputRef.current.click();
    }
  };

  const confirmDelete = (id: number) => {
    setSignToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSign = () => {
    if (signToDelete) {
      setSigns(signs.filter(s => s.id !== signToDelete));
      setIsDeleteModalOpen(false);
      setSignToDelete(null);
      toast.success("Sinal excluído com sucesso!", {
        duration: 3000,
      });
    }
  };

  const getFilteredSigns = () => {
    let result = signs;

    // Filter by Tab (Status)
    if (activeTab !== 'Todos') {
      // Remove the 's' at the end of tab name to match status (Aprovados -> Aprovado)
      const status = activeTab.slice(0, -1); 
      result = result.filter(sign => sign.status === status);
    }

    // Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(sign => 
        sign.name.toLowerCase().includes(query) || 
        sign.user.toLowerCase().includes(query)
      );
    }
    
    // Filter by Category
    if (categoryFilter !== 'Todas') {
        result = result.filter(sign => sign.category === categoryFilter);
    }

    return result;
  };

  return (
    <div className="flex-1 flex flex-col gap-6 h-full overflow-hidden relative">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Gerenciar Sinais</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Visualize, edite e gerencie o dicionário de libras</p>
        </div>
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#9956F6] hover:bg-[#AC6FF7] text-white rounded-xl font-bold shadow-lg shadow-[#9956F6]/20 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Novo Sinal
        </button>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 min-h-0 bg-white dark:bg-[#1A1A24] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
         
         {/* Filters Header */}
         <div className="p-4 md:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
           <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {['Todos', 'Aprovados', 'Pendentes', 'Recusados'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                    activeTab === tab
                    ? 'bg-[#9956F6]/10 dark:bg-[#9956F6]/20 text-[#9956F6] dark:text-[#AC6FF7]'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
           </div>
           
           <div className="flex items-center gap-2 w-full sm:w-auto relative">
             <div className="relative flex-1 sm:flex-none">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Buscar sinal..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50 text-slate-700 dark:text-slate-200 placeholder-slate-400"
               />
             </div>
             
             <div className="relative">
                <button 
                    onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
                    className={`p-2 rounded-lg transition-colors border ${isFilterModalOpen ? 'text-[#9956F6] bg-[#9956F6]/10 dark:bg-[#9956F6]/20 border-[#9956F6]/50' : 'text-slate-500 hover:text-[#9956F6] hover:bg-[#9956F6]/10 dark:hover:bg-[#9956F6]/20 border-slate-200 dark:border-slate-700 dark:text-slate-400'}`}
                >
                   <Filter className="w-4 h-4" />
                </button>

                 {/* Filter Modal */}
                 {isFilterModalOpen && (
                   <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#1A1A24] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="text-sm font-bold text-slate-800 dark:text-white">Filtrar Sinais</h3>
                       <button onClick={() => setIsFilterModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                         <XCircle className="w-4 h-4" />
                       </button>
                     </div>
                     
                     <div className="space-y-4">
                       <div className="space-y-2">
                         <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Categoria</label>
                         <select 
                           value={categoryFilter}
                           onChange={(e) => setCategoryFilter(e.target.value)}
                           className="w-full px-3 py-2 bg-slate-50 dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#9956F6]/50"
                         >
                           <option value="Todas">Todas</option>
                           <option value="Tecnologia">Tecnologia</option>
                           <option value="Saúde">Saúde</option>
                           <option value="Educação">Educação</option>
                         </select>
                       </div>
                       
                       <div className="pt-2 flex gap-2">
                         <button 
                           onClick={() => {
                             setCategoryFilter('Todas');
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
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nome do Sinal</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Criado por</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {getFilteredSigns().map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#9956F6]/10 dark:bg-[#9956F6]/20 flex items-center justify-center text-[#9956F6] dark:text-[#AC6FF7] font-bold text-lg">
                          {item.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-[#13131B] border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{item.user}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 tabular-nums">{item.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)} inline-flex items-center gap-1.5`}>
                         {item.status === 'Aprovado' && <CheckCircle2 className="w-3 h-3" />}
                         {item.status === 'Recusado' && <XCircle className="w-3 h-3" />}
                         {item.status === 'Pendente' && <Clock className="w-3 h-3" />}
                         {item.status}
                      </span>
                    </td>
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
            <span>Mostrando {getFilteredSigns().length} de {signs.length} sinais</span>
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

      {/* Create Sign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-4xl bg-white dark:bg-[#1A1A24] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 animate-in zoom-in-95 duration-200 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                 <button 
                   onClick={() => setIsCreateModalOpen(false)} 
                   className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                 >
                    <X className="w-5 h-5" />
                 </button>
                 
                 <div className="mb-8">
                   <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Adicionar sinal</h2>
                   <p className="text-slate-500 dark:text-slate-400 mt-1">Preencha os campos com os dados do sinal que deseja adicionar</p>
                 </div>
                 
                 <form onSubmit={handleCreateSign} className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nome <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="Nome do sinal" className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none transition-all dark:text-white" required />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Classificação Gramatical <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none appearance-none transition-all text-slate-600 dark:text-slate-300" defaultValue="">
                                    <option value="" disabled>Classificação gramatical</option>
                                    <option value="substantivo">Substantivo</option>
                                    <option value="verbo">Verbo</option>
                                    <option value="adjetivo">Adjetivo</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Região <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none appearance-none transition-all text-slate-600 dark:text-slate-300" defaultValue="">
                                    <option value="" disabled>Região</option>
                                    <option value="universal">Universal</option>
                                    <option value="nordeste">Nordeste</option>
                                    <option value="sudeste">Sudeste</option>
                                    <option value="sul">Sul</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Standardized Info Fields (Added as requested) */}
                    <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Detalhes Adicionais</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Book className="w-4 h-4 text-[#9956F6]" />
                                    Definição
                                </label>
                                <textarea placeholder="Descreva o significado do sinal..." className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none transition-all dark:text-white min-h-[100px] resize-none"></textarea>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        <Quote className="w-4 h-4 text-[#9956F6]" />
                                        Exemplo de Uso
                                    </label>
                                    <input type="text" placeholder="Frase de exemplo..." className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none transition-all dark:text-white" />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        <Type className="w-4 h-4 text-[#9956F6]" />
                                        Contexto
                                    </label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3 bg-white dark:bg-[#13131B] border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#9956F6] focus:border-transparent outline-none appearance-none transition-all text-slate-600 dark:text-slate-300" defaultValue="">
                                            <option value="" disabled>Selecione o contexto</option>
                                            <option value="geral">Geral</option>
                                            <option value="fruta">Fruta</option>
                                            <option value="tecnologia">Tecnologia</option>
                                            <option value="saude">Saúde</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upload Method Section */}
                    <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <label className="text-sm font-bold text-slate-900 dark:text-white">Como deseja enviar o sinal? <span className="text-red-500">*</span></label>
                        
                        {/* Hidden Inputs */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            className="hidden" 
                        />
                        <input 
                            type="file" 
                            accept="image/*"
                            ref={imageInputRef} 
                            onChange={handleImageChange} 
                            className="hidden" 
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button 
                                type="button"
                                onClick={triggerFileInput}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center gap-3 transition-all ${selectedUploadMethod === 'file' ? 'border-[#9956F6] bg-[#9956F6]/5 dark:bg-[#9956F6]/10' : 'border-slate-200 dark:border-slate-700 hover:border-[#9956F6]/50 bg-white dark:bg-[#13131B]'}`}
                            >
                                <div className={`p-3 rounded-lg ${selectedUploadMethod === 'file' ? 'bg-[#9956F6] text-white' : 'bg-[#9956F6]/10 text-[#9956F6] dark:bg-[#9956F6]/20'}`}>
                                    <Upload className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block font-bold text-slate-800 dark:text-slate-200">Por arquivo</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        {selectedFile && selectedUploadMethod === 'file' ? selectedFile.name : 'envie um arquivo do seu dispositivo'}
                                    </span>
                                </div>
                            </button>

                            <button 
                                type="button"
                                onClick={() => setSelectedUploadMethod('video')}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center gap-3 transition-all ${selectedUploadMethod === 'video' ? 'border-[#9956F6] bg-[#9956F6]/5 dark:bg-[#9956F6]/10' : 'border-slate-200 dark:border-slate-700 hover:border-[#9956F6]/50 bg-white dark:bg-[#13131B]'}`}
                            >
                                <div className={`p-3 rounded-lg ${selectedUploadMethod === 'video' ? 'bg-[#9956F6] text-white' : 'bg-[#9956F6]/10 text-[#9956F6] dark:bg-[#9956F6]/20'}`}>
                                    <Video className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block font-bold text-slate-800 dark:text-slate-200">Por vídeo</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">grave via webcam e edite seu sinal</span>
                                </div>
                            </button>

                            <button 
                                type="button"
                                onClick={triggerImageInput}
                                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center gap-3 transition-all ${selectedUploadMethod === 'image' ? 'border-[#9956F6] bg-[#9956F6]/5 dark:bg-[#9956F6]/10' : 'border-slate-200 dark:border-slate-700 hover:border-[#9956F6]/50 bg-white dark:bg-[#13131B]'}`}
                            >
                                <div className={`p-3 rounded-lg ${selectedUploadMethod === 'image' ? 'bg-[#9956F6] text-white' : 'bg-[#9956F6]/10 text-[#9956F6] dark:bg-[#9956F6]/20'}`}>
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block font-bold text-slate-800 dark:text-slate-200">Imagem associativa</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        {selectedImage && selectedUploadMethod === 'image' ? selectedImage.name : 'associe uma imagem ao seu sinal'}
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-8 py-3 bg-[#9956F6] hover:bg-[#AC6FF7] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#9956F6]/20">
                            Adicionar
                        </button>
                    </div>
                 </form>
            </div>
        </div>
      )}
    </div>
  );
}