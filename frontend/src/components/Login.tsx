import { useContext, useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import assets from '../assets/assets';
import { AppContext, type AppContextValue } from '../context/AppContext';
import { toast } from 'react-toastify';

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
                // Validate password length on frontend too
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
                // Handle Zod validation errors
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
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <form
                onSubmit={onSubmitHandler}
                className="relative bg-white p-10 rounded-xl text-slate-500 shadow-xl"
            >
                <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
                <p className="text-sm text-center mt-2">
                    {state === 'Login'
                        ? 'Welcome back! Please sign in to continue'
                        : 'Create an account to get started'}
                </p>

                {state !== 'Login' && (
                    <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                        <img src={assets.profile_icon} alt="" className="outline-none text-sm h-5" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            minLength={2}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="outline-none text-sm flex-1"
                        />
                    </div>
                )}

                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.email_icon} alt="" />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="outline-none text-sm flex-1"
                    />
                </div>

                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.lock_icon} alt="" />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        minLength={state === 'Sign Up' ? 8 : 1}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="outline-none text-sm flex-1"
                    />
                </div>

                {state === 'Login' && (
                    <p className="text-sm text-blue-500 my-4 cursor-pointer hover:underline">
                        Forgot Password?
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 w-full py-2 rounded-full text-white mt-4 hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Please wait...' : state === 'Login' ? 'Login' : 'Create account'}
                </button>

                {state === 'Login' ? (
                    <p className="mt-5 text-center">
                        Don't have an account?{' '}
                        <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => setState('Sign Up')}
                        >
                            Sign up
                        </span>
                    </p>
                ) : (
                    <p className="mt-5 text-center">
                        Already have an account?{' '}
                        <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => setState('Login')}
                        >
                            Login
                        </span>
                    </p>
                )}

                <img
                    onClick={() => setShowLogin(false)}
                    src={assets.cross_icon}
                    alt="Close"
                    className="absolute top-5 right-5 cursor-pointer hover:opacity-70 transition"
                />
            </form>
        </div>
    );
};

export default Login;
