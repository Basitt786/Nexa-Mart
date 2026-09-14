import Link from "next/link";
import Image from "next/image";
import fetchAllProducts from "@/actions/get-all-products";
import DeleteProductButton from "@/components/DeleteProductButton";

const ManageProductsPage = async () => {
  const products = await fetchAllProducts();

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Manage Products
        </h1>
        <Link
          href="/admin/add-product"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No products yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4"
            >
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 dark:text-white line-clamp-1">
                  {product.title}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {product.category} • Rs {Number(product.price).toLocaleString("en-PK")}
                </p>
              </div>

              <Link
                href={`/admin/edit-product/${product.id}`}
                className="text-blue-600 hover:underline text-sm font-medium px-3 py-1.5"
              >
                Edit
              </Link>

              <DeleteProductButton id={product.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProductsPage;