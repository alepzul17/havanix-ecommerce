"use client";
import { Product } from "@/app/api/product";

import { useCart } from "@/context/CartContext";

export default function AddToCart({ data }: { data: Product }) {
  const { cart, setCart } = useCart();
  //   console.log(cartContext);
  function handleClick() {
    const existingProduct = cart.find((item) => item.id === data.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === data.id
          ? {
              ...item,
              quantity: item.quantity++,
            }
          : item,
      );

      setCart(updatedCart);
    } else {
      const newProduct = {
        id: data.id,
        price: data.price,
        quantity: 1,
      };

      setCart([...cart, newProduct]);
    }
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
