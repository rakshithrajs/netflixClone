import React, { useEffect, useRef, useState } from "react";
import { useContent } from "../context/useContent";
import api from "../api/api";
import { SMALL_SIZE } from "../utils/constants";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category, key }) => {
    const { contentType } = useContent();
    const [content, setContent] = useState([]);
    const [ShowArrow, setShowArrow] = useState(false);
    const slider = useRef(null);
    useEffect(() => {
        const getContent = async () => {
            try {
                const response = await api.get(
                    `/movie&tv/${contentType}/${category}`
                );
                setContent(response.data.content);
            } catch (error) {
                console.log(error);
            }
        };
        getContent();
    }, [contentType, category]);
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
    const categoryName =
        category.replaceAll("_", " ")[0].toUpperCase() +
        category.replaceAll("_", " ").slice(1);
    const contType = contentType === "movie" ? "Movie" : "Tv Shows";
    return (
        <div
            className="bg-black relative px-5 md:px-20"
            onMouseEnter={() => setShowArrow(true)}
            onMouseLeave={() => setShowArrow(false)}
            key={key}
        >
            <h2 className="mb-4 text-2xl font-bold">
                {categoryName} {contType}
            </h2>
            <div
                className="flex space-x-4 overflow-x-scroll scrollbar-hide"
                ref={slider}
            >
                {content.map((f) => (
                    <Link
                        to={`/watch/${f.id}`}
                        className="min-w-[250px] relative group"
                    >
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={SMALL_SIZE + f.backdrop_path}
                                alt="img"
                                className="transition-transform duration-300 group-hover:scale-125"
                            />
                        </div>
                        <p className="mt-2 text-center">{f.title || f.name}</p>
                    </Link>
                ))}
            </div>
            {ShowArrow && (
                <>
                    <button
                        className=" absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                        onClick={() => {
                            scrollLeft();
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className=" absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                        onClick={() => {
                            scrollRight();
                        }}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default MovieSlider;
