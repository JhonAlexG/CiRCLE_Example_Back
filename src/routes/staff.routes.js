import { Router } from "express";
import {
    createStaffMember,
    deleteStaffMember,
    updateStaffMember,
} from "../controllers/staff.controller.js";
import { createAdmin } from "../controllers/admin.controller.js";
import { verifyToken } from "../JWT/jwt.js";
import { checkAdmin } from "../authentication/checkers.js";

const router = Router();

router.post("/staff", verifyToken, checkAdmin, createStaffMember);

router.put("/staff/:id", verifyToken, checkAdmin, updateStaffMember);

router.delete("/staff/:id", verifyToken, checkAdmin, deleteStaffMember);

export { router as staffRoutes };