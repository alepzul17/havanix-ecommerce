"use client";

import { getProductsById } from "@/api/product";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartList() {
  const { cart } = useCart();
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const result = await Promise.all(
        cart.map((item) => getProductsById(item.id.toString())),
      );

      const cartProducts = result.map((product, index) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: cart[index].quantity,
      }));

      setProduct(cartProducts);
    }
    fetchProduct();
  }, [cart]);

  console.log(product);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
