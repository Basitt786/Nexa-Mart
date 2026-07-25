"use client";

import ImageWithSpinner from "@/components/ImageWithSpinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["meinClothes"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products/category/men's clothing");
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
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <>
      <div className="px-4 md:px-10 mt-6">
        <h1 className="text-2xl md:text-3xl font-medium">All Sale Products</h1>
      </div>

      <div className="w-full mt-2 rounded-2xl bg-gradient-to-r from-transparent via-black to-transparent flex justify-center items-center gap-4 flex-wrap p-4">
        {data?.map((item: Product) => {
          const { id, title, image, price } = item;
          return (
            <div
              key={id}
              className="
                w-full sm:w-[48%] md:w-[24%]
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
                hover:scale-105
              "
            >
              <div className="flex flex-col items-center w-full">
                <ImageWithSpinner src={image} alt={title} />
                <h2 className="text-white font-semibold mt-4 text-center text-sm sm:text-base line-clamp-2">
                  {title}
                </h2>
                <p className="text-red-500 font-bold mt-2 text-lg">${price}</p>
              </div>

              {/* 👇 VIEW DETAILS BUTTON YAHAN LAGA DIYA HAI */}
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

export default page;
