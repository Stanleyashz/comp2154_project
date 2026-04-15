# Test Strategy

## Objective

Verify that the Job Application Tracker behaves correctly across authentication, application management, and end-to-end user workflows.

## Test Levels

- Unit testing for utility functions and validation logic
- Integration testing for auth and application routes
- System testing for full user workflows
- Edge case testing for invalid input and failed authentication

## Tools

- Manual browser testing
- API testing through curl or Postman
- Automated tests with Jest and Supertest

## Quality Focus for Week 10

- Confirm login and registration work consistently
- Confirm dashboard can submit applications
- Confirm application summary data matches stored records
- Log all defects with severity and re-test after fixes
