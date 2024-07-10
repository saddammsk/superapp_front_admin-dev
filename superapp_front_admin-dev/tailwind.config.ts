import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        gray: {
          1000: '#EBEEF3',
          2000: '#9A9A9A',
          3000: '#F4F4F4',
          4000: '#6C6C6C',
          5000: '#EEEFF2',
          6000: '#F9F9F9',
          7000: '#E9EBEC',
          8000: '#E9E9E9',
          9000:'#D9D9D9',
          10000:'#F6F6F6',
          11000:'#747474',
          12000: '#ABACC5',
          13000: '#F3F3F3',
          14000: '#A6A6A6',
          15000: '#C3C3C3',
          16000: '#85869e',
          17000: '#535353',
          18000: '#f8f8f8',
        },
        green:{
          1000: '#359765',
          2000: '#0CAF60',
          3000: '#0caf60',
        },
        black:{
          1000: '#1C1C1C',
          2000: '#4F4F4F',
          3000: '#232323',
          4000: '#111827',
          5000: '#1F2023',
          6000: '#18191B',
        },
        yellow:{
          1000: '#EDCB50',
        },
        red:{
          1000: '#E03137',
        },
        blue:{
          1000: '#273444',
          2000: '#0093E8',
        },
        purple:{
          800: '#6c7ae0',
          1000: '#6247CD',
          2000: '#6247cd0d',
        },
        error: '#E03137',
        completed: '#0CAF60',
        rejected: '#E03137',
        toBeCORRECTED: '#FF9800',
        corrected: '#03A9F4',
        assigned: '#6247CD',
      }, screens: {
        'xs': '320px',
        'xss': '375px',
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px',
        '3xl': '1600px',
      },
      fontFamily:{
        'dm-sans': "var(--dm-sans)",
        'inter': "var(--inter)",
      },
      fontSize:{
        '15': ['15px', '22px'],
        '13': ['13px', '16.9px'],
      },



    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
