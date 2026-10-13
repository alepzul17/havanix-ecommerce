"use client";
import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];
  return (
    <div className="w-full px-2 sm:w-1/2 sm:p-4">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={currentImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {images.map((img, index) => (
          <div
            key={index}
            className={`cursor-pointer ${index === currentIndex ? "border-2 border-black" : "border-none"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image src={img} alt={title} width={200} height={200} />
          </div>
        ))}
      </div>
    </div>
  );
}
