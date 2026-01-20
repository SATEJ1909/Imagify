import { useContext } from 'react';
import assets from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext, type AppContextValue } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
			className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-16 lg:py-24 overflow-hidden"
			initial={{ opacity: 0.2, y: 100 }}
			transition={{ duration: 1 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
		>
			{/* Decorative background elements */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
			</div>

			<div>
				<motion.div
					className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800 px-4 py-2 rounded-full text-purple-600 dark:text-purple-400 shadow-sm"
					initial={{ opacity: 0, y: -20 }}
					transition={{ delay: 0.2, duration: 0.8 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
					</span>
					<p className="text-sm font-medium">AI-Powered Image Generation</p>
					<img src={assets.star_icon} alt="" className="w-4 h-4" />
				</motion.div>

				<motion.h1
					className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mt-6 text-balance"
					initial={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.8 }}
					animate={{ opacity: 1, y: 0 }}
				>
					Turn your ideas into{' '}
					<span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
						stunning visuals
					</span>
				</motion.h1>

				<motion.p
					className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mt-6 max-w-xl leading-relaxed"
					initial={{ opacity: 0, y: 10 }}
					transition={{ delay: 0.3, duration: 0.8 }}
					animate={{ opacity: 1, y: 0 }}
				>
					Create beautiful, unique images in seconds with the power of AI. No design skills required — just describe your vision.
				</motion.p>

				<motion.div
					className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.8 }}
				>
					<motion.button
						onClick={onClickHandler}
						className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-medium rounded-full shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
						whileHover={{ scale: 1.02, y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						<span>Start Creating</span>
						<svg
							className="w-5 h-5 group-hover:translate-x-1 transition-transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
						<div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
					</motion.button>

					<button
						onClick={() => navigate('/buy')}
						className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
					>
						<span>View Pricing</span>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</button>
				</motion.div>

				{/* Stats */}
				<motion.div
					className="mt-10 flex items-center gap-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7, duration: 0.8 }}
				>
					<div>
						<p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">10K+</p>
						<p className="text-sm text-neutral-500 dark:text-neutral-400">Images Created</p>
					</div>
					<div className="w-px h-10 bg-neutral-200 dark:bg-neutral-700" />
					<div>
						<p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">500+</p>
						<p className="text-sm text-neutral-500 dark:text-neutral-400">Happy Users</p>
					</div>
					<div className="w-px h-10 bg-neutral-200 dark:bg-neutral-700" />
					<div>
						<p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">4.9★</p>
						<p className="text-sm text-neutral-500 dark:text-neutral-400">User Rating</p>
					</div>
				</motion.div>
			</div>

			{/* Image Grid */}
			<motion.div
				className="relative"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.3, duration: 0.8 }}
			>
				<div className="grid grid-cols-2 gap-4 max-w-md lg:max-w-none mx-auto lg:mx-0">
					<div className="space-y-4">
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.02, y: -4 }}
							transition={{ duration: 0.3 }}
						>
							<img
								className="rounded-2xl shadow-lg w-full object-cover aspect-square"
								src={assets.sample_img_1}
								alt="AI generated sample"
							/>
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						</motion.div>
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.02, y: -4 }}
							transition={{ duration: 0.3 }}
						>
							<img
								className="rounded-2xl shadow-lg w-full object-cover aspect-video"
								src={assets.sample_img_2}
								alt="AI generated sample"
							/>
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						</motion.div>
					</div>
					<div className="space-y-4 pt-8">
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.02, y: -4 }}
							transition={{ duration: 0.3 }}
						>
							<img
								className="rounded-2xl shadow-lg w-full object-cover aspect-video"
								src={assets.sample_img_2}
								alt="AI generated sample"
							/>
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						</motion.div>
						<motion.div
							className="relative group"
							whileHover={{ scale: 1.02, y: -4 }}
							transition={{ duration: 0.3 }}
						>
							<img
								className="rounded-2xl shadow-lg w-full object-cover aspect-square"
								src={assets.sample_img_1}
								alt="AI generated sample"
							/>
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						</motion.div>
					</div>
				</div>

				{/* Floating badge */}
				<motion.div
					className="absolute -bottom-4 -left-4 lg:left-auto lg:-right-4 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-neutral-100 dark:border-neutral-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.5 }}
				>
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
							<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<div>
							<p className="font-semibold text-sm">Ready in seconds</p>
							<p className="text-xs text-neutral-500 dark:text-neutral-400">Average generation time: 5s</p>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</motion.section>
	);
};

export default Header;
