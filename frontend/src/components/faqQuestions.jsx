import { useState } from "react";

export const FaqQuestions = (item, key) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <div
                key={key}
                className="bg-[#363636] flex justify-between items-center md:w-[80%] w-[70%] md:h-[4vw] p-[2.4vw] cursor-pointer"
                onClick={() => {
                    setVisible(!visible);
                }}
            >
                <h1 className="md:text-[1.5vw]">{item.item.question}</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    role="img"
                    data-icon="PlusStandard"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
            <div
                key={item.id}
                className={`bg-[#363636] flex justify-between items-center md:w-[80%] w-[70%] p-[2.4vw] cursor-pointer ${
                    !visible && "hidden"
                }`}
            >
                {item.item.answer}
            </div>
        </>
    );
};
