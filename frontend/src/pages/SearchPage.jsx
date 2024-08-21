import React, { useState } from "react";
import { useContent } from "../context/useContent";
import { Search } from "lucide-react";
import api from "../api/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_SIZE } from "../utils/constants";

const SearchPage = () => {
    const [ActiveTab, setActiveTab] = useState("movie");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { setContent } = useContent();
    const handleClick = (t) => {
        setActiveTab(t);
        t === "movie" ? setContent("movie") : setContent("tv");
        setSearchResults([]);
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await api.get(`/search/${ActiveTab}/${searchQuery}`);
            setSearchResults(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            if (error.message.includes("404")) {
                toast.error("No results found");
            } else {
                toast.error("An error occurred");
            }
        }
    };
    return (
        <>
            <div className="text-white">
                <div className="h-[5vw]" />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center gap-3 mb-4">
                        <button
                            className={`py-2 px-4 rounded ${
                                ActiveTab === "movie"
                                    ? "bg-red-600"
                                    : "bg-gray-800"
                            } hover:bg-red-700`}
                            onClick={() => handleClick("movie")}
                        >
                            Movies
                        </button>
                        <button
                            className={`py-2 px-4 rounded ${
                                ActiveTab === "tv"
                                    ? "bg-red-600"
                                    : "bg-gray-800"
                            } hover:bg-red-700`}
                            onClick={() => handleClick("tv")}
                        >
                            TV
                        </button>
                        <button
                            className={`py-2 px-4 rounded ${
                                ActiveTab === "person"
                                    ? "bg-red-600"
                                    : "bg-gray-800"
                            } hover:bg-red-700`}
                            onClick={() => handleClick("person")}
                        >
                            Person
                        </button>
                    </div>
                    <form
                        className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            className="w-full bg-slate-800 py-2 pl-10 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                            placeholder="Search for a movie, TV show or person"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {/* search button with netflix theme import Search from lucide react and use it  */}
                        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                            <Search className="size-6" />
                        </button>
                    </form>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchResults.map((res) => {
                        if (!res.poster_path && !res.profile_path) return null;
                        return (
                            <div
                                key={res.id}
                                className="bg-gray-800 p-4 rounded"
                            >
                                {ActiveTab === "person" ? (
                                    <Link
                                        to={"/actor/" + res.name}
                                        className="flex flex-col items-cneter"
                                    >
                                        <img
                                            src={
                                                ORIGINAL_SIZE + res.profile_path
                                            }
                                            alt={res.name}
                                            className="max-h-96 rounded mx-auto"
                                        />
                                        <h2 className="mt-2 text-xl font-bold">
                                            {res.name}
                                        </h2>
                                    </Link>
                                ) : (
                                    <Link
                                        to={"/watch/" + res.id}
                                        className="text-white hover:text-red-600 text-lg font-bold flex flex-col items-cneter"
                                    >
                                        <img
                                            src={
                                                ORIGINAL_SIZE + res.poster_path
                                            }
                                            alt={res.name || res.title}
                                            className="max-h-96 rounded mx-auto"
                                        />
                                        <h2 className="mt-2 text-xl font-bold">
                                            {res.name}
                                        </h2>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default SearchPage;
