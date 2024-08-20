import express from "express";
import {
    getTredingMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMovieByCategory,
} from "../controllers/MoviesandTVshows.js";
import { requireAuth } from "../middleware/requireAuth.js";
const router = express.Router();

router.use(requireAuth);

router.get("/:type/trending", getTredingMovie);
router.get("/:type/:id/trailer", getMovieTrailers);
router.get("/:type/:id/details", getMovieDetails);
router.get("/:type/:id/similar", getSimilarMovies);
router.get("/:type/:category", getMovieByCategory);

export default router;
