import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";




const useAddBookings = () => {
    const bookingsCollectionRef = collection(db, "bookings");
    const CreateBookings = async ({ name, contact, date, timeSlot, }) => {

        await addDoc(bookingsCollectionRef, {
            name,
            contact,
            date,
            timeSlot,
            createdAt: serverTimestamp(),
        });
    };
    return { CreateBookings };
}

export default useAddBookings