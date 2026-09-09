"use client";
import Image from "next/image";
import { useRef, useState } from "react";

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

export default function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section className="w-full overflow-hidden flex flex-col ">
      <h2 className=" text-4xl font-semibold underline underline-offset-8 text-center p-8">
        New Arrivals
      </h2>

      {/* YANG BOLEH SCROLL SAHAJA */}
      <div className=" w-full overflow-y-hidden">
        <div className="flex w-max gap-1 ">
          {products.map((product: Product) => (
            <div key={product.id} className="shrink-0 md:w-50 w-60">
              <Image
                src={product.images[0]}
                alt={product.title}
                width={200}
                height={100}
              />
              <div className="ml-3 ">
                <h4 className="mt-2 text-xl font-semibold text-wrap">
                  {product.title}
                </h4>
                <p className="font-extralight">{product.category}</p>
                <p className="font-extralight">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
