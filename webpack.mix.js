const mix = require('laravel-mix');

mix
  .js('src/madrone.js', 'dist')
  .postCss('src/madrone.css', 'dist', [
    require('tailwindcss'),
    require('autoprefixer')
  ])
  .options({
    processCssUrls: false
  });
