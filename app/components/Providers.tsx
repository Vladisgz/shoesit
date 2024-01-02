"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://shoesit-delta.vercel.app/"
      : "http://localhost:3002";

  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl={`${baseUrl}/stripe/success`}
      cancelUrl={`${baseUrl}/stripe/error`}
      currency="USD"
      billingAddressCollection={false}
      shouldPersist={true}
      language="en-Us"
    >
      {children}
    </USCProvider>
  );
}
