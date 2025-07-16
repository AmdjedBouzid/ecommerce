export type CartItem = {
  idProduct: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number; // Optional, can be used to track quantity in cart
};
