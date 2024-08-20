import { getFromTMDb } from "../services/tmdb.js";

export const getTredingMovie = async (req, res) => {
    try {
        const type = req.params.type;
        const data = await getFromTMDb(
            `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`
        );
        const RandomMovie =
            data.results[Math.floor(Math.random() * data.results?.length)];
        res.status(200).json({ success: true, content: RandomMovie });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Error fetching trending movie",
        });
    }
};

export const getMovieTrailers = async (req, res) => {
    try {
        const { type, id } = req.params;
        const data = await getFromTMDb(
            `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`
        );
        res.status(200).json({
            success: true,
            content: data.results,
        });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json();
        }
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getMovieDetails = async (req, res) => {
    try {
        const { type, id } = req.params;
        const data = await getFromTMDb(
            `https://api.themoviedb.org/3/${type}/${id}?language=en-US`
        );
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json();
        }
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getSimilarMovies = async (req, res) => {
    try {
        const { type, id } = req.params;
        const data = await getFromTMDb(
            `https://api.themoviedb.org/3/${type}/${id}/similar?language=en-US&page=1`
        );
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getMovieByCategory = async (req, res) => {
    try {
        const { category, type } = req.params;
        const data = await getFromTMDb(
            `https://api.themoviedb.org/3/${type}/${category}?language=en-US&page=1`
        );
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
