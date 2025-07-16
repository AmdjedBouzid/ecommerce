import { DeliveryType } from "../enums/DeliveryType";
import { OrderStatus } from "../enums/OrderStatus";

export type Order = {
  id: number;
  items: {
    id: number;
    product: {
      id: number;
      name: string;
      price: string;
      description: string;
      category: {
        id: number;
        name: string;
        image: string;
      };
      images: { id: number; url: string }[];
      stock: number;
      isDeleted: boolean;
    };
    quantity: number;
  }[];
  productsTotal: string;
  total: string;
  withDelivery: boolean;
  deliveryPrice: string;
  state: string;
  municipality: string;
  deliveryCompany: {
    id: number;
    name: string;
  };
  deliveryType: DeliveryType;
  firstName: string;
  familyName: string;
  email: string;
  phoneNumbers: string[];
  status: OrderStatus;
  createdAt: string; // ISO timestamp
  confirmedAt: string | null;
  rejectedAt: string | null;
};
