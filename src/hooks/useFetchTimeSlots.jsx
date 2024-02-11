import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useFetchTimeSlots = () => {
  const [timeSlotData, setTimeSlotData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTimeSlots = async () => {
    try {
      const timeSlotsCollection = collection(db, 'timeSlots');
      const snapshot = await getDocs(timeSlotsCollection);
      const data = snapshot.docs.map(doc => doc.data());
      setTimeSlotData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  return { timeSlotData, loading, error, fetchTimeSlots };
};

export default useFetchTimeSlots;
