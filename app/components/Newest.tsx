import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt desc) {
    _id,
      price,
      name,
      "slug": slug.current,
      "category": category->name,
      "imageUrl": images[0].asset->url,
      sale,
      percent
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-wide text-gray-800">
            Newest products
          </h2>

          <Link href="/All" className="text-primary flex items-center gap-x-1">
            See all stuff{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="w-full  aspect-square overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl}
                    alt="Product images"
                    className="w-full h-full object-cover object-center"
                    width={300}
                    height={300}
                  />
                </Link>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-gray-800">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {product.category}
                  </p>
                </div>
                {product.sale ? (
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-700">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-normal text-gray-500 line-through">
                      ${(product.price + product.percent).toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold text-green-700">
                      {product.percent}% off
                    </p>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-800 tracking-wide">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
