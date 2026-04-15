# Project Proposal - Job Application Tracker
**Student:** Stanley Okafor (101529064)  
**Course:** COMP 2154 - System Development Project  
**Due Date:** February 14, 2026

---

## 1. Project Context and Client Focus

### Project Background

Job seekers often manage their applications through spreadsheets, browser bookmarks, and scattered notes. This process is inefficient and makes it hard to monitor progress through different hiring stages. The Job Application Tracker project addresses this issue by providing one system for storing and managing application records.

### Client or Stakeholder Focus

The primary user is an individual job seeker who needs better visibility into applications, statuses, and notes. Secondary stakeholders include the course instructor and future maintainers who need a clear demonstration of planning, implementation, testing, and deployment.

---

## 2. Problem Statement and Business Need

### Business Need

There is a need for a single system that makes job applications easy to track, update, and review without relying on disconnected tools.

### Problem Statement

Job seekers handling multiple applications often lose track of application history, company details, and current status. This creates confusion, missed follow-up opportunities, and poor organization.

---

## 3. Project Objectives and Scope

### Objectives

- Build a web application for job application tracking
- Implement secure user authentication
- Provide complete CRUD support for application records
- Add search, filtering, and status summaries
- Prepare the project for testing, deployment, and final presentation

### In Scope

- Registration and login workflow
- User-specific application records
- Add, view, edit, and delete operations
- Dashboard summary and filtering
- Testing documentation and deployment preparation

### Out of Scope

- Password reset
- Notification system
- Resume management
- Shared accounts or collaboration features

---

## 4. Proposed Solution and Technology Stack

### Proposed Solution Overview

The proposed solution is a web-based Job Application Tracker where each user can maintain a personal application pipeline. After authentication, the user can create application entries, assign statuses, attach notes and links, and review progress from a dashboard.

### Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Frontend | React + Vite | Fast UI development and clean component structure |
| Backend | Node.js + Express | Simple REST API development and good JavaScript ecosystem |
| Authentication | JWT + bcrypt | Standard secure auth approach for small web applications |
| Data Layer | JSON store initially | Fastest way to deliver working core functionality |
| Planned Upgrade | PostgreSQL | Better long-term persistence and alignment with original architecture goals |

---

## 5. Feasibility, Constraints, and Risks

### Feasibility Summary

The project is technically feasible within the semester because the required feature set is moderate and the selected stack supports rapid implementation. The initial storage layer can remain lightweight during development, while deployment and future work can expand the architecture later.

### Constraints

- Limited semester timeline
- Need to balance implementation with frequent documentation deliverables
- Deployment must be completed before final presentation

### Risks and Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Falling behind schedule | High | Prioritize core workflow before optional enhancements |
| Deployment issues late in project | Medium | Prepare Docker/hosted deployment before final week |
| Scope becoming too broad | High | Keep features tightly aligned to must-have requirements |

---

## 6. High-Level Project Plan and Schedule

| Phase | Focus |
|-------|-------|
| Weeks 1-3 | Requirements and proposal |
| Week 4 | System design and Progress Report 1 |
| Weeks 5-6 | Testing strategy and early implementation |
| Weeks 7-10 | Integration, testing, and quality improvements |
| Weeks 11-12 | Deployment and review |
| Weeks 13-14 | Final report and presentation |

---

## 7. Roles and Communication

### Role

This is an individual project covering planning, coding, testing, documentation, and deployment.

### Communication and Workflow

- Maintain version-controlled project structure
- Track work using backlog/checklists
- Update documentation as implementation progresses
- Prepare evidence and reports alongside development

---

## 8. Assumptions and Success Criteria

### Assumptions

- Users need a browser-based solution rather than a mobile-native application
- Core application tracking is more important than advanced automation for the initial version

### Success Criteria

- Authentication works
- Users can manage applications end-to-end
- Dashboard reflects status progress
- Core workflow is tested
- System can be deployed and demonstrated live

---

## 9. Summary and Next Steps

The Job Application Tracker is a practical and achievable system development project that addresses a real-world organizational problem. The proposal supports a focused scope, a feasible implementation plan, and a clear path toward testing and deployment. The next step is to refine the architecture and produce Progress Report 1 with system design details.
