import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Mail, Lock, ArrowRight, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [userRole, setUserRole] = useState('client'); // 'client' or 'admin'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const url = 'http://localhost:5000/api/auth/login';

        const body = { email: formData.email, password: formData.password, role: userRole };

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Something went wrong');
            }

            // Success
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            if (data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/portal');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 pt-24 relative overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[120px] opacity-60 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60 animate-pulse" />

            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] w-full max-w-md overflow-hidden relative border border-white/40"
            >
                {/* Header Section */}
                <div className="px-10 pt-12 pb-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-3 tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="text-gray-400 text-sm font-medium tracking-wide">
                            Elevate your photography journey
                        </p>
                    </motion.div>
                </div>

                {/* Content Area with smooth height transitions */}
                <div className="px-10 pb-12">
                    {/* Role Switcher - Premium Toggle */}
                    <div className="overflow-hidden mb-8">
                        <div className="bg-gray-100/50 p-1.5 rounded-2xl flex relative border border-gray-200/50">
                            <motion.div
                                className="absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-md"
                                initial={false}
                                animate={{
                                    left: userRole === 'client' ? '6px' : '50%',
                                    width: 'calc(50% - 6px)'
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                            <button
                                onClick={() => setUserRole('client')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest uppercase z-10 transition-colors duration-300 ${userRole === 'client' ? 'text-black' : 'text-gray-400'}`}
                            >
                                <User size={14} strokeWidth={2.5} /> Client
                            </button>
                            <button
                                onClick={() => setUserRole('admin')}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-widest uppercase z-10 transition-colors duration-300 ${userRole === 'admin' ? 'text-black' : 'text-gray-400'}`}
                            >
                                <Shield size={14} strokeWidth={2.5} /> Admin
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3 text-red-600 text-xs font-medium"
                            >
                                <div className="w-1 h-1 rounded-full bg-red-500" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={16} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50/50 border-b-2 border-transparent border-gray-100 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={16} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50/50 border-b-2 border-transparent border-gray-100 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-black focus:bg-white transition-all duration-300"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-[#1a1a1a] text-white py-4 mt-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group overflow-hidden relative"
                        >
                            <span className="text-[11px] font-bold tracking-[0.25em] uppercase relative z-10 transition-transform group-hover:-translate-x-1">
                                Sign In
                            </span>
                            <ArrowRight size={16} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.button>
                    </form>

                    <div className="mt-10 text-center min-h-[1.5rem] space-y-4">
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                            Premium Client & Admin Access
                        </p>
                        <div className="pt-4 border-t border-gray-100/50">
                            <p className="text-xs text-gray-400 font-medium">
                                New to our studio? 
                                <Link to="/quote" className="text-black font-bold border-b border-black/10 hover:border-black transition-all ml-1">
                                    Join Alpha
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Aesthetic Floating Hint */}
                <div className="absolute top-8 left-10">
                    <Link to="/" className="text-[9px] font-black tracking-[0.4em] text-gray-300 hover:text-black transition-colors uppercase flex items-center gap-2 group">
                        <span className="w-4 h-[1px] bg-gray-200 group-hover:bg-black transition-colors" />
                        Alpha
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
