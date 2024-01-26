import { useEffect, useState } from "react";
import useGetData from "./useGetData";
import { timeSlots } from "../components/Utils/Data";

 

const useManageBookings = () => {
    const { data: bookings, loading, error } = useGetData();
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);

    useEffect(() => {
        if (bookings.length > 0 && selectedDate) {
            const bookedSlots = bookings
                .filter(booking => booking.date === selectedDate)
                .map(booking => booking.timeSlot);

            const unbookedSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
            setAvailableSlots(unbookedSlots);
        }
    }, [bookings, selectedDate]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return { availableSlots, loading, error, handleDateChange, selectedDate ,setSelectedDate };
};

export default useManageBookings;
