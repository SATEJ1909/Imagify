import assets, { testimonialsData } from '../assets/assets';
import { motion } from 'framer-motion';

const Testimonials = () => {
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
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-pink-100/50 to-transparent dark:from-pink-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-l from-purple-100/50 to-transparent dark:from-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-medium rounded-full mb-4"
        >
          ❤️ Loved by creators
        </motion.span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          What our users{' '}
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            say
          </span>
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 mt-4 max-w-lg mx-auto">
          Join thousands of happy creators who trust Imaginetix
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Gradient border on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />

            <div className="relative bg-white dark:bg-slate-800 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-700/50 shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-5xl text-neutral-100 dark:text-neutral-700 font-serif">
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(testimonial.stars)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>

              {/* Testimonial text */}
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* User info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-900"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">
          Ready to join them?
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="flex -space-x-3">
            {testimonialsData.slice(0, 3).map((t, i) => (
              <img
                key={i}
                src={t.image}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800"
              />
            ))}
          </div>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            +500 creators already using Imaginetix
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Testimonials;
