import { adminRoutes } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface AdminDetailsProps {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminDetails({ setMobileOpen }: AdminDetailsProps) {
  const path = usePathname();

  return (
    <details className="w-full">
      <summary className="flex gap-2 items-center justify-center px-4 py-3 text-gray-900 dark:text-white font-medium hover:text-primary dark:hover:text-primary transition-colors cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        Admin Panel
      </summary>
      <ul className="flex flex-col gap-2 mt-3 pl-4 text-sm">
        {adminRoutes.map((item, index) => {
          const isActive = path === item.to;

          return (
            <li key={index}>
              <Link
                href={item.to}
                className={`block px-3 py-2 rounded transition-colors ${
                  isActive
                    ? "text-gray-900 dark:text-white font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export default AdminDetails;
