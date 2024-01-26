import { Link } from "react-router-dom";
import bg from "../../assets/bg.mp4";
import HomePageBannerText from "../bannerText/HomePageBannerText";

const HomePageBanner = () => {
  return (
    <>
      <section className="Hero-banner relative">
        <div className="overlay absolute top-0 left-0 h-full w-full bg-black opacity-[0.6] -z-[2]"></div>
        <video
          loop
          autoPlay
          muted
          preload="auto"
          className="w-full lg:h-[100%] h-[950px] object-cover mt-[-8rem] -z-[3] before:content-[''] before:bg-black relative"
        >
          <source src={bg} type="video/mp4" />
          Your browser does not support the video tag.

        </video>
        <HomePageBannerText
          customContainer={'absolute md:top-[50%] top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] -z[999]'}
        />
        {/* <div className="scroll-down-container l grid place-content-center animate-bounce absolute md:bottom-[10%] bottom-[22%] md:left-[50%] left-[45%] translate-x-[50px] translate-y-[-50%]"> */}
          <div className="scroll-down-container grid place-content-center animate-bounce absolute md:bottom-[10%] bottom-[22%] left-0 w-full translate-x-[50px] translate-y-[-50%]">
            <div className="arrow-down top-arrow"></div>
            <div className="arrow-down bottom-arrow"></div>
          </div> 
      </section>
    </>
  );
};

export default HomePageBanner;
