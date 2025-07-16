"use client";
import { Link as LinkType } from "@/utils/types/link";
import { Undo2, Sun, Moon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import XBtn from "../common/XBtn";
import { useUser } from "@/context/UserContext";
import AdminDetails from "./AdminDetails";
import { userRole } from "@/utils/enums/userRoleUnum";
import { AuthButtonTypeProps } from "@/utils/interfaces/AuthButtonProps";
import AuthButton from "./AuthButton";

interface NavBarMobileProps {
  items: LinkType[];
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  authBtnProps?: AuthButtonTypeProps;
}

const slideVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

function NavBarMobile({
  setMobileOpen,
  items,
  authBtnProps,
}: NavBarMobileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setMobileOpen]);

  const handleSectionClick = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };
  let newItems: LinkType[] = [];

  !user
    ? (newItems = [...items, { name: "login", to: "/Login" }])
    : (newItems = items);

  return (
    <motion.div
      ref={ref}
      className="absolute top-0 right-0 bottom-0 w-9/12 bg-white shadow-lg z-50 md:hidden h-screen p-6 flex flex-col gap-8 border-l border-gray-200"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className="h-8 w-full pl-2">
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute left-3 top-3 z-999 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 text-black transition-colors hover:bg-gray-50"
        >
          <XBtn />
        </button>
      </div>

      <ul className="flex flex-col items-center gap-6 py-4">
        {newItems.map((item, key) => (
          <li key={key} className="flex justify-center items-center w-full">
            {item.to.startsWith("#") ? (
              <button
                onClick={() => handleSectionClick(item.to)}
                className="w-full px-4 py-3 text-gray-900 font-medium hover:text-primary transition-colors flex gap-2 items-center justify-center rounded-lg hover:bg-gray-100"
              >
                {item.name}
              </button>
            ) : (
              <Link
                href={item.to}
                className="w-full px-4 py-3 text-gray-900 font-medium hover:text-primary transition-colors flex gap-2 items-center justify-center rounded-lg hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}

        {!window.localStorage.getItem("accessToken") ||
          (window.localStorage.getItem("accessToken") === "" && (
            <AuthButton
              name={authBtnProps?.name || ""}
              handle={authBtnProps?.handle || (() => {})}
            />
          ))}
        <li className="w-full"></li>
        {user && user.role === userRole.ADMIN && (
          <AdminDetails setMobileOpen={setMobileOpen} />
        )}
      </ul>
    </motion.div>
  );
}

export default NavBarMobile;
