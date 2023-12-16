import AddToBag from "@/app/components/AddToBag";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import Link from "next/link";

async function getData(slug: string) {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0] {
    _id,
      images,
      price,
      name,
      description,
      "slug": slug.current,
      "category": category->name,
      price_id,
      sale,
      rating,
      reviews, 
      percent
    }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPge({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  let shippingTerm = "";

  if (data.price < 100) {
    shippingTerm = "4-6 days shipping";
  } else if (data.price >= 100 && data.price <= 150) {
    shippingTerm = "2-4 days shipping";
  } else {
    shippingTerm = "1-2 days express shipping";
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 ">
          <ImageGallery images={data.images} />

          <div className="md:py-4">
            <div className="mb-2 md:mb-3">
              <h2 className="text-lg lg:text-xl font-medium text-gray-800">
                {data.name}
              </h2>
              <span className="mb-0.5 inline-block text-gray-500">
                {data.category}
              </span>
            </div>

            {data.sale ? (
              <div className="flex items-end gap-3">
                <span className="text-sm lg:text-base tracking-wide font-bold text-gray-700 ">
                  ${data.price.toFixed(2)}
                </span>
                <span className="text-sm lg:text-base tracking-wide font-medium text-gray-500 line-through">
                  ${(data.price + data.percent).toFixed(2)}
                </span>
                <span className="text-sm text lg:text-base font-semibold text-green-700">
                  {data.percent}% off
                </span>
              </div>
            ) : (
              <span className="text-sm lg:text-base tracking-wide font-bold text-gray-700 ">
                ${data.price.toFixed(2)}
              </span>
            )}

            <div className="flex mt-10 mb-4">
              <div className="grid grid-cols-3  gap-2 rounded-lg">
                <Button className="w-full h-full" variant={"secondary"}>
                  US 5
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 5.5
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 6
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 6.5
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 7
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 7.5
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 8
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 8.5
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 9
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 10
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 11
                </Button>
                <Button className="w-full h-full" variant={"secondary"}>
                  US 12
                </Button>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10 ">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">{data.rating}</span>
                <Star className="h-4 w-4"></Star>
              </Button>

              <span className="text-sm lg:text-base text-gray-500 transition duration-300 ">
                {data.reviews} Reviews
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-lg">
              <AddToBag
                key={data._id}
                currency="USD"
                name={data.name}
                description={data.description}
                price={data.price}
                image={data.images[0]}
                price_id={data.price_id}
              />
              <Link href={`/${data.category}`}>
                <Button variant={"secondary"}>To Shop</Button>
              </Link>
            </div>

            <div className="mt-2 lg:mt-4 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm lg:text-base items-center justify-center">
                {shippingTerm}
              </span>
            </div>

            <p className="mt-8 mb-2 text-sm lg:text-base text-gray-600 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
