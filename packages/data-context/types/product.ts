export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  sort: string;
  gender: string[];
  category: string[];
  colors: string[];
};

export type IProductItem = {
  id: string;
  name: string;
  price: number;
  gender: {
    value: string;
    label: string;
  };
  sizes: string[];
  coverUrl: string;
  images: string[];
  colors: string[];
  category: {
    value: string;
    label: string;
  };
  subDescription: string;
  priceSale: number | null;
  createdAt: Date;
  totalSold: number;
  available: number;
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
  inventoryType: string;
  totalRatings: number;
  totalReviews: number;
};
