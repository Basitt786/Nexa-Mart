"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/delete-product";

const DeleteProductButton = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      const result = await deleteProduct(id);
      if (!result.success) {
        alert("Failed to delete product.");
      }
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-700 p-1.5 disabled:opacity-50"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
};

export default DeleteProductButton;