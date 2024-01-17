import { useCallback } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// data-context
import { useAppSelector, useAppDispatch } from "@repo/data-context/hooks";
import {
  CheckoutState,
  onNextStep,
  onBackStep,
  onGotoStep,
  onApplyShipping,
} from "@repo/data-context/reducers/checkout-reducer";
// components
import { Form } from "@repo/ui/components/form";
import { Button } from "@repo/ui/components/button";
import { Iconify } from "@repo/ui/components/iconify";
// types
import type {
  ICheckoutItem,
  ICheckoutDeliveryOption,
  ICheckoutPaymentOption,
  ICheckoutCardOption,
} from "@repo/data-context/types/checkout";
import CheckoutSummary from "./checkout-summary";
import CheckoutDelivery from "./checkout-delivery";
import CheckoutPaymentMethods from "./checkout-payment-methods";
import CheckoutBillingInfo from "./checkout-billing-info";

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS: ICheckoutDeliveryOption[] = [
  {
    value: 0,
    label: "Free",
    description: "5-7 Days delivery",
  },
  {
    value: 10,
    label: "Express",
    description: "2-3 Days delivery",
  },
];

const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
  {
    value: "paypal",
    label: "Pay with Paypal",
    description:
      "You will be redirected to PayPal website to complete your purchase securely.",
  },
  {
    value: "credit",
    label: "Credit / Debit Card",
    description: "We support Mastercard, Visa, Discover and Stripe.",
  },
  {
    value: "cash",
    label: "Cash",
    description: "Pay with cash when your order is delivered.",
  },
];

const CARDS_OPTIONS: ICheckoutCardOption[] = [
  { value: "Visa1", label: "**** **** **** 3232 - Brycen Jimenez" },
  { value: "Visa2", label: "**** **** **** 1616 - Ariana Lang" },
  { value: "MasterCard", label: "**** **** **** 6868 - Harrison Stein" },
];

const PaymentSchema = Yup.object().shape({
  payment: Yup.string().required("Payment is required"),
});

export default function CheckoutPayment() {
  const { items, discount, shipping, billing } = useAppSelector<CheckoutState>(
    (state) => state.checkout
  );

  const dispatch = useAppDispatch();

  const subTotal = items.reduce(
    (total: number, item: ICheckoutItem) => total + item.subTotal,
    0
  );

  const total = subTotal - discount + shipping;

  const handleApplyShipping = useCallback(
    (shipping: number) => {
      dispatch(onApplyShipping(shipping));
    },
    [dispatch, onApplyShipping]
  );

  const defaultValues = {
    delivery: shipping,
    payment: "",
  };

  const form = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(onNextStep());
      //dispatch(onReset());
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6 mb-4">
            <CheckoutDelivery
              onApplyShipping={handleApplyShipping}
              options={DELIVERY_OPTIONS}
            />
            <CheckoutPaymentMethods
              cardOptions={CARDS_OPTIONS}
              options={PAYMENT_OPTIONS}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="link" onClick={() => dispatch(onBackStep())}>
              <Iconify icon="eva:arrow-ios-back-fill" className="mr-2" /> Back
            </Button>
          </div>
        </div>
        <div>
          <CheckoutBillingInfo
            billing={billing}
            onBackStep={() => dispatch(onBackStep())}
          />

          <CheckoutSummary
            total={total}
            discount={discount}
            shipping={shipping}
            subTotal={subTotal}
            onEdit={() => dispatch(onGotoStep(0))}
          />
          <Button
            size="lg"
            className="w-full"
            disabled={!billing || isSubmitting}
            type="submit"
          >
            Complete Order
          </Button>
        </div>
      </form>
    </Form>
  );
}
