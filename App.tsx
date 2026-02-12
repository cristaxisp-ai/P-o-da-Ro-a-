
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSummary from './components/CartSummary';
import Footer from './components/Footer';
import AddProductModal from './components/AddProductModal';
import { PRODUCTS } from './constants';
import { CartItem, Product } from './types';

const STORAGE_KEY_CART = 'pao_da_roca_cart_v3';
const STORAGE_KEY_PRODUCTS = 'pao_da_roca_products_v3';

const App: React.FC = () => {
  const [localProducts, setLocalProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CART);
    return saved ? JSON.parse(saved) : {};
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(localProducts));
  }, [localProducts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartQuantities));
  }, [cartQuantities]);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCartQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  }, []);

  const handleSaveProduct = (product: Product) => {
    setLocalProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? product : p);
      }
      return [...prev, product];
    });
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      setLocalProducts(prev => prev.filter(p => p.id !== id));
      setCartQuantities(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const cartItems = useMemo((): CartItem[] => {
    return localProducts.filter(p => (cartQuantities[p.id] || 0) > 0).map(product => ({
      ...product,
      quantity: cartQuantities[product.id]
    }));
  }, [cartQuantities, localProducts]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-100 selection:text-amber-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8 bg-amber-50 p-6 rounded-3xl border border-amber-100">
          <div>
            <h2 className="text-2xl font-bold text-amber-950">Seu Cardápio</h2>
            <p className="text-sm text-stone-600">Gerencie seus produtos caseiros manualmente.</p>
          </div>
          <button 
            onClick={() => { setEditingProduct(null); setIsAddModalOpen(true); }}
            className="bg-amber-950 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-amber-900 active:scale-95 transition-all flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            <span>Novo Produto</span>
          </button>
        </div>

        {localProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-stone-200">
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-orange-50 rounded-full">
                <svg className="w-12 h-12 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-amber-900">O cardápio está vazio</h3>
            <p className="text-stone-500 mt-2">Clique em "Novo Produto" para começar a vender!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                quantity={cartQuantities[product.id] || 0}
                onUpdateQuantity={handleUpdateQuantity}
                onEdit={() => { setEditingProduct(product); setIsAddModalOpen(true); }}
                onDelete={() => handleDeleteProduct(product.id)}
              />
            ))}
          </div>
        )}

        <div className="mt-16 bg-orange-50 rounded-3xl p-8 border border-orange-100 text-center">
          <h2 className="text-2xl font-bold text-amber-950 mb-2 font-serif italic">Tradição em cada detalhe</h2>
          <p className="text-stone-600 max-w-md mx-auto">
            Todos os produtos são feitos à mão, com ingredientes frescos e o verdadeiro sabor da roça.
          </p>
        </div>
      </main>

      <Footer />
      <CartSummary items={cartItems} />

      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setEditingProduct(null); }}
        onSave={handleSaveProduct}
        productToEdit={editingProduct}
      />
    </div>
  );
};

export default App;
