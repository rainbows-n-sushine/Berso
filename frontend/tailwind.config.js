module.exports = {
  content: ["./App.{js,jsx,ts,tsx}"],
  content: ["./App.{js,jsx,ts,tsx}", "./assets/**/*.{js,jsx,ts,tsx}"],
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
