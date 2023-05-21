import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "./SearchItem";
import useFetch from "../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8000/api/hotels?city=${destination}&min=${min || 0}&max=${
      max || 999
    }`
  );

  const handleClick = () => {
    reFetch();
  };
  return (
    <div className="w-fit lg:w-auto">
      <Navbar />
      <Header type="list" />
      <div className="listContainer flex justify-center mt-5 ">
        <div className="listWrapper w-full max-w-5xl flex gap-5 px-2 lg:px-0">
          {/* flex-1 */}
          <div className="listsearch bg-[#febb02] flex-1 p-3 sticky top-3 rounded-lg h-max">
            <h1 className="lsTitle font-semibold text-[#555] mb-2 text-lg ">
              Search
            </h1>
            <div className="lsItem flex flex-col gap-1 mb-2">
              <label className="text-sm">Destination</label>
              <input
                type="text"
                placeholder={destination}
                className="h-8 border-none p-2 rounded-sm"
                onChange={(e) => setDestination(e.target.value.toLowerCase())}
              />
            </div>
            <div className="lsItem flex flex-col gap-1 relative">
              <label className="text-sm">Check-in Date</label>
              <span
                className="h-8 cursor-pointer p-2 rounded-sm bg-white flex items-center text-xs "
                onClick={() => setOpenDate(!openDate)}
              >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                  className="absolute top-16 "
                />
              )}
            </div>
            <div className="lsItem mt-3">
              <label htmlFor="options ">Options</label>
              <div className="lsOptions p-3">
                <div className="lsOptionItem flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput rounded-sm w-10 text "
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText ">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput rounded-sm w-10 text"
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    className="lsOptionInput rounded-sm w-10 text"
                    placeholder={options.adult}
                    min={1}
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    className="lsOptionInput rounded-sm w-10 text"
                    placeholder={options.children}
                    min={0}
                  />
                </div>
                <div className="lsOptionItem flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    className="lsOptionInput rounded-sm w-10 "
                    placeholder={options.room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button
              className="bg-[#0071c2] text-white font-semibold p-2 w-full border-none cursor-pointer"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
          {/* flex-3 */}
          <div className="listresults flex-[3]">
            {loading ? (
              "Loading, please wait"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
