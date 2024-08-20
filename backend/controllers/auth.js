import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const createToken = (_id, res) => {
    const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
    res.cookie("netflix", token, {
        httpOnly: false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });
    return token;
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.logIn(email, password);
        const token = createToken(user._id, res);
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const signup = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const user = await User.signUp(email, password, username);
        const token = createToken(user._id, res);
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("netflix");
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const authCheck = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({ success: true, user: req.user });
        } else {
            res.status(401).json({ success: false, error: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
