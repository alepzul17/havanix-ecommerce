const API_URL = "https://dummyjson.com";

export async function getProductsByCategory(category: string) {
  const res = await fetch(`${API_URL}/products/category/${category}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
