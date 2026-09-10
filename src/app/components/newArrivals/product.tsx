"use client";
import Image from "next/image";
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
export default function Card({ products }: { products: Product[] }) {
  const item = products
    .sort(
      (a, b) =>
        new Date(b.meta.createdAt).getTime() -
        new Date(a.meta.createdAt).getTime(),
    )
    .slice(0, 5);
  return (
    <div className=" w-full overflow-x-auto overflow-y-hidden">
      <div className="flex w-max gap-1 ">
        {item.map((item: Product) => (
          <div
            key={item.id}
            className="shrink-0 md:w-70 w-60 hover:border hover:border-black overflow-hidden"
          >
            <Image
              src={item.images[0]}
              alt={item.title}
              width={200}
              height={100}
            />
            <div className="ml-3 ">
              <h4 className="mt-2 text-xl font-semibold text-wrap">
                {item.title}
              </h4>
              <p className="font-extralight">{item.category}</p>
              <p className="font-extralight">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
