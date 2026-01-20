
import { useContext } from 'react'
import assets from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext, type AppContextValue } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

	const navigate = useNavigate();

	const { user, setShowLogin } = useContext(AppContext) as AppContextValue;
	const onClickHandler = () => {
		if (user) {
			navigate('/result')
		} else {
			setShowLogin(true);
		}
	}

	return (
		<motion.section className='grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-16 lg:py-24'
			initial={{ opacity: 0.2, y: 100 }}
			transition={{ duration: 1 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
		>
			<div>
				<motion.div className='inline-flex items-center gap-2 bg-white border border-neutral-300 px-4 py-1 rounded-full text-neutral-600'
					initial={{ opacity: 0, y: -20 }}
					transition={{ delay: 0.2, duration: 0.8 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<p>AI image generator</p>
					<img src={assets.star_icon} alt='' />
				</motion.div>

				<motion.h1 className='text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mt-6 text-balance'
					initial={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.8 }}
					animate={{ opacity: 1, y: 0 }}
				>
					Create stunning images from text, instantly
				</motion.h1>
				<motion.p className='text-lg text-neutral-600 mt-5 max-w-xl'
					initial={{ opacity: 0, y: 10 }}
					transition={{ delay: 0.3, duration: 0.8 }}
					animate={{ opacity: 1, y: 0 }}
				>
					Turn your ideas into beautiful visuals in seconds. No design skills required.
				</motion.p>

				<div className='mt-8 flex items-center gap-3'>
					<motion.button onClick={onClickHandler}
						className='sm:text-lg text-white bg-black px-8 py-3 rounded-full cursor-pointer'
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.98 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ default: { duration: 0.4 }, opacity: { delay: 0.5, duration: 0.8 } }}
					>
						Generate images
					</motion.button>
					<button onClick={() => navigate('/buy')} className='px-8 py-3 rounded-full border border-neutral-300 text-neutral-800 hover:bg-neutral-100'>See pricing</button>
				</div>
			</div>

			<div className='grid grid-cols-3 gap-3 max-w-md lg:max-w-none mx-auto lg:mx-0'>
				<img className='rounded-lg hover:scale-[1.02] transition-all duration-300' src={assets.sample_img_1} alt='' />
				<img className='rounded-lg hover:scale-[1.02] transition-all duration-300' src={assets.sample_img_2} alt='' />
				<img className='rounded-lg hover:scale-[1.02] transition-all duration-300' src={assets.sample_img_1} alt='' />
				<img className='rounded-lg hover:scale-[1.02] transition-all duration-300' src={assets.sample_img_2} alt='' />
				<img className='rounded-lg hover:scale-[1.02] transition-all duration-300' src={assets.sample_img_1} alt='' />
				<img className='rounded-lg hover:scale-[1.02] transition-all duration-300' src={assets.sample_img_2} alt='' />
			</div>
		</motion.section>
	)
}

export default Header
