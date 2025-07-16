// src/context/UserContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  use,
} from "react";
import { User } from "@/utils/types/user";
import { UserContextType } from "@/utils/types/UserContextType";
import { getCurrentUser } from "@/services/authService";
import { Product } from "@/utils/types/Product";
import { assets } from "../../public/assets/assets";
import { CartItem } from "@/utils/types/cardItem";
import { Category } from "@/utils/types/Category";
import { fetchCategories } from "@/services/CategoriesService";
import { getCartItems } from "@/services/cartService";
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: -1,
    name: "All Categories",
    image: assets.bannerImg.src,
  });
  useEffect(() => {
    getCurrentUser(setUser, setLoading);
    fetchCategories(setCategories, setLoading);
    getCartItems(setCart);
  }, []);

  const [buyDirectlyProduct, setBuyDirectlyProduct] = useState<CartItem | null>(
    null
  );

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        Products,
        setProducts,
        cart,
        setCart,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        buyDirectlyProduct,
        setBuyDirectlyProduct,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
