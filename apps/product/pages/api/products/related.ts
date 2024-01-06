import type { NextApiRequest, NextApiResponse } from "next";
import { products } from "@repo/data-context/mock/product";
import { IProductItem } from "@repo/data-context/types/product";
//
import type { ResponseType } from "@/utils/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<IProductItem[]>>
) {
  const { id } = req.query as { id: string };

  const product = await products.find((item) => item.id === id);

  if (product) {
    const related = products.filter(
      (item) =>
        item.category.value === product.category.value &&
        item.id !== id &&
        item.available > 0
    );

    res.status(200).json({ data: related, message: "Success" });
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
}
