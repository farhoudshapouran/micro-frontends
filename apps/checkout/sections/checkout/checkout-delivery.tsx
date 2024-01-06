import React from "react";
import { Controller, useFormContext } from "react-hook-form";
// components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Iconify } from "@repo/ui/components/iconify";
// utils
import { cn } from "@repo/ui/lib/utils";
// types
import { ICheckoutDeliveryOption } from "@repo/data-context/types/checkout";

// ----------------------------------------------------------------------

type Props = {
  options: ICheckoutDeliveryOption[];
  onApplyShipping: (shipping: number) => void;
};

export default function CheckoutDelivery({
  options,
  onApplyShipping,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="delivery"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {options.map((option) => (
                <OptionItem
                  key={option.label}
                  option={option}
                  selected={field.value === option.value}
                  onClick={() => {
                    field.onChange(option.value);
                    onApplyShipping(option.value);
                  }}
                />
              ))}
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface OptionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  option: ICheckoutDeliveryOption;
  selected: boolean;
}

function OptionItem({ option, selected, ...rest }: OptionItemProps) {
  const { value, label, description } = option;

  return (
    <div
      key={value}
      className={cn(
        "flex flex-col items-start gap-2 rounded-xl border-2 py-4 px-5 text-left text-sm transition-all hover:bg-accent cursor-pointer",
        selected && "border-primary"
      )}
      {...rest}
    >
      <div className="flex w-full">
        <div className="mr-4">
          {label === "Free" && <Iconify icon="carbon:bicycle" width={32} />}
          {label === "Express" && <Iconify icon="carbon:delivery" width={32} />}
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>{label}</span> <span>{`$${value}`}</span>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
