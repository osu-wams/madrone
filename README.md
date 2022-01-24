# OSU Drupal Theme Madrone

## Requirements

- Node 14+
- PHP 7.4+
- Composer - https://getcomposer.org/
- Docker (or other container running software Podman, RunC, CRun, etc...)

## Get Started

### To get up and running with Madrone on OSU Drupal

- Clone this repository
- Run `composer install`
- Run `npm install`
  - You should get gulp-cli, best option is to install it globally
    - ```npm install -g gulp-cli```
- docker-compose up -d (If using docker)
  - wait for the Database to be up ready.
    ```shell
    docker-compose logs database --follow
    ```

- Install Drupal
  - http://localhost.oregonstate.edu:8080/install.php
  - Select the OSU Standard Installation profile (should already be used as it's
    a distribution now.)
    - If you need to install
      Drupal Standard you will have to use drush to install a different profile.
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

## Developer Experience

### Building assets

- Gulp's default option is to just build/copy all needed files and to not setup
  a watcher.
- To build and watch
  - ```gulp watch```
- Just build CSS
  - ```gulp buildStyles```
- Just build JS
  - ```gulp buildScripts```
- When logged in, you typically need to run admin -> flush all caches when
  changing template files. This menu shows up under the drupal icon of nice
  menus
