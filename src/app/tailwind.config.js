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
        poptop: "poptop 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite",
        popleft: "popleft 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite",
        popright: "popright 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite",
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
        },
        poptop : {
          "0%":{
              transform: "translateY(0px)",
              fill: "white"
          },
          "10%,20%":{
              transform: "translateY(-35px)",
              fill: "#FF4C29"
          },
          "30%,100%":{
              transform: "translateY(0px)",
              fill: "white"
          }
        }, 
        popleft:{
          "0%,30%":{
              transform: "translate3d(0px, 0px, 0px)",
              fill: "white"
          },
          "40%,50%":{
              transform: "translate3d(-35px, 35px, 0px)",
              fill: "#FF4C29"
          },
          "60%,100%":{
              transform: "translate3d(0px, 0px, 0px)",
              fill: "white"
          }
        },
        popright:{
          "0%,60%":{
              transform: "translate3d(0px, 0px, 0px)",
              fill: "white"
          },
          "70%,80%":{
              transform: "translate3d(35px, 35px, 0px)",
              fill: "#FF4C29"
          },
          "90%,100%":{
              transform: "translate3d(0px, 0px, 0px)",
              fill: "white"
          }
        }
      }
    },
  },
  plugins: [],
}
