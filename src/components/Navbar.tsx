import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import logoImg from '../assets/logo.png';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';

export default function Navbar({ darkMode, setDarkMode, user }: { darkMode: boolean, setDarkMode: (v: boolean) => void, user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Remove internal user state and useEffect since user is now a prop

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Diet Plan', path: '/diet-plan' },
    { name: 'Online Classes', path: '/online-classes' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center bg-black">
              <img 
               src={logoImg} 
               alt="Gym Logo" 
               className="w-full h-full object-cover rounded-full"/>
            </div>
            <span className="font-heading font-bold text-2xl tracking-tighter text-zinc-900 dark:text-white uppercase">
              FITNESS <span className="text-gradient">CITY</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-yellow-500",
                  location.pathname === link.path 
                    ? "text-yellow-500 dark:text-yellow-400" 
                    : "text-zinc-600 dark:text-zinc-300"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <Link 
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all border border-zinc-200 dark:border-zinc-700"
              >
                <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center text-black font-bold">
                  {user.displayName?.[0] || user.email?.[0] || 'U'}
                </div>
                <span className="text-sm font-medium text-zinc-900 dark:text-white hidden lg:block">Profile</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login"
                  className="hidden sm:block text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-yellow-500 transition-colors px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500"
                >
                  Login / Signup
                </Link>
                <Link 
                  to="/contact"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-600 dark:text-zinc-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-md text-base font-medium",
                    location.pathname === link.path
                      ? "bg-zinc-100 dark:bg-zinc-800 text-yellow-500"
                      : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-yellow-500 bg-zinc-100 dark:bg-zinc-800"
                >
                  Your Profile
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 rounded-md text-base font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-md font-medium"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
