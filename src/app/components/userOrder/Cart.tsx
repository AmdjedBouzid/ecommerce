import React from "react";
import { useUser } from "@/context/UserContext";
import CartItem from "./CartItems";

function Cart() {
  const { cart, setCart, buyDirectlyProduct } = useUser();
  return (
    <div className="mb-10 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Order Items</h2>
      {cart.length === 0 && !buyDirectlyProduct ? (
        <div className="text-gray-500">Your cart is empty.</div>
      ) : (
        <CartItem />
      )}
      Total Price: $
      {buyDirectlyProduct
        ? (buyDirectlyProduct.price * buyDirectlyProduct.quantity).toFixed(2)
        : cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
    </div>
  );
}

export default Cart;
