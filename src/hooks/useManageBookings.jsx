import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { data } from 'autoprefixer';

const useManageBookings = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const book_timeSlot =[];

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (!selectedDate) return;

            setLoading(true);
            try {
                const timeSlotsCollection = collection(db, 'timeSlots');
                const bookingCollection = collection(db, 'bookings')
                const snapshot = await getDocs(timeSlotsCollection);
                const book_snapShot = await getDocs(bookingCollection);

                // Create an array to hold 24-hour time slots with 1-hour page slots
                const slots = Array.from({ length: 24 }, (_, index) => {
                    const hourStart = ((index + 1) % 12 || 12) + ' ' + (index >= 12 ? 'PM' : 'AM');
                    const hourEnd = ((index + 2) % 12 || 12) + ' ' + ((index + 1) >= 12 ? 'PM' : 'AM');
                    return {
                        time: hourStart + ' - ' + hourEnd,
                    };
                });

                book_snapShot.forEach((doc)=>{
                    const timeSlots = doc.data().timeSlots;
                    timeSlots.forEach(slot => {
                        book_timeSlot.push(slot);
                    })
                })

                book_snapShot.forEach((doc)=>{
                    if(selectedDate === doc.data().date){
                        const updateSlots = slots.filter(slot => !book_timeSlot.includes(slot.time));
                        setAvailableSlots(updateSlots)
                    } else {
                        setAvailableSlots(slots);
                    }
                })


                setLoading(false);
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
