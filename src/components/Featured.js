import React from "react";
import useFetch from "../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "https://mybooking-i6bm.onrender.com/api/hotels/countByCity?cities=delhi,mumbai,chennai,gujarat"
  );

  return (
    <>
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featured flex  w-full max-w-5xl justify-between gap-5 z-0 px-4 lg:px-0 ">
            <div className="featuredItem relative bg-white rounded-[10px] h-64 overflow-hidden">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
                alt="img"
              />
              <div className="featuredTitles absolute bottom-5 left-5">
                <h1 className="font-extrabold text-white text-2xl">
                  New Delhi
                </h1>
                <h2 className="font-bold text-white text-lg">
                  {data[0]} properties
                </h2>
              </div>
            </div>
            <div className="featuredItem relative bg-white rounded-[10px] h-64 overflow-hidden">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
                alt="img"
              />
              <div className="featuredTitles absolute bottom-5 left-5">
                <h1 className="font-extrabold text-white text-2xl">Mumbai</h1>
                <h2 className="font-bold text-white text-lg">
                  {data[1]} properties
                </h2>
              </div>
            </div>
            <div className="featuredItem relative bg-white rounded-[10px] h-64 overflow-hidden">
              <img
                src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
                alt="img"
              />
              <div className="featuredTitles absolute bottom-5 left-5">
                <h1 className="font-extrabold text-white text-2xl">Chennai</h1>
                <h2 className="font-bold text-white text-lg">
                  {data[2]} properties
                </h2>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Featured;
