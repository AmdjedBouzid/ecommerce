import { OrderStatus } from "@/utils/enums/OrderStatus";
import React, { SetStateAction } from "react";
interface FilterNavBarProps {
  filter: OrderStatus;
  setFilter: React.Dispatch<SetStateAction<OrderStatus>>;
  statusLabels: any;
}
function FilterNavBar({ filter, setFilter, statusLabels }: FilterNavBarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 px-2 overflow-x-auto">
      {Object.keys(statusLabels).map((key) => (
        <button
          key={key}
          className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-full font-semibold text-sm border transition-all duration-200 whitespace-nowrap ${
            filter === key
              ? "bg-primary text-white border-primary shadow"
              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-primary/10 hover:text-primary"
          }`}
          onClick={() => setFilter(key as OrderStatus)}
        >
          {statusLabels[key as keyof typeof statusLabels]}
        </button>
      ))}
    </div>
  );
}

export default FilterNavBar;
