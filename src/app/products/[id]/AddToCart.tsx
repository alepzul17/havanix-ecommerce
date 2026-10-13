"use client";
import { Product } from "@/api/product";
import QuantitySelector from "@/app/components/quantitySelector/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

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
      <QuantitySelector
        stock={data.stock}
        setQuantity={setQuantity}
        quantity={quantity}
      />
      <button
        className="mt-7 bg-primary w-full py-3 text-white cursor-pointer hover:bg-orange-400"
        onClick={handleClick}
      >
        ADD TO CART
      </button>
    </div>
  );
}
