// components
import { Button } from "@repo/ui/components/button";
import { Iconify } from "@repo/ui/components/iconify";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
// types
import type { IAddressItem } from "@repo/data-context/types/address";

// ----------------------------------------------------------------------

type Props = {
  billing: IAddressItem | null;
  onBackStep: VoidFunction;
};

export default function CheckoutBillingInfo({ billing, onBackStep }: Props) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Address
          <Button size="sm" variant="secondary" onClick={onBackStep}>
            <Iconify icon="solar:pen-bold" width={16} className="mr-1" />
            Edit
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="font-semibold line-clamp-1">
              {billing?.name}
              <span className="ml-2 text-muted-foreground">
                ({billing?.addressType})
              </span>
            </div>
          </div>
          <div className="line-clamp-2 text-muted-foreground text-sm">
            {billing?.fullAddress}
          </div>
          <div className="text-muted-foreground text-sm">
            {billing?.phoneNumber}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
