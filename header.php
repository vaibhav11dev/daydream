<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div class="wrapper">
 *
 *
 * @package daydream
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="profile" href="http://gmpg.org/xfn/11">

		<?php wp_head(); ?>
	</head>

	<body <?php body_class(); ?>>

		<?php
		global $post, $wp_query;

		$post_id = '';
		if ( $wp_query->is_posts_page ) {
			$post_id = get_option( 'page_for_posts' );
		} elseif ( is_buddypress() ) {
			$post_id = daydream_bp_get_id();
		} else {
			$post_id = isset( $post->ID ) ? $post->ID : '';
		}

		$dd_siteloader	 = daydream_theme_mod( 'dd_siteloader', '0' );
		$dd_loaderfile	 = daydream_theme_mod( 'dd_loaderfile' );
		if ( $dd_siteloader == 1 ) {
			?>
			<!-- PRELOADER -->
			<div class="page-loader">
				<div class="loader"><img src="<?php echo esc_url($dd_loaderfile); ?>" alt="loading..." >
				</div>
			</div>
			<!-- END PRELOADER -->
			<?php
		}

		$dd_header_type			 = daydream_theme_mod( 'dd_header_type', 'h1' );
		$daydream_header_type	 = get_post_meta( $post_id, 'daydream_header_type', true );
		if ( !$daydream_header_type ) {
			$daydream_header_type = 'default';
		}

		if ( is_page() ) {
			if ( (($daydream_header_type == 'h4') || ($daydream_header_type == 'default' && $dd_header_type == 'h4')) || (($daydream_header_type == 'h5') || ($daydream_header_type == 'default' && $dd_header_type == 'h5')) ) {
				get_template_part( 'includes/headers/header-topbar' );
				get_template_part( 'includes/headers/header-main' );
			}
		} else {
			if ( $dd_header_type == 'h4' || $dd_header_type == 'h5' ) {
				get_template_part( 'includes/headers/header-topbar' );
				get_template_part( 'includes/headers/header-main' );
			}
		}

		if ( is_page() ) {
			if ( (($daydream_header_type == 'h1') || ($daydream_header_type == 'default' && $dd_header_type == 'h1')) || (($daydream_header_type == 'h2') || ($daydream_header_type == 'default' && $dd_header_type == 'h2')) ) {
				get_template_part( 'includes/headers/header-main' );
			}
		} else {
			if ( $dd_header_type == 'h1' || $dd_header_type == 'h2' ) {
				get_template_part( 'includes/headers/header-main' );
			}
		}
		?>
		<!-- WRAPPER -->
		<div class="wrapper">

			<?php
			$daydream_hero_header_type = get_post_meta( $post_id, 'daydream_hero_header_type', true );

			$param										 = array();
			$param[ 'daydream_hero_type' ]				 = $daydream_hero_header_type;
			$param[ 'daydream_hero_height' ]			 = get_post_meta( $post_id, 'daydream_hero_height', true );
			$param[ 'daydream_hero_content_alignment' ]	 = get_post_meta( $post_id, 'daydream_hero_content_alignment', true );
			$param[ 'daydream_hero_heading' ]			 = get_post_meta( $post_id, 'daydream_hero_heading', true );
			$param[ 'daydream_hero_caption' ]			 = get_post_meta( $post_id, 'daydream_hero_caption', true );
			$param[ 'daydream_hero_image_parallax' ]	 = get_post_meta( $post_id, 'daydream_hero_image_parallax', true );

			if ( $daydream_hero_header_type == 'hero_parallax' || $daydream_hero_header_type == 'hero_self_hosted_video' || $daydream_hero_header_type == 'hero_youtube' || $daydream_hero_header_type == 'hero_vimeo' ) {
				daydream_heroheadertype( $param );
			}
			?>

			<?php
			$dd_pagetitlebar_layout		 = daydream_theme_mod( 'dd_pagetitlebar_layout', 1 );
			$daydream_enable_page_title	 = get_post_meta( $post_id, 'daydream_enable_page_title', true );
			if ( !$daydream_enable_page_title ) {
				$daydream_enable_page_title = 'default';
			}
			if ( is_home() || is_front_page() ) {
				//Do Nothing
			} elseif ( $daydream_enable_page_title == 'on' || ( $daydream_enable_page_title == 'default' && $dd_pagetitlebar_layout == 1 ) ) {
				daydream_page_title_bar();
			}
	    