import { stepsData } from '../assets/assets';
import { motion } from 'framer-motion';

const Steps = () => {
  return (
    <motion.section
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-24 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full blur-3xl" />
      </div>

      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full mb-4"
        >
          Simple Process
        </motion.span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          How it{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            works
          </span>
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 mt-4 max-w-lg mx-auto">
          Transform your words into stunning visuals in three simple steps
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200 dark:from-purple-800 dark:via-blue-800 dark:to-purple-800" />

        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-neutral-100 dark:border-neutral-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Step number */}
              <div className="absolute -top-5 left-8 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform">
                <img src={item.icon} alt="" className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>

              {/* Arrow for desktop (except last item) */}
              {index < stepsData.length - 1 && (
                <div className="hidden md:flex absolute top-24 -right-4 w-8 h-8 bg-white dark:bg-slate-800 rounded-full items-center justify-center shadow-md border border-neutral-100 dark:border-neutral-700 z-10">
                  <svg
                    className="w-4 h-4 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Steps;
