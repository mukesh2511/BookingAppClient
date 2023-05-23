import React from "react";
import useFetch from "../hooks/useFetch";

const FeaturedProperty = () => {
  const { data, loading, error } = useFetch(
    "https://mybooking-i6bm.onrender.com/api/hotels?featured=true"
  );
  return (
    <>
      {loading ? (
        "loading, please wait"
      ) : (
        <div className="fp flex w-full max-w-5xl gap-5 px-4 lg:px-0 ">
          {data.map((item, i) => (
            <div className="fpItem flex flex-col" key={i}>
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
                alt="img"
              />
              <span className="fpName font-bold ">{item.name} </span>
              <span className="fpCity ">{item.city} </span>
              <span className="fpPrice font-semibold">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fprate">
                  <button className="bg-[#003580]  w-[30px] text-white font-bold mr-2 ">
                    {item.rating}
                  </button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FeaturedProperty;
