import { getProductsByCategory } from "@/api/product";
import Navbar from "../components/navbar/Navbar";
import Products from "./product";
import Footer from "../components/footer/Footer";
export default async function ProductPage() {
  const shoes = await getProductsByCategory("mens-shoes");
  const watches = await getProductsByCategory("mens-watches");
  const shirts = await getProductsByCategory("mens-shirts");

  return (
    <div>
      <Navbar />
      <Products
        shoes={shoes.products}
        watches={watches.products}
        shirts={shirts.products}
      />
      <Footer />
    </div>
  );
}
