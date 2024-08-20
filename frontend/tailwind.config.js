import tailwindScrollbarHide from "tailwind-scrollbar-hide";
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                backdrop: `url(/backdrop.jpg)`,
                leo: `url(/Leo.jpg)`,
            },
            fontFamily: {
                netflix: {
                    "font-family": "Netflix Sans, sans-serif",
                },
                helvetica: {
                    "font-family": "Helvetica, sans-serif",
                },
            },
        },
    },
    plugins: [tailwindScrollbarHide],
};
