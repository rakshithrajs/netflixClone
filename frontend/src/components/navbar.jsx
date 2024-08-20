import { Link, useNavigate } from "react-router-dom";
import logo from "/netflix.svg";
import search from "/search.svg";
import logoutSVG from "/logout.svg";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout.jsx";
import { useContent } from "../context/useContent.jsx";
import { ChevronDown, Triangle } from "lucide-react";

const Navbar = () => {
    const { contentType, setContent } = useContent();
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <nav className="absolute w-full flex md:p-[1.7vw] p-[7vw] justify-between items-center z-50 h-fit text-white">
            <div className="flex justify-around gap-[4vw]">
                <Link to="/">
                    <img
                        src={logo}
                        alt="Netflix Logo"
                        className="md:ml-[10%] ml-[2%] md:h-[2.5vw] h-[7vw] md:w-[9vw]"
                    />
                </Link>
                {user && (
                    <div className="hidden sm:flex gap-[2vw] items-center">
                        <Link
                            to="/"
                            className="hover:underline"
                            onClick={() => {
                                setContent("movie");
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/"
                            className="hover:underline"
                            onClick={() => {
                                setContent("movie");
                            }}
                        >
                            Movies
                        </Link>
                        <Link
                            to="/"
                            className="hover:underline"
                            onClick={() => {
                                setContent("tv");
                            }}
                        >
                            Tv Shows
                        </Link>
                        <Link to="/history" className="hover:underline">
                            Search History
                        </Link>
                    </div>
                )}
                <div className="flex md:hidden gap-[2vw] items-center">
                    <button
                        className="flex gap-[1vw] items-center justify-center"
                        onClick={toggleMobileMenu}
                    >
                        Menu <ChevronDown className="mt-1" />
                    </button>
                </div>
                {isMobileMenuOpen && (
                    <>
                        <div className="sm:hidden absolute top-[70%] left-[35%] w-fit z-50 bg-black border rounded border-gray-800">
                            <hr className="h-[0.2vw] bg-white" />
                            <Link
                                to={"/"}
                                className="block hover:underline p-2"
                                onClick={() => {
                                    setContent("movie");
                                }}
                            >
                                Home
                            </Link>
                            <Link
                                to={"/"}
                                className="block hover:underline p-2"
                                onClick={() => {
                                    setContent("movie");
                                }}
                            >
                                Movies
                            </Link>
                            <Link
                                to={"/"}
                                className="block hover:underline p-2"
                                onClick={() => {
                                    setContent("tv");
                                }}
                            >
                                Tv Shows
                            </Link>
                            <Link
                                to={"/history"}
                                className="block hover:underline p-2"
                            >
                                Search History
                            </Link>
                        </div>
                    </>
                )}
            </div>
            {user && (
                <div className="flex flex-row gap-[2vw]">
                    <Link to="/search" className="hover:underline">
                        <img src={search} alt="" className=" invert" />
                    </Link>
                    <img
                        src={user.image}
                        alt="Avatar"
                        className="h-8 rounded cursor-pointer"
                    />
                    <img
                        src={logoutSVG}
                        alt="Logout"
                        className="size-6 invert cursor-pointer"
                        onClick={() => {
                            logout();
                        }}
                    />
                </div>
            )}
            {!user && (
                <div className=" text-[4.3vw] md:text-[1.2vw] flex justify-center items-center rounded-sm bg-[#E50914] md:px-[1vw] px-[4vw] py-[1.5vw] md:p-[0.5vw] mr-[2%] md:mr-[10%]">
                    <Link
                        to={"/login"}
                        className="text-white font-bold my-[0vw]"
                    >
                        Sign In
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
