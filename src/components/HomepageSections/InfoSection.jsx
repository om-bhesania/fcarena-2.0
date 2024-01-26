import { useState } from 'react';
import { Link } from 'react-router-dom';
import Images from '../Utils/images';
import Button from '../buttons/Button';

const info = [
    {
        index: 1,
        infoTitle: "Elevate Your Game with FcArena's FIFA Approved Turf",
        info: "Experience the pinnacle of sporting excellence with FcArena's FIFA Approved Turf. Crafted to exacting standards, our turf offers unparalleled performance, durability, and safety. Whether you're a professional athlete or an enthusiastic amateur, FcArena's FIFA Approved Turf guarantees an authentic playing experience, empowering you to push the boundaries of your game. Elevate your matches with a surface trusted by the world's leading football organizations. Choose quality. Choose precision. Choose FcArena's FIFA Approved Turf.",
        graphics: Images[0].infographics[0].img,
    },
    {
        index: 2,
        infoTitle: "Experience Seamless Access Anytime, Anywhere at FcArena",
        info: "At FcArena, we redefine convenience with our 24x7 On service. Embrace the freedom to engage in your favorite activities whenever inspiration strikes. Whether it's a spontaneous workout session or a midnight match under the stars, FcArena's facilities are always ready to accommodate your passion. With 24x7 On, the boundaries of time dissolve, giving you the flexibility to pursue your interests around the clock. Seize the moment. Embrace the possibilities. Experience 24x7 On like never before, only at FcArena.",
        graphics: Images[0].infographics[1].img,
    },
    {
        index: 3,
        infoTitle: "The Height of Sporting Excellence FcArena",
        info: "Discover the pinnacle of sporting excellence at FcArena's Tallest Turf in Vadodara. Our iconic venue boasts the city's tallest turf, offering unmatched performance and excitement for athletes and enthusiasts alike. From corporate events to thrilling sports competitions, our versatile space promises unforgettable experiences. Join us at FcArena and elevate your game on Vadodara's tallest turf. Unlock possibilities, ignite passions, and make lasting memories with us.",
        graphics: Images[0].infographics[2].img
    },
];

const InfoSection = () => {
    const [expandedSections, setExpandedSections] = useState([]);

    const toggleReadMore = (index) => {
        setExpandedSections((prevExpanded) => {
            const isExpanded = prevExpanded.includes(index);
            if (isExpanded) {
                return prevExpanded.filter((item) => item !== index);
            } else {
                return [...prevExpanded, index];
            }
        });
    };

    return (
        <section className="infographics pt-[50px] pb-[20px]">
            <div className="container md:max-w-[60%] max-w-[90%]">
            <p className='text-3xl md:text-5xl font-semibold font-mono text-primary text-center pb-[20px] mb-[20px] border-b-4 rounded-xl '>Our Services</p>
                {info.map((item, index) => (
                    <div className="info-graphics flex items-center lg:flex-row md:flex-col justify-between py-[50px] h-full gap-[30px] border-b last-of-type:border-0" key={index}>
                        <div className="info-graphics-description md:max-w-[55%] max-w-full flex items-start justify-between flex-col h-full gap-[20px]">
                            <h1 className="info-title text-4xl font-heading font-bold text-primary">{item.infoTitle}</h1>
                            <span className={`info text-lg font-medium text-bodyTextDark text-justify ${expandedSections.includes(index) ? '' : 'line-clamp-5'}`}>{item.info}</span>
                            <Button onClick={() => toggleReadMore(index)} role={'link'} customClass="font-bold" variant={'link'} label={expandedSections.includes(index) ? 'Read Less' : 'Read More'} url={''} />
                        </div>
                        <div className="info-graphics-img">
                            <img src={item.graphics} alt="" className="max-h-full" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InfoSection;
