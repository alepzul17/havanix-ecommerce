import Hero from "./components/hero/Hero";
import NewArrivals from "./components/newArrivals/NewArrivals";
import { getProductsByCategory } from "@/api/product";

export default async function Home() {
  const shoes = await getProductsByCategory("mens-shoes");
  const watches = await getProductsByCategory("mens-watches");

  return (
    <div>
      <Hero />
      <NewArrivals shoes={shoes.products} watches={watches.products} />
    </div>
  );
}
