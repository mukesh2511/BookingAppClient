import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Featured from "./Featured";
import PropertyList from "./PropertyList";
import FeaturedProperty from "./FeaturedProperty";
import MailList from "./MailList";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="w-fit lg:w-auto">
      <Navbar />
      <Header />
      <div className="homeContainer flex items-center justify-center flex-col mt-[50px] gap-[30px]">
        <Featured />
        <h1 className="homeTitle w-[1024px] text-xl font-bold px-4 lg:px-0 ">
          Browse by property type
        </h1>
        <PropertyList />
        <h1 className="homeTitle w-[1024px] text-xl font-bold px-4 lg:px-0 ">
          Home guests love{" "}
        </h1>
        <FeaturedProperty />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
