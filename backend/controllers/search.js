import { User } from "../models/userModel.js";
import { getFromTMDb } from "../services/tmdb.js";

export const searchPerson = async (req, res) => {
    const { query } = req.params;
    try {
        const data = await getFromTMDb(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if (data.results.length == 0) {
            return res.status(404).json({ message: "No results found" });
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                },
            },
        });
        res.status(200).json({ success: true, data: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching for person" });
    }
};

export const searchMovie = async (req, res) => {
    const { query } = req.params;
    try {
        const data = await getFromTMDb(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if (data.results.length == 0) {
            return res.status(404).json({ message: "No results found" });
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                },
            },
        });
        res.status(200).json({ success: true, data: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching for movie" });
    }
};

export const searchTVShow = async (req, res) => {
    const { query } = req.params;
    try {
        const data = await getFromTMDb(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if (data.results.length == 0) {
            return res.status(404).json({ message: "No results found" });
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                },
            },
        });
        res.status(200).json({ success: true, data: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching for TV show" });
    }
};

export const searchHistory = async (req, res) => {
    try {
        res.status(200).json({ success: true, data: req.user.searchHistory });
    } catch (error) {
        console.error(error);
        res.status(404).json({ success: false, message: "Invalid request" });
    }
};

export const deleteHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: parseInt(id) },
            },
        });
        res.status(200).json({
            success: true,
            message: "History deleted",
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ success: false, message: "Invalid request" });
    }
};
