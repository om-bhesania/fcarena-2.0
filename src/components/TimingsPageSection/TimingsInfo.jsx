 
 
import { categorizeTimeSlots } from '../Utils/Data';
import Button from './../buttons/Button';
import useFetchTimeSlots from './../../hooks/useFetchTimeSlots';
import { Badge } from '@chakra-ui/react';

const TimingsInfo = () => {
  const { morningSlots, afternoonSlots, nightSlots } = categorizeTimeSlots();
  const { timeSlotData, loading, error } = useFetchTimeSlots();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getPrice = (timeSlot) => {
    const slot = timeSlotData.find(slot => slot.slot === timeSlot);
    return slot ? `₹${slot.price}/hour` : 'Price not available';
  };

  return (
    <section className="timings-and-pricing">
      <div className="container">
        <div className="tnp-wrapper py-6 pt-[8%]">
          <div className="mx-auto">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold text-primary">Timings and Pricing</span>
              <span className="text-lg text-bodyTextDark font-medium pt-3">Explore our available timings and pricing options</span>
            </div>

            <div className="grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 gap-12 mt-12">
              {/* Morning Sessions */}
              <div className="bg-white p-6 rounded-md shadow-md flex flex-col">
                <span className="text-3xl font-medium text-primary border-b pb-4 ">Morning Sessions</span>
                <div className="flex-1 pb-5 overflow-y-auto max-h-[590px]">
                  {morningSlots.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 hover:border-2">
                      <span className="text-bodyTextDark font-medium text-lg">{item}</span>
                      <Badge className="text-gray-600 font-medium text-sm">{getPrice(item)}</Badge>
                      <Button variant={'outlinePrimary'} role={'link'} label={'Book Now'} customClass={'text-primary whitespace-nowrap'} url={'/bookings'} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Afternoon Sessions */}
              <div className="bg-white p-6 rounded-md shadow-md flex flex-col">
                <span className="text-3xl font-medium text-primary border-b pb-4">Afternoon Sessions</span>
                <div className="flex-1 pb-5 overflow-y-auto max-h-[590px]">
                  {afternoonSlots.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 hover:border-2">
                      <span className="text-bodyTextDark font-medium text-lg">{item}</span>
                      <Badge className="text-gray-600 font-medium text-sm">{getPrice(item)}</Badge>
                      <Button variant={'outlinePrimary'} role={'link'} label={'Book Now'} customClass={'text-primary'} url={'/bookings'} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Evening and Night Sessions */}
              <div className="bg-white p-6 rounded-md shadow-md flex flex-col">
                <span className="text-3xl font-medium text-primary border-b pb-4">Evening and Night Sessions</span>
                <div className="flex-1 pb-5 overflow-y-auto max-h-[590px]">
                  {nightSlots.map((item, index) => (
                    <div key={index} className="flex justify-between items-center hover:border-2 p-3">
                      <span className="text-bodyTextDark font-medium text-lg">{item}</span>
                      <Badge className="text-gray-600 font-medium text-sm">{getPrice(item)}</Badge>
                      <Button variant={'outlinePrimary'} role={'link'} label={'Book Now'} customClass={'text-primary'} url={'/bookings'} />
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
