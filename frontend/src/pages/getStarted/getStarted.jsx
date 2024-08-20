import Navbar from "../../components/navbar.jsx";
import { useEffect, useState } from "react";
import { FaqQuestions } from "../../components/faqQuestions.jsx";
import { Link } from "react-router-dom";
import api from "../../api/api.jsx";

const GetStarted = () => {
    const [FAQ, setFAQ] = useState([]);
    useEffect(() => {
        api.get("/faq").then((response) => {
            setFAQ(response.data);
        });
    }, []);
    const [email, setEmail] = useState("");
    return (
        <>
            <section className="bg-backdrop bg-[80%]">
                <div className="bg-gradient-to-b from-[#000000eb] to-90% to-transparent h-[100%]">
                    <div className="bg-gradient-to-t from-[#000000d4] to-70% to-transparent h-[100%] ">
                        <Navbar />
                        <div className="flex flex-col gap-[5vw]  md:gap-[2vw] p-[10vw] md:justify-center items-center h-[100%] text-white md:mt-0">
                            <h1 className="md:text-[3vw] mt-[10vw] text-[10vw] font-[400] font-helvetica text-center">
                                Unlimited movies, TV shows and more
                            </h1>
                            <p className="md:text-[1.5vw] text-[6vw] text-center">
                                Watch anywhere. Cancel anytime.
                            </p>
                            <p className="md:text-[1.25vw] text-[5.5vw] md:leading-[2vw] text-center">
                                Ready to watch? Enter your email to create or
                                restart your membership.
                            </p>
                            <div className="flex flex-col md:flex-row justify-center md:m-[1vw] gap-[5vw] md:gap-[0.5vw]">
                                <input
                                    id="getStarted"
                                    type="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="Email Address"
                                    className=" w-[70vw] md:w-[22vw] h-[13vw] md:h-[3.5vw] md:text-[1.5vw] bg-[#1b1b1bb5] outline outline-1 outline-[#ededed72] rounded-md p-[4vw] md:p-[1vw]"
                                />
                                <Link
                                    to={`/signup/${email}`}
                                    id="getStarted"
                                    className="bg-[#ff0000] flex justify-center items-center md:gap-[0.7vw] text-white py-[3vw] px-[5vw] md:p-[0.5vw] rounded-sm md:w-[13vw] md:h-[3.5vw]  md:text-[1.5vw] font-[500] m-auto"
                                >
                                    Get Started
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="md:size-[1.5vw] size-[7vw]"
                                        viewBox="0 0 24 24"
                                        role="img"
                                        data-icon="ChevronRightStandard"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className=" md:h-[0.5vw] h-[2vw] bg-[#232323]" />
            <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center text-white md:py-[4vw] py-[8vw] md:px-[9vw] px-[10vw]">
                <div>
                    <h1 className=" md:text-[3vw] text-[9vw] font-[900] text-center md:text-left">
                        Enjoy on your TV
                    </h1>
                    <h3 className=" text-[6vw] md:text-[1.5vw] text-center leading-6 md:text-left md:leading-8">
                        Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple
                        TV, Blu-ray players and more.
                    </h3>
                </div>
                <div className="relative m-auto">
                    <video
                        src="/TVvideo.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute w-[59vw] md:w-[24.28125vw] top-[21%] md:top-[5.2vw] left-[13%] md:left-[4.4vw]"
                    />
                    <img
                        src="/TV.png"
                        alt="TV"
                        loading="lazy"
                        className="relative md:h-[25vw] md:w-[33.3125vw]"
                    />
                </div>
            </section>
            <div className=" md:h-[0.5vw] h-[2vw] bg-[#232323]" />
            <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center text-white md:py-[4vw] py-[8vw] md:px-[9vw] px-[10vw]">
                <div className="relative m-auto">
                    <img
                        src="/mobile.jpg"
                        alt="TV"
                        loading="lazy"
                        className="relative md:h-[25vw] md:w-[33.3125vw]"
                    />
                    <div className="absolute top-[70%] w-[80vw] h-[20vw] md:w-[20vw] md:h-[4vw] md:left-[20%] flex justify-between items-center bg-black outline outline-white outline-1 rounded-lg p-[4vw] md:py-[3vw] md:px-[1vw]">
                        <img
                            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                            className=" h-[15vw] md:h-[5vw]"
                        />
                        <div>
                            <div>Stranger Things</div>
                            <div className="text-[#0071eb]">Downloading...</div>
                        </div>
                    </div>
                </div>
                <div className="row-start-1 md:col-start-2">
                    <h1 className=" md:text-[3vw] text-[9vw] font-[900] text-center md:text-left">
                        Download your shows to watch offline
                    </h1>
                    <h3 className=" text-[6vw] md:text-[1.5vw] text-center leading-6 md:text-left md:leading-8">
                        Save your favourites easily and always have something to
                        watch.
                    </h3>
                </div>
            </section>
            <div className=" md:h-[0.5vw] h-[2vw] bg-[#232323]" />
            <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center text-white md:py-[4vw] py-[8vw] md:px-[9vw] px-[10vw]">
                <div>
                    <h1 className=" md:text-[3vw] text-[9vw] font-[900] text-center md:text-left">
                        Watch everywhere
                    </h1>
                    <h3 className=" text-[6vw] md:text-[1.5vw] text-center leading-6 md:text-left md:leading-8">
                        Stream unlimited movies and TV shows on your phone,
                        tablet, laptop, and TV.
                    </h3>
                </div>
                <div className="relative m-auto">
                    <video
                        src="/videoDevicees.mp4"
                        autoPlay
                        muted
                        loop
                        className="absolute w-[50vw] md:w-[21.28125vw] top-[8%] md:top-[2.1vw] left-[18%] md:left-[6vw]"
                    />
                    <img
                        src="/device.png"
                        alt="TV"
                        loading="lazy"
                        className="relative md:h-[25vw] md:w-[33.3125vw]"
                    />
                </div>
            </section>
            <div className=" md:h-[0.5vw] h-[2vw] bg-[#232323]" />
            <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center text-white md:py-[4vw] py-[8vw] md:px-[9vw] px-[10vw]">
                <div className="relative m-auto">
                    <img
                        src="/Kids.png"
                        alt="TV"
                        loading="lazy"
                        className="relative md:h-[25vw] md:w-[33.3125vw]"
                    />
                </div>
                <div className="row-start-1 md:col-start-2">
                    <h1 className=" md:text-[3vw] text-[9vw] font-[900] text-center md:text-left">
                        Create profiles for kids
                    </h1>
                    <h3 className=" text-[6vw] md:text-[1.5vw] text-center leading-6 md:text-left md:leading-8">
                        Send children on adventures with their favourite
                        characters in a space made just for them—free with your
                        membership.
                    </h3>
                </div>
            </section>
            <div className=" md:h-[0.5vw] h-[2vw] bg-[#232323]" />
            <section className="flex flex-col gap-[2vw] md:gap-[0.6vw] justify-center items-center text-white p-[2vw]">
                <h1
                    key="1"
                    className=" md:text-[3vw] text-[9vw] font-[900] text-center md:text-left"
                >
                    Frequently Asked Questions
                </h1>
                {/* map oaver FAQ */}
                {FAQ.map((item, index) => (
                    <FaqQuestions item={item} key={index} />
                ))}
                <span className=" md:text-[1.25vw] md:mt-[1vw] md:m-0 m-[3vw] w-[80vw] text-center">
                    Ready to watch? Enter your email to create or restart your
                    membership.
                </span>
                <div className="flex flex-col md:flex-row justify-center md:m-[1vw] gap-[5vw] md:gap-[0.5vw]">
                    <input
                        id="getStarted"
                        type="email"
                        placeholder="Email Address"
                        className=" w-[70vw] md:w-[22vw] h-[13vw] md:h-[3.5vw] md:text-[1.5vw] bg-[#1b1b1bb5] outline outline-1 outline-[#ededed72] rounded-md p-[4vw] md:p-[1vw]"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Link
                        to={`/signup/${email}`}
                        id="getStarted"
                        className="bg-[#ff0000] flex justify-center items-center md:gap-[0.7vw] text-white py-[3vw] px-[5vw] md:p-[0.5vw] rounded-sm md:w-[13vw] md:h-[3.5vw]  md:text-[1.5vw] font-[500] m-auto"
                    >
                        Get Started
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="md:size-[1.5vw] size-[7vw]"
                            viewBox="0 0 24 24"
                            role="img"
                            data-icon="ChevronRightStandard"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default GetStarted;
