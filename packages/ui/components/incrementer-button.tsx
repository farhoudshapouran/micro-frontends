import React, { forwardRef } from "react";
//
import { Iconify } from "./iconify";
import { Button } from "./button";
import { cn } from "../lib/utils";

// ----------------------------------------------------------------------

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  quantity: number;
  disabledIncrease?: boolean;
  disabledDecrease?: boolean;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
}

const IncrementerButton = forwardRef<HTMLDivElement, Props>(
  (
    {
      quantity,
      onIncrease,
      onDecrease,
      disabledIncrease,
      disabledDecrease,
      className,
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-row items-center justify-between border border-input shadow-sm rounded-md w-[100px] h-9 p-1 text-sm",
        className
      )}
      {...rest}
    >
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full h-7 w-7"
        onClick={onDecrease}
        disabled={disabledDecrease}
      >
        <Iconify icon="eva:minus-fill" width={16} />
      </Button>

      {quantity}

      <Button
        size="icon"
        variant="ghost"
        className="rounded-full h-7 w-7"
        onClick={onIncrease}
        disabled={disabledIncrease}
      >
        <Iconify icon="mingcute:add-line" width={16} />
      </Button>
    </div>
  )
);

IncrementerButton.displayName = "IncrementerButton";

export { IncrementerButton };
