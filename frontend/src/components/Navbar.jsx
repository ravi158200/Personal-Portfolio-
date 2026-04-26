import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = ['Home', 'Skills', 'Projects', 'Experience', 'Services', 'Contact', 'About'];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const currentPath = location.pathname === '/' ? 'home' : location.pathname.substring(1);
  const activeSection = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'glass shadow-md' : 'bg-transparent py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 z-10"
          >
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500/50 group-hover:border-purple-500 transition-colors duration-300">
                <img src="/assests/Ravi.jpg" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent drop-shadow-sm">
                Personal Portfolio
              </span>
            </Link>
          </motion.div>
          
          <div className="hidden md:block">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  }
                }
              }}
              className="ml-10 flex items-center space-x-1"
            >
              {navItems.map((item, index) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                return (
                  <motion.div 
                    key={item} 
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="relative px-3"
                  >
                    <Link
                      to={path}
                      className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 z-10 block group ${activeSection === item ? 'text-white' : 'text-gray-800 dark:text-gray-200 hover:text-blue-500'}`}
                    >
                      <span className="relative z-10">{item}</span>
                      <motion.span 
                        className="absolute inset-0 rounded-full bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.05 }}
                      />
                    </Link>
                    {activeSection === item && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full z-0 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
              <motion.button
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="ml-4 p-2.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-800 dark:text-gray-200 shadow-inner"
              >
                {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-500" />}
              </motion.button>
            </motion.div>
          </div>
          
          <div className="md:hidden flex items-center z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-y-0 right-0 w-64 glass border-l border-white/20 shadow-2xl z-50 pt-20"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                return (
                  <motion.div 
                    key={item} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative"
                  >
                    <Link
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={`relative block px-4 py-3 rounded-2xl text-lg font-bold z-10 transition-all ${activeSection === item ? 'text-white' : 'text-gray-800 dark:text-gray-100 hover:bg-blue-500/5'}`}
                    >
                      {item}
                    </Link>
                    {activeSection === item && (
                      <motion.div
                        layoutId="navbar-mobile-active"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl z-0 shadow-lg shadow-blue-500/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
