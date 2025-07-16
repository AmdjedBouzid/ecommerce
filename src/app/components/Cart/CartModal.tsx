import React, { useEffect, useRef, useState } from "react";
import { Product } from "@/utils/types/Product";
import { X, Trash2 } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { CartItem } from "@/utils/types/cardItem";
import { removeCartItem } from "@/services/cartService";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cart, setCart, setBuyDirectlyProduct } = useUser();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();
  const handleConfirm = () => {
    setBuyDirectlyProduct(null);
    router.push("/order");
    onClose();
  };
  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-16 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fade-in"
      style={{ minWidth: 320 }}
    >
      {/* Arrow */}
      <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45 z-10"></div>
      <div className="p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            Your cart is empty.
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto mb-4">
              {cart.map((item) => (
                <li
                  key={item.idProduct}
                  className={`flex items-center gap-4 py-4 transition-opacity duration-300 ${
                    deletingId === item.idProduct
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <img
                    src={item.image || "/public/assets/defaultUserImg.png"}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 line-clamp-1">
                      {item.name}
                    </div>
                    <div className="text-primary font-bold mt-1">
                      ${item.price}
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => removeCartItem(item.idProduct, setCart)}
                    aria-label="Remove from cart"
                    disabled={deletingId === item.idProduct || confirming}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 mt-2 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              onClick={handleConfirm}
              disabled={confirming || deletingId !== null}
            >
              {confirming ? "Redirecting..." : "Confirm"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
