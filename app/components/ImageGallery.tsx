"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";

interface iAppProps {
  images: any;
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleImageClick = (image: any) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            {urlFor(image) && (
              <Image
                src={urlFor(image).url()}
                width={200}
                height={200}
                alt="photo"
                className="h-full w-full object-cover object-center cursor-pointer"
                onClick={() => handleImageClick(image)}
                priority
              />
            )}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg  bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url()}
          alt="Big Pic"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
