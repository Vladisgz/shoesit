"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function SuccessPage() {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 md:w-20 md:h-20 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-3xl text-xl text-gray-800 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thanks for choose us. Enjoy your shopping
          </p>
          <p>Have a great day!</p>

          <Button asChild className="mt-6">
            <Link href="/">Back to Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
