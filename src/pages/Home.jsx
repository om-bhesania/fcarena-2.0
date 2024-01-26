import InfoSection from "../components/HomepageSections/InfoSection"
import Location from "../components/HomepageSections/Location"
import HomePageBanner from "../components/hero/HomePageBanner"


const Home = () => {
  return (
    <>
      <HomePageBanner />
      <InfoSection />
      <Location/>
    </>
  )
}

export default Home