import React from "react";

interface ButtonProps {
  children: React.ReactNode; // Button text or content
  size?: "sm" | "md" | "lg"; // Button size
  variant?: "primary" | "outline" | "ghost"; // Button variant
  startIcon?: React.ReactNode; // Icon before the text
  endIcon?: React.ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Additional classes
  fullWidth?: boolean; // Full width button
}

const AddBtn: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  fullWidth = false,
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm font-medium",
    md: "px-4 py-2.5 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:scale-105 disabled:bg-gray-300 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed",
    outline:
      "bg-white text-gray-700 border-2 border-gray-200 hover:border-primary hover:text-primary hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:border-primary dark:hover:text-primary dark:hover:bg-gray-700",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
  };

  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 ease-in-out transform hover:translate-y-[-1px] active:translate-y-0 ${
        fullWidth ? "w-full" : ""
      } ${className} ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default AddBtn;
