"use client";
import React, { useState } from "react";
import { CarProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";
import { CustomButton } from ".";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}
const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, make, model, year, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);
  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content_title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrbold">
        <span className="selt-start text-[14px] font-semibold">Rs</span>
        {carRent}
        <span className="selt-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative flex w-full mt-2 ">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={generateCarImageUrl(car)}
              height={20}
              width={20}
              alt="steering wheel"
              className=""
            />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={`/tire.svg`}
              height={20}
              width={20}
              alt="tire"
              className=""
            />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={`/gas.svg`}
              height={20}
              width={20}
              alt="steering wheel"
              className=""
            />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[14px] font-bold"
            rightIcon={`/right-arrow.svg`}
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={()=>setIsOpen(false)} car={car}
      />
    </div>
  );
};

export default CarCard;
