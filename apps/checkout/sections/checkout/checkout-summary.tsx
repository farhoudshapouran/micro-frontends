// utils
import { fCurrency } from "@repo/utils/format-number";
// components
import { Iconify } from "@repo/ui/components/iconify";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";

// ----------------------------------------------------------------------

type Props = {
  total: number;
  discount?: number;
  subTotal: number;
  shipping?: number;
  //
  onEdit?: VoidFunction;
  onApplyDiscount?: (discount: number) => void;
};

export default function CheckoutSummary({
  total,
  discount,
  subTotal,
  shipping,
  //
  onEdit,
  onApplyDiscount,
}: Props) {
  const displayShipping = shipping !== null ? "Free" : "-";

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Order Summary
          {onEdit && (
            <Button size="sm" variant="secondary" onClick={onEdit}>
              <Iconify icon="solar:pen-bold" width={16} className="mr-1" />
              Edit
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Sub Total</p>
            <h6 className="font-semibold">{fCurrency(subTotal)}</h6>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Discount</p>
            <h6 className="font-semibold">
              {discount ? fCurrency(-discount) : "-"}
            </h6>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Shipping</p>
            <h6 className="font-semibold">
              {shipping ? fCurrency(shipping) : displayShipping}
            </h6>
          </div>

          <Separator className="my-4" />

          <div className="flex items-start justify-between">
            <h6 className="font-semibold text-lg">Total</h6>
            <div className="text-right m-0">
              <h6 className="font-semibold text-lg text-rose-500">
                {fCurrency(total)}
              </h6>
              <span className="text-xs italic text-muted-foreground">
                (VAT included if applicable)
              </span>
            </div>
          </div>

          {onApplyDiscount && (
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Discount codes / Gifts"
                value="DISCOUNT5"
                readOnly
              />
              <Button type="submit" onClick={() => onApplyDiscount(5)}>
                Apply
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
