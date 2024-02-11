import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import useAddBookings from "../../hooks/useAddBookings";
import useManageBookings from "../../hooks/useManageBookings";
import Button from "../buttons/Button";

import axios from "axios";
import TimingsInfo from './../TimingsPageSection/TimingsInfo';
import { sendEmail } from "../Utils/Data";
import image from "../../assets/logo.png"

const BookingsForm = () => {
  var prices = 0;
  let payment_id;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [hour, setHour] = useState()
  const [isLoading,setIsLoading] = useState(false);
  const { availableSlots, handleDateChange, selectedDate } =
    useManageBookings();
    // console.log(availableSlots);
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  //newly created price use state for dynamic price calculation according to slot
  
  const { CreateBookings } = useAddBookings();
  const toast = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const paymentSuccess = urlParams.get("PaymentSuccess");

  const handleTimeSlotSelection = (selectedSlot, price) => {
    
    let amt = parseInt(price, 10);
    const updatedSlots = [...selectedSlots, selectedSlot];
    setSelectedSlots(updatedSlots);
    const updatedTotalPrice = totalPrice + amt;
    setTotalPrice(updatedTotalPrice);
  };


  const handlePaymentSuccess = () => {
    toast({
      title: "Booking Successful",
      description: "Your booking has been confirmed.",
      status: "success",
      duration: 7000,
      position: "top",
      isClosable: true,
    });
    handleBookingAndEmail();
    setName("");
    setContact("");
    handleDateChange("");
    setTimeSlot("");
    setTotalPrice(0);
    prices = 0;
    setHour("")
    setSelectedSlots([]);
  };

  const handlePaymentFailure = () => {
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      status: "error",
      duration: 7000,
      position: "top",
      isClosable: true,
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      contact.length !== 10 ||
      name.trim() === "" ||
      selectedDate === "" ||
      timeSlot === ""
    ) {
      setShowAlert(true);
      return;
    }
    setIsLoading(true);
    try {
      const toastId = toast({
        title:'Loading...',
        description:"Please wait while we process your payment.",
        duration: null,
        isClosable: true,
      })
      
      const {key} = await axios.get("https://fcarena-server-three.vercel.app/api/getkey");

      const {
        data: { order },
      } = await axios.post("https://fcarena-server-three.vercel.app/api/checkout", {
        amount: totalPrice,
      });



      const options = {
        key,
        amount: totalPrice,
        currency: "INR",
        name: "FcArenaVadodara",

        image: "https://firebasestorage.googleapis.com/v0/b/fcarena-new-28cf1.appspot.com/o/logo.png?alt=media&token=70edb7bb-0a58-408b-bbb4-603543680969",
        order_id: order.id,
        handler: async function (response) {
          const {
            data: { success, id },
          } = await axios.post(
            "https://fcarena-server-three.vercel.app/api/paymentverification",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }
          );
          if (success) {
            payment_id = id;
            handlePaymentSuccess();
          } else {
            handlePaymentFailure();
          }
        },
        prefill: {
          name: name, 
          contact: contact,
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#004F2D",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
      setIsLoading(false)
          toast.close(toastId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookingAndEmail = async () => {
    await CreateBookings({
      name,
      contact,
      date: selectedDate,
      timeSlots: selectedSlots,
      payment_id,
      Amount_payed: totalPrice,
    });

    await sendEmail({
      name,
      email: contact,
      message: `Booking Details:\nName: ${name}\nContact: ${contact}\nDate: ${selectedDate}\nTime Slot: ${timeSlot}`,
      date: selectedDate,
      timeSlot,
    });
  };


  return (
    <section className="bookings py-12 md:pt-[7%] pt-[31%]">
      <div className="container mx-auto">
       
        <fieldset className="border-dashed border-primary border-2 px-12 py-5 pb-[50px] md:max-w-[50%] max-w-full mx-auto">
          <legend className="text-4xl pb-3 text-primary font-semibold">
            Book Turf Now
          </legend>

          <form onSubmit={handleSubmit}>
            <FormControl className="flex flex-col gap-6">
              <div>
                <FormLabel className="text-xl text-primary font-bold">
                  Name
                </FormLabel>
                <Input
                  type="text"
                  className="border-2 p-2 rounded-lg w-full border-primary"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setShowAlert(false);
                  }}
                />
                {name.trim() === "" && showAlert && (
                  <span className="text-red-600">Please Enter Name</span>
                )}
              </div>
              <div>
                <FormLabel className="text-xl text-primary font-bold">
                  Contact
                </FormLabel>
                <Input
                  type="tel"
                  className="border-2 p-2 rounded-lg w-full border-primary"
                  placeholder="Enter Phone Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                {contact.length !== 10 && showAlert && (
                  <span className="text-red-600">
                    Please Enter a Valid Contact Number
                  </span>
                )}
              </div>
             
              <div>
                <FormLabel className="text-xl text-primary font-bold">
                  Date
                </FormLabel>
                <Input
                  type="date"
                  className="border-2 p-2 rounded-lg w-full border-primary"
                  placeholder="Enter Phone Number"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </div>
              <div>
                <FormLabel className="text-xl text-primary font-bold">
                  Time Slot <span className="text-bodyTextDark text-[13px]">
                      *you can add multiple slots by clicking on them one by one
                    </span>
                </FormLabel>
                <Select
                  placeholder={`${!selectedDate ? "Please select a date First" : "Select from Available Slots"}`}
                  value={timeSlot}
                  onChange={(e) => {
                    const selectedSlot = e.target.value;
                    setTimeSlot(selectedSlot);
            
                    const selectedSlotObject = availableSlots.find(
                      (slot) => slot.time === selectedSlot
                      );
                      if (selectedSlotObject) {
                        prices = selectedSlotObject.price
                      }
                      handleTimeSlotSelection(selectedSlot,prices);
                    }}
                >
                  {availableSlots.map((slot, index) => (
                    <option key={index} value={slot.time}>
                      {`${slot.time}`}
                    </option>
                  ))}
                </Select>
              </div>

              {selectedDate && selectedSlots.length > 0 && (
                <div>
                  <FormLabel className="text-xl text-primary font-bold">
                    Selected Time Slots
                  </FormLabel>
                  <ul>
                    {selectedSlots.map((selectedSlot, index) => (
                      <div className="flex items-center justify-between gap-4" key={index}>
                        <li>{selectedSlot}</li>
                        <div className="cursor-pointer flex-shrink-0" onClick={() => {
                          // Remove the selected slot and update the total price
                          const updatedSlots = selectedSlots.filter((s) => s !== selectedSlot);
                          setSelectedSlots(updatedSlots);

                          const removedSlotObject = availableSlots.find(
                            (slot) => slot.time === selectedSlot
                          );
                          if (removedSlotObject) {
                            const prices = removedSlotObject.price;
                            const updatedTotalPrice = totalPrice - prices;
                            setTotalPrice(updatedTotalPrice);
                          }
                        }}>
                          <i className="fa-solid fa-xmark text-red-600 font-bold text-lg"></i>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              )}




              <Button
                role={"button"}
                label={"Book"}
                type={"submit"}
                customClass={
                  "border-2 rounded ms:max-w-[30%] p-2 px-7 mt-4 mx-auto text-lg font-medium"
                }
                variant={"outlinePrimary"}
                id="pay-button"
              />
            </FormControl>
          </form>
        </fieldset>
        <TimingsInfo />
      </div>
    </section>
  );
};

export default BookingsForm;
