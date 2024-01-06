import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICheckoutItem } from "../types/checkout";
import type { IAddressItem } from "../types/address";
import { v4 as uuidv4 } from "uuid";

export interface CheckoutState {
  activeStep: number;
  items: ICheckoutItem[];
  discount: number;
  shipping: number;
  billing: IAddressItem | null;
}

const initialState: CheckoutState = {
  activeStep: 0,
  items: [],
  discount: 0,
  shipping: 0,
  billing: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    onAddToCart(state, action: PayloadAction<ICheckoutItem>) {
      const newItem = action.payload;

      const updatedItems: ICheckoutItem[] = state.items.map(
        (item: ICheckoutItem) => {
          if (
            item.productId === newItem.productId &&
            item.color === newItem.color &&
            item.size === newItem.size
          ) {
            const quantity = item.quantity + newItem.quantity;
            return {
              ...item,
              quantity,
              subTotal: quantity * item.price,
            };
          }
          return item;
        }
      );

      if (
        !updatedItems.some(
          (item: ICheckoutItem) =>
            item.productId === newItem.productId &&
            item.color === newItem.color &&
            item.size === newItem.size
        )
      ) {
        updatedItems.push({ ...newItem, id: uuidv4() });
      }

      state.items = updatedItems;
    },
    onDeleteCart(state, action: PayloadAction<string>) {
      const id = action.payload;

      const updatedItems = state.items.filter(
        (item: ICheckoutItem) => item.id !== id
      );

      state.items = updatedItems;
    },
    onBackStep(state) {
      state.activeStep = state.activeStep - 1;
    },
    onNextStep(state) {
      state.activeStep = state.activeStep + 1;
    },
    onGotoStep(state, action: PayloadAction<number>) {
      state.activeStep = action.payload;
    },
    onIncreaseQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;

      const updatedItems = state.items.map((item: ICheckoutItem) => {
        if (item.id === id) {
          const quantity = item.quantity + 1;

          return {
            ...item,
            quantity,
            subTotal: quantity * item.price,
          };
        }
        return item;
      });

      state.items = updatedItems;
    },
    onDecreaseQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;

      const updatedItems = state.items.map((item: ICheckoutItem) => {
        if (item.id === id) {
          const quantity = item.quantity - 1;

          return {
            ...item,
            quantity,
            subTotal: quantity * item.price,
          };
        }
        return item;
      });

      state.items = updatedItems;
    },
    onCreateBilling(state, action: PayloadAction<IAddressItem>) {
      state.billing = action.payload;
    },
    onApplyDiscount(state, action: PayloadAction<number>) {
      state.discount = action.payload;
    },
    onApplyShipping(state, action: PayloadAction<number>) {
      state.shipping = action.payload;
    },
    onReset: () => initialState,
  },
});

export const {
  onAddToCart,
  onDeleteCart,
  onBackStep,
  onNextStep,
  onGotoStep,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCreateBilling,
  onApplyDiscount,
  onApplyShipping,
  onReset,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
