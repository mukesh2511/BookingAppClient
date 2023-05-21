import React from "react";

const MailList = () => {
  return (
    <>
      <div className="mail w-full mt-12 flex flex-col items-center bg-[#003580] text-white p-12 gap-4">
        <h1 className="mailTitle font-semibold text-3xl">
          Save time, save money!
        </h1>
        <span>Sign up and we'll send the best deals to you</span>
        <div className="mailInputContainer flex items-center">
          <input
            className="w-[300px] h-8 p-4 border-none  mr-2 rounded-[5px]"
            type="text"
            placeholder="Your email address"
          />
          <button className="bg-[#0071c2] h-8 text-white p-1 font-semibold rounded-[5px] cursor-pointer ">
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};

export default MailList;
