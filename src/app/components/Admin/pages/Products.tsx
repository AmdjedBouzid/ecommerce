"use client";
import React, { useEffect, useState } from "react";
import AddBtn from "../../button/AddBtn";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import ProductsTable from "../../table/ProductsTable";
import { getProducts } from "@/services/ProductsService";
import { useUser } from "@/context/UserContext";
import { Modal } from "../../Modals";
import AddProductModal from "../../Modals/AddProductModal";
function Products() {
  const { isOpen, openModal, closeModal, toggleModal } = useModal();
  const { Products, setProducts } = useUser();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProducts(setProducts, setLoading);
  }, []);

  return (
    <div className="p-6">
      <AddBtn startIcon={<Plus className="text-white" />} onClick={openModal}>
        {" "}
        <p className="text-white"> Add Product </p>
      </AddBtn>
      <br />
      <br />
      <ProductsTable
        Products={Products}
        setProducts={setProducts}
        loading={loading}
      />
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px]">
        <AddProductModal closeModal={closeModal} setProducts={setProducts} />
      </Modal>
    </div>
  );
}

export default Products;
