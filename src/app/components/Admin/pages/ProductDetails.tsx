"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/utils/types/Product";
import {
  getProductById,
  deleteProduct,
  updateProduct,
} from "@/services/ProductsService";
import { useRouter } from "next/navigation";
import { Modal } from "../../Modals";
import { useModal } from "@/hooks/useModal";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import ShowImage from "../../common/ShowImage";
import DetailsSpinner from "../AdminProductDetails/DetailsSpinner";
import ProductNotFound from "../AdminProductDetails/ProductNotFound";
import { handleDeleteImages } from "@/services/ProductsService";
import Header from "../AdminProductDetails/Header";
import ProductImages from "../AdminProductDetails/ProductImages";
import ProductInformation from "../AdminProductDetails/ProductInformation";
import { useUser } from "@/context/UserContext";
interface ProductDetailsProps {
  productId: number;
}

function ProductDetails({ productId }: ProductDetailsProps) {
  const router = useRouter();
  const { setProducts } = useUser();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editingLoading, setEditingLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryId: -1,
  });
  const handleCheckboxChange = (id: number) => {
    setSelectedIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((i) => i !== id) // Remove if already selected
          : [...prev, id] // Add if not selected
    );
  };

  useEffect(() => {
    if (productId) {
      getProductById(productId, setProduct, setLoading);
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        stock: product.stock.toString(),
        categoryId: product.category.id || -1,
      });
    }
  }, [product]);

  if (loading) {
    return <DetailsSpinner />;
  }

  if (!product) {
    return <ProductNotFound path="/Admin/Products" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto flex flex-wrap">
        <Header
          editing={editing}
          setEditing={setEditing}
          setDeleteConfirm={setDeleteConfirm}
          selectedIds={selectedIds}
          openModal={openModal}
          deleteLoading={deleteLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <ProductImages
            product={product}
            setSelectedImage={setSelectedImage}
            setShowImage={setShowImage}
            selectedIds={selectedIds}
            handleCheckboxChange={handleCheckboxChange}
            setProduct={setProduct}
            uploadingImage={uploadingImage}
            setUploadingImage={setUploadingImage}
            setSelectedIds={setSelectedIds}
          />
          {/* Product Information */}
          <ProductInformation
            product={product}
            editing={editing}
            setEditing={setEditing}
            handleUpdate={() =>
              updateProduct(
                product.id,
                formData,
                setProduct,
                setEditing,
                setEditingLoading
              )
            }
            setFormData={setFormData}
            formData={formData}
            setSelectedImage={setSelectedImage}
            setShowImage={setShowImage}
            setEditingLoading={setEditingLoading}
            editingLoading={editingLoading}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {deleteConfirm ? (
          <ConfirmationModal
            text={`Are you sure you want to delete this ${
              selectedIds.length > 0 ? "images" : "product"
            } ?`}
            onOk={
              selectedIds.length > 0
                ? () =>
                    handleDeleteImages(
                      product,
                      selectedIds,
                      setProduct,
                      setSelectedIds
                    )
                : () =>
                    deleteProduct(
                      product.id,
                      setDeleteLoading,
                      router,
                      setProducts
                    )
            }
            onCancel={closeModal}
            cancelText="Cancel"
            action="delete"
            okText={`Delete ${selectedIds.length > 0 ? "Images" : "Product"}`}
          />
        ) : null}
      </Modal>

      {showImage && (
        <ShowImage imageUrl={selectedImage} setShowImage={setShowImage} />
      )}
    </div>
  );
}

export default ProductDetails;
