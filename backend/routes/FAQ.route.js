import express from "express";
import { getFAQ } from "../controllers/FAQ.js";

const router = express.Router();

router.get("/", getFAQ);

export default router;
