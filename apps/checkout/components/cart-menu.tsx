import Link from "next/link";
import { useAppSelector } from "@repo/data-context/hooks";
import { CheckoutState } from "@repo/data-context/reducers/checkout-reducer";
// components
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { Iconify } from "@repo/ui/components/iconify";
// routes
import { paths } from "@repo/utils/routes/paths";
// types
import type { ICheckoutItem } from "@repo/data-context/types/checkout";

// ----------------------------------------------------------------------

export default function CartMenu() {
  const { items } = useAppSelector<CheckoutState>((state) => state.checkout);

  const totalItems = items.reduce(
    (total: number, item: ICheckoutItem) => total + item.quantity,
    0
  );

  return (
    <Button variant="ghost" size="icon" className="relative" asChild>
      <Link href={paths.product.checkout}>
        <Iconify
          icon="solar:cart-large-minimalistic-linear"
          className="h-6 w-6"
        />
        {totalItems > 0 && (
          <Badge className="px-1.5 h-5 rounded-full absolute top-0 right-0">
            <span className="text-xs">{totalItems}</span>
          </Badge>
        )}
      </Link>
    </Button>
  );
}
