import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin.jsx";

const loginPage = () => {
    const navigate = useNavigate();
    const { login } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };
    return (
        <div className="bg-backdrop h-[100vh]">
            <Navbar />
            <div className="bg-gradient-to-b from-[#000000eb] to-90% to-transparent h-[100%] flex items-center">
                <div className="max-w-sm sm:max-w-md m-auto my-5 py-10 px- sm:py-16 sm:px-16 bg-black bg-opacity-80 text-white rounded-md">
                    <form action="" onSubmit={handleSubmit}>
                        <h3 className="text-4xl font-bold mb-8"> Log In </h3>
                        <input
                            type="email"
                            value={email}
                            className=" block w-full mt-4 py-3.5 px-5 bg-[#333] focus:bg-[#454545] rounded focus:outline-0 focus:ring-0 focus:border-none border-none placeholder:text-[#8c8c8c]"
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <input
                            autoComplete="true"
                            type="password"
                            className=" block w-full mt-4 py-3.5 px-5 bg-[#333] focus:bg-[#454545] rounded focus:outline-0 focus:ring-0 focus:border-none placeholder:text-[#8c8c8c] border-none "
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <input
                            type="submit"
                            value="Sign Up"
                            className="py-3.5 mt-8 bg-[#e50914] text-center block w-full rounded hover:cursor-pointer font-bold text-lg"
                        />
                        <div className="pt-3 text-gray-500 text-lg">
                            Don't have a Netflix account?{" "}
                            <Link
                                to={"/signup"}
                                className="hover:underline hover:cursor-pointer text-white font-semibold"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default loginPage;
