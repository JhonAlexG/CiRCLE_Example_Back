import { Schema, model } from "mongoose";

export const band = model(
    "Band",
    new Schema({
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            url: String,
            public_id: String,
        },
        logo: {
            url: String,
            public_id: String,
        },
        colors: {
            type: Array,
            required: true,
        },
    })
);
