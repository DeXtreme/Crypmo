module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      mont: ['Montserrat', 'sans-serif']
    },
    extend: {
      colors: {
        primary: "#082032",
        secondary: '#2C394B',
        tetiary: '#334756',
        accent: "#FF4C29",
        chart: "#131722"
      },
      animation: {
        dropin: "dropin 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1 forwards",
      },
      keyframes: {
        dropin: {
          "0%": {
            transform: "translateY(-20px)",
            opacity: 0
          },
          "100%": {
            opacity: 1,
            transform: "translateY(30px)"
          }
        }
      }
    },
  },
  plugins: [],
}
