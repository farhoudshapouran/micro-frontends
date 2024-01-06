"use client";

// icons
import { Icon, IconifyIcon } from "@iconify/react";
import type { IconProps } from "@iconify/react";

// ----------------------------------------------------------------------

export type IconifyProps = IconifyIcon | string;

const Iconify = ({ icon, width = 20, ...other }: IconProps) => (
  <Icon icon={icon} width={width} height={width} {...other} />
);

export { Iconify };
