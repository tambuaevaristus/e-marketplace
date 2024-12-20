import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";

import avatar from "@/public/assets/images/eva.png";
import ButtonCircle3 from "@/shared/Button/ButtonCircle3";
import Input from "@/shared/Input/Input";
import Logo from "@/shared/Logo/Logo";

import CartSideBar from "../CartSideBar";
import MenuBar from "./MenuBar";

const MainNav = () => {
  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex-1 lg:hidden">
        <MenuBar />
      </div>
      <div className="flex items-center lg:basis-3/5">
        <Logo />
        <span className="my-auto ">
          {" "}
          Takam<span className="text-primary text-2xl italic font-bold">NOW</span>
        </span>
        <div className="hidden w-full ml-20 max-w-2xl items-center gap-5 rounded-full border border-neutral-300 py-1 pr-3 lg:flex">
          <Input
            type="text"
            className="border-transparent bg-white pl-10 placeholder:text-neutral-500 focus:border-transparent"
            placeholder="WHat are you looking for..."
          />
          <RiSearch2Line className="text-2xl text-neutral-500" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-5">
        {/* <div className="relative hidden lg:block">
          <span className="absolute -top-1/4 left-3/4 aspect-square w-3 rounded-full bg-red-600" />
          <FaRegBell className="text-2xl" />
        </div> */}

        <div className="flex items-center divide-x gap-4 divide-neutral-300">
          <CartSideBar />
          {/* <div>
            
          </div> */}

          <div className="h-10 items-center justify-center hidden md:flex px-2">
            <Link href={"/transactions"} className="text-primary underline">
              Transactions
            </Link>
          </div>
          <div className="flex items-center gap-2 pl-5">
            <ButtonCircle3 className="overflow-hidden bg-gray" size="w-10 h-10">
              <Image
                src={avatar}
                alt="avatar"
                className="size-full object-cover object-center"
              />
            </ButtonCircle3>
            <Link href="/signup" className="hidden text-sm lg:block">
              Tambua Evaristus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
