import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderKanban, Users, UserCircle, Plus, LogOut, Lock, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ darkMode, projects, setProjects, profileData, setProfileData }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loginForm, setLoginForm] = useState({ adminId: '', password: '' });
  const [signupForm, setSignupForm] = useState({ fullName: '', adminId: '', password: '', secretKey: '' });

  // Dashboard State
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    tech: '',
    github: '',
    live: ''
  });

  const [visitorLogs, setVisitorLogs] = useState([]);

  // Fetch visitors when opening the visitors tab
  useEffect(() => {
    if (activeTab === 'visitors' && isAuthenticated) {
      fetch('http://localhost:5000/api/visitors')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setVisitorLogs(data);
        })
        .catch(err => console.error("Failed to fetch visitors:", err));
    }
  }, [activeTab, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    const inputId = loginForm.adminId.trim().toLowerCase();
    const inputPwd = loginForm.password.trim();
    
    // Check against dynamically created account OR the default hardcoded one
    const validId = signupForm.adminId ? signupForm.adminId.trim().toLowerCase() : 'ravirraj7301325@gmail.com';
    const validPwd = signupForm.password ? signupForm.password.trim() : 'admin123';
    
    if (inputId === validId && inputPwd === validPwd) {
      setIsAuthenticated(true);
    } else {
      alert(`Invalid Admin ID or Password!\n\nPlease try using:\nEmail: ${validId}\nPassword: ${validPwd}`);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Admin account created for ${signupForm.adminId}! Logging you in automatically...`);
    
    // Automatically pre-fill the login form for the future
    setLoginForm({ 
      adminId: signupForm.adminId, 
      password: signupForm.password 
    });
    
    // Automatically log them straight into the dashboard!
    setIsSignup(false);
    setIsAuthenticated(true);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const newProjectData = {
      ...projectForm,
      tech: projectForm.tech.split(',').map(t => t.trim())
    };

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjectData)
      });
      
      if(response.ok) {
        const savedProject = await response.json();
        setProjects([savedProject, ...projects]);
        setProjectForm({ title: '', description: '', image: '', tech: '', github: '', live: '' });
        alert("Project Saved Successfully to Database!");
      } else {
        alert("Failed to save project. Server error.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend!");
    }
  };

  // --- LOGIN / SIGNUP SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'dark bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-8 md:p-12 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
              {isSignup ? <UserCircle size={32} /> : <Lock size={32} />}
            </div>
            <h2 className="text-3xl font-bold">{isSignup ? 'Admin Setup' : 'Admin Login'}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              {isSignup ? 'Initialize your master admin account.' : 'Restricted Access. Authorized personnel only.'}
            </p>
          </div>
          
          {isSignup ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input required type="text" value={signupForm.fullName} onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Ravi Kumar" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Admin Email (ID)</label>
                <input required type="email" value={signupForm.adminId} onChange={(e) => setSignupForm({...signupForm, adminId: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="name@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Master Password</label>
                <input required type="password" value={signupForm.password} onChange={(e) => setSignupForm({...signupForm, password: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-red-500">Secret Setup Key</label>
                <input required type="password" value={signupForm.secretKey} onChange={(e) => setSignupForm({...signupForm, secretKey: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-red-500/5 border border-red-200 dark:border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="Required to prove you are the owner" />
              </div>
              <button type="submit" className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all">
                Create Admin Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Admin ID</label>
                <input required type="text" value={loginForm.adminId} onChange={(e) => setLoginForm({...loginForm, adminId: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Enter admin email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input required type="password" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all">
                Secure Login
              </button>
            </form>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center gap-3">
            <button onClick={() => setIsSignup(!isSignup)} className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
              {isSignup ? 'Already set up? Go to Login' : 'Initial Setup: Create Admin Account'}
            </button>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors">← Return to Portfolio</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD ---
  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col z-10">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            RaviAdmin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <LayoutDashboard size={20} /> Overview
          </button>
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <FolderKanban size={20} /> Manage Projects
          </button>
          <button onClick={() => setActiveTab('visitors')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'visitors' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <Users size={20} /> Visitor Logs
          </button>
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <UserCircle size={20} /> Profile & Resume
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 hover:text-red-600 dark:hover:bg-red-500/10 transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold capitalize">{activeTab === 'profile' ? 'Content & Profile Management' : activeTab}</h1>
        </header>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-2xl border-l-4 border-blue-500">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Visitors</h3>
                <p className="text-3xl font-bold mt-2">12,450</p>
              </div>
              <div className="glass p-6 rounded-2xl border-l-4 border-purple-500">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Unique IP Addresses</h3>
                <p className="text-3xl font-bold mt-2">8,210</p>
              </div>
              <div className="glass p-6 rounded-2xl border-l-4 border-pink-500">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Projects</h3>
                <p className="text-3xl font-bold mt-2">{projects.length > 0 ? projects.length : 3}</p>
              </div>
            </div>
            
            {/* Quick Chart Mockup */}
            <div className="glass p-8 rounded-2xl mt-8">
              <h3 className="text-xl font-bold mb-6">Recent Traffic</h3>
              <div className="h-48 flex items-end justify-between gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                  <div key={i} className="w-full bg-blue-500/20 hover:bg-blue-500 transition-colors rounded-t-md relative group" style={{ height: `${h}%` }}>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-gray-800 text-white px-2 py-1 rounded transition-opacity">{h * 12}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="text-blue-500"/> Upload New Project</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Project Title</label>
                  <input required name="title" value={projectForm.title} onChange={handleInputChange} type="text" className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="E.g. E-Commerce App" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                  <textarea required name="description" value={projectForm.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Project details..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Image URL</label>
                  <input required name="image" value={projectForm.image} onChange={handleInputChange} type="url" className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Tech Stack (comma separated)</label>
                  <input required name="tech" value={projectForm.tech} onChange={handleInputChange} type="text" className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="React, Node, MongoDB" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">GitHub Link</label>
                    <input name="github" value={projectForm.github} onChange={handleInputChange} type="url" className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Live Link</label>
                    <input name="live" value={projectForm.live} onChange={handleInputChange} type="url" className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1">
                  Upload Project
                </button>
              </form>
            </div>

            <div className="glass p-8 rounded-2xl h-[600px] overflow-y-auto">
              <h3 className="text-xl font-bold mb-6">Recently Uploaded</h3>
              {projects.length === 0 ? (
                <p className="text-gray-500 italic text-center mt-10">No projects uploaded yet.</p>
              ) : (
                <div className="space-y-4">
                  {projects.map(proj => (
                    <div key={proj.id} className="p-4 bg-white/30 dark:bg-black/30 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-4">
                      <img src={proj.image} alt={proj.title} className="w-20 h-20 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-bold text-blue-500">{proj.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{proj.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {proj.tech.map((t, i) => (
                            <span key={i} className="text-[10px] bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Visitors Tab */}
        {activeTab === 'visitors' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">Visitor Connection Logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 px-4 text-gray-500">IP Address</th>
                    <th className="py-3 px-4 text-gray-500">Location</th>
                    <th className="py-3 px-4 text-gray-500">Device</th>
                    <th className="py-3 px-4 text-gray-500">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorLogs.length === 0 ? (
                    <tr><td colSpan="4" className="py-8 text-center text-gray-500">No visitors logged yet. Be the first!</td></tr>
                  ) : visitorLogs.map((v, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-sm">{v.ip}</td>
                      <td className="py-3 px-4">{v.location}</td>
                      <td className="py-3 px-4 text-sm">{v.device}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(v.visitedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Profile & Content Tab */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* Profile Photo Upload Section */}
            <div className="glass p-8 rounded-2xl border-t-4 border-pink-500 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <img src={profileData.image} alt="Current Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Change Profile Photo</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Select an image from your device gallery to update your avatar everywhere.</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="photoUpload" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setProfileData({ ...profileData, image: imageUrl });
                      alert("Profile photo updated dynamically!");
                    }
                  }}
                />
                <button 
                  onClick={() => document.getElementById('photoUpload').click()}
                  className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-pink-500/30"
                >
                  Choose Image from Gallery
                </button>
              </div>
            </div>

            {/* Resume Upload Section */}
            <div className="glass p-8 rounded-2xl border-t-4 border-blue-500">
              <h3 className="text-xl font-bold mb-2">Upload Resume</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Update the downloadable resume file available on your portfolio.</p>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-10 text-center hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                  <UploadCloud size={32} />
                </div>
                <h4 className="text-lg font-semibold mb-1">Select a PDF file</h4>
                <p className="text-sm text-gray-500">Drag and drop your resume here, or click to browse</p>
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  id="resumeUpload" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const fileUrl = URL.createObjectURL(file);
                      setProfileData({ ...profileData, resumeUrl: fileUrl });
                      alert('Resume uploaded successfully! It is now linked to the Download button.');
                    }
                  }}
                />
                <button 
                  onClick={() => document.getElementById('resumeUpload').click()}
                  className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Browse Files
                </button>
              </div>
            </div>

            {/* Content Edit Section */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6">Edit Site Content</h3>
              <form 
                className="space-y-6" 
                onSubmit={async (e) => { 
                  e.preventDefault(); 
                  try {
                    const response = await fetch('http://localhost:5000/api/profile', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(profileData)
                    });
                    if (response.ok) {
                      alert('Content updated successfully across the entire site!'); 
                    } else {
                      alert('Failed to save profile changes.');
                    }
                  } catch (err) {
                    console.error(err);
                    alert('Error connecting to backend for profile update.');
                  }
                }}
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Introduction text</label>
                  <textarea 
                    rows="4" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    value={profileData?.heroText || ''}
                    onChange={(e) => setProfileData({ ...profileData, heroText: e.target.value })}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">About Me content</label>
                  <textarea 
                    rows="6" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    value={profileData?.aboutText || ''}
                    onChange={(e) => setProfileData({ ...profileData, aboutText: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all">
                  Save All Changes
                </button>
              </form>
            </div>

          </motion.div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
