import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
    deleteHistory,
    searchHistory,
    searchMovie,
    searchPerson,
    searchTVShow,
} from "../controllers/search.js";
const router = express.Router();

router.use(requireAuth);

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTVShow);

router.get("/history", searchHistory);
router.delete("/history/:title", deleteHistory);

export default router;
