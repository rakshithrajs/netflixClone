import React, { useEffect, useState } from "react";
import { useContent } from "../context/useContent";
import api from "../api/api.jsx";

const useTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null);
    const { contentType } = useContent();
    useEffect(() => {
        const getTrendingContent = async () => {
            const response = await api.get(`/movie&tv/${contentType}/trending`);
            setTrendingContent(response.data.content);
        };
        getTrendingContent();
    }, [contentType]);
    return { trendingContent };
};

export default useTrendingContent;
