import { Minus, Plus } from "lucide-react";
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="flex justify-center gap-1 text-gray-900">
      <li>
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 cursor-pointer"
          aria-label="Previous page"
        >
          <Minus />
        </button>
      </li>

      {pages.map((page) => (
        <li key={page}>
          <button
            onClick={() => onPageChange(page)}
            className={`block size-8 rounded border text-center text-sm/8 font-medium transition-colors cursor-pointer ${
              page === currentPage
                ? "border-primary bg-primary text-white"
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        </li>
      ))}

      <li>
        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 cursor-pointer"
          aria-label="Next page"
        >
          <Plus />
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
