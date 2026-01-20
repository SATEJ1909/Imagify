import { useContext, useState } from 'react';
import assets from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, type AppContextValue } from '../context/AppContext';
import { ThemeContext } from '../context/ThemeContext';

function Navbar() {
	const { user, setShowLogin, credit, logOut } = useContext(AppContext) as AppContextValue;
	const { isDark, toggleTheme } = useContext(ThemeContext);
	const navigate = useNavigate();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const closeMobileMenu = () => setMobileMenuOpen(false);

	return (
		<div className="sticky top-0 z-40 mt-4">
			<div className="flex items-center justify-between gap-3 px-4 py-3 rounded-full border border-neutral-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
				<Link to="/" className="inline-flex items-center gap-2">
					<img src={assets.logo} alt="Imaginetix" className="w-28 sm:w-32 lg:w-40" />
				</Link>

				<div className="flex items-center gap-2 sm:gap-4">
					{/* Desktop Navigation */}
					<Link
						to="/result"
						className="max-sm:hidden text-sm text-neutral-700 hover:text-black px-3 py-1.5 rounded-full hover:bg-neutral-100 transition"
					>
						Generate
					</Link>
					<Link
						to="/explore"
						className="max-sm:hidden text-sm text-neutral-700 hover:text-black px-3 py-1.5 rounded-full hover:bg-neutral-100 transition"
					>
						Explore
					</Link>
					<Link
						to="/buy"
						className="max-sm:hidden text-sm text-neutral-700 hover:text-black px-3 py-1.5 rounded-full hover:bg-neutral-100 transition"
					>
						Pricing
					</Link>

					{/* Theme Toggle */}
					<button
						onClick={toggleTheme}
						className="max-sm:hidden p-2 rounded-full hover:bg-neutral-100 transition"
						title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
					>
						{isDark ? (
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						) : (
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
							</svg>
						)}
					</button>

					{user ? (
						<div className="flex items-center gap-2 sm:gap-3">
							<button
								onClick={() => navigate('/dashboard')}
								className="flex items-center gap-2 bg-neutral-100 px-4 sm:px-5 py-2 rounded-full hover:bg-neutral-200 transition"
							>
								<img src={assets.credit_star} alt="" />
								<p className="text-xs sm:text-sm font-medium text-gray-700">
									{credit} credits
								</p>
							</button>
							<button
								onClick={() => navigate('/result')}
								className="hidden sm:inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:opacity-90 transition"
							>
								Generate
							</button>
							<div className="relative group">
								<img
									src={assets.profile_icon}
									alt="Profile"
									className="w-10 h-10 rounded-full object-cover drop-shadow cursor-pointer"
								/>
								<div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
									<ul className="list-none m-0 p-2 rounded-md border text-sm bg-white shadow-md min-w-40">
										<li
											className="py-2 px-3 cursor-pointer hover:bg-neutral-100 rounded"
											onClick={() => navigate('/dashboard')}
										>
											📊 Dashboard
										</li>
										<li
											className="py-2 px-3 cursor-pointer hover:bg-neutral-100 rounded"
											onClick={() => navigate('/gallery')}
										>
											🖼️ My Gallery
										</li>
										<li
											className="py-2 px-3 cursor-pointer hover:bg-neutral-100 rounded"
											onClick={() => navigate('/buy')}
										>
											💎 Buy Credits
										</li>
										<li className="border-t my-1" />
										<li
											className="py-2 px-3 cursor-pointer hover:bg-red-50 text-red-600 rounded"
											onClick={logOut}
										>
											🚪 Logout
										</li>
									</ul>
								</div>
							</div>
						</div>
					) : (
						<div className="flex items-center gap-2 sm:gap-3">
							<button
								onClick={() => navigate('/buy')}
								className="max-sm:hidden text-sm text-neutral-700 hover:text-black px-3 py-1.5 rounded-full hover:bg-neutral-100 transition"
							>
								Pricing
							</button>
							<button
								onClick={() => setShowLogin(true)}
								className="bg-black text-white px-5 py-2 text-sm rounded-full hover:opacity-90 transition"
							>
								Login
							</button>
						</div>
					)}

					{/* Mobile Menu Button */}
					<button
						className="sm:hidden p-2 hover:bg-neutral-100 rounded-full transition"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{mobileMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<div className="sm:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white border rounded-2xl shadow-lg py-2 z-50">
					<Link
						to="/result"
						onClick={closeMobileMenu}
						className="block px-4 py-3 hover:bg-neutral-100"
					>
						✨ Generate
					</Link>
					<Link
						to="/explore"
						onClick={closeMobileMenu}
						className="block px-4 py-3 hover:bg-neutral-100"
					>
						🌍 Explore
					</Link>
					{user && (
						<>
							<Link
								to="/gallery"
								onClick={closeMobileMenu}
								className="block px-4 py-3 hover:bg-neutral-100"
							>
								🖼️ My Gallery
							</Link>
							<Link
								to="/dashboard"
								onClick={closeMobileMenu}
								className="block px-4 py-3 hover:bg-neutral-100"
							>
								📊 Dashboard
							</Link>
						</>
					)}
					<Link
						to="/buy"
						onClick={closeMobileMenu}
						className="block px-4 py-3 hover:bg-neutral-100"
					>
						💎 Pricing
					</Link>
				</div>
			)}
		</div>
	);
}

export default Navbar;
