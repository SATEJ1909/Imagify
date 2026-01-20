import { useState } from 'react';
import assets from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setEmail('');
    alert('Thanks for subscribing!');
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Generate', href: '/result' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Pricing', href: '/buy' },
      { label: 'Explore', href: '/explore' },
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    Legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  };

  return (
    <footer className="relative mt-24 pt-16 pb-8 border-t border-neutral-200 dark:border-neutral-800">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={assets.logo} alt="Imaginetix" className="h-10" />
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm">
              Transform your ideas into stunning visuals with the power of AI.
              Create, share, and inspire.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2.5 bg-neutral-100 dark:bg-slate-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            © {currentYear} Satej.dev — All rights reserved
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-neutral-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
            >
              <img
                src={assets.facebook_icon}
                alt="Facebook"
                className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-neutral-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
            >
              <img
                src={assets.twitter_icon}
                alt="Twitter"
                className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-neutral-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
            >
              <img
                src={assets.instagram_icon}
                alt="Instagram"
                className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
