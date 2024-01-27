import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Button from '../components/buttons/Button';
import { Badge, useToast } from '@chakra-ui/react';

const Dashboard = () => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [newPriceForAll, setNewPriceForAll] = useState('');
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const toast = useToast();

    // Function to fetch time slots from Firestore
    const fetchTimeSlots = async () => {
        try {
            const timeSlotsCollection = collection(db, 'timeSlots');
            const snapshot = await getDocs(timeSlotsCollection);
            console.log('Snapshot:', snapshot); // Log the snapshot
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('Data:', data); // Log the data
            setTimeSlots(data);
            setSearchResults(data); // Initialize search results with all time slots
            localStorage.setItem('timeSlots', JSON.stringify(data)); // Store data in local storage
        } catch (error) {
            console.error('Error fetching time slots data:', error);
            setError('Error fetching time slots data'); // Set error message
        }
    };

    // Function to handle modifying the price of a time slot
    const handleModifyPrice = async (id, newPrice) => {
        try {
            const slotDocRef = doc(db, 'timeSlots', id);
            await updateDoc(slotDocRef, { price: newPrice });
            const updatedTimeSlots = timeSlots.map(slot => {
                if (slot.id === id) {
                    return { ...slot, price: newPrice };
                } else {
                    return slot;
                }
            });
            setTimeSlots(updatedTimeSlots);
            localStorage.setItem('timeSlots', JSON.stringify(updatedTimeSlots)); // Update data in local storage
            toast({
                title: `Successfully Updated`,
                status: 'success',
                isClosable: true,
                position: 'top-right',
                duration: 5000,
                size: 'xl'
            })
        } catch (error) {
            console.error('Error updating price:', error);
            toast({
                title: `Something Went Wrong`,
                status: 'error',
                isClosable: true,
                position: 'top-right',
                duration: 5000
            })
        }
    };

    // Function to handle saving a new price for all time slots
    const handleSaveAll = async () => {
        if (newPriceForAll !== '') {
            try {
                const batch = writeBatch(db);
                timeSlots.forEach(slot => {
                    const slotDocRef = doc(db, 'timeSlots', slot.id);
                    batch.update(slotDocRef, { price: newPriceForAll });
                });
                await batch.commit();
                const updatedTimeSlots = timeSlots.map(slot => ({ ...slot, price: newPriceForAll }));
                setTimeSlots(updatedTimeSlots);
                localStorage.setItem('timeSlots', JSON.stringify(updatedTimeSlots)); // Update data in local storage
                toast({
                    title: `Successfully Updated`,
                    status: 'success',
                    isClosable: true,
                    position: 'top-right',
                    duration: 5000
                })
            } catch (error) {
                console.error('Error updating all prices:', error);
                toast({
                    title: `Something Went Wrong`,
                    status: 'error',
                    isClosable: true,
                    position: 'top-right',
                    duration: 5000
                })

            }
        }
    };

    // Function to sync time slots from Firestore
    const handleSyncTimeSlots = async () => {
        await fetchTimeSlots();
    };

    // Function to handle search
    useEffect(() => {
        const results = timeSlots.filter(slot =>
            slot.slot.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slot.session.toLowerCase().includes(searchTerm.toLowerCase()) ||
            slot.price.toString().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, timeSlots]);

    useEffect(() => {
        // Check if data exists in local storage on page load
        const storedData = localStorage.getItem('timeSlots');
        if (storedData) {
            setTimeSlots(JSON.parse(storedData)); // Load data from local storage
        } else {
            fetchTimeSlots(); // Fetch data from Firestore if not in local storage
        }
    }, []); // Empty dependency array to run only once on mount

    return (
        <section className="timings-and-pricing py-[30%] md:py-[7%]">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-2xl font-bold mb-4">Time Slots Manager</h2>
                    <Button
                        role='link'
                        variant={'outlinePrimary'}
                        label={<>Sync <i className="fas fa-sync"></i></>}
                        onClick={handleSyncTimeSlots} // Call sync function on button click
                    />
                </div>

                <div className="flex md:items-center items-start justify-between md:flex-row flex-col">
                    {/* Input for modifying all prices */}
                    <div className="modifying-all-prices flex items-center gap-3 md:pt-0 pt-10">
                        <input
                            type="number"
                            value={newPriceForAll}
                            onChange={(e) => setNewPriceForAll(e.target.value)}
                            placeholder="Enter new price for all"
                            className="border p-2 rounded-md border-primary"
                        />
                        <Button
                            variant={'primary'}
                            label={<>Save All</>}
                            onClick={handleSaveAll}
                            customClass={'py-2 px-5'}
                        />
                    </div>

                    {/* Search input */}
                    <div className="search-input mt-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search time slots"
                            className="border p-2 rounded-md border-primary"
                        />
                    </div>

                </div>
                {/* Display time slots */}
                <div className="Display-time-slots">
                    {error ? (
                        <div className="w-full flex items-center text-center justify-center">
                            <span className='text-2xl text-red-600 '>{error}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col mt-6 gap-4">
                            {searchResults.map(slot => (
                                <div key={slot.id} className="p-4 border rounded-lg flex md:flex-row flex-col md:items-center items-start md:justify-between ">
                                    <div className="flex flex-col gap-3">
                                        <span className='badge'>
                                            {slot.session === 'morning' ? (
                                                <Badge variant="subtle" colorScheme="green">{slot.session}</Badge>
                                            ) : slot.session === 'afternoon' ? (
                                                <Badge variant="subtle" colorScheme="orange">{slot.session}</Badge>
                                            ) : (
                                                <Badge variant="subtle" colorScheme="purple">{slot.session}</Badge>
                                            )}
                                        </span>
                                        <p className="text-xl font-semibold">{slot.slot}</p>
                                    </div>
                                    <div className="text-gray-600 flex md:items-center items-start md:flex-row flex-col gap-5">
                                        <div className="flex md:flex-row gap-6 items-center">
                                            <input
                                                type="number"
                                                value={slot.price}
                                                onChange={(e) => handleModifyPrice(slot.id, e.target.value)}
                                                className="h-8 sm:h-10 md:h-12 border-primary border rounded-md p-2 font-medium"
                                            />
                                            <Button
                                                onClick={() => handleModifyPrice(slot.id, slot.price)}
                                                variant={'outlinePrimary'}
                                                label={<><span className='whitespace-nowrap'><span>Save</span> <i className="fas fa-save"></i></span></>}
                                                customClass={'text-primary flex-1'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Dashboard;
