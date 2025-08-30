export type MenuItem = {
  id: string;
  title: string;
  price: number;
  description?: string;
};
export type Restaurant = {
  id: string;
  name: string;
  category: string;
  image: string;
  menu: MenuItem[];
};
export type User = {
  id: string;
  name: string;
  email: string;
  address?: string;
};
export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};
export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: string;
};
