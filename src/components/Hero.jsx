import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523438885200-e635ba2c371e')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="bg-[#F7F5F2]/90 p-10 md:p-16 max-w-3xl mx-auto shadow-2xl"
                >
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 text-[#1C1C1C] leading-tight">
                        Timeless Wedding Stories
                    </h1>
                    <p className="text-sm md:text-base text-gray-700 tracking-[0.2em] font-sans uppercase">
                        Luxury photography capturing emotions and love
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
