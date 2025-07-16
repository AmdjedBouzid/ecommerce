import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Category } from "@/utils/types/Category";
import CategoriesFilter from "./CategoriesFilter";
import SearchBar from "./SearchBar";
interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
function SearchAndFilters({
  searchTerm,
  setSearchTerm,
}: SearchAndFiltersProps) {
  const { categories, setSelectedCategory, selectedCategory } = useUser();
  useEffect(() => {
    setSelectedCategory({
      id: -1,
      name: "All Categories",
      image: "",
    });
  }, []);
  const AllCategories: Category[] = [
    {
      id: -1,
      name: "All Categories",
      image: "",
    },
    ...categories,
  ];

  return (
    <div className="bg-white rounded-2xl shadow-ecommerce p-6 mb-8 animate-slide-in no-scrollbar ">
      <div className="flex flex-col lg:flex-row gap-4 items-center overflow-scroll no-scrollbar">
        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Category Filter Slider */}
        <CategoriesFilter
          AllCategories={AllCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
}

export default SearchAndFilters;
