"use client";
import { Product } from "@/app/api/product";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

export default function AddToCart({ data }: { data: Product }) {
  const { status } = useSession();
  const { setCart } = useCart();
  async function handleClick() {
    if (status === "loading") return;

    if (status === "authenticated") {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: data.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      setCart((currentCart) => {
        const existingProduct = currentCart.find((item) => item.id === data.id);

        if (existingProduct) {
          return currentCart.map((item) =>
            item.id === data.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [...currentCart, { id: data.id, quantity: 1 }];
      });

      return;
    }

    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === data.id);

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentCart, { id: data.id, quantity: 1 }];
    });
  }

  return (
    <div className="p-6">
      <h5 className="font-light text-xl tracking-widest">QUANTITY</h5>

      <button
        className="mt-7 bg-primary w-full py-3 rounded-xl text-white cursor-pointer hover:bg-orange-400"
        onClick={handleClick}
      >
        ADD TO CART
      </button>
    </div>
  );
}
