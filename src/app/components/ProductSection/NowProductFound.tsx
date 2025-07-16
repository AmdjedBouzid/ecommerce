import { Search } from "lucide-react";
import React from "react";

function NoProductFound() {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-gray-600">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
}

export default NoProductFound;
