"use client";

import type { FC } from "react";
import React from "react";
import { TbTruckDelivery } from "react-icons/tb";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import FormItem from "@/shared/FormItem";
import Radio from "@/shared/Radio/Radio";

interface Props {
  isActive: boolean;
  onCloseActive: () => void;
  onOpenActive: () => void;
}

const ShippingAddress: FC<Props> = ({
  onCloseActive,
}) => {
  return (
    <div className="rounded-xl border border-neutral-300 ">
      <div className="flex flex-col items-start p-6 sm:flex-row">
        <span className="hidden sm:block">
          <TbTruckDelivery className="text-3xl text-primary" />
        </span>

        <div className="flex w-full items-center justify-between">
          <div className="sm:ml-8">
            <span className="uppercase">Buy now pay Latter</span>
            <div className="mt-1 text-sm font-semibold">
              <span className="">Molyko Buea Cameroon</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <FormItem label="Pay Options">
          <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            <Radio
              label="Pay In Full"
              id="Address-type-home"
              name="Address-type"
              defaultChecked
            />
            <Radio
              label="Buy Now Pay Later (Minimum Deposit of 20%)"
              id="Address-type-office"
              name="Address-type"
            />
          </div>
        </FormItem>
      </div>

      {/* ============ */}
      <div className="flex flex-col p-6 sm:flex-row">
        <ButtonPrimary className="shadow-none sm:!px-7" onClick={onCloseActive}>
          Save and go to Payment
        </ButtonPrimary>
        <ButtonSecondary
          className="mt-3 sm:ml-3 sm:mt-0"
          onClick={onCloseActive}
        >
          Cancel
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default ShippingAddress;
