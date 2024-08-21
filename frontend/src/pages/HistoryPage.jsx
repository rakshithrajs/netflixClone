import React, { useEffect, useState } from "react";
import api from "../api/api.jsx";
import { SMALL_SIZE } from "../utils/constants.jsx";
import { Trash } from "lucide-react";
import { toast } from "react-hot-toast";

function FormatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-UK", options);
}

const HistoryPage = () => {
    const [SearchHistory, setSearchHistory] = useState([]);
    useEffect(() => {
        const getHistory = async () => {
            try {
                const res = await api.get(`/search/history`);
                setSearchHistory(res.data.data);
            } catch (error) {
                console.log(error);
                setSearchHistory([]);
            }
        };
        getHistory();
    }, []);
    const handleDelete = async (item) => {
        try {
            console.log(item.id);
            const res = await api.delete(`/search/history/${item.id}`);
            setSearchHistory(SearchHistory.filter((i) => item.id !== i.id));
        } catch (error) {
            toast.error("unable to delete history please try again later");
        }
    };
    if (SearchHistory?.length === 0) {
        return (
            <>
                <div className="h-[5vw]" />
                <div className="text-center text-2xl font-bold text-gray-600">
                    No search history
                </div>
            </>
        );
    }
    return (
        <div className="text-white min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="h-[5vw]" />
                <h1 className="text-3xl font-bold mb-8">Search History</h1>
                <div className="grid grdi-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SearchHistory.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded p-4 flex items-start shadow-md"
                        >
                            <img
                                src={SMALL_SIZE + item.image}
                                alt={item.name}
                                className="size-16 object-cover rounded-full mr-4"
                            />
                            <div className="flex flex-col">
                                <h2 className="text-lg font-bold">
                                    {item.title}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {FormatDate(item.createdAt)}
                                </p>
                            </div>
                            <span
                                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                                    item.searchType === "movie"
                                        ? "bg-red-600"
                                        : item.searchType === "tv"
                                        ? "bg-blue-600"
                                        : "bg-green-600"
                                }`}
                            >
                                {item.searchType}
                            </span>
                            <Trash
                                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                                onClick={() => {
                                    handleDelete(item);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
