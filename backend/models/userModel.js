import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    searchHistory: {
        type: Array,
        default: [],
    },
});

userSchema.statics.logIn = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("incorrect credentials");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("incorrect credentials");
    }
    return user;
};

userSchema.statics.signUp = async function (email, password, username) {
    if (!email || !password || !username) {
        throw new Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Not a valid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error("Email already exists");
    }
    const unameexists = await this.findOne({ username });
    if (unameexists) {
        throw new Error("Username already exists");
    }
    const PROFILE_PICS = [
        "/Netflix-avatar.png",
        "/Netflix2-avatar.jpg",
        "/netflix3-avatar.jpg",
        "/Netflix4-avatar.jpg",
    ];
    const randomPic =
        PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({
        username,
        email,
        password: hash,
        image: randomPic,
    });
    return user;
};

export const User = mongoose.model("User", userSchema);
