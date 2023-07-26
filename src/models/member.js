import { Schema, model } from "mongoose";

export const member = model(
    "Member",
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
        band: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        birthday: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        school: {
            type: String,
            required: true,
        },
        likes: {
            type: String,
            required: true,
        },
        dislikes: {
            type: String,
            required: true,
        },
        hobbies: {
            type: String,
            required: true,
        },
        image: {
            url: String,
            public_id: String,
        },
    })
);
