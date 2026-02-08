
import { Product } from './types';

export const WHATSAPP_NUMBER = "5511989764533";

export const PRODUCTS: Product[] = [
  {
    id: 'pao-tradicional',
    name: 'Pão de Lenha Tradicional',
    description: 'Assado lentamente em forno de barro, com crosta rústica e miolo super macio.',
    price: 15.00,
    category: 'Pães',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pao-doce',
    name: 'Pão Artesanal de Massa Doce',
    description: 'Massa super macia com um toque delicado de baunilha, ideal para o café da tarde.',
    price: 12.00,
    category: 'Pães',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pudim-fazenda',
    name: 'Pudim de Leite Condensado',
    description: 'Receita clássica com textura aveludada e calda de caramelo artesanal.',
    price: 25.00,
    category: 'Sobremesas',
    imageUrl: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mousse-maracuja',
    name: 'Mousse de Maracujá Fresco',
    description: 'A doçura perfeita equilibrada com o azedinho da fruta colhida no pé.',
    price: 7.00,
    category: 'Sobremesas',
    imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cha-quintal',
    name: 'Chá Especial do Quintal',
    description: 'Folhas selecionadas e secas naturalmente, aroma puro do campo.',
    price: 8.50,
    category: 'Chás',
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=600&auto=format&fit=crop'
  }
];
