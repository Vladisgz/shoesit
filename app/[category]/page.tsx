import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

async function getData(category: string | null) {
  const query = category
    ? `*[_type == "product" && category->name == "${category}"] {
        _id,
          "imageUrl": images[0].asset->url,
          price,
          name,
          "slug": slug.current,
          "category": category->name,
          sale,
          percent
      }`
    : `*[_type == "product"] {
      _id,
        "imageUrl": images[0].asset->url,
        price,
        name,
        "slug": slug.current,
        "category": category->name,
        sale,
        percent
    }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(
    params.category === "All" ? null : params.category,
  );

  const titleCategory =
    params.category === "All"
      ? "All Shoes For U"
      : `Our shoes for ${params.category}`;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {titleCategory}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl}
                    alt="Product image"
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                    priority
                  />
                </Link>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 font-bold">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 ">
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
