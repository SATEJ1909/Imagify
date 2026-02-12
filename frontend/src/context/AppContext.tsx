import { createContext, useEffect, useState, type ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export interface User {
    name?: string;
    email?: string;
    creditBalance?: number;
}

export interface AppContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
    showLogin: boolean;
    setShowLogin: (show: boolean) => void;
    backendUrl: string;
    token: string;
    setToken: (token: string) => void;
    credit: number;
    setCredit: (value: number) => void;
    loadCreditData: () => Promise<void>;
    logOut: () => void;
    generateImage: (prompt: string, options?: { style?: string; aspectRatio?: string }) => Promise<string | undefined>;
}

const initialContext: AppContextValue = {
    user: null,
    setUser: () => { },
    showLogin: false,
    setShowLogin: () => { },
    backendUrl: '',
    token: '',
    setToken: () => { },
    credit: 0,
    setCredit: () => { },
    loadCreditData: async () => { },
    logOut: () => { },
    generateImage: async () => undefined,
};

export const AppContext = createContext<AppContextValue>(initialContext);

// Create axios instance with auth interceptor
const createAuthHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
});

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
    const [credit, setCredit] = useState<number>(0);

    const navigate = useNavigate();

    const backendUrl = "https://imagify-1-g4c8.onrender.com"

    const loadCreditData = async (): Promise<void> => {
        if (!token) return;

        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/user/credits`, {
                headers: createAuthHeaders(token),
            });

            if (data.success) {
                setCredit(data.user.creditBalance);
                setUser(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error: unknown) {
            console.error('Load credit data error:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                // Token expired or invalid
                logOut();
                toast.error('Session expired, please login again');
            } else {
                toast.error('Failed to load user data');
            }
        }
    };

    const generateImage = async (
        prompt: string,
        options?: { style?: string; aspectRatio?: string }
    ): Promise<string | undefined> => {
        if (!token) {
            setShowLogin(true);
            return undefined;
        }

        try {
            const { data } = await axios.post(
                `${backendUrl}/api/v1/image/generateImage`,
                { prompt, ...options },
                { headers: createAuthHeaders(token) }
            );

            if (data.success) {
                loadCreditData();
                return data.image as string;
            } else {
                toast.error(data.message);
                loadCreditData();
                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
            }
        } catch (error: unknown) {
            console.error('Generate image error:', error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    logOut();
                    toast.error('Session expired, please login again');
                } else if (error.response?.status === 429) {
                    toast.error('Too many requests, please slow down');
                } else {
                    toast.error(error.response?.data?.message || 'Failed to generate image');
                }
            } else {
                toast.error('Failed to generate image');
            }
        }
        return undefined;
    };

    const logOut = (): void => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
        setCredit(0);
    };

    useEffect(() => {
        if (token) {
            loadCreditData();
        }
    }, [token]);

    const value: AppContextValue = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditData,
        logOut,
        generateImage,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;