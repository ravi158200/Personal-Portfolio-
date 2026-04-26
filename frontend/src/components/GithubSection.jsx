import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Activity, ExternalLink } from 'lucide-react';

const GithubSection = () => {
  // Replace with your actual GitHub username
  const username = "ravikumar"; 
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real repositories directly from GitHub API (increased to show more repos!)
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data.map(repo => ({
            name: repo.name,
            desc: repo.description || "No description provided for this repository.",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url
          })));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch GitHub repos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="github" className="py-20 bg-gray-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github size={32} className="text-gray-900 dark:text-white" />
            <h2 className="text-3xl md:text-4xl font-bold">GitHub Activity</h2>
          </div>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Real Contribution Graph */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-8 rounded-2xl mb-12 overflow-x-auto flex flex-col items-center shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" /> Real Contribution Graph
          </h3>
          <div className="w-full overflow-x-auto flex justify-center pb-4">
            {/* Fetches the real GitHub contribution graph SVG directly */}
            <img 
              src={`https://ghchart.rshah.org/3b82f6/${username}`} 
              alt={`${username}'s Github Contributions`} 
              className="min-w-[600px] w-full max-w-4xl opacity-90 hover:opacity-100 transition-opacity drop-shadow-md"
            />
          </div>
        </motion.div>

        {/* Real Top Repositories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center py-10 text-gray-500 dark:text-gray-400 animate-pulse">
              Fetching real GitHub repositories...
            </div>
          ) : repos.length > 0 ? (
            repos.map((repo, idx) => (
              <motion.a 
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass p-6 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 block group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-blue-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{repo.name}</h4>
                  <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 h-10 line-clamp-2">{repo.desc}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500"/> {repo.stars}</span>
                  <span className="flex items-center gap-1"><GitFork size={16} /> {repo.forks}</span>
                </div>
              </motion.a>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-500 dark:text-gray-400">
              No public repositories found for user: {username}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GithubSection;
