import { useEffect, useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
} from '@chakra-ui/react';
import useAddBookings from '../../hooks/useAddBookings';
import useManageBookings from '../../hooks/useManageBookings';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Bookings = () => {

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const { CreateBookings } = useAddBookings();
    const { availableSlots, loading, error, handleDateChange, selectedDate, setSelectedDate } = useManageBookings();
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [timeSlot, setTimeSlot] = useState('');
    const toast = useToast()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contact.length !== 10) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
        // Validation
        if (contact.length !== 10 || name.trim() === '' || selectedDate === '' || timeSlot === '') {
            setShowAlert(true);
            return;
        }
        try {
            await CreateBookings({
                name,
                contact,
                date: selectedDate, // Use selectedDate instead of date
                timeSlot,
            });
            console.log('Form data successfully stored in Firestore');

            setName('');
            setContact('');
            setTimeSlot('');
            setSelectedDate('')
        } catch (error) {
            console.error('Error storing form data:', error);
        }
    };
    useEffect(() => {
        const successTimeout = setTimeout(() => {
            setSuccessMessage(false);
        }, 5000);

        const errorTimeout = setTimeout(() => {
            setErrorMessage(false);
        }, 5000);

        return () => {
            clearTimeout(successTimeout);
            clearTimeout(errorTimeout);
        };
    }, [successMessage, errorMessage]);
    return (
        <section className="bookings py-[120px]">
            <div className="container">
                <fieldset className='border-dashed border-primary border-2 p-12 mt-12 max-w-[50%] mx-auto '>
                    <legend className='ms-2 text-4xl pb-3 text-primary font-semibold'>Book Turf Now</legend>
                    <span>
                        {!error ? (
                            <>
                            <span className='text-primary text-3xl font-bold rounded-lg items-center justify-start flex gap-3 py-3 ps-4 bg-green-500 bg-opacity-[0.4]'>
                                <i className="fa-regular fa-circle-check" style={{ color: '#004f2d' }}></i> Succesfully Booked
                            </span>

                            </>
                    ) : (
                    <>
                        <span className='text-red-600 text-3xl font-bold rounded-lg items-center justify-start flex gap-3 py-3 ps-4 bg-[#dc2626] bg-opacity-[0.4]'>
                            <i className="fa-regular fa-circle-check" style={{ color: '#dc2626' }}></i> Some thing Went Wrong !!
                        </span>
                    </>
                        )}
                </span>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel className='text-lg text-primary font-semibold'>Name</FormLabel>
                        <Input
                            type='text'
                            className='border-2 p-2 rounded-lg w-full border-primary'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <FormLabel className='text-lg text-primary font-semibold'>Contact</FormLabel>
                        <Input
                            type='tel' // Changed to 'tel' for phone number input
                            className='border-2 p-2 rounded-lg w-full border-primary'
                            placeholder='Enter Phone Number'
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                        {showAlert ? (
                            <span className='text-red-600'>Invalid Phone Number </span>
                        ) : ('')}
                        <FormLabel className='text-lg text-primary font-semibold'>Date</FormLabel>
                        <Input
                            type='date'
                            className='border-2 p-2 rounded-lg w-full border-primary'
                            placeholder='Enter Phone Number'
                            value={selectedDate}
                            onChange={(e) => handleDateChange(e.target.value)}
                            required
                        />
                        <FormLabel className='text-lg text-primary font-semibold'>Time Slot</FormLabel>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                <MenuItem disabled>
                                    {selectedDate ? (
                                        <>
                                            {timeSlot ? (timeSlot) : ("Select from Available Slots")}

                                        </>
                                    ) : (
                                        <>
                                            Please Select Date First
                                        </>
                                    )}
                                </MenuItem>
                            </MenuButton>
                            <MenuList
                                maxHeight="200px"
                                overflowY="auto"
                                bg="white"
                                boxShadow="md"
                                borderColor="gray.200"
                                css={{
                                    '&::-webkit-scrollbar': {
                                        width: '4px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: '#004F2D',
                                        borderRadius: 'full',
                                    },
                                }}
                            >
                                {availableSlots.map((slot, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => setTimeSlot(slot)}
                                        _hover={{ bg: 'gray.100' }}
                                        className='bg-white'
                                    >
                                        <span className='text-primary max-w-full py-2 mx-auto text-[16px] text-center font-bold border-b border-primary'>{slot}</span>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </FormControl>
                    <Button type="submit" mt={4} colorScheme="blue" className='border-2 rounded max-w-[25%] p-2 px-7 mx-auto border-primary' onClick={() => { console.log("test") }}>Submit</Button>
                </form>
            </fieldset>
        </div>
        </section >
    );
};

export default Bookings;
