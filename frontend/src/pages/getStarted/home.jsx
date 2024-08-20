import React, { useState } from "react";
import { Play, Info } from "lucide-react";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import useTrendingContent from "../../hooks/useTrendingContent";
import {
    MOVIE_CATEGORIES,
    ORIGINAL_SIZE,
    TV_CATEGORIES,
} from "../../utils/constants.jsx";
import Loader from "../../components/loader.jsx";
import { useContent } from "../../context/useContent.jsx";
import MovieSlider from "../../components/movieSlider.jsx";

const Home = () => {
    const [imgLoading, setImgLoading] = useState(true);
    const { trendingContent } = useTrendingContent();
    const { contentType } = useContent();

    if (!trendingContent)
        return (
            <>
                <div className="h-screen text-white relative">
                    <Navbar />
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-
            1/2 -translate-y-1/2"
                    >
                        <Loader />
                    </div>
                </div>
            </>
        );

    return (
        <>
            <div className="relative h-screen text-white">
                <Navbar />
                {imgLoading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
                )}
                <img
                    src={ORIGINAL_SIZE + trendingContent?.backdrop_path}
                    alt="Hero img"
                    className="absolute top-0 left-0 w-full h-full object-cover -z-50"
                    onLoad={() => {
                        setImgLoading(false);
                    }}
                />

                <div
                    className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
                    aria-hidden="true"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
                    <div
                        className="bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10"
                    />

                    <div className="max-w-2xl">
                        <h1 className="mt-4 text-6xl font-extrabold text-balance">
                            {trendingContent?.title || trendingContent?.name}
                        </h1>
                        <p className="mt-2 text-lg">
                            {trendingContent?.release_date?.split("-")[0] ||
                                trendingContent?.first_air_date?.split(
                                    "-"
                                )[0]}{" "}
                            | {trendingContent?.adult ? "18+" : "PG-13"}
                        </p>

                        <p className="mt-4 text-lg">
                            {trendingContent?.overview.length > 200
                                ? trendingContent?.overview?.slice(0, 200) +
                                  "..."
                                : trendingContent?.overview}
                        </p>
                    </div>
                    <div className="flex mt-8">
                        <Link
                            to={`/watch/${trendingContent?.id}`}
                            className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
                        >
                            <Play className="size-6 mr-2 fill-black" />
                            Play
                        </Link>
                        <Link
                            to={`/watch/${trendingContent?.id}`}
                            className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
                        >
                            <Info className="size-6 mr-2" />
                            More Info
                        </Link>
                    </div>
                </div>
            </div>
            <div className="fles flex-col gap-10 bg-black py-10 text-white">
                {contentType === "movie"
                    ? MOVIE_CATEGORIES.map((cat, index) => (
                          <MovieSlider key={index} category={cat} />
                      ))
                    : TV_CATEGORIES.map((cat, index) => (
                          <MovieSlider key={index} category={cat} />
                      ))}
            </div>
        </>
    );
};

export default Home;
