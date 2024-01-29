import { useEffect, useState } from "react";
import { timeSlots } from "../components/Utils/Data";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useManageBookings = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [timeSlot, setTimeSlot] = useState([]);

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
    const fetchTimeSlots = async () => {
        try {
            const timeSlotsCollection = collection(db, 'timeSlots');
            const snapshot = await getDocs(timeSlotsCollection);
            console.log('Snapshot:', snapshot); // Log the snapshot
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('Data:', data); // Log the data
            setTimeSlot(data); // Store data in local storage
        } catch (error) {
            console.error('Error fetching time slots data:', error);
            setError('Error fetching time slots data'); // Set error message
        }
    };
    return { availableSlots, loading, error, handleDateChange, selectedDate,fetchTimeSlots,timeSlot };
};

export default useManageBookings;
