import { User } from "./user";
import { Product } from "./Product";
import { Category } from "./Category";
import { CartItem } from "./cardItem";

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  Products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;

  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
  buyDirectlyProduct: CartItem | null;
  setBuyDirectlyProduct: React.Dispatch<React.SetStateAction<CartItem | null>>;
};
