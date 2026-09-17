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

export default function ProductCard({ products }: { products: Product[] }) {
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-2 w-screen gap-1 mb-9">
        {products.map((item: Product) => (
          <div
            key={item.id}
            className="shrink-0 md:w-70 w-52 hover:border hover:border-black overflow-hidden"
          >
            <Image
              src={item.images[0]}
              alt={item.title}
              width={200}
              height={100}
            />
            <div className="ml-4">
              <h4 className="mt-2 text-base font-bold text-wrap">
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
