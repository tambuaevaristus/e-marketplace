'use client';

import Image from 'next/image';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useState } from 'react';

import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import FormItem from '@/shared/FormItem';
import Input from '@/shared/Input/Input';

const KYCScreen = () => {
  const [formData, setFormData] = useState<{
    fullName: string;
    dob: string;
    idNumber: string;
    idType: string;
    photo: File | undefined | null;
  }>({
    fullName: '',
    dob: '',
    idNumber: '',
    idType: '',
    photo: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      photo: e?.target?.files && e?.target?.files[0] ? e.target.files[0] : null,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto my-10 rounded-2xl bg-white p-5 shadow-md">
      <h2 className="mb-6 text-3xl font-semibold text-primary">
        Complete Your KYC
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <FormItem label="Full Name">
          <Input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border-neutral-300 p-3 text-neutral-700 placeholder:text-neutral-500 focus:border-primary focus:outline-none"
            placeholder="Enter your full name"
            required
          />
        </FormItem>

        <FormItem label="Date of Birth">
          <Input
            id="dob"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full rounded-xl border-neutral-300 p-3 text-neutral-700 placeholder:text-neutral-500 focus:border-primary focus:outline-none"
            required
          />
        </FormItem>

        <FormItem label="ID Type">
          <select
            id="idType"
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            className="w-full rounded-xl border-neutral-300 p-3 text-neutral-700 focus:border-primary focus:outline-none"
            required
          >
            <option value="">Select ID Type</option>
            <option value="passport">Passport</option>
            <option value="nationalID">National ID</option>
            <option value="driverLicense">{`Driver's License`}</option>
          </select>
        </FormItem>

        <FormItem label="ID Number">
          <Input
            id="idNumber"
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className="w-full rounded-xl border-neutral-300 p-3 text-neutral-700 placeholder:text-neutral-500 focus:border-primary focus:outline-none"
            placeholder="Enter your ID number"
            required
          />
        </FormItem>

        <FormItem label="Upload a Photo of You Holding Your ID">
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="block w-full rounded-xl border-neutral-300 p-2 text-neutral-700 focus:border-primary focus:outline-none"
            required
          />
          {formData.photo && (
            <div className="mt-3">
              <Image
                src={URL.createObjectURL(formData.photo)}
                alt="Uploaded ID"
                width={100}
                height={100}
                className="rounded-xl shadow-lg"
              />
            </div>
          )}
        </FormItem>

        <div className="md:col-span-2">
          <ButtonPrimary type="submit" sizeClass="px-6 py-3">
            Submit KYC
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default KYCScreen;
