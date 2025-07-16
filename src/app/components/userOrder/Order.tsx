"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import { Trash2, Minus, Plus } from "lucide-react";
import { removeCartItem } from "@/services/cartService";
import { redirect } from "next/navigation";
import Header from "./Header";
import Cart from "./Cart";
import OrderForm from "./OrderForm";

function Order() {
  // const isBrowser = typeof window !== "undefined";
  // if (!isBrowser) {
  //   redirect("/");
  // }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Header />
      <Cart />
      <OrderForm />
    </div>
  );
}

export default Order;
