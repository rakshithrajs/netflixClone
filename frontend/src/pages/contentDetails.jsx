import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useContent } from "../context/useContent";
import api from "../api/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_SIZE, SMALL_SIZE } from "../utils/constants.jsx";
import WatchPageSkeleton from "../components/WatchPageSkeleton.jsx";

function FormatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-UK", options);
}

const contentDetails = () => {
    const { id } = useParams();
    const [trailers, setTrailers] = useState([]);
    const [CurrentTrailerIndex, setCurrentTrailerIndex] = useState(0);
    const [Loading, setLoading] = useState(true);
    const [Content, setContent] = useState({});
    const [SimilarContent, setSimilarContent] = useState([]);
    const slider = useRef(null);
    const { contentType } = useContent();
    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await api.get(
                    `/movie&tv/${contentType}/${id}/trailer`
                );
                setTrailers(res.data.content);
            } catch (error) {
                if (error.message.includes("404")) {
                    setTrailers([]);
                }
            }
        };
        getTrailers();
    }, [contentType, id]);
    useEffect(() => {
        const getSimilar = async () => {
            try {
                const res = await api.get(
                    `/movie&tv/${contentType}/${id}/similar`
                );
                setSimilarContent(res.data.content);
            } catch (error) {
                if (error.message.includes("404")) {
                    setSimilarContent([]);
                }
            }
        };
        getSimilar();
    }, [contentType, id]);
    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await api.get(
                    `/movie&tv/${contentType}/${id}/details`
                );
                setContent(res.data.content);
            } catch (error) {
                if (error.message.includes("404")) {
                    setContent(null);
                }
            } finally {
                setLoading(false);
            }
        };
        getContentDetails();
    }, [contentType, id]);
    const handlePrev = () => {
        if (CurrentTrailerIndex > 0) {
            setCurrentTrailerIndex(CurrentTrailerIndex - 1);
        }
    };
    const handleNext = () => {
        if (CurrentTrailerIndex < trailers?.length - 1) {
            setCurrentTrailerIndex(CurrentTrailerIndex + 1);
        }
    };
    const scrollLeft = () => {
        if (slider.current) {
            slider.current.scrollTo({
                left: slider.current.scrollLeft - slider.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (slider.current) {
            slider.current.scrollTo({
                left: slider.current.scrollLeft + slider.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };
    if (Loading)
        return (
            <div className="min-h-screen p-10">
                <WatchPageSkeleton />
            </div>
        );
    if (!Content) {
        return (
            <div className="min-h-screen p-10">
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-3xl font-bold text-gray-600">
                        No Content Found
                    </h1>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="h-[5vw]" />
            <div className="text-white min-h-screen">
                <div className="mx-auto container px-4 py-2 h-full">
                    <div className="aspect-auto mb-8 p-2 sm:px-10 md:px-32">
                        {trailers?.length > 0 && (
                            <ReactPlayer
                                controls={true}
                                width={"100%"}
                                height={"70vh"}
                                className="mx-auto overflow-hidden rounded-lg"
                                url={`https://www.youtube.com/watch?v=${trailers[CurrentTrailerIndex].key}`}
                            />
                        )}
                        {!trailers?.length > 0 && (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-2xl text-white">
                                    No Trailers Available
                                </p>
                            </div>
                        )}
                        {trailers?.length > 0 && (
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                                        CurrentTrailerIndex === 0
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                    disabled={CurrentTrailerIndex === 0}
                                >
                                    <ChevronLeft
                                        size={24}
                                        onClick={handlePrev}
                                    />
                                </button>
                                <button
                                    className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                                        CurrentTrailerIndex ===
                                        trailers?.length - 1
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                    disabled={
                                        CurrentTrailerIndex ===
                                        trailers?.length - 1
                                    }
                                >
                                    <ChevronRight
                                        size={24}
                                        onClick={handleNext}
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-5xl font-bold text-balance">
                                {Content?.title || Content?.name}
                            </h2>
                            <p className="mt-2 text-lg">
                                {FormatDate(
                                    Content?.release_date ||
                                        Content?.first_air_date
                                )}{" "}
                                |{" "}
                                {Content?.adult ? (
                                    <span className="text-red-500">18+</span>
                                ) : (
                                    <span className="text-green-500">
                                        PG - 13
                                    </span>
                                )}
                            </p>
                            <p className="mt-4 text-lg">{Content?.overview}</p>
                        </div>
                        <img
                            src={ORIGINAL_SIZE + Content?.poster_path}
                            alt="poster"
                            className=" max-h-[600px] rounded-md"
                        />
                    </div>
                    {SimilarContent?.length > 0 && (
                        <div className="mt-12 max-w-5xl mx-auto relative">
                            <h3 className="text-3xl font-bold mb-4">
                                Similar Movies/ TV Shows
                            </h3>
                            <div
                                className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
                                ref={slider}
                            >
                                {SimilarContent.map((item, index) => {
                                    if (item.poster_path === null) return null;
                                    return (
                                        <Link
                                            to={`/watch/${item.id}`}
                                            key={index}
                                            className="w-52 flex-none"
                                        >
                                            <img
                                                src={
                                                    SMALL_SIZE +
                                                    item.poster_path
                                                }
                                                alt="poster"
                                                className="w-full h-auto rounded-md"
                                            />
                                            <div className=" bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-0 transition duration-300">
                                                <p className="text-lg text-white p-2">
                                                    {item.title || item.name}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                                <button
                                    className="absolute flex justify-center items-center top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                                    onClick={() => {
                                        scrollLeft();
                                    }}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    className="absolute flex justify-center items-center top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full"
                                    onClick={() => {
                                        scrollRight();
                                    }}
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default contentDetails;
