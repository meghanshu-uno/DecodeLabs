const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Data Storage (Resets when server restarts)
let TRACKS_DATA = [
  {
    id: "track-frontend-arch",
    trackId: "track-frontend-arch",
    title: "Modern Frontend Systems & UI Architecture",
    category: "frontend",
    level: "advanced",
    levelLabel: "Advanced",
    duration: "12 Weeks",
    description: "Master CSS Grid subgrid, fluid typography, and Vanilla JS state management. Build responsive, framework-agnostic interfaces.",
    modulesCount: 24,
    enrollment: "8.4k",
    tags: ["CSS Architecture", "Web Components", "ES6+"]
  },
  {
    id: "track-backend-node",
    trackId: "track-backend-node",
    title: "Distributed Backend & Node.js Microservices",
    category: "backend",
    level: "advanced",
    levelLabel: "Advanced",
    duration: "16 Weeks",
    description: "Design scalable REST APIs, implement message queues with RabbitMQ, and build secure authentication flows with JWT.",
    modulesCount: 32,
    enrollment: "6.2k",
    tags: ["Node.js", "Express", "Microservices"]
  },
  {
    id: "track-database-design",
    trackId: "track-database-design",
    title: "Relational Database Design & SQL Optimization",
    category: "database",
    level: "intermediate",
    levelLabel: "Intermediate",
    duration: "8 Weeks",
    description: "Learn normalization, complex joins, indexing strategies, and query performance tuning using PostgreSQL.",
    modulesCount: 16,
    enrollment: "12.1k",
    tags: ["PostgreSQL", "Data Modeling", "SQL"]
  },
  {
    id: "track-devops-ci",
    trackId: "track-devops-ci",
    title: "Cloud-Native DevOps & CI/CD Pipelines",
    category: "devops",
    level: "beginner",
    levelLabel: "Beginner",
    duration: "10 Weeks",
    description: "Containerize applications with Docker, orchestrate with Kubernetes, and automate deployments using GitHub Actions.",
    modulesCount: 20,
    enrollment: "4.8k",
    tags: ["Docker", "Kubernetes", "CI/CD"]
  },
  {
    id: "track-system-design",
    trackId: "track-system-design",
    title: "Enterprise System Design & Architecture",
    category: "architecture",
    level: "advanced",
    levelLabel: "Advanced",
    duration: "14 Weeks",
    description: "Tackle large-scale engineering problems. Learn load balancing, caching strategies, and designing for high availability.",
    modulesCount: 28,
    enrollment: "3.5k",
    tags: ["System Design", "Scalability", "Architecture"]
  },
  {
    id: "track-fullstack-capstone",
    trackId: "track-fullstack-capstone",
    title: "Full Stack Engineering Capstone Project",
    category: "fullstack",
    level: "intermediate",
    levelLabel: "Intermediate",
    duration: "20 Weeks",
    description: "Combine frontend, backend, and database skills to build a production-ready, highly interactive web application from scratch.",
    modulesCount: 40,
    enrollment: "1.2k",
    tags: ["Full Stack", "Production", "Capstone"]
  }
];

let consultations = [];
let bookmarks = []; // array of trackIds

// --- API ROUTES ---

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is running normally' });
});

// GET Tracks
app.get('/api/v1/tracks', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: TRACKS_DATA.length,
    data: { tracks: TRACKS_DATA }
  });
});

// POST Consultation Form
app.post('/api/v1/consultations', (req, res) => {
  const { name, email, message, track } = req.body;
  
  // Create a new consultation object
  const newConsultation = {
    id: Date.now().toString(),
    name,
    email,
    message,
    track,
    date: new Date()
  };
  
  consultations.push(newConsultation);
  console.log('New Consultation Received:', newConsultation);

  res.status(201).json({
    status: 'success',
    data: { consultation: newConsultation }
  });
});

// GET Bookmarks
app.get('/api/v1/bookmarks', (req, res) => {
  // Map bookmarks array of trackIds to the object structure expected by the frontend
  const formattedBookmarks = bookmarks.map(trackId => ({ track: { trackId } }));
  
  res.status(200).json({
    status: 'success',
    data: { bookmarks: formattedBookmarks }
  });
});

// POST Toggle Bookmark
app.post('/api/v1/bookmarks', (req, res) => {
  const { trackId } = req.body;
  
  if (!trackId) {
    return res.status(400).json({ status: 'fail', message: 'No trackId provided' });
  }

  let bookmarked = false;
  const index = bookmarks.indexOf(trackId);
  
  if (index === -1) {
    // Add bookmark
    bookmarks.push(trackId);
    bookmarked = true;
  } else {
    // Remove bookmark
    bookmarks.splice(index, 1);
    bookmarked = false;
  }

  res.status(200).json({
    status: 'success',
    data: { bookmarked }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Simple backend running at http://localhost:${PORT}`);
});
