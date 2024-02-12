import { categorizeTimeSlots } from '../Utils/Data';
import Button from './../buttons/Button';
import useFetchTimeSlots from './../../hooks/useFetchTimeSlots';
import { Badge,  useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Loading from '../Utils/loaders/Loading';
import ErrorLoader from './ErrorLoader';

const TimingsInfo = () => {
  const { morningSlots, afternoonSlots, nightSlots } = categorizeTimeSlots();
  const { timeSlotData, loading, error, fetchTimeSlots } = useFetchTimeSlots();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);
  const toast = useToast();

  useEffect(() => {
    // Check if data exists in local storage
    const cachedData = localStorage.getItem("timeSlotsData");
    const cachedTimeStamp = localStorage.getItem("timeSlotDataTimestamp");
    const cacheValidDuration = 24 * 60 * 60 * 1000; // 24 hours

    if (
      cachedData &&
      cachedTimeStamp &&
      Date.now() - parseInt(cachedTimeStamp) < cacheValidDuration
    ) {
      setFetchCounter(parseInt(localStorage.getItem("fetchCounter")) || 0);
      setDataLoaded(true);
    } else {
      // Fetch data from the database if not available or expired
      fetchTimeSlots();
    }
  }, []);

  useEffect(() => {
    if (timeSlotData.length > 0) {
      // Update fetchCounter and store it in localStorage
      localStorage.setItem("timeSlotsData", JSON.stringify(timeSlotData));
      localStorage.setItem("timeSlotDataTimestamp", Date.now());
      setDataLoaded(true);
    }
  }, [timeSlotData]);

  const handleFetchData = () => {
    if (fetchCounter < 7) {
      // Fetch data from the database
      fetchTimeSlots();
      // Update fetchCounter and store it in localStorage
      const newFetchCounter = fetchCounter + 1;
      setFetchCounter(newFetchCounter);
      localStorage.setItem("fetchCounter", newFetchCounter);
    } else {
      // Show warning toast if fetchCounter reaches 7
      toast({
        title: "Warning",
        description:
          "You have Reached the Daily limit of data Fetches please try again later",
        status: "warning",
        duration: 7000,
        position: "top",
        isClosable: true,
      });
    }
  };

  if (loading || !dataLoaded) {
    return <Loading label={"Loading Timings..."} />;
  }

  if (error) {
    return <ErrorLoader error={error.message} />;
  }
  const getPrice = (timeSlot) => {
    const slot = timeSlotData.find((slot) => slot.slot === timeSlot);
    return slot ? `₹${slot.price} - advance` : "Price not available";
  };

  return (
    <section className="timings-and-pricing">
      <div className="container">
        <div className="tnp-wrapper py-6 pt-[20%] md:pt-[8%]">
          <div className="mx-auto">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold text-primary">
                Timings and Pricing
              </span>
              <span className="text-lg text-bodyTextDark font-medium pt-3">
                Explore our available timings and pricing options note these are
                advance charges for the turf
              </span>
              <span className="text-lg text-primary font-bold mt-3 px-3 bg-yellow-300">
                These are advance slot booking prices.
              </span>
            </div>
            <Button
              variant={"outlinePrimary"}
              role={"button"}
              label={`Refresh Prices (${fetchCounter}/7)`}
              customClass={"text-primary whitespace-nowrap p-2"}
              onClick={handleFetchData}
              disabled={fetchCounter >= 7}
            />

            <div className="grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 gap-12 mt-12">
              {/* Morning Sessions */}
              <div className="bg-white p-6 rounded-md shadow-md flex flex-col">
                <span className="text-3xl font-medium text-primary border-b pb-4 ">
                  Morning Sessions
                </span>
                <div className="flex-1 pb-5 overflow-y-auto max-h-[590px]">
                  {morningSlots.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap p-3 hover:border-2"
                    >
                      <div className="flex items-center md:flex-row flex-col gap-8">
                        <span className="text-bodyTextDark font-medium text-lg">
                          {item}
                        </span>
                        <div className="badge-container flex items-center justify-between">
                          <Badge className="text-gray-600 font-medium text-sm">
                            {getPrice(item)}
                          </Badge>
                          <sub className="line-through ps-2">₹1200</sub>
                        </div>
                      </div>
                      <Button
                        variant={"outlinePrimary"}
                        role={"link"}
                        label={"Book Now"}
                        customClass={"text-primary whitespace-nowrap p-2"}
                        url={"/bookings"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Afternoon Sessions */}
              <div className="bg-white p-6 rounded-md shadow-md flex flex-col">
                <span className="text-3xl font-medium text-primary border-b pb-4">
                  Afternoon Sessions
                </span>
                <div className="flex-1 pb-5 overflow-y-auto max-h-[590px]">
                  {afternoonSlots.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap p-3 hover:border-2"
                    >
                      <div className="flex items-center md:flex-row flex-col gap-8">
                        <span className="text-bodyTextDark font-medium text-lg">
                          {item}
                        </span>
                        <div className="badge-container flex items-center justify-between">
                          <Badge className="text-gray-600 font-medium text-sm">
                            {getPrice(item)}
                          </Badge>
                          <sub className="line-through ps-2">₹1200</sub>
                        </div>
                      </div>
                      <Button
                        variant={"outlinePrimary"}
                        role={"link"}
                        label={"Book Now"}
                        customClass={"text-primary whitespace-nowrap p-2"}
                        url={"/bookings"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Evening and Night Sessions */}
              <div className="bg-white p-6 rounded-md shadow-md flex flex-col">
                <span className="text-3xl font-medium text-primary border-b pb-4">
                  Evening and Night Sessions
                </span>
                <div className="flex-1 pb-5 overflow-y-auto max-h-[590px]">
                  {nightSlots.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center  md:gap-0 gap-5 border-b hover:border-2 p-3"
                    >
                      <div className="flex items-center md:flex-row flex-col gap-8">
                        <span className="text-bodyTextDark font-medium text-lg">
                          {item}
                        </span>
                        <div className="badge-container flex items-center justify-between">
                          <Badge className="text-gray-600 font-medium text-sm">
                            {getPrice(item)}
                          </Badge>
                          <sub className="line-through ps-2">₹1200</sub>
                        </div>
                      </div>
                      <Button
                        variant={"outlinePrimary"}
                        role={"link"}
                        label={"Book Now"}
                        customClass={"text-primary whitespace-nowrap p-2"}
                        url={"/bookings"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimingsInfo;
