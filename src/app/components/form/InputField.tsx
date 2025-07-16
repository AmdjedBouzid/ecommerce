import type React from "react";
import type { FC } from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  label?: string;
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  label,
}) => {
  let inputClasses = `w-full px-4 py-3 text-sm border-2 rounded-xl transition-all duration-200 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${className}`;

  if (disabled) {
    inputClasses += ` bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600`;
  } else if (error) {
    inputClasses += ` border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600 dark:focus:border-red-400`;
  } else if (success) {
    inputClasses += ` border-green-300 focus:border-green-500 focus:ring-green-500/20 dark:border-green-600 dark:focus:border-green-400`;
  } else {
    inputClasses += ` bg-white text-gray-900 border-gray-200 focus:border-primary focus:ring-primary/20 hover:border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:border-primary dark:hover:border-gray-500`;
  }

  return (
    <div className="relative">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />

      {hint && (
        <p
          className={`mt-2 text-xs font-medium ${
            error
              ? "text-red-500"
              : success
              ? "text-green-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
