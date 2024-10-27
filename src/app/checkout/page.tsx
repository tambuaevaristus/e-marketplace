"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import LikeButton from "@/components/LikeButton";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import InputNumber from "@/shared/InputNumber/InputNumber";

import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutPage = () => {
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("@cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart) as CartItem[]);
    }
  }, []);

  // Calculate subtotal based on cart items
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Update quantity for a cart item and recalculate subtotal
  const handleQuantityChange = (name: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const renderProduct = (item: CartItem) => {
    const { name, image, price, quantity } = item;

    return (
      <div key={name} className="flex py-5 last:pb-0">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl md:h-40 md:w-40">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="font-medium md:text-2xl ">
                  <Link href={`/products/`}>{name}</Link>
                </h3>
              </div>
              <span className="font-medium md:text-xl">{price}FCFA</span>
            </div>
          </div>
          <div className="flex w-full items-end justify-between text-sm">
            <div className="flex items-center gap-3">
              <LikeButton />
              <AiOutlineDelete className="text-2xl" />
            </div>
            <div>
              <InputNumber
                quantity={quantity}
                onChange={(newQuantity) => handleQuantityChange(name, newQuantity)} item={undefined as any}                // item={undefined}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
          />
        </div>

        <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === "PaymentMethod"}
            onOpenActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            onCloseActive={() => setTabActive("PaymentMethod")}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl font-semibold sm:text-3xl lg:text-4xl ">
            Checkout
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">{renderLeft()}</div>

          <div className="my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:lg:mx-14 2xl:mx-16 " />

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-neutral-300">
              {cart.map((item) => renderProduct(item))}
            </div>

            <div className="mt-10 border-t border-neutral-300 pt-6 text-sm">
              <div className="flex justify-between pt-4 text-base font-semibold">
                <span>Total</span>
                <span className="text-2xl"> {calculateSubtotal()} FCFA</span>
              </div>
            </div>
            <ButtonPrimary className="mt-8 w-full">Confirm order</ButtonPrimary>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
