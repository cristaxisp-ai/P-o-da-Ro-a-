
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSummary from './components/CartSummary';
import Footer from './components/Footer';
import ImageEditorModal from './components/ImageEditorModal';
import AddProductModal from './components/AddProductModal';
import { PRODUCTS } from './constants';
import { CartItem, Product } from './types';

const STORAGE_KEY_PRODUCTS = 'pao_da_roca_products';
const STORAGE_KEY_CART = 'pao_da_roca_cart';

const App: React.FC = () => {
  // Inicializa o estado a partir do localStorage ou dos produtos padrão
  const [localProducts, setLocalProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CART);
    return saved ? JSON.parse(saved) : {};
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editorInitialImage, setEditorInitialImage] = useState<string | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Persiste produtos sempre que houver alteração
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(localProducts));
  }, [localProducts]);

  // Persiste carrinho sempre que houver alteração
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

  const handleOpenEditor = (imageUrl?: string) => {
    setEditorInitialImage(imageUrl || null);
    setIsEditorOpen(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsAddProductOpen(true);
  };

  const handleAddOrUpdateProduct = (product: Product) => {
    setLocalProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? product : p);
      }
      return [product, ...prev];
    });
    setProductToEdit(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Tem certeza que deseja remover este item do cardápio?")) {
      setLocalProducts(prev => prev.filter(p => p.id !== productId));
      setProductToEdit(null);
      setIsAddProductOpen(false);
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm("Deseja resetar o cardápio para os produtos originais? Isso apagará suas edições personalizadas.")) {
      localStorage.removeItem(STORAGE_KEY_PRODUCTS);
      setLocalProducts(PRODUCTS);
    }
  };

  const handleCloseAddModal = () => {
    setIsAddProductOpen(false);
    setProductToEdit(null);
  };

  const cartItems = useMemo((): CartItem[] => {
    const items: CartItem[] = [];
    
    localProducts.forEach(product => {
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
  }, [cartQuantities, localProducts]);

  const categoryOrder = ['Pães', 'Sobremesas', 'Temperos', 'Chás', 'Outros'];
  const categories = Array.from(new Set(localProducts.map(p => p.category)))
    .sort((a: string, b: string) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onOpenEditor={() => handleOpenEditor()} 
        onOpenAddProduct={() => setIsAddProductOpen(true)}
        onResetCatalog={handleResetCatalog}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        {categories.map(category => (
          <section key={category} className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <h2 className="text-2xl font-bold text-amber-950 whitespace-nowrap">{category}</h2>
              <div className="h-px bg-amber-200 w-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {localProducts
                .filter(p => p.category === category)
                .map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    quantities={cartQuantities}
                    onUpdateQuantity={handleUpdateQuantity}
                    onEditImage={handleOpenEditor}
                    onEditProduct={handleOpenEditProduct}
                  />
                ))
              }
            </div>
          </section>
        ))}

        {localProducts.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-amber-200 rounded-3xl bg-amber-50/30">
            <div className="w-16 h-16 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <p className="text-xl font-bold text-amber-900">Cardápio Vazio</p>
            <p className="text-sm text-amber-800/60 mt-2 px-10">Toque no botão de "+" lá no topo para começar a cadastrar suas delícias caseiras.</p>
          </div>
        )}
      </main>

      <Footer />
      <CartSummary items={cartItems} />
      
      <ImageEditorModal 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        initialImage={editorInitialImage}
      />

      <AddProductModal 
        isOpen={isAddProductOpen} 
        onClose={handleCloseAddModal}
        onAdd={handleAddOrUpdateProduct}
        onDelete={handleDeleteProduct}
        editProduct={productToEdit}
      />
    </div>
  );
};

export default App;
