import { user } from "../models/user.js";
import { generateToken } from "../JWT/jwt.js";

export const createStaffMember = async (req, res) => {
  const { name, lastname, email, password, identification } = req.body;
  console.log(req.body);
  if (!name || !lastname || !email || !password || !identification)
    return res.status(400).json({ message: "Missing fields" });

  await user.findOne({ email }).then(async (data) => {
    if (data)
      return res.status(400).json({ message: "This email is already taken" });

    await user
      .create({
        name,
        lastname,
        email,
        password,
        identification,
        type: "staff",
      })
      .then((user) => {
        res.status(201).json({ token: generateToken(user, "24h") });
      })
      .catch((error) => res.status(400).json({ error }));
  });
};

export const deleteStaffMember = async (req, res) => {
  await user
    .findOneAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Staff member deleted" }))
    .catch((err) => res.status(404).json({ message: "User not found" }));
};

export const updateStaffMember = async (req, res) => {};
