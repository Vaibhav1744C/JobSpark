// ================================================
//  JobSpark — Node.js / Express Backend
//  Run: node server.js
//  Then open: http://localhost:3000
// ================================================

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── In-memory data store ────────────────────────
let jobs = [
  {
    id: 1, title: "Senior Frontend Engineer", company: "Stripe",
    category: "Engineering", type: "Full-time", mode: "Remote",
    location: "Remote", level: "Senior", salaryMin: 160, salaryMax: 210,
    logo: "💳", tags: ["React", "TypeScript", "GraphQL", "AWS"],
    featured: true, hot: false, postedDays: 1,
    description: "Join Stripe's financial infrastructure platform team building user-facing products used by millions of developers worldwide.",
    requirements: [
      "5+ years of experience with modern JavaScript/TypeScript",
      "Deep expertise in React and its ecosystem",
      "Experience building performant, accessible web interfaces",
      "Familiarity with GraphQL and REST APIs"
    ],
    benefits: ["💻 Remote-first", "🏥 Top-tier Health", "📈 Equity Package", "🌴 Unlimited PTO", "🎓 Learning Budget"],
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 2, title: "Product Designer — Mobile", company: "Figma",
    category: "Design", type: "Full-time", mode: "Hybrid",
    location: "San Francisco, CA", level: "Mid Level", salaryMin: 130, salaryMax: 170,
    logo: "🎨", tags: ["Figma", "iOS", "Android", "UX Research", "Prototyping"],
    featured: true, hot: true, postedDays: 0,
    description: "Shape the future of Figma's mobile experience by leading design for our iOS and Android apps.",
    requirements: [
      "4+ years of product design experience",
      "Portfolio demonstrating strong mobile design skills",
      "Proficiency in Figma",
      "Experience running user research sessions"
    ],
    benefits: ["🎨 Creative Freedom", "🏥 Full Benefits", "📈 Competitive Equity", "🌍 Hybrid Work"],
    createdAt: new Date().toISOString()
  },
  {
    id: 3, title: "Staff Software Engineer — Backend", company: "Notion",
    category: "Engineering", type: "Full-time", mode: "Remote",
    location: "Remote", level: "Lead / Staff", salaryMin: 220, salaryMax: 280,
    logo: "📝", tags: ["Go", "Kubernetes", "PostgreSQL", "gRPC", "Distributed Systems"],
    featured: false, hot: true, postedDays: 2,
    description: "Drive the technical direction of Notion's backend platform and tackle the hardest scaling challenges.",
    requirements: [
      "8+ years of backend engineering experience",
      "Expert-level Go or similar systems language",
      "Proven experience at large-scale distributed systems",
      "Track record of technical leadership across teams"
    ],
    benefits: ["🏠 Remote First", "🏥 Comprehensive Health", "💰 Top-of-market Salary", "📈 Generous Equity"],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 4, title: "Data Scientist — ML Platform", company: "Airbnb",
    category: "Data", type: "Full-time", mode: "Hybrid",
    location: "San Francisco, CA", level: "Senior", salaryMin: 175, salaryMax: 230,
    logo: "🏠", tags: ["Python", "PyTorch", "Spark", "SQL", "A/B Testing"],
    featured: false, hot: false, postedDays: 3,
    description: "Build the intelligence layer that powers host recommendations, pricing algorithms, and guest matching.",
    requirements: [
      "5+ years of industry data science experience",
      "Proficiency in Python and ML frameworks",
      "Strong statistics and experimental design background",
      "Experience with large-scale data pipelines"
    ],
    benefits: ["✈️ Travel Credits", "🏥 Health & Dental", "📈 RSU Package", "🌍 Hybrid Flex"],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 5, title: "Growth Marketing Manager", company: "Linear",
    category: "Marketing", type: "Full-time", mode: "Remote",
    location: "Remote", level: "Mid Level", salaryMin: 110, salaryMax: 145,
    logo: "⚡", tags: ["SEO", "Content Marketing", "Analytics", "PLG", "Copywriting"],
    featured: false, hot: false, postedDays: 4,
    description: "Own acquisition channels and help us reach more engineering teams worldwide through content and PLG.",
    requirements: [
      "3+ years in B2B SaaS growth marketing",
      "Strong SEO and content marketing background",
      "Experience with PLG (product-led growth) motions",
      "Excellent writing and communication skills"
    ],
    benefits: ["🌐 Fully Remote", "🏥 Health Benefits", "📈 Equity", "💻 Top Equipment"],
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 6, title: "Site Reliability Engineer", company: "Cloudflare",
    category: "Engineering", type: "Full-time", mode: "Remote",
    location: "Remote", level: "Senior", salaryMin: 170, salaryMax: 220,
    logo: "☁️", tags: ["Kubernetes", "Terraform", "Go", "Prometheus", "Linux"],
    featured: false, hot: true, postedDays: 0,
    description: "Keep Cloudflare's global network handling 20%+ of all internet traffic running at 99.99% uptime.",
    requirements: [
      "5+ years of SRE or DevOps experience",
      "Expert-level Kubernetes and container orchestration",
      "Strong proficiency in Go or Python for automation",
      "Experience with large-scale observability systems"
    ],
    benefits: ["🌐 Fully Remote", "🏥 Top Insurance", "📈 RSUs", "💻 $1k Home Office"],
    createdAt: new Date().toISOString()
  }
];

let nextId = jobs.length + 1;

// ── API Routes ──────────────────────────────────

// GET /api/jobs  — list & search/filter jobs
app.get('/api/jobs', (req, res) => {
  const {
    q, location, type, level, category, mode,
    salaryMin, sort, page = 1, limit = 10
  } = req.query;

  let result = [...jobs];

  // Text search
  if (q) {
    const query = q.toLowerCase();
    result = result.filter(j =>
      j.title.toLowerCase().includes(query) ||
      j.company.toLowerCase().includes(query) ||
      j.tags.some(t => t.toLowerCase().includes(query)) ||
      j.category.toLowerCase().includes(query)
    );
  }

  // Filters
  if (location) result = result.filter(j => j.location.toLowerCase().includes(location.toLowerCase()) || (location === 'Remote' && j.mode === 'Remote'));
  if (type)     result = result.filter(j => j.type === type);
  if (level)    result = result.filter(j => j.level === level);
  if (category) result = result.filter(j => j.category === category);
  if (mode)     result = result.filter(j => j.mode === mode);
  if (salaryMin) result = result.filter(j => j.salaryMax >= parseInt(salaryMin));

  // Sort
  if (sort === 'recent')       result.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  else if (sort === 'salary_high') result.sort((a,b) => b.salaryMax - a.salaryMax);
  else if (sort === 'salary_low')  result.sort((a,b) => a.salaryMin - b.salaryMin);
  else result.sort((a,b) => (b.featured?1:0) - (a.featured?1:0) || (b.hot?1:0) - (a.hot?1:0));

  // Pagination
  const total = result.length;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const paginated = result.slice((pageNum-1)*limitNum, pageNum*limitNum);

  res.json({
    jobs: paginated,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum)
  });
});

// GET /api/jobs/:id  — single job
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// POST /api/jobs  — create a new job
app.post('/api/jobs', (req, res) => {
  const { title, company, description } = req.body;
  if (!title || !company || !description) {
    return res.status(400).json({ error: 'title, company, and description are required' });
  }

  const newJob = {
    id: nextId++,
    title:       req.body.title,
    company:     req.body.company,
    category:    req.body.category || 'Engineering',
    type:        req.body.type || 'Full-time',
    mode:        req.body.mode || 'Remote',
    location:    req.body.location || 'Remote',
    level:       req.body.level || 'Mid Level',
    salaryMin:   req.body.salaryMin || 80,
    salaryMax:   req.body.salaryMax || 120,
    logo:        req.body.logo || '💼',
    tags:        req.body.tags || [],
    featured:    req.body.featured || false,
    hot:         false,
    postedDays:  0,
    description: req.body.description,
    requirements: req.body.requirements || [],
    benefits:    req.body.benefits || [],
    createdAt:   new Date().toISOString()
  };

  jobs.unshift(newJob);
  res.status(201).json(newJob);
});

// PATCH /api/jobs/:id  — update a job
app.patch('/api/jobs/:id', (req, res) => {
  const idx = jobs.findIndex(j => j.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Job not found' });
  jobs[idx] = { ...jobs[idx], ...req.body, id: jobs[idx].id };
  res.json(jobs[idx]);
});

// DELETE /api/jobs/:id  — remove a job
app.delete('/api/jobs/:id', (req, res) => {
  const idx = jobs.findIndex(j => j.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Job not found' });
  const removed = jobs.splice(idx, 1)[0];
  res.json({ message: 'Job deleted', job: removed });
});

// GET /api/stats  — portal stats
app.get('/api/stats', (req, res) => {
  res.json({
    totalJobs:    jobs.length,
    remoteJobs:   jobs.filter(j => j.mode === 'Remote').length,
    featuredJobs: jobs.filter(j => j.featured).length,
    categories:   [...new Set(jobs.map(j => j.category))],
    companies:    [...new Set(jobs.map(j => j.company))].length
  });
});

// ── Serve frontend ──────────────────────────────
app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start server ────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🚀 JobSpark server running at http://localhost:${PORT}`);
  console.log(`  📋 API endpoints:`);
  console.log(`     GET    /api/jobs         — list / search jobs`);
  console.log(`     GET    /api/jobs/:id     — get single job`);
  console.log(`     POST   /api/jobs         — create job`);
  console.log(`     PATCH  /api/jobs/:id     — update job`);
  console.log(`     DELETE /api/jobs/:id     — delete job`);
  console.log(`     GET    /api/stats        — portal statistics\n`);
});