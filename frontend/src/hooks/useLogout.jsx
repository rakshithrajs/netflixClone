import toast from "react-hot-toast";
import api from "../api/api";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const logout = async () => {
        await api
            .post("/auth/logout")
            .then(() => {
                dispatch({ type: "LOGOUT", payload: null });
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                set({ isLoggingOut: false });
                toast.error(error.response.data);
            });
    };
    return { logout };
};
