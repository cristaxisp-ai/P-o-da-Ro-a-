
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantities: Record<string, number>;
  onUpdateQuantity: (id: string, delta: number) => void;
  onEditImage?: (imageUrl: string) => void;
  onEditProduct?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantities, onUpdateQuantity, onEditImage, onEditProduct }) => {
  const [imgSrc, setImgSrc] = useState(product.imageUrl);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(`https://placehold.co/600x400/fef3c7/78350f?text=${encodeURIComponent(product.name)}`);
    }
  };

  const renderQuantityControl = (id: string, label?: string, price?: number) => {
    const qty = quantities[id] || 0;
    return (
      <div className="flex items-center justify-between w-full mt-2">
        <div className="flex items-center space-x-2">
          {label && (
            <span className="w-8 h-8 flex items-center justify-center bg-amber-900 text-white rounded-full font-bold text-xs shadow-sm">
              {label}
            </span>
          )}
          {price !== undefined && (
            <span className="text-sm font-semibold text-amber-900/70">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3 bg-stone-50 rounded-lg border border-stone-200 p-1">
          <button 
            onClick={() => onUpdateQuantity(id, -1)}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-stone-300 text-amber-900 hover:bg-orange-50 active:scale-95 transition-all disabled:opacity-50"
            disabled={qty === 0}
          >
            -
          </button>
          <span className="w-6 text-center font-bold text-amber-950">{qty}</span>
          <button 
            onClick={() => onUpdateQuantity(id, 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-stone-300 text-amber-900 hover:bg-orange-50 active:scale-95 transition-all"
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
        />
        
        <div className="absolute top-2 left-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Botão Compartilhar (Abre Editor de Imagem) */}
          {onEditImage && (
            <button 
              onClick={() => onEditImage(product.imageUrl)}
              className="p-2 bg-white/70 backdrop-blur-md text-green-700 rounded-lg shadow-sm border border-white/50 hover:bg-green-600 hover:text-white transition-colors flex items-center space-x-1"
              title="Compartilhar (Editar com IA)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-[10px] font-bold">Compartilhar</span>
            </button>
          )}

          {/* Botão de Edição Rápida IA */}
          {onEditImage && (
            <button 
              onClick={() => onEditImage(product.imageUrl)}
              className="p-2 bg-white/70 backdrop-blur-md text-amber-900 rounded-lg shadow-sm border border-white/50 hover:bg-orange-600 hover:text-white transition-colors"
              title="Melhorar foto com IA"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          )}

          {/* Botão de Editar Dados do Produto */}
          {onEditProduct && (
            <button 
              onClick={() => onEditProduct(product)}
              className="p-2 bg-white/70 backdrop-blur-md text-amber-900 rounded-lg shadow-sm border border-white/50 hover:bg-amber-900 hover:text-white transition-colors"
              title="Editar informações do produto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
        </div>

        {!product.variants && (
          <div className="absolute top-2 right-2 bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-amber-950 mb-1">{product.name}</h3>
        <p className="text-stone-600 text-sm mb-4 flex-grow italic">
          {product.description}
        </p>
        
        <div className="mt-auto space-y-2">
          <div className="mb-2">
            <span className="text-[10px] uppercase tracking-wider text-amber-800/60 font-bold">{product.category}</span>
          </div>
          
          {product.variants ? (
            <div className="flex flex-col space-y-3">
              {product.variants.map(variant => (
                <React.Fragment key={variant.id}>
                  {renderQuantityControl(variant.id, variant.label, variant.price)}
                </React.Fragment>
              ))}
            </div>
          ) : (
            renderQuantityControl(product.id)
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
