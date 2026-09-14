"use client";

import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { addToCart } from "@/app/store/slices/cartSlice";

type Props = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const AddToCartButton = ({ id, title, price, image }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, image }));
    alert("Product added to cart!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95"
    >
      <ShoppingCart className="w-5 h-5 text-gray-300 dark:text-gray-700" />
      <span>Add to Cart</span>
    </button>
  );
};

export default AddToCartButton;