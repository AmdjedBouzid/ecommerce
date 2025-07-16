"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminRoutes } from "@/utils/constants";

const SideBar = () => {
  const path = usePathname();
  const currentSegment = path.split("/").filter(Boolean).pop();

  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg flex flex-col p-6 gap-6 min-w-[220px] max-sm:hidden fixed top-0 left-0 bottom-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          AMDJED SHOP
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 mt-4">
        {adminRoutes.map((link) => {
          const isActive =
            link.to.split("/").filter(Boolean).pop() === currentSegment;
          return (
            <Link
              key={link.name}
              href={link.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                isActive ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary" : ""
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
