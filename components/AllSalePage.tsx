"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import ImageWithSpinner from "./ImageWithSpinner";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};


const SUPPORTED_CATEGORIES = ["men's clothing", "women's clothing"];

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

const AllSalePage = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["AllSales"],
    queryFn: fetchProducts,
    retry: 2, 
    staleTime: 1000 * 60 * 5, 
  });

  const query = useSelector((state: RootState) => state.search?.query || "");

  const filteredProducts =
    data
      ?.filter((product: Product) =>
        SUPPORTED_CATEGORIES.includes(product.category.toLowerCase())
      )
      .filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      ) || [];


  const getProductRoute = (category: string, id: number) => {
    const cat = category.toLowerCase();
    if (cat === "men's clothing") return `/category/men/${id}`;
    if (cat === "women's clothing") return `/category/women/${id}`;
    return null; 
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image
          src="/image.png"
          alt="Loading..."
          width={140}
          height={140}
          className="animate-caret-blink w-auto h-auto"
          priority
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-red-500 font-semibold gap-2">
        <p>Error: {(error as Error).message}</p>
        <p className="text-sm text-gray-400">
          Connection refused by server. Please check your internet or reload.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 md:px-10 mt-6">
        <h1 className="text-2xl md:text-3xl font-medium">All Sale Products</h1>
      </div>

      <div className="px-4 md:px-10 mt-4">
        <div className="w-full border-b-2 border-red-600 h-20 bg-gradient-to-r from-transparent via-black to-transparent flex items-center rounded-2xl px-4 md:px-6">
          <h3 className="font-semibold text-lg text-red-600">On Sale Now</h3>
        </div>

        <div className="w-full mt-2 rounded-2xl bg-gradient-to-r from-transparent via-black to-transparent flex justify-center items-center gap-4 flex-wrap p-4">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-400 py-10">
              No products found matching "{query}"
            </div>
          ) : (
            filteredProducts.map((item: Product) => {
              const { id, title, image, price, category } = item;
              const route = getProductRoute(category, id);


              if (!route) return null;

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
                    <p className="text-red-500 font-bold mt-2 text-lg">
                      ${price}
                    </p>
                  </div>

                  {/* Dynamic Route Link */}
                  <Link
                    href={route}
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
            })
          )}
        </div>
      </div>
    </>
  );
};

export default AllSalePage;