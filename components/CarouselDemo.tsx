"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  const desktopImages = [
    "/img1.avif",
    "/img2.avif",
    "/img3.avif",
    "/img4.avif",
    "/img5.avif",
  ];

  const mobileImages = [
    "/img1.avif",
    "/img2.avif",
    "/img3.avif",
    "/img4.avif",
  ];

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeImages = isMobile ? mobileImages : desktopImages;

  // Auto slide using api (works on mobile too)
  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  // Track current slide
  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full px-2 md:px-4">
      <Carousel setApi={setApi} className="w-full max-w-6xl mx-auto mt-1">
        <CarouselContent>
          {activeImages.map((img, ind) => (
            <CarouselItem key={ind}>
              <div
                className={`relative overflow-hidden rounded-lg ${
                  isMobile ? "h-[100px] w-full" : "h-[350px] w-full"
                }`}
              >
                <Image
                  src={img}
                  alt={`Carousel Image ${ind + 1}`}
                  fill
                  className="object-cover"
                  priority={ind === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

  {/* Dots */}
        <div className="flex justify-center gap-2 absolute bottom-2 left-1/2 transform -translate-x-1/2">
          {activeImages.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? "w-8 bg-red-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
        {/* Arrows (optional) */}
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex"/>
      </Carousel>
    </div>
  );
}
