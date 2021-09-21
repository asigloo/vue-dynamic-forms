// tailwind.config.js
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.ts',
    './demos/**/*.html',
    './demos/**/*.vue',
    './demos/**/*.md',
    './demos/**/*.ts',
    './docs/**/*.html',
    './docs/**/*.vue',
    './docs/**/*.ts',
  ],
  theme: {
    fontFamily: {
      display: ['Montserrat'],
      sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont'],
      serif: ['Montserrat', 'Georgia', 'Cambria'],
    },
    extend: {
      colors: {
        marine: '#2B3846',
        salmon: '#EC6B5E',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    // Other plugins
    require('tailwindcss-animatecss')({
      classes: [
        'animate__animated',
        'animate__fadeInUp',
        'animate__bounceIn',
        'animate__fadeOutDown',
      ],
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
      variants: ['responsive', 'hover', 'reduced-motion'],
    }),
  ],
}
