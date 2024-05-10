import plugin from 'tailwindcss/plugin'

const rotateY = plugin(({ addUtilities }) => {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
    '.backface-visible': {
      backfaceVisibility: 'visible',
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden',
    },
  })
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
    },
    extend: {},
  },
  plugins: [rotateY],
}
