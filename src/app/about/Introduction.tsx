import Image from "next/image";

export default function Introduction() {
  return (
    <div className="pt-6 flex flex-col sm:mx-12 sm:my-12 sm:flex-row sm:justify-center sm:gap-32">
      <div className="ml-2">
        <h2 className="font-extrabold text-3xl py-3 sm:text-7xl">About Us</h2>
        <h4 className="font-bold text-xl sm:text-5xl">WEAR YOUR OWN WAY.</h4>

        <p className="w-76 mt-8 mb-6 text-lg italic font-serif mr-6 sm:text-3xl sm:w-100">
          Havanix is a modern streetwear concept built around individuality,
          comfort, and everyday style.
        </p>
      </div>

      <Image
        src={"/fashion2.jpg"}
        alt=""
        width={"350"}
        height={"350"}
        className="sm:w-1/3"
      />
    </div>
  );
}
