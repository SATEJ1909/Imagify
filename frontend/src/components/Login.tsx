import { useContext, useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import assets from '../assets/assets';
import { AppContext, type AppContextValue } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

type AuthState = 'Login' | 'Sign Up';

const Login = () => {
    const [state, setState] = useState<AuthState>('Login');
    const [isLoading, setIsLoading] = useState(false);
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext) as AppContextValue;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (state === 'Login') {
                const { data } = await axios.post(`${backendUrl}/api/v1/user/login`, {
                    email,
                    password,
                });

                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    toast.success('Welcome back!');
                } else {
                    toast.error(data.message);
                }
            } else {
                if (password.length < 8) {
                    toast.error('Password must be at least 8 characters');
                    setIsLoading(false);
                    return;
                }

                const { data } = await axios.post(`${backendUrl}/api/v1/user/signup`, {
                    name,
                    email,
                    password,
                });

                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);
                    toast.success('Account created successfully!');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (axios.isAxiosError(error) && error.response?.data?.errors) {
                const errors = error.response.data.errors;
                const firstError = Object.values(errors)[0];
                if (Array.isArray(firstError) && firstError.length > 0) {
                    toast.error(firstError[0] as string);
                }
            } else {
                toast.error('Something went wrong');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setShowLogin(false)}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Gradient border effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-3xl blur-sm opacity-50" />

                    <form
                        onSubmit={onSubmitHandler}
                        className="relative bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl"
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setShowLogin(false)}
                            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-slate-800 transition"
                        >
                            <img src={assets.cross_icon} alt="Close" className="w-4 h-4 opacity-50" />
                        </button>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                {state === 'Login' ? 'Welcome back' : 'Create account'}
                            </h1>
                            <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                                {state === 'Login'
                                    ? 'Sign in to continue your creative journey'
                                    : 'Start creating amazing AI images today'}
                            </p>
                        </div>

                        {/* Form fields */}
                        <div className="space-y-4">
                            {state !== 'Login' && (
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <img src={assets.profile_icon} alt="" className="w-5 h-5 opacity-40" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        minLength={2}
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <img src={assets.email_icon} alt="" className="w-5 h-5 opacity-40" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <img src={assets.lock_icon} alt="" className="w-5 h-5 opacity-40" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    minLength={state === 'Sign Up' ? 8 : 1}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                />
                            </div>
                        </div>

                        {state === 'Login' && (
                            <div className="flex justify-end mt-3">
                                <button type="button" className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Please wait...</span>
                                </span>
                            ) : state === 'Login' ? (
                                'Sign in'
                            ) : (
                                'Create account'
                            )}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-neutral-200 dark:bg-slate-700" />
                            <span className="text-sm text-neutral-400">or</span>
                            <div className="flex-1 h-px bg-neutral-200 dark:bg-slate-700" />
                        </div>

                        {/* Toggle auth mode */}
                        <p className="text-center text-neutral-600 dark:text-neutral-400">
                            {state === 'Login' ? (
                                <>
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                                        onClick={() => setState('Sign Up')}
                                    >
                                        Sign up free
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                                        onClick={() => setState('Login')}
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Login;
