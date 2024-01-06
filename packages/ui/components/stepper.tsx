import React, { memo } from "react";
import { Iconify } from "./iconify";
import { cn } from "../lib/utils";

// ----------------------------------------------------------------------

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: string[];
  activeStep: number;
}

const Stepper = memo(({ steps = [], activeStep }: StepperProps) => {
  const progress = (activeStep / (steps.length - 1)) * 100;

  return (
    <div className="relative flex items-center justify-between w-full">
      <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-muted"></div>
      <div
        className="absolute left-0 top-2/4 h-0.5 -translate-y-2/4 bg-primary transition-all"
        style={{ width: `${progress}%` }}
      ></div>
      {steps.map((label, index) => (
        <div
          key={index}
          className={cn(
            "relative z-10 grid w-8 h-8 font-bold text-primary transition-all duration-300 bg-background rounded-full place-items-center",
            index <= activeStep ? "text-primary" : "text-muted"
          )}
        >
          <Iconify
            icon={
              index < activeStep ? "mdi:check" : "fluent:circle-small-20-filled"
            }
            width={24}
          />
          <div className="absolute -bottom-10 w-max text-center">
            <h6 className="block text-sm lg:text-base antialiased font-semibold leading-relaxed tracking-normal text-muted-foreground">
              {label}
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
});

export { Stepper };
