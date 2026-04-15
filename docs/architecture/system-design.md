# System Design

## Architecture Style

Current repository structure follows a simple 3-layer model:

- Presentation Layer: React frontend
- Application Layer: Express API
- Data Layer: JSON file store for immediate development

## Planned Production Architecture

The intended course architecture remains:

- React frontend
- Express/Node backend
- PostgreSQL database
- JWT authentication

## Initial API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/applications`
- `GET /api/applications/summary`
- `POST /api/applications`
- `PUT /api/applications/:id`
- `DELETE /api/applications/:id`

## Week 10 Architecture Notes

- Authentication and application management are implemented in route structure.
- The project is ready for testing and defect logging work.
- PostgreSQL migration remains a planned upgrade to align with the original proposal and final report.
