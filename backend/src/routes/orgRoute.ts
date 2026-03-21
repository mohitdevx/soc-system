import { Router } from "express";
import { getOrganization, loginOrganization, registerOrganization } from "../controller/org.control";
import { orgAuthMiddleware } from "../middleware/org.auth";

export const orgRoute = Router();

// Authentication routes for organizations
orgRoute.post("/register", registerOrganization);
orgRoute.post("/login", loginOrganization);
orgRoute.get("/me", orgAuthMiddleware, getOrganization)


