export default function Footer() {
  return (
    <div className="w-full h-150 bg-black">
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-primary text-5xl font-bold my-9">Havanix</h1>
        <h3 className="text-white font-semibold my-2">WEAR YOUR OWN WAY.</h3>
        <h4 className="text-white font-light text-sm text-center">
          Discover everyday streetwear designed to express your style with
          confidence.
        </h4>
        <span className="w-full bg-muted h-0.5 my-12"></span>
      </div>

      <div className="flex justify-between mx-7">
        <ul className="text-white text-2xl">
          <li>Home</li>
          <li>Shop</li>
          <li>New Arrivals</li>
          <li>About</li>
        </ul>
      </div>
    </div>
  );
}
