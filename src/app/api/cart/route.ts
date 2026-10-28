import { auth } from "../../../../auth";
import prisma from "@/lib/prisma";
import { getProductsById } from "../product";

export async function GET() {
  const session = await auth();
  if (!session) {
    return Response.json({ message: "login first" }, { status: 401 });
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      items: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (!cart) {
    return Response.json({
      cart: {
        items: [],
      },
    });
  }

  let items;
  try {
    items = await Promise.all(
      cart.items.map(async (item) => {
        const product = await getProductsById(item.productId);
        return {
          ...item,
          product,
        };
      }),
    );
  } catch (error) {
    console.error("GET CART PRODUCTS ERROR", error);
    return Response.json(
      { message: "failed to fetch cart products" },
      { status: 502 },
    );
  }
  return Response.json({
    cart: {
      ...cart,
      items,
    },
  });
}
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ message: "login first" }, { status: 401 });
  }
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");

  if (!productId || !/^\d+$/.test(productId)) {
    return Response.json(
      { message: "Product ID not available" },
      { status: 400 },
    );
  }
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!cart) {
      return Response.json({ message: "Cart not found" }, { status: 404 });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!existingItem) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    await prisma.cartItem.delete({
      where: {
        id: existingItem.id,
      },
    });

    return Response.json({
      message: "Deleted succes",
    });
  } catch (error) {
    console.error("DELETE CART ITEM ERROR", error);
    return Response.json(
      { message: "Failed to delete cart item" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      {
        message: "login first",
      },
      { status: 401 },
    );
  }
  const body: unknown = await request.json();

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ message: "invalid Json" }, { status: 400 });
  }

  const { productId } = body as Record<string, unknown>;

  if (
    typeof productId !== "number" ||
    !Number.isInteger(productId) ||
    productId <= 0
  ) {
    return Response.json({ message: "Product ID tak sah" }, { status: 400 });
  }
  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!cart) {
    return Response.json(
      {
        message: "cart not available",
      },
      {
        status: 404,
      },
    );
  }
  let product;

  try {
    product = await getProductsById(String(productId));
  } catch (error) {
    console.error("ADD TO CART PRODUCT ERROR", error);
    return Response.json(
      { message: "Failed to fetch product data" },
      { status: 502 },
    );
  }
  if (
    typeof product.stock !== "number" ||
    !Number.isFinite(product.stock) ||
    product.stock < 0
  ) {
    return Response.json(
      { message: "Invalid product stock data" },
      { status: 502 },
    );
  }

  try {
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: String(productId),
        },
      },
    });
    const nextQuantity = existingItem ? existingItem.quantity + 1 : 1;

    if (nextQuantity > product.stock) {
      return Response.json({ message: "Quantity limit" }, { status: 400 });
    }
    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });

      return Response.json({ item: updatedItem });
    }
    const newItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: String(productId),
        quantity: 1,
      },
    });

    return Response.json({ item: newItem }, { status: 201 });
  } catch (error) {
    console.error("ADD TO CART ERROR", error);
    return Response.json({ message: "Failed to update cart" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ message: "login first" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ message: "data no available" }, { status: 400 });
  }
  const { productId, quantity } = body as Record<string, number>;

  if (
    typeof productId !== "number" ||
    !Number.isInteger(productId) ||
    productId <= 0 ||
    typeof quantity !== "number" ||
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    return Response.json(
      { message: "quantity or id is not valid" },
      { status: 400 },
    );
  }

  let existingItem;
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!cart) {
      return Response.json({ message: "cart not found" }, { status: 404 });
    }
    existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: String(productId),
        },
      },
    });

    if (!existingItem) {
      return Response.json(
        { message: "Product not found in cart" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("PATH CART LOOKUP ERROR", error);

    return Response.json(
      { message: "Failed to fetch cart item" },
      { status: 500 },
    );
  }

  let product;
  try {
    product = await getProductsById(String(productId));
  } catch {
    return Response.json(
      { message: "failed to fetch data product" },
      { status: 503 },
    );
  }

  if (
    typeof product.stock !== "number" ||
    !Number.isFinite(product.stock) ||
    product.stock < 0
  ) {
    return Response.json(
      { message: "Invalid product stock data" },
      { status: 502 },
    );
  }

  if (quantity > product.stock) {
    return Response.json({ message: "Quantity limit" }, { status: 400 });
  }

  try {
    const updateItem = await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity,
      },
    });
    return Response.json({
      message: "quantity updated successfully",
      item: updateItem,
    });
  } catch (error) {
    console.error("CART UPDATE ERROR:", error);
    return Response.json(
      { message: "failed to update cart quantity" },
      { status: 500 },
    );
  }
}
