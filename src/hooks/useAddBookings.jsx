import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useAddBookings = () => {
    const bookingsCollectionRef = collection(db, "bookings");

    const CreateBookings = async ({ name, contact, date, timeSlot }) => {
        try {
            await addDoc(bookingsCollectionRef, {
                name,
                contact,
                date,
                timeSlot,
                createdAt: serverTimestamp(),
            });
            return true; // Return true if booking creation is successful
        } catch (error) {
            console.error('Error creating booking:', error);
            return false; // Return false if booking creation fails
        }
    };

    return { CreateBookings };
}

export default useAddBookings;
