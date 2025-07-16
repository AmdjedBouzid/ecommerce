"use client";
import React, { SetStateAction, useRef, useState } from "react";
import Label from "../form/Label";
import Input from "../form/InputField";
import Button from "../button/Button";
import Loader from "../common/Loader";
import AddBtn from "../button/AddBtn";
import { Plus } from "lucide-react";
import XBtn from "../common/XBtn";
import imageCompression from "browser-image-compression";
import { addCategory, updateCategory } from "@/services/CategoriesService";
import { Category } from "@/utils/types/Category";
import { handleFileChange } from "@/services/claudenary";

interface AddCategoryModalProps {
  closeModal: () => void;
  action?: "add" | "edit";
  setCategories: React.Dispatch<SetStateAction<Category[]>>;
  currentCategory?: Category | null;
  categories: Category[];
}

function AddCategoryModal({
  closeModal,
  action,
  setCategories,
  currentCategory,
  categories,
}: AddCategoryModalProps) {
  const [name, setName] = useState(
    currentCategory && action === "edit" ? currentCategory.name : ""
  );
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    currentCategory && action === "edit" ? currentCategory.image : null
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl dark:bg-gray-900">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
          {action === "edit" ? "Edit Category" : "Add Category"}
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          {action === "add" ? (
            <>All inputs are not required</>
          ) : (
            <>Update any field</>
          )}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="h-[350px] overflow-y-auto px-2 pb-3 custom-scrollbar space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Category name */}
            <div className="col-span-2 lg:col-span-1">
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Image upload button */}
            <div className="col-span-2 lg:col-span-1 flex items-end">
              <AddBtn
                startIcon={<Plus color="black" />}
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <p className="text-black font-medium">Add Image</p>
              </AddBtn>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e, setImageUrl, setLoading)}
                hidden
              />
            </div>

            {/* Image preview */}
            <div className="col-span-2 flex items-center justify-center cursor-pointer">
              <div
                className="w-1/2 h-full relative"
                onClick={() => setImageUrl(null)}
              >
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-full h-[120px] object-contain rounded-xl border border-gray-200 dark:border-white/10"
                    />
                    <XBtn className="absolute top-1 right-0" />
                  </>
                ) : (
                  <div className="w-full h-[120px] rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    No image uploaded
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end items-center gap-3 px-2 mt-6">
          <Button
            size="sm"
            variant="outline"
            onClick={closeModal}
            disabled={loading}
          >
            Close
          </Button>
          <Button
            size="sm"
            onClick={async () =>
              currentCategory && action === "edit"
                ? await updateCategory(
                    currentCategory.id,
                    currentCategory,
                    categories,
                    setCategories,
                    setLoading,
                    name,
                    imageUrl || ""
                  )
                : await addCategory(
                    name,
                    setLoading,
                    imageUrl || "",
                    setCategories,
                    closeModal
                  )
            }
            disabled={loading}
            className="text-black"
          >
            {loading ? <Loader /> : action === "add" ? "Add" : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
