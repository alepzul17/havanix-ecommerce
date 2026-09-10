"use client";
import { useState } from "react";
import Card from "./product";

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
export default function NewArrivals({
  shoes,
  watches,
}: {
  shoes: Product[];
  watches: Product[];
}) {
  const [category, setCategory] = useState<"shoes" | "watches">("shoes");

  const products = category === "shoes" ? shoes : watches;
  return (
    <section className="w-full flex flex-col">
      <div className="ml-7">
        <h2 className=" text-4xl font-semibold my-5">New Arrivals</h2>
        <div className="mb-6 flex gap-4">
          <button
            className={`text-xl cursor-pointer hover:underline hover:underline-offset-8 ${category == "shoes" ? "underline underline-offset-8" : ""}`}
            onClick={() => setCategory("shoes")}
          >
            Shoes
          </button>
          <button
            className={`ml-6 text-xl cursor-pointer hover:underline hover:underline-offset-8 ${category == "watches" ? "underline underline-offset-8" : ""}`}
            onClick={() => setCategory("watches")}
          >
            watches
          </button>
        </div>
      </div>
      {/* YANG BOLEH SCROLL SAHAJA */}
      <Card products={products} />
    </section>
  );
}
