import { Router } from "express";

export const orgRoute = Router();

// Organization registration route
orgRoute.post("/register", async (req, res) => {
    // Registration logic here
    
    res.status(201).json({ message: "Organization registered successfully" });
});
