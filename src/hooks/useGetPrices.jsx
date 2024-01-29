import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useGetPrices = () => {
    const [loading, setLoading] = useState(true);
    const [prices, setPrices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            setLoading(true);
            setError(null);

            try {
                const pricesCollectionRef = collection(db, 'masterDb');
                const pricesSnapshot = await getDocs(pricesCollectionRef);
                const pricesData = pricesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPrices(pricesData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPrices();
    }, [/* Add dependencies here if needed */]);

    return { loading, prices, error };
};

export default useGetPrices;
