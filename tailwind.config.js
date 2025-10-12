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
      backgroundImage: {
        'gradient-radial' : 'radial-gradient(var(--tx-gradient-stops))',
        'gradient-linear' : 'linear-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [require('daisyui'),],
}
