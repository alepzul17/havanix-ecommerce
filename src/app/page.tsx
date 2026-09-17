import Collection from "./components/collection/collection";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import NewArrivals from "./components/newArrivals/NewArrivals";
import { getProductsByCategory } from "@/api/product";

export default async function Home() {
  const shoes = await getProductsByCategory("mens-shoes");
  const watches = await getProductsByCategory("mens-watches");

  return (
    <div>
      <Navbar />
      <Hero />

      <NewArrivals shoes={shoes.products} watches={watches.products} />
      <Collection />
      <Footer />
    </div>
  );
}
