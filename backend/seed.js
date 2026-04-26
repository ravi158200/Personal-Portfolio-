const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const projects = [
  {
    title: 'Coding Teacher App',
    description: 'An interactive platform where students can learn coding from expert mentors with live code reviews and structured courses.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    tech: ['React', 'Node.js', 'Socket.io', 'Firebase'],
    github: 'https://github.com/ravikumar/coding-teacher-app',
    live: 'https://coding-teacher-app.vercel.app'
  },
  {
    title: 'Full Stack Quiz-App',
    description: 'A dynamic quiz application with real-time scoring, multi-category support, and a competitive leaderboard.',
    image: 'https://images.unsplash.com/photo-1606326666830-a1394b2348ff?auto=format&fit=crop&q=80&w=600',
    tech: ['React', 'Express', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/ravikumar/quiz-app',
    live: 'https://quiz-app-master.vercel.app'
  },
  {
    title: 'Full Stack E-commerce',
    description: 'High-performance e-commerce solution with product management, secure payments, and order tracking.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=600',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/ravikumar/ecommerce-platform',
    live: 'https://shop-next-pro.vercel.app'
  },
  {
    title: 'Full Stack Blogging Platform',
    description: 'A feature-rich blogging site with Markdown support, user authentication, and SEO-optimized pages.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600',
    tech: ['MERN Stack', 'Redux', 'JWT'],
    github: 'https://github.com/ravikumar/blog-platform',
    live: 'https://dev-blog-mern.vercel.app'
  },
  {
    title: 'Snake Game Python',
    description: 'A classic arcade game implemented in Python using Pygame, featuring multiple levels and high-score tracking.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
    tech: ['Python', 'Pygame', 'OOP Principles'],
    github: 'https://github.com/ravikumar/snake-game-python',
    live: '#'
  },
  {
    title: 'AI Tools Directory',
    description: 'A comprehensive directory for AI tools with search and filter capabilities.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600',
    tech: ['React', 'Tailwind CSS', 'Vite', 'OpenAI API'],
    github: 'https://github.com/ravikumar/ai-tools-directory',
    live: 'https://ai-tools-hub.vercel.app'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');
    
    // Add new projects
    await Project.insertMany(projects);
    console.log('Database seeded successfully');
    
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
