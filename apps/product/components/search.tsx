"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { DialogProps } from "@radix-ui/react-alert-dialog";
// api
import { useSearchProducts } from "@/api/product";
// hooks
import { useDebounce } from "@repo/utils/hooks/use-debounce";
// routes
import { paths } from "@repo/utils/routes/paths";
// utils
import { cn } from "@repo/ui/lib/utils";
// components
import { Button } from "@repo/ui/components/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import { Iconify } from "@repo/ui/components/iconify";

// ----------------------------------------------------------------------

export default function Search({ ...props }: DialogProps) {
  const router = useRouter();

  const [showSearchDialog, setShowSearchDialog] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery);

  const { searchResults, searchLoading } = useSearchProducts(debouncedQuery);

  const handleSearch = useCallback(
    (inputValue: string) => {
      setSearchQuery(inputValue);
    },
    [setSearchQuery]
  );

  const navigateToProduct = useCallback((navigateTo: () => unknown) => {
    setShowSearchDialog(false);
    navigateTo();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 lg:w-80"
        )}
        onClick={() => setShowSearchDialog(true)}
        {...props}
      >
        <span className="inline-flex">Search demo products...</span>
        <span className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 px-1.5 opacity-100 sm:flex">
          <Iconify icon="solar:magnifer-linear" className="h-5 w-5" />
        </span>
      </Button>
      <CommandDialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <CommandInput
          placeholder="Type product name to search..."
          value={searchQuery}
          onValueChange={handleSearch}
        />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Results">
            {searchResults.map((product) => (
              <CommandItem
                key={product.id}
                className="cursor-pointer"
                onSelect={() => {
                  navigateToProduct(() =>
                    router.push(paths.product.details(product.id))
                  );
                }}
              >
                {product.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
