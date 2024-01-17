import React from "react";
import { Controller, useFormContext } from "react-hook-form";
// components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Iconify } from "@repo/ui/components/iconify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
// utils
import { cn } from "@repo/ui/lib/utils";
// types
import {
  ICheckoutCardOption,
  ICheckoutPaymentOption,
} from "@repo/data-context/types/checkout";

// ----------------------------------------------------------------------

type Props = {
  options: ICheckoutPaymentOption[];
  cardOptions: ICheckoutCardOption[];
};

export default function CheckoutPaymentMethods({
  options,
  cardOptions,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="payment"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="flex flex-col gap-4">
              {options.map((option) => (
                <OptionItem
                  key={option.label}
                  cardOptions={cardOptions}
                  option={option}
                  selected={field.value === option.value}
                  isCredit={
                    option.value === "credit" && field.value === "credit"
                  }
                  onClick={() => {
                    field.onChange(option.value);
                  }}
                />
              ))}

              {!!error && (
                <div className="text-xs text-rose-500 px-5">
                  {error.message}
                </div>
              )}
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

interface OptionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  option: ICheckoutPaymentOption;
  cardOptions: ICheckoutCardOption[];
  selected: boolean;
  isCredit: boolean;
}

function OptionItem({
  option,
  cardOptions,
  selected,
  isCredit,
  ...rest
}: OptionItemProps) {
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
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center justify-between text-base font-semibold">
          <span>{label}</span>
          <div className="flex items-center space-x-3">
            {value === "credit" && (
              <>
                <Iconify icon="logos:mastercard" width={28} />
                <Iconify icon="logos:visa" width={28} />
              </>
            )}
            {value === "paypal" && <Iconify icon="logos:paypal" width={28} />}
            {value === "cash" && (
              <Iconify icon="solar:wad-of-money-bold" width={32} />
            )}
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>

        {isCredit && (
          <div className="flex flex-col space-y-1 pt-2">
            <label className="text-sm">Cards</label>
            <Select defaultValue={cardOptions[0]?.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a card to pay" />
              </SelectTrigger>
              <SelectContent>
                {cardOptions.map((card) => (
                  <SelectItem key={card.value} value={card.value}>
                    {card.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
