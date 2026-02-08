import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSummary from './components/CartSummary';
import Footer from './components/Footer';
import ImageEditorModal from './components/ImageEditorModal';
import AddProductModal from './components/AddProductModal';
import { PRODUCTS } from './constants';
import { CartItem, Product } from './types';

const App: React.FC = () => {
  const [localProducts, setLocalProducts] = useState<Product[]>(PRODUCTS);
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editorInitialImage, setEditorInitialImage] = useState<string | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

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

  // Define a custom order for categories if needed, otherwise use natural order
  const categoryOrder = ['Pães', 'Sobremesas', 'Temperos', 'Chás', 'Outros'];
  const categories = Array.from(new Set(localProducts.map(p => p.category)))
    // Fixed: Explicitly typed 'a' and 'b' as strings to prevent 'unknown' errors during sorting
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

        {cartItems.length === 0 && localProducts.length === 0 && (
          <div className="text-center py-12 opacity-40">
            <p className="text-lg italic text-amber-900">Seu cardápio está vazio. Adicione seu primeiro produto!</p>
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
        editProduct={productToEdit}
      />
    </div>
  );
};

export default App;