import React from "react";

function Header() {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Our
        <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Products
        </span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover our curated collection of premium products.
      </p>
    </div>
  );
}

export default Header;
