import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
}

const Label: FC<LabelProps> = ({ htmlFor, children, className, required = false }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        // Default classes that apply by default
        "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1",

        // User-defined className that can override the default margin
        className
      )}
    >
      {children}
      {required && (
        <span className="text-red-500 text-lg leading-none">*</span>
      )}
    </label>
  );
};

export default Label;
