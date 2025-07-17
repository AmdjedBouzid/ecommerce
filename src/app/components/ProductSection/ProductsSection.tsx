"use client";
import React, { useEffect, useState } from "react";
import { assets } from "../../../../public/assets/assets";
import Pagination from "./Pagination";
import ProductItem from "./ProductItem";
import Header from "./Header";
import SearchAndFilters from "./SearchAndFilters/SearchAndFilters";
import NoProductFound from "./NowProductFound";
import { useUser } from "@/context/UserContext";
import axiosInstance from "@/utils/Interceptor";
import { Product } from "@/utils/types/Product";
import { filter } from "framer-motion/client";

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const { selectedCategory } = useUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products", {
          params: {
            page: currentPage,
            limit: productsPerPage,
            search: searchTerm || undefined,
          },
        });

        setProducts(response.data.data);
        const total = response.data.total;
        setTotalPages(Math.ceil(total / productsPerPage));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm]);
  const filteredProducts = products.filter((product) => {
    if (selectedCategory.id === -1) return true; // Show all products if "All Categories" is selected
    return product.category.id === selectedCategory.id;
  });
  return (
    <section
      id="products"
      className="w-full bg-gradient-to-br from-white to-gray-50 py-12 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto" id="top-products">
        <Header />
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`animate-stagger-${Math.min(index + 1, 5)}`}
            >
              <ProductItem
                id={product.id}
                name={product.name}
                price={product.price}
                category={product.category.name}
                image={product.images?.[0]?.url || assets.bannerImg.src}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && <NoProductFound />}

        {filteredProducts.length > 0 && filteredProducts.length > 0 && (
          <div className="mt-12 animate-fade-in">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);

                const element = document.getElementById("top-products");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
