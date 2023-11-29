"use client";
import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // const allCars = fetchCars({
  //   manufacturer: searchParams.manufacturer || "",
  //   year: searchParams.year || "2022",
  //   fuel: searchParams.fuel || "",
  //   limit: searchParams.limit || "10",
  //   model: searchParams.model || "",
  // });
  // console.log(allCars);

  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //for search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // for filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  //for pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || "2022",
        fuel: fuel || "",
        limit: limit || "10",
        model: model || "",
      });
      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCars();
  }, [year, fuel, limit, model, manufacturer]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl">Car Catalogue</h1>
          <p className="">Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
            <CustomFilter title="year" options={yearsOfProduction} setFilter ={setYear}/>
            {/* after writing above title and options goto component and pass that props to it */}
          </div>
        </div>
        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {/* loading */}
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image src={`/loader.svg`} alt="loader" width={50} height={50} className="object-contain" />
              </div>
            )}
            {/* button show more */}
            <ShowMore
              pageNumber={(limit) / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bolds">oops , no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
