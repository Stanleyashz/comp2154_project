# Final Presentation - Job Application Tracker
**Student:** Stanley Okafor (101529064)  
**Course:** COMP 2154 - System Development Project  
**Presentation Date:** April 18, 2026  
**Live Demo URL:** https://job-application-tracker-rz65.onrender.com

---

## Slide 1 - Title

**Job Application Tracker (JAT)**  
COMP 2154 - System Development Project  
Stanley Okafor - 101529064

**Say:**
- This project is a full-stack web application for tracking job applications in one place.
- It was developed as the final project for COMP 2154.

---

## Slide 2 - Agenda

**Presentation outline:**
- Problem and objectives
- Requirements and scope
- System design and implementation
- Demo and results
- Testing and requirements coverage
- Deployment and maintenance
- Reflection, conclusion, and future work

**Say:**
- This presentation follows the project from the original problem through the final deployed result.

---

## Slide 3 - Problem, Motivation, and Objectives

**Problem:**
- Job seekers often manage applications through scattered notes, spreadsheets, bookmarks, and emails.
- This creates poor visibility, missed follow-ups, and inconsistent tracking.

**Motivation:**
- A single dashboard is simpler, faster, and easier to maintain than disconnected tools.

**Objectives:**
- Provide secure user access
- Centralize application records
- Track progress by status
- Support search, filtering, and updates

**Say:**
- The goal was to create a practical system around a real student/job-seeker workflow.

---

## Slide 4 - Requirements and Scope

**Key functional requirements:**
- User registration and login
- Create, view, update, and delete applications
- Track application status
- Search and filter applications
- View summary counts by status

**Key non-functional requirements:**
- Security through JWT and hashed passwords
- Usability through a simple dashboard
- Reliability through testing and validation

**Out of scope / deferred:**
- Forgot password flow
- PostgreSQL migration
- Email reminders
- Admin user management

**Say:**
- I focused on the core must-have workflow and deferred extra features that would increase scope late in the project.

---

## Slide 5 - System Design and Architecture

**Architecture layers:**
- Presentation layer: React frontend
- Application layer: Express backend
- Data layer: JSON file store
- Security layer: JWT + bcrypt

**System flow:**
1. User registers or logs in
2. Backend validates credentials and returns a token
3. Frontend stores the token
4. Protected requests are sent with authorization headers
5. Backend processes application data and returns dashboard updates

**Say:**
- The architecture is simple, modular, and appropriate for the course scope.

---

## Slide 6 - Implementation Highlights

**Technologies used:**
- React and Vite for the frontend
- Node.js and Express for the backend
- JWT authentication
- bcrypt password hashing
- Docker and Render deployment

**Implementation decisions:**
- Single-service deployment for simplicity
- Backend serves the built frontend in production
- Lightweight file-based persistence to unblock delivery

**Challenges addressed:**
- integrating frontend and backend
- building deployment support late in the schedule
- keeping scope realistic under time pressure

**Say:**
- The biggest design trade-off was choosing delivery stability over additional features.

---

## Slide 7 - Demo Screens: Authentication

**Visuals:**
- `login-screen.png`
- `register-screen.png`

**What to highlight:**
- The system supports account creation
- Authentication is required to reach the dashboard
- Successful login proves the account was created and persisted

**Say:**
- There is no admin-facing user list in the UI, so account creation is demonstrated through successful registration and protected dashboard access.

---

## Slide 8 - Demo Screens: Dashboard and Tracking

**Visuals:**
- `add-application-form.png`
- `summary-panel.png`
- `tracked-applications-table.png`

**What to highlight:**
- Add company, role, date, status, URL, and notes
- View summary counts by status
- Search and filter records
- Edit and delete existing applications

**Say:**
- This is the main value of the system: a complete CRUD workflow for job tracking.

---

## Slide 9 - Live Demo / Results

**Live demo sequence:**
1. Open deployed site
2. Show register page briefly
3. Log in
4. Add a job application
5. Show summary update
6. Edit application status
7. Use search or filter
8. Delete the record

**Current live deployment:**
- https://job-application-tracker-rz65.onrender.com

**Say:**
- I will keep the live demo short and focused on one realistic workflow.

---

## Slide 10 - Testing, Evaluation, and Requirements Coverage

**Testing completed:**
- Authentication testing
- Protected route testing
- Application CRUD testing
- Summary endpoint validation
- Defect logging and resolution

**Requirements coverage summary:**

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Register/Login | Met | auth routes + live screens |
| CRUD applications | Met | dashboard workflow |
| Search/Filter | Met | tracked applications screen |
| Status summary | Met | summary panel |
| Secure access | Met | JWT + bcrypt |
| Forgot password | Deferred | future enhancement |

**Say:**
- Testing improved confidence in the final system and helped catch security-sensitive issues before deployment.

---

## Slide 11 - Deployment and Maintenance

**Deployment approach:**
- Docker-ready application
- Deployed on Render
- Frontend served by backend as one service

**Maintenance considerations:**
- Environment variables for configuration
- `/health` endpoint for service checks
- Backup of the JSON data file
- Future migration to PostgreSQL for stronger persistence

**Say:**
- This section shows operational awareness beyond just feature implementation.

---

## Slide 12 - Reflections and Lessons Learned

**What went well:**
- Core workflow was completed and deployed
- Documentation and reports were aligned with the course structure
- Testing helped improve quality late in the project

**What was difficult:**
- Catching up on late deliverables
- Balancing implementation with documentation
- Deployment and final packaging under time pressure

**What I would do differently:**
- Set up deployment earlier
- Adopt PostgreSQL earlier
- Add password reset and activity history sooner

---

## Slide 13 - Conclusion and Future Work

**Conclusion:**
- JAT meets the main project goals for COMP 2154
- It demonstrates full-stack development, authentication, CRUD, testing, and deployment
- The application is live and demo-ready

**Future work:**
- forgot password flow
- PostgreSQL migration
- stronger password rules
- email reminders
- admin/user activity tracking

---

## Slide 14 - Questions

**Thank you**

Questions?

**Say:**
- Thank you for listening. I’m ready to answer questions or continue with the live demo.
