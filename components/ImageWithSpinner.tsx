"use client";

import { useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";

const ImageWithSpinner = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const validSrc = src && src.trim() !== "" ? src : "/image.png";
  const validAlt = alt && alt.trim() !== "" ? alt : "Product image";

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {loading && !error && <Spinner />}

      <Image
        src={error ? "/image.png" : validSrc}
        alt={validAlt}
        fill
        sizes="160px"
        className={`object-contain transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
};

export default ImageWithSpinner;