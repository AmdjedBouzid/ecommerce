import React from "react";
import { useUser } from "@/context/UserContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { removeCartItem } from "@/services/cartService";
import CartItem from "./CartItem";

function CartItems() {
  const { cart, setCart, buyDirectlyProduct, setBuyDirectlyProduct } =
    useUser();
  const handleQuantity = (id: number, delta: number) => {
    if (buyDirectlyProduct) {
      setBuyDirectlyProduct({
        ...buyDirectlyProduct,
        quantity: Math.max(1, (buyDirectlyProduct.quantity || 1) + delta),
      });
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.idProduct === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
      );
    }
  };
  return (
    <ul className="divide-y divide-gray-200">
      {buyDirectlyProduct ? (
        <CartItem item={buyDirectlyProduct} handleQuantity={handleQuantity} />
      ) : (
        cart.map((item) => (
          <CartItem item={item} handleQuantity={handleQuantity} />
        ))
      )}
    </ul>
  );
}

export default CartItems;
