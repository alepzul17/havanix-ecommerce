import Image from "next/image";
export default function CollectionCard({
  title,
  src,
}: {
  title: string;
  src: string;
}) {
  return (
    <div className="relative w-fit shrink-0 mt-5">
      <div className="absolute inset-0 flex flex-col justify-between px-5">
        <h5 className="font-medium text-3xl text-background mt-9">{title}</h5>
        <button className=" bg-background w-30 h-8 my-9 cursor-pointer hover:bg-slate-200">
          Shop Now
        </button>
      </div>

      <Image
        src={src}
        alt=""
        width={300}
        height={200}
        className="object-cover w-75 h-75 sm:w-93 sm:h-120 sm:ml-2"
      />
    </div>
  );
}
