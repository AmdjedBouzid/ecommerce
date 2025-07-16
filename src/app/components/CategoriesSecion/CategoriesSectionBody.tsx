import React from "react";
import CategoryItem from "./CategoryItem";
import { assets } from "../../../../public/assets/assets";
import { useUser } from "@/context/UserContext";

function CategoriesSectionBody() {
  const { categories } = useUser();

  return (
    <div className="flex flex-wrap justify-center gap-6 ">
      {categories.map((category, index) => (
        <div key={index}>
          <CategoryItem name={category.name} image={category.image} />
        </div>
      ))}
    </div>
  );
}

export default CategoriesSectionBody;
