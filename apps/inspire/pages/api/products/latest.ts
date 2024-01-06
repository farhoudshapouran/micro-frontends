import type { NextApiRequest, NextApiResponse } from "next";
import orderBy from "lodash/orderBy";
import { products } from "@repo/data-context/mock/product";
import { IProductItem } from "@repo/data-context/types/product";
//
import type { ResponseType } from "@/utils/axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IProductItem[]>>
) {
  const results = orderBy(products, ["createdAt"], ["desc"]);

  res.status(200).json({ data: results.slice(0, 10), message: "Success" });
}
