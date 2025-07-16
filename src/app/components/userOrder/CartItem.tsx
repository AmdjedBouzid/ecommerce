"use client";
import { removeCartItem } from "@/services/cartService";
import { CartItem as Cti } from "@/utils/types/cardItem";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useUser } from "@/context/UserContext";
interface CartItemProps {
  item: Cti;
  handleQuantity: (id: number, n: number) => void;
}
function CartItem({ item, handleQuantity }: CartItemProps) {
  const { setCart, buyDirectlyProduct } = useUser();
  return (
    <li key={item.idProduct} className="flex items-center gap-4 py-4">
      <img
        src={item.image || "/public/assets/defaultUserImg.png"}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
      />
      <div className="flex-1">
        <div className="font-semibold text-gray-900 line-clamp-1">
          {item.name}
        </div>
        <div className="text-primary font-bold mt-1">${item.price}</div>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
            onClick={() => handleQuantity(item.idProduct, -1)}
            disabled={item.quantity === 1}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-2 font-semibold text-gray-800">
            {item.quantity}
          </span>
          <button
            className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
            onClick={() => handleQuantity(item.idProduct, 1)}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {!buyDirectlyProduct && (
        <button
          className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
          onClick={() => removeCartItem(item.idProduct, setCart)}
          aria-label="Remove from cart"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </li>
  );
}

export default CartItem;
