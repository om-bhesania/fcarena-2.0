
export const timeSlots = [
    '12am - 1am', '1am - 2am', '2am - 3am', '3am - 4am', '4am - 5am', '5am - 6am',
    '6am - 7am', '7am - 8am', '8am - 9am', '9am - 10am', '10am - 11am', '11am - 12pm',
    '12pm - 1pm', '1pm - 2pm', '2pm - 3pm', '3pm - 4pm', '4pm - 5pm', '5pm - 6pm',
    '6pm - 7pm', '7pm - 8pm', '8pm - 9pm', '9pm - 10pm', '10pm - 11pm', '11pm - 12am'
];

export const MenuItems = ["Home", "About", "Timings", "ContactUs"];
export const FooterMenuItems = ["Home", "About", "Timings", "ContactUs", "Terms & Conditions", "Privacy Policy",];
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
        const startPeriod = startTime.includes('pm') ? 'pm' : 'am';
        if (startPeriod === 'pm' && startHour !== 12) {
            startHour += 12;
        }
        let endHour = parseInt(endTime);
        const endPeriod = endTime.includes('pm') ? 'pm' : 'am';
        if (endPeriod === 'pm' && endHour !== 12) {
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
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Images from './images';
import emailjs from 'emailjs-com';



export const addDefaultPrice = async (defaultPrice) => {
    const createTimeSlotsAndAddPrice = async (gap) => {
        try {
            const timeSlotsWithSession = [];

            // Fetch prices from the timeSlots collection
            const timeSlotsSnapshot = await getDocs(collection(db, 'timeSlots'));
            const timeSlotsData = timeSlotsSnapshot.docs.map(doc => doc.data());

            // Create time slots with the specified gap
            for (let hour = 0; hour < 24; hour += gap) {
                const startTime = formatTime(hour);
                const endTime = formatTime(hour + gap);

                // Adjust price if gap is 2 hours or more
                let adjustedPrice = defaultPrice;
                if (gap >= 2) {
                    // Find the corresponding time slot in the timeSlots collection
                    const timeSlot = timeSlotsData.find(slot => slot.time === `${startTime} - ${endTime}`);
                    if (timeSlot) {
                        // Adjust price based on the time slot price
                        adjustedPrice = timeSlot.price * gap;
                    }
                }

                timeSlotsWithSession.push({
                    time: `${startTime} - ${endTime}`,
                    price: adjustedPrice, // Use the adjusted price
                });
            }

            // Store time slots in Firestore
            await storeTimeSlotsInFirestore(timeSlotsWithSession, `${gap}HourGapTimeSlots`);
            console.log(`Time slots with ${gap}-hour gap stored successfully in Firestore!`);
        } catch (error) {
            console.error(`Error creating and storing ${gap}-hour gap time slots in Firestore:`, error);
        }
    };

    const formatTime = (hour) => {
        const formattedHour = hour % 12 || 12;
        const period = hour < 12 ? 'am' : 'pm';
        return `${formattedHour}${period}`;
    };

    const storeTimeSlotsInFirestore = async (timeSlotsData, collectionName) => {
        try {
            const timeSlotsRef = collection(db, collectionName); // Reference to your Firestore collection
            await Promise.all(timeSlotsData.map(slotData => addDoc(timeSlotsRef, slotData)));
            console.log(`Time slots with ${collectionName} stored successfully in Firestore!`);
    
            // If the collectionName indicates a gap of 2 hours or more, update prices in the database
            if (collectionName.includes('HourGapTimeSlots')) {
                const pricesToUpdate = timeSlotsData.reduce((acc, curr) => {
                    acc[curr.time] = curr.price;
                    return acc;
                }, {});
    
                await updatePricesInDatabase(pricesToUpdate);
            }
        } catch (error) {
            console.error(`Error storing time slots data in Firestore for ${collectionName}:`, error);
        }
    };
    
    const updatePricesInDatabase = async (pricesToUpdate) => {
        try {
            const pricesRef = collection(db, 'prices'); // Reference to your prices collection
            await Promise.all(Object.entries(pricesToUpdate).map(([time, price]) => {
                return updateDoc(doc(pricesRef, time), { price });
            }));
            console.log('Prices updated in the database successfully!');
        } catch (error) {
            console.error('Error updating prices in the database:', error);
        }
    };
    

    // Create time slots with 1-hour gap
    await createTimeSlotsAndAddPrice(1);
    // Create time slots with 2-hour gap
    await createTimeSlotsAndAddPrice(2);
    // Create time slots with 3-hour gap
    await createTimeSlotsAndAddPrice(3);
    // Create time slots with 4-hour gap
    await createTimeSlotsAndAddPrice(4);
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

const syncTimeSlotsFromFirestore = async () => {
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

export default syncTimeSlotsFromFirestore;


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

 
export const deleteDuplicates = async () => {
    try {
        // Query to identify duplicates based on certain criteria
        const querySnapshot = await db.collection('timeSlots')
            .orderBy('field_to_check_duplicates')
            .get();

        const docsToDelete = [];
        const seen = new Set();

        // Loop through the documents to identify duplicates
        querySnapshot.forEach((doc) => {
            const fieldValue = doc.data().field_to_check_duplicates;

            // If the field value is already in the Set, it's a duplicate
            if (seen.has(fieldValue)) {
                docsToDelete.push(doc.ref); // Add the document reference to the array for deletion
            } else {
                seen.add(fieldValue); // Add the field value to the Set
            }
        });

        // Delete duplicate documents
        await Promise.all(docsToDelete.map(async (docRef) => {
            try {
                await docRef.delete(); // Delete the document
                console.log('Document successfully deleted:', docRef.id);
            } catch (error) {
                console.error('Error deleting document:', error);
            }
        }));

        console.log('Duplicates successfully deleted.');
    } catch (error) {
        console.error('Error deleting duplicates:', error);
    }
};


