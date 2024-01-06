import { IAddressItem } from "./address";

// ----------------------------------------------------------------------

export type ICheckoutItem = {
  id: string;
  productId: string;
  name: string;
  coverUrl: string;
  available: number;
  price: number;
  color: string;
  size: string;
  quantity: number;
  subTotal: number;
};

export type ICheckoutDeliveryOption = {
  value: number;
  label: string;
  description: string;
};

export type ICheckoutPaymentOption = {
  value: string;
  label: string;
  description: string;
};

export type ICheckoutCardOption = {
  value: string;
  label: string;
};

export type ICheckoutValue = {
  total: number;
  subTotal: number;
  discount: number;
  shipping: number;
  activeStep: number;
  totalItems: number;
  items: ICheckoutItem[];
  billing: IAddressItem | null;
};

export const PRODUCT_CHECKOUT_STEPS = ["Cart", "Billing & address", "Payment"];
