import { Category } from "@/utils/types/Category";
import React from "react";
interface CategoriesFilterProps {
  AllCategories: Category[];
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
}
function CategoriesFilter({
  AllCategories,
  selectedCategory,
  setSelectedCategory,
}: CategoriesFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-scroll scrollbar-hide pb-2 lg:pb-0 w-full "
      style={{ scrollBehavior: "smooth" }}
    >
      {AllCategories.map((category, index) => (
        <button
          key={index}
          onClick={() => setSelectedCategory(category)}
          className={`filter-item px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
            selectedCategory.id === category.id
              ? "bg-primary text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoriesFilter;
