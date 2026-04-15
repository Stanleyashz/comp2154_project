import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getApplicationsForUser,
  updateApplication
} from "../data/store.js";

const router = Router();
const allowedStatuses = [
  "Applied",
  "Interview Scheduled",
  "Assessment",
  "Offer Received",
  "Rejected",
  "Withdrawn"
];

router.get("/", async (request, response) => {
  let applications = await getApplicationsForUser(request.user.userId);
  const { status, search } = request.query;

  if (status) {
    applications = applications.filter((application) => application.status === status);
  }

  if (search) {
    const query = search.toLowerCase();
    applications = applications.filter(
      (application) =>
        application.companyName.toLowerCase().includes(query) ||
        application.jobTitle.toLowerCase().includes(query)
    );
  }

  return response.json({
    applications,
    count: applications.length
  });
});

router.get("/summary", async (request, response) => {
  const applications = await getApplicationsForUser(request.user.userId);
  const byStatus = allowedStatuses.reduce((accumulator, status) => {
    accumulator[status] = applications.filter((application) => application.status === status).length;
    return accumulator;
  }, {});

  return response.json({
    total: applications.length,
    byStatus
  });
});

router.post("/", async (request, response) => {
  const { companyName, jobTitle, dateApplied, status, jobUrl, notes } = request.body;

  if (!companyName || !jobTitle || !dateApplied || !status) {
    return response.status(400).json({ error: "Missing required application fields" });
  }

  if (!allowedStatuses.includes(status)) {
    return response.status(400).json({ error: "Invalid application status" });
  }

  const application = await createApplication({
    userId: request.user.userId,
    companyName,
    jobTitle,
    dateApplied,
    status,
    jobUrl: jobUrl || "",
    notes: notes || ""
  });

  return response.status(201).json({
    message: "Application created successfully",
    application
  });
});

router.put("/:id", async (request, response) => {
  if (request.body.status && !allowedStatuses.includes(request.body.status)) {
    return response.status(400).json({ error: "Invalid application status" });
  }

  const application = await updateApplication(request.user.userId, request.params.id, request.body);

  if (!application) {
    return response.status(404).json({ error: "Application not found" });
  }

  return response.json({
    message: "Application updated successfully",
    application
  });
});

router.delete("/:id", async (request, response) => {
  const deleted = await deleteApplication(request.user.userId, request.params.id);

  if (!deleted) {
    return response.status(404).json({ error: "Application not found" });
  }

  return response.json({ message: "Application deleted successfully" });
});

export default router;
