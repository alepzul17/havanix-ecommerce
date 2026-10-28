"use client";

import { getProductsById } from "@/app/api/product";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import QuantitySelector from "../quantitySelector/QuantitySelector";
import { useSession } from "next-auth/react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
  totalPrice: number;
};

type CartResponseItem = {
  quantity: number;
  product: {
    id: number;
    title: string;
    price: number;
    images: string[];
    stock: number;
  };
};

export default function CartList() {
  const { status } = useSession();
  const { cart, setCart } = useCart();
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    if (status === "loading") return;

    async function fetchProduct() {
      try {
        if (status === "authenticated") {
          const res = await fetch("/api/cart");

          if (!res.ok) {
            throw new Error("Failed to fetch cart");
          }

          const data = await res.json();

          setProduct(
            data.cart.items.map((item: CartResponseItem) => ({
              id: item.product.id,
              title: item.product.title,
              price: item.product.price,
              image: item.product.images[0],
              stock: item.product.stock,
              quantity: item.quantity,
              totalPrice: item.product.price * item.quantity,
            })),
          );

          return;
        }

        const cartProducts = await Promise.all(
          cart.map(async (item) => {
            const data = await getProductsById(item.id.toString());

            return {
              id: data.id,
              title: data.title,
              price: data.price,
              image: data.images[0],
              stock: data.stock,
              quantity: item.quantity,
              totalPrice: data.price * item.quantity,
            };
          }),
        );

        setProduct(cartProducts);
      } catch (error) {
        console.error("FAILED TO LOAD CART:", error);
      }
    }

    fetchProduct();
  }, [status, cart]);
  const totalPrice = product.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);

  async function handleRemove(productId: number) {
    if (status === "loading") return;

    if (status === "authenticated") {
      const response = await fetch(`/api/cart?productId=${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result.message);
        return;
      }
    }

    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
    setProduct((currentProducts) =>
      currentProducts.filter((item) => item.id !== productId),
    );
  }

  return (
    <div className="flex flex-col my-10 p-5">
      <h1 className="text-3xl font-extrabold text-center mb-6">Cart</h1>

      <div className="sm:flex sm:justify-center gap-5 sm:items-center sm:mx-10">
        <div className="sm:h-150 sm:overflow-y-scroll sm:rounded-2xl">
          {product.length === 0 ? (
            <h3 className="text-2xl font-bold text-center sm:w-1/2">
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
                    <div className="flex gap-3 items-end">
                      <QuantitySelector
                        stock={item.stock}
                        existingQuantity={item.quantity}
                        productId={item.id}
                      />
                      <button
                        className="bg-primary px-2 rounded-md cursor-pointer hover:bg-orange-400"
                        onClick={() => {
                          handleRemove(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* order summary section */}
        <div className="w-full sm:w-1/2 rounded-2xl mt-12 bg-teal-100 p-3">
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
