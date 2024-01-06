import type { NextApiRequest, NextApiResponse } from "next";
import { products } from "@repo/data-context/mock/product";
import { IProductItem } from "@repo/data-context/types/product";
//
import type { ResponseType } from "@/utils/axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IProductItem[]>>
) {
  res.status(200).json({ data: products, message: "Success" });
}
