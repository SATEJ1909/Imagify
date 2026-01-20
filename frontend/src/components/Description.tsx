import assets from '../assets/assets';
import { motion } from 'framer-motion';

const Description = () => {
  return (
    <motion.section
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-24 relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-100/40 to-transparent dark:from-blue-900/20 rounded-full blur-3xl" />
      </div>

      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full mb-4"
        >
          Powered by AI
        </motion.span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Create{' '}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            AI images
          </span>
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 mt-4 max-w-lg mx-auto">
          Turn your imagination into visual art in seconds
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image with decorative elements */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <img
              src={assets.sample_img_1}
              alt="AI Generated"
              className="w-full max-w-xl rounded-3xl shadow-2xl"
            />

            {/* Decorative gradient border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-3xl -z-10 blur-sm opacity-50" />
          </div>

          {/* Floating stats card */}
          <motion.div
            className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-xl border border-neutral-100 dark:border-neutral-700"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">~5 sec</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">Generation time</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
            The future of image creation is here
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
            Unleash your imagination like never before with the power of AI. Whether you're dreaming up fantasy worlds, futuristic cities, or surreal concepts, our AI transforms your words into stunning visual art.
          </p>

          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
            From playful sketches to breathtaking masterpieces, your imagination is the only limit. No design skills needed — just type and watch the magic happen.
          </p>

          {/* Features list */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: '🎨', text: 'Multiple styles' },
              { icon: '⚡', text: 'Instant results' },
              { icon: '📐', text: 'Custom sizes' },
              { icon: '💾', text: 'Auto-save gallery' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-slate-800/50 rounded-xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Description;
