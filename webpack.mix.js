const mix = require('laravel-mix');

mix
  .js('src/madrone.js', 'dist')
  .postCss('src/madrone.pcss', 'dist', [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-preset-env')({ stage: 1 }),
  ])
  .options({
    processCssUrls: false
  });
