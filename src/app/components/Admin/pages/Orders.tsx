"use client";
import React, { useEffect, useState } from "react";
import { Order } from "@/utils/types/Order";
import { OrderStatus } from "@/utils/enums/OrderStatus";
import FilterNavBar from "../Orders/FilterNavBar";
import FilterOrders from "../Orders/FilterOrders";
import DetailsSpinner from "../AdminProductDetails/DetailsSpinner";
import axiosInstance from "@/utils/Interceptor";
import { errorMessage } from "@/utils/errorMessage";
import { toast } from "react-toastify";

const statusLabels = {
  [OrderStatus.WAITING]: "Waiting",
  [OrderStatus.CONFIRMED]: "Confirmed",
  [OrderStatus.REJECTED_BY_ADMIN]: "Rejected by Admin",
  [OrderStatus.REJECTED_BY_USER]: "Rejected by User",
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<OrderStatus>(OrderStatus.WAITING);
  const [loading, setLoading] = useState(false);
  const handleStatus = (id: number, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/orders");
        if (response.status === 200) {
          setOrders(response.data.data);
        }
      } catch (error) {
        errorMessage(error, toast);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders?.filter((order) => order.status === filter);
  if (loading) return <DetailsSpinner />;
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Filter Navbar */}
      <FilterNavBar
        filter={filter}
        setFilter={setFilter}
        statusLabels={statusLabels}
      />
      {/* Orders List */}
      {filteredOrders?.length === 0 ? (
        <div className="text-gray-500 text-center py-16">No orders found.</div>
      ) : (
        <FilterOrders
          filteredOrders={filteredOrders || []}
          statusLabels={statusLabels}
          handleStatus={handleStatus}
          setOrders={setOrders}
        />
      )}
    </div>
  );
}

export default Orders;
