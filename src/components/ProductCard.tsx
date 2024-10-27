/* eslint-disable jsx-a11y/img-redundant-alt */
import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

import type { ProductType } from '@/data/types';
import LikeButton from './LikeButton';

interface ProductCardProps {
  product: ProductType;
  className?: string;
  showPrevPrice?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  showPrevPrice = false,
}) => {
  return (
    <div
      className={`transitionEffect relative rounded-2xl p-3 shadow-md ${className}`}
    >
      <div className="h-[250px] w-full overflow-hidden rounded-2xl lg:h-[220px] 2xl:h-[300px]">
        {product.justIn && (
          <div className="absolute left-6 top-0 rounded-b-lg bg-primary px-3 py-2 text-sm uppercase text-white shadow-md">
            Just In!
          </div>
        )}
        <LikeButton className="absolute right-2 top-2" />
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.coverImage}
            alt={`${product.productName} cover photo`}
            layout="fill"
            objectFit="contain"
            objectPosition="bottom"
            className="rounded-2xl"
          />
        </Link>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{product.productName}</h3>
          <p
            className={`text-neutral-500 ${
              showPrevPrice ? 'block' : 'hidden'
            } text-sm line-through`}
          >
            {product.previousPrice} FCFA
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">{product.category}</p>
          <p className="text-lg font-medium text-primary">
            {product.currentPrice} FCFA
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
