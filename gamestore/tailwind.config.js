/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'close-btn': "url('https://cdn-icons-png.flaticon.com/512/1828/1828778.png')",
        'menu-btn': "url('https://cdn-icons-png.flaticon.com/512/1828/1828859.png')",
      },
      keyframes: {
        sideBarIn: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        sideBarOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        sideBarIn: "sideBarIn .4s ease",
        sideBarOut: "sideBarOut .4s ease",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
