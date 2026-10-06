type ProductProps = {
  product: {
    title: string;
    description: string;
    category: string;
    price: number;
    returnPolicy: string;
  };
};

export default function ProductInfo({ product }: ProductProps) {
  return (
    <div className="p-6">
      <p className="w-fit font-semibold px-1 py-0.5 bg-teal-200">
        {product.category}
      </p>
      <h2 className="text-3xl font-bold my-5">{product.title}</h2>
      <p className="text-teal-700">{product.description}</p>
      <p className="my-3 w-fit font-semibold  py-0.5">{product.returnPolicy}</p>
      <h3 className="text-3xl my-4 font-light ">$ {product.price}</h3>
    </div>
  );
}
