import { useEffect, useState } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { data } from 'autoprefixer';

const useManageBookings = () => {
    let flag = false;
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
                const bookingCollection = collection(db, 'bookings');
                const snapshot = await getDocs(timeSlotsCollection);
                const book_snapShot = await getDocs(bookingCollection);

                const slots = Array.from({ length: 24 }, (_, index) => {
                    const hourStart = ((index + 1) % 12 || 12) + (index >= 11 && index <= 22 ? 'AM' : 'PM');
                    const hourEnd = ((index + 2) % 12 || 12) + (index >= 10 && index <= 21 ? 'AM' : 'PM');
                    return {
                        time: hourStart + ' - ' + hourEnd,
                        price: 0,
                    };
                });
                snapshot.forEach(doc => {
                    const slotTime = doc.data().slot;
                    const slotIndex = slots.findIndex(slot => slot.time === slotTime);
                    if (slotIndex !== -1) {
                        slots[slotIndex].price = doc.data().price;
                    }
                });
                book_snapShot.forEach((doc)=>{
                    if (selectedDate === doc.data().date && !flag) {
                        const bookedSlots = doc.data().timeSlots;
                        const updateSlots = slots.filter(slot => !bookedSlots.includes(slot.time)); // Filter out booked slots
                        setAvailableSlots(updateSlots);
                        flag = true;
                        return; 
                    }
                })

                if(!flag){
                    setAvailableSlots(slots);
                }

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
