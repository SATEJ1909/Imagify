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
		<nav className="sticky top-4 z-40">
			<div className="flex items-center justify-between gap-3 px-5 py-3 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-black/[0.03]">
				<Link to="/" className="inline-flex items-center gap-2">
					<img src={assets.logo} alt="Imaginetix" className="w-28 sm:w-32 lg:w-36" />
				</Link>

				<div className="flex items-center gap-2 sm:gap-4">
					{/* Desktop Navigation */}
					<Link
						to="/result"
						className="max-sm:hidden text-sm text-neutral-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-1.5 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
					>
						Generate
					</Link>
					<Link
						to="/explore"
						className="max-sm:hidden text-sm text-neutral-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-1.5 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
					>
						Explore
					</Link>
					<Link
						to="/buy"
						className="max-sm:hidden text-sm text-neutral-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-1.5 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
					>
						Pricing
					</Link>

					{/* Theme Toggle */}
					<button
						onClick={toggleTheme}
						className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-slate-800 transition"
						title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
					>
						{isDark ? (
							<svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						) : (
							<svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
							</svg>
						)}
					</button>

					{user ? (
						<div className="flex items-center gap-2 sm:gap-3">
							<button
								onClick={() => navigate('/dashboard')}
								className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 px-4 sm:px-5 py-2 rounded-full hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/50 dark:hover:to-blue-900/50 transition-all border border-purple-100 dark:border-purple-800/50"
							>
								<span className="text-lg">✨</span>
								<p className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
									{credit} credits
								</p>
							</button>

							<button
								onClick={() => navigate('/result')}
								className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition shadow-lg shadow-purple-500/25"
							>
								Generate
							</button>

							<div className="relative group">
								<button className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-lg">
									{user.name?.charAt(0).toUpperCase() || 'U'}
								</button>

								<div className="absolute hidden group-hover:block top-0 right-0 z-10 pt-12 min-w-48">
									<div className="bg-white dark:bg-slate-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 shadow-xl overflow-hidden">
										<div className="p-4 border-b border-neutral-100 dark:border-neutral-700">
											<p className="font-semibold">{user.name}</p>
											<p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
										</div>
										<ul className="p-2">
											<li>
												<button
													className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-50 dark:hover:bg-slate-700 rounded-xl transition text-left"
													onClick={() => navigate('/dashboard')}
												>
													<span className="text-lg">📊</span>
													<span>Dashboard</span>
												</button>
											</li>
											<li>
												<button
													className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-50 dark:hover:bg-slate-700 rounded-xl transition text-left"
													onClick={() => navigate('/gallery')}
												>
													<span className="text-lg">🖼️</span>
													<span>My Gallery</span>
												</button>
											</li>
											<li>
												<button
													className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-50 dark:hover:bg-slate-700 rounded-xl transition text-left"
													onClick={() => navigate('/buy')}
												>
													<span className="text-lg">💎</span>
													<span>Buy Credits</span>
												</button>
											</li>
											<li className="border-t border-neutral-100 dark:border-neutral-700 mt-2 pt-2">
												<button
													className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-xl transition text-left"
													onClick={logOut}
												>
													<span className="text-lg">🚪</span>
													<span>Logout</span>
												</button>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="flex items-center gap-2 sm:gap-3">
							<button
								onClick={() => navigate('/buy')}
								className="max-sm:hidden text-sm text-neutral-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-1.5"
							>
								Pricing
							</button>
							<button
								onClick={() => setShowLogin(true)}
								className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-sm font-medium rounded-full hover:opacity-90 transition shadow-lg shadow-purple-500/25"
							>
								Login
							</button>
						</div>
					)}

					{/* Mobile Menu Button */}
					<button
						className="sm:hidden p-2 hover:bg-neutral-100 dark:hover:bg-slate-800 rounded-full transition"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{mobileMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{mobileMenuOpen && (
				<div className="sm:hidden absolute top-full left-0 right-0 mt-2 mx-2 bg-white dark:bg-slate-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl shadow-xl py-2 z-50 overflow-hidden">
					<Link
						to="/result"
						onClick={closeMobileMenu}
						className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-slate-700"
					>
						<span className="text-lg">✨</span>
						<span>Generate</span>
					</Link>
					<Link
						to="/explore"
						onClick={closeMobileMenu}
						className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-slate-700"
					>
						<span className="text-lg">🌍</span>
						<span>Explore</span>
					</Link>
					{user && (
						<>
							<Link
								to="/gallery"
								onClick={closeMobileMenu}
								className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-slate-700"
							>
								<span className="text-lg">🖼️</span>
								<span>My Gallery</span>
							</Link>
							<Link
								to="/dashboard"
								onClick={closeMobileMenu}
								className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-slate-700"
							>
								<span className="text-lg">📊</span>
								<span>Dashboard</span>
							</Link>
						</>
					)}
					<Link
						to="/buy"
						onClick={closeMobileMenu}
						className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-slate-700"
					>
						<span className="text-lg">💎</span>
						<span>Pricing</span>
					</Link>
				</div>
			)}
		</nav>
	);
}

export default Navbar;
