
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantities: Record<string, number>;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantities, onUpdateQuantity }) => {
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
    <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-stone-100">
        <img 
          src={imgSrc} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
        />
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
