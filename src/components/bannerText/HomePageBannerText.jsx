
import Button from '../buttons/Button'; 
const HomePageBannerText = ({ customTitleClass, customTaglineClass, spanColor, customContainer }) => {
    const baseColor = 'text-secondary'
    return (
        <>
            <div className={`${customContainer} container flex flex-col justify-center items-center z-[0] max-w-[90%]`}>
                <h1 className={`${customTitleClass} text-center banner-title lg:text-[60px] text-[30px] text-white capitalize font-bold md:whitespace-nowrap sm:whitespace-normal`}>Welcome to <span className={`${spanColor} || ${baseColor} font-heading whitespace-nowrap`} >FcArena <i className="fa-light fa-futbol"></i></span></h1>
                {/* <h1 className={`${customTitleClass} text-center banner-title text-[60px] text-white capitalize font-bold md:whitespace-nowrap sm:whitespace-normal flex items-center justify-center gap-3`}>Welcome to <span className={`${spanColor} || ${baseColor} font-heading flex items-center justify-center gap-3 `} >FcArena <Logo customClass="h-[80px]" /></span></h1> */}
                <span className={`${customTaglineClass} text-center w-full md:text-[30px] text-[15px] text-white capitalize font-medium`}>The Heart of Athletic Excellence!</span>
                <div className="flex w-full gap-9 pt-5 items-start justify-center">
                    <Button
                        role={"link"}
                        variant={'primary'}
                        label="Book Now"
                        btnColor={'red-100'}
                        customClass={'self-start md:w-[182px] md:py-4 py-3 text-xl text-center'}
                        url={'/bookings'}
                    />
                    <Button
                        role={'link'}
                        variant={'outlineSecondary'}
                        label="Contact Us"
                        btnColor={'red-100'}
                        customClass={'self-start md:w-[182px] md:py-4 py-3 text-xl text-center'}
                        url={'/contactUs'}
                    />
                </div>
            </div>
        </>
    )
}

export default HomePageBannerText