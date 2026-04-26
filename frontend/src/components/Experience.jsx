import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Experience</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-blue-500" size={32} />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-gray-700 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 text-slate-100 shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-5 rounded-xl">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-lg text-blue-500">Bachelor of Computer Applications (BCA)</div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">University Name • Graduation Year</div>
                  <div className="text-gray-700 dark:text-gray-300">Focus on web development, databases, and software engineering.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 text-slate-100 shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-5 rounded-xl">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-lg text-blue-500">12th Intermediate</div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">College Name • Year</div>
                  <div className="text-gray-700 dark:text-gray-300">Science/Math background.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 text-slate-100 shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-5 rounded-xl">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-lg text-blue-500">10th High School</div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">School Name • Year</div>
                  <div className="text-gray-700 dark:text-gray-300">Foundational education.</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-blue-500" size={32} />
              <h3 className="text-2xl font-bold">Experience</h3>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-gray-700 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-purple-500 text-slate-100 shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-5 rounded-xl border-l-4 border-l-purple-500">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-lg text-purple-500">Freelance Web Developer</div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Self Employed • 2023 - Present</div>
                  <div className="text-gray-700 dark:text-gray-300">Building custom websites and web applications for various clients using the MERN stack.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-purple-500 text-slate-100 shadow shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-5 rounded-xl border-l-4 border-l-purple-500">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-lg text-purple-500">Personal Projects</div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Continuous Learning</div>
                  <div className="text-gray-700 dark:text-gray-300">Developed complex applications like Flipkart Clone and Facebook Clone to master full stack development.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
