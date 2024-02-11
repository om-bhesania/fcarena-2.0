
export const timeSlots = [
    '12AM - 1AM', '1AM - 2AM', '2AM - 3AM', '3AM - 4AM', '4AM - 5AM', '5AM - 6AM',
    '6AM - 7AM', '7AM - 8AM', '8AM - 9AM', '9AM - 10AM', '10AM - 11AM', '11AM - 12PM',
    '12PM - 1PM', '1PM - 2PM', '2PM - 3PM', '3PM - 4PM', '4PM - 5PM', '5PM - 6PM',
    '6PM - 7PM', '7PM - 8PM', '8PM - 9PM', '9PM - 10PM', '10PM - 11PM', '11PM - 12AM'
];

export const MenuItems = ["Home", "About", "Timings", "ContactUs"];
export const FooterMenuItems = ["Home", "About", "Timings", "ContactUs", "Terms & Conditions", "Privacy Policy","Cancellation & Refund"];
export const info = [
    {
        index: 1,
        infoTitle: "Elevate Your Game with FcArena's FIFA Approved Turf",
        info: "Experience the pinnacle of sporting excellence with FcArena's FIFA Approved Turf. Crafted to exacting standards, our turf offers unparalleled performance, durability, and safety. Whether you're a professional athlete or an enthusiastic amateur, FcArena's FIFA Approved Turf guarantees an authentic playing experience, empowering you to push the boundaries of your game. Elevate your matches with a surface trusted by the world's leading football organizations. Choose quality. Choose precision. Choose FcArena's FIFA Approved Turf.",
        graphics: Images[0].infographics[0].img,
    },
    {
        index: 2,
        infoTitle: "Experience Seamless Access Anytime, Anywhere at FcArena",
        info: "At FcArena, we redefine convenience with our 24x7 On service. Embrace the freedom to engage in your favorite activities whenever inspiration strikes. Whether it's a spontaneous workout session or a midnight match under the stars, FcArena's facilities are always ready to accommodate your passion. With 24x7 On, the boundaries of time dissolve, giving you the flexibility to pursue your interests around the clock. Seize the moment. Embrace the possibilities. Experience 24x7 On like never before, only at FcArena.",
        graphics: Images[0].infographics[1].img,
    },
    {
        index: 3,
        infoTitle: "The Height of Sporting Excellence FcArena",
        info: "Discover the pinnacle of sporting excellence at FcArena's Tallest Turf in Vadodara. Our iconic venue boasts the city's tallest turf, offering unmatched performance and excitement for athletes and enthusiasts alike. From corporate events to thrilling sports competitions, our versatile space promises unforgettable experiences. Join us at FcArena and elevate your game on Vadodara's tallest turf. Unlock possibilities, ignite passions, and make lasting memories with us.",
        graphics: Images[0].infographics[2].img
    },
];

// Arrays to store time slots for Morning, Afternoon, and Night

// Function to categorize time slots
export const categorizeTimeSlots = () => {
    let morningSlots = [];
    let afternoonSlots = [];
    let nightSlots = [];
    timeSlots.forEach(slot => {
        const [startTime, endTime] = slot.split(' - ');

        let startHour = parseInt(startTime);
        const startPeriod = startTime.includes('PM') ? 'PM' : 'AM';
        if (startPeriod === 'PM' && startHour !== 12) {
            startHour += 12;
        }
        let endHour = parseInt(endTime);
        const endPeriod = endTime.includes('PM') ? 'PM' : 'AM';
        if (endPeriod === 'PM' && endHour !== 12) {
            endHour += 12;
        }

        if (startHour >= 6 && startHour < 12) {
            morningSlots.push(slot);
        } else if (startHour >= 12 && startHour < 18) {
            afternoonSlots.push(slot);
        } else {
            nightSlots.push(slot);
        }
    });

    return {
        morningSlots,
        afternoonSlots,
        nightSlots
    };
};




// Function to duplicate timeSlots array and add default price
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Images from './images';
import emailjs from 'emailjs-com';
import { useEffect } from 'react';

export const addDefaultPrice = async () => {

    const duplicateTimeSlotsAndAddPrice = () => {
        // Use categorizeTimeSlots logic to get morning, afternoon, and night slots
        const { morningSlots, afternoonSlots, nightSlots } = categorizeTimeSlots();

        // Create an array to hold time slots with session information
        const timeSlotsWithSession = [];

        // Add session information to morning slots
        morningSlots.forEach(slot => {
            timeSlotsWithSession.push({
                slot,
                price: 500, // Default price
                session: "morning"
            });
        });

        // Add session information to afternoon slots
        afternoonSlots.forEach(slot => {
            timeSlotsWithSession.push({
                slot,
                price: 500, // Default price
                session: "afternoon"
            });
        });

        // Add session information to night slots
        nightSlots.forEach(slot => {
            timeSlotsWithSession.push({
                slot,
                price: 500, // Default price
                session: "night"
            });
        });

        return timeSlotsWithSession;
    };

    const storeTimeSlotsInFirestore = async (timeSlotsData) => {
        try {
            const timeSlotsRef = collection(db, 'timeSlots'); // Reference to your Firestore collection
            await Promise.all(timeSlotsData.map(slotData => addDoc(timeSlotsRef, slotData)));
            console.log("Time slots data stored successfully in Firestore!");
        } catch (error) {
            console.error("Error storing time slots data in Firestore:", error);
        }
    };

    const timeSlotsWithPriceAndSession = duplicateTimeSlotsAndAddPrice();
    await storeTimeSlotsInFirestore(timeSlotsWithPriceAndSession);
};


export const addDefaultPriceToFirestore = async () => {
    try {
        await addDefaultPrice();
        console.log('Default price data added successfully to Firestore');
        window.location.reload();
    } catch (error) {
        console.error('Error adding default price data to Firestore:', error);
    }
};

export const syncTimeSlotsFromFirestore = async () => {
    try {
        const timeSlotsCollection = collection(db, 'timeSlots');
        const snapshot = await getDocs(timeSlotsCollection);
        const timeSlotsData = snapshot.docs.map(doc => doc.data());
        console.log('Time slots data synced successfully with Firestore:', timeSlotsData);
        window.location.reload();
        return timeSlotsData;
    } catch (error) {
        console.error('Error syncing time slots data with Firestore:', error);
        return null;
    }
};




export const sendEmail = async (formData) => {
    try {
        let emailParams;

        if (formData.email) {
            // This is triggered from the contact form
            emailParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
            };
        } else {
            // This is triggered from the booking form
            emailParams = {
                from_name: formData.name,
                from_email: formData.contact,
                booking_date: formData.date,
                time_slot: formData.timeSlot,
            };
        }

        await emailjs.send(
            'service_4h4oi58',
            'template_44cxicl',
            emailParams,
            'PguK8OQaPD5-Azj-Y'
        );


        // Return some success response if needed
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email:', error);
    }
};




 