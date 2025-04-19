module.exports = {
  content:[
      "./App.{js,jsx,ts,tsx}",
  "./assets/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./Pages/**/*.{js,jsx,ts,tsx}",
  "./context/**/*.{js,jsx,ts,tsx}",
  "./util/**/*.{js,jsx,ts,tsx}",
  ],
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
