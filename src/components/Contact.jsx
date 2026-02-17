import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-6 bg-[#F7F5F2]">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20">
                {/* Info */}
                <div className="md:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-serif mb-6">Get in Touch</h2>
                        <p className="text-gray-600 mb-8 font-light leading-relaxed">
                            We would love to hear your story. Please fill out the form and we will get back to you shortly.
                        </p>
                        <div className="space-y-4 text-sm tracking-wide text-gray-800">
                            <p>EMAIL: hello@teamalpha.com</p>
                            <p>PHONE: +91 98765 43210</p>
                        </div>
                    </motion.div>
                </div>

                {/* Form */}
                <div className="md:w-2/3">
                    <form className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <input type="text" placeholder="First Name *" className="bg-transparent border-b border-gray-400 py-3 focus:outline-none focus:border-black transition w-full placeholder-gray-500 font-light" />
                            <input type="text" placeholder="Last Name *" className="bg-transparent border-b border-gray-400 py-3 focus:outline-none focus:border-black transition w-full placeholder-gray-500 font-light" />
                        </div>
                        <input type="email" placeholder="Email *" className="bg-transparent border-b border-gray-400 py-3 focus:outline-none focus:border-black transition w-full placeholder-gray-500 font-light" />
                        <div className="grid md:grid-cols-2 gap-8">
                            <input type="text" placeholder="Date of Event" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="bg-transparent border-b border-gray-400 py-3 focus:outline-none focus:border-black transition w-full placeholder-gray-500 font-light" />
                            <input type="text" placeholder="Estimated Budget" className="bg-transparent border-b border-gray-400 py-3 focus:outline-none focus:border-black transition w-full placeholder-gray-500 font-light" />
                        </div>
                        <textarea rows="4" placeholder="Tell us about your day" className="bg-transparent border-b border-gray-400 py-3 focus:outline-none focus:border-black transition w-full placeholder-gray-500 font-light"></textarea>

                        <button className="mt-4 bg-[#1C1C1C] text-white px-12 py-4 tracking-widest text-xs uppercase hover:bg-opacity-80 transition duration-300">
                            Submit Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default Contact;
