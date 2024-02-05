import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useManageBookings = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (!selectedDate) return;

            setLoading(true);
            try {
                const timeSlotsCollection = collection(db, 'timeSlots');
                const snapshot = await getDocs(timeSlotsCollection);

                // Create an array to hold 24-hour time slots with 1-hour page slots
                const slots = Array.from({ length: 24 }, (_, index) => {
                    const hourStart = ((index + 1) % 12 || 12) + ' ' + (index >= 12 ? 'PM' : 'AM');
                    const hourEnd = ((index + 2) % 12 || 12) + ' ' + ((index + 1) >= 12 ? 'PM' : 'AM');
                    return {
                        time: hourStart + ' - ' + hourEnd,
                    };
                });

                // Fill slotsData with the data from Firestore 
                snapshot.forEach((doc) => {
                  const slotTime = parseInt(doc.data().slot.split(":")[0]);
                  const price = doc.data().price;

                  // Find the index in slots array corresponding to the slotTime
                  const index = slotTime % 12;
                  const updatedSlots = [...slots];

                  // Update the price for the specific slot in the array
                  updatedSlots[index] = { ...updatedSlots[index], price };

                  // Update availableSlots state
                  setAvailableSlots(updatedSlots);
                  setLoading(false);
                });

            } catch (error) {
                setError('Error fetching available slots');
                setLoading(false);
            }
        };

        fetchAvailableSlots();
    }, [selectedDate]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };
    return { availableSlots, loading, error, handleDateChange, selectedDate };
};

export default useManageBookings;
