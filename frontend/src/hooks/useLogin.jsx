import { useState } from "react";
import { useAuthContext } from "./useAuthContext.jsx";
import api from "../api/api.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const login = async (email, password) => {
        setError(null);
        setLoading(true);
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            navigate("/");
            dispatch({ type: "LOGIN", payload: response.data });
            toast.success("Loogged in Successfully");
            setLoading(false);
        } catch (error) {
            setError(error.response.data.error);
            toast.error(error.response.data.error);
            setLoading(false);
        }
    };
    return { login, loading, error };
};
