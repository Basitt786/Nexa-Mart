"use client";

import { useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";

const ImageWithSpinner = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(true);
  

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {loading && <Spinner />}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="160px"
        className={`object-contain transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageWithSpinner;
