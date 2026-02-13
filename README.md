# JobSpark
# JobSpark — Job Portal

A modern, full-stack job portal built with **HTML, CSS, JavaScript** and **Node.js / Express**. Users can browse, search, filter, save, and apply for jobs — and employers can post new listings directly from the UI.

![JobSpark Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Node](https://img.shields.io/badge/Node.js-v18%2B-green) ![Express](https://img.shields.io/badge/Express-v5-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

### For Job Seekers
- 🔍 **Search** by job title, company, keyword, or skill tag
- 🎛️ **Filter** by job type, experience level, work mode, salary range, and category
- 🌐 **Quick filter chips** — Remote, Engineering, Design, Product, Marketing, Data, Finance
- 🔖 **Save jobs** to a personal bookmarks list
- 📄 **Detailed job view** — description, requirements, benefits, and salary
- 🚀 **One-click apply** with toast confirmation

### For Employers
- 📋 **Post a job** via a full-featured form (title, company, type, salary, description, requirements, tags)
- ✅ New listings appear instantly in the job feed

### General
- ⭐ Featured & 🔥 Hot job badges
- ✨ "New today" indicators
- 📊 Sort by relevance, most recent, or salary
- 📄 Pagination
- 📱 Responsive design (mobile-friendly)
- 🌙 Sleek dark-mode UI

---

## 🗂️ Project Structure

```
job-portal/
├── public/
│   └── index.html       # Frontend (HTML + CSS + JS, single file)
├── server.js            # Node.js / Express REST API backend
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/job-portal.git
cd job-portal

# 2. Install dependencies
npm install

# 3. Set up the frontend
mkdir public
cp job-portal.html public/index.html

# 4. Start the server
node server.js
```

Then open your browser at **http://localhost:3000** 🎉

---

## 🔌 API Reference

Base URL: `http://localhost:3000/api`

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/jobs` | List all jobs (supports filters & pagination) |
| `GET` | `/api/jobs/:id` | Get a single job by ID |
| `POST` | `/api/jobs` | Create a new job listing |
| `PATCH` | `/api/jobs/:id` | Update an existing job |
| `DELETE` | `/api/jobs/:id` | Delete a job listing |
| `GET` | `/api/stats` | Get portal statistics |

### Query Parameters for `GET /api/jobs`

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `q` | string | Search keyword | `?q=react` |
| `location` | string | Filter by location | `?location=Remote` |
| `type` | string | Job type | `?type=Full-time` |
| `level` | string | Experience level | `?level=Senior` |
| `category` | string | Job category | `?category=Engineering` |
| `mode` | string | Work mode | `?mode=Remote` |
| `salaryMin` | number | Minimum salary (in $k) | `?salaryMin=100` |
| `sort` | string | Sort order | `?sort=salary_high` |
| `page` | number | Page number | `?page=2` |
| `limit` | number | Results per page | `?limit=10` |

### Example Requests

```bash
# Get all remote engineering jobs, sorted by salary
GET /api/jobs?category=Engineering&mode=Remote&sort=salary_high

# Search for React jobs paying at least $120k
GET /api/jobs?q=react&salaryMin=120

# Post a new job
POST /api/jobs
Content-Type: application/json

{
  "title": "Senior React Developer",
  "company": "Acme Corp",
  "category": "Engineering",
  "type": "Full-time",
  "mode": "Remote",
  "location": "Remote",
  "level": "Senior",
  "salaryMin": 140,
  "salaryMax": 180,
  "description": "We are looking for a talented React developer...",
  "requirements": ["5+ years React experience", "TypeScript proficiency"],
  "tags": ["React", "TypeScript", "Node.js"],
  "benefits": ["🏥 Health Insurance", "📈 Equity", "🌴 Unlimited PTO"]
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express 5 |
| Styling | Custom CSS with CSS Variables |
| Data | In-memory store (easily swappable with MongoDB/PostgreSQL) |
| Package Manager | npm |

---

## 🔧 Configuration

The server port defaults to `3000`. Override it with an environment variable:

```bash
PORT=8080 node server.js
```

---

## 🗄️ Connecting a Real Database

The backend uses an in-memory array by default. To connect a real database, replace the `jobs` array in `server.js` with your database queries:

**MongoDB (Mongoose) example:**
```js
const Job = require('./models/Job');

// Replace: let result = [...jobs];
const result = await Job.find(query).sort(sort).skip(skip).limit(limit);
```

**PostgreSQL (pg) example:**
```js
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const result = await pool.query('SELECT * FROM jobs WHERE category = $1', [category]);
```

---

## 📁 Deploying

### Render / Railway / Fly.io
```bash
# Make sure package.json has a start script
"scripts": {
  "start": "node server.js"
}
```

### Environment variables to set
```
PORT=3000
```

### Vercel (frontend only)
The `public/index.html` is a fully standalone file and can be deployed directly to Vercel, Netlify, or GitHub Pages without the Node.js backend.

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it for personal or commercial projects.

---

## 🙌 Acknowledgements

- Design inspired by modern job boards like Linear Jobs, Lever, and Greenhouse
- Icons via Unicode Emoji
- Built with ❤️ using vanilla web technologies

---

> **Note:** This project uses an in-memory data store — all data resets when the server restarts. For production use, connect a persistent database like MongoDB, PostgreSQL, or SQLite.
