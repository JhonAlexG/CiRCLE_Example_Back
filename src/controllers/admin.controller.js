import { user } from "../models/user.js";

export const createAdmin = async (req, res) => {
  // Check if the fields are empty
  if (
    !req.body.name ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.password ||
    !req.body.identification
  )
    return res.status(400).json({ message: "Missing fields" });

  // Function to create the admin, I created this function to avoid repeating code
  const create = async () => {
    // Create the admin
    await user
      .create({
        type: "admin",
        ...req.body,
      })
      .then((user) => res.status(201).json({ user }))
      .catch((err) => res.status(400).json({ err }));
  };

  if (req.decoded.type === "admin") {
    // If the user is an admin, create the admin
    await create();
  } else {
    // If the user isn't an admin, check if there is an admin
    // If not create the admin, if yes, return an error
    await user
      .findOne({ type: "admin" })
      .then(async (data) => {
        if (!data) {
          await create();
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      })
      .catch((err) => res.status(400).json({ err }));
  }
};

// Delete admin
// export const deleteAdmin = async (req, res) => {
//     // Delete the admin
//     await user
//         .findOneAndDelete({ _id: req.params.id })
//         .then(() => res.status(200).json({ message: "Admin deleted" }))
//         .catch((err) => res.status(404).json({ message: "User not found" }));
// };
