import { Router } from "express";
import {
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
} from "../controllers/member.controllers.js";
import { verifyToken } from "../JWT/jwt.js";
import { checkStaff } from "../authentication/checkers.js";

const router = Router();

router.get("/members", verifyToken, getMembers);
router.get("/members/:id", verifyToken, getMember);

router.post("/members", verifyToken, checkStaff, createMember);

router.put("/members/:id", verifyToken, checkStaff, updateMember);

router.delete("/members/:id", verifyToken, checkStaff, deleteMember);

export { router as memberRoutes };
