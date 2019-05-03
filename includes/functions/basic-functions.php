<?php
/**
 * 
 * Get Option.
 * Helper function to return the theme option value.
 * If no value has been saved, it returns $default.
 * Needed because options are
 * as serialized strings.
 * 
 * @param type $name
 * @param type $default
 * @return type
 */
/*
  Get Option.
  Helper function to return the theme option value.
  If no value has been saved, it returns $default.
  Needed because options are
  as serialized strings.
  ======================================= */

if ( !function_exists( 'daydream_suffix' ) ) {

	function daydream_suffix( $haystack, $needle, $case = true ) {
		$expectedPosition = strlen( $haystack ) - strlen( $needle );
		if ( $case ) {
			return strrpos( $haystack, $needle, 0 ) === $expectedPosition;
		}

		return strripos( $haystack, $needle, 0 ) === $expectedPosition;
	}

}

if ( !function_exists( 'daydream_fix_get_theme_mod' ) ) {

	function daydream_fix_get_theme_mod( $array_in ) {
		if ( $array_in && is_array( $array_in ) && count( $array_in ) ) {
			$enabled_temp = array();
			foreach ( $array_in as $key => $items ) {
				if ( 'placebo' != $items ) {
					if ( is_string( $key ) ) {
						$enabled_temp[ $key ] = $key;
					}
					if ( is_numeric( $key ) ) {
						$enabled_temp[ $items ] = $items;
					}
				}
			}
			if ( !class_exists( 'Woocommerce' ) ) {
				if ( isset( $enabled_temp[ 'woocommerce_product' ] ) ) {
					unset( $enabled_temp[ 'woocommerce_product' ] );
				}
			}

			return $enabled_temp;
		}

		return $array_in;
	}

}

global $daydream_customizer_fields;
$daydream_customizer_fields = get_option( 'daydream_all_customize_fields', false );

if ( !function_exists( 'daydream_theme_mod' ) ) {

	function daydream_theme_mod( $name, $default = false ) {
		global $daydream_customizer_fields;
		if ( $default == false ) {
			if ( $daydream_customizer_fields != false && isset( $daydream_customizer_fields[ $name ] ) && isset( $daydream_customizer_fields[ $name ][ 'value_temp' ] ) && isset( $daydream_customizer_fields[ $name ][ 'value_temp' ][ 'default' ] ) ) {
				$default = $daydream_customizer_fields[ $name ][ 'value_temp' ][ 'default' ];
			}
		}
		$result = get_theme_mod( $name, $default );
		if ( $result && is_array( $result ) && isset( $daydream_customizer_fields[ $name ] ) && isset( $daydream_customizer_fields[ $name ][ 'value' ][ 'type' ] ) && $daydream_customizer_fields[ $name ][ 'value' ][ 'type' ] == 'sorter' ) {
			$result = daydream_fix_get_theme_mod( $result );
		}
		if ( $result && is_array( $result ) && count( $result ) && isset( $result[ "url" ] ) ) {
			return $result[ "url" ];
		}
		if ( $result && is_array( $result ) && count( $result ) && isset( $result[ "enabled" ] ) && is_array( $result[ "enabled" ] ) && count( $result[ "enabled" ] ) ) {
			$enabled_temp = array();
			foreach ( $result[ "enabled" ] as $enabled_key => $items ) {
				$enabled_temp[] = $enabled_key;
			}

			return $enabled_temp;
		}
		if ( isset( $result[ 'color' ] ) && isset( $result[ 'alpha' ] ) ) {
			return daydream_hex_rgba( $result[ 'color' ], $result[ 'alpha' ] );
		}

		return $result;
		$config = get_option( 'daydream' );
		if ( !isset( $config[ 'id' ] ) ) {
			//return $default;
		}
		global $daydream_options;
		do_action( 'fix_daydream_options_data' );
		$options = $daydream_options;
		if ( isset( $GLOBALS[ 'redux_compiler_options' ] ) ) {
			$options = $GLOBALS[ 'redux_compiler_options' ];
		}
		if ( isset( $options[ $name ] ) ) {
			$mediaKeys = array(
				'dd_footer_background_image',
			);
			// Media SHIM
			if ( in_array( $name, $mediaKeys ) ) {
				if ( is_array( $options[ $name ] ) ) {
					return isset( $options[ $name ][ 'url' ] ) ? $options[ $name ][ 'url' ] : false;
				} else {
					return $options[ $name ];
				}
			}

			return $options[ $name ];
		}

		return $default;
	}

}

/**
 * 
 * Truncate content
 * 
 * @param type $str
 * @param type $length
 * @param type $trailing
 * @return type
 */
function daydream_truncate( $str, $length = 10, $trailing = '..' ) {
	$length -= mb_strlen( $trailing );
	if ( mb_strlen( $str ) > $length ) {
		return mb_substr( $str, 0, $length ) . $trailing;
	} else {
		$res = $str;
	}

	return $res;
}

function daydream_get_first_image() {
	global $post, $posts;
	$first_img	 = '';
	$output		 = preg_match_all( '/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches );
	if ( isset( $matches[ 1 ][ 0 ] ) ) {
		$first_img = $matches [ 1 ][ 0 ];

		return $first_img;
	}
}

if ( !function_exists( 'daydream_addURLParameter' ) ) {

	/**
	 * 
	 * daydream_addURLParameter
	 * 
	 * @param type $url
	 * @param type $paramName
	 * @param type $paramValue
	 * @return type
	 */
	function daydream_addURLParameter( $url, $paramName, $paramValue ) {
		$url_data = parse_url( $url );
		if ( !isset( $url_data[ "query" ] ) ) {
			$url_data[ "query" ] = "";
		}

		$params					 = array();
		parse_str( $url_data[ 'query' ], $params );
		$params[ $paramName ]	 = $paramValue;

		if ( $paramName == 'product_count' ) {
			$params[ 'paged' ] = '1';
		}
		$url_data[ 'query' ] = http_build_query( $params );

		return daydream_build_url( $url_data );
	}

}

function daydream_build_url( $url_data ) {
	$url = "";
	if ( isset( $url_data[ 'host' ] ) ) {
		$url .= $url_data[ 'scheme' ] . '://';
		if ( isset( $url_data[ 'user' ] ) ) {
			$url .= $url_data[ 'user' ];
			if ( isset( $url_data[ 'pass' ] ) ) {
				$url .= ':' . $url_data[ 'pass' ];
			}
			$url .= '@';
		}
		$url .= $url_data[ 'host' ];
		if ( isset( $url_data[ 'port' ] ) ) {
			$url .= ':' . $url_data[ 'port' ];
		}
	}
	if ( isset( $url_data[ 'path' ] ) ) {
		$url .= $url_data[ 'path' ];
	}
	if ( isset( $url_data[ 'query' ] ) ) {
		$url .= '?' . $url_data[ 'query' ];
	}
	if ( isset( $url_data[ 'fragment' ] ) ) {
		$url .= '#' . $url_data[ 'fragment' ];
	}

	return $url;
}

/**
 * 
 * Function to use get buddypress page id
 * 
 * @return string
 */
function daydream_bp_get_id() {
	$post_id	 = '';
	$bp_page_id	 = get_option( 'bp-pages' );

	if ( is_buddypress() ) {
		if ( bp_is_current_component( 'members' ) ) {
			$post_id = $bp_page_id[ 'members' ];
		} elseif ( bp_is_current_component( 'activity' ) ) {
			$post_id = $bp_page_id[ 'activity' ];
		} elseif ( bp_is_current_component( 'groups' ) ) {
			$post_id = $bp_page_id[ 'groups' ];
		} elseif ( bp_is_current_component( 'register' ) ) {
			$post_id = $bp_page_id[ 'register' ];
		} elseif ( bp_is_current_component( 'activate' ) ) {
			$post_id = $bp_page_id[ 'activate' ];
		} else {
			$post_id = '';
		}
	}

	return $post_id;
}

/*
 * function to print out css class and check titlebar and breadcrumb on or off according to layout
 * used in page.php
 *
 */

if ( !function_exists( 'daydream_print_fonts' ) ) {

	function daydream_print_fonts( $name, $css_class, $additional_css = '', $additional_color_css_class = '', $imp = '' ) {
		global $options;
		$options[ $name ] = daydream_theme_mod( $name );

		$css		 = "$css_class {";
		$font_size	 = '';
		$font_family = '';
		$font_style	 = '';
		$font_weight = '';
		$font_align	 = '';
		$color		 = '';
		if ( isset( $options[ $name ][ 'font-size' ] ) && $options[ $name ][ 'font-size' ] != '' ) {
			$font_size	 = $options[ $name ][ 'font-size' ];
			$css		 .= " font-size: " . $font_size . "" . $imp . ";";
		}
		if ( isset( $options[ $name ][ 'font-family' ] ) && $options[ $name ][ 'font-family' ] != '' ) {
			$font_family = $options[ $name ][ 'font-family' ];
			$css		 .= " font-family: " . $font_family . ";";
		}
		if ( isset( $options[ $name ][ 'font-style' ] ) && $options[ $name ][ 'font-style' ] != '' ) {
			$font_style	 = $options[ $name ][ 'font-style' ];
			$css		 .= " font-style: " . $font_style . ";";
		}
		if ( isset( $options[ $name ][ 'font-weight' ] ) && $options[ $name ][ 'font-weight' ] != '' ) {
			$font_weight = $options[ $name ][ 'font-weight' ];
			$css		 .= " font-weight: " . $font_weight . ";";
		}
		if ( isset( $options[ $name ][ 'text-align' ] ) && $options[ $name ][ 'text-align' ] != '' ) {
			$font_align	 = $options[ $name ][ 'text-align' ];
			$css		 .= " text-align: " . $font_align . ";";
		}
		if ( isset( $options[ $name ][ 'color' ] ) && $options[ $name ][ 'color' ] != '' ) {
			$color	 = $options[ $name ][ 'color' ];
			$css	 .= " color: " . $color . ";";
		}
		if ( $additional_css != '' ) {
			$css .= "" . $additional_css . ";";
		}
		$css .= " }";
		if ( isset( $options[ $name ][ 'color' ] ) && $additional_color_css_class != '' ) {
			$color	 = $options[ $name ][ 'color' ];
			$css	 .= "$additional_color_css_class{ color:" . $color . "; }";
		}

		return $css;
	}

}

/**
 * 
 * Blog Number Pagination
 * 
 * @global type $wp_query
 */
function daydream_paginate_links() {
	ob_start();

	global $wp_query;
	$current = max( 1, absint( get_query_var( 'paged' ) ) );

	$pagination = paginate_links( array(
		'base'		 => str_replace( PHP_INT_MAX, '%#%', esc_url( get_pagenum_link( PHP_INT_MAX ) ) ),
		'format'	 => '?paged=%#%',
		'current'	 => $current,
		'total'		 => $wp_query->max_num_pages,
		'type'		 => 'array',
		'prev_text'	 => '<i class="fa fa-angle-left"></i>',
		'next_text'	 => '<i class="fa fa-angle-right"></i>',
	) );

	if ( !empty( $pagination ) ) {
		?>
		<ul class="pagination">
			<?php foreach ( $pagination as $key => $page_link ) { ?>
				<li class="paginated_link <?php
				if ( strpos( $page_link, 'current' ) !== false ) {
					echo 'active';
				}
				?>">
						<?php echo wp_kses_post( $page_link ); ?>
				</li>
			<?php } ?>
		</ul>
		<?php
	}
	$links = ob_get_clean();
	echo $links;
}

/**
 * 
 * ThemeVedanta Core Blog Shortcode
 * 
 * @param type $m
 * @return type
 */
function daydream_process_tag( $m ) {
	if ( $m[ 2 ] == 'dropcap' || $m[ 2 ] == 'highlight' || $m[ 2 ] == 'tooltip' ) {
		return $m[ 0 ];
	}

	// allow [[foo]] syntax for escaping a tag
	if ( $m[ 1 ] == '[' && $m[ 6 ] == ']' ) {
		return substr( $m[ 0 ], 1, - 1 );
	}

	return $m[ 1 ] . $m[ 6 ];
}

if ( !function_exists( 'daydream_hexdarker' ) ) {

	// ThemeVedanta Core Button Shortcode
	function daydream_hexdarker( $hex, $factor = 10 ) {
		$new_hex = '';

		$base[ 'R' ] = hexdec( $hex{0} . $hex{1} );
		$base[ 'G' ] = hexdec( $hex{2} . $hex{3} );
		$base[ 'B' ] = hexdec( $hex{4} . $hex{5} );

		foreach ( $base as $k => $v ) {
			$amount		 = $v / 100;
			$amount		 = round( $amount * $factor );
			$new_decimal = $v - $amount;

			$new_hex_component = dechex( $new_decimal );
			if ( strlen( $new_hex_component ) < 2 ) {
				$new_hex_component = "0" . $new_hex_component;
			}
			$new_hex .= $new_hex_component;
		}

		return $new_hex;
	}

}

function daydream_hex2rgb( $hex ) {
	if ( strpos( $hex, 'rgb' ) !== false ) {

		$rgb_part	 = strstr( $hex, '(' );
		$rgb_part	 = trim( $rgb_part, '(' );
		$rgb_part	 = rtrim( $rgb_part, ')' );
		$rgb_part	 = explode( ',', $rgb_part );

		$rgb = array( $rgb_part[ 0 ], $rgb_part[ 1 ], $rgb_part[ 2 ], $rgb_part[ 3 ] );
	} elseif ( $hex == 'transparent' ) {
		$rgb = array( '255', '255', '255', '0' );
	} else {

		$hex = str_replace( '#', '', $hex );

		if ( strlen( $hex ) == 3 ) {
			$r	 = hexdec( substr( $hex, 0, 1 ) . substr( $hex, 0, 1 ) );
			$g	 = hexdec( substr( $hex, 1, 1 ) . substr( $hex, 1, 1 ) );
			$b	 = hexdec( substr( $hex, 2, 1 ) . substr( $hex, 2, 1 ) );
		} else {
			$r	 = hexdec( substr( $hex, 0, 2 ) );
			$g	 = hexdec( substr( $hex, 2, 2 ) );
			$b	 = hexdec( substr( $hex, 4, 2 ) );
		}
		$rgb = array( $r, $g, $b );
	}

	return $rgb; // returns an array with the rgb values
}

/**
 * 
 * Display hero header content like parallax,
 * 
 * @param type $param
 */
function daydream_heroheadertype( $param ) {
	$background_type = '';
	$parallax_class	 = '';

	// Image Background Type
	if ( isset( $param[ 'daydream_hero_type' ] ) && $param[ 'daydream_hero_type' ] == 'hero_parallax' && isset( $param[ 'daydream_hero_image_parallax' ] ) && $param[ 'daydream_hero_image_parallax' ] ) {
		$background_type = 'data-background="' . esc_attr( wp_get_attachment_url( $param[ 'daydream_hero_image_parallax' ] ) ) . '"';
		$parallax_class	 = 'module-hero parallax';
	}

	// Alighnment Style
	if ( isset( $param[ 'daydream_hero_content_alignment' ] ) && $param[ 'daydream_hero_content_alignment' ] ) {
		$align = $param[ 'daydream_hero_content_alignment' ];
	}

	// Hero Header Height Class
	if ( isset( $param[ 'daydream_hero_height' ] ) && $param[ 'daydream_hero_height' ] ) {
		$hero_height = $param[ 'daydream_hero_height' ];
	}

	if ( $background_type ) :
		?>
		<!-- HERO -->
		<section id="hero" class="bg-black-alfa-30 color-white hero-height-<?php echo esc_attr( $hero_height ); ?> <?php echo esc_attr( $parallax_class ); ?>" <?php echo $background_type; ?>>
			<!-- HERO TEXT -->
			<div class="hero-caption">
				<div class="hero-text">

					<div class="container">

						<div class="row">
							<div class="col-sm-12 text-<?php echo esc_attr( $align ); ?>">
								<?php if ( isset( $param[ 'daydream_hero_heading' ] ) && $param[ 'daydream_hero_heading' ] ) { ?>
									<h1 class="text-title text-uppercase hero_header_heading"><?php echo esc_html( $param[ 'daydream_hero_heading' ] ); ?></h1>
									<?php
								}
								if ( isset( $param[ 'daydream_hero_caption' ] ) && $param[ 'daydream_hero_caption' ] ) {
									?>
									<p class="hero_header_caption"><?php echo esc_html( $param[ 'daydream_hero_caption' ] ); ?></p>
									<?php
								}
								?>
							</div>
						</div>

					</div>

				</div>
			</div>
			<!-- END HERO TEXT -->
		</section>
		<!-- END HERO -->
		<?php
	endif;
}

// -> START WooComm page wrapper
function daydream_shop_wrapper_strat() {
	ob_start();
	?>
	<!-- SHOP DETAILS -->
	<section class="module p-tb-content">
		<div class="container">
			<div class="row">

				<!-- PRIMARY -->
				<div id="primary" class="<?php esc_attr( daydream_layout_class( $type			 = 1 ) ); ?> post-content">
					<?php
					$wrapper_strat	 = ob_get_clean();
					echo $wrapper_strat;
				}

				function daydream_shop_wrapper_end() {
					ob_start();
					?>
				</div>
				<!-- END PRIMARY -->

				<!-- SECONDARY-1 -->
				<?php
				if ( daydream_lets_get_sidebar() == true ) {
					get_sidebar();
				}
				?>
				<!-- END SECONDARY-1 -->

			</div><!-- .row -->
		</div>
	</section>
	<!-- END SHOP DETAILS -->
	<?php
	$wrapper_end = ob_get_clean();
	echo $wrapper_end;
}

// -> END WooComm page wrapper
// -> START Daydream Page Title Bar
function daydream_page_title_bar() {
	?>
	<!-- PAGE TITLE -->
	<section class="<?php echo esc_attr( daydream_titlebar_bg_class() ); ?>">
		<div class="container">
			<div class="row">
				<div class="page-title-wrapper col-sm-12">
					<?php
					global $post, $wp_query;

					$title		 = '';
					$description = '';

					if ( !$title ) {
						$title = get_the_title();

						if ( is_home() ) {
							$title = __( 'Blog', 'daydream' );
						}

						if ( is_search() ) {
							$title = __( 'Search Result For:', 'daydream' ) . get_search_query();
						}

						if ( is_404() ) {
							$title = __( '404 - Page not Found', 'daydream' );
						}

						if ( is_archive() && !is_bbpress() ) {
							if ( is_day() ) {
								$title = __( 'Daily Archives: ', 'daydream' ) . '<span>' . get_the_date() . '</span>';
							} else if ( is_month() ) {
								$title = __( 'Monthly Archives: ', 'daydream' ) . '<span>' . get_the_date( _x( 'F Y', 'monthly archives date format', 'daydream' ) ) . '</span>';
							} elseif ( is_year() ) {
								$title = __( 'Yearly Archives: ', 'daydream' ) . '<span>' . get_the_date( _x( 'Y', 'yearly archives date format', 'daydream' ) ) . '</span>';
							} elseif ( is_author() ) {
								$curauth = ( isset( $_GET[ 'author_name' ] ) ) ? get_user_by( 'slug', sanitize_text_field( $_GET[ 'author_name' ] ) ) : get_user_by( 'id', get_the_author_meta( 'ID' ) );
								$title	 = $curauth->nickname;
							} else {
								$title		 = single_cat_title( '', false );
								$description = get_the_archive_description();
							}
						}

						if ( class_exists( 'Woocommerce' ) && is_woocommerce() && ( is_product() || is_shop() ) && !is_search() ) {
							if ( !is_product() ) {
								$title = woocommerce_page_title( false );
							}
						}
					}
					?>

					<div class="<?php echo esc_attr( daydream_titlebar_center_class() ); ?>">

						<div class="<?php echo esc_attr( daydream_titlebar_left_class() ); ?>">
							<?php
							if ( daydream_titlebar_title_check() == true ) {
								?>
								<h3 class="entry-title text-title text-uppercase m-b-10">
									<?php echo wp_kses_data( $title ); ?>
								</h3>

								<?php
								if ( $description ) {
									?>
									<div class="taxonomy-description"><?php echo $description; ?></div>
									<?php
								}
							}
							?>
						</div>

						<div class="<?php echo esc_attr( daydream_titlebar_right_class() ); ?>">    
							<?php
							if ( daydream_titlebar_breadcrumb_check() == true ) {
								if ( is_bbpress() ) {
									bbp_breadcrumb();
								} elseif ( is_product() ) {
									woocommerce_breadcrumb();
								} else {
									daydream_breadcrumb();
								}
							}
							?>
						</div>

						<div class="clearfix"></div>
					</div>

				</div>
			</div>
		</div>
	</section>
	<!-- END PAGE TITLE -->
	<?php
}

function daydream_titlebar_bg_class() {
	global $wp_query, $post;
	$post_id = '';
	if ( $wp_query->is_posts_page ) {
		$post_id = get_option( 'page_for_posts' );
	} elseif ( is_buddypress() ) {
		$post_id = daydream_bp_get_id();
	} else {
		$post_id = isset( $post->ID ) ? $post->ID : '';
	}

	$titlebar_bg = 'titlebar-bg';

	$dd_pagetitlebar_height			 = daydream_theme_mod( 'dd_pagetitlebar_height', 'medium' );
	$daydream_page_title_bar_height	 = get_post_meta( $post_id, 'daydream_page_title_bar_height', true );
	if ( !$daydream_page_title_bar_height ) {
		$daydream_page_title_bar_height = 'default';
	}
	if ( $daydream_page_title_bar_height == 'small' || ( $daydream_page_title_bar_height == 'default' && $dd_pagetitlebar_height == 'small' ) ) {
		$titlebar_bg .= ' module-xs';
	} elseif ( $daydream_page_title_bar_height == 'medium' || ( $daydream_page_title_bar_height == 'default' && $dd_pagetitlebar_height == 'medium' ) ) {
		$titlebar_bg .= ' module-sm';
	} elseif ( $daydream_page_title_bar_height == 'large' || ( $daydream_page_title_bar_height == 'default' && $dd_pagetitlebar_height == 'large' ) ) {
		$titlebar_bg .= ' module-md';
	} elseif ( $daydream_page_title_bar_height == 'custom' || ( $daydream_page_title_bar_height == 'default' && $dd_pagetitlebar_height == 'custom' ) ) {
		$titlebar_bg .= ' titlebar-custom';
	}

	return $titlebar_bg;
}

function daydream_titlebar_left_class() {
	$titlebar_layout = '';

	$dd_pagetitlebar_layout_opt = daydream_theme_mod( 'dd_pagetitlebar_layout_opt', 'titlebar_left' );

	if ( $dd_pagetitlebar_layout_opt == "titlebar_left" ) {
		$titlebar_layout = 'float-left';
	} elseif ( $dd_pagetitlebar_layout_opt == "titlebar_right" ) {
		$titlebar_layout = 'float-right';
	} elseif ( $dd_pagetitlebar_layout_opt == "titlebar_center" ) {
		$titlebar_layout = 'dd-dump';
	} else {
		$titlebar_layout = 'dd-dump';
	}

	return $titlebar_layout;
}

function daydream_titlebar_right_class() {
	$titlebar_layout = '';

	$dd_pagetitlebar_layout_opt = daydream_theme_mod( 'dd_pagetitlebar_layout_opt', 'titlebar_left' );

	if ( $dd_pagetitlebar_layout_opt == "titlebar_left" ) {
		$titlebar_layout = 'float-right';
	} elseif ( $dd_pagetitlebar_layout_opt == "titlebar_right" ) {
		$titlebar_layout = 'float-left';
	} elseif ( $dd_pagetitlebar_layout_opt == "titlebar_center" ) {
		$titlebar_layout = 'dd-dump';
	} else {
		$titlebar_layout = 'dd-dump';
	}

	return $titlebar_layout;
}

function daydream_titlebar_center_class() {
	$titlebar_layout = '';

	$dd_pagetitlebar_layout_opt = daydream_theme_mod( 'dd_pagetitlebar_layout_opt', 'titlebar_left' );

	if ( $dd_pagetitlebar_layout_opt == "titlebar_left" ) {
		$titlebar_layout = 'dd-dump';
	} elseif ( $dd_pagetitlebar_layout_opt == "titlebar_right" ) {
		$titlebar_layout = 'dd-dump';
	} elseif ( $dd_pagetitlebar_layout_opt == "titlebar_center" ) {
		$titlebar_layout = 'text-center';
	} else {
		$titlebar_layout = 'dd-dump';
	}

	return $titlebar_layout;
}

function daydream_titlebar_title_check() {

	global $wp_query, $post;
	$post_id = '';
	if ( $wp_query->is_posts_page ) {
		$post_id = get_option( 'page_for_posts' );
	} elseif ( is_buddypress() ) {
		$post_id = daydream_bp_get_id();
	} else {
		$post_id = isset( $post->ID ) ? $post->ID : '';
	}

	$get_titlebar = false;

	$dd_display_pagetitlebar	 = daydream_theme_mod( 'dd_display_pagetitlebar', 'titlebar_breadcrumb' );
	$daydream_display_page_title = get_post_meta( $post_id, 'daydream_display_page_title', true );
	if ( !$daydream_display_page_title ) {
		$daydream_display_page_title = 'default';
	}
	if ( is_search() || is_404() || is_archive() || is_bbpress() || is_product() ) {
		if ( $dd_display_pagetitlebar == "titlebar_breadcrumb" || $dd_display_pagetitlebar == "titlebar" ) {
			$get_titlebar = true;
		}
	} elseif ( is_single() || is_page() || is_buddypress() || is_home() ) {
		if ( $daydream_display_page_title == "default" && ($dd_display_pagetitlebar == "titlebar_breadcrumb" || $dd_display_pagetitlebar == "titlebar") ) {
			$get_titlebar = true;
		}
		if ( $daydream_display_page_title != "default" && ($daydream_display_page_title == 'titlebar' || $daydream_display_page_title == 'titlebar_breadcrumb') ) {
			$get_titlebar = true;
		}
	} else {
		if ( $dd_display_pagetitlebar == "titlebar_breadcrumb" || $dd_display_pagetitlebar == "titlebar" ) {
			$get_titlebar = true;
		}
	}
	return $get_titlebar;
}

function daydream_titlebar_breadcrumb_check() {
	global $wp_query, $post;

	if ( $wp_query->is_posts_page ) {
		$post_id = get_option( 'page_for_posts' );
	} elseif ( function_exists( 'is_buddypress' ) ) {
		if ( is_buddypress() ) {
			$post_id = daydream_bp_get_id();
		} else {
			$post_id = isset( $post->ID ) ? $post->ID : '';
		}
	} else {
		$post_id = isset( $post->ID ) ? $post->ID : '';
	}

	$get_titlebar				 = false;
	$dd_display_pagetitlebar	 = daydream_theme_mod( 'dd_display_pagetitlebar', 'titlebar_breadcrumb' );
	$daydream_display_page_title = get_post_meta( $post_id, 'daydream_display_page_title', true );
	if ( !$daydream_display_page_title ) {
		$daydream_display_page_title = 'default';
	}
	if ( is_search() || is_404() || is_archive() || is_bbpress() || is_product() ) {
		if ( $dd_display_pagetitlebar == "titlebar_breadcrumb" || $dd_display_pagetitlebar == "titlebar" ) {
			$get_titlebar = true;
		}
	} elseif ( is_single() || is_page() || is_buddypress() || is_home() ) {
		if ( $daydream_display_page_title == "default" && ($dd_display_pagetitlebar == "titlebar_breadcrumb" || $dd_display_pagetitlebar == "breadcrumb") ) {
			$get_titlebar = true;
		}
		if ( $daydream_display_page_title != "default" && ($daydream_display_page_title == 'breadcrumb' || $daydream_display_page_title == 'titlebar_breadcrumb') ) {
			$get_titlebar = true;
		}
	} else {
		if ( $dd_display_pagetitlebar == "titlebar_breadcrumb" || $dd_display_pagetitlebar == "breadcrumb" ) {
			$get_titlebar = true;
		}
	}

	return $get_titlebar;
}

function daydream_breadcrumb() {
	?>

	<ol class="breadcrumb text-xs">

		<li><a class="home" href="<?php echo esc_url( home_url() ); ?>" ><?php esc_html_e( 'Home', 'daydream' ); ?></a></li>

		<?php
		global $post;

		$params[ 'link_none' ]	 = '';
		$separator				 = '';

		if ( is_category() ) {
			$thisCat = get_category( get_query_var( 'cat' ), false );
			if ( $thisCat->parent != 0 ) {
				$cats	 = get_category_parents( $thisCat->parent, TRUE );
				$cats	 = explode( '</a>/', $cats );
				foreach ( $cats as $key => $cat ) {
					if ( $cat )
						echo '<li>' . wp_kses_post($cat) . '</li>';
				}
			}
			echo '<li>' . esc_html( $thisCat->name ) . '</li>';
		}

		if ( is_tax() ) {
			$term = get_term_by( 'slug', get_query_var( 'term' ), get_query_var( 'taxonomy' ) );
			echo '<li>' . esc_html( $term->name ) . '</li>';
		}

		if ( is_home() ) {
			echo '<li>' . esc_html__( 'Blog', 'daydream' ) . '</li>';
		}
		if ( is_page() && !is_front_page() ) {
			$parents	 = array();
			$parent_id	 = $post->post_parent;
			while ( $parent_id ) :
				$page = get_page( $parent_id );
				if ( $params[ "link_none" ] ) {
					$parents[] = get_the_title( $page->ID );
				} else {
					$parents[] = '<li><a href="' . esc_url( get_permalink( $page->ID ) ) . '" title="' . get_the_title( $page->ID ) . '">' . get_the_title( $page->ID ) . '</a></li>' . $separator;
				}
				$parent_id = $page->post_parent;
			endwhile;
			$parents = array_reverse( $parents );
			echo join( ' ', $parents );
			echo '<li>' . get_the_title() . '</li>';
		}
		if ( is_single() && !is_attachment() ) {
			$cat_1_line		 = '';
			$categories_1	 = get_the_category( $post->ID );
			if ( $categories_1 ):
				foreach ( $categories_1 as $cat_1 ):
					$cat_1_ids[] = $cat_1->term_id;
				endforeach;
				$cat_1_line = implode( ',', $cat_1_ids );
			endif;
			$categories = get_categories( array(
				'include'	 => $cat_1_line,
				'orderby'	 => 'id'
			) );
			if ( $categories ) :
				foreach ( $categories as $cat ) :
					$cats[] = '<li><a href="' . esc_url( get_category_link( $cat->term_id ) ) . '" title="' . $cat->name . '">' . esc_html( $cat->name ) . '</a></li>';
				endforeach;
				echo join( ' ', $cats );
			endif;
			echo '<li>' . get_the_title() . '</li>';
		}
		if ( is_tag() ) {
			echo '<li>' . '"' . esc_html__( 'Tag:', 'daydream' ) . '"' . single_tag_title( '', false ) . '</li>';
		}
		if ( is_404() ) {
			echo '<li>' . esc_html__( "404 - Page not Found", 'daydream' ) . '</li>';
		}
		if ( is_search() ) {
			echo '<li>' . esc_html__( "Search", 'daydream' ) . '</li>';
		}
		if ( is_day() ) {
			echo '<li><a href="' . esc_url( get_year_link( get_the_time( 'Y' ) ) ) . '">' . get_the_time( 'Y' ) . "</a></li>";
			echo '<li><a href="' . esc_url( get_month_link( get_the_time( 'Y' ) ), get_the_time( 'm' ) ) . '">' . get_the_time( 'F' ) . "</a></li>";
			echo '<li>' . get_the_time( 'd' ) . '</li>';
		}
		if ( is_month() ) {
			echo '<li><a href="' . esc_url( get_year_link( get_the_time( 'Y' ) ) ) . '">' . get_the_time( 'Y' ) . "</a></li>";
			echo '<li>' . get_the_time( 'F' ) . '</li>';
		}
		if ( is_year() ) {
			echo '<li>' . get_the_time( 'Y' ) . '</li>';
		}
		if ( is_attachment() ) {
			if ( !empty( $post->post_parent ) ) {
				echo "<li><a href='" . esc_url( get_permalink( $post->post_parent ) ) . "'>" . get_the_title( $post->post_parent ) . "</a></li>";
			}
			echo "<li>" . get_the_title() . "</li>";
		}
		?>
	</ol>
	<?php
}

// -> END Daydream Page Title Bar
// -> START Daydream General Layout Functions

/**
 * 
 * Function to print out css class according to layout or post meta
 * used in content.php, index.php, buddypress.php, bbpress.php
 * 
 * @global string $post
 * @global type $wp_query
 * @param type $type
 * $type = 1 is for content-blog.php and index.php
 * $type = 2 is for buddypress.php and bbpress.php
 * 
 */
function daydream_layout_class( $type = 1 ) {
	global $post, $wp_query;

	$dd_layout					 = daydream_theme_mod( 'dd_layout', '2cl' );
	$dd_post_layout				 = daydream_theme_mod( 'dd_post_layout', 'two' );
	$dd_opt1_width_content		 = daydream_theme_mod( 'dd_opt1_width_content', '9' );
	$daydream_sidebar_position	 = get_post_meta( $post->ID, 'daydream_sidebar_position', true );
	if ( !$daydream_sidebar_position ) {
		$daydream_sidebar_position = 'default';
	}

	$post_id = '';
	if ( $wp_query->is_posts_page ) {
		$post_id = get_option( 'page_for_posts' );
	} elseif ( is_buddypress() ) {
		$post_id = daydream_bp_get_id();
	} else {
		$post_id = isset( $post->ID ) ? $post->ID : '';
	}

	$layout_css = '';

	switch ( $dd_layout ):
		case "1c":
			$layout_css	 = 'col-md-12 full-width';
			break;
		case "2cl":
			$layout_css	 = 'col-md-' . $dd_opt1_width_content . ' float-left';
			break;
		case "2cr":
			$layout_css	 = 'col-md-' . $dd_opt1_width_content . ' float-right';
			break;

	endswitch;

	if ( (is_single() || is_page() || $wp_query->is_posts_page || is_buddypress() || is_bbpress()) && ($daydream_sidebar_position && $daydream_sidebar_position != 'default') ):

		if ( ($type == 1 && $daydream_sidebar_position == '1c') || ($type == 2 && $daydream_sidebar_position == '1c') ) {
			$layout_css = 'col-md-12 full-width';
		}

		switch ( $daydream_sidebar_position ):
			case "1c":
				$layout_css	 = 'col-md-12 full-width';
				break;
			case "2cl":
				$layout_css	 = 'col-md-' . $dd_opt1_width_content . ' float-left';
				break;
			case "2cr":
				$layout_css	 = 'col-md-' . $dd_opt1_width_content . ' float-right';
				break;

		endswitch;

	endif;

	if ( $type == 1 ) {
		if ( class_exists( 'Woocommerce' ) ):
			if ( is_product() || is_cart() || is_checkout() || is_account_page() || (get_option( 'woocommerce_thanks_page_id' ) && is_page( get_option( 'woocommerce_thanks_page_id' ) )) ) {
				$layout_css = 'col-md-12 full-width';
			}
		endif;
	}

	if ( is_single() || is_page() || $wp_query->is_posts_page || is_buddypress() || is_bbpress() ) {
		$layout_css .= ' col-single';
	}

	echo $layout_css;
}

/**
 * 
 * function to determine whether to get_sidebar, depending on theme options layout and post meta layout.
 * used in 404.php, archive.php, attachment.php, author.php, bbpress.php, blog-page.php,... 
 * buddypress.php, index.php, page.php, search.php single.php
 * 
 * @global type $wp_query
 * @global string $post
 * @return boolean
 */
function daydream_lets_get_sidebar() {

	global $wp_query, $post;
	$post_id = '';
	if ( $wp_query->is_posts_page ) {
		$post_id = get_option( 'page_for_posts' );
	} elseif ( is_buddypress() ) {
		$post_id = daydream_bp_get_id();
	} else {
		$post_id = isset( $post->ID ) ? $post->ID : '';
	}

	$get_sidebar = false;

	$dd_layout					 = daydream_theme_mod( 'dd_layout', '2cl' );
	$daydream_sidebar_position	 = get_post_meta( $post_id, 'daydream_sidebar_position', true );
	if ( !$daydream_sidebar_position ) {
		$daydream_sidebar_position = 'default';
	}
	if ( $dd_layout != "1c" ) {
		$get_sidebar = true;
	}

	if ( (is_single() || is_page() || $wp_query->is_posts_page || is_buddypress() || is_bbpress()) && ($daydream_sidebar_position && $daydream_sidebar_position != 'default') ):

		if ( $daydream_sidebar_position != '1c' ) {
			$get_sidebar = true;
		} else {
			$get_sidebar = false;
		}

	endif;

	return $get_sidebar;
}

/**
 * 
 * Print out css class according to layout
 * used in sidebar.php
 * 
 * @global type $wp_query
 * @global string $post
 */
function daydream_sidebar_class() {
	global $wp_query, $post;

	$post_id = '';
	if ( $wp_query->is_posts_page ) {
		$post_id = get_option( 'page_for_posts' );
	} elseif ( is_buddypress() ) {
		$post_id = daydream_bp_get_id();
	} else {
		$post_id = isset( $post->ID ) ? $post->ID : '';
	}

	$sidebar_css = '';

	$dd_layout				 = daydream_theme_mod( 'dd_layout', '2cl' );
	$dd_opt1_width_sidebar1	 = daydream_theme_mod( 'dd_opt1_width_sidebar1', '3' );

	switch ( $dd_layout ):
		case "1c":
			//do nothing
			break;
		case "2cl":
			$sidebar_css = 'col-sm-6 col-md-' . $dd_opt1_width_sidebar1 . '';
			break;
		case "2cr":
			$sidebar_css = 'col-sm-6 col-md-' . $dd_opt1_width_sidebar1 . '';
			break;

	endswitch;

	$daydream_sidebar_position = get_post_meta( $post_id, 'daydream_sidebar_position', true );
	if ( !$daydream_sidebar_position ) {
		$daydream_sidebar_position = 'default';
	}
	if ( (is_page() || is_single()) && ($daydream_sidebar_position && $daydream_sidebar_position != 'default') ):
		switch ( $daydream_sidebar_position ):
			case "1c":
				//do nothing
				break;
			case "2cl":
				$sidebar_css = 'col-sm-6 col-md-' . $dd_opt1_width_sidebar1 . '';
				break;
			case "2cr":
				$sidebar_css = 'col-sm-6 col-md-' . $dd_opt1_width_sidebar1 . '';
				break;

		endswitch;
	endif;

	echo $sidebar_css;
}

// -> END Daydream General Layout Functions

/**
 * Check if $no_seconds have passed since theme was activated.
 * Used to perform certain actions, like displaying upsells or add a new recommended action in About Daydream page.
 *
 * @param integer $no_seconds number of seconds.
 *
 * @return bool
 */
function daydream_check_passed_time( $no_seconds ) {
	$activation_time = get_option( 'daydream_time_activated' );
	if ( !empty( $activation_time ) ) {
		$current_time	 = time();
		$time_difference = (int) $no_seconds;
		if ( $current_time >= $activation_time + $time_difference ) {
			return true;
		} else {
			return false;
		}
	}

	return true;
}
