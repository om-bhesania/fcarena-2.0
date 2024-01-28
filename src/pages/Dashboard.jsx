import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, writeBatch, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Button from '../components/buttons/Button';
import {
    Badge, Tabs, TabList, Tab, TabPanel, TabPanels, useToast, Box, Text, VStack, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter,
    FormControl,
    FormLabel,
    Select,
} from '@chakra-ui/react';
import useManageBookings from '../hooks/useManageBookings';


const Dashboard = () => {
    const { availableSlots } = useManageBookings();
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
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const bookingsCollection = collection(db, 'bookings');
            const snapshot = await getDocs(bookingsCollection);
            console.log('Snapshot:', snapshot);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('Data:', data);
            setBookings(data);
            localStorage.setItem('bookings', JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching bookings data:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch bookings data.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setError('Error fetching bookings data');
        }
    };


    const handleCancelBooking = async (id) => {
        try {
            // Remove booking from Firestore
            await deleteDoc(doc(db, 'bookings', id));

            // Update local state after deletion
            const updatedBookings = bookings.filter(booking => booking.id !== id);
            setBookings(updatedBookings);

            // Update local storage after deletion
            localStorage.setItem('bookings', JSON.stringify(updatedBookings));

            // Inform user about successful cancellation
            toast({
                title: 'Success',
                description: 'Booking canceled successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error canceling booking:', error);
            toast({
                title: 'Error',
                description: 'Failed to cancel booking.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
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
    const handleModifyBooking = async (id, newData) => {
        try {

            // Reference to the booking document in Firestore
            const bookingDocRef = doc(db, 'bookings', id);

            // Update the document with new data
            await updateDoc(bookingDocRef, newData);

            // Update local state with modified data
            const updatedBookings = bookings.map(booking => {
                if (booking.id === id) {
                    return { ...booking, ...newData };
                } else {
                    return booking;
                }
            });
            setBookings(updatedBookings);
            handleCloseEditModal();
            // Inform user about successful modification
            toast({
                title: 'Success',
                description: 'Booking modified successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error modifying booking:', error);
            toast({
                title: 'Error',
                description: 'Failed to modify booking.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
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
    const handleSyncBookings = async () => {
        await fetchBookings();
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
        const storedTimeSlots = localStorage.getItem('timeSlots');
        const storedBookings = localStorage.getItem('bookings');

        if (storedTimeSlots) {
            setTimeSlots(JSON.parse(storedTimeSlots));
        } else {
            fetchTimeSlots();
        }

        if (storedBookings) {
            setBookings(JSON.parse(storedBookings));
        } else {
            fetchBookings();
        }
    }, []);

    const [isEditing, setIsEditing] = useState(false);
    const [editedBooking, setEditedBooking] = useState(null);

    const handleOpenEditModal = (booking) => {
        setEditedBooking(booking);
        setIsEditing(true);
    };

    const handleCloseEditModal = () => {
        setIsEditing(false);
        setEditedBooking(null);
    };


    return (
        <section className="timings-and-pricing py-[30%] md:py-[7%]">
            <div className="container mx-auto px-4">
                <Tabs size='md' variant='enclosed'>
                    <TabList>
                        <Tab className='font-medium text-lg'>Time Slots</Tab>
                        <Tab className='font-medium text-lg'>Bookings</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="TimeSlots pt-5">
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
                        </TabPanel>
                        <TabPanel>

                            <div className="Bookings pt-5">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-2xl font-bold mb-4">Time Slots Manager</h2>
                                    <Button
                                        role='link'
                                        variant={'outlinePrimary'}
                                        label={<>Sync <i className="fas fa-sync"></i></>}
                                        onClick={handleSyncBookings}
                                    />
                                </div>
                                {!bookings ? (
                                    <>
                                        <div className="w-full flex items-center text-center justify-center">
                                            <span className='text-2xl text-red-600 '>No bookings found</span>
                                        </div>
                                    </>
                                ) : (
                                    <VStack spacing={8} align="stretch" className='mt-10'>
                                        {bookings.map(booking => (
                                            <Box key={booking.id} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
                                                <Box className='p-6 flex items-start justify-between'>
                                                    <Box className='flex flex-col'>
                                                        <Box d="flex" alignItems="start">
                                                            <div className=''>
                                                                <span className='text-lg font-semibold text-primary'>Date :</span> <Badge px="2" mb={2} colorScheme="teal" className='text-bodyTextDark font-medium text-lg'> {booking.date}</Badge>
                                                            </div>
                                                            <div className=''>
                                                                <span className='text-lg font-semibold text-primary'>Time Slot :</span> <Badge className='text-bodyTextDark font-medium text-lg'>{booking.timeSlot}</Badge>
                                                            </div>
                                                        </Box>

                                                        <Box mt="2">
                                                            <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                                                                <div className=''>
                                                                    <span className='text-lg font-semibold text-primary'>Name :</span> <Badge fontSize={'15'} className='text-bodyTextDark font-medium text-xl'>{booking.name}</Badge>
                                                                </div>
                                                            </Text>
                                                            <Text mt={2} color="gray.500">
                                                                <div className=''>
                                                                    <span className='text-lg font-semibold text-primary'> Contact:</span> <Badge fontSize={'15'} className='text-bodyTextDark font-medium text-xl'> {booking.contact}</Badge>
                                                                </div>
                                                            </Text>
                                                        </Box>
                                                    </Box>

                                                    <div className='flex items-end flex-col gap-5 '>
                                                        <Button variant={'outlinePrimary'} onClick={() => handleOpenEditModal(booking)} label={
                                                            <>
                                                                <span className='whitespace-nowrap text-blue-900'><span className='me-1'>Edit</span> <i className="fas fa-gear text-blue-900"></i></span>
                                                            </>
                                                        }
                                                            role={'button'}
                                                            customClass={'text-primary py-2 px-5 border-blue-900'}
                                                        />
                                                        <Button variant={'outlinePrimary'} onClick={() => handleCancelBooking(booking.id)} label={
                                                            <>
                                                                <span className='whitespace-nowrap text-red-700'><span className='me-1'>Cancel Booking</span> <i className="fas fa-trash text-red-700"></i></span>
                                                            </>
                                                        }
                                                            role={'button'}
                                                            customClass={'text-primary py-2 px-5  border-red-700'}
                                                        />
                                                    </div>
                                                </Box>
                                            </Box>
                                        ))}

                                        {/* Edit Modal */}
                                        <Modal isOpen={isEditing} onClose={handleCloseEditModal}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Edit Booking</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <FormControl>
                                                        <FormLabel>Name</FormLabel>
                                                        <Input
                                                            placeholder="New Name"
                                                            value={editedBooking?.name}
                                                            onChange={(e) => setEditedBooking({ ...editedBooking, name: e.target.value })}
                                                        />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Contact</FormLabel>
                                                        <Input
                                                            placeholder="New Contact"
                                                            value={editedBooking?.contact}
                                                            onChange={(e) => setEditedBooking({ ...editedBooking, contact: e.target.value })}
                                                        />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Date</FormLabel>
                                                        <Input
                                                            type="date"
                                                            value={editedBooking?.date}
                                                            onChange={(e) => setEditedBooking({ ...editedBooking, date: e.target.value })}
                                                        />
                                                    </FormControl>
                                                    <FormControl mt={4}>
                                                        <FormLabel>Time Slot</FormLabel>
                                                        <Input
                                                            placeholder="New Time Slot"
                                                            value={editedBooking?.timeSlot}
                                                            onChange={(e) => setEditedBooking({ ...editedBooking, timeSlot: e.target.value })}
                                                        />
                                                    </FormControl>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button variant="outlinePrimary" label={'Save Changes'} onClick={() => handleModifyBooking(editedBooking.id, editedBooking)} />
                                                    <Button variant="ghost" onClick={handleCloseEditModal}>Cancel</Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>


                                    </VStack>
                                )}
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </section>
    );
};

export default Dashboard;
