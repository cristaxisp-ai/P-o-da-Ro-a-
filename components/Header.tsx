
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full pt-12 pb-8 px-4 flex flex-col items-center">
      <div className="text-center">
        <div className="inline-block p-4 border-b-2 border-amber-900 mb-4">
          <h1 className="text-4xl md:text-6xl font-black text-amber-950 tracking-tighter">
            Pão da <span className="text-orange-700">Roça</span>
          </h1>
        </div>
        <p className="text-amber-800/80 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">
          Produtos Caseiros • Feitos com Amor
        </p>
      </div>
    </header>
  );
};

export default Header;
