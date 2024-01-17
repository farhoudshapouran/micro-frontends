import { Fragment } from "react";
// data-context
import { useAppSelector } from "@repo/data-context/hooks";
import { CheckoutState } from "@repo/data-context/reducers/checkout-reducer";
// components
import { Button } from "@repo/ui/components/button";
import { Dialog, DialogContent } from "@repo/ui/components/dialog";
import { Separator } from "@repo/ui/components/separator";
import { Iconify } from "@repo/ui/components/iconify";

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onReset: VoidFunction;
};

export default function CheckoutOrderComplete({ open, onReset }: Props) {
  const { items } = useAppSelector<CheckoutState>((state) => state.checkout);

  return (
    <Dialog open={open}>
      <DialogContent
        className="outline-none flex flex-col items-center justify-center"
        style={{ maxWidth: "calc(100% - 40px)", height: "calc(100% - 40px)" }}
      >
        <div className="max-w-xl w-full flex flex-col items-center justify-center gap-6">
          <h4 className="text-lg font-semibold text-center">
            Thank you for your purchase!
          </h4>
          <div data-rehype-pretty-code-fragment="" className="w-full">
            <pre className="max-h-[400px] overflow-auto rounded-lg border bg-zinc-950 py-3 dark:bg-zinc-900">
              <code className="relative flex flex-col px-5 py-2 font-mono text-sm text-white">
                <span className="line">&#123;</span>
                <span className="line">&nbsp;&nbsp;"orders": [</span>
                {items.map((item, index) => (
                  <Fragment key={item.id}>
                    <span className="line">&nbsp;&nbsp;&nbsp;&nbsp;&#123;</span>
                    <span className="line">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "{item.id}",
                    </span>
                    <span className="line">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"productId": "
                      {item.productId}",
                    </span>
                    <span className="line">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "{item.name}",
                    </span>
                    <span className="line">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"color": "{item.color}
                      ",
                    </span>
                    <span className="line">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"size": "{item.size}",
                    </span>
                    <span className="line">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": {item.price},
                    </span>
                    <span className="line">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"quantity":{" "}
                      {item.quantity},
                    </span>
                    <span className="line">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"subTotal":{" "}
                      {item.subTotal}
                    </span>
                    <span className="line">
                      &nbsp;&nbsp;&nbsp;&nbsp;&#125;
                      {index !== items.length - 1 && ","}
                    </span>
                  </Fragment>
                ))}
                <span className="line">&nbsp;&nbsp;]</span>
                <span className="line">&#125;</span>
              </code>
            </pre>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Thanks for placing order
          </p>
          <Separator />
          <div className="flex flex-col-reverse gap-4 md:flex-row w-full">
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={onReset}
            >
              <Iconify icon="eva:arrow-ios-back-fill" className="mr-1" />
              Continue Shopping
            </Button>
            <Button size="lg" className="w-full">
              <Iconify icon="eva:cloud-download-fill" className="mr-2" />
              Download as PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
