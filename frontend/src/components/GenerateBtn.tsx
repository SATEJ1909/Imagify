import { useContext } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext, type AppContextValue } from '../context/AppContext';
import { motion } from 'framer-motion';

const GenerateBtn = () => {
  const navigate = useNavigate();
  const { user, setShowLogin } = useContext(AppContext) as AppContextValue;

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.section
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-3xl" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative text-center text-white px-6 py-8">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Ready to create magic?
        </motion.h2>

        <motion.p
          className="text-lg text-white/80 max-w-lg mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Start generating stunning AI images today. No design skills required.
        </motion.p>

        <motion.button
          onClick={onClickHandler}
          className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-purple-600 text-lg font-semibold rounded-full shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span>Generate Image</span>
          <img
            src={assets.star_group}
            alt=""
            className="h-6 group-hover:rotate-12 transition-transform"
          />
        </motion.button>

        {/* Floating decorative images */}
        <div className="hidden lg:block absolute top-1/2 left-8 -translate-y-1/2">
          <motion.img
            src={assets.sample_img_1}
            alt=""
            className="w-24 h-24 rounded-2xl shadow-xl rotate-[-12deg]"
            initial={{ opacity: 0, x: -20, rotate: -20 }}
            whileInView={{ opacity: 1, x: 0, rotate: -12 }}
            transition={{ delay: 0.4 }}
          />
        </div>
        <div className="hidden lg:block absolute top-1/2 right-8 -translate-y-1/2">
          <motion.img
            src={assets.sample_img_2}
            alt=""
            className="w-24 h-24 rounded-2xl shadow-xl rotate-[12deg]"
            initial={{ opacity: 0, x: 20, rotate: 20 }}
            whileInView={{ opacity: 1, x: 0, rotate: 12 }}
            transition={{ delay: 0.4 }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default GenerateBtn;
