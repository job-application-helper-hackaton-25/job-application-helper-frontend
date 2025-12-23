/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./*/*.html",
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/line-clamp")]
}

