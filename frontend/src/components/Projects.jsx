import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Share2 } from 'lucide-react';

const Projects = ({ projects = [] }) => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass rounded-2xl overflow-hidden group flex flex-col h-full"
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-blue-500 text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                    title="View Source"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-purple-500 text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                    title="Live Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: project.title,
                          text: project.description,
                          url: project.live !== '#' ? project.live : window.location.href,
                        }).catch(console.error);
                      } else {
                        // Fallback: Copy to clipboard
                        navigator.clipboard.writeText(project.live !== '#' ? project.live : window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-green-500 text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                    title="Share Project"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
