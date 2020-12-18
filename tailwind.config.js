module.exports = {
  prefix: "tw-",
  separator: "-",
  important: false,
  theme: {
    extend: {
      colors: {
        osuorange: "#d73f09",
        paddletailblack: "#000",
        bucktoothwhite: "#fff",
        neutral: {
          100: "#f7f5f5",
          200: "#e9e5e4",
          300: "#d4cfcd",
          400: "#b7b1af",
          500: "#8f8582",
          550: "#7b746f",
          600: "#696361",
          700: "#423e3c",
          800: "#2e2b2a",
          900: "#1f1d1c"
        }
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        stratum2web: ["Stratum2WebBold", "sans-serif"]
      },
      flex: {
        "2": "2 1 0%",
        "3": "3 1 0%",
        "4": "4 1 0%"
      },
      inset: {
        "25": "25%",
        "20vw": "20vw",
        menu: "11.125rem"
      },
      width: {
        "81.2": "21.2rem",
        "81.5": "21.5rem"
      },
      height: {}
    }
  },
  variants: {
    transitionProperty: ["responsive", "motion-safe", "motion-reduce"]
  },
  plugins: []
};
