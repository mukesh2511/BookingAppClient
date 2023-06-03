import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../hooks/useFetch.js";
import React, { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext.js";
import axios from "axios";

const Reserve = ({ setModel, hotelId }) => {
  const { data } = useFetch(
    `https://mybooking-i6bm.onrender.com/api/hotels/room/${hotelId}`
  );
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { date } = useContext(SearchContext);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const getDateRange = (startDate, endDate) => {
    const start = new Date(startDate);

    const end = new Date(endDate);
    const d = new Date(start.getTime());

    let list = [];

    while (d <= end) {
      list.push(new Date(d).getTime());
      d.setDate(d.getDate() + 1);
    }
    return list;
  };
  const allDates = getDateRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8000/api/room/availability/${roomId}`,
            { date: allDates }
          );

          setModel(false);
          return res.data;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="reserve w-screen h-screen bg-[0,0,0.5] fixed top-0 left-40  sm:left-0 flex justify-center items-center ">
        <div className="rcontainer bg-white relative p-5 ">
          <CloseIcon
            className="rClose absolute right-0 top-0 text-2xl text-slate-600 cursor-pointer"
            onClick={() => setModel(false)}
          />
          <span>Select your rooms:</span>
          {data.map((item, i) => (
            <div
              className="rItem flex items-center justify-between gap-[50px] p-5 "
              key={i}
            >
              <div className="rItemInfo flex flex-col justify-center   gap-1 ">
                <div className="rTitle font-[500]">{item.title}</div>
                <div className="rDesc font-[300]">{item.desc}</div>
                <div className="rMax text-xs">
                  Max people : <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice font-[500]">{item.price}</div>
              </div>
              <div className="flex flex-wrap gap-2 text-[8px] text-gray-500">
                {item.roomNumber.map((Rnumber) => (
                  <div className="room flex flex-col" key={Rnumber._id}>
                    <label>{Rnumber.number}</label>
                    <input
                      type="checkbox"
                      value={Rnumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(Rnumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            className="rBtn bg-[#003580]   text-white font-bold p-3 border-none  rounded-md cursor-pointer w-full"
            onClick={handleClick}
          >
            Reserve Now!
          </button>
        </div>
      </div>
    </>
  );
};

export default Reserve;
