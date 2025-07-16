import React, { useEffect, useState } from "react";
import { Product } from "@/utils/types/Product";
import Label from "../../form/Label";
import Input from "../../form/InputField";
import Button from "../../button/Button";
import Loader from "@/app/components/common/Loader";
import { Category } from "@/utils/types/Category";
import { fetchCategories } from "@/services/CategoriesService";
interface ProductInformationProps {
  product: Product;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: () => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  formData: {
    name: string;
    price: string;
    description: string;
    stock: string;
    categoryId: number;
  };
  setEditingLoading: React.Dispatch<React.SetStateAction<boolean>>;
  editingLoading: boolean;
}

function ProductInformation({
  product,
  editing,
  setEditing,
  handleUpdate,
  setFormData,
  formData,
  setSelectedImage,
  setShowImage,
  editingLoading,
}: ProductInformationProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  useEffect(() => {
    fetchCategories(setCategories, setCategoriesLoading);
  }, []);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Product Information
      </h2>

      <div className="space-y-4">
        <div>
          <Label>Product Name</Label>
          {editing ? (
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Product name"
            />
          ) : (
            <div className="text-gray-800 dark:text-gray-200 font-medium">
              {product.name}
            </div>
          )}
        </div>

        <div>
          <Label>Price</Label>
          {editing ? (
            <Input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              placeholder="Price"
            />
          ) : (
            <div className="text-gray-800 dark:text-gray-200 font-medium">
              ${product.price}
            </div>
          )}
        </div>

        <div>
          <Label>Stock</Label>
          {editing ? (
            <Input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: parseFloat(e.target.value) })
              }
              placeholder="Stock quantity"
            />
          ) : (
            <div className="text-gray-800 dark:text-gray-200 font-medium">
              {product.stock} units
            </div>
          )}
        </div>

        <div>
          <Label>Category</Label>
          {editing ? (
            <select
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-gray-800 dark:text-gray-200 font-medium">
                {product.category.name}
              </div>
              <img
                src={product.category.image}
                alt={product.category.name}
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                onClick={() => {
                  setSelectedImage(product.category.image);
                  setShowImage(true);
                }}
              />
            </div>
          )}
        </div>

        <div>
          <Label>Description</Label>
          {editing ? (
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Product description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={4}
            />
          ) : (
            <div className="text-gray-800 dark:text-gray-200">
              {product.description}
            </div>
          )}
        </div>

        {editing && (
          <div className="flex gap-3 pt-4">
            <Button
              disabled={editingLoading}
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {editingLoading ? <Loader /> : "Update Product"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setEditing(false)}
              disabled={editingLoading}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInformation;
