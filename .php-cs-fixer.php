<?php

declare(strict_types=1);

use drupol\PhpCsFixerConfigsDrupal\Config\Drupal8;

$finder = PhpCsFixer\Finder::create()
  ->in(__DIR__)
  ->name('*.module')
  ->name('*.inc')
  ->name('*.install')
  ->name('*.profile')
  ->name('*.theme')
  ->notPath('*.md')
  ->notPath('*.yml')
  ->notPath('tests/')
  ->notPath('node_modules')
;

$config = new Drupal8();

$config->setParallelConfig(PhpCsFixer\Runner\Parallel\ParallelConfigFactory::detect());
$config->setFinder($finder);

$rules = [
  'declare_strict_types' => true,
  'blank_line_after_opening_tag' => true,
  'ordered_imports' => true,
];

$config->setRules($rules);

return $config;
