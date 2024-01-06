import { cn } from "@repo/ui/lib/utils";
import { Badge } from "@repo/ui/components/badge";
import { Iconify } from "@repo/ui/components/iconify";
// types
import { IAddressItem } from "@repo/data-context/types/address";

// ----------------------------------------------------------------------

type Props = {
  address: IAddressItem;
  selected: boolean;
  onSelectAddress: (address: IAddressItem) => void;
};

export default function AddressItem({
  address,
  selected,
  onSelectAddress,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 rounded-xl border-2 py-4 px-5 text-left text-sm transition-all hover:bg-accent cursor-pointer",
        selected && "border-primary"
      )}
      onClick={() => onSelectAddress(address)}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold line-clamp-1">
              {address.name}
              <span className="ml-2 text-muted-foreground">
                ({address.addressType})
              </span>
            </div>
            {address.primary && <Badge variant="secondary">Default</Badge>}
          </div>
        </div>
        <div className="line-clamp-2 text-muted-foreground">
          {address.fullAddress}
        </div>
        <div className="flex items-center">
          <div className="text-muted-foreground">{address.phoneNumber}</div>
          {selected && (
            <div className="flex items-center ml-auto text-xs font-semibold text-blue-600">
              <Iconify icon="mdi:check" className="mr-1" /> Deliver to this
              Address
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
