import { errorMessage } from "@/utils/errorMessage";
import axiosInstance from "@/utils/Interceptor";
import { Order } from "@/utils/types/Order";
import { SetStateAction } from "react";
import { toast } from "react-toastify";

export const fetchOrders = async (
  setOrders: React.Dispatch<SetStateAction<Order[]>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>
) => {
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
