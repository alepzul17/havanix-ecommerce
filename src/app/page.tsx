import Hero from "./components/hero/Hero";
import NewArrivals from "./components/newArrivals/NewArrivals";

export default async function Home() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  const latestProducts = data.products.sort(
    (
      a: { createdAt: string | number | Date },
      b: { createdAt: string | number | Date },
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    },
  );

  return (
    <div>
      <Hero />
      <NewArrivals products={latestProducts} />
    </div>
  );
}
