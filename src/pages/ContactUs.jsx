import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@chakra-ui/react";
import Button from '../components/buttons/Button';
import { sendEmail } from '../components/Utils/Data';

const ContactUs = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendEmail(formData, toast);
            setFormData({ name: '', email: '', message: '' }); 
        } catch (error) {
            console.error('Error sending email:', error);
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again later. Or Call Us directly',
                status: 'error',
                duration: 7000,
                position: 'top',
                isClosable: true,
            });
            setFormData({ name: '', email: '', message: '' });
        }
    };
    return (
        <section className="contact-section py-20">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-10">Contact Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Your Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name" type="text" placeholder="Your Name"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Your Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email" type="email" placeholder="Your Email"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="message" placeholder="Your Message" rows="6"
                                onChange={handleChange}
                                value={formData.message}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Button
                                label={'Submit'}
                                variant={'primary'}
                                role="button"
                                customClass={'px-8'}
                                type="submit"
                            />
                        </div>
                    </form>
                    {/* Contact Information */}
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <h3 className="text-xl font-bold mb-4 text-primary">Contact Information</h3>
                        <p className="text-gray-700 mb-2 font-medium"><span className='text-primary font-bold'>Address:</span> FcArena, Near Suryadarshan Township, New Manjalpur, Vadodara.</p>
                        <p className="text-gray-700 mb-2 font-medium"><span className='text-primary font-bold'>Phone:  </span>091048 28898</p>
                        <p className="text-gray-700 mb-2 font-medium"><span className='text-primary font-bold'>Email:  </span>fcarenavadodara@gmail.com</p>
                        <motion.iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.0298958794797!2d73.17123177603588!3d22.276857343743256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc7b05eac1dfb%3A0xe41c9b77624d4cf!2sFC%20arena!5e0!3m2!1sen!2sin!4v1706389531156!5m2!1sen!2sin"
                            width={{ md: '50%', sm: '100%' }}
                            height="300px"
                            style={{ border: '0' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        ></motion.iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;

// Function to send email using EmailJS
