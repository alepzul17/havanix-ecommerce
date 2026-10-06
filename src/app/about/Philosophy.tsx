import Image from "next/image";

export default function Philosophy() {
  return (
    <div className="flex flex-col items-end mt-3 sm:flex-row-reverse sm:justify-center sm:items-start sm:gap-32 ">
      <div>
        <h2 className="text-4xl font-bold m-6 sm:m-0 sm:text-7xl">
          Our Philosophy
        </h2>
        <p className="text-lg w-76 ml-6 mb-5 font-serif italic sm:text-3xl sm:mt-6 sm:w-100">
          {`Clothing is more than what you wear.
It's a way to express your personality and
your own sense of style.`}
        </p>
      </div>
      <Image
        src={"/fashion3.jpg"}
        alt=""
        width={"350"}
        height={"350"}
        className="sm:w-1/3"
      />
    </div>
  );
}
