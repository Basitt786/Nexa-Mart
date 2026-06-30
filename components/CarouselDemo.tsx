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
  // Sirf aik hi master list banayein
  const images = ["/img1.avif", "/img2.avif", "/img3.avif", "/img4.avif", "/img5.avif"];

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // Auto slide lagayein
  React.useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => api.scrollNext(), 3000);
    return () => clearInterval(interval);
  }, [api]);

  // Current slide track karein aur clean-up bhi
  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  return (
    <div className="w-full px-2 md:px-4 relative">
      <Carousel setApi={setApi} className="w-full max-w-6xl mx-auto mt-1">
        <CarouselContent>
          {images.map((img, ind) => {
            // Agar 5th image hai (index 4), toh usey mobile par nahi dikhana (hidden md:block)
            const isLastImage = ind === 4;

            return (
              <CarouselItem key={ind} className={isLastImage ? "hidden md:block" : ""}>
                {/* Mobile ki height alag (block md:hidden) */}
                <div className="relative overflow-hidden rounded-lg h-[100px] w-full md:hidden">
                  <Image src={img} alt={`Mobile Image ${ind + 1}`} fill className="object-cover" priority={ind === 0} />
                </div>

                {/* Desktop ki height alag (hidden md:block) */}
                <div className="relative overflow-hidden rounded-lg h-[350px] w-full hidden md:block">
                  <Image src={img} alt={`Desktop Image ${ind + 1}`} fill className="object-cover" priority={ind === 0} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Dots */}
        <div className="flex justify-center gap-2 absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              // 5th dot ko mobile par hide kar diya
              className={`h-2 rounded-full transition-all duration-300 ${index === 4 ? "hidden md:block" : ""} ${
                current === index ? "w-8 bg-red-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}