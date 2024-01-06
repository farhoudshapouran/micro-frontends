"use client";

import { useCallback } from "react";
import { useRouter } from "next/router";
import { cn } from "@repo/ui/lib/utils";
import { PRODUCT_CHECKOUT_STEPS } from "@repo/data-context/types/checkout";
// data-context
import { useAppSelector, useAppDispatch } from "@repo/data-context/hooks";
import {
  CheckoutState,
  onReset,
} from "@repo/data-context/reducers/checkout-reducer";
// paths
import { paths } from "@repo/utils/routes/paths";
// sections
import CheckoutSteps from "../checkout-steps";
import CheckoutOrderComplete from "../checkout-order-complete";
import CheckoutCart from "../checkout-cart";
import CheckoutBillingAddress from "../checkout-billing-address";
import CheckoutPayment from "../checkout-payment";

// ----------------------------------------------------------------------

export default function CheckoutView() {
  const router = useRouter();

  const { activeStep, billing } = useAppSelector<CheckoutState>(
    (state) => state.checkout
  );

  const dispatch = useAppDispatch();

  const completed = activeStep === PRODUCT_CHECKOUT_STEPS.length;

  const handleReset = useCallback(() => {
    dispatch(onReset());
    router.replace(paths.product.root);
  }, [dispatch, onReset]);

  return (
    <div className="container flex-1 items-start">
      <h4 className="text-xl lg:text-2xl font-semibold mt-3 md:mt-5 mb-8">
        Checkout
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutSteps
            activeStep={activeStep}
            steps={PRODUCT_CHECKOUT_STEPS}
          />
        </div>
      </div>

      {completed ? (
        <CheckoutOrderComplete open={completed} onReset={handleReset} />
      ) : (
        <>
          {activeStep === 0 && <CheckoutCart />}

          {activeStep === 1 && <CheckoutBillingAddress />}

          {activeStep === 2 && billing && <CheckoutPayment />}
        </>
      )}
    </div>
  );
}
