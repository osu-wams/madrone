<?php

/**
 * @file
 * Theme settings can be found here.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function madrone_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface $form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  $form ['madrone_front_title'] = [
    '#type' => 'checkbox',
    '#title' => t('Hide Title'),
    '#default_value' => theme_get_setting('madrone_front_title'),
    '#description' => t('Hide the node title on front page.'),
  ];
}
