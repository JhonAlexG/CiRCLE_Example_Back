import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import { bandRoutes, memberRoutes, songRoutes, userRoutes } from "./routes/index.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./upload",
    })
);

// Routes
app.use("/api", bandRoutes, memberRoutes, songRoutes, userRoutes);

export { app };
