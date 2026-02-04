
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative w-full flex flex-col items-center justify-center pt-12 pb-8 px-4 overflow-hidden">
      {/* Decoração de fundo sutil: Brilho de "fogo" ou luz de cozinha */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-orange-500/10 blur-[100px] -z-10 rounded-full"></div>
      
      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Design de Logotipo Tipográfico */}
        <div className="inline-block py-10 px-8 md:px-16 text-center border-4 border-double border-amber-900/30 bg-orange-50/50 rounded-[3rem] shadow-sm backdrop-blur-sm">
          <h1 className="text-6xl md:text-8xl font-black text-amber-950 tracking-tighter leading-none select-none">
            Pão da <span className="text-orange-700 block mt-2 sm:inline sm:mt-0">Roça</span>
          </h1>
          
          <div className="mt-6 flex items-center justify-center space-x-4">
            <span className="h-px w-8 md:w-16 bg-amber-800/40"></span>
            <p className="text-amber-800/80 uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold whitespace-nowrap">
              Artesanal • Caseiro • Puro
            </p>
            <span className="h-px w-8 md:w-16 bg-amber-800/40"></span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center relative z-10 animate-in fade-in slide-in-from-top-4 duration-1000">
        <p className="text-amber-900 text-xl md:text-2xl font-medium italic opacity-90">
          "O carinho de casa em cada detalhe"
        </p>
        
        {/* Divisor decorativo */}
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
