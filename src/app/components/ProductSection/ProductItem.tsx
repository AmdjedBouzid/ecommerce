"use client";
import React from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { addToCartItem } from "@/services/cartService";
interface ProductItemProps {
  id: number;
  name?: string;
  price?: number;
  category?: string;
  image?: string;
}

function ProductItem({ id, name, price, category, image }: ProductItemProps) {
  const { setCart } = useUser();
  const router = useRouter();
  return (
    <div className="product-card group relative bg-white rounded-lg shadow-ecommerce hover:shadow-ecommerce-hover transition-all duration-300 overflow-hidden border border-gray-100 animate-fade-in min-h-[200px] sm:min-h-[260px]">
      {/* Product Image */}
      <div className="relative w-full h-24 sm:h-36 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={image || "https://via.placeholder.com/300x200"}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="flex gap-1 sm:gap-2">
            <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-200 hover-scale">
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button className="p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-200 hover-scale cursor-pointer">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-1.5 sm:p-3">
        {/* Category */}
        <div className="mb-0.5 sm:mb-1">
          <span className="text-[9px] sm:text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-xs sm:text-base text-gray-900 mb-0.5 sm:mb-1 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-base sm:text-lg font-bold text-primary">${price}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 sm:gap-2">
          <button
            className="flex-1 bg-primary text-white py-1 sm:py-1.5 px-1.5 sm:px-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer text-[10px] sm:text-xs"
            onClick={() =>
              addToCartItem(
                {
                  idProduct: id,
                  name: name || "",
                  price: price || 0,
                  category: category || "",
                  image: image || "",
                  quantity: 1,
                },
                setCart
              )
            }
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            Add to Cart
          </button>
          <button
            className="bg-secondary text-white py-1 sm:py-1.5 px-1.5 sm:px-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer text-[10px] sm:text-xs"
            onClick={() => router.push(`/ProductDetailles/${id}`)}
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
