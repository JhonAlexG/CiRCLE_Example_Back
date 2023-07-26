import fs from "fs-extra";

import { band } from "../models/band.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";

export const getBands = async (req, res) => {
    await band
        .find()
        .then((bands) => res.status(200).json({ bands }))
        .catch((error) => res.status(400).json({ error }));
};

export const getBand = async (req, res) => {
    if (!req.params.id)
        return res.status(400).json({ message: "Missing fields" });

    await band
        .findOne({ id: req.params.id })
        .then((band) => res.status(200).json({ band }))
        .catch((error) => res.status(400).json({ error }));
};

export const createBand = async (req, res) => {
    req.body.colors = req.body["colors[]"]
    const { id, name, colors } = req.body;

    if (!id || !name || !colors || !req.files)
        return res.status(400).json({ message: "Missing fields" });

    await uploadImage(req.files.image.tempFilePath, "bands")
        .then(async (data) => {
            req.body.image = {
                url: data.secure_url,
                public_id: data.public_id,
            };
        })
        .catch((error) => res.status(400).json({ error }));

    await uploadImage(req.files.logo.tempFilePath, "bands")
        .then(async (data) => {
            req.body.logo = {
                url: data.secure_url,
                public_id: data.public_id,
            };
        })
        .catch((error) => res.status(400).json({ error }));

    await fs.unlink(req.files.image.tempFilePath);
    await fs.unlink(req.files.logo.tempFilePath);

    await band
        .create(req.body)
        .then((band) => res.status(200).json({ band }))
        .catch(async (error) => res.status(400).json({ error }));
};

export const updateBand = async (req, res) => {
    const { name, colors } = req.body;

    if (!req.params.id) return res.status(400).json({ message: "Missing id" });

    if (!name || !colors || !req.files)
        return res.status(400).json({ message: "Missing fields" });

    await band
        .findOne({ id: req.params.id })
        .then(async (data) => {
            await deleteImage(data.image.public_id);
            await deleteImage(data.logo.public_id);

            await uploadImage(req.files.image.tempFilePath, "bands")
                .then(async (data) => {
                    req.body.image = {
                        url: data.secure_url,
                        public_id: data.public_id,
                    };
                })
                .catch((error) => res.status(400).json({ error }));

            await uploadImage(req.files.logo.tempFilePath, "bands")
                .then(async (data) => {
                    req.body.logo = {
                        url: data.secure_url,
                        public_id: data.public_id,
                    };
                })
                .catch((error) => res.status(400).json({ error }));

            await fs.unlink(req.files.image.tempFilePath);
            await fs.unlink(req.files.logo.tempFilePath);

            await band
                .findOneAndUpdate({ id: req.params.id }, req.body)
                .then((band) => res.status(200).json({ band }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};

export const deleteBand = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ message: "Missing id" });

    await band
        .findOne({ id: req.params.id })
        .then(async (data) => {
            await deleteImage(data.image.public_id);
            await deleteImage(data.logo.public_id);

            await band
                .findOneAndDelete({ id: req.params.id })
                .then(() => res.status(200).json({ message: "Band deleted" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
};
