import Link from "next/link";
import React from "react";

import { footerData } from "@/data/content";

import Logo from "../Logo/Logo";
import FooterBanner from "./FooterBanner";
import Subscribe from "./Subscribe";

const Footer: React.FC = () => {
  return (
    <div>
      <div className="container mb-10">
        <FooterBanner />
      </div>

      <div className="bg-black text-white">
        <div className="container grid gap-10 py-16 lg:grid-cols-2 lg:gap-0">
          <div className="space-y-10 md:pr-20">
            <Logo className="block" />
            <p className="">Thank you for choosing Hackoholics. Together, let’s redefine online shopping!</p>
          </div>

          <Subscribe />
        </div>
      </div>
    </div>
  );
};

export default Footer;
