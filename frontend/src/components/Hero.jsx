import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const roles = [
  "Full Stack Developer",
  "React Developer",
  "MERN Stack Expert",
  "UI/UX Enthusiast"
];

const technologies = [
  "React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Git"

  
];

const Hero = ({ profileData }) => {
  const [currentRole, setCurrentRole] = useState(0);

  const heroText = profileData?.heroText || "I build modern websites and web applications with exceptional user experiences. Turning ideas into interactive reality.";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl filter -z-10 mix-blend-multiply dark:mix-blend-lighten animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl filter -z-10 mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center z-10 flex-grow pt-10 pb-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 flex items-center justify-center md:justify-start gap-3 flex-wrap"
          >
            <span className="text-blue-500">Hello, I'm</span>
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Ravi Kumar</span>
          </motion.h1>
          
          {/* Animated Role Slider */}
          <div className="h-10 md:h-12 mb-6 relative overflow-hidden flex justify-center md:justify-start">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentRole}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-2xl md:text-3xl font-medium text-purple-600 dark:text-purple-400 absolute"
              >
                {roles[currentRole]}
              </motion.h3>
            </AnimatePresence>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg mb-8 max-w-2xl mx-auto md:mx-0 text-gray-600 dark:text-gray-400 mt-4 whitespace-pre-line"
          >
            {heroText}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 w-full"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/projects" 
                className="inline-flex items-center justify-center px-4 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30 whitespace-nowrap text-sm sm:text-base"
              >
                View Projects
              </Link>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={profileData?.resumeUrl || "/Resume/cv.pdf"}
              download 
              className="inline-flex items-center justify-center px-4 sm:px-8 py-3 glass hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium transition-colors border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 whitespace-nowrap text-sm sm:text-base"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 mt-16 md:mt-0 flex justify-center relative"
        >
          {/* Animated floating elements behind profile */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 w-24 h-24 bg-blue-400/30 rounded-full blur-xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-10 w-32 h-32 bg-purple-400/30 rounded-full blur-xl"
          />

          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative w-64 h-64 md:w-80 md:h-80 group cursor-pointer"
          >
            {/* Main Image Card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 rounded-[2.5rem] p-1.5 shadow-2xl shadow-blue-500/20 group-hover:shadow-purple-500/40 transition-all duration-500 transform group-hover:rotate-2">
              <div className="w-full h-full rounded-[2.2rem] bg-white dark:bg-slate-900 overflow-hidden relative">
                <img 
                  src="/assests/Ravi.jpg" 
                  alt="Ravi Kumar" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold tracking-wider text-sm uppercase">Full Stack Developer</span>
                </div>
              </div>
            </div>

            {/* Decorative Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 glass p-4 rounded-2xl shadow-xl border-white/20 z-20"
            >
              <div className="text-2xl">🚀</div>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-6 glass p-4 rounded-2xl shadow-xl border-white/20 z-20"
            >
              <div className="text-2xl">💻</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Tech Stack Marquee Slider */}
      <div className="w-full mt-auto py-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 overflow-hidden flex absolute bottom-0">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center"
        >
          {/* Double the array for seamless looping */}
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <div key={index} className="mx-8 text-xl font-bold text-gray-400 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-default">
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
