/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      'xsm': '500px',
      // => @media (min-width: 400px) { ... }

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

      '3xl': '1920px',
      // => @media (min-width: 1920px) { ... }

      '4xl': '2560px',
      // => @media (min-width: 2560px) { ... }
    },
    extend: {
      backgroundImage: {
        'close-btn': "url('https://cdn-icons-png.flaticon.com/512/1828/1828778.png')",
        'menu-btn': "url('https://cdn-icons-png.flaticon.com/512/1828/1828859.png')",
        'search-btn': "url('https://cdn-icons-png.flaticon.com/512/622/622669.png')",
      },
      keyframes: {
        sideBarIn: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        sideBarOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        popDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0  },
          '40%': { transform: 'translateY(0%)', opacity: 1 },
          '100%': { transform: 'translateY(0%)', opacity: 1 },
        },
        loadingGame: {
          '0%': {  opacity: 1  },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        sideBarIn: "sideBarIn .4s ease forwards",
        sideBarOut: "sideBarOut .4s ease forwards",
        popDown: "popDown 1.2s ease 2 alternate",
        loadingGame: "loadingGame .3s .3s ease",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('flowbite/plugin'),
  ],
}
