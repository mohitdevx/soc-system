import { Router } from "express";
import { loginOrganization, registerOrganization } from "../controller/org.control";

export const orgRoute = Router();

// Authentication routes for organizations
orgRoute.post("/register", registerOrganization);
orgRoute.post("/login", loginOrganization);


