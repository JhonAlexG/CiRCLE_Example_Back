import { Schema, model } from "mongoose";

export const song = model(
    "Song",
    new Schema({
        id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        alt_title: {
            type: String,
            required: true,
        },
        band: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        lyrics: {
            type: String,
            required: true,
        },
        eng_translation: {
            type: String,
            required: true,
        },
        esp_translation: {
            type: String,
            required: true,
        },
        cover_img: {
            url: String,
            public_id: String,
        },
    })
);
