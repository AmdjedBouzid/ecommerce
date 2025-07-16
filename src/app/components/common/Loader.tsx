interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loader = ({ size = "md", className = "" }: LoaderProps) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-3",
    lg: "h-8 w-8 border-4",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-gray-200 dark:border-gray-600 border-t-primary dark:border-t-primary`}
      />
    </div>
  );
};

export default Loader;
