/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgHome': "url('/src/assets/bg-home.png')",
        'bgQuestions': "url('/src/assets/bg-bg-questions.jpg')",
        'bgResults': "url('url('/src/assets/bg-results.png')')",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"]
      },
       colors: {
        'blue-1000': '#210568',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
        }
      },
    },
  },
  plugins: [],
}