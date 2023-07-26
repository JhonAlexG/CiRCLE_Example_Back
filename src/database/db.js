import { connect } from "mongoose";
import { config } from "dotenv";

config();

export const connectDB = await connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
