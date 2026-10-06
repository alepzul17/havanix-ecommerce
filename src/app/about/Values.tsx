import Image from "next/image";

export default function Values() {
  return (
    <div className="pt-6 flex flex-col sm:flex-row sm:justify-center sm:gap-32 sm:p-0 sm:my-12">
      <div className="ml-2 sm:ml-0">
        <h2 className="font-extrabold text-3xl py-3 sm:pt-0 sm:text-5xl">
          WHAT WE STAND FOR
        </h2>

        <p className="w-76 mt-3 mb-6 text-lg italic font-serif mr-6 sm:text-3xl sm:w-100">
          Everyday Essentials Simple & Versatile Made for Expression
        </p>
      </div>
      <Image
        src={"/fashion4.jpg"}
        alt=""
        width={"350"}
        height={"350"}
        className="sm:w-1/3"
      />
    </div>
  );
}
