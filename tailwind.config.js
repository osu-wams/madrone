module.exports = {
  prefix: 'tw-',
  separator: '-',
  important: false,
  purge: {
    enabled: true,
    content: [
      'config/**/*.yml',
      'templates/**/*.twig',
      'src/*.pcss',
      'src/**/*.pcss',
      'src/*.js',
      'src/**/*.js'
    ]
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      osuorange: '#d73f09',
      paddletailblack: '#000',
      bucktoothwhite: '#fff',
      neutral: {
        100: '#f7f5f5',
        200: '#e9e5e4',
        300: '#d4cfcd',
        400: '#b7b1af',
        500: '#8f8582',
        550: '#7b746f',
        600: '#696361',
        700: '#423e3c',
        800: '#2e2b2a',
        900: '#1f1d1c'
      },
      lava: {
        100: '#ffdedf',
        200: '#ee878a',
        300: '#e54349',
        400: '#c72127',
        500: '#a7262b',
        600: '#8c0e13',
        700: '#590003'
      },
      luminance: {
        100: '#fff2d5',
        200: '#fddb8b',
        300: '#ffce57',
        400: '#ffb500',
        500: '#e59900',
        600: '#d3832b',
        700: '#915513'
      },
      pine: {
        100: '#edf3e3',
        200: '#c4d6a4',
        300: '#73a663',
        400: '#4a773c',
        500: '#3c692e',
        600: '#254a1a',
        700: '#142e0c'
      },
      rogue_wave: {
        100: '#ecf5f6',
        200: '#b8dde1',
        300: '#20a6bd',
        400: '#00859b',
        500: '#007082',
        600: '#0d5257',
        700: '#043033'
      },
      stratosphere: {
        100: '#ecf1f4',
        200: '#c6dae7',
        300: '#2490b5',
        400: '#006a8e',
        500: '#005875',
        600: '#003b5c',
        700: '#002235'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        stratum2web: ['Stratum2WebBold', 'sans-serif']
      },
      fontSize: {
        xxs: '11px',
        med: '16px'
      },
      flex: {
        '2': '2 1 0%',
        '3': '3 1 0%',
        '4': '4 1 0%'
      },
      gridAutoRows: {
        minmax100: 'minmax(0, 100px)'
      },
      gridTemplateRows: {
        layout: 'repeat(10, minmax(0, 100px))',
        'header-mobile': '96px'
      },
      gridTemplateColumns: {
        header: '[site-branding-start] 1fr [site-branding-end main-menu start] 1.2fr [main-menu-end search start] auto [search-end]',
        'secondary-nav': '23rem [group-title-start] 1fr [group-title-end group-menu-start] 2fr [group-menu-end] 12.8rem',
        'header-mobile': '5.5rem repeat(6, minmax(0, 1fr)) 5rem'
      },
      inset: {
        '25': '25%',
        '20vw': '20vw',
        menu: '11.125rem'
      },
      height: {},
      opacity: {
        '0': '0',
        '100': '1',
      },
      width: {
        '81.2': '21.2rem',
        '81.5': '21.5rem'
      }
    }
  },
  variants: {
    transitionProperty: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: []
};
