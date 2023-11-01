import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'darkbg':'#202124',
        'darkSearchBar':'#525355',
        'darkActiveText':'#EAEAEB',
        'darkInactiveIcon':'#9AA0A6',
        'darkLeftBarText':'#E8EAED',
        'darkHoverCircle':'#353638',
        'darkFocusOption':'#41331C',
        'darkPlaceHolder':'#B6B6B7',
      },
      fontSize: {
        'autoMax': 'clamp(16px, 1vw, 32px)' // Define the range of font sizes using clamp()
      }
    },
  
  },
  plugins: [],
}
export default config
