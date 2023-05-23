import React from "react";
import useFetch from "../hooks/useFetch.js";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    "https://mybooking-i6bm.onrender.com/api/hotels/countByType"
  );

  const images = [
    "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
    "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/119467716.jpeg?k=63b69100225782d08fbd4d0205bf949c0be894ab946a0366edb8ad48e9c0ef46&o=",
    "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
    "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/100235855.jpeg?k=61ef6692e05b5971e2e8dc75687f844e6d0ad295a9a5ace17f7c713f167e61b5&o=",
    "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450058.jpeg?k=2449eb55e8269a66952858c80fd7bdec987f9514cd79d58685651b7d6e9cdfcf&o=",
  ];
  return (
    <>
      <div className="pList flex w-full max-w-5xl gap-5 justify-between px-4 lg:px-0 ">
        {loading ? (
          "Loading, please wait..."
        ) : (
          <>
            {data.length !== 0 &&
              data.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="pListItem overflow-hidden rounded-[10px] cursor-pointer flex-1"
                  >
                    <img
                      className="w-full object-cover h-40"
                      src={images[i]}
                      alt="img"
                    />
                    <h1 className="font-bold mt-1">
                      {item.type.toUpperCase()}
                    </h1>
                    <h2 className="text-gray-600">
                      {item.count} {item.type}
                    </h2>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </>
  );
};

export default PropertyList;
