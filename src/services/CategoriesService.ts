import { errorMessage } from "@/utils/errorMessage";
import axiosInstance from "@/utils/Interceptor";
import { Category } from "@/utils/types/Category";
import { SetStateAction } from "react";
import { toast } from "react-toastify";

export async function addCategory(
  name: string,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  image: string,
  setCategories: React.Dispatch<SetStateAction<Category[]>>,
  closeModal?: () => void
) {
  setLoading(true);
  try {
    const response = await axiosInstance.post("/categories", {
      name: name,
      image: image,
    });
    if (response.status === 201) {
      setCategories((prev) => [...prev, response.data]);
      toast.success("Category Added");
    }
  } catch (error) {
    errorMessage(error, toast);
  } finally {
    setLoading(false);
    if (closeModal) {
      closeModal();
    }
  }
}

export async function fetchCategories(
  setCategories: React.Dispatch<SetStateAction<Category[]>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>
) {
  try {
    const response = await axiosInstance.get("/categories");
    if (response.status === 200) {
      setCategories(response.data);
    }
  } catch (error) {
    errorMessage(error, toast);
  } finally {
    setLoading(false);
  }
}

export async function deleteCategory(
  id: number,
  categories: Category[],
  setCategories: React.Dispatch<SetStateAction<Category[]>>,
  closeModal: () => void
) {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    if (response.status === 200) {
      setCategories(categories.filter((item) => item.id !== id));
    }
  } catch (error: unknown) {
    errorMessage(error, toast);
  } finally {
    closeModal();
  }
}

export async function updateCategory(
  id: number,
  currentCategory: Category,
  categories: Category[],
  setCategories: React.Dispatch<SetStateAction<Category[]>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>,
  newName?: string,
  newImage?: string
) {
  try {
    setLoading(true);
    const response = await axiosInstance.patch(`/categories/${id}`, {
      name: newName ? newName : currentCategory.name,
      image: newImage ? newImage : currentCategory.image,
    });
    if (response.status === 200) {
      setCategories([
        ...categories.filter((item) => item.id !== id),
        response.data,
      ]);
    }
  } catch (error) {
    errorMessage(error, toast);
  } finally {
    setLoading(false);
  }
}
