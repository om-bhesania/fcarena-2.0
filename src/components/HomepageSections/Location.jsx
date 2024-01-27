import { motion } from 'framer-motion';

function Location() {
    return (
        <section className="location">
            <div className="border-primary border-dashed border-2 rounded p-5 flex md:flex-row flex-col-reverse gap-12 items-center">
                <motion.iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.0298958794797!2d73.17123177603588!3d22.276857343743256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc7b05eac1dfb%3A0xe41c9b77624d4cf!2sFC%20arena!5e0!3m2!1sen!2sin!4v1706389531156!5m2!1sen!2sin"
                    width={{md:'40%',sm:'100%'}}
                    height="300px"
                    style={{ border: '0' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                ></motion.iframe>
                <div className="location-info">
                    <h1 className="text-4xl font-bold text-primary">Location</h1>
                    <p className="text-xl font-semibold text-bodyTextDark mb-4">
                        FcArena, Near Suryadarshan Township, New Manjalpur, Vadodara.
                    </p>
                    <p className="text-xl font-semibold text-bodyTextDark mb-4">
                        Contact: 091048 28898
                    </p>
                    <p className="text-lg text-gray-600">
                        Our location is conveniently situated near the Suryadarshan Township in Vadodara. Feel free to contact us for any inquiries or assistance.
                    </p>
                </div>

           
            </div>
        </section>
    );
}

export default Location;
