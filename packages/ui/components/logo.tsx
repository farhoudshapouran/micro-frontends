import { forwardRef } from "react";
// routes
import { RouterLink } from "@repo/utils/routes/components";
//
import { cn } from "../lib/utils";

// ----------------------------------------------------------------------

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className, disabledLink = false }, ref) => {
    const logo = (
      <div
        ref={ref}
        className={cn("relative flex items-center font-medium", className)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
        </svg>
        Micro Frontends
      </div>
    );

    if (disabledLink) {
      return logo;
    }

    return <RouterLink href="/">{logo}</RouterLink>;
  }
);

Logo.displayName = "Logo";

export { Logo };
