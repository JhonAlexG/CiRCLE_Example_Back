import { Router } from "express";
import {
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
} from "../controllers/member.controllers.js";

const router = Router();

router.get("/members", getMembers);
router.get("/members/:id", getMember);

router.post("/members", createMember);

router.put("/members/:id", updateMember);

router.delete("/members/:id", deleteMember);

export { router as memberRoutes };
