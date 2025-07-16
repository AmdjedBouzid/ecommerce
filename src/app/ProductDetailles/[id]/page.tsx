import ProductDetails from "@/app/components/ProductDetails/ProductDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <ProductDetails productId={id} />;
}
