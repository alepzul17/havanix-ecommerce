"use client";
import { Product } from "@/api/product";
import { useCart } from "@/context/CartContext";
import { useContext, useState } from "react";

export default function AddToCart({ data }: { data: Product }) {
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useCart();
  //   console.log(cartContext);
  function handleClick() {
    if (quantity === 0) return;
    const existingProduct = cart.find((item) => item.id === data.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === data.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item,
      );

      setCart(updatedCart);
    } else {
      const newProduct = {
        id: data.id,
        price: data.price,
        quantity: quantity,
      };

      setCart([...cart, newProduct]);
    }
    setQuantity(0);
  }

  return (
    <div className="p-6">
      <h5 className="font-light text-xl tracking-widest">QUANTITY</h5>
      <div className="border border-teal-200 p-0 w-fit mt-3 flex items-center justify-between gap-5 ">
        <button
          className="w-10 h-10 pl-3 pr-2 hover:bg-teal-200 cursor-pointer"
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
        >
          <span className="block w-3.5 h-0.5 bg-black"></span>
        </button>
        <p className="text-2xl w-5 text-center">{quantity}</p>
        <button
          className="w-10 h-10 text-2xl pr-2 pl-2 hover:bg-teal-200 cursor-pointer"
          onClick={() => setQuantity((prev) => Math.min(prev + 1, data.stock))}
        >
          +
        </button>
      </div>
      <button
        className="mt-7 bg-primary w-full py-3 rounded-xl cursor-pointer hover:bg-orange-400"
        onClick={handleClick}
      >
        ADD TO CART
      </button>
    </div>
  );
}
