import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Mail, Lock, ArrowRight, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [userRole, setUserRole] = useState('client'); // 'client' or 'admin'
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const url = isLogin
            ? 'http://localhost:5000/api/auth/login'
            : 'http://localhost:5000/api/auth/register';

        const body = isLogin
            ? { email: formData.email, password: formData.password, role: userRole }
            : { ...formData, role: 'client' }; // Registering as client by default via form

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
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center p-6 pt-24">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">

                {/* Header */}
                <div className="px-8 pt-10 pb-6 text-center">
                    <h2 className="text-3xl font-serif font-bold text-[#1C1C1C] mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {isLogin ? 'Please sign in to continue' : 'Join us to start your journey'}
                    </p>
                </div>

                {/* Role Switcher (Only for Login) */}
                <AnimatePresence mode="wait">
                    {isLogin && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-8 mb-6"
                        >
                            <div className="bg-gray-100 p-1 rounded-lg flex relative">
                                <motion.div
                                    className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm"
                                    initial={false}
                                    animate={{
                                        left: userRole === 'client' ? '4px' : '50%',
                                        width: 'calc(50% - 4px)'
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                                <button
                                    onClick={() => setUserRole('client')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium z-10 transition-colors ${userRole === 'client' ? 'text-black' : 'text-gray-500'}`}
                                >
                                    <User size={16} /> Client
                                </button>
                                <button
                                    onClick={() => setUserRole('admin')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium z-10 transition-colors ${userRole === 'admin' ? 'text-black' : 'text-gray-500'}`}
                                >
                                    <Shield size={16} /> Admin
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form */}
                <div className="px-8 pb-10">
                    {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition bg-transparent"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition bg-transparent"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-0 top-3 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-300 py-2 pl-8 focus:outline-none focus:border-black transition bg-transparent"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-0 top-3 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-300 py-2 pl-8 focus:outline-none focus:border-black transition bg-transparent"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded border border-gray-300 flex items-center justify-center cursor-pointer">
                                    <Check size={10} className="text-black opacity-0" />
                                </div>
                                <p className="text-xs text-gray-500">I agree to the <span className="underline cursor-pointer">Terms & Conditions</span></p>
                            </div>
                        )}

                        <button className="w-full bg-[#1C1C1C] text-white py-4 mt-4 tracking-widest text-xs uppercase hover:bg-opacity-90 transition duration-300 flex items-center justify-center gap-2 group">
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={toggleMode} className="text-black font-semibold underline hover:opacity-80 transition">
                                {isLogin ? 'Register' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="absolute top-6 left-6">
                    <Link to="/" className="text-xs font-bold tracking-widest text-gray-400 hover:text-black transition uppercase">
                        &larr; Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
