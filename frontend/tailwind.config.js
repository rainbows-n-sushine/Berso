<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./assets/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
=======
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}"],
  content: ["./App.{js,jsx,ts,tsx}", "./assets/**/*.{js,jsx,ts,tsx}"],
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
  theme: {
    extend: {},
    height: {
      100: "36rem",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
      berlin: "Berlin Sans",
    },
  },
  plugins: [],
};
