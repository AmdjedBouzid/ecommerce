"use client";
import React, { useState, useEffect } from "react";
import { DeliveryCompany } from "@/utils/types/DeliveryCompany";
import { deliveryCompany } from "@/utils/constants";
import { DeliveryType } from "@/utils/enums/DeliveryType";
import { useUser } from "@/context/UserContext";
import Loader from "../common/Loader";
import axiosInstance from "@/utils/Interceptor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/services/cartService";
import { errorMessage } from "@/utils/errorMessage";
const deliveryCompanies: DeliveryCompany[] = [deliveryCompany];

function OrderForm() {
  const router = useRouter();
  const { cart, setCart, setBuyDirectlyProduct, buyDirectlyProduct } =
    useUser();
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWithDelivery, setIsWithDelivery] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<
    number | null
  >(null);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    DeliveryType.HOME
  );
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

  const selectedCompany = deliveryCompanies.find(
    (c) => c.id === selectedCompanyId
  );
  const selectedState = selectedCompany?.states.find(
    (s) => s.id === selectedStateId
  );
  const selectedMunicipality = selectedState?.municipalities.find(
    (m) => m.id === selectedMunicipalityId
  );

  useEffect(() => {
    if (selectedMunicipality) {
      setDeliveryPrice(
        deliveryType === DeliveryType.HOME
          ? selectedMunicipality.prices.home
          : selectedMunicipality.prices.deliveryOffice
      );
    }
  }, [selectedMunicipality, deliveryType]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = {
        items: buyDirectlyProduct
          ? [
              {
                productId: buyDirectlyProduct.idProduct,
                quantity: buyDirectlyProduct.quantity,
              },
            ]
          : cart.map((item) => ({
              productId: item.idProduct,
              quantity: item.quantity,
            })),
        withDelivery: isWithDelivery,
        deliveryPrice: isWithDelivery ? deliveryPrice : undefined,
        deliveryType: isWithDelivery ? deliveryType : undefined,
        deliveryCompanyId: isWithDelivery ? selectedCompanyId : undefined,
        state: isWithDelivery ? selectedState?.name : undefined,
        municipality: isWithDelivery ? selectedMunicipality?.name : undefined,
        firstName,
        familyName,
        email,
        phoneNumbers: phoneNumbers
          .split(",")
          .map((num) => num.trim())
          .filter(Boolean),
      };

      const response = await axiosInstance.post("/orders", formData);
      if (response.status === 201) {
        if (buyDirectlyProduct) {
          setBuyDirectlyProduct(null);
          toast.success("order confirmed ");
          router.push("/");
        } else {
          clearCart(setCart);
        }

        router.push("/");
      }
    } catch (error) {
      errorMessage(error, toast);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-white rounded-xl shadow p-6 space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Order Details
      </h2>

      {/* Delivery Option */}
      <div className="flex items-center gap-4">
        <label className="font-medium text-gray-700">With Delivery?</label>
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={isWithDelivery}
          onChange={(e) => setIsWithDelivery(e.target.checked)}
        />
      </div>

      {isWithDelivery && (
        <>
          {/* Delivery Company */}
          <div>
            <label className="block text-gray-700 mb-1">Delivery Company</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={selectedCompanyId ?? ""}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setSelectedCompanyId(value);
                setSelectedStateId(null);
                setSelectedMunicipalityId(null);
              }}
            >
              <option value="">Select Company</option>
              {deliveryCompanies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 mb-1">State</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={selectedStateId ?? ""}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setSelectedStateId(value);
                setSelectedMunicipalityId(null);
              }}
              disabled={!selectedCompany}
            >
              <option value="">Select State</option>
              {selectedCompany?.states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* Municipality */}
          <div>
            <label className="block text-gray-700 mb-1">Municipality</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={selectedMunicipalityId ?? ""}
              onChange={(e) =>
                setSelectedMunicipalityId(parseInt(e.target.value))
              }
              disabled={!selectedState}
            >
              <option value="">Select Municipality</option>
              {selectedState?.municipalities.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Type */}
          <div>
            <label className="block text-gray-700 mb-1">Delivery Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={deliveryType}
              onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
              disabled={!selectedMunicipality}
            >
              <option value={DeliveryType.HOME}>Home</option>
              <option value={DeliveryType.DELIVERY_OFFICE}>
                Delivery Office
              </option>
            </select>
          </div>

          {/* Delivery Price */}
          <div>
            <label className="block text-gray-700 mb-1">Delivery Price</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={deliveryPrice}
              readOnly
            />
          </div>
        </>
      )}

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Family Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Family Name"
            required
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Phone Numbers</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Phone numbers (comma separated)"
            required
            value={phoneNumbers}
            onChange={(e) => setPhoneNumbers(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-colors cursor-pointer"
      >
        {isLoading ? <Loader /> : "Place Order"}
      </button>
    </form>
  );
}

export default OrderForm;
