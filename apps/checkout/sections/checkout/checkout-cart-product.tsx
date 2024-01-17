import Image from "next/image";
// types
import type { ICheckoutItem } from "@repo/data-context/types/checkout";
// components
import { TableCell, TableRow } from "@repo/ui/components/table";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import { IncrementerButton } from "@repo/ui/components/incrementer-button";
import { Button } from "@repo/ui/components/button";
import { Iconify } from "@repo/ui/components/iconify";
import { Separator } from "@repo/ui/components/separator";
import ColorPreview from "@repo/ui/components/color-utils/color-preview";
// utils
import { fCurrency } from "@repo/utils/format-number";

// ----------------------------------------------------------------------

type Props = {
  product: ICheckoutItem;
  onDelete: VoidFunction;
  onDecrease: VoidFunction;
  onIncrease: VoidFunction;
};

export default function CheckoutCartProduct({
  product,
  onDelete,
  onDecrease,
  onIncrease,
}: Props) {
  const { name, size, price, color, coverUrl, quantity, available, subTotal } =
    product;

  return (
    <TableRow>
      <TableCell className="flex items-center">
        <div className="h-16 w-16 mr-3">
          <AspectRatio ratio={1 / 1} className="bg-muted rounded-xl">
            <Image
              src={coverUrl + "?w=200"}
              alt={name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-xl"
            />
          </AspectRatio>
        </div>
        <div className="space-y-2">
          <h6 className="max-w-[240px] flex-nowrap font-semibold">{name}</h6>
          <div className="flex h-4 items-center space-x-3">
            <div>
              Size: <span className="font-semibold">{size}</span>
            </div>
            <Separator orientation="vertical" />
            <ColorPreview colors={[color]} />
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium px-6">{fCurrency(price)}</TableCell>
      <TableCell>
        <div className="flex justify-center">
          <IncrementerButton
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={quantity <= 1}
            disabledIncrease={quantity >= available}
          />
        </div>
      </TableCell>
      <TableCell className="font-medium text-right px-6">
        {fCurrency(subTotal)}
      </TableCell>
      <TableCell className="text-right">
        <Button size="icon" variant="ghost" onClick={onDelete}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
