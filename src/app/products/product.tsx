"use client";
import { useState } from "react";
import ProductCard from "./productCard";

type Product = {
  id: number;
  title: string;
  meta: {
    createdAt: string;
    updatedAt: string;
  };
  images: [string];
  price: number;
  category: string;
};

export default function Products({
  shoes,
  watches,
  shirts,
}: {
  shoes: Product[];
  watches: Product[];
  shirts: Product[];
}) {
  const [category, setCategory] = useState<"shoes" | "watches" | "shirts">(
    "shirts",
  );
  const products =
    category === "shoes" ? shoes : category === "watches" ? watches : shirts;

  return (
    <>
      <div className="p-6">
        <h1 className="font-semibold text-2xl mb-4">Men</h1>
        <div className="mb-6 flex gap-4">
          <button
            className={`text-xl cursor-pointer hover:underline hover:underline-offset-8 ${category == "shirts" ? "underline underline-offset-8" : ""}`}
            onClick={() => setCategory("shirts")}
          >
            Shirts
          </button>
          <button
            className={`ml-6 text-xl cursor-pointer hover:underline hover:underline-offset-8 ${category == "shoes" ? "underline underline-offset-8" : ""}`}
            onClick={() => setCategory("shoes")}
          >
            Shoes
          </button>
          <button
            className={`ml-6 text-xl cursor-pointer hover:underline hover:underline-offset-8 ${category == "watches" ? "underline underline-offset-8" : ""}`}
            onClick={() => setCategory("watches")}
          >
            Watches
          </button>
        </div>
      </div>
      <ProductCard products={products} />
    </>
  );
}
