import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext, type AppContextValue } from '../context/AppContext';

interface Stats {
    creditBalance: number;
    imagesGenerated: number;
    totalPurchases: number;
}

interface Transaction {
    _id: string;
    plan: string;
    credits: number;
    amount: number;
    date: number;
}

const Dashboard = () => {
    const { backendUrl, token, user, credit } = useContext(AppContext) as AppContextValue;
    const navigate = useNavigate();

    const [stats, setStats] = useState<Stats>({ creditBalance: 0, imagesGenerated: 0, totalPurchases: 0 });
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsRes, transRes] = await Promise.all([
                axios.get(`${backendUrl}/api/v1/user/stats`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get(`${backendUrl}/api/v1/user/transactions`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            if (statsRes.data.success) {
                setStats(statsRes.data.stats);
            }
            if (transRes.data.success) {
                setTransactions(transRes.data.transactions);
            }
        } catch (error) {
            console.error('Fetch data error:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const StatCard = ({
        title,
        value,
        icon,
        gradient,
    }: {
        title: string;
        value: number | string;
        icon: string;
        gradient?: string;
    }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl shadow-sm ${gradient || 'bg-white border'
                }`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm ${gradient ? 'text-white/80' : 'text-neutral-600'}`}>
                        {title}
                    </p>
                    <p className={`text-4xl font-bold mt-2 ${gradient ? 'text-white' : ''}`}>
                        {value}
                    </p>
                </div>
                <div className="text-4xl">{icon}</div>
            </div>
        </motion.div>
    );

    if (loading) {
        return (
            <div className="min-h-[80vh] py-12">
                <div className="h-10 w-48 bg-neutral-200 rounded-lg animate-pulse mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 bg-neutral-200 rounded-2xl animate-pulse" />
                    ))}
                </div>
                <div className="h-64 bg-neutral-200 rounded-2xl animate-pulse" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-[80vh] py-12"
        >
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-semibold">
                        Welcome back, {user?.name || 'Creator'}! 👋
                    </h1>
                    <p className="text-neutral-600 mt-1">Here's your creative journey so far</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard
                    title="Credit Balance"
                    value={credit}
                    icon="⭐"
                    gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <StatCard
                    title="Images Generated"
                    value={stats.imagesGenerated}
                    icon="🎨"
                />
                <StatCard
                    title="Total Purchases"
                    value={stats.totalPurchases}
                    icon="💳"
                />
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/result')}
                        className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:opacity-90 transition"
                    >
                        <span>✨</span> Generate Image
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/gallery')}
                        className="flex items-center gap-2 border px-6 py-3 rounded-full hover:bg-neutral-100 transition"
                    >
                        <span>🖼️</span> View Gallery
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/buy')}
                        className="flex items-center gap-2 border px-6 py-3 rounded-full hover:bg-neutral-100 transition"
                    >
                        <span>💎</span> Buy Credits
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/explore')}
                        className="flex items-center gap-2 border px-6 py-3 rounded-full hover:bg-neutral-100 transition"
                    >
                        <span>🌍</span> Explore Community
                    </motion.button>
                </div>
            </div>

            {/* Transaction History */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                {transactions.length === 0 ? (
                    <div className="bg-neutral-50 rounded-2xl p-8 text-center">
                        <div className="text-4xl mb-3">💳</div>
                        <p className="text-neutral-600 mb-4">No transactions yet</p>
                        <button
                            onClick={() => navigate('/buy')}
                            className="text-blue-500 hover:underline"
                        >
                            Purchase credits to get started
                        </button>
                    </div>
                ) : (
                    <div className="bg-white border rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-neutral-50 border-b">
                                    <tr>
                                        <th className="text-left p-4 text-sm font-medium text-neutral-600">
                                            Plan
                                        </th>
                                        <th className="text-left p-4 text-sm font-medium text-neutral-600">
                                            Credits
                                        </th>
                                        <th className="text-left p-4 text-sm font-medium text-neutral-600">
                                            Amount
                                        </th>
                                        <th className="text-left p-4 text-sm font-medium text-neutral-600">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((t, index) => (
                                        <tr
                                            key={t._id}
                                            className={`${index !== transactions.length - 1 ? 'border-b' : ''
                                                } hover:bg-neutral-50 transition`}
                                        >
                                            <td className="p-4">
                                                <span className="font-medium">{t.plan}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-neutral-600">+{t.credits}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-green-600 font-medium">
                                                    ₹{t.amount}
                                                </span>
                                            </td>
                                            <td className="p-4 text-neutral-500">
                                                {formatDate(t.date)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Dashboard;
