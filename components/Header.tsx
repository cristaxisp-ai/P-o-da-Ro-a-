
import React from 'react';

interface HeaderProps {
  onOpenEditor: () => void;
  onOpenAddProduct: () => void;
  onResetCatalog?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenEditor, onOpenAddProduct, onResetCatalog }) => {
  return (
    <header className="relative w-full flex flex-col items-center justify-center pt-12 pb-8 px-4 overflow-hidden">
      {/* Decoração de fundo sutil - Brilho de forno a lenha */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-orange-500/10 blur-[100px] -z-10 rounded-full"></div>
      
      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
        {/* Design de Logotipo com Mascote */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-8 px-8 md:px-12 border-4 border-double border-amber-900/30 bg-orange-50/50 rounded-[3rem] shadow-sm backdrop-blur-sm relative">
          
          {/* Ações do Header */}
          <div className="absolute -top-4 -right-4 flex space-x-2">
            {/* Botão de Resetar (Apenas Admin/Contexto de edição) */}
            {onResetCatalog && (
              <button 
                onClick={onResetCatalog}
                className="w-10 h-10 bg-white text-amber-900 rounded-full shadow-md hover:bg-stone-100 hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-amber-900/10 group"
                title="Resetar para o Padrão"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
            )}

            {/* Botão de Adicionar Produto */}
            <button 
              onClick={onOpenAddProduct}
              className="w-12 h-12 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-4 border-white group"
              title="Adicionar Novo Produto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-amber-950 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Novo Produto
              </span>
            </button>

            {/* Botão de Edição IA */}
            <button 
              onClick={onOpenEditor}
              className="w-12 h-12 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-4 border-white group"
              title="Estúdio de Fotos IA"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-amber-950 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Editar Fotos
              </span>
            </button>
          </div>

          {/* Mascote Pão da Roça */}
          <div className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-orange-300 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
            <img 
              src="https://raw.githubusercontent.com/lucas-labs/assets/main/pao-da-roca-mascot.png" 
              alt="Mascote Pão da Roça" 
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = "https://img.icons8.com/color/512/bakery.png";
              }}
            />
          </div>

          {/* Título e Tagline */}
          <div className="text-center sm:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-amber-950 tracking-tighter leading-none select-none">
              Pão da <span className="text-orange-700 block sm:inline">Roça</span>
            </h1>
            
            <div className="mt-4 flex items-center justify-center sm:justify-start space-x-3">
              <span className="h-px w-6 md:w-10 bg-amber-800/40"></span>
              <p className="text-amber-800/80 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold whitespace-nowrap">
                Artesanal • Caseiro • Puro
              </p>
              <span className="h-px w-6 md:w-10 bg-amber-800/40 hidden md:block"></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center relative z-10 animate-in fade-in slide-in-from-top-4 duration-1000">
        <p className="text-amber-900 text-xl md:text-2xl font-medium italic opacity-90">
          "O carinho de casa em cada detalhe"
        </p>
        
        <div className="flex items-center justify-center mt-6 space-x-3 opacity-40">
          <span className="h-px w-16 bg-amber-900"></span>
          <div className="w-2.5 h-2.5 rotate-45 border border-amber-900 bg-orange-600"></div>
          <span className="h-px w-16 bg-amber-900"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
