import Image from "next/image";
import { AspectRatio } from "./aspect-ratio";

// ----------------------------------------------------------------------

type EmptyContentProps = {
  title?: string;
  imgUrl?: string;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyContent({
  title,
  imgUrl,
  action,
  description,
}: EmptyContentProps) {
  return (
    <div className="flex flex-col bg-background py-20 items-center justify-center rounded-xl">
      <div className="w-[180px]">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={imgUrl || "/assets/icons/empty/ic_content.svg"}
            alt="empty content"
            fill
          />
        </AspectRatio>
      </div>

      {title && (
        <h6 className="text-xl font-semibold text-muted-foreground py-4">
          {title}
        </h6>
      )}

      {description && (
        <p className="text-center max-w-lg text-muted-foreground mb-3">
          {description}
        </p>
      )}

      {action && action}
    </div>
  );
}
