
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pb-24 md:pb-32 text-center text-amber-900/60 px-6">
      <div className="h-px w-full max-w-xs bg-amber-200 mx-auto mb-6"></div>
      <p className="text-sm">Pão da Roça &copy; {new Date().getFullYear()}</p>
      <p className="text-xs italic mt-1 font-medium">Sabor que vem do campo direto para sua mesa.</p>
    </footer>
  );
};

export default Footer;
