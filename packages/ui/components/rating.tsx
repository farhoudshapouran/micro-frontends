import React, { useState, memo } from "react";
import { Iconify } from "./iconify";
import { cn } from "../lib/utils";

// ----------------------------------------------------------------------

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  readOnly?: boolean;
  onValueChange?: (rate: number) => VoidFunction;
}

const Rating = ({
  value = 0,
  readOnly = false,
  onValueChange,
  className,
  ...rest
}: RatingProps) => {
  const [rate, setRate] = useState(value);

  return (
    <div className={cn("flex flex-row", className)} {...rest}>
      {[...Array(5)].map((_, index) => {
        const givenRating = index + 1;
        return (
          <label
            key={index}
            className={cn("", readOnly ? "cursor-default" : "cursor-pointer")}
            onClick={
              !readOnly
                ? () => {
                    setRate(givenRating);
                    onValueChange && onValueChange(givenRating);
                  }
                : () => {}
            }
          >
            <Iconify
              icon="solar:star-bold"
              width={24}
              className={cn(
                givenRating < rate || givenRating === rate
                  ? "text-yellow-300"
                  : "text-slate-200"
              )}
            />
          </label>
        );
      })}
    </div>
  );
};

export default memo(Rating);
