import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/testimonials')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching testimonials:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null;

    return (
        <section className="py-24 bg-[#F2EFEA] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif mb-4">Client Stories</h2>
                    <p className="text-gray-600 font-light tracking-widest uppercase text-xs">Testimonials from Google Reviews</p>
                </motion.div>

                <div className="relative">
                    <motion.div
                        className="flex gap-8 cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ right: 0, left: -((reviews.length - 1) * 400) }}
                    >
                        {reviews.map((review, idx) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="min-w-[350px] md:min-w-[450px] bg-white/60 backdrop-blur-sm p-10 rounded-2xl border border-white/40 shadow-xl relative group"
                            >
                                <Quote className="absolute top-6 right-6 text-black/5 w-16 h-16 group-hover:text-black/10 transition-colors" />

                                <div className="flex gap-1 mb-6">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-black text-black" />
                                    ))}
                                </div>

                                <p className="text-gray-700 leading-relaxed italic mb-8 font-light text-lg">
                                    "{review.text}"
                                </p>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-serif font-bold text-lg">{review.author}</h4>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{review.date}</span>
                                    </div>
                                    <div className="bg-black text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter">Verified Review</div>
                                </div>

                                {review.reply && (
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 font-light italic">
                                            <span className="font-semibold text-black not-italic block mb-1">Response from Team Alpha:</span>
                                            {review.reply}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-12 text-center text-gray-400 text-xs tracking-widest flex items-center justify-center gap-4">
                        <span className="h-[1px] w-12 bg-gray-200"></span>
                        DRAG TO EXPLORE
                        <span className="h-[1px] w-12 bg-gray-200"></span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
