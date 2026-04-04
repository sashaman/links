/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#282a36',
        selection: '#44475a',
        comment: '#6272a4',
        purple: '#bd93f9',
        white: '#f8f8f2',
        pink: '#ff79c6',
      },
      fontFamily: {
        sans: ['Fira Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};