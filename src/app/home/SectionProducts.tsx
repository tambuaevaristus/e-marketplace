import React from 'react';

import Filter from '@/components/Filter';
import ProductCard from '@/components/ProductCard';
import { productsSection, products } from '@/data/content';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Heading from '@/shared/Heading/Heading';

const SectionProducts = () => {
  return (
    <div className="container">
      <Heading isCenter isMain desc={productsSection.description}>
        Shop Now, Pay Later
      </Heading>
      <Filter />

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.productName}
            product={product}
            className="border-neutral-300"
          />
        ))}
      </div>

      <div className="mt-14 flex items-center justify-center">
        <ButtonPrimary>View More</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionProducts;
