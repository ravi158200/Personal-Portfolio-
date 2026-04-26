import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Globe } from 'lucide-react';

const services = [
  {
    icon: <Globe size={40} className="text-blue-500" />,
    title: 'Website Development',
    description: 'Custom, responsive websites built with modern technologies ensuring optimal performance and SEO.'
  },
  {
    icon: <Layout size={40} className="text-purple-500" />,
    title: 'Frontend Development',
    description: 'Interactive and beautiful user interfaces using React, Tailwind CSS, and Framer Motion.'
  },
  {
    icon: <Server size={40} className="text-blue-500" />,
    title: 'Backend API',
    description: 'Robust, secure, and scalable RESTful APIs built with Node.js and Express.'
  },
  {
    icon: <Database size={40} className="text-purple-500" />,
    title: 'Full Stack Application',
    description: 'End-to-end web application development using the complete MERN stack.'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-8 rounded-[2.5rem] text-center border border-white/20 dark:border-white/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group relative"
            >
              <div className="mb-8 relative flex justify-center">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                  className="relative z-10 p-4 rounded-2xl bg-white/50 dark:bg-white/5 shadow-inner"
                >
                  {service.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-blue-500 transition-colors">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
