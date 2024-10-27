"use client";

import type { FC } from "react";
import React, { useState } from "react";

export interface InputNumberProps {
  quantity: number;
  item: CartItem;
  onChange?: (value: number) => void;
 
}
interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}


const InputNumber: FC<InputNumberProps> = ({ quantity, onChange }) => {
  const [value, setValue] = useState(quantity);

  // useEffect(() => {
  //   setValue(quantity);
  // }, [value]);

  const handleClickDecrement = () => {
    setValue((state) => {
      return state - 1;
    });
    onChange && onChange(value - 1);
  };
  const handleClickIncrement = () => {
    setValue((state) => {
      return state + 1;
    });
    onChange && onChange(value + 1);
  };

  return (
    <div
      className={`nc-InputNumber flex items-center justify-between space-x-5 w-full`}
    >
      <div className="nc-NcInputNumber__content flex w-[104px] items-center justify-between sm:w-28">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
          type="button"
          onClick={handleClickDecrement}
          disabled={0 >= value}
        >
          -
        </button>
        <span className="block flex-1 select-none text-center leading-none">
          {value}
        </span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400"
          type="button"
          onClick={handleClickIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default InputNumber;
