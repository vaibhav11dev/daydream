<?php
/*
  Customizer Setup

  Table of Contents:

  - Init Customizer
  - Main Styles/Scripts To Enqueue
  - Global Customizer Values
  - Default WordPress Customizer Sections (Moved To Bottom)
  - Get List of Categories
  - Get Sidebars
  - Number Of WooCommerce Products
  - postMessage Support For Website Title and Description
  - Partial Refresh For Website Title
  - Partial Refresh For Website Description
  - Build The Section Class
  - Enqueue Google Fonts on The Front End
  - Load The Theme Options


  Init Customizer
  ======================================= */

if ( is_user_logged_in() ) {
	require get_parent_theme_file_path( '/customizer/render-callback.php' );
	require get_parent_theme_file_path( '/customizer/kirki-framework/kirki.php' );

	Kirki::add_config( 'kirki_daydream_options', array(
		'option_type'	 => 'theme_mod',
		'capability'	 => 'edit_theme_options'
	) );
}

/*
  Main Styles/Scripts To Enqueue
  ======================================= */

if ( !class_exists( 'daydream_Customizer' ) ) {

	class daydream_Customizer {

		function __construct() {
			add_action( 'customize_controls_enqueue_scripts', array( $this, 'daydream_custom_customize_enqueue' ), 9999 );
			add_action( 'customize_controls_print_footer_scripts', array(
				$this,
				'daydream_filter_ajax_url_for_customizer_live_preview'
			), 9999 );
		}

		public function daydream_filter_ajax_url_for_customizer_live_preview() {
			?>
			<script type="text/javascript">
			    if ( _wpCustomizeSettings.theme.active == false ) {
				ajaxurl = '<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>?customize_changeset_uuid=' + _wpCustomizeSettings.changeset.uuid + '&customize_theme=' + _wpCustomizeSettings.theme.stylesheet;
			    }
			</script>
			<?php
		}

		public function daydream_custom_customize_enqueue() {
			wp_enqueue_style( 'daydream-customizer-css', get_template_directory_uri() . '/customizer/assets/css/customizer.css', array(), '', 'all' );
			wp_enqueue_script( 'daydream-customizer-js', get_template_directory_uri() . '/customizer/assets/js/customizer.js', array(
				'customize-preview',
				'jquery'
			), '', true );
		}

	}

}

$daydream_Customizer = new daydream_Customizer();

/*
  Global Customizer Values
  ======================================= */

if ( !function_exists( 'daydream_global_customizer_value' ) ) {

	function daydream_global_customizer_value() {

		/*
		  Main Value Definitions
		  --------------------------------------- */

		$prefix					 = "dd";
		$opt_name				 = "dd_options";
		$rss_url				 = get_bloginfo( 'rss_url' );
		$home_url				 = esc_url( "https://themevedanta.com/" );
		$customizer_images		 = get_template_directory_uri() . '/customizer/assets/images/';
		$frontend_images		 = get_template_directory_uri() . '/assets/images/';
		$button_classes			 = ".btn, a.btn, button, .button, .widget .button, input#submit, input[type=submit], .post-content a.btn, .woocommerce .button";
		$button_hover_classes	 = ".btn:hover, a.btn:hover, button:hover, .button:hover, .widget .button:hover, input#submit:hover, input[type=submit]:hover";
		$product_taxonomy		 = "";


		return [
			'prefix'				 => $prefix,
			'opt_name'				 => $opt_name,
			'rss_url'				 => $rss_url,
			'home_url'				 => $home_url,
			'customizer_images'		 => $customizer_images,
			'frontend_images'		 => $frontend_images,
			'button_classes'		 => $button_classes,
			'button_hover_classes'	 => $button_hover_classes,
			'product_taxonomy'		 => $product_taxonomy,
		];
	}

}

/*
  Default WordPress Customizer Sections (Moved To Bottom)
  ======================================= */

if ( !function_exists( 'daydream_register_custom_section' ) ) {

	function daydream_register_custom_section( $wp_customize ) {
		$wp_customize->get_section( 'title_tagline' )->priority		 = 101;
		$wp_customize->get_section( 'colors' )->priority				 = 102;
		$wp_customize->get_section( 'header_image' )->priority		 = 103;
		$wp_customize->get_section( 'background_image' )->priority	 = 104;
		$wp_customize->get_section( 'static_front_page' )->priority	 = 105;
	}

}

add_action( 'customize_register', 'daydream_register_custom_section' );

/*
  Get List of Categories
  ======================================= */

if ( !function_exists( 'daydream_list_categories' ) ) {

	function daydream_list_categories( $taxonomy, $empty_choice = false ) {
		if ( $empty_choice == true ) {
			$post_categories[ '' ] = __( 'Default', 'daydream' );
		}

		$get_categories = get_categories( 'hide_empty=0&taxonomy=' . $taxonomy );

		if ( !array_key_exists( 'errors', $get_categories ) ) {
			if ( $get_categories && is_array( $get_categories ) ) {
				foreach ( $get_categories as $cat ) {
					$post_categories[ $cat->slug ] = $cat->name;
				}
			}

			if ( isset( $post_categories ) ) {
				return $post_categories;
			}
		}
	}

}

/*
  Get Sidebars
  ======================================= */

if ( !function_exists( 'daydream_get_sidebars' ) ) {

	function daydream_get_sidebars() {
		global $wp_registered_sidebars;
		$sidebar_options[] = 'None';
		// GET All Register Sidebars
		for ( $i = 0; $i < 1; $i ++ ) {
			$sidebars = $wp_registered_sidebars;
			if ( is_array( $sidebars ) && !empty( $sidebars ) ) {
				foreach ( $sidebars as $key => $sidebar ) {
					$sidebar_options[ $key ] = $sidebar[ 'name' ];
				}
			}
		}
		return $sidebar_options;
	}

}

/*
  Number Of WooCommerce Products
  ======================================= */

if ( !function_exists( 'daydream_woocommerce_product_number' ) ) {

	function daydream_woocommerce_product_number( $range, $all = true, $default = false, $range_start = 1 ) {
		if ( $all ) {
			$number_of_products[ '-1' ] = __( 'All', 'daydream' );
		}

		if ( $default ) {
			$number_of_products[ '' ] = __( 'Default', 'daydream' );
		}

		foreach ( range( $range_start, $range ) as $number ) {
			$number_of_products[ $number ] = $number;
		}

		return $number_of_products;
	}

}

/*
  postMessage Support For Website Title and Description
  ======================================= */

if ( !function_exists( 'daydream_postmessage_default' ) ) {

	function daydream_postmessage_default( $wp_customize ) {
		$wp_customize->get_setting( 'blogname' )->transport		 = 'postMessage';
		$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

		$wp_customize->selective_refresh->add_partial( 'blogname', array(
			'selector'			 => '#blog-title',
			'render_callback'	 => 'daydream_refresh_website_title',
		) );
		$wp_customize->selective_refresh->add_partial( 'blogdescription', array(
			'selector'			 => '#tagline',
			'render_callback'	 => 'daydream_refresh_website_description',
		) );
	}

}

add_action( 'customize_register', 'daydream_postmessage_default', 10, 3 );

/*
  Partial Refresh For Website Title
  ======================================= */

if ( !function_exists( 'daydream_refresh_website_title' ) ) {

	function daydream_refresh_website_title() {
		bloginfo( 'name' );
	}

}

/*
  Partial Refresh For Website Description
  ======================================= */

if ( !function_exists( 'daydream_refresh_website_description' ) ) {

	function daydream_refresh_website_description() {
		bloginfo( 'description' );
	}

}

/*
  Build The Section Class
  ======================================= */

global $daydream_customizer_fields;
$daydream_panel				 = '';
$daydream_index_control		 = 0;
$daydream_customizer_fields	 = array();

if ( !class_exists( 'daydream_Kirki' ) ) {

	class daydream_Kirki {

		static function setSection( $param1, $param2 ) {
			if ( true || is_user_logged_in() ) {
				global $daydream_panel, $daydream_index_control;
				$daydream_index_control ++;
				if ( isset( $param2[ 'iconfix' ] ) && !empty( $param2[ 'iconfix' ] ) ) {
					$param2[ 'icon' ] = $param2[ 'iconfix' ];
				}
				if ( isset( $param2[ 'fields' ] ) && is_array( $param2[ 'fields' ] ) && count( $param2[ 'fields' ] ) ) {
					if ( !isset( $param2[ 'subsection' ] ) ) {
						$daydream_panel = $param2[ 'id' ];
						if ( is_user_logged_in() && is_customize_preview() ) {
							Kirki::add_section( $param2[ 'id' ], array(
								'title'		 => $param2[ 'title' ],
								'priority'	 => $daydream_index_control,
								'icon'		 => isset( $param2[ 'icon' ] ) ? $param2[ 'icon' ] : '',
							) );
						}
					} else {
						if ( is_user_logged_in() && is_customize_preview() ) {
							Kirki::add_section( $param2[ 'id' ], array(
								'title'		 => $param2[ 'title' ],
								'panel'		 => $daydream_panel,
								'priority'	 => $daydream_index_control,
								'icon'		 => isset( $param2[ 'icon' ] ) ? $param2[ 'icon' ] : '',
							) );
						}
					}
					daydream_Kirki::call_kirki_from_old_field( $param2[ 'fields' ], $param2[ 'id' ] );
				} else {
					$daydream_panel = $param2[ 'id' ];
					if ( is_user_logged_in() && is_customize_preview() ) {
						Kirki::add_panel( $param2[ 'id' ], array(
							'title'		 => $param2[ 'title' ],
							'priority'	 => $daydream_index_control,
							'icon'		 => $param2[ 'icon' ],
						) );
					}
				}
			}
		}

		static function google_webfont_url( $fonts ) {
			$link	 = "";
			$subsets = array();
			foreach ( $fonts as $family => $font ) {
				// if( !isset($font['google']) || $font['google'] != 1 ){
				// continue;
				// }
				if ( !isset( $font[ 'font-family' ] ) || $font[ 'font-family' ] == '' ) {
					continue;
				}
				$family = $font[ 'font-family' ];
				if ( ( $link != "" ) ) {
					$link .= "|"; // Append a new font to the string
				}
				$link .= $family;

				// if ( isset( $font['font-style'] ) && ( $font['font-style'] != '' ) ) {
				// $link .= ':'.$font['font-style'];
				// }
				if ( isset( $font[ 'font-weight' ] ) && ( $font[ 'font-weight' ] != '' ) ) {
					$link .= ':' . $font[ 'font-weight' ];
				}
				if ( isset( $font[ 'variant' ] ) && ( $font[ 'variant' ] != '' ) ) {
					$link .= ':' . $font[ 'variant' ];
				}

				if ( isset( $font[ 'subset' ] ) ) {
					foreach ( $font[ 'subset' ] as $subset ) {
						if ( !in_array( $subset, $subsets ) ) {
							array_push( $subsets, $subset );
						}
					}
				}
			}

			if ( isset( $subsets ) && count( $subsets ) ) {
				$link .= "&subset=" . implode( ',', $subsets );
			}

			return '//fonts.googleapis.com/css?family=' . str_replace( '|', '|', $link );
		}

		static function call_kirki_from_old_field( $array_items, $section = 'kirki_frontpage-content-boxes-tab',
											 $setting = 'kirki_daydream_options' ) {
			global $daydream_customizer_fields, $daydream_list_google_fonts;
			foreach ( $array_items as $value ) {
				if (
				isset( $value[ 'type' ] ) && (
				$value[ 'type' ] == 'text' || $value[ 'type' ] == 'radio' || $value[ 'type' ] == 'select' || $value[ 'type' ] == 'checkbox' || $value[ 'type' ] == 'textarea' || $value[ 'type' ] == 'editor' || $value[ 'type' ] == 'fontawesome' || $value[ 'type' ] == 'switch' || $value[ 'type' ] == 'slider' || $value[ 'type' ] == 'spinner' || $value[ 'type' ] == 'sorter' || $value[ 'type' ] == 'color' || $value[ 'type' ] == 'typography' || $value[ 'type' ] == 'media' || $value[ 'type' ] == 'image_select' || $value[ 'type' ] == 'info' || $value[ 'type' ] == 'palette' || $value[ 'type' ] == 'spacing' || $value[ 'type' ] == 'color_rgba'
				) ) {
					$value_temp = array(
						'type'			 => $value[ 'type' ],
						'settings'		 => $value[ 'id' ],
						'label'			 => isset( $value[ 'title' ] ) ? $value[ 'title' ] : ' ',
						'description'	 => isset( $value[ 'subtitle' ] ) ? $value[ 'subtitle' ] : ' ',
						'section'		 => $section,
						'default'		 => isset( $value[ 'default' ] ) ? $value[ 'default' ] : null,
						'priority'		 => 10,
					);
					if ( 'typography' == $value[ 'type' ] && !is_customize_preview() ) {
						$daydream_list_google_fonts[] = daydream_theme_mod( $value[ 'id' ], $value[ 'default' ] );
					}

					if ( isset( $value[ 'default' ] ) ) {
						$value_temp[ 'default' ] = $value[ 'default' ];
						if ( isset( $value_temp[ 'default' ][ 'font-style' ] ) ) {
							$value_temp[ 'default' ][ 'variant' ] = $value_temp[ 'default' ][ 'font-style' ];
						}
						if ( isset( $value_temp[ 'default' ][ 'padding-top' ] ) ) {
							$value_temp[ 'default' ][ 'top' ] = $value_temp[ 'default' ][ 'padding-top' ];
							unset( $value_temp[ 'default' ][ 'units' ] );
							unset( $value_temp[ 'default' ][ 'padding-top' ] );
						}
						if ( isset( $value_temp[ 'default' ][ 'padding-right' ] ) ) {
							$value_temp[ 'default' ][ 'right' ] = $value_temp[ 'default' ][ 'padding-right' ];
							unset( $value_temp[ 'default' ][ 'padding-right' ] );
						}
						if ( isset( $value_temp[ 'default' ][ 'padding-bottom' ] ) ) {
							$value_temp[ 'default' ][ 'bottom' ] = $value_temp[ 'default' ][ 'padding-bottom' ];
							unset( $value_temp[ 'default' ][ 'padding-bottom' ] );
						}
						if ( isset( $value_temp[ 'default' ][ 'padding-left' ] ) ) {
							$value_temp[ 'default' ][ 'left' ] = $value_temp[ 'default' ][ 'padding-left' ];
							unset( $value_temp[ 'default' ][ 'padding-left' ] );
						}
						if ( !is_array( $value[ 'default' ] ) ) {
							$value_temp[ 'default' ]	 = str_replace( 'fas fa-', '', $value_temp[ 'default' ] );
							$value_temp[ 'default' ]	 = str_replace( 'far fa-', '', $value_temp[ 'default' ] );
							$value_temp[ 'default' ]	 = str_replace( 'fa fa-', '', $value_temp[ 'default' ] );
							$value_temp[ 'default' ]	 = str_replace( 'fa-', '', $value_temp[ 'default' ] );
						}
					}
					if ( isset( $value[ 'type' ] ) && $value[ 'type' ] == 'select' ) {
						if ( isset( $value[ 'multi' ] ) && $value[ 'multi' ] == true ) {
							$value_temp[ 'multiple' ] = 999;
						}
					}
					if ( isset( $value[ 'type' ] ) && $value[ 'type' ] == 'palette' ) {
						if ( isset( $value[ 'palettes' ] ) && $value[ 'palettes' ] == true ) {
							$value_temp[ 'choices' ] = $value[ 'palettes' ];
						}
					}
					if ( isset( $value[ 'type' ] ) && $value[ 'type' ] == 'media' ) {
						$value_temp[ 'type' ] = 'image';
					}
					if ( isset( $value[ 'type' ] ) && $value[ 'type' ] == 'info' ) {
						$value_temp[ 'type' ] = 'custom';
					}
					if ( isset( $value[ 'type' ] ) && $value[ 'type' ] == 'image_select' ) {
						$value_temp[ 'type' ] = 'radio-image';
					}
					if ( isset( $value[ 'type' ] ) && $value[ 'type' ] == 'color_rgba' ) {
						$value_temp[ 'type' ] = 'color';
						if ( isset( $value[ 'default' ][ 'color' ] ) ) {
							$value_temp[ 'default' ]			 = daydream_hex_rgba( $value[ 'default' ][ 'color' ], $value[ 'default' ][ 'alpha' ] );
							$value_temp[ 'choices' ][ 'alpha' ]	 = true;
						}
					}
					if ( isset( $value[ 'type' ] ) && $value[ 'type' ] == 'slider' ) {
						$value_temp[ 'choices' ] = array(
							'min'	 => isset( $value[ 'min' ] ) ? $value[ 'min' ] : 0,
							'max'	 => isset( $value[ 'max' ] ) ? $value[ 'max' ] : 9999,
							'step'	 => isset( $value[ 'step' ] ) ? $value[ 'step' ] : 1,
						);
					}
					if ( isset( $value[ 'type' ] ) && $value[ 'type' ] == 'spinner' ) {
						$value_temp[ 'type' ] = 'number';
						if ( isset( $value[ 'min' ] ) ) {
							$value_temp[ 'choices' ][ 'min' ] = $value[ 'min' ];
						}
						if ( isset( $value[ 'max' ] ) ) {
							$value_temp[ 'choices' ][ 'max' ] = $value[ 'max' ];
						}
						if ( isset( $value[ 'step' ] ) ) {
							$value_temp[ 'choices' ][ 'step' ] = $value[ 'step' ];
						}
					}
					if ( isset( $value[ 'class' ] ) && $value[ 'class' ] == 'iconpicker-icon' ) {
						$value_temp[ 'type' ] = 'fontawesome';
					}
					if ( isset( $value[ 'desc' ] ) ) {
						$value_temp[ 'description' ] = $value[ 'desc' ];
					}
					if ( isset( $value[ 'required' ] ) && is_array( $value[ 'required' ] ) ) {
						$active_callback = array();
						if ( count( $value[ 'required' ] ) ) {
							foreach ( $value[ 'required' ] as $required ) {
								if ( isset( $required[ 2 ] ) && $required[ 2 ] == '=' ) {
									$required[ 2 ] = '==';
								}
								$active_callback[] = array(
									'setting'	 => $required[ 0 ],
									'operator'	 => $required[ 1 ],
									'value'		 => $required[ 2 ]
								);
							}
							$value_temp[ 'active_callback' ] = $active_callback;
						}
					}
					if ( isset( $value[ 'options' ] ) ) {
						$value_temp[ 'choices' ] = $value[ 'options' ];
					}
					if ( $value[ 'type' ] == 'sorter' ) {
						$value_temp[ 'type' ]	 = 'sortable';
						$choices_array		 = $value[ "options" ][ 'disabled' ];
						if ( isset( $value[ "options" ][ 'enabled' ] ) && is_array( $value[ "options" ][ 'enabled' ] ) && count( $value[ "options" ][ 'enabled' ] ) ) {
							$value_temp[ 'default' ] = array();
							foreach ( $value[ "options" ][ 'enabled' ] as $default_key => $default_value ) {
								if ( $default_key != 'placebo' ) {
									$value_temp[ 'default' ][]	 = $default_key;
									$choices_array[ $default_key ] = $default_value;
								}
							}
						}
						if ( $choices_array && is_array( $choices_array ) && isset( $choices_array[ 'placebo' ] ) ) {
							unset( $choices_array[ 'placebo' ] );
						}
						$value_temp[ 'choices' ] = $choices_array;
					}
					if ( $value[ 'type' ] == 'switch' ) {
						$value_temp[ 'choices' ] = array(
							'on'	 => isset( $value[ 'on' ] ) ? $value[ 'on' ] : esc_attr__( 'Enabled', 'daydream' ),
							'off'	 => isset( $value[ 'off' ] ) ? $value[ 'off' ] : esc_attr__( 'Disabled', 'daydream' ),
						);
					}

					$daydream_customizer_fields[ $value[ 'id' ] ] = array(
						'value'		 => $value,
						'value_temp' => $value_temp,
					);

					if ( isset( $value[ 'selector' ] ) ) {
						$value_temp[ 'partial_refresh' ] = array(
							$value[ 'id' ] => array(
								'selector'			 => $value[ 'selector' ],
								'render_callback'	 => 'daydream_get_render_callback'
							)
						);
					}
					if ( isset( $value[ 'transport' ] ) ) {
						$value_temp[ 'transport' ] = $value[ 'transport' ];
					}
					if ( isset( $value[ 'js_vars' ] ) ) {
						$value_temp[ 'js_vars' ] = $value[ 'js_vars' ];
					}
					if ( isset( $value[ 'input_attrs' ] ) ) {
						$value_temp[ 'input_attrs' ][ 'placeholder' ] = $value[ 'input_attrs' ];
					} else {
						if ( $value_temp[ 'type' ] == 'text' || $value_temp[ 'type' ] == 'textarea' || $value_temp[ 'type' ] == 'editor' ) {
							if ( isset( $value_temp[ 'default' ] ) ) {
								$value_temp[ 'input_attrs' ][ 'placeholder' ] = $value_temp[ 'default' ];
							}
						}
					}
					if ( is_user_logged_in() && is_customize_preview() ) {
						Kirki::add_field( $setting, $value_temp );
					}
				}
			}
		}

	}

}

if ( $daydream_customizer_fields === false ) {
	update_option( 'daydream_all_customize_fields', $daydream_customizer_fields );
}

/*
  Enqueue Google Fonts on The Front End
  ======================================= */

if ( !is_customize_preview() ) {

	if ( !function_exists( 'daydream_enqueue_google_fonts' ) ) {

		function daydream_enqueue_google_fonts() {
			$protocol = is_ssl() ? "https:" : "http:";
			global $daydream_list_google_fonts;
			wp_register_style( 'daydream-google-fonts', $protocol . daydream_Kirki::google_webfont_url( $daydream_list_google_fonts ), '' );
			wp_enqueue_style( 'daydream-google-fonts' );
		}

	}

	add_action( 'get_footer', 'daydream_enqueue_google_fonts' );
}

/*
  Link to WordPress Customizer
  ======================================= */
if ( !function_exists( 'daydream_link_customizer' ) ) {

	function daydream_link_customizer( $focus, $locations ) {

		if ( $focus == 'panel' ) {
			$query[ 'autofocus[panel]' ]	 = $locations;
			$link						 = add_query_arg( $query, admin_url( 'customize.php' ) );
		} elseif ( $focus == 'section' ) {
			$query[ 'autofocus[section]' ] = $locations;
			$link						 = add_query_arg( $query, admin_url( 'customize.php' ) );
		} elseif ( $focus == 'control' ) {
			$query[ 'autofocus[control]' ] = $locations;
			$link						 = add_query_arg( $query, admin_url( 'customize.php' ) );
		}
		return $link;
	}

}

/*
  Load The Theme Options
  ======================================= */

require get_parent_theme_file_path( '/customizer/customizer-options.php' );

daydream_customizer_options();
