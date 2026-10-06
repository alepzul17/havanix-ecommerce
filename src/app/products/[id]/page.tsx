"use server";
import { getProductsById } from "@/api/product";
import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import AddToCart from "./AddToCart";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProductsById(id);
  const { title, description, category, price, returnPolicy } = data;
  const productInfo = {
    title,
    description,
    category,
    price,
    returnPolicy,
  };

  return (
    <div>
      <Navbar />

      <ProductGallery images={data.images} title={data.title} />
      <ProductInfo product={productInfo} />
      <AddToCart data={data} />
      {/* <Footer /> */}
    </div>
  );
}
