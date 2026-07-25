import ImageWithSpinner from '@/components/ImageWithSpinner';
import { ShoppingCart, Zap, Star } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Build-time static generation failures aur FakeStore API blocking se bachne ke liye
export const dynamic = 'force-dynamic';

type ProductData = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating?: {
    rate: number;
    count: number;
  };
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

// 1. Helper function for consistent data fetching
async function getProduct(id: string): Promise<ProductData | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error fetching product ID ${id}:`, error);
    return null;
  }
}

// 2. Dynamic Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} | Store`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

// 3. Main Page Component
const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const data = await getProduct(resolvedParams.id);

  // Direct Next.js 404 Trigger
  if (!data || !data.id) {
    notFound();
  }

  const ratingRate = data.rating?.rate ?? 0;
  const ratingCount = data.rating?.count ?? 0;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-12 flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Image Section */}
          <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl relative group overflow-hidden">
            <div className="relative w-full aspect-square flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <ImageWithSpinner src={data.image} alt={data.title} />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-5">
            
            {/* Category Badge & Title */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-3 py-1 rounded-full border border-red-100 dark:border-red-900/50">
                {data.category}
              </span>
              <h1 className="text-gray-900 dark:text-white mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {data.title}
              </h1>
            </div>

            {/* Rating & Count */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 px-2.5 py-1 rounded-lg text-amber-700 dark:text-amber-400 text-sm font-semibold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{ratingRate}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                ({ratingCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 border-y border-gray-100 dark:border-zinc-800 py-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                ${data.price ? data.price.toFixed(2) : '0.00'}
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md font-medium border border-emerald-100 dark:border-emerald-900/50">
                In Stock
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {data.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="flex-1 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95">
                <ShoppingCart className="w-5 h-5 text-gray-300 dark:text-gray-700" />
                <span>Add to Cart</span>
              </button>

              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shadow-red-600/20 active:scale-95">
                <Zap className="w-5 h-5 fill-white" />
                <span>Buy Now</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;