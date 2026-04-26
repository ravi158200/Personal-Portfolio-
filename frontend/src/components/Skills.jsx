import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench, Zap } from 'lucide-react';

const skillsData = {
  Frontend: [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 85 },
    { name: 'Tailwind CSS', level: 90 }
  ],
  Backend: [
    { name: 'Node.js', level: 75 },
    { name: 'Express.js', level: 80 },
    { name: 'REST APIs', level: 85 }
  ],
  Database: [
    { name: 'MongoDB', level: 80 },
    { name: 'MySQL', level: 70 },
    { name: 'Mongoose', level: 75 }
  ],
  Tools: [
    { name: 'Git', level: 85 },
    { name: 'GitHub', level: 85 },
    { name: 'VS Code', level: 95 },
    { name: 'Vercel', level: 80 }
  ]
};

const RadarChart = ({ data }) => {
  const size = 320;
  const center = size / 2;
  const radius = 100;
  const categories = Object.keys(data);
  const angleStep = (Math.PI * 2) / categories.length;

  const points = categories.map((cat, i) => {
    const avg = data[cat].reduce((acc, s) => acc + s.level, 0) / data[cat].length;
    const r = (avg / 100) * radius;
    const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
    const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
    return { x, y };
  });

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative flex justify-center items-center py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl rounded-full"></div>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative overflow-visible">
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Background Concentric Polygons */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, idx) => (
          <motion.polygon
            key={idx}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            points={categories.map((_, i) => {
              const r = scale * radius;
              const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
              const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-800"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Axis Lines */}
        {categories.map((_, i) => {
          const x2 = center + radius * Math.cos(i * angleStep - Math.PI / 2);
          const y2 = center + radius * Math.sin(i * angleStep - Math.PI / 2);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-800"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          points={polygonPath}
          fill="url(#radarGradient)"
          stroke="#3b82f6"
          strokeWidth="2"
          className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />

        {/* Dots at vertices */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 + i * 0.1 }}
            cx={p.x}
            cy={p.y}
            r="4"
            className="fill-blue-500 stroke-white dark:stroke-slate-900 stroke-2"
          />
        ))}

        {/* Labels with Icons */}
        {categories.map((cat, i) => {
          const r = radius + 45;
          const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
          const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
          return (
            <g key={i}>
              <text
                x={x}
                y={y + 15}
                textAnchor="middle"
                className="text-[10px] font-bold uppercase tracking-widest fill-gray-500 dark:fill-gray-400"
              >
                {cat}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const SkillBar = ({ name, level, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6 last:mb-0"
    >
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{name}</span>
        </div>
        <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">{level}%</span>
      </div>
      <div className="relative w-full h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden border border-gray-200/50 dark:border-white/5 shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 + 0.3 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500 rounded-full"
        >
          <motion.div 
            animate={{ 
              x: ['-100%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-0 left-0 w-20 h-full bg-white/30 skew-x-[-20deg] blur-sm"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={14} className="fill-current" />
            Expertise
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Proficiency</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical skills and domain expertise across the full stack development lifecycle.
          </p>
        </motion.div>

        {/* Radar Chart Section */}
        <div className="mb-20 glass rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Layout size={24} />
                </div>
                Skill Spectrum
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                This visualization represents the balance of my skills across different domains. 
                From core frontend aesthetics to robust backend architecture and data management.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(skillsData).map((cat, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-semibold text-sm">{cat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <RadarChart data={skillsData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([category, skills], idx) => {
            const icons = {
              Frontend: <Layout size={20} />,
              Backend: <Server size={20} />,
              Database: <Database size={20} />,
              Tools: <Wrench size={20} />
            };

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass p-8 rounded-[2.5rem] hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 border border-white/20 dark:border-white/5 group"
              >
                <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-100 dark:border-white/5">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                    {icons[category] || <Zap size={20} />}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {category}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {skills.map((skill, skillIdx) => (
                    <SkillBar 
                      key={skill.name} 
                      name={skill.name} 
                      level={skill.level} 
                      index={skillIdx} 
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
