import { Router } from "express";
import {
    loginUser,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../JWT/jwt.js";

const router = Router();

router.post("/login", loginUser);

router.post("/register", createUser);

router.put("/users/:id", verifyToken, updateUser);

router.delete("/users/:id", verifyToken, deleteUser);

export { router as userRoutes };