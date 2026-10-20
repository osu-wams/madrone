<?php

declare(strict_types=1);

use TwigCsFixer\Config\Config;
use Twigcsfixer\File\Finder;
use Twigcsfixer\Rules\Literal\CompactHashRule;
use Twigcsfixer\Rules\Whitespace\IndentRule;
use Twigcsfixer\Ruleset\Ruleset;
use Twigcsfixer\Standard\TwigCsFixer;

$config = new Config();

$finder = new Finder();
$finder->exclude('tests');
$config->setFinder($finder);

$ruleset = new Ruleset();
// Add Twig CS Fixer's defaults.
$ruleset->addStandard(new TwigCsFixer());

// Customize the above standards for Drupal.
$ruleset->overrideRule(new CompactHashRule(TRUE));
$ruleset->overrideRule(new IndentRule(spaceRatio: 2));
$config->allowNonFixableRules();
$config->setRuleset($ruleset);

return $config;
