"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Trash2 } from "lucide-react";
import Image from "next/image";

import { useShoppingCart } from "use-shopping-cart";

export default function ShoppingCart() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    incrementItem,
    decrementItem,
    redirectToCheckout,
    clearCart,
  } = useShoppingCart();

  async function handleCheckout(event: any) {
    event.preventDefault();

    try {
      const result = await redirectToCheckout();

      if (result?.error) {
        console.log("Payment failed");
      } else {
        console.log("Payment successful");
        clearCart();
      }
    } catch (e) {
      console.error("An error occurred:", e);
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6 text-slate-800">Your cart is empty</h1>
              ) : (
                <>
                  <button
                    type="button"
                    className="text-primary hover:text-primary/75 text-sm absolute right-0 mr-6"
                    onClick={() => clearCart()}
                  >
                    Clear All
                  </button>

                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6 ">
                      <div className="w-24 h-24 flex-shrink-0  rounded-lg border border-gray-200 overflow-hidden ">
                        <Image
                          src={entry.image as string}
                          alt="Prod Image"
                          width={150}
                          height={150}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex text-base font-medium text-gray-800 justify-between">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">${entry.price.toFixed(2)}</p>
                          </div>

                          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500 gap-2 flex">
                            Quantity:
                            <button
                              type="button"
                              onClick={() => decrementItem(entry.id)}
                              disabled={entry.quantity <= 1}
                            >
                              -
                            </button>
                            {entry.quantity}
                            <button
                              type="button"
                              onClick={() => incrementItem(entry.id)}
                            >
                              +
                            </button>
                          </p>

                          <button
                            type="button"
                            className="text-primary hover:text-primary/75"
                            onClick={() => removeItem(entry.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            {!totalPrice !== undefined && (
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${totalPrice?.toFixed(2)}</p>
              </div>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Shipping and taxes are calculated at Checkout
            </p>

            <div className="grid mt-6 gap-2 lg:flex">
              <Button onClick={handleCheckout} className="lg:w-1/2">
                Checkout
              </Button>

              <Button
                variant={"secondary"}
                className="lg:w-1/2 font-madium"
                onClick={() => handleCartClick()}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
