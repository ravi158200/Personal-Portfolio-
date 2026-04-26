import React from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, MousePointerClick } from 'lucide-react';

const techUsageData = [
  { name: 'React', usage: 90 },
  { name: 'Node.js', usage: 75 },
  { name: 'MongoDB', usage: 65 },
  { name: 'Tailwind', usage: 95 },
  { name: 'Express', usage: 70 },
];

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Visitors & Statistics Overview</p>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-6 rounded-2xl flex items-center gap-4">
            <div className="p-4 bg-blue-500/10 rounded-full text-blue-500"><Users size={28} /></div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Visitors</p>
              <h4 className="text-2xl font-bold">3,850</h4>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass p-6 rounded-2xl flex items-center gap-4">
            <div className="p-4 bg-purple-500/10 rounded-full text-purple-500"><Eye size={28} /></div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Page Views</p>
              <h4 className="text-2xl font-bold">5,800</h4>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass p-6 rounded-2xl flex items-center gap-4">
            <div className="p-4 bg-pink-500/10 rounded-full text-pink-500"><MousePointerClick size={28} /></div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Engagement Rate</p>
              <h4 className="text-2xl font-bold">64.5%</h4>
            </div>
          </motion.div>
        </div>

        {/* Charts Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Mock Visitor Chart (Tailwind) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl flex flex-col justify-between"
          >
            <h3 className="text-lg font-bold mb-6">Traffic Overview (Weekly)</h3>
            <div className="flex items-end justify-between h-56 w-full border-b border-gray-200 dark:border-gray-700 pb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                const height = Math.floor(Math.random() * 60) + 30; // random height between 30% and 90%
                return (
                  <div key={day} className="flex flex-col items-center gap-2 w-full px-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="w-full max-w-[2rem] bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md opacity-80 hover:opacity-100 transition-opacity"
                    ></motion.div>
                    <span className="text-xs text-gray-500">{day}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Tech Usage Bar Chart (Tailwind) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl flex flex-col justify-between"
          >
            <h3 className="text-lg font-bold mb-6">Tech Stack Proficiency</h3>
            <div className="flex flex-col gap-4 w-full justify-center h-full pb-4">
              {techUsageData.map((tech, idx) => (
                <div key={tech.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{tech.name}</span>
                    <span className="text-blue-500">{tech.usage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.usage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
