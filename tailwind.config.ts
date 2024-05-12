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
      sm: { max: '450px' },
      lg: { max: '940px' },
    },
    extend: {},
  },
  plugins: [rotateY],
}
