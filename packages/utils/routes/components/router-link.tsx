import { forwardRef } from "react";
import Link, { LinkProps } from "next/link";

// ----------------------------------------------------------------------

interface RouterLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  ({ children, ...rest }, ref) => (
    <Link ref={ref} {...rest}>
      {children}
    </Link>
  )
);

RouterLink.displayName = "RouterLink";

export default RouterLink;
