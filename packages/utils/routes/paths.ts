// utils
import { paramCase } from "../change-case";

// ----------------------------------------------------------------------

export const paths = {
  home: "/",
  docs: { root: "/docs" },
  product: {
    root: "/products",
    details: (id: string) => `/products/${id}`,
    checkout: `/checkout`,
  },
};
