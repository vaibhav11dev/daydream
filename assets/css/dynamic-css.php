<?php

global $post, $wp_query;
$daydream_dynamic_css	 = '';
$daydream_template_url	 = get_template_directory_uri();

$post_id = '';
if ( $wp_query->is_posts_page ) {
    $post_id = get_option( 'page_for_posts' );
} else {
    $post_id = isset( $post->ID ) ? $post->ID : '';
}

/* -----------------------------------------------------------------
  [Custom Header Image]
 */
$dd_header_image			 = daydream_theme_mod( 'dd_header_image', 'cover' );
$dd_header_background_color		 = daydream_theme_mod( 'dd_header_background_color', '#ffffff' );
$dd_header_image_background_repeat	 = daydream_theme_mod( 'dd_header_image_background_repeat', 'no-repeat' );
$dd_header_image_background_position	 = daydream_theme_mod( 'dd_header_image_background_position', 'center top' );
if ( get_header_image() ) {
    $daydream_dynamic_css .= '
		.header-bg {	
			background-image: url(' . esc_url( get_header_image() ) . ');
			background-color: ' . esc_attr( $dd_header_background_color ) . ';
			background-position: ' . esc_attr( $dd_header_image_background_position ) . ';
			background-repeat: ' . esc_attr( $dd_header_image_background_repeat ) . ';
			background-size: ' . esc_attr( $dd_header_image ) . ';
			box-shadow: none;
		}
		';
}


/* -----------------------------------------------------------------
  [General Layout Options]
 */
$dd_width_layout		 = daydream_theme_mod( 'dd_width_layout' );
$dd_width_px			 = daydream_theme_mod( 'dd_width_px' );
$dd_custom_width_px		 = daydream_theme_mod( 'dd_custom_width_px' );
$dd_container_width_px		 = (int) $dd_width_px - 30;
$dd_container_custom_width_px	 = (int) $dd_custom_width_px - 30;

//General - Layout Width
if ( $dd_width_px != "custom" && ( $dd_width_layout == "fixed" ) && ! is_page_template( 'fullwidth-fluid.php' ) ) {
    $daydream_dynamic_css .= '
		body {
	width: ' . esc_attr( $dd_width_px ) . 'px;
	margin: 0 auto;
}
@media (min-width: ' . esc_attr( $dd_width_px ) . 'px) {
    .container {
        width: ' . esc_attr( $dd_container_width_px ) . 'px;
    }
}
';
} elseif ( $dd_width_px != "custom" ) {
    $daydream_dynamic_css .= '
@media (min-width: ' . esc_attr( $dd_width_px ) . 'px) {
    .container {
        width: ' . esc_attr( $dd_container_width_px ) . 'px;
    }
    .menu-back .container:first-child {
        width: 100%;
        padding-left: 0px;
        padding-right: 0px;
    }
}
';
} elseif ( $dd_width_px == "custom" && ( $dd_width_layout == "fixed" ) && ! is_page_template( 'fullwidth-fluid.php' ) ) {
    $daydream_dynamic_css .= '
body {
	width: ' . esc_attr( $dd_custom_width_px ) . 'px;
	margin: 0 auto;
}
@media (min-width: ' . esc_attr( $dd_custom_width_px ) . 'px) {
    .container {
        width: ' . esc_attr( $dd_container_custom_width_px ) . 'px;
    }
}
';
} elseif ( $dd_width_px == "custom" ) {
    $daydream_dynamic_css .= '
@media (min-width: ' . esc_attr( $dd_custom_width_px ) . 'px) {
    .container {
        width: ' . esc_attr( $dd_container_custom_width_px ) . 'px;
    }
    .menu-back .container:first-child {
        width: 100%;
        padding-left: 0px;
        padding-right: 0px;
    }
}
';
}

// Body bg color when layout style is boxed
$daydream_dynamic_css .= '
body {
    background-color: #ecebe9;
}
';

// General - Content Top & Bottom Padding
$dd_content_top_bottom_padding		 = daydream_theme_mod( 'dd_content_top_bottom_padding' );
$daydream_content_top_bottom_padding	 = get_post_meta( $post_id, 'daydream_content_top_bottom_padding', true );
if ( $daydream_content_top_bottom_padding ) {
    $daydream_dynamic_css .= '
	.p-tb-content {
		padding-top:' . esc_attr( $daydream_content_top_bottom_padding ) . ';
		padding-bottom:' . esc_attr( $daydream_content_top_bottom_padding ) . ';
		padding-left: 0;
		padding-right: 0;
}
';
} elseif ( $dd_content_top_bottom_padding ) {
    $daydream_dynamic_css .= '
	.p-tb-content {
		padding-top:' . esc_attr( $dd_content_top_bottom_padding[ 'top' ] ) . ';
		padding-bottom:' . esc_attr( $dd_content_top_bottom_padding[ 'bottom' ] ) . ';
		padding-left: 0;
		padding-right: 0;
}
';
}

/* -----------------------------------------------------------------
  [Header Section Style]
 */

if ( daydream_theme_mod( 'dd_sticky_header' ) == 0 ) {
    $daydream_dynamic_css .= '
	.header-small {
		display: none;
	}
';
}

/* -----------------------------------------------------------------
  [Page Title Bar Style]
 */
$dd_pagetitlebar_height		 = daydream_theme_mod( 'dd_pagetitlebar_height', 'medium' );
$daydream_page_title_bar_height	 = get_post_meta( $post_id, 'daydream_page_title_bar_height', true );

$dd_pagetitlebar_background_color	 = daydream_theme_mod( 'dd_pagetitlebar_background_color', '' );
$daydream_page_title_bar_bg_color	 = get_post_meta( $post_id, 'daydream_page_title_bar_bg_color', true );
// 1.2 Page Title Bar Background Color
if ( $daydream_page_title_bar_bg_color ) {
    $daydream_dynamic_css .= '
.titlebar-bg {
	background-color: ' . esc_attr( $daydream_page_title_bar_bg_color ) . ';
}
';
} elseif ( $dd_pagetitlebar_background_color ) {
    $daydream_dynamic_css .= '
.titlebar-bg {
	background-color: ' . esc_attr( $dd_pagetitlebar_background_color ) . ';
}
';
}

/* -----------------------------------------------------------------
  [Footer Style]
 */

$dd_footer_image_src		 = daydream_theme_mod( 'dd_footer_background_image' );
$dd_footer_image		 = daydream_theme_mod( 'dd_footer_image', 'cover' );
$dd_footer_background_repeat	 = daydream_theme_mod( 'dd_footer_image_background_repeat', 'no-repeat' );
$dd_footer_background_position	 = daydream_theme_mod( 'dd_footer_image_background_position', 'center top' );
if ( $dd_footer_image_src ) {
    $daydream_dynamic_css .= '
.footer {
	background-image: url("' . esc_url( $dd_footer_image_src ) . '");
	background-position: ' . esc_attr( $dd_footer_background_position ) . ';
	background-repeat: ' . esc_attr( $dd_footer_background_repeat ) . ';
	border-bottom: 0;
	background-size: ' . esc_attr( $dd_footer_image ) . ';
	width: 100%;
}
';
}

$dd_footer_bg_color = daydream_theme_mod( 'dd_footer_bg_color', '' );
if ( ! empty( $dd_footer_bg_color ) ) {
    $daydream_dynamic_css .= '
.footer {
	background-color: ' . esc_attr( $dd_footer_bg_color ) . ';
}
';
}

/* -----------------------------------------------------------------
  [Typography Style]
 */

//Blog Title Font
$daydream_dynamic_css		 .= daydream_print_fonts( 'dd_title_font', '#blog-title', $additional_css			 = 'line-height:1.2', $additional_color_css_class	 = '', $imp				 = '' );

//Blog Tagline Font
$daydream_dynamic_css		 .= daydream_print_fonts( 'dd_tagline_font', '#tagline', $additional_css			 = 'line-height:1.8', $additional_color_css_class	 = '', $imp				 = '' );

//Main Menu Font
$daydream_dynamic_css		 .= daydream_print_fonts( 'dd_menu_font', '.inner-nav > li > a', $additional_css			 = 'line-height:20px', $additional_color_css_class	 = '', $imp				 = '' );

//Post Title Font
$daydream_dynamic_css		 .= daydream_print_fonts( 'dd_post_font', '.entry-header .post-title', $additional_css			 = 'line-height:1.2', $additional_color_css_class	 = '', $imp				 = '' );

//Post Content Font
$daydream_dynamic_css		 .= daydream_print_fonts( 'dd_content_font', '.entry-content', $additional_css			 = 'line-height:1.8', $additional_color_css_class	 = '', $imp				 = '' );

//Widget Title Font
$daydream_dynamic_css		 .= daydream_print_fonts( 'dd_widget_title_font', '.widget-content .text-title', $additional_css			 = 'line-height:1.2', $additional_color_css_class	 = '', $imp				 = '' );

//Widget Content Font
$daydream_dynamic_css		 .= daydream_print_fonts( 'dd_widget_content_font', '.widget-content', $additional_css			 = 'line-height:1.8', $additional_color_css_class	 = '', $imp				 = '' );

//H1 to H6 Font
for ( $i = 1; $i < 7; $i ++ ) {
    //we get all h1 to h6 Fonts, dd_content_h1_font ... to dd_content_h6_font values.
    $daydream_dynamic_css	 .= daydream_print_fonts( 'dd_content_h' . $i . '_font', "h{$i}", $additional_css		 = '' );
}


/* -----------------------------------------------------------------
  [General Style Options]
 */

$dd_main_menu_hover_font_color	 = daydream_theme_mod( 'dd_main_menu_hover_font_color' );
$dd_sub_menu_font_color		 = daydream_theme_mod( 'dd_sub_menu_font_color' );
$dd_sub_menu_hover_font_color	 = daydream_theme_mod( 'dd_sub_menu_hover_font_color' );

$daydream_dynamic_css .= '
.inner-nav > li > a:hover, 
.inner-nav > li > a:focus, 
.inner-nav > li.submenu-open > a {
	color: ' . esc_attr( $dd_main_menu_hover_font_color ) . ';
}
.sub-menu li > a {
	color: ' . esc_attr( $dd_sub_menu_font_color ) . ';
}
.sub-menu li > a:hover, 
.sub-menu li > a:focus, 
.sub-menu li.submenu-open > a {
	color: ' . esc_attr( $dd_sub_menu_hover_font_color ) . ';
}
';

/* -----------------------------------------------------------------
  [Menu Style]
 */
$dd_main_menu_padding		 = daydream_theme_mod( 'dd_main_menu_padding' );
$dd_main_menu_padding_top	 = $dd_main_menu_padding[ 'top' ];
$dd_main_menu_padding_bottom	 = $dd_main_menu_padding[ 'bottom' ];
$dd_main_menu_padding_left	 = $dd_main_menu_padding[ 'left' ];
$dd_main_menu_padding_right	 = $dd_main_menu_padding[ 'right' ];
$dd_menu_text_transform		 = daydream_theme_mod( 'dd_menu_text_transform', 'none' );
$daydream_dynamic_css		 .= '
.inner-nav > li > a {
	text-transform: ' . esc_attr( $dd_menu_text_transform ) . ';
	padding-top: ' . esc_attr( $dd_main_menu_padding_top ) . ';
	padding-bottom: ' . esc_attr( $dd_main_menu_padding_bottom ) . ';
	padding-left: ' . esc_attr( $dd_main_menu_padding_left ) . ';
	padding-right: ' . esc_attr( $dd_main_menu_padding_right ) . ';
}
';

/* -----------------------------------------------------------------
  [Main Color Scheme Style]
 */

$dd_primary_color	 = daydream_theme_mod( 'dd_primary_color', '#27CBC0' );
$dd_secondry_color	 = daydream_theme_mod( 'dd_secondry_color', '#1fa098' );
$daydream_dynamic_css	 .= '
::-moz-selection {
    background: ' . esc_attr( $dd_primary_color ) . ';
    color: #fff!important
}

::-webkit-selection {
    background: ' . esc_attr( $dd_primary_color ) . ';
    color: #fff!important
}

::selection {
    background: ' . esc_attr( $dd_primary_color ) . ';
    color: #fff!important
}

.divider-line:after,
.alert-brand,
.label-base,
.btn.btn-base.btn-outline:focus,
.btn.btn-base.btn-outline:hover,
.nav-text-tabs>li>a:after,
.owl-controls-brand .owl-page span,
.owl-page span,
.cart-badge,
.post.format-quote,
.post.format-quote blockquote,
.social-icons>li>a:focus,
.social-icons>li>a:hover,
.tags a:focus,
.tags a:hover,
.divider-line::after {
    background: ' . esc_attr( $dd_primary_color ) . ';
}

a,
ul,
.widget .widget-content li,
.btn.btn-base.btn-outline,
.btn.btn-base.btn-link,
.btn.btn-base.btn-fade:focus,
.btn.btn-base.btn-fade:hover,
.breadcrumb a:focus,
.breadcrumb a:hover,
.box-icon .icon-box-icon,
.box-icon-left .icon-box-icon,
.box-icon-right .icon-box-icon,
.nav-text-tabs>li.active>a,
.career-tags,
.comment-tools a:focus,
.comment-tools a:hover,
.star-rating,
.icons-list a:focus,
.icons-list a:hover {
    color: ' . esc_attr( $dd_primary_color ) . ';
}

.bottom-line:after {
    border-bottom: 2px solid ' . esc_attr( $dd_primary_color ) . ';
}

.color-brand {
    color: ' . esc_attr( $dd_primary_color ) . ';
}

.progress-bar,
.btn.btn-base,
.bg-brand,
.scroll-top {
    background-color: ' . esc_attr( $dd_primary_color ) . ';
}

.form-control:focus,
.btn.btn-base,
.btn.btn-base.btn-outline,
.btn.btn-base.btn-fade:focus,
.btn.btn-base.btn-fade:hover {
    border-color: ' . esc_attr( $dd_primary_color ) . ';
}

.owl-page.active span,
.owl-controls-brand .owl-page.active span {
    box-shadow: 0 0 0 3px ' . esc_attr( $dd_primary_color ) . ';
}

.pagination>.active>a,
.pagination>.active>a:focus,
.pagination>.active>a:hover,
.pagination>.active>span,
.pagination>.active>span:focus,
.pagination>.active>span:hover,
.pagination>li>a:focus,
.pagination>li>a:hover,
.pagination>li>span:focus,
.pagination>li>span:hover,
.pager li>a:focus,
.pager li>a:hover,
.pager li>span:focus,
.pager li>span:hover {
    background: ' . esc_attr( $dd_primary_color ) . ';
    border-color: ' . esc_attr( $dd_primary_color ) . ';
    color: #fff
}

a:focus,
a:hover {
    color: ' . esc_attr( $dd_secondry_color ) . ';
}

.color-brand-hvr {
    color: ' . esc_attr( $dd_secondry_color ) . ';
}

.bg-brand-hvr {
    background-color: ' . esc_attr( $dd_secondry_color ) . ';
}
';
