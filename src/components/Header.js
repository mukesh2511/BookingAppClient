import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faCartFlatbedSuitcase,
  faPerson,
  faPlane,
  faTaxi,
  faTowerCell,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "i"
            ? options[name] + 1
            : options[name] > 0
            ? options[name] - 1
            : options[name],
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <>
      <div className="header flex justify-center  bg-[#003580] text-white relative ">
        <div
          className={`headerContainer w-full max-w-5xl mt-5 ${
            type !== "list" ? "mb-[100px]" : "mb-0"
          }`}
        >
          <div className="headerList flex gap-10 mb-12 px-4 lg:px-0 ">
            <div className="headerItem flex gap-2 items-center active border border-white px-[14px] py-[8px] rounded-3xl cursor-pointer">
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            <div className="headerItem flex gap-2 items-center">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className="headerItem flex gap-2 items-center">
              <FontAwesomeIcon icon={faCartFlatbedSuitcase} />

              <span>Flight + Hotel</span>
            </div>
            <div className="headerItem flex gap-2 items-center">
              <FontAwesomeIcon icon={faCar} />

              <span>Car rentals</span>
            </div>
            <div className="headerItem flex gap-2 items-center">
              <FontAwesomeIcon icon={faTowerCell} />

              <span>Attraction</span>
            </div>
            <div className="headerItem flex gap-2 items-center">
              <FontAwesomeIcon icon={faTaxi} />

              <span>Airpot taxis</span>
            </div>
          </div>
          {type !== "list" && (
            <>
              <h1 className="hederTitle text-3xl font-bold mb-2 px-4 lg:px-0 ">
                A Lifetime of discounts? It's Genius.
              </h1>
              <p className="headerDesc mb-4 px-4 lg:px-0 ">
                Get rewarded for your travels - unlock instant savings of 10% or
                more with a free myBooking.com account
              </p>
              {!user && (
                <button className="headerButton  bg-[#0071c2]  py-3 px-3 rounded-sm font-semibold cursor-pointer ml-2 lg:ml-0">
                  Sign in / Register
                </button>
              )}
              <div className="headerSearch flex absolute bottom-[-25px] w-full max-w-5xl bg-white text-black border-solid border-4 border-[#febb02] justify-around items-center h-12 py-4">
                <div className="headerSearchItem  px-4 py-1 rounded-sm flex gap-2 items-center ">
                  <FontAwesomeIcon className="text-gray-400" icon={faBed} />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="headerSearchInput  outline-none"
                    onChange={(e) =>
                      setDestination(e.target.value.toLowerCase())
                    }
                  />
                </div>
                <div
                  className="headerSearchItem flex gap-2 items-center"
                  onClick={() => setOpenDate(!openDate)}
                >
                  <FontAwesomeIcon
                    className="text-gray-400"
                    icon={faCalendarDays}
                  />
                  <span className="headerSearchText text-gray-400 cursor-pointer">
                    {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                      date[0].endDate,
                      "MM/dd/yyyy"
                    )}`}
                  </span>{" "}
                  {openDate && (
                    <DateRange
                      className="date absolute top-10  z-10"
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      minDate={new Date()}
                    />
                  )}
                </div>
                <div className="headerSearchItem flex gap-2 items-center cursor-pointer ">
                  <FontAwesomeIcon className="text-gray-400" icon={faPerson} />
                  <span
                    className="headerSearchText text-gray-400"
                    onClick={() => setOpenOptions(!openOptions)}
                  >
                    {`${options.adult} adult . ${options.children} children . ${options.room} room`}
                  </span>
                  {openOptions && (
                    <div className="options text-gray-500 absolute top-10 bg-white rounded-sm shadow-sm w-52  z-10">
                      <div className="optionItem flex justify-between m-2">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter flex gap-2 items-center text-black">
                          <button
                            className="optionCounterButton  border-2 border-[#0071c2]  w-6 h-8 "
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.adult}
                          </span>
                          <button
                            className="optionCounterButton border-2 border-[#0071c2]  w-6 h-8 "
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="optionItem flex justify-between m-2 ">
                        <span className="optionText">Children</span>
                        <div className="optionCounter flex gap-2 items-center text-black">
                          <button
                            className="optionCounterButton border-2 border-[#0071c2]  w-6 h-8 "
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.children}
                          </span>
                          <button
                            className="optionCounterButton border-2 border-[#0071c2]  w-6 h-8  "
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="optionItem flex justify-between m-2">
                        <span className="optionText">Room</span>
                        <div className="optionCounter flex gap-2 items-center text-black ">
                          <button
                            className="optionCounterButton border-2 border-[#0071c2]  w-6 h-8  "
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">
                            {options.room}
                          </span>
                          <button
                            className="optionCounterButton border-2 border-[#0071c2]  w-6 h-8  "
                            onClick={() => handleOption("room", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="headerSearchItem bg-[#0071c2] p-1 text-white "
                  onClick={handleSearch}
                >
                  <button>Search</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
