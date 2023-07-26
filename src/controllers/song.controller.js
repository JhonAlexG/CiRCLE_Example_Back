import fs from "fs-extra";

import { song } from "../models/song.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";

export const getSongs = async (req, res) => {
    await song
        .find()
        .then((songs) => res.status(200).json({ songs }))
        .catch((error) => res.status(400).json({ error }));
};

export const getSong = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ message: "Missing id" });

    await song
        .findOne({ id: req.params.id })
        .then((song) => res.status(200).json({ song }))
        .catch((error) => res.status(400).json({ error }));
};

export const createSong = async (req, res) => {
    const {
        id,
        title,
        alt_title,
        band,
        type,
        lyrics,
        eng_translation,
        esp_translation,
    } = req.body;

    if (
        !id ||
        !title ||
        !alt_title ||
        !band ||
        !type ||
        !lyrics ||
        !eng_translation ||
        !esp_translation ||
        !req.files
    )
        return res.status(400).json({ message: "Missing fields" });

    await uploadImage(req.files.cover_img.tempFilePath, "songs")
        .then(async (data) => {
            req.body.cover_img = {
                url: data.secure_url,
                public_id: data.public_id,
            };
        })
        .catch((error) => res.status(400).json({ error }));

    await fs.unlink(req.files.cover_img.tempFilePath);

    await song
        .create(req.body)
        .then((song) => res.status(200).json({ song }))
        .catch(async (error) => res.status(400).json({ error }));
};

export const updateSong = async (req, res) => {
    console.log(req.body);

    const {
        title,
        alt_title,
        band,
        type,
        lyrics,
        eng_translation,
        esp_translation,
    } = req.body;

    if (!req.params.id) return res.status(400).json({ message: "Missing id" });

    if (
        !title ||
        !alt_title ||
        !band ||
        !type ||
        !lyrics ||
        !eng_translation ||
        !esp_translation ||
        !req.files
    )
        return res.status(400).json({ message: "Missing fields" });

    await song
        .findOne({ id: req.params.id })
        .then(async (data) => {
            await deleteImage(data.cover_img.public_id);

            await uploadImage(req.files.cover_img.tempFilePath, "songs")
                .then(async (data) => {
                    req.body.cover_img = {
                        url: data.secure_url,
                        public_id: data.public_id,
                    };
                })
                .catch((error) => res.status(400).json({ error }));

            await fs.unlink(req.files.cover_img.tempFilePath);

            await song
                .findOneAndUpdate({ id: req.params.id }, req.body)
                .then((song) => res.status(200).json({ song }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

export const deleteSong = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ message: "Missing id" });

    await song
        .findOne({ id: req.params.id })
        .then(async (data) => {
            await deleteImage(data.cover_img.public_id);

            await song
                .findOneAndDelete({ id: req.params.id })
                .then(() => res.status(200).json({ message: "Song deleted" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};
