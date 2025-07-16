"use client";
import React from "react";
import { Product } from "@/utils/types/Product";
import { handleImageUpload } from "@/services/ProductsService";
interface ProductImagesProps {
  product: Product;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  handleCheckboxChange: (id: number) => void;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  uploadingImage: boolean;
  setUploadingImage: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProductImages({
  product,
  setSelectedImage,
  setShowImage,
  selectedIds,
  handleCheckboxChange,
  setProduct,
  uploadingImage,
  setUploadingImage,
}: ProductImagesProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Product Images
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {product.images.map((image) => (
          <div key={image.id} className="relative">
            <img
              src={image.url}
              alt={`Product ${product.name}`}
              className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                setSelectedImage(image.url);
                setShowImage(true);
              }}
            />

            <input
              type="checkbox"
              checked={selectedIds.includes(image.id)}
              onChange={() => handleCheckboxChange(image.id)}
              className="absolute top-2 right-2 w-5 h-5 accent-red-600 cursor-pointer bg-white border border-gray-300 rounded-md shadow"
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Add New Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleImageUpload(e, product, setProduct, setUploadingImage)
          }
          disabled={uploadingImage}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {uploadingImage && (
          <div className="mt-2 text-sm text-gray-500">Uploading...</div>
        )}
      </div>
    </div>
  );
}

export default ProductImages;
