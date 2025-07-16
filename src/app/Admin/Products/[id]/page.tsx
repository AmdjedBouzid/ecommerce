import React from "react";
import ProductDetails from "@/app/components/Admin/pages/ProductDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

// ✅ Server component — async recommended for future use
export default async function ProductDetailsPage({ params }: PageProps) {
  const productId = await parseInt((await params).id, 10);
  return <ProductDetails productId={productId} />;
}
