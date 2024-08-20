import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
    const token = req.cookies["netflix"];
    if (!token) {
        return res.status(401).json({ error: "Auth token required" });
    }
    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(_id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Request not authorised" });
    }
};
