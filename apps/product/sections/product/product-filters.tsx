"use client";

import { memo, useCallback } from "react";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_SORT_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_COLOR_OPTIONS,
} from "@repo/data-context/mock/filter";
import {
  IProductFilters,
  IProductFilterValue,
} from "@repo/data-context/types/product";
import ColorPicker from "@repo/ui/components/color-utils/color-picker";

type FilterProps = {
  filters: IProductFilters;
  onFilters: (name: string, value: IProductFilterValue) => void;
};

const ProductFilters = ({ filters, onFilters }: FilterProps) => {
  const handleSortBy = useCallback(
    (newValue: string) => {
      onFilters("sort", newValue);
    },
    [onFilters]
  );

  const handleFilterGender = useCallback(
    (newValue: string) => {
      const checked = filters.gender.includes(newValue)
        ? filters.gender.filter((value) => value !== newValue)
        : [...filters.gender, newValue];
      onFilters("gender", checked);
    },
    [filters.gender, onFilters]
  );

  const handleFilterCategory = useCallback(
    (newValue: string) => {
      const checked = filters.category.includes(newValue)
        ? filters.category.filter((value) => value !== newValue)
        : [...filters.category, newValue];
      onFilters("category", checked);
    },
    [filters.category, onFilters]
  );

  const handleFilterColors = useCallback(
    (newValue: string | string[]) => {
      onFilters("colors", newValue);
    },
    [onFilters]
  );

  const renderSort = (
    <div className="mb-6 space-y-2">
      <label className="text-sm font-medium">Sort By</label>
      <Select onValueChange={handleSortBy} defaultValue={filters.sort}>
        <SelectTrigger className="w-full focus:ring-0">
          <SelectValue placeholder="Select sort order" />
        </SelectTrigger>
        <SelectContent>
          {PRODUCT_SORT_OPTIONS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderGender = (
    <div className="mb-6 space-y-3">
      <label className="text-sm font-medium">Gender</label>
      {PRODUCT_GENDER_OPTIONS.map((option) => (
        <div
          key={option.value}
          className="flex flex-row items-center space-x-3 space-y-0"
        >
          <Checkbox
            id={`chk_gender_${option.value}`}
            checked={filters.gender.includes(option.value)}
            onClick={() => handleFilterGender(option.value)}
          />
          <label
            className="text-sm font-normal select-none"
            htmlFor={`chk_gender_${option.value}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );

  const renderCategory = (
    <div className="mb-6 space-y-3">
      <label className="text-sm font-medium">Category</label>
      {PRODUCT_CATEGORY_OPTIONS.map((option) => (
        <div
          key={option.value}
          className="flex flex-row items-center space-x-3 space-y-0"
        >
          <Checkbox
            id={`chk_category_${option.value}`}
            checked={filters.category.includes(option.value)}
            onClick={() => handleFilterCategory(option.value)}
          />
          <label
            className="text-sm font-normal select-none"
            htmlFor={`chk_category_${option.value}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );

  const renderColor = (
    <div className="mb-6 space-y-3">
      <label className="text-sm font-medium">Color</label>
      <ColorPicker
        selected={filters.colors}
        onSelectColor={(colors) => handleFilterColors(colors)}
        colors={PRODUCT_COLOR_OPTIONS}
      />
    </div>
  );

  return (
    <ScrollArea className="h-full py-3 pl-6 md:py-6 md:pl-0">
      <div className="w-full">
        {renderSort}
        {renderGender}
        {renderCategory}
        {renderColor}
      </div>
    </ScrollArea>
  );
};

export default memo(ProductFilters);
