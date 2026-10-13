export default function QuantitySelector({
  stock,
  quantity,
  setQuantity,
}: {
  stock: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  return (
    <div className="border border-teal-200 p-0 w-fit mt-3 flex items-center justify-between gap-5 ">
      <button
        className="w-10 h-10 pl-3 pr-2 hover:bg-teal-200 cursor-pointer"
        onClick={() => setQuantity(Math.max(quantity - 1, 0))}
        disabled={quantity <= 0}
      >
        <span className="block w-3.5 h-0.5 bg-black"></span>
      </button>
      <p className="text-2xl w-5 text-center">{quantity}</p>
      <button
        className="w-10 h-10 text-2xl pr-2 pl-2 hover:bg-teal-200 cursor-pointer"
        onClick={() => setQuantity(Math.min(quantity + 1, stock))}
        disabled={quantity >= stock}
      >
        +
      </button>
    </div>
  );
}
