# OSU Drupal Theme Madrone

## Requirements

- Node 12+
- Yarn 1.22+
- PHP 7.3+
- Docker (or other container running software Podman, RunC, CRun, etc...)

## Get Started

### To get up and running with Madrone on OSU Drupal

- Clone this repository
- Run yarn install
- docker-compose up -d (If using docker)

  - wait for the Database to be up ready.

    `docker-compose logs database --follow`

- Install Drupal
  - http://drupal.dev.oregonstate.edu:8080/install.php
  - Select the Standard install profile.
- Setup Madrone Theme
  - Go to Appearance `http://drupal.dev.oregonstate.edu:8080/admin/appearance`
  - Click 'Install and set as default' for Madrone Theme
  - Go to Block layout to move blocks appropriately
    - Move Search into Header
    - Move Main Navigation into Header
    - Header block order goes:
      - Site Branding
      - Main navigation
      - Search
    - Save
    - Configure Main navigation block
      - Change "Number of levels to display" from 1 to 2
      - Check "Expand all menu items"
      - Save
- Disable css/js aggregation and page cache.
  - http://drupal.dev.oregonstate.edu:8080/admin/config/development/performance
  - Uncheck:
    - Aggregate CSS files
    - Aggregate JavaScript files
  - Save configuration
    http://drupal.dev.oregonstate.edu:8080

## Tailwind Configuration

Configuration changes to how tailwind builds the asset file can be found in `tailwind.config.js`. Tailwind styles are assembled along with our changes and additions from `src/madrone.css`. If there is no Drupal Twig Template for a component to style, we can add our CSS targeting in the source madrone.css file. Look to the bottom of the file for examples of how we achieve this.

### Rebuilding TailwindCSS assets

For unminified `yarn dev`

For minified `yarn prod`

## Developer Experience

- Run `yarn watch` this task will automatically compile madrone.css (unminified) when you make changes.
- When logged in, you typically need to run admin -> flush all caches when changing template files. This menu shows up under the drupal icon of nice menus
