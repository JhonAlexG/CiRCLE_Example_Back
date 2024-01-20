import { Router } from "express";
import {
    getSongs,
    getSong,
    createSong,
    updateSong,
    deleteSong,
} from "../controllers/song.controller.js";
import { verifyToken } from "../JWT/jwt.js";
import { checkStaff } from "../authentication/checkers.js";

const router = Router();

router.get("/songs", verifyToken, getSongs);
router.get("/songs/:id", verifyToken, getSong);

router.post("/songs", verifyToken, checkStaff, createSong);

router.put("/songs/:id", verifyToken, checkStaff, updateSong);

router.delete("/songs/:id", verifyToken, checkStaff, deleteSong);

export { router as songRoutes };
