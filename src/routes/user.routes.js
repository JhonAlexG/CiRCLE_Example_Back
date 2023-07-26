import { Router } from "express";
import {
    loginUser,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/login", loginUser);

router.post("/register", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export { router as userRoutes };