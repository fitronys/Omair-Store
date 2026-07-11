export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  image: string;
  category: string;
  variants?: string[];
  optionPrices?: {
    [key: string]: number;
  };
}

export interface CartItem {
  id: string; // unique cart item id (product.id + '-' + selectedSize + '-' + selectedVariant)
  product: Product;
  selectedSize: string;
  selectedVariant?: string;
  priceAtSelection: number;
  quantity: number;
}

export interface CheckoutForm {
  name: string;
  address: string;
  school: string;
  class: string;
}
