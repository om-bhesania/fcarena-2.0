import React from "react";
import bg from "../../assets/bg.mp4";

const HomePageBanner = () => {
  return (
    <>
      <div className="overlay absolute top-0 left-0 h-full w-full bg-black opacity-55 -z-[2]"></div>
      <video
        loop
        autoPlay
        muted
        preload="auto"
        className="w-full lg:h-[100%] h-[800px] object-cover mt-[-8rem] -z-[3] relative"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    
    </>
  );
};

export default HomePageBanner;
