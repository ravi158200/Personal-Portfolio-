import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GithubSection from './components/GithubSection';
import Experience from './components/Experience';
import Services from './components/Services';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

// Initial Projects Data
const initialProjects = [
  {
    id: 1,
    title: 'Coding Teacher App',
    description: 'An interactive platform where students can learn coding from expert mentors with live code reviews and structured courses.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    tech: ['React', 'Node.js', 'Socket.io', 'Firebase'],
    github: 'https://github.com/ravikumar/coding-teacher-app',
    live: 'https://coding-teacher-app.vercel.app'
  },
  {
    id: 2,
    title: 'Full Stack Quiz-App',
    description: 'A dynamic quiz application with real-time scoring, multi-category support, and a competitive leaderboard.',
    image: 'https://images.unsplash.com/photo-1606326666830-a1394b2348ff?auto=format&fit=crop&q=80&w=1200',
    tech: ['React', 'Express', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/ravikumar/quiz-app',
    live: 'https://quiz-app-master.vercel.app'
  },
  {
    id: 3,
    title: 'Full Stack E-commerce',
    description: 'High-performance e-commerce solution with product management, secure payments, and order tracking.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/ravikumar/ecommerce-platform',
    live: 'https://shop-next-pro.vercel.app'
  },
  {
    id: 4,
    title: 'Full Stack Blogging Platform',
    description: 'A feature-rich blogging site with Markdown support, user authentication, and SEO-optimized pages.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200',
    tech: ['MERN Stack', 'Redux', 'JWT'],
    github: 'https://github.com/ravikumar/blog-platform',
    live: 'https://dev-blog-mern.vercel.app'
  },
  {
    id: 5,
    title: 'Snake Game Python',
    description: 'A classic arcade game implemented in Python using Pygame, featuring multiple levels and high-score tracking.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    tech: ['Python', 'Pygame', 'OOP Principles'],
    github: 'https://github.com/ravikumar/snake-game-python',
    live: '#'
  },
  {
    id: 6,
    title: 'AI Tools Directory',
    description: 'A comprehensive directory for AI tools with search and filter capabilities.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    tech: ['React', 'Tailwind CSS', 'Vite', 'OpenAI API'],
    github: 'https://github.com/ravikumar/ai-tools-directory',
    live: 'https://ai-tools-hub.vercel.app'
  }
];

// Main Portfolio Layout
const PortfolioLayout = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen transition-colors duration-300 font-sans overflow-x-hidden flex flex-col">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// ScrollToTop component to ensure navigating between routes resets scroll
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [projects, setProjects] = useState(initialProjects);
  
  // Global Profile Data State
  const [profileData, setProfileData] = useState({
    image: "/assests/Ravi.jpg",
    heroText: "This is a personal portfolio website designed and developed to showcase my skills, projects, and professional journey as a web developer. The website highlights my work, technical expertise, and provides a platform for visitors to explore my projects and contact me.\n\nThe portfolio includes multiple sections such as Home, About, Skills, Projects, Services, and Contact, allowing users to easily navigate and learn more about my development experience.",
    aboutText: "My portfolio is built with the following core features:\n• Admin dashboard to manage projects\n• Blog section for sharing knowledge\n• Project filtering system\n• Analytics dashboard for visitor insights\n\nMy goals and objectives:\n• Build a strong personal brand as a developer\n• Showcase real-world projects and technical skills\n• Provide an online resume for recruiters and clients\n• Improve web development and UI design skills\n• Create opportunities for freelance work and collaborations",
    resumeUrl: null
  });

  useEffect(() => {
    // Log the visit to the backend database
    fetch('http://localhost:5000/api/visitors', { method: 'POST' })
      .catch(err => console.error("Failed to log visit:", err));

    // Fetch live projects from the database
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(err => console.error("Failed to load projects from DB:", err));
      
    // Fetch live profile data from the database
    fetch('http://localhost:5000/api/profile')
      .then(res => res.json())
      .then(data => {
        if(data && data.heroText) {
          setProfileData(data);
        }
      })
      .catch(err => console.error("Failed to load profile data:", err));
      
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Public Portfolio */}
        <Route path="/" element={<PortfolioLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
          <Route index element={<Hero profileData={profileData} />} />
          <Route path="about" element={<About profileData={profileData} />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={
            <>
              <Projects projects={projects} />
              <GithubSection />
            </>
          } />
          <Route path="experience" element={<Experience />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        
        {/* Standalone Profile Page */}
        <Route path="/profile" element={<Profile darkMode={darkMode} profileData={profileData} />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard darkMode={darkMode} projects={projects} setProjects={setProjects} profileData={profileData} setProfileData={setProfileData} />} />
      </Routes>
    </Router>
  );
}

export default App;
