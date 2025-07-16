"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/app/components/table";
import { Category } from "@/utils/types/Category";
import React, { SetStateAction, useEffect, useState } from "react";
import Button from "../button/Button";
import { Modal } from "../Modals";
import { useModal } from "@/hooks/useModal";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { deleteCategory } from "@/services/CategoriesService";
import AddCategoryModal from "../Modals/AddCategoryModal";
import ShowImage from "../common/ShowImage";
interface CategoryTableProps {
  Categories: Category[];
  setCategories: React.Dispatch<SetStateAction<Category[]>>;
  loading: boolean;
}
function CategoryTable({
  Categories,
  setCategories,
  loading,
}: CategoryTableProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [toDeleteOrUpdate, setToDeleteOrUpdate] = useState(-1);
  const [editOrDelete, setEditOrDelete] = useState<"edit" | "delete" | "">("");
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [showImage, setShowImage] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1000px] max-sm:min-w-[700px]">
          <Table>
            <TableHeader className="border-b border-gray-100">
              <TableRow>
                {["name", "image"].map((title, idx) => (
                  <TableCell
                    key={idx}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100">
              {loading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index}>
                      {Array.from({ length: 4 }).map((__, i) => (
                        <TableCell key={i} className="px-5 py-6">
                          <div className="h-4 w-3/4 rounded bg-gray-300 animate-pulse"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : Categories.map((cat) => (
                    <TableRow
                      key={cat.id}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="px-5 py-6 text-start text-sm text-gray-800 align-middle">
                        {cat.name}
                      </TableCell>

                      <TableCell className="px-5 py-6 text-start align-middle">
                        <img
                          src={cat.image}
                          alt="Category"
                          className="h-[60px] w-[60px] rounded-full object-cover border border-gray-300"
                          onClick={() => {
                            setShowImage(true);
                            setCurrentCategory(cat);
                          }}
                        />
                      </TableCell>

                      <TableCell className="">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setToDeleteOrUpdate(cat.id);
                            setCurrentCategory(cat);
                            openModal();
                          }}
                        >
                          Update
                        </Button>
                      </TableCell>

                      <TableCell className="pl-4">
                        <Button
                          size="sm"
                          onClick={() => {
                            setEditOrDelete("delete");
                            setToDeleteOrUpdate(cat.id);
                            openModal();
                          }}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              {showImage && currentCategory && (
                <ShowImage
                  imageUrl={currentCategory.image}
                  setShowImage={setShowImage}
                />
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {editOrDelete === "delete" ? (
          <ConfirmationModal
            text="do you won to delete this category "
            onOk={() =>
              deleteCategory(
                toDeleteOrUpdate,
                Categories,
                setCategories,
                closeModal
              )
            }
            onCancel={closeModal}
            cancelText="cancel"
            action="delete"
            okText="delete"
          />
        ) : (
          <AddCategoryModal
            closeModal={closeModal}
            action="edit"
            setCategories={setCategories}
            currentCategory={currentCategory}
            categories={Categories}
          />
        )}
      </Modal>
    </div>
  );
}

export default CategoryTable;
