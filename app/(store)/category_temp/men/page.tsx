"use client";

import ImageWithSpinner from "@/components/ImageWithSpinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const fetchMenProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent("men's clothing")}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load products from server");
  }

  return res.json();
};

const Page = () => {
  const { data, isLoading, error, refetch } = useQuery<Product[]>({
    queryKey: ["menClothes"],
    queryFn: fetchMenProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  });

  if (isLoading) {
    return (
      <div className="px-4 md:px-10 mt-6">
        <div className="h-8 w-48 bg-zinc-800 animate-pulse rounded-md mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl flex flex-col items-center gap-4 animate-pulse"
            >
              <div className="w-32 h-32 bg-zinc-800 rounded-xl" />
              <div className="w-full h-4 bg-zinc-800 rounded mt-2" />
              <div className="w-2/3 h-4 bg-zinc-800 rounded" />
              <div className="w-1/2 h-6 bg-zinc-800 rounded mt-2" />
              <div className="w-full h-10 bg-zinc-800 rounded-xl mt-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <p className="text-red-500 font-semibold text-lg mb-2">
          Unable to load products
        </p>
        <p className="text-zinc-400 text-sm max-w-sm mb-4">
          {(error as Error).message}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 mt-6 pb-12">
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
        Men's Collection
      </h1>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => {
            const { id, title, image, price } = item;
            return (
              <div
                key={id}
                className="
                  w-full
                  p-4 sm:p-6
                  bg-zinc-900/80
                  border border-zinc-800
                  rounded-2xl
                  flex
                  flex-col
                  justify-between
                  transition-all
                  duration-300
                  hover:border-red-600/50
                  hover:translate-y-[-2px]
                "
              >
                <div className="flex flex-col items-center w-full">
                  <div className="w-full aspect-square flex items-center justify-center p-4 bg-zinc-950/50 rounded-xl overflow-hidden">
                    <ImageWithSpinner src={image} alt={title} />
                  </div>

                  <h2 className="text-white font-medium mt-4 text-center text-sm sm:text-base line-clamp-2 min-h-[2.5rem]">
                    {title}
                  </h2>

                  <p className="text-red-500 font-bold mt-2 text-lg">
                    ${price ? price.toFixed(2) : "0.00"}
                  </p>
                </div>

                <Link
                  href={`/category/men/${id}`}
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
      ) : (
        <div className="text-center py-12 text-zinc-400">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default Page;