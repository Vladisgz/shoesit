"use client";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { CartProduct } from "./AddToBag";

export default function CheckoutPage({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: CartProduct) {
  const { checkoutSingleItem, clearCart } = useShoppingCart();

  async function buyNow(priceId: string) {
    try {
      console.log("Before checkoutSingleItem");
      await checkoutSingleItem(priceId);
      console.log("After checkoutSingleItem");
      clearCart();
      console.log("Cart cleared after successful checkout");
    } catch (e) {
      console.error("Error during checkout: ", e);
    }
  }

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };
  return (
    <Button
      onClick={() => {
        buyNow(product.price_id);
      }}
    >
      Add To Cart
    </Button>
  );
}
