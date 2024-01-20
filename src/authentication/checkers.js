export const checkAdmin = (req, res, next) => {
    if (req.decoded.type !== "admin")
        return res.status(403).json({ message: "Unauthorized" });

    next();
};

export const checkStaff = (req, res, next) => {
    if (req.decoded.type !== "staff" && req.decoded.type !== "admin")
        return res.status(403).json({ message: "Unauthorized" });

    next();
}