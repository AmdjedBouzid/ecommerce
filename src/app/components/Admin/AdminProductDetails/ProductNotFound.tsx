import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button/Button";
interface ProductNotFoundProps {
  path: string;
}
function ProductNotFound({ path }: ProductNotFoundProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 ">
          Product not found
        </h2>
        <Button onClick={() => router.push(path)}>Back to Products</Button>
      </div>
    </div>
  );
}

export default ProductNotFound;
