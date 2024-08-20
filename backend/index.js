//default imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//Routes
import FAQRoutes from "./routes/FAQ.route.js";
import authRoutes from "./routes/auth.route.js ";
import movieandTVRoutes from "./routes/movie&TVshows.route.js";
import searchRoutes from "./routes/search.route.js";

dotenv.config();

//initialisations
const app = express();
const PORT = process.env.PORT || 3000;

//middleware used by express
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));

//App routes
app.use("/api/v1/faq", FAQRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie&tv", movieandTVRoutes);
app.use("/api/v1/search", searchRoutes);

//TODO: To connect to mongoDB and run the backend server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
