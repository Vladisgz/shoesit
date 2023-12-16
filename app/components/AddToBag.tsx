"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

export interface CartProduct {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: CartProduct) {
  const { addItem, handleCartClick } = useShoppingCart();

  const [buttonText, setButtonText] = useState("Add To Cart");
  const [isClicked, setIsClicked] = useState(false);

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id,
  };

  const handleButtonClick = () => {
    addItem(product);
    setButtonText("To Cart");
    setIsClicked(true);
  };

  const handleCartButton = () => {
    handleCartClick();
  };

  const handleClick =
    buttonText === "Add To Cart" ? handleButtonClick : handleCartButton;

  return (
    <Button variant={isClicked ? "secondary" : "default"} onClick={handleClick}>
      {buttonText}
    </Button>
  );
}
