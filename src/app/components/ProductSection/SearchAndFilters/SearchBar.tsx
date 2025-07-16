import { Search } from "lucide-react";
import React from "react";
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="w-full lg:w-auto ml-2">
      <div className="relative search-bar">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all duration-200"
        />
      </div>
    </div>
  );
}

export default SearchBar;
