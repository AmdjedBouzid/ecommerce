import React from "react";

function CategoriesHeader() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
        <span>✨</span>
        Popular Categories
      </div>
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Shop by
        <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Category
        </span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Discover our carefully curated categories designed to help you find exactly what you're looking for. 
        From fashion to technology, we've got you covered.
      </p>
    </div>
  );
}

export default CategoriesHeader;
