"use client";
import { OrderStatus } from "@/utils/enums/OrderStatus";
import { errorMessage } from "@/utils/errorMessage";
import axiosInstance from "@/utils/Interceptor";
import { Order } from "@/utils/types/Order";
import {
  CheckCircle,
  Mail,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import React, { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";
import { data } from "framer-motion/client";
interface FilterOrdersProps {
  filteredOrders: Order[];
  statusLabels: any;
  handleStatus: (id: number, status: OrderStatus) => void;
  setOrders: React.Dispatch<SetStateAction<Order[]>>;
}
function FilterOrders({
  filteredOrders,
  statusLabels,
  handleStatus,
  setOrders,
}: FilterOrdersProps) {
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const handleAccept = async (id: number) => {
    try {
      setAcceptLoading(true);
      const response = await axiosInstance.post(`/orders/accept/${id}`, {
        status: "accept_by_admin",
      });
      setOrders((prevOrders) => [
        ...prevOrders.filter((order) => order.id !== id),
        response.data,
      ]);
    } catch (error) {
      errorMessage(error, toast);
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleReject = async (id: number) => {
    try {
      setRejectLoading(true);
      const response = await axiosInstance.post(`/orders/reject/${id}`, {
        status: "rejected_by_admin",
      });
      handleStatus(id, OrderStatus.REJECTED_BY_ADMIN);
      setOrders((prevOrders) => [
        ...prevOrders.filter((order) => order.id !== id),
        response.data,
      ]);
    } catch (error) {
      errorMessage(error, toast);
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {filteredOrders.map((order) => (
        <div
          key={order?.id}
          className="bg-white rounded-xl shadow p-6 border border-gray-100"
        >
          {/* Order Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg text-gray-900">
                Order #{order?.id}
              </span>
              <span
                className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700`}
              >
                {statusLabels[order?.status]}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(order?.createdAt).toLocaleString()}
            </div>
          </div>

          {/* Customer Info */}
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex items-center gap-2 min-w-[180px]">
              <User className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-800">
                {order?.firstName} {order?.familyName}
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-[180px]">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{order?.email}</span>
            </div>
            <div className="flex items-center gap-2 min-w-[140px]">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">
                {order?.phoneNumbers && order?.phoneNumbers?.length > 0
                  ? order.phoneNumbers.join(", ")
                  : "-"}
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-[140px]">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">
                {order?.state}
                {order?.municipality ? `, ${order?.municipality}` : ""}
              </span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex items-center gap-2 min-w-[120px]">
              <Truck className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">
                {order.withDelivery ? "With Delivery" : "Pickup"}
              </span>
            </div>
            {order.withDelivery && (
              <>
                <div className="flex items-center gap-2 min-w-[120px]">
                  <span className="text-gray-700">
                    Price: ${order?.deliveryPrice}
                  </span>
                </div>
                <div className="flex items-center gap-2 min-w-[120px]">
                  <span className="text-gray-700">
                    Company: {order?.deliveryCompany?.name} (ID:{" "}
                    {order?.deliveryCompany?.id})
                  </span>
                </div>
                <div className="flex items-center gap-2 min-w-[120px]">
                  <span className="text-gray-700">
                    Type: {order?.deliveryType}
                  </span>
                </div>
                {order?.confirmedAt ? (
                  `Date Of Confirmation :${new Date(
                    order?.confirmedAt
                  ).toLocaleString()}`
                ) : (
                  <></>
                )}
                {order?.rejectedAt ? (
                  `Date Of Confirmation :${new Date(
                    order?.rejectedAt
                  ).toLocaleString()}`
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          {/* Items */}
          <div className="mb-4">
            <div className="font-semibold text-gray-800 mb-2">Items:</div>
            <ul className="divide-y divide-gray-100">
              {order?.items?.map((item) => (
                <li key={item?.id} className="flex items-center gap-4 py-2">
                  <img
                    src={
                      item?.product?.images?.[0]?.url ||
                      "https://via.placeholder.com/48x48"
                    }
                    alt={item?.product?.name || "N/A"}
                    className="w-12 h-12 object-cover rounded border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {item?.product?.name || "N/A"}
                    </div>
                    <div className="text-primary font-bold">
                      ${item?.product?.price || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Qty: {item?.quantity}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Totals */}
          <div className="mb-4 flex gap-8">
            <div className="text-gray-700 font-semibold">
              Products Total:{" "}
              <span className="text-primary">${order.productsTotal}</span>
            </div>
            <div className="text-gray-700 font-semibold">
              Order Total: <span className="text-primary">${order.total}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {order.status === OrderStatus.WAITING && (
            <div className="flex gap-4 mt-4">
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
                onClick={() => handleAccept(order.id)}
                disabled={acceptLoading || rejectLoading}
              >
                <CheckCircle className="w-5 h-5" />{" "}
                {acceptLoading ? <Loader /> : "Accept"}
              </button>
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                disabled={acceptLoading || rejectLoading}
                onClick={() => handleReject(order.id)}
              >
                <XCircle className="w-5 h-5" />{" "}
                {rejectLoading ? <Loader /> : "Reject"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FilterOrders;
