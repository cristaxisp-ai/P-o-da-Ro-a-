
import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
  onDelete?: (productId: string) => void;
  editProduct?: Product | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAdd, onDelete, editProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Pães');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setDescription(editProduct.description);
      setPrice(editProduct.price.toFixed(2).replace('.', ','));
      setCategory(editProduct.category);
      setImage(editProduct.imageUrl);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategory('Pães');
      setImage(null);
    }
  }, [editProduct, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert("Por favor, preencha o nome, preço e adicione uma foto.");
      return;
    }

    const newProduct: Product = {
      id: editProduct ? editProduct.id : `custom-${Date.now()}`,
      name,
      description,
      price: parseFloat(price.replace(',', '.')),
      category,
      imageUrl: image
    };

    onAdd(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-amber-950/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border-4 border-orange-100">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-orange-50/50">
          <h2 className="text-2xl font-black text-amber-950">
            {editProduct ? 'Editar Produto' : 'Novo Produto Caseiro'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
            <svg className="w-6 h-6 text-amber-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`aspect-video w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${image ? 'border-orange-300 bg-stone-50' : 'border-stone-300 hover:border-orange-400 bg-stone-50/50'}`}
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover rounded-xl" alt="Produto" />
            ) : (
              <>
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </div>
                <p className="font-bold text-amber-900 text-sm">Adicionar Foto do Produto</p>
                <p className="text-[10px] text-stone-500">Toque para selecionar ou tirar foto</p>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Nome do Produto</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Pão de Milho Quentinho"
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Preço (R$)</label>
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="15,00"
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Categoria</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                >
                  <option>Pães</option>
                  <option>Temperos</option>
                  <option>Chás</option>
                  <option>Sobremesas</option>
                  <option>Outros</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Descrição</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Conte um pouco sobre os ingredientes..."
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none h-20 resize-none"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            {editProduct && onDelete && (
              <button 
                type="button"
                onClick={() => onDelete(editProduct.id)}
                className="flex-1 bg-red-50 text-red-600 border border-red-200 font-bold py-4 rounded-2xl hover:bg-red-100 transition-colors active:scale-[0.98]"
              >
                EXCLUIR
              </button>
            )}
            <button 
              type="submit"
              className={`flex-[2] bg-amber-950 hover:bg-amber-900 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98]`}
            >
              {editProduct ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR AO CARDÁPIO'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
