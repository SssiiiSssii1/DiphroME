import type { Project } from "./types";

/**
 * Real projects only. Add one object per project.
 */
export const projects: Project[] = [
  {
    name: "Multi-Tenant SaaS Platform",
    description:
      "Designed and built a multi-tenant SaaS backend from scratch with schema-per-tenant isolation, serving 20+ business modules.",
    stack: ["NestJS", "Fastify", "PostgreSQL", "TypeScript"],
    note: "Built subscription and feature-gating with tenant-aware access control and reusable CRUD infrastructure; integrated S3/MinIO storage, SSE real-time notifications, email queues, and Paymob payments.",
  },
  {
    name: "Mohamed Ahmed LMS Project",
    description:
      "Built a Learning Management System backend enabling admins to manage courses, assignments, and student records through RESTful APIs secured with JWT authentication and role-based access control.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "REST APIs", "AWS S3"],
    note: "Developed real-time chat and notifications for student-instructor communication, and built a grading module with automated score calculation.",
  },
  {
    name: "MedCare — Medical Management System",
    description:
      "Built the backend for MedCare, a mobile medical management system handling patients, doctors, and appointment scheduling.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "SMTP"],
    note: "Integrated email notifications for appointment confirmations and reminders.",
  },
];
