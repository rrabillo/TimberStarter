<?php

if ( ! class_exists( 'Timber' ) ) {
    add_action( 'admin_notices', function() {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
    } );
    return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {



    function __construct() {
        add_theme_support( 'post-formats' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'menus' );
        register_nav_menus(array(
            'main_menu' => 'Menu principal',
            'footer_menu' => 'Menu footer'
        ));

        require_once 'inc/hooks.php';
        require_once 'inc/libs/vendor/autoload.php'; // PHP libs
        add_filter( 'timber_context', array( $this, 'add_to_context' ) );
        add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
        add_action( 'init', array( $this, 'register_post_types' ) );
        add_action( 'init', array( $this, 'register_taxonomies' ) );
        add_action( 'init', array( $this, 'load_scripts' ) );
        add_filter('upload_mimes', array ($this, 'allow_svg_upload'));
        parent::__construct();
    }

    function register_post_types() {
        require_once 'inc/custom_posts_types.php';
    }

    function register_taxonomies() {
        require_once 'inc/custom_taxonomies.php';
    }

    function add_to_context( $context ) {
        if(class_exists('acf')){
            $context['options'] = get_fields('option');
        }
        if ( function_exists('yoast_breadcrumb') ) {
            $context['breadcrumbs'] = yoast_breadcrumb('<p id="breadcrumbs">','</p>', false);
        }
        $context['lang'] 		= require "inc/lang_config.php";
        $context['main_menu'] = new Timber\Menu('main_menu');
        $context['footer_menu'] = new Timber\Menu('footer_menu');
        $context['site'] = $this;
        $context['current_lang'] =   apply_filters( 'wpml_current_language', NULL );
        return $context;
    }

    function load_scripts() {
        if (!is_admin()) {

        }
    }

    function add_to_twig( $twig ) {
        $twig->addExtension( new Twig_Extension_StringLoader() );
        return $twig;
    }
    function allow_svg_upload($mimes){
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }

    /*
     * $field: Un champ oEmbed ACF contenant une video youtube
     */
    static function manage_youtube_iframes($field, $params){
        if($params['loop'] == '1'){
            $id = explode('?',$field)[0];
            $id = explode('/',$id);
            $id = $id[4];
            $params['playlist'] = $id;
        }
        preg_match('/src="(.+?)"/', $field, $matches);
        $src = $matches[1];
        $new_src = add_query_arg($params, $src);
        $field = str_replace($src, $new_src,$field);
        $attributes = 'class="embed-responsive-item"';
        $field = str_replace('></iframe>', ' ' . $attributes . '></iframe>', $field);
        return $field;
    }
}

new StarterSite();

