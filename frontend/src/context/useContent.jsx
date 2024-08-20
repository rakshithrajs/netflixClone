import { createContext, useContext, useState } from "react";

const ContentContext = createContext();

const ContentProvider = ({ children }) => {
    const [contentType, setContentType] = useState("movie");

    const setContent = (type) => {
        setContentType(type);
    };

    return (
        <ContentContext.Provider value={{ contentType, setContent }}>
            {children}
        </ContentContext.Provider>
    );
};

const useContent = () => {
    return useContext(ContentContext);
};

export { ContentProvider, useContent };
