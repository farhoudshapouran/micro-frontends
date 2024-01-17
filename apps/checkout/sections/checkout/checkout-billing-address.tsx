import { useCallback } from "react";
// data-context
import { useAppSelector, useAppDispatch } from "@repo/data-context/hooks";
import {
  CheckoutState,
  onNextStep,
  onBackStep,
  onCreateBilling,
} from "@repo/data-context/reducers/checkout-reducer";
// components
import { Button } from "@repo/ui/components/button";
import { Iconify } from "@repo/ui/components/iconify";
// types
import type { ICheckoutItem } from "@repo/data-context/types/checkout";
import type { IAddressItem } from "@repo/data-context/types/address";
// mock
import { addressBook } from "@repo/data-context/mock/address";
// sections
import CheckoutSummary from "./checkout-summary";
import AddressItem from "../address/address-item";

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress() {
  const { items, discount, shipping, billing } = useAppSelector<CheckoutState>(
    (state) => state.checkout
  );

  const dispatch = useAppDispatch();

  const subTotal = items.reduce(
    (total: number, item: ICheckoutItem) => total + item.subTotal,
    0
  );

  const total = subTotal - discount + shipping;

  const handleSelectAddress = useCallback(
    (address: IAddressItem) => {
      dispatch(onCreateBilling(address));
    },
    [dispatch, onCreateBilling]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex flex-col gap-4 mb-4">
          {addressBook.map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              selected={billing?.id === address.id}
              onSelectAddress={handleSelectAddress}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <Button variant="link" onClick={() => dispatch(onBackStep())}>
            <Iconify icon="eva:arrow-ios-back-fill" className="mr-2" /> Back
          </Button>
        </div>
      </div>
      <div>
        <CheckoutSummary
          total={total}
          discount={discount}
          subTotal={subTotal}
        />
        <Button
          size="lg"
          className="w-full"
          disabled={!billing}
          onClick={() => dispatch(onNextStep())}
        >
          Payment
        </Button>
      </div>
    </div>
  );
}
