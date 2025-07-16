"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "../../button/AddBtn";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import CategoryTable from "../../table/CategoriesTable";
import { Modal } from "../../Modals";
import AddCategoryModal from "../../Modals/AddCategoryModal";
import { Category } from "@/utils/types/Category";
import { fetchCategories } from "@/services/CategoriesService";

function Categories() {
  const { isOpen, openModal, closeModal } = useModal();
  const [Categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCategories(setCategories, setLoading);
  }, []);
  return (
    <div className="p-6">
      <AddBtn
        startIcon={<Plus className="text-white" />}
        className=""
        onClick={openModal}
      >
        <p className="text-white">Add Category</p>
      </AddBtn>
      <br />
      <br />
      <CategoryTable
        Categories={Categories}
        setCategories={setCategories}
        loading={loading}
      />
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px]">
        <AddCategoryModal
          closeModal={closeModal}
          setCategories={setCategories}
          action="add"
          categories={Categories}
        />
      </Modal>
    </div>
  );
}

export default Categories;
