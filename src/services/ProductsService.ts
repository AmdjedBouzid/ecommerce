import { errorMessage } from "@/utils/errorMessage";
import axiosInstance from "@/utils/Interceptor";
import { Product } from "@/utils/types/Product";
import { SetStateAction } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "@/services/claudenary";
export async function getProducts(
  setProducts: React.Dispatch<SetStateAction<Product[]>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>
) {
  try {
    const response = await axiosInstance.get("/products");
    if (response.status === 200) {
      setProducts(response.data.data as Product[]);
    }
  } catch (error) {
    errorMessage(error, toast);
  } finally {
    setLoading(false);
  }
}

export async function getProductById(
  productId: number,
  setProduct: React.Dispatch<SetStateAction<Product | null>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>
) {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    if (response.status === 200) {
      setProduct(response.data as Product);
    }
  } catch (error) {
    errorMessage(error, toast);
  } finally {
    setLoading(false);
  }
}

export async function deleteProduct(
  productId: number,
  setDeleteLoading: React.Dispatch<SetStateAction<boolean>>,
  router: any,
  setProducts: React.Dispatch<SetStateAction<Product[]>>
) {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    if (response.status === 200) {
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      toast.success("Product deleted successfully!");
      router.push("/Admin/Products");
    }
  } catch (error) {
    errorMessage(error, toast);
    throw error;
  } finally {
    setDeleteLoading(false);
  }
}

export const handleDeleteImages = async (
  product: Product | null,
  selectedIds: number[],
  setProduct: React.Dispatch<SetStateAction<Product | null>>,
  setSelectedIds: React.Dispatch<SetStateAction<number[]>>
) => {
  if (!product) return;

  try {
    const response = await axiosInstance.delete(
      `products/images/${product.id}`,
      {
        data: { imageIds: selectedIds },
      }
    );
    if (response.status === 200) {
      const updatedImages = product.images.filter(
        (image) => !selectedIds.includes(image.id)
      );
      setProduct({ ...product, images: updatedImages });
      setSelectedIds([]);
    }

    toast.success("Image deleted successfully!");
  } catch (error) {
    toast.error("Failed to delete image");
  }
};

export const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  product: Product | null,
  setProduct: React.Dispatch<SetStateAction<Product | null>>,
  setUploadingImage: React.Dispatch<SetStateAction<boolean>>
) => {
  if (!e.target.files || !e.target.files[0] || !product) return;

  setUploadingImage(true);
  try {
    const file = e.target.files[0];
    const imageUrl = await uploadImage(file);
    const response = await axiosInstance.post(
      `/products/images/${product.id}`,
      {
        imageUrls: [imageUrl],
      }
    );
    if (response.status === 201) {
      const newImages = response.data as { id: number; url: string }[];

      setProduct((prev) => {
        if (!prev) return null;

        return {
          ...prev,
          images: [...(prev.images || []), ...newImages],
        };
      });
    }

    toast.success("Image added successfully!");
  } catch (error) {
    toast.error("Failed to upload image");
  } finally {
    setUploadingImage(false);
  }
};

export const updateProduct = async (
  productId: number,
  formData: any,
  setProduct: React.Dispatch<SetStateAction<Product | null>>,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  editingLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  editingLoading(true);
  const parsingFormData = {
    price: parseFloat(formData.price),
    stock: parseFloat(formData.stock),
    description: formData.description,
    name: formData.name,
    categoryId: Number(formData.categoryId),
  };

  try {
    const response = await axiosInstance.put(
      `/products/${productId}`,
      parsingFormData
    );

    if (response.status === 200) {
      setEditing(false);
      setProduct(response.data as Product);
      toast.success("Product updated successfully!");
    }
  } catch (error) {
    errorMessage(error, toast);
    throw error;
  } finally {
    editingLoading(false);
  }
};

export const createProduct = async (
  formData: any,
  setProducts: React.Dispatch<SetStateAction<Product[]>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  closeModal?: () => void
) => {
  setLoading(true);
  console.log("formData:", formData);
  const parsingFormData = {
    price: parseFloat(formData.price),
    stock: parseFloat(formData.stock),
    description: formData.description,
    name: formData.name,
    categoryId: Number(formData.categoryId),
    imageUrl: formData.imageUrls,
  };
  console.log("parsingFormData:", parsingFormData);
  try {
    const response = await axiosInstance.post("/products", parsingFormData);
    if (response.status === 201) {
      setProducts((prev) => [...prev, response.data as Product]);
      toast.success("Product created successfully!");
    }
  } catch (error) {
    errorMessage(error, toast);
  } finally {
    setLoading(false);
    if (closeModal) closeModal();
  }
};
export const fetchProduct = async (
  id: number,
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const response = await axiosInstance.get(`/products/${id}`);
    setProduct(response.data);
  } catch (error) {
    errorMessage(error, toast);
  } finally {
    setLoading(false);
  }
};
