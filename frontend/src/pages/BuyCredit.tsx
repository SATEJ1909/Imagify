import { useContext, useState } from 'react';
import assets, { plans } from '../assets/assets';
import { AppContext, type AppContextValue } from '../context/AppContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  order_id: string;
  description: string;
  receipt: string;
  handler: (response: RazorpayResponse) => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

interface Order {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

function BuyCredit() {
  const { user, backendUrl, setShowLogin, token, loadCreditData } = useContext(
    AppContext
  ) as AppContextValue;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const initPay = async (order: Order) => {
    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Imaginetix',
      order_id: order.id,
      description: 'Buy Credits',
      receipt: order.receipt,
      handler: async (response: RazorpayResponse) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/v1/user/verifyPayment`,
            {
              razorpay_order_id: response.razorpay_order_id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (data.success) {
            loadCreditData();
            navigate('/dashboard');
            toast.success('Credits added successfully! 🎉');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          toast.error('Payment verification failed');
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId: string) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      setLoading(planId);

      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/razorpay`,
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(null);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'Basic':
        return '⭐';
      case 'Advanced':
        return '🌟';
      case 'Business':
        return '💎';
      default:
        return '✨';
    }
  };

  const getPlanHighlight = (planId: string) => {
    switch (planId) {
      case 'Advanced':
        return 'Most Popular';
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <span className="inline-block border border-gray-300 px-6 py-1.5 rounded-full mb-4 text-sm">
        💎 Our Plans
      </span>
      <h1 className="text-center text-4xl font-semibold mb-3">
        Choose the perfect plan
      </h1>
      <p className="text-neutral-600 mb-10 max-w-md mx-auto">
        Get credits to generate stunning AI images. No subscription required.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
        {plans.map((item, index) => {
          const highlight = getPlanHighlight(item.id);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all ${highlight ? 'border-blue-500 border-2' : ''
                }`}
            >
              {highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-4 py-1 rounded-full">
                  {highlight}
                </span>
              )}

              <div className="text-4xl mb-4">{getPlanIcon(item.id)}</div>
              <p className="text-xl font-semibold">{item.id}</p>
              <p className="text-sm text-neutral-600 mt-1">{item.desc}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold">₹{item.price}</span>
                <span className="text-neutral-600 ml-2">
                  / {item.credits} credits
                </span>
              </div>

              <p className="text-sm text-neutral-500 mt-2">
                ₹{(item.price / item.credits).toFixed(2)} per image
              </p>

              <ul className="mt-6 space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> {item.credits}{' '}
                  image generations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> All styles & formats
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Commercial use
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> No expiration
                </li>
              </ul>

              <button
                onClick={() => paymentRazorpay(item.id)}
                disabled={loading === item.id}
                className={`w-full mt-8 py-3 rounded-full font-medium transition ${highlight
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-black text-white hover:opacity-90'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === item.id
                  ? 'Processing...'
                  : user
                    ? 'Purchase Now'
                    : 'Get Started'}
              </button>
            </motion.div>
          );
        })}
      </div>

      <p className="text-sm text-neutral-500 mt-10">
        Secure payments powered by Razorpay. All prices in INR.
      </p>
    </motion.div>
  );
}

export default BuyCredit;
