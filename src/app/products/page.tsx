import { getProductsByCategory } from "@/api/product";
import Navbar from "../components/navbar/Navbar";
import Products from "./product";
import Footer from "../components/footer/Footer";
export default async function ProductPage() {
  const menShoes = await getProductsByCategory("mens-shoes");
  const menWatches = await getProductsByCategory("mens-watches");
  const menShirts = await getProductsByCategory("mens-shirts");
  const womenShoes = await getProductsByCategory("womens-shoes");
  const womenWatches = await getProductsByCategory("womens-watches");
  const womenShirts = await getProductsByCategory("womens-dresses");
  return (
    <div>
      <Navbar />
      <Products
        gender="Men"
        shoes={menShoes.products}
        watches={menWatches.products}
        shirts={menShirts.products}
      />
      <Products
        gender="Women"
        shoes={womenShoes.products}
        watches={womenWatches.products}
        shirts={womenShirts.products}
      />
      <Footer />
    </div>
  );
}
