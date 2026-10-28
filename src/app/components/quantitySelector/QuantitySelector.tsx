import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
export default function QuantitySelector({
  stock,
  existingQuantity,
  productId,
}: {
  stock: number;
  existingQuantity: number;
  productId: number;
}) {
  const [quantity, setQuantity] = useState(existingQuantity);
  const { status } = useSession();
  const { setCart } = useCart();

  async function updateQuantity(newQuantity: number) {
    if (status === "loading") return;

    if (status === "authenticated") {
      try {
        const response = await fetch("/api/cart", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            quantity: newQuantity,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error(result.message);
          return;
        }
      } catch (error) {
        console.error("Failed to update quantity:", error);
        return;
      }
    }

    setQuantity(newQuantity);

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }

  return (
    <div className="border border-teal-200 p-0 w-fit mt-3 flex items-center justify-between gap-5 ">
      <button
        className="w-10 h-10 pl-3 pr-2 hover:bg-teal-200 cursor-pointer"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        <span className="block w-3.5 h-0.5 bg-black"></span>
      </button>
      <p className="text-2xl w-5 text-center">{quantity}</p>
      <button
        className="w-10 h-10 text-2xl pr-2 pl-2 hover:bg-teal-200 cursor-pointer"
        onClick={() => updateQuantity(quantity + 1)}
        disabled={quantity >= stock}
      >
        +
      </button>
    </div>
  );
}
