<?php

/**
 * daydream functions and definitions
 *
 *
 * @package daydream
 */
define( 'DAYDREAM_IMAGEPATH', get_template_directory_uri() . '/customizer/assets/images/' );
define( 'DAYDREAM_VERSION', '1.0.0' );

/**
 * Enqueue scripts and styles.
 */
function daydream_scripts() {
	wp_enqueue_style( 'daydream-style', get_stylesheet_uri() );

	//Bootstrap Core CSS
	wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/assets/bootstrap/css/bootstrap.min.css' );

	//Icon Fonts
	wp_enqueue_style( 'font-awesome', get_template_directory_uri() . '/assets/css/font-awesome.min.css' );
	wp_enqueue_style( 'simple-line-icons', get_template_directory_uri() . '/assets/css/simple-line-icons.css' );

	//Plugins
	wp_enqueue_style( 'magnific-popup', get_template_directory_uri() . '/assets/css/magnific-popup.css' );
	wp_enqueue_style( 'owl-carousel', get_template_directory_uri() . '/assets/css/owl.carousel.css' );
	wp_enqueue_style( 'animate', get_template_directory_uri() . '/assets/css/animate.min.css' );

	//Theme Core CSS
	wp_enqueue_style( 'ddgeneral', get_template_directory_uri() . '/assets/css/ddgeneral.css' );
	wp_enqueue_style( 'ddmain', get_template_directory_uri() . '/assets/css/ddmain.css' );
	wp_enqueue_style( 'ddmedia', get_template_directory_uri() . '/assets/css/ddmedia.css' );
	wp_enqueue_style( 'dynamic-style', get_template_directory_uri() . '/assets/css/dynamic.css' );

	//Theme Dynamic CSS
	$daydream_dynamic_css = '';
	require get_parent_theme_file_path( '/assets/css/dynamic-css.php' );
	wp_add_inline_style( 'dynamic-style', $daydream_dynamic_css );

	//JAVASCRIPT FILES
	wp_enqueue_script( 'jquery' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	wp_enqueue_script( 'bootstrap', get_template_directory_uri() . '/assets/bootstrap/js/bootstrap.min.js', array( 'jquery' ), DAYDREAM_VERSION, true );
	wp_enqueue_script( 'ddcore', get_template_directory_uri() . '/assets/js/ddcore.min.js', array( 'jquery' ), DAYDREAM_VERSION, true );
	wp_enqueue_script( 'ddmain', get_template_directory_uri() . '/assets/js/ddmain.js', array( 'jquery' ), DAYDREAM_VERSION, true );
	wp_enqueue_script( 'daydream-skip-link-focus-fix', get_template_directory_uri() . '/assets/js/skip-link-focus-fix.js', array(), '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'daydream_scripts' );

/**
 * Enqueue admin scripts and styles.
 */
function daydream_adminscripts( $hook ) {
	wp_enqueue_script( 'adminjs', get_template_directory_uri() . '/admin/assets/js/admin_script.js', array( 'jquery' ), '' );

	wp_enqueue_style( 'admincss', get_template_directory_uri() . '/admin/assets/css/admin_css.css', '', '' );

	wp_localize_script( 'adminjs', 'js_strings', array(
		'ajaxurl'			 => admin_url( 'admin-ajax.php' ),
		'select_demo_notice' => __( 'select demo', 'daydream' ),
	) );

	wp_enqueue_script( 'jquery-ui-datepicker', array( 'jquery' ) );

	wp_enqueue_style( 'jquery-ui-datepicker' );

	wp_enqueue_script( 'jquery-ui-dialog' );

	wp_enqueue_style( 'admin-font-awesome', get_template_directory_uri() . '/assets/css/font-awesome.min.css', '', '4.7.0' );

	wp_enqueue_style( 'themeoptions', get_template_directory_uri() . '/themeoptions/options/css/themeoptions.css', false, 398 );
}

add_action( 'admin_enqueue_scripts', 'daydream_adminscripts' );

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_parent_theme_file_path( '/includes/functions/template-functions.php' );

/**
 * Functions which enhance the basic theme functionality. 
 */
require get_parent_theme_file_path( '/includes/functions/basic-functions.php' );

// Primary Menu
require get_parent_theme_file_path( '/includes/daydream-nav-menu.php' );

// load Widget functions
require get_parent_theme_file_path( '/includes/widgets.php' );

/**
 * WooCommerce configuration file
 */
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

if ( is_plugin_active( 'woocommerce/woocommerce.php' ) ) {
	include_once( get_template_directory() . '/includes/woo-config.php' );
}

/**
 * Initialize theme admin dashboard
 */
require get_parent_theme_file_path( '/admin/daydream-admin.php' );
require get_parent_theme_file_path( '/admin/helper-plugin-install/daydream-plugin-install-helper.php' );
require get_parent_theme_file_path( '/admin/about-page/daydream-about-page.php' );

/**
 * Initialize Customizer
 */
require get_parent_theme_file_path( '/customizer/customizer.php' );

// Metaboxes
require get_parent_theme_file_path( '/includes/metaboxes/metaboxes.php' );

// load Semantic Classes functions
require get_parent_theme_file_path( '/includes/extensions/semantic-classes.php' );

// Post Link Extensions
require get_parent_theme_file_path( '/includes/extensions/post-link-plus.php' );

// load the WP daydream Hook System
require get_parent_theme_file_path( '/includes/functions/hooks.php' );

// load comment functions
require get_parent_theme_file_path( '/includes/functions/comment-functions.php' );

// load pluggable functions
require get_parent_theme_file_path( '/includes/functions/pluggable.php' );

// load template tag functions
require get_parent_theme_file_path( '/includes/functions/template-tags.php' );

// load customizer functions
require get_parent_theme_file_path( '/includes/functions/customizer-functions.php' );