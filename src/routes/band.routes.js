import { Router } from "express";
import {
    getBands,
    getBand,
    createBand,
    updateBand,
    deleteBand,
} from "../controllers/band.controllers.js";

const router = Router();

router.get("/bands", getBands);
router.get("/bands/:id", getBand);

router.post("/bands", createBand);

router.put("/bands/:id", updateBand);

router.delete("/bands/:id", deleteBand);

export { router as bandRoutes };
