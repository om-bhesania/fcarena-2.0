
import { motion, AnimatePresence } from "framer-motion";
import { info } from "../components/Utils/Data";
import Location from "../components/HomepageSections/Location"
const About = () => {


  return (
    <section className="about md:py-[7%] py-[30%]">
      <div className="container">
        <h1 className="text-4xl font-bold text-primary">About Us</h1>
        {info.map((item, index) => (
          <div
            className="info-graphics flex items-center lg:flex-row md:flex-col justify-between py-[50px] h-full gap-[30px] border-b last-of-type:border-0"
            key={index}
          >
            <div className="info-graphics-description md:max-w-[55%] max-w-full flex items-start justify-between flex-col h-full gap-[20px]">
              <h1 className="info-title text-4xl font-heading font-bold text-primary">{item.infoTitle}</h1>
              <AnimatePresence>
                <motion.span
                  key={index}
                  className={`info text-lg font-medium text-bodyTextDark text-justify`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {item.info}
                </motion.span>
              </AnimatePresence>

            </div>
            <AnimatePresence>
              <motion.div
                className="info-graphics-img"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <img src={item.graphics} alt="" className="max-h-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
        <Location />
        <div className="gallery py-6 pt-[5%]">
        </div>
      </div>
    </section>
  );
};

export default About;
