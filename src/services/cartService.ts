import { CartItem } from "@/utils/types/cardItem";
import React from "react";
import { toast } from "react-toastify";

export function addToCartItem(
  item: CartItem,
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
) {
  if (!item || !item.idProduct) {
    toast.error("Invalid item to add to cart");
    return;
  }
  console.log("Adding item to cart:", item);
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const existingItem = cartItems.find(
    (cartItem: CartItem) => cartItem.idProduct === item.idProduct
  );

  if (existingItem) {
    toast.error("Item already in cart");
    return;
  } else {
    cartItems.push(item);
    setCart(cartItems);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
export function getCartItems(
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
) {
  const cartItems = localStorage.getItem("cartItems");
  const parsedItems = cartItems ? JSON.parse(cartItems) : [];
  setCart(parsedItems);
}

export function removeCartItem(
  idProduct: number,
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const updatedCartItems = cartItems.filter(
    (item: CartItem) => item.idProduct !== idProduct
  );
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  setCart(updatedCartItems);
}

export function clearCart(
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
) {
  localStorage.removeItem("cartItems");
  setCart([]);
  toast.success("Order cleared successfully");
}
