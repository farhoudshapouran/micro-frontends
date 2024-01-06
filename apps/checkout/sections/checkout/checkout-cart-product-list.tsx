// types
import type { ICheckoutItem } from "@repo/data-context/types/checkout";
// components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";
// sections
import CheckoutCartProduct from "./checkout-cart-product";

// ----------------------------------------------------------------------

type Props = {
  products: ICheckoutItem[];
  onDelete: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
};

export default function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  return (
    <ScrollArea className="w-full">
      <Table className="whitespace-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold px-6">Price</TableHead>
            <TableHead className="font-semibold text-center">
              Quantity
            </TableHead>
            <TableHead className="font-semibold px-6 text-right">
              Total Price
            </TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <CheckoutCartProduct
              key={product.id}
              product={product}
              onDelete={() => onDelete(product.id)}
              onDecrease={() => onDecreaseQuantity(product.id)}
              onIncrease={() => onIncreaseQuantity(product.id)}
            />
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
