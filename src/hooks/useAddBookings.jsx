import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useAddBookings = () => {
    const bookingsCollectionRef = collection(db, "bookings");

    const CreateBookings = async ({ name, contact, date, timeSlot,Payment_id }) => {
        try {
            await addDoc(bookingsCollectionRef, {
                name,
                Payment_id,
                contact,
                date,
                timeSlot,
                createdAt: serverTimestamp(),
            });
            return true; // Return true if booking creation is successful
        } catch (error) { 
            return false; // Return false if booking creation fails
        }
    };

    return { CreateBookings };
}

export default useAddBookings;
