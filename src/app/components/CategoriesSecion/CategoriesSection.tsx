import React from "react";
import CategoriesHeader from "./CategoriesHeader";
import CategoriesSectionBody from "./CategoriesSectionBody";

function CategoriesSection() {
  return (
    <section id="categories" className="w-full py-16 px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <CategoriesHeader />
        <CategoriesSectionBody />
      </div>
    </section>
  );
}

export default CategoriesSection;
