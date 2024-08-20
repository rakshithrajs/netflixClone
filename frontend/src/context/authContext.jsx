import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import api from "../api/api.jsx";

export const authContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGNUP":
            return { ...state, user: action.payload };
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });
    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await api.get("/auth/authCheck");
                if (response.data.user) {
                    dispatch({ type: "LOGIN", payload: response.data.user });
                }
            } catch (error) {
                console.log(error);
            }
        };
        authCheck();
    }, []);
    console.log("authContext state:", state);
    return (
        <authContext.Provider value={{ ...state, dispatch }}>
            {children}
        </authContext.Provider>
    );
};
