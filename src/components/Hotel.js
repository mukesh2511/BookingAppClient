import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import MailList from "./MailList";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext.js";
import { AuthContext } from "../context/AuthContext.js";
import Reserve from "./Reserve.js";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [open, setOpen] = useState(false);
  const [sliderNumber, setSliderNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(
    `https://mybooking-i6bm.onrender.com/api/hotels/find/${id}`
  );

  const { date, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const dayDifference = (date1, date2) => {
    // if (
    //   !date1 ||
    //   !date2 ||
    //   !(date1 instanceof Date) ||
    //   !(date2 instanceof Date)
    // ) {
    //   return 0; // Return a default value or handle the error appropriately
    // }
    const start = new Date(date1);
    const end = new Date(date2);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const d1 = new Date(start.getTime());
    const d2 = new Date(end.getTime());
    const timeDiff = Math.abs(d2 - d1);
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = dayDifference(date[0].startDate, date[0].endDate);

  const photos = [
    {
      src: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450113.jpeg?k=76b3780a0e4aacb9d02ac3569b05b3c5e85e0fd875287e9ac334e3b569f320c7&o=",
    },
    {
      src: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&o=",
    },
    {
      src: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450074.jpeg?k=7039b03a94f3b99262c4b3054b0edcbbb91e9dade85b6efc880d45288a06c126&o=",
    },
    {
      src: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/100235855.jpeg?k=61ef6692e05b5971e2e8dc75687f844e6d0ad295a9a5ace17f7c713f167e61b5&o=",
    },
    {
      src: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450090.jpeg?k=52f6b8190edb5a9c91528f8e0f875752ce55a6beb35dc62873601e57944990e4&o=",
    },
    {
      src: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450058.jpeg?k=2449eb55e8269a66952858c80fd7bdec987f9514cd79d58685651b7d6e9cdfcf&o=",
    },
  ];

  const handleClick = (i) => {
    setSliderNumber(i);
    setOpen(true);
  };

  const handleMove = (operation) => {
    let newSlideNumber;
    if (operation === "decr") {
      newSlideNumber = sliderNumber === 0 ? 5 : sliderNumber - 1;
    } else {
      newSlideNumber = sliderNumber === 5 ? 0 : sliderNumber + 1;
    }
    setSliderNumber(newSlideNumber);
  };

  const handleclick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="w-fit lg:w-auto ">
        <Navbar />
        <Header type="list" />
        {loading ? (
          "Loading, please wait"
        ) : (
          <div className="hotelContainer flex flex-col items-center mt-5 relative z-0 ">
            {open && (
              <div className="slider  z-[999] sticky top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.426)] flex items-center">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="cursor-pointer absolute top-8 right-8 text-3xl text-gray-300"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  className="cursor-pointer  text-5xl text-gray-300 ml-10"
                  icon={faCircleArrowLeft}
                  onClick={() => handleMove("desc")}
                />
                <div className="sliderWrapper w-full h-full flex justify-center items-center">
                  <img
                    src={photos[sliderNumber].src}
                    alt="img"
                    className="sliderimg w-[80%] h-[80vh] "
                  />
                </div>
                <FontAwesomeIcon
                  className="cursor-pointer mr-10 text-5xl text-gray-300"
                  icon={faCircleArrowRight}
                  aria-disabled={sliderNumber <= photos.length}
                  onClick={() => handleMove("incr")}
                />
              </div>
            )}
            <div className="hotelwrapper w-full max-w-5xl flex flex-col gap-2 relative p-2">
              <button
                className="bookNow bg-[#003580]   text-white font-bold p-3 border-none absolute top-3 right-0 rounded-md cursor-pointer"
                onClick={handleclick}
              >
                Reserve or Book Now!
              </button>
              <h1 className="hotelTitle font-bold text-2xl">{data.name}</h1>
              <div className="hotelAddress text-sm flex items-center gap-2">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance text-[#0071c2] font-semibold">
                Excellent location - {data.distance} from juhu
              </span>
              <span className="hotelPriceHightlight  text-[#008009] font-semibold">
                Book a stay over ${data.cheapestPrice} at this property and get
                a free airport taxi
              </span>
              <div className="hotelImages  flex flex-col lg:flex-row lg:flex-wrap justify-between gap-1 ">
                {photos.map((photo, i) => (
                  <div className="hotelImgWrapper lg:w-[33%]  " key={i}>
                    <img
                      onClick={() => handleClick(i)}
                      className="w-full object-cover rounded-lg cursor-pointer"
                      src={photo.src}
                      alt="img"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails flex justify-between gap-5 ">
                <div className="hotelDetailText flex-[3] ">
                  <h1 className="hotelTitle font-bold mt-5 text-xl">
                    Stay in the heart of {data.title}
                  </h1>
                  <p className="hotelDesc text-sm mt-3">{data.desc}</p>
                </div>
                <div className="hotelDetailPrice flex-[1] bg-[#ebf3ff] p-5 flex flex-col gap-5">
                  <h1 className="text-md font-bold text-[#555] ">
                    Perfect for a {days}-night stay!
                  </h1>
                  <span className="text-sm">
                    Located in the real heart of Mumbai, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2 className="font-semibold">
                    <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                    nights)
                  </h2>
                  <button
                    className="bg-[#003580]   text-white font-bold p-3 border-none  rounded-md cursor-pointer"
                    onClick={handleclick}
                  >
                    Reserve or Book Now!
                  </button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        )}
        {openModal && <Reserve setModel={setOpenModal} hotelId={id} />}
      </div>
    </>
  );
};

export default Hotel;
