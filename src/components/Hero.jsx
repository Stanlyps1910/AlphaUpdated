

import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/assets/banner.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-[#F7F5F2]/70 p-8 md:p-12 max-w-xl mx-auto shadow-2xl border border-white/20"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl md:text-5xl font-serif mb-6 text-[#1C1C1C] leading-tight"
                    >
                        Timeless Wedding Stories
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-sm md:text-base text-gray-700 tracking-[0.2em] font-sans uppercase"
                    >
                        Luxury photography capturing emotions and love
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
