"use client";

import ImageWithSpinner from "@/components/ImageWithSpinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const Page = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["womenClothes"],
    queryFn: async () => {
      // FakeStore API category endpoint with encoding
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(
          "women's clothing"
        )}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image
          src="/image.png"
          alt="Loading..."
          width={140}
          height={140}
          className="animate-caret-blink"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <p className="text-red-500 font-semibold text-lg mb-1">
          Unable to load products
        </p>
        <p className="text-zinc-400 text-sm max-w-sm">
          {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 md:px-10 mt-6">
        <h1 className="text-2xl md:text-3xl font-medium">All Sale Products</h1>
      </div>

      {/* Grid container for perfectly balanced columns across viewports */}
      <div className="w-full mt-4 rounded-2xl bg-gradient-to-r from-transparent via-black to-transparent grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data?.map((item) => {
          const { id, title, image, price } = item;
          return (
            <div
              key={id}
              className="
                w-full
                p-4 sm:p-6
                bg-black/50
                border border-white/10
                rounded-2xl
                flex
                flex-col
                items-center
                justify-between
                transition-all
                duration-300
                hover:border-red-600/50
                hover:scale-[1.02]
              "
            >
              <div className="flex flex-col items-center w-full">
                <ImageWithSpinner src={image} alt={title} />
                <h2 className="text-white font-semibold mt-4 text-center text-sm sm:text-base line-clamp-2">
                  {title}
                </h2>
                <p className="text-red-500 font-bold mt-2 text-lg">
                  ${price ? price.toFixed(2) : "0.00"}
                </p>
              </div>

              {/* View Details Button */}
              <Link
                href={`/category/women/${id}`}
                className="
                  mt-4
                  w-full
                  py-2.5
                  px-4
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  font-medium
                  text-sm
                  rounded-xl
                  text-center
                  transition-colors
                  shadow-md
                  active:scale-95
                "
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Page;