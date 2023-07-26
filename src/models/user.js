import { Schema, model } from "mongoose";

export const user = model(
    "User",
    new Schema({
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        identification : {
            type: String,
        },
        type: {
            type: String,
            required: true,
            default: "user",
        }
    })
);
