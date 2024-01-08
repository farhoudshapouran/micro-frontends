import { useState, useEffect, useCallback } from "react";
// types
import { IProductItem } from "@repo/data-context/types/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@repo/ui/components/carousel";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
};

export default function ProductDetailsCarousel({ product }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselLargeApi, setCarouselLargeApi] = useState<CarouselApi>();
  const [carouselThumbApi, setCarouselThumbApi] = useState<CarouselApi>();

  useEffect(() => {
    setSelectedIndex(0);
    if (carouselLargeApi) {
      carouselLargeApi.scrollTo(0);
    }
  }, [product]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!carouselLargeApi || !carouselThumbApi) return;
      carouselLargeApi.scrollTo(index);
    },
    [carouselLargeApi, carouselThumbApi]
  );

  const onSelect = useCallback(() => {
    if (!carouselLargeApi || !carouselThumbApi) return;
    setSelectedIndex(carouselLargeApi.selectedScrollSnap());
    carouselThumbApi.scrollTo(carouselLargeApi.selectedScrollSnap());
  }, [carouselLargeApi, carouselThumbApi, setSelectedIndex]);

  useEffect(() => {
    if (!carouselLargeApi) {
      return;
    }

    onSelect();
    carouselLargeApi.on("select", onSelect);
    carouselLargeApi.on("reInit", onSelect);
  }, [carouselLargeApi]);

  useEffect(() => {
    if (!carouselThumbApi) {
      return;
    }

    carouselThumbApi.on("select", () => {
      // Do something on select.
    });
  }, [carouselThumbApi]);

  const slides = product.images.map((img) => ({
    src: img,
  }));

  const renderLargeImg = (
    <div className="relative">
      <Carousel
        setApi={setCarouselLargeApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="mb-3 rounded-xl overflow-hidden relative"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="p-0">
              <AspectRatio ratio={1 / 1} className="bg-muted">
                <Image
                  alt={slide.src}
                  src={slide.src + "?w=800"}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className=" absolute bottom-3 right-3 py-2 w-16 rounded-lg backdrop-blur-sm bg-slate-600/50 text-white text-center text-sm text-muted-foreground">
        {selectedIndex + 1} of {slides.length}
      </div>
    </div>
  );

  const renderThumbnails = (
    <div className="relative flex justify-center">
      <Carousel
        setApi={setCarouselThumbApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent className="flex items-center justify-center">
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-20 lg:basis-24"
              onClick={() => onThumbClick(index)}
            >
              <AspectRatio ratio={1 / 1} className="bg-muted rounded-xl">
                <Image
                  alt={slide.src}
                  src={slide.src + "?w=200"}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    "object-cover rounded-xl border-2 border-transparent cursor-pointer",
                    index === selectedIndex && "border-primary"
                  )}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );

  return (
    <div>
      {renderLargeImg}

      {renderThumbnails}
    </div>
  );
}
