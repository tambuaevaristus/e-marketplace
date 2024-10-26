import React from 'react';

import ButtonSecondary from '@/shared/Button/ButtonSecondary';

const PromoTag = () => {
  return (
    <div className='relative h-full space-y-10 rounded-2xl bg-primary bg-[url("/bgPromo.png")] bg-cover bg-right bg-no-repeat p-5 font-bold text-white'>
      <h1 className="text-[40px] font-medium">No Wait, Just Pay Later! </h1>
      <p className="w-[90%]">
        Afford more of what you love without any financial stress. Pay in easy
        installments that are designed to match your needs and lifestyle,
        helping you budget better while enjoying your purchase now.{' '}
      </p>
      <ButtonSecondary className="bg-white text-primary" sizeClass="px-5 py-4">
        Visit Stores
      </ButtonSecondary>
    </div>
  );
};

export default PromoTag;
