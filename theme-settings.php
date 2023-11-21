<?php

/**
 * @file
 * Theme settings can be found here.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function madrone_form_system_theme_settings_alter(&$form, FormStateInterface $form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }
  $form['logo']['#access'] = FALSE;
  $form['favicon']['#access'] = FALSE;
  $form['madrone_settings']['madrone_utilities'] = [
    '#type' => 'fieldset',
    '#title' => t('Madrone Utilities'),
  ];

  // Site Logo Options.
  $form['madrone_settings']['madrone_utilities']['madrone_companion_logo'] = [
    '#type' => 'select',
    '#title' => t('Companion Logos'),
    '#disabled' => TRUE,
    '#description' => t('Companion Logos to be used only on approval by OSU Marketing'),
    '#options' => [
      'osu' => t('OSU'),
      'cascades' => t('Cascades'),
    ],
    '#default_value' => theme_get_setting('madrone_companion_logo'),
  ];
  // Monsido Site ID.
  $form['madrone_settings']['madrone_utilities']['madrone_monsido_site_id'] = [
    '#type' => 'textfield',
    '#title' => t('Monsido Site Id'),
    '#default_value' => theme_get_setting('madrone_monsido_site_id'),
    '#description' => t("Site Id for monsido analytics"),
  ];

  $form['madrone_settings']['madrone_utilities']['mardone_metatag_osu'] = [
    '#type' => 'checkbox',
    '#title' => t('Use OSU metatag'),
    '#default_value' => theme_get_setting('mardone_metatag_osu'),
    '#description' => t("Append <em>Oregon State University</em> to the end of every metatag title."),
  ];

  $administrative_roles = ["dx_administrator", "administrator"];
  $current_roles = \Drupal::currentUser()->getAccount()->getRoles(TRUE);

  if (count(array_intersect($current_roles, $administrative_roles)) > 0) {
    $form['madrone_settings']['madrone_utilities']['madrone_companion_logo']['#disabled'] = FALSE;
  }
}
