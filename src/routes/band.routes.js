import { Router } from "express";
import {
    getBands,
    getBand,
    createBand,
    updateBand,
    deleteBand,
} from "../controllers/band.controllers.js";
import { verifyToken } from "../JWT/jwt.js";
import { checkStaff } from "../authentication/checkers.js";

const router = Router();

router.get("/bands", verifyToken, getBands);
router.get("/bands/:id", verifyToken, getBand);

router.post("/bands", verifyToken, checkStaff, createBand);

router.put("/bands/:id", verifyToken, checkStaff, updateBand);

router.delete("/bands/:id", verifyToken, checkStaff, deleteBand);

export { router as bandRoutes };
