import ImageWithSpinner from '@/components/ImageWithSpinner';
import { ShoppingCart } from 'lucide-react';

type ProductData = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  const data: ProductData = await res.json();

  if (!data) {
    return <div className="text-white text-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-black/50 rounded-2xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          
          {/* Image Section */}
          <div className="flex items-center justify-center p-4 bg-white/5 rounded-xl">
            <ImageWithSpinner src={data.image} alt={data.title} />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-red-600 mt-10 sm:text-2xl lg:text-4xl font-bold text-center lg:text-left">
              {data.title}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base text-center lg:text-left leading-relaxed">
              {data.description}
            </p>

            {/* Price & Rating */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <p className="text-red-600 font-bold text-2xl sm:text-4xl">
                ${data.price}
              </p>
              <div className="flex items-center gap-2 text-yellow-400">
                <span>⭐ {data.rating.rate}</span>
                <span className="text-gray-400 text-sm">
                  ({data.rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 ">
              <button className="bg-blue-700 border-4 border-red-600 flex-1  hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ">
               
                Add to Cart
              </button>
              <button className="border-4 border-red-600 flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;