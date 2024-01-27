import { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input, 
    Select,
} from '@chakra-ui/react';
import useAddBookings from '../../hooks/useAddBookings';
import useManageBookings from '../../hooks/useManageBookings';
import Button from '../buttons/Button';

const BookingsForm = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const { availableSlots, error, handleDateChange, selectedDate } = useManageBookings();
    const [timeSlot, setTimeSlot] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const { CreateBookings } = useAddBookings();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contact.length !== 10 || name.trim() === '' || selectedDate === '' || timeSlot === '') {
            setShowAlert(true);
            return;
        }

        try {
            await CreateBookings({
                name,
                contact,
                date: selectedDate,
                timeSlot,
            });

            setShowMessage(true);
            setName('');
            setContact('');
            setTimeSlot('');
        } catch (error) {
            console.error('Error storing form data:', error);
            setShowMessage(true);
        }
    };

    return (
        <section className="bookings py-12 md:pt-[7%] pt-[31%]">
            <div className="container mx-auto">
                <fieldset className='border-dashed border-primary border-2 px-12 py-5 pb-[50px] md:max-w-[50%] max-w-full mx-auto'>
                    <legend className='text-4xl pb-3 text-primary font-semibold'>Book Turf Now</legend>
                    <form onSubmit={handleSubmit}>
                        <FormControl className='flex flex-col gap-6'>
                            <div>
                                <FormLabel className='text-xl text-primary font-bold'>Name</FormLabel>
                                <Input
                                    type='text'
                                    className='border-2 p-2 rounded-lg w-full border-primary'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setShowAlert(false); }}
                                />
                                {name.trim() === '' && showAlert && (
                                    <span className='text-red-600'>Please Enter Name</span>
                                )}
                            </div>
                            <div>
                                <FormLabel className='text-xl text-primary font-bold'>Contact</FormLabel>
                                <Input
                                    type='tel'
                                    className='border-2 p-2 rounded-lg w-full border-primary'
                                    placeholder='Enter Phone Number'
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                                {contact.length !== 10 && showAlert && (
                                    <span className='text-red-600'>Please Enter a Valid Contact Number</span>
                                )}
                            </div>
                            <div>
                                <FormLabel className='text-xl text-primary font-bold'>Date</FormLabel>
                                <Input
                                    type='date'
                                    className='border-2 p-2 rounded-lg w-full border-primary'
                                    placeholder='Enter Phone Number'
                                    value={selectedDate}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                />
                            </div>
                            <div>
                                <FormLabel className='text-xl text-primary font-bold'>Time Slot</FormLabel>
                                <Select
                                    placeholder="Select from Available Slots"
                                    value={timeSlot}
                                    onChange={(e) => setTimeSlot(e.target.value)}
                                >
                                    {availableSlots.map((slot, index) => (
                                        <option key={index} value={slot}>{slot}</option>
                                    ))}
                                </Select>
                            </div>
                            <Button role={'button'} label={'Book'} type={'submit'} customClass={'border-2 rounded ms:max-w-[30%] p-2 px-7 mt-4 mx-auto text-lg font-medium'} variant={'outlinePrimary'}/>

                        </FormControl>
                    </form>
                    {showMessage && (
                        <span className={!error ? 'text-primary text-2xl font-bold rounded-lg items-center justify-start flex gap-3 py-2 ps-4 bg-green-500 bg-opacity-[0.4]' : 'text-red-600 text-2xl font-bold rounded-lg items-center justify-start flex gap-3 py-2 ps-4 bg-[#dc2626] bg-opacity-[0.4]'}>
                            <i className="fa-regular fa-circle-check" style={{ color: !error ? '#004f2d' : '#dc2626' }}></i>
                            {!error ? 'Successfully Booked' : 'Something Went Wrong !!'}
                        </span>
                    )}
                </fieldset>
            </div>
        </section>
    );
};

export default BookingsForm;
