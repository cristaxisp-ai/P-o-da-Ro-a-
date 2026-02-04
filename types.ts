
export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  variants?: ProductVariant[];
}

export interface CartItem extends Product {
  quantity: number;
}
