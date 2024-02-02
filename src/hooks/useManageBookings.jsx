import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const useManageBookings = () => {
    const [selectedDate, setSelectedDate] = useState('')
    const [availableSlots, setAvailableSlots] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (!selectedDate) return

            setLoading(true)
            try {
                const timeSlotsCollection = collection(db, 'timeSlots')
                const snapshot = await getDocs(timeSlotsCollection)
                const slots = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    time: doc.data().slot,
                    price: doc.data().price,
                }))

                setAvailableSlots(slots)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching available slots:', error)
                setError('Error fetching available slots')
                setLoading(false)
            }
        }

        fetchAvailableSlots()
    }, [selectedDate])

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate)
    }
    // console.log(availableSlots)
    return { availableSlots, loading, error, handleDateChange, selectedDate }
}

export default useManageBookings
