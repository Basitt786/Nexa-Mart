import getProductById from "@/actions/get-product-by-id";
import { updateProduct } from "./actions";
import { notFound } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

const EditProductPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const numericId = Number(resolvedParams.id);
  const product = await getProductById(numericId);

  if (!product) {
    notFound();
  }

  const updateProductWithId = updateProduct.bind(null, numericId);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <Link href="/admin/products" className="text-sm text-slate-500 hover:text-slate-700">
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
          Edit Product
        </h1>
      </div>

      <form action={updateProductWithId} className="space-y-4">
        <input
          name="title"
          defaultValue={product.title}
          placeholder="Title"
          required
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          name="price"
          defaultValue={product.price}
          placeholder="Price"
          required
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          name="category"
          defaultValue={product.category}
          placeholder="Category"
          required
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          name="image"
          defaultValue={product.image}
          placeholder="Image URL"
          required
          className="w-full border rounded-lg px-4 py-2"
        />
        <textarea
          name="description"
          defaultValue={product.description ?? ""}
          placeholder="Description"
          className="w-full border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;