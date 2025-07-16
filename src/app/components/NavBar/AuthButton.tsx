import { AuthButtonTypeProps } from "@/utils/interfaces/AuthButtonProps";
import React from "react";

const AuthButton = ({ name, handle, icon, className }: AuthButtonTypeProps) => {
  return (
    <button
      className={`w-[130px] h-[40px] transition-colors px-4 rounded-full focus:outline-none flex justify-center items-center cursor-pointer bg-primary text-white font-bold shadow hover:bg-primary/90 dark:shadow-gray-800 ${className}`}
      onClick={handle}
    >
      <div className="flex justify-center items-center gap-1">
        <p>{name}</p>
      </div>
    </button>
  );
};

export default AuthButton;
