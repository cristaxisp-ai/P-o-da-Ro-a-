
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price.toString());
      setImageUrl(productToEdit.imageUrl);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !imageUrl) {
      alert("Por favor, preencha nome, preço e adicione uma foto.");
      return;
    }

    const product: Product = {
      id: productToEdit?.id || Date.now().toString(),
      name,
      description,
      price: parseFloat(price.replace(',', '.')),
      category: 'Geral',
      imageUrl,
    };

    onSave(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-amber-950/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-amber-50">
          <h2 className="text-xl font-bold text-amber-950">
            {productToEdit ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-amber-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Nome do Produto</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Ex: Pão de Milho Caseiro"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Descrição</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none h-24 resize-none"
              placeholder="Descreva os detalhes e o sabor..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Preço (R$)</label>
            <input 
              type="text" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="0,00"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Foto do Produto</label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="w-20 h-20 rounded-xl bg-stone-100 border-2 border-dashed border-stone-300 overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                )}
              </div>
              <label className="cursor-pointer bg-white border border-amber-900 text-amber-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-amber-50 transition-colors">
                Escolher Foto
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 bg-amber-950 text-white font-bold rounded-2xl shadow-lg hover:bg-amber-900 active:scale-[0.98] transition-all"
            >
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
