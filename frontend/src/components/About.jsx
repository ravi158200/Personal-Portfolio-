import React from 'react';
import { motion } from 'framer-motion';

const About = ({ profileData }) => {
  const aboutText = profileData?.aboutText || "I am a full stack Developer passionate about building modern web applications. With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean, efficient code and intuitive user interfaces.";

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-wider mb-4">
            Get to know
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Me</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/assests/Ravi.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 space-y-8"
          >
            <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-500">Who am I?</h3>
              <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {aboutText}
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I work extensively with <span className="text-blue-500 font-medium">React, Node.js, MongoDB, and Tailwind CSS</span>. 
                I enjoy creating responsive, user-friendly websites that solve real-world problems.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Experience', value: '1+ Years', icon: '🔥' },
                { label: 'Completed', value: '15+ Projects', icon: '🎯' },
                { label: 'Support', value: 'Online 24/7', icon: '💬' },
                { label: 'Technologies', value: 'MERN Stack', icon: '⚡' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-2xl text-center border border-white/20 dark:border-white/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-1">{stat.value}</h4>
                  <p className="text-gray-600 dark:text-gray-400 font-semibold text-[10px] uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
