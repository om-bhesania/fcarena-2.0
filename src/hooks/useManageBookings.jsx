import { useEffect, useState } from "react";
import { timeSlots } from "../components/Utils/Data";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useManageBookings = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            const fetchAvailableSlots = async () => {
                setLoading(true);
                try {
                    const bookingsRef = collection(db, "bookings");
                    const q = query(bookingsRef, where("date", "==", selectedDate));
                    const querySnapshot = await getDocs(q);
                    const bookedSlots = querySnapshot.docs.map(doc => doc.data().timeSlot);
                    const unbookedSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
                    setAvailableSlots(unbookedSlots);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };
            fetchAvailableSlots();
        }
    }, [selectedDate]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return { availableSlots, loading, error, handleDateChange, selectedDate };
};

export default useManageBookings;
