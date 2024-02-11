import { Link } from 'react-router-dom';
import Logo from './../Utils/Logo';
import { FooterMenuItems } from '../Utils/Data';
import Button from '../buttons/Button';

const Footer = () => {
    return (
        <footer className="footer bg-primary py-5">
            <div className="container mx-auto">
                <div className="footer__container flex flex-col md:flex-row justify-between items-center border-b pb-5 mb-5">
                    <div className="footer__container--logo flex flex-col md:flex-row justify-center md:justify-between w-full items-center">
                        <div className="flex items-center mb-4 md:mb-0 md:gap-0 gap-5">
                            <Logo customClass={'max-w-[50px] md:max-w-[80px] '} />
                            <div className="flex flex-col md:ml-5 text-left justify-between h-full ">
                                <h1 className="text-white text-2xl md:text-3xl font-bold">FcArena</h1>
                                <span className="text-white text-base md:text-lg font-medium">The Heart of Athletic Excellence!</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                                {FooterMenuItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={`/${item.toLowerCase().replace(
                                            /\s/g,
                                            '-'
                                        )}`}
                                        className={`px-3 md:px-4 py-2 ${location.pathname === `/${item.toLowerCase().replace(/\s/g, '-')}`} text-white capitalize font-semibold text-base md:text-lg`}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                    <p className='text-white text-base mb-2 md:mb-0'>&copy; FcArenaVadodara. All rights reserved. </p>
                    <div className="flex md:space-x-4 mt-2 md:mt-0 flex-col md:flex-row">
                        <Button label={'Terms & Conditions'} url={'/terms-&-conditions'} variant={'link'} customClass={'text-white underline text-sm whitespace-nowrap'} />
                        <Button label={'Privacy Policy'} url={'/privacy-policy'} variant={'link'} customClass={'text-white underline text-sm whitespace-nowrap'} />
                        <Button label={'Cancellation & Refund'} url={'/cancellation-&-refund'} variant={'link'} customClass={'text-white underline text-sm whitespace-nowrap'} />
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
