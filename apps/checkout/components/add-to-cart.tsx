import { Button } from "@repo/ui/components/button";
import { Iconify } from "@repo/ui/components/iconify";
import { useCallback } from "react";
import { ICheckoutItem } from "@repo/data-context/types/checkout";
import { useAppSelector, useAppDispatch } from "@repo/data-context/hooks";
import {
  CheckoutState,
  onAddToCart,
} from "@repo/data-context/reducers/checkout-reducer";
import { useToast } from "@repo/ui/components/toast/use-toast";

// ----------------------------------------------------------------------

type Props = {
  disabled: boolean;
  values: ICheckoutItem;
};

export default function AddToCart({ disabled, values }: Props) {
  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const handleAddCart = useCallback(() => {
    try {
      dispatch(onAddToCart(values));

      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (error) {
      console.error(error);
    }
  }, [values]);

  return (
    <Button
      size="lg"
      disabled={disabled}
      onClick={handleAddCart}
      aria-label="Add to Cart"
    >
      <Iconify icon="solar:cart-plus-bold" className="mr-2" width={24} />
      Add to Cart
    </Button>
  );
}
