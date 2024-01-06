import { forwardRef, useCallback } from "react";
import { Button } from "../button";
import { Iconify } from "../iconify";
import { getContrastText } from "@repo/utils/color";
import { cn } from "../../lib/utils";

export interface ColorPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  multi?: boolean;
  colors: string[];
  selected: string | string[];
  onSelectColor: (color: string | string[]) => void;
}

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ colors, selected, onSelectColor, ...rest }, ref) => {
    const singleSelect = typeof selected === "string";

    const handleSelect = useCallback(
      (color: string) => {
        if (singleSelect) {
          if (color !== selected) {
            onSelectColor(color);
          }
        } else {
          const newSelected = selected.includes(color)
            ? selected.filter((value) => value !== color)
            : [...selected, color];

          onSelectColor(newSelected);
        }
      },
      [onSelectColor, selected, singleSelect]
    );

    return (
      <div ref={ref} className="inline-flex flex-row flex-wrap" {...rest}>
        {colors.map((color) => {
          const hasSelected = singleSelect
            ? selected === color
            : selected.includes(color);

          return (
            <Button
              key={color}
              variant="link"
              className="h-8 w-8 rounded-full p-0"
              onClick={() => {
                handleSelect(color);
              }}
            >
              <div
                className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center border transition-all",
                  hasSelected && "shadow-lg h-7 w-7"
                )}
                style={{ backgroundColor: color }}
              >
                <Iconify
                  width={hasSelected ? 16 : 1}
                  icon="eva:checkmark-fill"
                  className="transition-all"
                  style={{ color: getContrastText(color) }}
                />
              </div>
            </Button>
          );
        })}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export default ColorPicker;
