import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Grid,
    LayoutTemplate,
    Download,
    Share2,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
    { id: "all", label: "All Memories" },
    { id: "wedding", label: "Wedding" },
    { id: "engagement", label: "Engagement" },
    { id: "pre_wedding", label: "Pre Wedding" },
    { id: "haldi", label: "Haldi" },
];

const ClientGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [viewMode, setViewMode] = useState('masonry'); // 'grid' or 'masonry'
    const [activeCategory, setActiveCategory] = useState('all');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const canDownload = user?.permissions?.canDownload ?? true;

    // Cloudinary Config (Same as Gallery.jsx)
    const CLOUD_NAME = "dq9oaglqa";

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                // In a real app, we'd fetch based on user/client ID.
                // For now, we fetch from Cloudinary tags or a general client folder.
                const tags = CATEGORIES.filter(c => c.id !== 'all').map(c => c.id);
                const allData = await Promise.all(
                    tags.map(tag =>
                        fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`)
                            .then(res => res.json())
                            .catch((err) => {
                                console.error(`Cloudinary fetch failed for tag ${tag}:`, err);
                                return { resources: [] };
                            })
                    )
                );

                const flattened = allData.flatMap((data, index) =>
                    data.resources.map(res => ({
                        id: res.public_id,
                        url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${res.version}/${res.public_id}.${res.format}`,
                        category: tags[index],
                        width: res.width,
                        height: res.height
                    }))
                );

                setImages(flattened);
            } catch (err) {
                console.error("Failed to fetch gallery:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const filteredImages = activeCategory === 'all'
        ? images
        : images.filter(img => img.category === activeCategory);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth');
    };

    const handleDownload = (url, id) => {
        if (!canDownload) return;
        const link = document.createElement('a');
        link.href = url;
        link.download = `photo-${id}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-24 pb-20 px-6 sm:px-12 lg:px-24">
            {/* Header */}
            <header className="max-w-[1600px] mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <span className="w-12 h-[1px] bg-[#1a1a1a]" />
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">Client Portal</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif text-[#1a1a1a] leading-tight"
                    >
                        {user?.firstName && `${user.firstName}'s`} <br /> Collection
                    </motion.h1>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={handleLogout}
                        className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-black transition-colors"
                    >
                        Sign Out
                    </button>
                    {/* View Toggles */}
                    <div className="flex bg-gray-100 rounded-full p-1 border border-gray-200">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 ring-0'}`}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('masonry')}
                            className={`p-2 rounded-full transition-all ${viewMode === 'masonry' ? 'bg-white shadow-sm text-black' : 'text-gray-400 ring-0'}`}
                        >
                            <LayoutTemplate size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation / Filters */}
            <nav className="max-w-[1600px] mx-auto mb-12 border-b border-gray-100 pb-6 flex flex-wrap gap-x-12 gap-y-4">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`text-xs font-bold tracking-[0.2em] uppercase transition-all relative pb-2 ${activeCategory === cat.id ? 'text-black' : 'text-gray-300 hover:text-gray-500'
                            }`}
                    >
                        {cat.label}
                        {activeCategory === cat.id && (
                            <motion.div
                                layoutId="activeCategory"
                                className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black"
                            />
                        )}
                    </button>
                ))}
            </nav>

            {/* Gallery Content */}
            <main className="max-w-[1600px] mx-auto min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filteredImages.length > 0 ? (
                    <div className={
                        viewMode === 'masonry'
                            ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
                            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                    }>
                        {filteredImages.map((img, idx) => (
                            <motion.div
                                key={img.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`group relative overflow-hidden bg-gray-50 rounded-lg cursor-zoom-in ${viewMode === 'masonry' ? 'mb-6' : 'aspect-[4/5]'}`}
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={img.url}
                                    alt=""
                                    className={`w-full transition-transform duration-700 group-hover:scale-105 ${viewMode === 'grid' ? 'h-full object-cover' : 'h-auto'}`}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                                        <Search size={20} className="text-black" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                        <p className="font-serif text-2xl italic mb-2">No photos found in this category.</p>
                        <p className="text-xs uppercase tracking-widest">More memories coming soon</p>
                    </div>
                )}
            </main>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-xl p-6 sm:p-12 lg:p-20"
                    >
                        {/* Overlay Close */}
                        <div className="absolute inset-0" onClick={() => setSelectedImage(null)} />

                        {/* Top Controls */}
                        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase group"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                <span>Close</span>
                            </button>

                            <div className="flex items-center gap-4">
                                <button className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black">
                                    <Share2 size={20} />
                                </button>
                                {canDownload && (
                                    <button
                                        onClick={() => handleDownload(selectedImage.url, selectedImage.id)}
                                        className="bg-black text-white px-6 py-3 rounded-full text-xs font-bold tracking-[0.1em] uppercase hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg"
                                    >
                                        <Download size={16} />
                                        Download
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Image Wrapper */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative z-10 max-w-full max-h-full flex items-center justify-center"
                        >
                            <img
                                src={selectedImage.url}
                                alt=""
                                className="max-w-full max-h-[85vh] object-contain shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-sm"
                            />

                            {/* Navigation inside Lightbox (Simplified) */}
                            <button className="absolute left-[-60px] hidden xl:flex p-4 text-gray-300 hover:text-black transition-colors">
                                <ChevronLeft size={40} strokeWidth={1} />
                            </button>
                            <button className="absolute right-[-60px] hidden xl:flex p-4 text-gray-300 hover:text-black transition-colors">
                                <ChevronRight size={40} strokeWidth={1} />
                            </button>
                        </motion.div>

                        {/* Bottom Info */}
                        <div className="absolute bottom-12 left-0 right-0 text-center z-10">
                            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
                                {CATEGORIES.find(c => c.id === selectedImage.category)?.label} • {selectedImage.width} x {selectedImage.height}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ClientGallery;
