import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState, useEffect } from "react";

const useGetData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, "bookings"));
                const fetchedData = [];
                querySnapshot.forEach((doc) => { 
                    fetchedData.push({ id: doc.id, ...doc.data() });
                });
                setData(fetchedData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
        return () => {
        };
    }, []);

    return { data, loading, error };
};

export default useGetData;
