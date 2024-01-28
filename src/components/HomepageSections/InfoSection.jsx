import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Button from '../buttons/Button';
import { info } from '../Utils/Data';

const InfoSection = () => { 
    const controls = useAnimation(); // Animation controls for the container
    const scrollTriggerRef = useRef(null);
 
    useEffect(() => {
        const handleScroll = () => {
            if (scrollTriggerRef.current) {
                const scrollPosition = window.scrollY + window.innerHeight;
                const elementPosition = scrollTriggerRef.current.offsetTop;
    
                if (scrollPosition > elementPosition - 200) {
                    controls.start("visible");
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [controls]);
    const [animatedSections, setAnimatedSections] = useState([]);
    const infoRef = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            infoRef.current.forEach((section, index) => {
                if (section.offsetTop < scrollPosition - 200) {
                    setAnimatedSections((prevSections) => {
                        if (!prevSections.includes(index)) {
                            return [...prevSections, index];
                        }
                        return prevSections;
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <section className="infographics pt-[50px] pb-[20px] overflow-hidden">
            <div className="container md:max-w-[60%] max-w-[90%]">
                <p className='text-3xl md:text-5xl font-semibold font-mono text-primary text-center pb-[20px] mb-[20px] border-b-4 rounded-xl '>Our Services</p>
                {info.map((item, index) => (
                    <div
                        ref={(el) => (infoRef.current[index] = el)}
                        key={index}
                        className="info-graphics flex items-center lg:flex-row md:flex-col justify-between py-[50px] h-full gap-[30px] border-b last-of-type:border-0"
                    >
                        <motion.div
                            className="info-graphics-description md:max-w-[55%] max-w-full flex items-start justify-between flex-col h-full gap-[20px]"
                            initial={{ opacity: 0, x: '-100%' }}
                            animate={animatedSections.includes(index) ? { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } } : {}}
                        >
                            <h1 className="info-title text-4xl font-heading font-bold text-primary">{item.infoTitle}</h1>
                            <span className={`info text-lg font-medium text-bodyTextDark text-justify line-clamp-4`}>{item.info}</span>
                            <Button role={'link'} customClass="font-bold" variant={'link'} label={'Read More'} url={'/about'} />
                        </motion.div>
                        <motion.div
                            className="info-graphics-img"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={animatedSections.includes(index) ? { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } } : {}}
                        >
                            <img src={item.graphics} alt="" className="max-h-full" />
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InfoSection;
