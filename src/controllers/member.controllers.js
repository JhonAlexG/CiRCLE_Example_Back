import fs from "fs-extra";

import { member } from "../models/member.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";

export const getMembers = async (req, res) => {
  await member
    .find()
    .then((members) => res.status(200).json({ members }))
    .catch((error) => res.status(400).json({ error }));
};

export const getMember = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Missing fields" });

  await member
    .findOne({ id: req.params.id })
    .then((member) => res.status(200).json({ member }))
    .catch((error) => res.status(400).json({ error }));
};

export const createMember = async (req, res) => {
  const {
    id,
    name,
    band,
    position,
    birthday,
    age,
    height,
    school,
    likes,
    dislikes,
    hobbies,
  } = req.body;

  if (
    !id ||
    !name ||
    !band ||
    !position ||
    !birthday ||
    !age ||
    !height ||
    !school ||
    !likes ||
    !dislikes ||
    !hobbies ||
    !req.files
  )
    return res.status(400).json({ message: "Missing fields" });

  await uploadImage(req.files.image.tempFilePath, "members")
    .then(async (data) => {
      req.body.image = {
        url: data.secure_url,
        public_id: data.public_id,
      };
    })
    .catch((err) => res.status(400).json({ err }));

  await fs.unlink(req.files.image.tempFilePath);

  await member
    .create(req.body)
    .then((member) => res.status(200).json({ member }))
    .catch((error) => res.status(400).json({ error }));
};

export const updateMember = async (req, res) => {
  const {
    name,
    band,
    position,
    birthday,
    age,
    height,
    school,
    likes,
    dislikes,
    hobbies,
  } = req.body;

  if (!req.params.id) return res.status(400).json({ message: "Missing id" });

  if (
    !name ||
    !band ||
    !position ||
    !birthday ||
    !age ||
    !height ||
    !school ||
    !likes ||
    !dislikes ||
    !hobbies ||
    !req.files
  )
    return res.status(400).json({ message: "Missing fields" });

  await member
    .findOne({ id: req.params.id })
    .then(async (data) => {
      await deleteImage(data.image.public_id);

      await uploadImage(req.files.image.tempFilePath, "members")
        .then(async (data) => {
          req.body.image = {
            url: data.secure_url,
            public_id: data.public_id,
          };
        })
        .catch((err) => res.status(400).json({ err }));

      await fs.unlink(req.files.image.tempFilePath);

      await member
        .findOneAndUpdate({ id: req.params.id }, req.body, {
          new: true,
        })
        .then((member) => res.status(200).json({ member }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

export const deleteMember = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: "Missing id" });

  await member
    .findOne({ id: req.params.id })
    .then(async (data) => {
      await deleteImage(data.image.public_id);

      await member
        .findOneAndDelete({ id: req.params.id })
        .then(() => res.status(200).json({ message: "Member deleted" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
