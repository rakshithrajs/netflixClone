import express from "express";
//controllers
import { authCheck, login, logout, signup } from "../controllers/auth.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.use(requireAuth);

router.get("/authCheck", authCheck);

export default router;
