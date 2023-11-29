"use client";
import React from "react";
import { SearchManufacturer } from ".";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={`/magnifying-glass.svg`}
      alt="magnifying-glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = ({setManufacturer,setModel}) => {
  const [searchManufacturer, setSearchManufacturer] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchManufacturer === "" && searchModel === "") {
      return alert("please fill in the search bar");
    }

      // for search when click search icon 
     // updateSearchParams(searchModel.toLowerCase(),searchManufacturer.toLowerCase())

     setModel(searchModel)
     setManufacturer(searchManufacturer)
     
   }

 
 

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
         selected={searchManufacturer}
         setSelected={setSearchManufacturer}
        />

        {/* this <SearchButton/>  component is defined here at top and used only for this file*/}
        <SearchButton otherClasses={`sm:hidden`} />
      </div>

      <div className="searchbar__item">
        <Image
          src={`/model-icon.png`}
          width={25}
          height={25}
          className="absolute w-[20px] ml-4"
          alt="car model"
        />

        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder="Search here"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
