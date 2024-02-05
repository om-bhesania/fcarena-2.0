import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useAddBookings = () => {
    const bookingsCollectionRef = collection(db, "bookings");

    const CreateBookings = async ({ name, contact, date, timeSlots,payment_id,Amount_payed }) => {
        try {
            await addDoc(bookingsCollectionRef, {
                name,
                payment_id,
                contact,
                date,
                timeSlots,
                createdAt: serverTimestamp(),
                Amount_payed,
            });
            return true; // Return true if booking creation is successful
        } catch (error) { 
            return false; // Return false if booking creation fails
        }
    };

    return { CreateBookings };
}

export default useAddBookings;
