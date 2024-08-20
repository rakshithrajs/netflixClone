import { useState } from "react";
import { useAuthContext } from "./useAuthContext.jsx";
import api from "../api/api.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const signup = async (username, email, password) => {
        setError(null);
        setLoading(true);
        try {
            const response = await api.post("/auth/signup", {
                username,
                email,
                password,
            });
            dispatch({ type: "SIGNUP", payload: response.data });
            toast.success("Signed In successfully");
            navigate("/");
            setLoading(false);
        } catch (error) {
            setError(error.response.data.error);
            toast.error(error.response.data.error);
            console.log(error);
            setLoading(false);
        }
    };
    return { signup, loading, error };
};
