import type { NextApiRequest, NextApiResponse } from "next";
import { products } from "@repo/data-context/mock/product";
import { IProductItem } from "@repo/data-context/types/product";
import { isEmpty } from "lodash";
//
import type { ResponseType } from "@/utils/axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IProductItem[]>>
) {
  const { query } = req.query as { query: string };

  const results = !isEmpty(query)
    ? products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  res.status(200).json({ data: results, message: "Success" });
}
