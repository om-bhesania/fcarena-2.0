 
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';


export const fetchTimeSlotsFromFirestore = async () => {
    const timeSlotsCollection = collection(db, 'timeSlots');
    const snapshot = await getDocs(timeSlotsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updatePriceInFirestore = async (id, newPrice) => {
    const slotDocRef = doc(db, 'timeSlots', id);
    await updateDoc(slotDocRef, { price: newPrice });
};

export const syncTimeSlotsWithFirestore = async () => {
    const timeSlots = await fetchTimeSlotsFromFirestore();
    return timeSlots;
};
