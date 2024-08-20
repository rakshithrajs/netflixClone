import React from "react";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import Home from "./getStarted/home.jsx";
import GetStarted from "./getStarted/getStarted.jsx";

const HomePage = () => {
    const { user } = useAuthContext();
    
    if (user) {
        return <Home />;
    } else {
        return <GetStarted />;
    }
};

export default HomePage;
