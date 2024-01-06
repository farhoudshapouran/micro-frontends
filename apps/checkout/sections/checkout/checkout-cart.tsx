import Link from "next/link";
// data-context
import { useAppSelector, useAppDispatch } from "@repo/data-context/hooks";
import {
  CheckoutState,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
} from "@repo/data-context/reducers/checkout-reducer";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import EmptyContent from "@repo/ui/components/empty-content";
import { Button } from "@repo/ui/components/button";
import { Iconify } from "@repo/ui/components/iconify";
// types
import type { ICheckoutItem } from "@repo/data-context/types/checkout";
// routes
import { paths } from "@repo/utils/routes/paths";
// sections
import CheckoutCartProductList from "./checkout-cart-product-list";
import CheckoutSummary from "./checkout-summary";
import { useCallback } from "react";
import { cn } from "@repo/ui/lib/utils";

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const { items, discount, shipping } = useAppSelector<CheckoutState>(
    (state) => state.checkout
  );

  const dispatch = useAppDispatch();

  const empty = !items.length;

  const totalItems = items.reduce(
    (total: number, item: ICheckoutItem) => total + item.quantity,
    0
  );

  const subTotal = items.reduce(
    (total: number, item: ICheckoutItem) => total + item.subTotal,
    0
  );

  const total = subTotal - discount + shipping;

  const handleApplyDiscount = useCallback(
    (discount: number) => {
      dispatch(onApplyDiscount(discount));
    },
    [dispatch, onApplyDiscount]
  );

  const handleDeleteCart = useCallback(
    (id: string) => {
      dispatch(onDeleteCart(id));
    },
    [dispatch, onDeleteCart]
  );

  const handleIncreaseQuantity = useCallback(
    (id: string) => {
      dispatch(onIncreaseQuantity(id));
    },
    [dispatch, onIncreaseQuantity]
  );

  const handleDecreaseQuantity = useCallback(
    (id: string) => {
      dispatch(onDecreaseQuantity(id));
    },
    [dispatch, onDecreaseQuantity]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>
              Cart{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ({totalItems} item)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {empty ? (
              <EmptyContent
                title="Cart is Empty!"
                description="Look like you have no items in your shopping cart."
                imgUrl="/assets/icons/empty/ic_cart.svg"
              />
            ) : (
              <CheckoutCartProductList
                products={items}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            )}
          </CardContent>
        </Card>
        <Button variant="link" asChild>
          <Link href={paths.product.root}>
            <Iconify icon="eva:arrow-ios-back-fill" className="mr-2" /> Continue
            Shopping
          </Link>
        </Button>
      </div>
      <div>
        <CheckoutSummary
          total={total}
          discount={discount}
          subTotal={subTotal}
          shipping={shipping}
          onApplyDiscount={handleApplyDiscount}
        />
        <Button
          size="lg"
          className="w-full"
          disabled={empty}
          onClick={() => dispatch(onNextStep())}
        >
          Check Out
        </Button>
      </div>
    </div>
  );
}
