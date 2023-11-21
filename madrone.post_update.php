<?php

/**
 * Set the metatag and site logo.
 */
function madrone_post_update_add_header_metatag(&$sandbox) {
  \Drupal::configFactory()->getEditable('madrone.settings')
    ->set('madrone_companion_logo', 'osu')
    ->set('mardone_metatag_osu', 1)
    ->save();
}
