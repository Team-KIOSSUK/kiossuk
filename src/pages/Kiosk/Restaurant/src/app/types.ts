export interface MenuItem {
  id: string;
  name: string;
  nameEn?: string;
  nameJa?: string;
  nameZh?: string;
  price: number;
  image: string;
  category: string;
  soldOut?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
