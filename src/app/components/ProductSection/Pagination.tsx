import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="flex justify-center gap-1 text-gray-900 dark:text-gray-100">
      <li>
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className="grid size-8 place-content-center rounded border border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
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
          className="grid size-8 place-content-center rounded border border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
