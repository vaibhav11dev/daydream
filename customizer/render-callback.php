<?php

/*
  Render Callback Functions For Customizer

  Table of Contents:

  - Footer

  ======================================= */

if ( !function_exists( 'daydream_get_render_callback' ) ) {

	function daydream_get_render_callback( $value ) {

		$option_name = $value->id;

		/*
		  Footer
		  ======================================= */

		if ( $option_name == 'dd_footer_content' ) {
			return get_theme_mod( $option_name, '' );
		}
	}

}