import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Link as LinkIcon, Github, Linkedin, Download, ArrowLeft, Briefcase, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = ({ darkMode, profileData }) => {
  // Fallback data in case profileData is not passed
  const data = profileData || {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    aboutText: "I am a passionate developer specializing in building scalable web applications. With a strong foundation in modern JavaScript frameworks, I turn complex problems into elegant, user-friendly solutions. Always learning, always building."
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'} py-10 px-4 sm:px-6 lg:px-8 font-sans`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Back Navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors font-medium">
            <ArrowLeft size={20} /> Back to Portfolio
          </Link>
        </motion.div>

        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="glass rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800"
        >
          {/* Cover Photo */}
          <div className="h-48 md:h-64 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="px-8 pb-10 relative">
            {/* Avatar */}
            <div className="relative -mt-20 sm:-mt-24 mb-6 flex justify-between items-end">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800 overflow-hidden shadow-lg z-10">
                <img 
                  src={data.image} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-3 mb-2">
                <button className="px-4 py-2 sm:px-6 sm:py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors flex items-center gap-2 text-sm sm:text-base">
                  <Mail size={18} /> <span className="hidden sm:inline">Message</span>
                </button>
                <button className="px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm sm:text-base">
                  <Download size={18} /> Resume
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Ravi Kumar <span className="text-blue-500">✔</span></h1>
                <h2 className="text-xl text-gray-600 dark:text-gray-400 font-medium">Full Stack Software Engineer</h2>
              </div>

              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                I am a passionate developer specializing in building scalable web applications. 
                With a strong foundation in modern JavaScript frameworks, I turn complex problems into elegant, user-friendly solutions. Always learning, always building.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2"><MapPin size={18} /> Remote / India</div>
                <div className="flex items-center gap-2"><Briefcase size={18} /> Available for hire</div>
                <div className="flex items-center gap-2"><Calendar size={18} /> Joined 2021</div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Github size={18} /> Github
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 transition-colors">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <LinkIcon size={18} /> Portfolio
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Stats & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['React.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'Framer Motion', 'Git', 'REST APIs', 'UI/UX Design'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800/50">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Projects</span>
                <span className="font-bold text-lg">15+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Years Experience</span>
                <span className="font-bold text-lg">3+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Lines of Code</span>
                <span className="font-bold text-lg text-blue-500">100k+</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
