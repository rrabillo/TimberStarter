<?php
/**
 * Template Name: Home Page
 */


if ( ! class_exists( 'Timber' ) ) {
	echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
	return;
}
$context = Timber::get_context();
$context['page'] = Timber::get_post();
$templates = array( 'frontpage.twig' );
Timber::render( $templates, $context );
