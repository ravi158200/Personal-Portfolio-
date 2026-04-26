import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16"
        >
          <div className="space-y-6">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
              Personal Portfolio
            </h3>
            <p className="text-gray-400 mb-6">
              A passionate full stack developer building modern web applications. 
              Always eager to learn new technologies and create awesome solutions.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Github size={20} />, href: 'https://github.com/ravikumar' },
                { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/ravikumar' },
                { icon: <Twitter size={20} />, href: 'https://twitter.com/ravikumar' }
              ].map((social, idx) => (
                <motion.a 
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-400 shadow-xl"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-gray-200">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Experience'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-gray-200">Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">Website Development</li>
              <li className="text-gray-400">Frontend Development</li>
              <li className="text-gray-400">Backend API</li>
              <li className="text-gray-400">Full Stack Application</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm font-medium"
        >
          <p>&copy; {new Date().getFullYear()} Ravi Kumar. All rights reserved.</p>
          <p className="flex items-center gap-2 mt-4 md:mt-0 group">
            Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={18} className="text-red-500 fill-current drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
            </motion.span>
            by 
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-700">
              <img src="/assests/Ravi.jpg" alt="Ravi" className="w-full h-full object-cover" />
            </div>
            <span className="text-gray-300 group-hover:text-blue-400 transition-colors cursor-pointer">Ravi Kumar</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
