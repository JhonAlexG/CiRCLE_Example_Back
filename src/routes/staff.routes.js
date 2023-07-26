import { Router } from "express";
import {
    createStaffMember,
    deleteStaffMember,
    updateStaffMember,
} from "../controllers/staff.controller.js";
import { createAdmin } from "../controllers/admin.controller.js";
import { verifyToken } from "../JWT/jwt.js";
import { checkAdmin } from "../authentication/checkAdmin.js";

const router = Router();

router.post("/staff", createStaffMember);
router.post("/admin", createStaffMember)

router.put("/staff/:id", updateStaffMember);
router.put("/admin/:id", updateStaffMember);

router.delete("/staff/:id", deleteStaffMember);
router.delete("/admin/:id", deleteStaffMember);

export { router as staffRoutes };