
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onUpdateQuantity, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group relative">
      <div className="relative h-48 w-full">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-amber-900 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </div>
        
        {/* Controles Administrativos (Aparecem no Hover) */}
        <div className="absolute top-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-amber-900 shadow-sm hover:bg-amber-950 hover:text-white transition-all"
            title="Editar produto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-red-600 shadow-sm hover:bg-red-600 hover:text-white transition-all"
            title="Excluir produto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-amber-950 mb-2 leading-tight">{product.name}</h3>
        <p className="text-stone-600 text-sm mb-6 flex-grow leading-relaxed italic">
          {product.description || "Sem descrição disponível."}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-3 bg-stone-50 rounded-xl p-1 border border-stone-200">
            <button 
              onClick={() => onUpdateQuantity(product.id, -1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-stone-200 text-amber-900 hover:bg-orange-50 active:scale-90 transition-all disabled:opacity-30 shadow-sm"
              disabled={quantity === 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
            </button>
            <span className="w-6 text-center font-black text-amber-950 text-lg">{quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(product.id, 1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-stone-200 text-amber-900 hover:bg-orange-50 active:scale-90 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
