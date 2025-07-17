"use client";
import { useEffect, useState } from "react";
import React from "react";
import { Product } from "@/utils/types/Product";
import { getProductById } from "@/services/ProductsService";
import DetailsSpinner from "@/app/components/Admin/AdminProductDetails/DetailsSpinner";
import ProductNotFound from "@/app/components/Admin/AdminProductDetails/ProductNotFound";
import { useUser } from "@/context/UserContext";
import { addToCartItem } from "@/services/cartService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ShowImage from "../common/ShowImage";
import { tree } from "next/dist/build/templates/app-page";
interface ProductDetailsPageProps {
  productId: string;
}
function ProductDetails({ productId }: ProductDetailsPageProps) {
  const id = Number(productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showImage, setShowImage] = useState(false);
  const [showImageUrl, setShowImageUrl] = useState("");
  const { setCart, setBuyDirectlyProduct } = useUser();
  useEffect(() => {
    if (id) {
      const productId = Number(id);
      if (!isNaN(productId)) {
        getProductById(productId, setProduct, setLoading);
      }
    }
  }, [id]);

  if (loading) {
    return <DetailsSpinner />;
  }

  if (!product) {
    return <ProductNotFound path="/" />;
  }
  return (
    <section className="w-full bg-[#f8f9fa] py-8 px-4 sm:px-6 md:px-12 flex flex-col md:flex-row gap-12 min-h-[80vh]">
      {/* Left: Images */}
      <div className="flex-1 max-w-md sm:max-w-lg mx-auto md:mx-0 w-full">
        <div className="mt-8 mb-8">
          <Link href="/">
            <button className="px-6 py-3 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-colors duration-200 shadow-sm cursor-pointer">
              ← Back to Home
            </button>
          </Link>
        </div>
        <div
          className="bg-white rounded-2xl flex items-center justify-center mb-6 aspect-square overflow-hidden border border-gray-200 shadow-md cursor-pointer"
          onClick={() => {
            setShowImage(true),
              setShowImageUrl(product.images[selectedImage].url);
          }}
        >
          <img
            src={
              typeof product?.images[selectedImage] === "string"
                ? product?.images[selectedImage]
                : typeof product?.images[selectedImage] === "object" &&
                  product?.images[selectedImage]?.url
                ? product?.images[selectedImage]?.url
                : "https://via.placeholder.com/300x300"
            }
            alt={product?.name}
            className="object-contain w-full h-full max-h-[420px] transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex-1 max-w-md sm:max-w-xl mx-auto md:mx-0 flex flex-col gap-6 w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">
              {product?.name}
            </h2>
            <p className="text-gray-600 mb-4 max-w-md text-base sm:text-lg leading-relaxed">
              {product?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-primary">
            ${product?.price ? product.price : "0.00"}
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4 w-full">
            <button
              className="w-full sm:w-1/2 py-3 rounded-lg border-2 border-primary text-primary font-semibold text-lg bg-white hover:bg-primary hover:text-white transition-colors duration-200 shadow-sm cursor-pointer"
              onClick={() => {
                setBuyDirectlyProduct({
                  idProduct: product.id,
                  name: product.name || "",
                  price: product.price || 0,
                  category: product.category.name || "",
                  image: product.images[0].url || "",
                  quantity: 1,
                });
                router.push("/order");
              }}
            >
              Buy Now
            </button>
            <button
              className="w-full sm:w-1/2 py-3 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-colors duration-200 shadow-sm cursor-pointer"
              onClick={() =>
                addToCartItem(
                  {
                    idProduct: product.id,
                    name: product.name || "",
                    price: product.price || 0,
                    category: product.category.name || "",
                    image: product.images[0].url || "",
                    quantity: 1,
                  },
                  setCart
                )
              }
            >
              Add to Cart
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-4 cursor-pointer">
            {product?.images.map((img, idx) => (
              <button
                key={idx}
                className={`rounded-xl border-2 p-1 aspect-square w-16 h-16 flex items-center justify-center transition-all duration-200 shadow-sm ${
                  selectedImage === idx
                    ? "border-primary ring-2 ring-primary"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(idx)}
                aria-label={`Select image ${idx + 1}`}
              >
                <img
                  src={typeof img === "string" ? img : img?.url}
                  alt="thumb"
                  className="object-contain w-full h-full rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      {showImage && (
        <ShowImage imageUrl={showImageUrl} setShowImage={setShowImage} />
      )}
    </section>
  );
}

export default ProductDetails;
