<?php

/*
  Custom Footer
  --------------------------------------- */

if ( !function_exists( 'daydream_footer_content' ) ) {

	function daydream_footer_content() {
		$daydream_home_url = "https://themevedanta.com/";
		echo '<div class="custom-footer">' .wp_kses_post( daydream_theme_mod( 'dd_footer_content', '<div id="copyright"><a href="' . esc_url( $daydream_home_url . 'daydream-multipurpose-wordpress-theme/' ) . '">daydream</a> theme by Themevedanta - Powered by <a href="'. esc_url( "http://wordpress.org" ) .'">WordPress</a></div>' ) ) . '</div>' ;
	}

}

add_action( 'daydream_footer_area', 'daydream_footer_content', 40 );
