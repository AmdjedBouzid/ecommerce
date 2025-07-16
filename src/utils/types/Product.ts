export type Product = {
  id: number;
  name: string;
  price: number; // You can use `number` if it's always parsed, or keep `string` if it comes from the backend as a string
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: {
    id: number;
    url: string;
  }[];
  stock: number;
};
