export const checkAdmin = (req, res, next) => {
    if (req.decoded.type !== "admin")
        return res.status(403).json({ message: "Unauthorized" });

    next();
};