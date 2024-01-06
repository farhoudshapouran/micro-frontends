import React from "react";
import Link from "next/link";
import { Iconify } from "./iconify";
import { cn } from "../lib/utils";

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: React.ReactElement;
};

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
  moreLink?: string[];
  activeLast?: boolean;
  action?: React.ReactNode;
  links: BreadcrumbsLinkProps[];
}

export function Breadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  ...rest
}: BreadcrumbsProps) {
  const lastLink = links[links.length - 1]?.name;

  return (
    <div {...rest}>
      <div className="flex flex-row items-center">
        <div className="flex-grow">
          {heading && <h4>{heading}</h4>}
          {!!links.length && (
            <nav className="text-sm">
              <ol className="flex flex-row gap-1 items-center flex-wrap">
                {links.map((link) => (
                  <li
                    key={link.name || ""}
                    className="flex flex-row items-center"
                  >
                    <LinkItem
                      link={link}
                      activeLast={activeLast}
                      disabled={link.name === lastLink}
                    />
                    {link.name !== lastLink && (
                      <Iconify
                        icon="mdi:circle-small"
                        className="ml-1 w-6 h-6 text-muted-foreground"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

type LinkItemProps = {
  link: BreadcrumbsLinkProps;
  activeLast?: boolean;
  disabled: boolean;
};

export default function LinkItem({
  link,
  activeLast,
  disabled,
}: LinkItemProps) {
  const { name, href, icon } = link;

  const styles = cn(
    "items-center inline-flex text-primary",
    disabled &&
      !activeLast &&
      "cursor-default pointer-events-none text-muted-foreground"
  );

  const renderContent = (
    <>
      {icon && <span className="mr-1 w-6 h-6">{icon}</span>}

      {name}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {renderContent}
      </Link>
    );
  }

  return <div className={styles}> {renderContent} </div>;
}
