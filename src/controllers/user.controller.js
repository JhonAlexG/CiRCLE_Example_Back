import { user } from "../models/user.js";
import { generateToken } from "../JWT/jwt.js";

export const loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ message: "Missing fields" });

  await user
    .findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "Invalid credentials" });

      const token = generateToken(user, "24h");

      res.status(200).json({ token, userType: user.type });
    })
    .catch((error) => res.status(400).json({ error }));
};

export const createUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  console.log(req.body);
  if (!name || !lastname || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  await user.findOne({ email }).then(async (data) => {
    if (data)
      return res.status(400).json({ message: "This email is already taken" });

    await user
      .create(req.body)
      .then((data) => {
        res.status(201).json({ token: generateToken(data, "24h") });
      })
      .catch((error) => res.status(400).json({ error }));
  });
};

export const updateUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if (!name || !lastname || !email || !password)
    return res.status(400).json({ message: "Missing fields" });
};



export const deleteUser = async (req, res) => {};
