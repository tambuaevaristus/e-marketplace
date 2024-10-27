"use client";
import type { StaticImageData } from "next/image";
import type { FC } from "react";

import React from "react";
import { BsBag } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { MdStar } from "react-icons/md";
import ImageShowCase from "@/components/ImageShowCase";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Heading from "@/shared/Heading/Heading";
import { useRouter } from "next/navigation";
import { addToCart } from "@/utils/useCart";

interface SectionProductHeaderProps {
  overview: string;
  shots: StaticImageData[];
  productName: string;
  prevPrice: number;
  currentPrice: number;
  coverImage: string;
  rating: number;
  pieces_sold: number;
  reviews: number;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}
const SectionProductHeader: FC<SectionProductHeaderProps> = ({
  shots,
  overview,
  coverImage,
  productName,
  prevPrice,
  currentPrice,
  rating,
  pieces_sold,
  reviews,
}) => {
  const router = useRouter();

  const product: CartItem = {
    name: productName,
    price: currentPrice,
    quantity: 1,
    image: coverImage,
  };

  return (
    <div className="items-stretch justify-between space-y-10 lg:flex lg:space-y-0">
      <div className="basis-[50%]">
        <ImageShowCase shots={shots} />
      </div>

      <div className="basis-[45%] px-10">
        <Heading className="mb-0" isMain title="new arrival!">
          {productName}
        </Heading>

        <div className="mb-10 flex items-center">
          <GoDotFill className="mx-3 text-neutral-500" />
          <div className="flex items-center gap-1">
            <MdStar className="text-yellow-400" />
            <p className="text-sm">
              {rating}{" "}
              <span className="text-neutral-500">{`(${reviews} Reviews)`}</span>
            </p>
          </div>
          <GoDotFill className="mx-3 text-neutral-500" />
          <p className="text-neutral-500">{`${pieces_sold} items sold`}</p>
        </div>
        <p className="text-neutral-500 pb-10">{`${overview} items sold`}</p>

        <div className="mb-5 space-y-1">
          <p className="text-neutral-500 line-through">{prevPrice}FCFA</p>
          <h1 className="text-3xl font-medium">{currentPrice}FCFA</h1>
        </div>

        <div className="mt-5 flex items-center gap-5">
          <ButtonPrimary
            className="w-full"
            onClick={() => {
              router.push("/checkout");
            }}
          >
            Buy Now
          </ButtonPrimary>
          <ButtonSecondary
            onClick={() => addToCart(product)}
            className="flex w-full items-center gap-1 border-2 border-primary text-primary"
          >
            <BsBag /> Add to cart
          </ButtonSecondary>
        </div>

        <div className="my-10 flex items-end justify-between">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27109.07078416831!2d9.266656149999998!3d4.158704950000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1061318cda977e19%3A0xbc804daf08362334!2sNjeiforbi%20Complex%20Buea!5e1!3m2!1sen!2scm!4v1729949353317!5m2!1sen!2scm"
            width="600"
            height="450"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionProductHeader;
