# Job Application Tracker - Complete CLI Command Reference
**Student:** Stanley Okafor (101529064)  
**Email:** 101529064@georgebrown.ca  
**Project:** Job Application Tracker (JAT)  
**Course:** COMP 2154 - System Development Project

---

## 📅 CRITICAL DEADLINES

```
✅ COMPLETED:
   - Requirements Gathering Report (15%)  →  Due: Jan 31, 2026

⚠️  UPCOMING:
   - Project Proposal (15%)               →  Due: Feb 14, 2026 (SATURDAY)
   - Progress Report 1 (5%)               →  Due: Mar 14, 2026 (SATURDAY)
   - Progress Report 2 (5%)               →  Due: Mar 21, 2026 (SATURDAY)
   - Progress Report 3 (5%)               →  Due: Mar 28, 2026 (SATURDAY)
   - Progress Report 4 (5%)               →  Due: Apr 4, 2026  (SATURDAY)
   - Final Report (20%)                   →  Due: Apr 11, 2026 (SATURDAY)
   - Final Presentation & Demo (30%)      →  Due: Apr 18, 2026 (SATURDAY)

📌 CLASS STATUS:
   - You: Currently at Week 1-3 (catching up)
   - Class: Currently at Week 5-6
   - Gap: Need to catch up ~4 weeks
```

---

## 🚀 STEP 1: CREATE GITHUB REPOSITORY

```bash
# On GitHub.com
# 1. Go to: https://github.com/new
# 2. Repository name: job-application-tracker
# 3. Description: PERN stack web app for tracking job applications - COMP 2154
# 4. ✅ Public
# 5. ✅ Add a README file
# 6. ✅ Add .gitignore → Select "Node" template
# 7. License: MIT (optional)
# 8. Click "Create repository"
```

---

## 🖥️ STEP 2: CLONE AND SET UP PROJECT LOCALLY

```bash
# Navigate to your projects directory
cd ~/Desktop  # or wherever you keep projects

# Clone your new repository
git clone https://github.com/YOUR_GITHUB_USERNAME/job-application-tracker.git

# Enter the project directory
cd job-application-tracker

# Copy all starter code files from the JAT_Starter_Code folder
# (Download JAT_Starter_Code folder first, then copy files)
cp -r /path/to/JAT_Starter_Code/* .

# Verify files copied
ls -la
# Should see: backend/, frontend/, docs/, README.md, etc.
```

---

## 💾 STEP 3: POSTGRESQL DATABASE SETUP

### Option A: Install PostgreSQL Locally (Recommended for Development)

```bash
# macOS (using Homebrew)
brew install postgresql@14
brew services start postgresql@14

# Ubuntu/Linux
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Windows
# Download from: https://www.postgresql.org/download/windows/
# Run installer, follow wizard

# Create database
createdb job_tracker_dev

# Test connection
psql job_tracker_dev
# Inside psql:
\dt  # list tables (should be empty initially)
\q   # quit
```

### Option B: Use Supabase (Free Cloud Database)

```bash
# 1. Go to: https://supabase.com
# 2. Sign up / Log in
# 3. Click "New Project"
# 4. Fill in:
#    - Name: job-tracker
#    - Database Password: [create strong password - SAVE THIS]
#    - Region: Choose closest to you
# 5. Click "Create new project"
# 6. Wait ~2 minutes for provisioning
# 7. Go to: Settings → Database
# 8. Copy "Connection string" (URI format)
#    Example: postgresql://postgres:[password]@db.abc.supabase.co:5432/postgres
# 9. SAVE THIS CONNECTION STRING - you'll need it for .env
```

---

## 📦 STEP 4: BACKEND SETUP

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Verify installation
npm list --depth=0
# Should see: express, pg, bcrypt, jsonwebtoken, cors, dotenv, nodemon, jest, supertest

# Create .env file from template
cp .env.example .env

# Edit .env file with your actual values
nano .env  # or use any text editor (vim, code, etc.)

# Your .env should look like this:
```

```bash
# .env file contents
PORT=5000
NODE_ENV=development

# LOCAL POSTGRESQL:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/job_tracker_dev

# OR SUPABASE:
# DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.abc.supabase.co:5432/postgres

# Generate a secure JWT secret:
# Option 1: Use openssl
# openssl rand -base64 32
# Option 2: Use Node.js
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

JWT_SECRET=your-generated-secret-here-CHANGE-THIS
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:5173
```

---

## 🗄️ STEP 5: RUN DATABASE MIGRATIONS

```bash
# Still in backend/ directory
npm run migrate

# Expected output:
# 🚀 Running database migrations...
# ✅ Migration 001: users table created
# ✅ Migration 002: applications table created
# ✅ All migrations completed successfully

# Verify tables were created
psql job_tracker_dev  # or connect to Supabase via psql
\dt
# Should see: users, applications

# Check table structure
\d users
\d applications

# Exit psql
\q
```

---

## ▶️ STEP 6: START THE BACKEND SERVER

```bash
# In backend/ directory
npm run dev

# Expected output:
# [nodemon] starting `node src/server.js`
# ✅ Connected to PostgreSQL database
# 🚀 Server running on http://localhost:5000
# 📊 Environment: development

# Keep this terminal open - server is running

# Test health endpoint (open new terminal)
curl http://localhost:5000/health

# Expected response:
# {"status":"OK","message":"Job Application Tracker API is running"}
```

---

## 🧪 STEP 7: TEST AUTH ENDPOINTS

### Register a New User

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Stanley Okafor",
    "email": "101529064@georgebrown.ca",
    "password": "password123"
  }'

# Expected response (201 Created):
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Stanley Okafor",
    "email": "101529064@georgebrown.ca",
    "created_at": "2026-02-18T10:30:00.000Z"
  }
}
```

### Login

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "101529064@georgebrown.ca",
    "password": "password123"
  }'

# Expected response (200 OK):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiMTAxNTI5MDY0QGdlb3JnZWJyb3duLmNhIiwiaWF0IjoxNjE2MTc5MjAwLCJleHAiOjE2MTYyNjU2MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "user": {
    "id": 1,
    "name": "Stanley Okafor",
    "email": "101529064@georgebrown.ca"
  }
}

# SAVE THE TOKEN - you'll need it for next requests
# Set it as an environment variable for convenience:
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📝 STEP 8: TEST APPLICATIONS ENDPOINTS

### Create Application

```bash
# Create application (replace $TOKEN with your actual token)
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "company_name": "Google",
    "job_title": "Software Engineer",
    "date_applied": "2026-02-15",
    "status": "Applied",
    "job_url": "https://careers.google.com/jobs/12345",
    "notes": "Apply before March 1st deadline"
  }'

# Expected response (201 Created):
{
  "message": "Application created successfully",
  "application": {
    "id": 1,
    "user_id": 1,
    "company_name": "Google",
    "job_title": "Software Engineer",
    "date_applied": "2026-02-15",
    "status": "Applied",
    "job_url": "https://careers.google.com/jobs/12345",
    "notes": "Apply before March 1st deadline",
    "created_at": "2026-02-18T10:45:00.000Z",
    "updated_at": "2026-02-18T10:45:00.000Z"
  }
}
```

### Get All Applications

```bash
# Get all applications
curl http://localhost:5000/api/applications \
  -H "Authorization: Bearer $TOKEN"

# Expected response (200 OK):
{
  "applications": [
    {
      "id": 1,
      "user_id": 1,
      "company_name": "Google",
      "job_title": "Software Engineer",
      "date_applied": "2026-02-15",
      "status": "Applied",
      "job_url": "https://careers.google.com/jobs/12345",
      "notes": "Apply before March 1st deadline",
      "created_at": "2026-02-18T10:45:00.000Z",
      "updated_at": "2026-02-18T10:45:00.000Z"
    }
  ],
  "count": 1
}
```

### Filter Applications

```bash
# Filter by status
curl "http://localhost:5000/api/applications?status=Applied" \
  -H "Authorization: Bearer $TOKEN"

# Search by company name
curl "http://localhost:5000/api/applications?search=Google" \
  -H "Authorization: Bearer $TOKEN"

# Sort by date (newest first)
curl "http://localhost:5000/api/applications?sortBy=date_applied&order=DESC" \
  -H "Authorization: Bearer $TOKEN"

# Combine filters
curl "http://localhost:5000/api/applications?status=Applied&search=Engineer&sortBy=company_name&order=ASC" \
  -H "Authorization: Bearer $TOKEN"
```

### Update Application

```bash
# Update application (change status to Interview Scheduled)
curl -X PUT http://localhost:5000/api/applications/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "company_name": "Google",
    "job_title": "Software Engineer",
    "date_applied": "2026-02-15",
    "status": "Interview Scheduled",
    "job_url": "https://careers.google.com/jobs/12345",
    "notes": "Phone screen on Feb 22nd at 10 AM"
  }'

# Expected response (200 OK):
{
  "message": "Application updated successfully",
  "application": {
    "id": 1,
    "user_id": 1,
    "company_name": "Google",
    "job_title": "Software Engineer",
    "date_applied": "2026-02-15",
    "status": "Interview Scheduled",
    "job_url": "https://careers.google.com/jobs/12345",
    "notes": "Phone screen on Feb 22nd at 10 AM",
    "created_at": "2026-02-18T10:45:00.000Z",
    "updated_at": "2026-02-18T11:00:00.000Z"
  }
}
```

### Delete Application

```bash
# Delete application
curl -X DELETE http://localhost:5000/api/applications/1 \
  -H "Authorization: Bearer $TOKEN"

# Expected response (200 OK):
{
  "message": "Application deleted successfully"
}
```

### Get Summary

```bash
# Get application summary (counts by status)
curl http://localhost:5000/api/applications/summary \
  -H "Authorization: Bearer $TOKEN"

# Expected response (200 OK):
{
  "total": 5,
  "byStatus": {
    "Applied": 3,
    "Interview Scheduled": 1,
    "Offer Received": 0,
    "Rejected": 1,
    "Withdrawn": 0
  }
}
```

---

## 🗂️ STEP 9: SET UP GITHUB PROJECTS KANBAN BOARD

```bash
# On GitHub.com in your repository
# 1. Click "Projects" tab
# 2. Click "New project"
# 3. Select "Board" template
# 4. Project name: "JAT Development"
# 5. Click "Create"

# Add columns (drag existing or add new):
# - Backlog
# - To Do
# - In Progress
# - Review
# - Done

# Add initial tasks (click "+ Add item" in To Do):
```

**Week 4 Tasks:**
- Create architecture diagram (React → Express → PostgreSQL)
- Write database schema documentation
- Create API endpoint documentation
- Set up branch protection rules
- Write Progress Report 1
- Submit Progress Report 1 (Due: March 14)

**Week 5 Tasks:**
- Write test strategy document
- Create test plan
- Write 8+ initial test cases
- Set up Jest for unit testing
- Write first integration tests
- Write Progress Report 2 (Due: March 21)

**Week 6 Tasks:**
- Set up React with Vite
- Create Login page
- Create Register page
- Set up React Router
- Create Dashboard layout
- Write Progress Report 3 (Due: March 28)

---

## 🔀 STEP 10: GIT WORKFLOW

### Initial Commit

```bash
# In your project root directory
git status

# Add all files
git add .

# Commit with descriptive message
git commit -m "Initial project setup - backend complete with auth and CRUD endpoints"

# Push to GitHub
git push origin main
```

### Feature Branch Workflow

```bash
# Create feature branch
git checkout -b feature/auth-endpoints

# Make changes, then check status
git status

# Add changed files
git add backend/src/controllers/authController.js
git add backend/src/services/authService.js

# Commit with clear message
git commit -m "Add user registration and login endpoints with JWT"

# Push feature branch
git push origin feature/auth-endpoints

# On GitHub: Create Pull Request
# 1. Go to repository on GitHub
# 2. Click "Pull requests" → "New pull request"
# 3. Select: base: main ← compare: feature/auth-endpoints
# 4. Click "Create pull request"
# 5. Review changes
# 6. Click "Merge pull request"
# 7. Click "Delete branch"

# Back in terminal, switch to main and pull
git checkout main
git pull origin main

# Delete local feature branch (optional)
git branch -d feature/auth-endpoints
```

### Useful Git Commands

```bash
# Check current branch
git branch

# View commit history
git log --oneline

# View changes not yet staged
git diff

# View changes staged for commit
git diff --staged

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard all local changes (CAREFUL!)
git reset --hard HEAD

# Pull latest changes
git pull origin main
```

---

## 🗄️ DATABASE MANAGEMENT COMMANDS

### PostgreSQL Local Commands

```bash
# Connect to database
psql job_tracker_dev

# Inside psql:

# List all tables
\dt

# Describe table structure
\d users
\d applications

# View all users
SELECT * FROM users;

# View all applications
SELECT * FROM applications;

# View applications with user info (JOIN)
SELECT 
  a.id, 
  a.company_name, 
  a.job_title, 
  a.status,
  u.name as user_name,
  u.email
FROM applications a
JOIN users u ON a.user_id = u.id;

# Count applications by status
SELECT status, COUNT(*) 
FROM applications 
GROUP BY status;

# Delete a specific user (cascades to applications)
DELETE FROM users WHERE email = 'test@test.com';

# Clear all data (CAREFUL!)
TRUNCATE TABLE applications CASCADE;
TRUNCATE TABLE users CASCADE;

# Exit psql
\q
```

### Reset Database

```bash
# Drop and recreate database
dropdb job_tracker_dev
createdb job_tracker_dev

# Re-run migrations
cd backend
npm run migrate
```

---

## 🎨 FRONTEND SETUP (Week 6+)

```bash
# From project root
npm create vite@latest frontend -- --template react

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Install additional packages
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

# Edit tailwind.config.js
```

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```bash
# Edit src/index.css (add at top)
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```bash
# Start development server
npm run dev

# Expected output:
# VITE v5.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
```

---

## 🧪 TESTING COMMANDS

### Run All Tests

```bash
# In backend directory
npm test

# Run with coverage report
npm test -- --coverage

# Run specific test file
npm test -- authService.test.js

# Run tests in watch mode
npm test -- --watch
```

### Example Test File

```bash
# Create test file
touch backend/src/__tests__/auth.test.js
```

```javascript
// backend/src/__tests__/auth.test.js
const request = require('supertest');
const app = require('../server');

describe('POST /api/auth/register', () => {
  test('creates new user with valid data', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@test.com`,
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBeDefined();
  });

  test('rejects duplicate email', async () => {
    const email = `duplicate${Date.now()}@test.com`;
    
    // First registration
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'User 1', email, password: 'pass123' });

    // Second registration with same email
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'User 2', email, password: 'pass456' });

    expect(res.status).toBe(409);
    expect(res.body.error).toContain('already registered');
  });
});
```

---

## 🚀 DEPLOYMENT COMMANDS

### Deploy to Render.com (Backend)

```bash
# 1. Push code to GitHub
git push origin main

# 2. On Render.com:
# - Sign up / Log in
# - Click "New +" → "Web Service"
# - Connect GitHub repository
# - Fill in:
#   Name: job-tracker-api
#   Environment: Node
#   Build Command: cd backend && npm install
#   Start Command: cd backend && npm start
#   Click "Advanced" → Add Environment Variables:
#     DATABASE_URL=postgresql://...  (from Supabase)
#     JWT_SECRET=your-secret
#     JWT_EXPIRES_IN=24h
#     NODE_ENV=production
# - Click "Create Web Service"

# 3. Wait for deployment
# 4. Test: https://job-tracker-api.onrender.com/health
```

### Deploy to Vercel (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# In frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# Set up and deploy? Yes
# Which scope? [Your account]
# Link to existing project? No
# What's your project's name? job-tracker-frontend
# In which directory is your code located? ./
# Want to modify settings? No

# Deploy to production
vercel --prod

# Set environment variable
vercel env add VITE_API_URL production
# Enter: https://job-tracker-api.onrender.com
```

---

## 🔧 TROUBLESHOOTING

### Backend Won't Start

```bash
# Check if port 5000 is in use
lsof -ti:5000

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Check PostgreSQL is running
# macOS:
brew services list | grep postgresql

# Linux:
sudo systemctl status postgresql

# Windows:
# Check Services app for "postgresql" service
```

### Database Connection Errors

```bash
# Test database connection
psql -d $DATABASE_URL

# Check .env file exists
ls -la backend/.env

# Verify DATABASE_URL format
echo $DATABASE_URL
# Should be: postgresql://user:pass@host:port/database
```

### Token Errors

```bash
# Verify JWT_SECRET is set
cd backend
node -e "require('dotenv').config(); console.log('JWT_SECRET:', process.env.JWT_SECRET);"

# Test token generation
node -e "
const jwt = require('jsonwebtoken');
require('dotenv').config();
const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);
console.log('Token:', token);
"
```

### npm Install Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📊 USEFUL MONITORING COMMANDS

### Check Server Logs

```bash
# Backend logs (if running with npm run dev)
# Just check the terminal where server is running

# Check for errors
grep -i error backend/logs/*  # if you have logging set up
```

### Database Stats

```bash
# Connect to database
psql job_tracker_dev

# Count users
SELECT COUNT(*) FROM users;

# Count applications
SELECT COUNT(*) FROM applications;

# Applications by status
SELECT status, COUNT(*) FROM applications GROUP BY status;

# Recent applications
SELECT * FROM applications ORDER BY created_at DESC LIMIT 10;
```

---

## 📋 DAILY DEVELOPMENT WORKFLOW

```bash
# Morning startup
cd ~/Desktop/job-application-tracker

# Pull latest changes
git pull origin main

# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2) - when ready
cd frontend
npm run dev

# Make changes, test, commit
git status
git add .
git commit -m "Descriptive message"
git push origin main

# End of day
# Stop servers: Ctrl+C in both terminals
```

---

## 🎯 WEEK-BY-WEEK COMMAND CHECKLIST

### Week 4 (By March 14)
```bash
# ✅ Backend running
# ✅ Database migrations complete
# ✅ All auth endpoints tested
# ✅ All application endpoints tested
# ✅ GitHub repo set up
# ✅ Kanban board populated
# Create architecture diagram (use draw.io or similar)
# Write Progress Report 1
# Submit Progress Report 1
```

### Week 5 (By March 21)
```bash
# Write test cases
touch backend/src/__tests__/auth.test.js
touch backend/src/__tests__/applications.test.js

# Run tests
npm test

# Write Progress Report 2
# Submit Progress Report 2
```

### Week 6 (By March 28)
```bash
# Set up React
npm create vite@latest frontend -- --template react

# Build pages
mkdir -p frontend/src/pages
touch frontend/src/pages/Login.jsx
touch frontend/src/pages/Register.jsx
touch frontend/src/pages/Dashboard.jsx

# Write Progress Report 3
# Submit Progress Report 3
```

---

## 🔑 QUICK REFERENCE - ESSENTIAL COMMANDS

```bash
# Backend
cd backend && npm run dev         # Start server
npm run migrate                   # Run migrations
npm test                          # Run tests

# Frontend (when ready)
cd frontend && npm run dev        # Start dev server
npm run build                     # Build for production

# Database
psql job_tracker_dev              # Connect to DB
\dt                               # List tables
SELECT * FROM users;              # Query users

# Git
git status                        # Check status
git add .                         # Stage all changes
git commit -m "message"           # Commit
git push origin main              # Push to GitHub

# Testing API
curl http://localhost:5000/health                    # Health check
curl -X POST http://localhost:5000/api/auth/login    # Login (add -d data)
```

---

## 📞 GETTING HELP

```bash
# Check official docs
open https://expressjs.com/
open https://node-postgres.com/
open https://react.dev/

# Check logs for errors
cd backend
npm run dev  # Check terminal output for errors

# Enable debug mode
DEBUG=* npm run dev  # Shows all debug logs
```

---

**END OF CLI REFERENCE**

Remember:
- Keep terminals organized (one for backend, one for frontend)
- Test after every change
- Commit early and often
- Ask for help when stuck (bring specific error messages)
- Check QUICK_REFERENCE.md for daily commands
- Check COMPLETE_EXPLANATION.md for detailed explanations

Good luck! 🚀
