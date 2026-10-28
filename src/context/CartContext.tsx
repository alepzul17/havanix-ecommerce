"use client";
import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  id: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};
const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (status !== "unauthenticated") return;
  }, [status]);

  useEffect(() => {
    async function getCart() {
      if (status !== "authenticated") return;
      const response = await fetch("/api/cart");
      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }
      setCart(
        data.cart.items.map(
          (item: { productId: string; quantity: number }) => ({
            id: Number(item.productId),
            quantity: item.quantity,
          }),
        ),
      );
    }
    getCart();
  }, [status]);

  useEffect(() => {
    if (status !== "unauthenticated") return;

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, status]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
