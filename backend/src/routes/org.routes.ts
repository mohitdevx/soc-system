import { Router } from "express";
import { orgController } from "../controller/org.controller";
import { orgAuthMiddleware } from "../middleware/org.auth";

export const orgRoute = Router();

// Authentication routes for organizations
orgRoute.post("/register", orgController.registerOrganization);
orgRoute.post("/login", orgController.loginOrganization)
orgRoute.get("/analysts")