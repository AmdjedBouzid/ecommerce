"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/app/components/table";
import { Category } from "@/utils/types/Category";
import React, { SetStateAction, useState } from "react";
import Button from "../button/Button";
import ShowImage from "../common/ShowImage";
import { Product } from "@/utils/types/Product";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2 } from "lucide-react";

interface ProductsTableProps {
  Products: Product[];
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
  loading: boolean;
}

function ProductsTable({ Products, setProducts, loading }: ProductsTableProps) {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [showImage, setShowImage] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1000px] max-sm:min-w-[700px]">
          <Table>
            <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
              <TableRow>
                {["Product", "Category", "Price", "Stock", "Actions"].map(
                  (title, idx) => (
                    <TableCell
                      key={idx}
                      isHeader
                      className="px-6 py-4 font-semibold text-gray-700 text-start text-sm dark:text-gray-300"
                    >
                      {title}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      {Array.from({ length: 5 }).map((__, i) => (
                        <TableCell key={i} className="px-6 py-4">
                          <div className="h-4 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : Array.isArray(Products) &&
                  Products.map((prod) => (
                    <TableRow
                      key={prod.id}
                      className="hover:bg-gray-50  transition-colors duration-200 cursor-pointer group"
                    >
                      <TableCell className="px-6 py-4 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 :bg-gray-600 flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-600 :text-gray-400">
                              {prod.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 :text-white group-hover:text-primary transition-colors duration-200">
                              {prod.name}
                            </h4>
                            <p className="text-sm text-gray-500 :text-gray-400">
                              ID: {prod.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-6 py-4 text-start">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 :bg-blue-900/30 :text-blue-300">
                          {prod.category.name}
                        </span>
                      </TableCell>

                      <TableCell className="px-6 py-4 text-start">
                        <span className="font-semibold text-gray-900 :text-white">
                          ${prod.price}
                        </span>
                      </TableCell>

                      <TableCell className="px-6 py-4 text-start">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              prod.stock > 10
                                ? "bg-green-100 text-green-800 :bg-green-900/30 :text-green-300"
                                : prod.stock > 0
                                ? "bg-yellow-100 text-yellow-800 :bg-yellow-900/30 :text-yellow-300"
                                : "bg-red-100 text-red-800 :bg-red-900/30 :text-red-300"
                            }`}
                          >
                            {prod.stock > 10
                              ? "In Stock"
                              : prod.stock > 0
                              ? "Low Stock"
                              : "Out of Stock"}
                          </span>
                          <span className="text-sm text-gray-600 :text-gray-400">
                            ({prod.stock})
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/Admin/Products/${prod.id}`);
                            }}
                            className="p-2 hover:bg-blue-50 :hover:bg-blue-900/20"
                          >
                            <Eye className="w-4 h-4 text-blue-600 :text-blue-400" />
                          </Button>
                          {/* <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/Admin/Products/${prod.id}`);
                            }}
                            className="p-2 hover:bg-green-50 :hover:bg-green-900/20"
                          >
                            <Edit className="w-4 h-4 text-green-600 :text-green-400" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete
                            }}
                            className="p-2 hover:bg-red-50 :hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </Button> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              {showImage && currentCategory && (
                <ShowImage
                  imageUrl={currentCategory.image}
                  setShowImage={setShowImage}
                />
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ProductsTable;
