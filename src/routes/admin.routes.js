import { Router } from "express";
import { createAdmin } from "../controllers/admin.controller.js";
import { verifyToken } from "../JWT/jwt.js";
import { checkAdmin } from "../authentication/checkers.js";

const router = Router();

router.post("/admin", verifyToken, checkAdmin, createAdmin);

export { router as adminRoutes };
