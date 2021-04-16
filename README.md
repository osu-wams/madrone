# OSU Drupal Theme Madrone

## Requirements

- Node 14+
- Yarn 1.22+ - https://yarnpkg.com/getting-started/install
- PHP 7.4+
- Composer - https://getcomposer.org/
- Docker (or other container running software Podman, RunC, CRun, etc...)

## Get Started

### To get up and running with Madrone on OSU Drupal

- Clone this repository
- Run `composer install`
- Run `yarn install`
- docker-compose up -d (If using docker)

  - wait for the Database to be up ready.

    ```shell
    docker-compose logs database --follow
    ```

- Install Drupal
  - http://localhost.oregonstate.edu:8080/install.php
  - Select the OSU Standard Installation profile (should already be used as it's
    a distribution now.)
- Disable css/js aggregation and page cache.
  - In Web Interface
    - http://localhost.oregonstate.edu:8080/admin/config/development/performance
    - Set Max age to 0
    - Uncheck:
      - Aggregate CSS files
      - Aggregate JavaScript files
    - Save configuration
  - In Drush
    - ```shell
      drush config:set -y system.performance css.preprocess 0; \
      drush config:set -y system.performance js.preprocess 0; \
      drush config:set -y system.performance cache.page.max_age 0;
      ```

## Tailwind Configuration

Configuration changes to how tailwind builds the asset file can be found
in `tailwind.config.js`. Tailwind styles are assembled along with our changes
and additions from `src/madrone.pcss`. If there is no Drupal Twig Template for a
component to style, we can add our CSS targeting in the source madrone.css file.
Look to the bottom of the file for examples of how we achieve this.
---

#### Tailwind PugeCSS

Tailwind is now set to Purge unused classes. If you need to use new ones without
having to rebuild every change you will need update tailwind.config.js and set
purge to false, then rebuild the file one time to load all styles. Do not forget
to put purge back to true before committing code.

---

### Rebuilding TailwindCSS assets

For unminified ```shell yarn dev```

For minified ```shell yarn prod```

## Developer Experience

- Run ```shell yarn watch``` this task will automatically compile madrone.css
  (unminified) when you make changes.
- When logged in, you typically need to run admin -> flush all caches when
  changing template files. This menu shows up under the drupal icon of nice
  menus
