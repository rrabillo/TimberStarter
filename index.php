<?php
/**
 * Homepage - Posts list
 *
 */


$templates = array( 'index.twig');

$context = Timber::get_context();
$context['page'] = Timber::get_post();
$context['posts'] = new Timber\PostQuery();
Timber::render( $templates, $context );
