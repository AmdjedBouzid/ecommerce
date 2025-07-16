import React from "react";
import { ArrowRight } from "lucide-react";

interface CategoryItemProps {
  name: string;
  image: string;
}

function CategoryItem({ name, image }: CategoryItemProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 cursor-pointer">
      {/* Image Container */}
      <div className="relative mb-4">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-100 group-hover:scale-110 transition-transform duration-300">
          <img
            src={image}
            alt={`${name} category`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {/* <ArrowRight className="w-6 h-6 text-white transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300" /> */}
        </div>
      </div>

      {/* Category Name */}
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Explore {name.toLowerCase()}
        </p>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default CategoryItem;
