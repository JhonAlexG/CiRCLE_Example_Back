import { Router } from "express";
import {
    getSongs,
    getSong,
    createSong,
    updateSong,
    deleteSong,
} from "../controllers/song.controller.js";

const router = Router();

router.get("/songs", getSongs);
router.get("/songs/:id", getSong);

router.post("/songs", createSong);

router.put("/songs/:id", updateSong);

router.delete("/songs/:id", deleteSong);

export { router as songRoutes };
