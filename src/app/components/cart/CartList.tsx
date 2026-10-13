"use client";

import { getProductsById } from "@/api/product";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import QuantitySelector from "../quantitySelector/QuantitySelector";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
  totalPrice: number;
};

export default function CartList() {
  const { cart, setCart } = useCart();
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
        stock: product.stock,
        quantity: cart[index].quantity,
        totalPrice: product.price * cart[index].quantity,
      }));

      setProduct(cartProducts);
    }
    fetchProduct();
  }, [cart]);
  const totalPrice = product.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);

  console.log();

  console.log(product);
  return (
    <div className="flex flex-col my-10 p-5">
      <h1 className="text-3xl font-extrabold text-center mb-6">Cart</h1>

      <div className="sm:flex sm:justify-between p-5">
        {product.length === 0 ? (
          <h3 className="text-2xl font-bold text-center w-1/2 ">
            There are no items in your cart
          </h3>
        ) : (
          <div className=" bg-teal-100 rounded-2xl">
            {product.map((item) => (
              <div key={item.id} className="flex items-center p-4">
                <div className="bg-stone-200 rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    height={200}
                    width={200}
                  />
                </div>

                <div className="ml-4 flex flex-col gap-5">
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p>$ {item.totalPrice}</p>
                  <QuantitySelector
                    stock={item.stock}
                    quantity={item.quantity}
                    setQuantity={(newQuantity) => {
                      setCart(
                        cart.map((cartItem) =>
                          cartItem.id === item.id
                            ? { ...cartItem, quantity: newQuantity }
                            : cartItem,
                        ),
                      );
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="w-full rounded-2xl mt-12 bg-teal-100 p-3">
          <h3 className="text-xl font-semibold tracking-wide">Order Summary</h3>
          <div className="mt-5 flex justify-between">
            <p className="text-xl font-light">Sub total</p>
            <p>$ {totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-5 flex justify-between">
            <p className="text-xl font-light">Shipping & tax</p>
            <p>$ 0</p>
          </div>
          <hr className="mt-5" />
          <div className="mt-5 flex justify-between">
            <p className="text-xl font-light">Total</p>
            <p>$ {totalPrice.toFixed(2)}</p>
          </div>
          <button className="mt-7 bg-primary w-full py-3 rounded-full font-bold tracking-wider text-white cursor-pointer hover:bg-orange-400">
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
}
