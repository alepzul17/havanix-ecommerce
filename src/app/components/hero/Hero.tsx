import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative">
      <div className="flex w-full">
        <div className="w-full md:w-1/2">
          <Image
            src="/model3.png"
            alt=""
            width={600}
            height={400}
            className="md:w-full md:h-screen"
          />
        </div>
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/model4.webp"
            alt=""
            width={600}
            height={400}
            className="w-full h-full md:w-full md:h-screen"
          />
        </div>
      </div>

      <div className="absolute bottom-1/5 flex flex-col gap-6 m-4 items-start md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <h3 className="text-background text-5xl font-bold md:text-6xl">
          WEAR YOUR OWN WAY.
        </h3>
        <p className="text-2xl font-light text-secondary">
          Discover everyday streetwear designed to express your style with
          confidence.
        </p>
        <button
          type="button"
          className="bg-primary rounded-full px-3 py-2 text-sm text-background hover:bg-[#e64400]"
        >
          VIEW COLLECTION
        </button>
      </div>
    </div>
  );
}
