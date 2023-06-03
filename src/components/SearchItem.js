import React from "react";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <>
      <div className="searchItem border border-gray-300 flex justify-between  gap-5 p-3 rounded-md">
        <img
          className="w-52 h-full object-cover"
          src="https://cf.bstatic.com/xdata/images/hotel/square600/450590765.webp?k=a2291718891e69dfca6b48d001f51316a1cd9702f4674f96ce66e38931444261&o=&s=1"
          alt="img"
        />
        <div className="siDesc flex flex-col flex-[2] gap-[10px]">
          <h1 className="siTitle text-[20px] font-bold text-[#0071c2]">
            {item.name}
          </h1>
          <span className="siDistance text-[12px]">
            {item.distance} km from beach
          </span>
          <span className="siTaxiOp text-[12px] bg-green-600 text-white p-1 rounded-lg w-max">
            Free airport taxi
          </span>
          <span className="siSubtitle text-[12px] font-bold">
            Studio Appartments with Air conditioning
          </span>
          <span className="siFeatures text-[12px] ">{item.desc}</span>
          <span className="CancelOp text-[12px] text-green-600 font-bold">
            Free cancellation
          </span>
          <span className="siCancelOpSubtitle text-[12px] text-green-600">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails flex-1 flex flex-col justify-between">
          {item.rating && (
            <div className="siRatingContainer flex justify-between">
              <span>Excellent</span>
              <button className="bg-[#003580]  w-[30px] text-white font-bold mr-2">
                {item.rating}
              </button>
            </div>
          )}
          <div className="siDetailTexts flex flex-col text-right gap-[5px]">
            <span className="siPrice text-2xl">${item.cheapestPrice}</span>
            <span className="siTaxOp text-gray-500 text-[12px]">
              Includes taxes and fees
            </span>
            <Link to={`/hotels/${item._id}`}>
              <button className="siSearchButton bg-[#0071c2] text-white font-semibold p-2 w-full border-none cursor-pointer rounded-md">
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
