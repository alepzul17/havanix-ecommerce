import Image from "next/image";
import Link from "next/link";

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
  console.log(products);
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-2 sm:flex w-screen mb-9">
        {products.map((item: Product) => (
          <Link
            href={`/products/${item.id}`}
            key={item.id}
            className="sm:w-70 w-52 hover:border hover:border-black overflow-hidden"
          >
            <Image
              src={item.images[0]}
              alt={item.title}
              width={200}
              height={100}
              className="sm:w-100"
            />
            <div className="">
              <h4 className="mt-2 text-base font-bold text-wrap">
                {item.title}
              </h4>
              <p className="font-extralight">{item.category}</p>
              <p className="font-extralight">${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
