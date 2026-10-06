const API_URL = "https://dummyjson.com";

export async function getProductsByCategory(category: string) {
  const res = await fetch(`${API_URL}/products/category/${category}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductsById(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
export type Product = Awaited<ReturnType<typeof getProductsById>>;
