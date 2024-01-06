import Link from "next/link";
import Image from "next/image";
// routes
import { paths } from "@repo/utils/routes/paths";
// components
import ColorPreview from "../color-utils/color-preview";
import { AspectRatio } from "../aspect-ratio";
import { Badge } from "../badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
// types
import { IProductItem } from "@repo/data-context/types/product";
// utils
import { fCurrency } from "@repo/utils/format-number";
import { cn } from "../../lib/utils";

// ----------------------------------------------------------------------

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: IProductItem;
  ratio?: number;
}

export default function ProductItem({
  product,
  ratio,
  className,
  ...props
}: ProductCardProps) {
  const {
    id,
    name,
    coverUrl,
    price,
    colors,
    available,
    priceSale,
    newLabel,
    saleLabel,
  } = product;

  const blurHash =
    "data:image/webp;base64,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";

  const linkTo = paths.product.details(id);

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <div className="flex flex-row items-center space-x-1 absolute z-10 top-5 right-5">
      {newLabel.enabled && (
        <Badge className="bg-sky-500 hover:bg-sky-500 text-sky-950">
          {newLabel.content}
        </Badge>
      )}
      {saleLabel.enabled && (
        <Badge className="bg-rose-600 hover:bg-rose-600 text-white">
          {saleLabel.content}
        </Badge>
      )}
    </div>
  );

  const renderImg = (
    <Tooltip>
      <TooltipTrigger>
        <AspectRatio ratio={ratio} className="bg-muted rounded-lg mb-2">
          <Image
            src={coverUrl + "?w=500"}
            alt={name}
            fill
            className={cn("rounded-lg object-cover", !available && "grayscale")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={blurHash}
          />
          {!available && (
            <TooltipContent>
              <p>Out of stock</p>
            </TooltipContent>
          )}
        </AspectRatio>
      </TooltipTrigger>
    </Tooltip>
  );

  const renderContent = (
    <div className="space-y-3 text-sm p-2 flex flex-col justify-between flex-1">
      <h3 className="font-semibold">{name}</h3>
      <div className="flex flex-row justify-between items-center">
        <ColorPreview colors={colors} />
        <div className="flex-row space-x-1 font-medium text-base">
          {priceSale && (
            <span className="text-muted-foreground opacity-80 line-through">
              {fCurrency(priceSale)}
            </span>
          )}
          <span>{fCurrency(price)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Link href={linkTo} className="product-item">
      <TooltipProvider>
        <div
          className={cn(
            "bg-card flex flex-col justify-between h-full border border-border hover:border-primary/30 transition-all rounded-xl p-2 relative",
            className
          )}
          {...props}
        >
          {renderLabels}

          {renderImg}

          {renderContent}
        </div>
      </TooltipProvider>
    </Link>
  );
}
