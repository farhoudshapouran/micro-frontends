import { useEffect, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
// types
import { IProductItem } from "@repo/data-context/types/product";
import { ICheckoutItem } from "@repo/data-context/types/checkout";
//
import { Form, FormField } from "@repo/ui/components/form";
import ColorPicker from "@repo/ui/components/color-utils/color-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Separator } from "@repo/ui/components/separator";
import { Badge } from "@repo/ui/components/badge";
import { IncrementerButton } from "@repo/ui/components/incrementer-button";
import Rating from "@repo/ui/components/rating";
import { ButtonSkeleton } from "@repo/ui/components/skeletons/button-skeleton";
// utils
import { fShortenNumber, fCurrency } from "@repo/utils/format-number";
import { cn } from "@repo/ui/lib/utils";

const AddToCart = lazy(() => import("checkout/add-to-cart"));

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
  items?: ICheckoutItem[];
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: ICheckoutItem) => void;
};

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}: Props) {
  //const router = useRouter();

  const {
    id,
    name,
    sizes,
    price,
    coverUrl,
    colors,
    newLabel,
    available,
    priceSale,
    saleLabel,
    subDescription,
    inventoryType,
    totalRatings,
    totalReviews,
  } = product;

  const existProduct =
    !!items?.length && items.map((item) => item.id).includes(id);

  const productQuantity = !!items?.length
    ? items.filter((item) => item.id === id).map((item) => item.quantity)
    : [];

  const isMaxQuantity = productQuantity[0] && productQuantity[0] >= available;

  const defaultValues = {
    productId: id,
    name,
    coverUrl,
    available,
    price,
    color: colors[0],
    size: sizes[0],
    quantity: available < 1 ? 0 : 1,
  };

  const form = useForm({ defaultValues });

  const values = form.watch();

  const data = {
    ...values,
    subTotal: values.price * values.quantity,
  };

  useEffect(() => {
    if (product) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = async (data: any) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...data,
          subTotal: data.price * data.quantity,
        });
      }
      onGotoStep?.(0);
      //router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <div className="flex flex-row items-center space-x-1">
      {newLabel.enabled && (
        <Badge className="bg-sky-500 hover:bg-sky-500 text-white">
          {newLabel.content}
        </Badge>
      )}
      {saleLabel.enabled && (
        <Badge className="bg-rose-500 hover:bg-rose-500 text-white">
          {saleLabel.content}
        </Badge>
      )}
    </div>
  );

  const renderInventoryType = (
    <span
      className={cn(
        "uppercase text-sm font-semibold",
        (inventoryType === "out of stock" && " text-red-500") ||
          (inventoryType === "low stock" && "text-amber-500") ||
          "text-blue-500"
      )}
    >
      {inventoryType}
    </span>
  );

  const renderRating = (
    <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
      <Rating value={totalRatings} readOnly />
      {`(${fShortenNumber(totalReviews)} reviews)`}
    </div>
  );

  const renderPrice = (
    <h5 className="flex-row space-x-2 font-medium text-xl">
      {priceSale && (
        <span className="text-muted-foreground opacity-50 line-through">
          {fCurrency(priceSale)}
        </span>
      )}
      <span>{fCurrency(price)}</span>
    </h5>
  );

  const renderColorOptions = (
    <FormField
      control={form.control}
      name="color"
      render={({ field }) => (
        <div className="flex flex-row items-center justify-between">
          <label className="text-sm font-semibold">Color</label>
          <ColorPicker
            colors={colors}
            selected={field.value || ""}
            onSelectColor={(color) => field.onChange(color as string)}
          />
        </div>
      )}
    />
  );

  const renderSizeOptions = (
    <FormField
      control={form.control}
      name="size"
      render={({ field }) => (
        <div className="flex flex-row items-center justify-between">
          <label className="text-sm font-semibold">Size</label>
          <div className="w-[100px]">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full focus:ring-0">
                <SelectValue placeholder="Select sort order" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    />
  );

  const renderQuantity = (
    <FormField
      control={form.control}
      name="quantity"
      render={({ field }) => (
        <div className=" space-y-1">
          <div className="flex flex-row items-center justify-between">
            <label className="text-sm font-semibold">Quantity</label>
            <IncrementerButton
              quantity={field.value}
              disabledDecrease={field.value <= 1}
              disabledIncrease={field.value >= available}
              onIncrease={() => field.onChange(field.value + 1)}
              onDecrease={() => field.onChange(field.value - 1)}
            />
          </div>
          <div className="text-xs float-right text-muted-foreground">
            Available: {available}
          </div>
        </div>
      )}
    />
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {renderLabels}

        {renderInventoryType}

        <h5 className="text-xl font-semibold">{name}</h5>

        {renderPrice}

        {renderRating}

        <p className="text-muted-foreground">{subDescription}</p>

        <Separator className="my-3" />

        {renderColorOptions}

        {renderSizeOptions}

        {renderQuantity}

        <Separator className="my-4" />

        <Suspense fallback={<ButtonSkeleton />}>
          <AddToCart
            disabled={isMaxQuantity || disabledActions || !available}
            values={data}
          />
        </Suspense>
      </form>
    </Form>
  );
}
