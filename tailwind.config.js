/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/views/**/*.edge",         // Adonis templates
    "./resources/js/**/*.{js,jsx,ts,tsx}", // React components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui'),],
}
