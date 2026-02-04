
import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSummary from './components/CartSummary';
import Footer from './components/Footer';
import { PRODUCTS } from './constants';
import { CartItem } from './types';

const App: React.FC = () => {
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCartQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  }, []);

  const cartItems = useMemo((): CartItem[] => {
    const items: CartItem[] = [];
    
    PRODUCTS.forEach(product => {
      if (product.variants) {
        product.variants.forEach(variant => {
          const qty = cartQuantities[variant.id] || 0;
          if (qty > 0) {
            items.push({
              ...product,
              id: variant.id,
              name: `${product.name} (${variant.label})`,
              price: variant.price,
              quantity: qty
            });
          }
        });
      } else {
        const qty = cartQuantities[product.id] || 0;
        if (qty > 0) {
          items.push({
            ...product,
            quantity: qty
          });
        }
      }
    });
    
    return items;
  }, [cartQuantities]);

  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        {categories.map(category => (
          <section key={category} className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold text-amber-950 whitespace-nowrap">{category}</h2>
              <div className="h-px bg-amber-200 w-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS
                .filter(p => p.category === category)
                .map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    quantities={cartQuantities}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))
              }
            </div>
          </section>
        ))}

        {cartItems.length === 0 && (
          <div className="text-center py-12 opacity-40">
            <p className="text-lg italic text-amber-900">Selecione as quantidades acima para montar seu pedido.</p>
          </div>
        )}
      </main>

      <Footer />
      <CartSummary items={cartItems} />
    </div>
  );
};

export default App;
