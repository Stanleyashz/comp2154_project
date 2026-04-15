# Requirements Gathering Report - Job Application Tracker
**Student:** Stanley Okafor (101529064)  
**Course:** COMP 2154 - System Development Project  
**Due Date:** January 31, 2026

---

## 1. Project Overview and Context

Job Application Tracker (JAT) is a web application intended to help job seekers organize and monitor their applications in one centralized system. Many applicants currently rely on scattered notes, spreadsheets, bookmarks, and email threads. This creates poor visibility into the application pipeline and makes it easy to miss deadlines, follow-ups, or status changes.

The project is aimed at solving this problem by providing a simple web-based dashboard where users can register, log in, create job application records, update statuses, and review their progress over time.

---

## 2. Stakeholder Analysis

| Stakeholder | Interest in the System | Main Need |
|-------------|------------------------|-----------|
| Primary user / job seeker | Wants a clear overview of all applications | Centralized and reliable tracking |
| Instructor / evaluator | Wants evidence of proper SDLC execution | Clear deliverables and working implementation |
| Future maintainer | Wants understandable structure and documentation | Maintainable code and documented behavior |

---

## 3. Business Need and Problem Statement

### Business Need

Job seekers need a more organized way to manage multiple applications, deadlines, job links, and notes without relying on disconnected tools.

### Problem Statement

Users applying to many jobs at once often lose track of where they applied, what stage each application is in, and what follow-up actions are needed. This leads to missed opportunities, duplicated effort, and poor job-search organization.

---

## 4. High-Level Goals and Scope

### Goals

- Centralize job application tracking in one interface
- Support secure login and user-specific data
- Allow users to maintain application history
- Provide status-based visibility of job-search progress

### In Scope

- User registration and login
- Create, view, update, and delete job applications
- Store company name, job title, date applied, status, job URL, and notes
- Search and filter applications
- Dashboard summary of statuses

### Out of Scope

- Email reminders
- Password reset workflow
- Multi-user team collaboration
- Resume generation

---

## 5. Functional Requirements

| ID | Functional Requirement |
|----|------------------------|
| FR-1 | The system shall allow a user to register with name, email, and password. |
| FR-2 | The system shall allow a registered user to log in securely. |
| FR-3 | The system shall restrict application management routes to authenticated users only. |
| FR-4 | The system shall allow a user to create a job application record. |
| FR-5 | The system shall allow a user to view all of their job applications. |
| FR-6 | The system shall allow a user to filter applications by status. |
| FR-7 | The system shall display a dashboard summary of application counts by status. |
| FR-8 | The system shall allow a user to update an existing job application. |
| FR-9 | The system shall allow a user to delete an application. |
| FR-10 | The system shall allow a user to search applications by company name or job title. |

---

## 6. Non-Functional Requirements

| ID | Non-Functional Requirement |
|----|----------------------------|
| NFR-1 | The system should provide a simple and readable user interface. |
| NFR-2 | Passwords must not be stored in plain text. |
| NFR-3 | Protected routes must require valid authentication tokens. |
| NFR-4 | The system should respond consistently for normal CRUD operations. |
| NFR-5 | The codebase should be structured so that features can be extended later. |

---

## 7. Constraints and Assumptions

### Constraints

- The project must be completed within the COMP 2154 semester timeline.
- The project must demonstrate SDLC deliverables including documentation, testing, and presentation.
- Time pressure requires keeping the initial scope realistic.

### Assumptions

- Users will access the system through a supported browser.
- Users only need personal job-application tracking, not shared collaboration.
- A lightweight storage approach can be used initially before later migration to PostgreSQL.

---

## 8. Initial Use Cases and User Stories

### Use Cases

- Register account
- Log in
- Add application
- View dashboard
- Edit application
- Delete application
- Filter or search applications

### User Stories

- As a user, I want to register an account so that I can manage my own application data.
- As a user, I want to log in securely so that only I can access my records.
- As a user, I want to add a job application so that I can track opportunities.
- As a user, I want to change an application status so that I can keep my progress current.
- As a user, I want to filter and search my applications so that I can find information quickly.

---

## 9. Priorities and Risk Highlights

### Priorities

1. Authentication
2. Core CRUD workflow
3. Status tracking and dashboard visibility
4. Search and filtering

### Early Risks

- Falling behind on implementation due to documentation load
- Scope growth beyond the semester timeline
- Delayed deployment preparation

### Initial Mitigation

- Focus on must-have features first
- Keep architecture simple
- Defer optional features to future work

---

## 10. Summary and Next Steps

The requirements gathering process confirmed that the most important value of the Job Application Tracker is centralized, secure, and practical application management. The next step is to define the proposed solution in more detail, confirm the technology stack, assess feasibility, and produce the formal project proposal.
