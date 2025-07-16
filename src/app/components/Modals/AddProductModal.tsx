import React, { useEffect, useRef, useState } from "react";
import Label from "../form/Label";
import Input from "../form/InputField";
import Button from "../button/Button";
import AddBtn from "../button/AddBtn";
import { Plus, X, Upload } from "lucide-react";
import { handleFileChange } from "@/services/claudenary";
import { Category } from "@/utils/types/Category";
import { Product } from "@/utils/types/Product";
import { fetchCategories } from "@/services/CategoriesService";
import Loader from "../common/Loader";
import { createProduct } from "@/services/ProductsService";
import XBtn from "../common/XBtn";

interface AddProductModalProps {
  closeModal: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

function AddProductModal({ setProducts, closeModal }: AddProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<number>(-1);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileChange(
      e,
      (url) => {
        if (url) {
          setImageUrls((prev) => [...prev, url]);
        }
      },
      setLoading
    );
  };

  useEffect(() => {
    fetchCategories(setCategories, setCategoriesLoading);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  return (
    <div className="relative w-full max-w-[800px] overflow-hidden rounded-3xl bg-white :bg-gray-900 shadow-2xl border border-gray-100 :border-gray-700">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-2xl font-bold mb-1">Add New Product</h4>
            <p className="text-white/90 text-sm">
              Fill in the product details below to create a new listing.
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Name */}
            <div className="lg:col-span-1">
              <Input
                label="Product Name"
                type="text"
                value={name}
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Price */}
            <div className="lg:col-span-1">
              <Input
                label="Price"
                type="number"
                value={price}
                placeholder="0.00"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <Input
                label="Description"
                type="text"
                value={description}
                placeholder="Enter product description"
                className="h-24"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 :text-gray-300">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 :bg-gray-800 :border-gray-600 :text-white"
              >
                {categoriesLoading ? (
                  <option>Loading categories...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Stock */}
            <div className="lg:col-span-1">
              <Input
                label="Stock Quantity"
                type="number"
                value={stock}
                placeholder="0"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {/* Image upload section */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3 :text-gray-300">
                Product Images
              </label>

              {/* Upload Button */}
              <div className="mb-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-gray-50 :hover:bg-gray-800 transition-all duration-200 flex flex-col items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 :text-gray-400">
                    {loading ? "Uploading..." : "Click to upload images"}
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  onChange={onFileChange}
                  accept="image/*"
                  multiple
                />
              </div>

              {/* Image Preview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imageUrls.length === 0 ? (
                  <div className="col-span-full h-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 :border-gray-600">
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">No images uploaded</p>
                    </div>
                  </div>
                ) : (
                  imageUrls.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={url}
                        alt={`Product image ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-xl border-2 border-gray-200 :border-gray-600 group-hover:border-primary transition-colors duration-200"
                      />
                      <button
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        onClick={() =>
                          setImageUrls((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-200 :border-gray-700">
          <Button
            size="md"
            variant="outline"
            disabled={loading}
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            size="md"
            disabled={loading}
            onClick={() =>
              createProduct(
                {
                  name,
                  price: parseFloat(price),
                  description,
                  stock: parseInt(stock, 10),
                  categoryId: categoryId,
                  imageUrls: imageUrls,
                },
                setProducts,
                closeModal
              )
            }
          >
            {loading ? <Loader /> : "Create Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
