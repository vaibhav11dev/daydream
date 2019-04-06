<?php

/*
  Definitions Of Options For Customizer
  ======================================= */

if ( !function_exists( 'daydream_customizer_options' ) ) {

	function daydream_customizer_options() {

		$global_value = daydream_global_customizer_value();

		if ( true || is_customize_preview() ) {

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-general-main-tab',
				'title'		 => __( 'General', 'daydream' ),
				'iconfix'	 => 'no-icon',
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-general-subsec-loader-tab',
				'title'		 => __( 'Site Loader', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to display loader in site', 'daydream' ),
						'id'		 => 'dd_siteloader',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 0,
						'title'		 => __( 'Enable Site Loader', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Upload custom loader.', 'daydream' ),
						'id'		 => 'dd_loaderfile',
						'type'		 => 'media',
						'title'		 => __( 'Custom Loader', 'daydream' ),
						'url'		 => true,
						'required'	 => array( array( "dd_siteloader", '=', 1 ) ),
					),
				),
			)
			);


			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-general-subsec-lay-tab',
				'title'		 => __( 'Layout', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Select main content and sidebar alignment.', 'daydream' ),
						'id'		 => 'dd_layout',
						'type'		 => 'image_select',
						'compiler'	 => true,
						'options'	 => array(
							'1c'	 => $global_value[ 'customizer_images' ] . '1c.png',
							'2cl'	 => $global_value[ 'customizer_images' ] . '2cl.png',
							'2cr'	 => $global_value[ 'customizer_images' ] . '2cr.png',
						),
						'title'		 => __( 'Select layout', 'daydream' ),
						'default'	 => '2cl',
					),
					array(
						'subtitle'	 => __( '<strong>Boxed version</strong> automatically enables custom background', 'daydream' ),
						'id'		 => 'dd_width_layout',
						'type'		 => 'select',
						'compiler'	 => true,
						'options'	 => array(
							'fixed'	 => __( 'Boxed', 'daydream' ),
							'fluid'	 => __( 'Wide', 'daydream' ),
						),
						'title'		 => __( 'Layout Style', 'daydream' ),
						'default'	 => 'fluid',
					),
					array(
						'subtitle'	 => __( 'Select the width for your website', 'daydream' ),
						'id'		 => 'dd_width_px',
						'compiler'	 => true,
						'type'		 => 'select',
						'options'	 => array(
							800	 => '800px',
							985	 => '985px',
							1200 => '1200px',
							1600 => '1600px',
						),
						'title'		 => __( 'Layout Width', 'daydream' ),
						'default'	 => '1200',
					),
					array(
						'title'		 => __( 'Content Top & Bottom Padding', 'daydream' ),
						'subtitle'	 => __( 'Enter the page content top & bottom padding.', 'daydream' ),
						'id'		 => 'dd_content_top_bottom_padding',
						'type'		 => 'spacing',
						'units'		 => array( 'px', 'em' ),
						'default'	 => array(
							'padding-top'	 => '70px',
							'padding-bottom' => '70px',
							'units'			 => 'px'
						),
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.p-tb-content',
								'property'	 => 'padding',
								'choice'	 => 'top'
							),
							array(
								'element'	 => '.p-tb-content',
								'property'	 => 'padding',
								'choice'	 => 'bottom'
							)
						)
					),
					array(
						'id'		 => 'dd_info_consid1',
						'type'		 => 'info',
						'subtitle'	 => __( '<h3>Content and One Sidebar Width</h3>', 'daydream' ),
					),
					array(
						'subtitle'	 => sprintf( __( '<span class="subtitleription">These options apply for the following layouts</span> <img style="float:left, display:inline" src="%1$s2cl.png" /> <img style="float:left, display:inline" src="%2$s2cr.png" />', 'daydream' ), $global_value[ 'customizer_images' ], $global_value[ 'customizer_images' ] ),
						'id'		 => 'dd_info_consid1_widths',
						'style'		 => 'notice',
						'type'		 => 'info',
						'notice'	 => false,
					),
					array(
						'subtitle'	 => __( 'Select the width for your content', 'daydream' ),
						'id'		 => 'dd_opt1_width_content',
						'compiler'	 => true,
						'type'		 => 'select',
						'options'	 => array(
							1	 => '1/12',
							2	 => '2/12',
							3	 => '3/12',
							4	 => '4/12',
							5	 => '5/12',
							6	 => '6/12',
							7	 => '7/12',
							8	 => '8/12',
							9	 => '9/12',
							10	 => '10/12',
							11	 => '11/12',
							12	 => '12/12',
						),
						'title'		 => __( 'Content Width', 'daydream' ),
						'default'	 => '9',
					),
					array(
						'subtitle'	 => __( 'Select the width for your Sidebar 1', 'daydream' ),
						'id'		 => 'dd_opt1_width_sidebar1',
						'compiler'	 => true,
						'type'		 => 'select',
						'options'	 => array(
							1	 => '1/12',
							2	 => '2/12',
							3	 => '3/12',
							4	 => '4/12',
							5	 => '5/12',
							6	 => '6/12',
							7	 => '7/12',
							8	 => '8/12',
							9	 => '9/12',
							10	 => '10/12',
							11	 => '11/12',
							12	 => '12/12',
						),
						'title'		 => __( 'Sidebar 1 Width', 'daydream' ),
						'default'	 => '3',
					),
				),
			)
			);

// Header Main Sections
			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-header-main-tab',
				'title'		 => __( 'Header', 'daydream' ),
				'iconfix'	 => 'no-icon',
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-header-subsec-header-tab',
				'title'		 => __( 'Header', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to display searchbox in Header', 'daydream' ),
						'id'		 => 'dd_searchbox',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 1,
						'title'		 => __( 'Enable Searchbox', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to display cart in Header', 'daydream' ),
						'id'		 => 'dd_woo_cart',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 1,
						'title'		 => __( 'Enable Cart', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to display menu in Header', 'daydream' ),
						'id'		 => 'dd_primary_menu',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 1,
						'title'		 => __( 'Enable Menu', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to display mobile menu', 'daydream' ),
						'id'		 => 'dd_mobile_menu',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 1,
						'title'		 => __( 'Enable Mobile Menu', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to display Sticky Header', 'daydream' ),
						'id'		 => 'dd_sticky_header',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 1,
						'title'		 => __( 'Enable Sticky Header', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose your Header Type', 'daydream' ),
						'id'		 => 'dd_header_type',
						'compiler'	 => true,
						'type'		 => 'image_select',
						'options'	 => array(
							'h1' => $global_value[ 'customizer_images' ] . 'header-1.png',
							'h2' => $global_value[ 'customizer_images' ] . 'header-2.png',
						),
						'title'		 => __( 'Choose Header Type', 'daydream' ),
						'default'	 => 'h1',
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-header-subsec-logo-tab',
				'title'		 => __( 'Logo', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Choose Enable button if you don\'t want to display header logo', 'daydream' ),
						'id'		 => 'dd_header_logo',
						'type'		 => 'switch',
						'title'		 => __( 'Enable Header Logo', 'daydream' ),
						'default'	 => '0',
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-header-subsec-title-tagline-tab',
				'title'		 => __( 'Title & Tagline', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Choose Enable button if you don\'t want to display title of your blog', 'daydream' ),
						'id'		 => 'dd_blog_title',
						'type'		 => 'switch',
						'title'		 => __( 'Enable Blog Title', 'daydream' ),
						'default'	 => '1',
					),
					array(
						'subtitle'	 => __( 'Choose Enable button if you don\'t want to display tagline of your blog', 'daydream' ),
						'id'		 => 'dd_blog_tagline',
						'type'		 => 'switch',
						'title'		 => __( 'Enable Blog Tagline', 'daydream' ),
						'default'	 => '1',
					),
				),
			)
			);
			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-header-subsec-styling-tab',
				'title'		 => __( 'Header Styles', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'id'		 => 'dd_header_bg_info',
						'subtitle'	 => sprintf( '%s<a href="%s">Header Background</a>', esc_attr__( 'If you want to diaplay the header background image, Check link ', 'daydream' ), esc_url( daydream_link_customizer( 'control', 'header_image' ) ) ),
						'type'		 => 'info'
					),
					array(
						'id'		 => 'dd_header_image',
						'title'		 => esc_attr__( 'Header Background Image Responsiveness Style', 'daydream' ),
						'type'		 => 'select',
						'options'	 => array(
							'cover'		 => esc_attr__( 'Cover', 'daydream' ),
							'contain'	 => esc_attr__( 'Contain', 'daydream' ),
							'none'		 => esc_attr__( 'None', 'daydream' )
						),
						'default'	 => 'cover',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.header-bg',
								'function'	 => 'css',
								'property'	 => 'background-size'
							)
						)
					),
					array(
						'id'		 => 'dd_header_image_background_repeat',
						'title'		 => esc_attr__( 'Background Repeat', 'daydream' ),
						'type'		 => 'select',
						'options'	 => array(
							'no-repeat'	 => esc_attr__( 'no-repeat', 'daydream' ),
							'repeat'	 => esc_attr__( 'repeat', 'daydream' ),
							'repeat-x'	 => esc_attr__( 'repeat-x', 'daydream' ),
							'repeat-y'	 => esc_attr__( 'repeat-y', 'daydream' )
						),
						'default'	 => 'no-repeat',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.header-bg',
								'function'	 => 'css',
								'property'	 => 'background-repeat'
							)
						)
					),
					array(
						'id'		 => 'dd_header_image_background_position',
						'title'		 => esc_attr__( 'Background Position', 'daydream' ),
						'type'		 => 'select',
						'options'	 => array(
							'center top'	 => esc_attr__( 'center top', 'daydream' ),
							'center center'	 => esc_attr__( 'center center', 'daydream' ),
							'center bottom'	 => esc_attr__( 'center bottom', 'daydream' ),
							'left top'		 => esc_attr__( 'left top', 'daydream' ),
							'left center'	 => esc_attr__( 'left center', 'daydream' ),
							'left bottom'	 => esc_attr__( 'left bottom', 'daydream' ),
							'right top'		 => esc_attr__( 'right top', 'daydream' ),
							'right center'	 => esc_attr__( 'right center', 'daydream' ),
							'right bottom'	 => esc_attr__( 'right bottom', 'daydream' )
						),
						'default'	 => 'center top',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.header-bg',
								'function'	 => 'css',
								'property'	 => 'background-position'
							)
						)
					),
					array(
						'id'		 => 'dd_header_background_color',
						'title'		 => esc_attr__( 'Header Color', 'daydream' ),
						'subtitle'	 => esc_attr__( 'Custom background color of Header', 'daydream' ),
						'type'		 => 'color',
						'default'	 => '#ffffff',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.header-bg',
								'function'	 => 'css',
								'property'	 => 'background-color'
							)
						)
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-footer-main-tab',
				'title'		 => __( 'Footer', 'daydream' ),
				'iconfix'	 => 'no-icon',
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-footer-subsec-footer-widgets-tab',
				'title'		 => __( 'Footer Widgets', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Select how many footer widget areas you want to display.', 'daydream' ),
						'id'		 => 'dd_footer_widget_col',
						'type'		 => 'image_select',
						'options'	 => array(
							'disable'	 => $global_value[ 'customizer_images' ] . '1c.png',
							'one'		 => $global_value[ 'customizer_images' ] . 'footer-widgets-1.png',
							'two'		 => $global_value[ 'customizer_images' ] . 'footer-widgets-2.png',
							'three'		 => $global_value[ 'customizer_images' ] . 'footer-widgets-3.png',
							'four'		 => $global_value[ 'customizer_images' ] . 'footer-widgets-4.png',
						),
						'title'		 => __( 'Number of Widget Cols in Footer', 'daydream' ),
						'default'	 => 'disable',
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-footer-subsec-custom-footer-tab',
				'title'		 => __( 'Custom Footer', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'			 => __( 'Available <strong>HTML</strong> tags and attributes:<br /><br /> <code> &lt;b&gt; &lt;i&gt; &lt;a href="" title=""&gt; &lt;blockquote&gt; &lt;del datetime=""&gt; <br /> &lt;ins datetime=""&gt; &lt;img src="" alt="" /&gt; &lt;ul&gt; &lt;ol&gt; &lt;li&gt; <br /> &lt;code&gt; &lt;em&gt; &lt;strong&gt; &lt;div&gt; &lt;span&gt; &lt;h1&gt; &lt;h2&gt; &lt;h3&gt; &lt;h4&gt; &lt;h5&gt; &lt;h6&gt; <br /> &lt;table&gt; &lt;tbody&gt; &lt;tr&gt; &lt;td&gt; &lt;br /&gt; &lt;hr /&gt;</code>', 'daydream' ),
						'id'				 => 'dd_footer_content',
						'type'				 => 'textarea',
						'title'				 => __( 'Custom Footer', 'daydream' ),
						'default'			 => '<div id="copyright"><a href="' . esc_url( $global_value[ 'home_url' ] ) . 'daydream-multipurpose-wordpress-theme/">daydream</a> theme by Themevedanta - Powered by <a href="'.esc_url( "http://wordpress.org" ).'">WordPress</a></div>',
						'selector'			 => '.custom-footer',
						'render_callback'	 => 'daydream_footer_content'
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-styling-subsec-header-footer-tab',
				'title'		 => __( 'Footer Styles', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Custom background color of footer', 'daydream' ),
						'id'		 => 'dd_footer_bg_color',
						'type'		 => 'color',
						'compiler'	 => true,
						'title'		 => __( 'Footer Background color', 'daydream' ),
						'default'	 => '#222222',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.footer',
								'function'	 => 'css',
								'property'	 => 'background-color'
							)
						)
					),
					array(
						'subtitle'	 => __( 'Upload a footer background image for your theme, or specify an image URL directly.', 'daydream' ),
						'id'		 => 'dd_footer_background_image',
						'type'		 => 'media',
						'title'		 => __( 'Footer Background Image', 'daydream' ),
						'url'		 => true,
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.footer',
								'function'	 => 'css',
								'property'	 => 'background-image'
							)
						)
					),
					array(
						'subtitle'	 => __( 'Select if the footer background image should be displayed in cover or contain size.', 'daydream' ),
						'id'		 => 'dd_footer_image',
						'type'		 => 'select',
						'options'	 => array(
							'cover'		 => __( 'Cover', 'daydream' ),
							'contain'	 => __( 'Contain', 'daydream' ),
							'none'		 => __( 'None', 'daydream' ),
						),
						'title'		 => __( 'Background Responsiveness Style', 'daydream' ),
						'default'	 => 'cover',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.footer',
								'function'	 => 'css',
								'property'	 => 'background-size'
							)
						)
					),
					array(
						'id'		 => 'dd_footer_image_background_repeat',
						'type'		 => 'select',
						'options'	 => array(
							'no-repeat'	 => __( 'no-repeat', 'daydream' ),
							'repeat'	 => __( 'repeat', 'daydream' ),
							'repeat-x'	 => __( 'repeat-x', 'daydream' ),
							'repeat-y'	 => __( 'repeat-y', 'daydream' ),
						),
						'title'		 => __( 'Background Repeat', 'daydream' ),
						'default'	 => 'no-repeat',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.footer',
								'function'	 => 'css',
								'property'	 => 'background-repeat'
							)
						)
					),
					array(
						'id'		 => 'dd_footer_image_background_position',
						'type'		 => 'select',
						'options'	 => array(
							'center top'	 => __( 'center top', 'daydream' ),
							'center center'	 => __( 'center center', 'daydream' ),
							'center bottom'	 => __( 'center bottom', 'daydream' ),
							'left top'		 => __( 'left top', 'daydream' ),
							'left center'	 => __( 'left center', 'daydream' ),
							'left bottom'	 => __( 'left bottom', 'daydream' ),
							'right top'		 => __( 'right top', 'daydream' ),
							'right center'	 => __( 'right center', 'daydream' ),
							'right bottom'	 => __( 'right bottom', 'daydream' ),
						),
						'title'		 => __( 'Background Position', 'daydream' ),
						'default'	 => 'center top',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.footer',
								'function'	 => 'css',
								'property'	 => 'background-position'
							)
						)
					),
				),
			)
			);


			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-pagetitlebar-tab',
				'title'		 => __( 'Page Title Bar', 'daydream' ),
				'iconfix'	 => 'no-icon',
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to display page titlebar above the content and sidebar area', 'daydream' ),
						'id'		 => 'dd_pagetitlebar_layout',
						'compiler'	 => true,
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 1,
						'title'		 => __( 'Page Title Bar', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose the display option to show the page title', 'daydream' ),
						'id'		 => 'dd_display_pagetitlebar',
						'type'		 => 'select',
						'compiler'	 => true,
						'options'	 => array(
							'titlebar_breadcrumb'	 => __( 'Title + Breadcrumb', 'daydream' ),
							'titlebar'				 => __( 'Only Title', 'daydream' ),
							'breadcrumb'			 => __( 'Only Breadcrumb', 'daydream' ),
						),
						'title'		 => __( 'Page Title & Breadcrumbs', 'daydream' ),
						'default'	 => 'titlebar_breadcrumb',
						'required'	 => array(
							array( 'dd_pagetitlebar_layout', '=', '1' )
						),
					),
					array(
						'subtitle'	 => __( 'Choose your page titlebar layout', 'daydream' ),
						'id'		 => 'dd_pagetitlebar_layout_opt',
						'compiler'	 => true,
						'type'		 => 'image_select',
						'title'		 => __( 'Page Title Bar Layout Type', 'daydream' ),
						'options'	 => array(
							'titlebar_left'		 => $global_value[ 'customizer_images' ] . 'titlebar_left.png',
							'titlebar_center'	 => $global_value[ 'customizer_images' ] . 'titlebar_center.png',
							'titlebar_right'	 => $global_value[ 'customizer_images' ] . 'titlebar_right.png',
						),
						'required'	 => array(
							array( 'dd_pagetitlebar_layout', '=', '1' )
						),
						'default'	 => 'titlebar_center',
					),
					array(
						'subtitle'	 => __( 'Select the height for your pagetitle bar', 'daydream' ),
						'id'		 => 'dd_pagetitlebar_height',
						'compiler'	 => true,
						'type'		 => 'select',
						'options'	 => array(
							'small'	 => 'Small',
							'medium' => 'Medium',
							'large'	 => 'Large',
						),
						'title'		 => __( 'Page Title Bar Height', 'daydream' ),
						'default'	 => 'medium',
						'required'	 => array(
							array( 'dd_pagetitlebar_layout', '=', '1' )
						),
					),
					array(
						'subtitle'	 => __( 'Custom background color of page title bar', 'daydream' ),
						'id'		 => 'dd_pagetitlebar_background_color',
						'type'		 => 'color',
						'compiler'	 => true,
						'title'		 => __( 'Page Title Bar Background Color', 'daydream' ),
						'required'	 => array(
							array( 'dd_pagetitlebar_layout', '=', '1' )
						),
						'default'	 => '#f8f8f8',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.titlebar-bg',
								'function'	 => 'css',
								'property'	 => 'background-color'
							)
						)
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-blog-main-tab',
				'title'		 => __( 'Blog', 'daydream' ),
				'iconfix'	 => 'no-icon',
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-blog-subsec-general-tab',
				'title'		 => __( 'General', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Select the blog style that will display on the blog pages.', 'daydream' ),
						'id'		 => 'dd_blog_style',
						'compiler'	 => true,
						'type'		 => 'select',
						'options'	 => array(
							'grid' => __( 'Grid', 'daydream' ),
						),
						'title'		 => __( 'Blog Style', 'daydream' ),
						'default'	 => 'grid',
					),
					array(
						'subtitle'	 => __( 'Grid layout with <strong>3 and 4</strong> posts per row is recommended to use with disabled <strong>Sidebar(s)</strong>', 'daydream' ),
						'id'		 => 'dd_post_layout',
						'type'		 => 'image_select',
						'compiler'	 => true,
						'options'	 => array(
							'1'	 => $global_value[ 'customizer_images' ] . 'one-post.png',
							'2'	 => $global_value[ 'customizer_images' ] . 'two-posts.png',
							'3'	 => $global_value[ 'customizer_images' ] . 'three-posts.png',
							'4'	 => $global_value[ 'customizer_images' ] . 'four-posts.png',
						),
						'title'		 => __( 'Blog Grid layout', 'daydream' ),
						'default'	 => '2',
					),
					array(
						'subtitle'	 => __( 'Choose placement of the \'Share This\' buttons', 'daydream' ),
						'id'		 => 'dd_share_this',
						'type'		 => 'select',
						'options'	 => array(
							'single'	 => __( 'Single Posts', 'daydream' ),
							'disable'	 => __( 'Disable', 'daydream' ),
						),
						'title'		 => __( '\'Share This\' buttons placement', 'daydream' ),
						'default'	 => 'single',
					),
					array(
						'subtitle'	 => __( 'Select the pagination type for the assigned blog page in Settings > Reading.', 'daydream' ),
						'id'		 => 'dd_pagination_type',
						'compiler'	 => true,
						'type'		 => 'select',
						'options'	 => array(
							'pagination'		 => __( 'Default Pagination', 'daydream' ),
							'number_pagination'	 => __( 'Number Pagination', 'daydream' ),
						),
						'title'		 => __( 'Pagination Type', 'daydream' ),
						'default'	 => 'pagination',
					),
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to display edit post link', 'daydream' ),
						'id'		 => 'dd_edit_post',
						'type'		 => 'switch',
						'title'		 => __( 'Enable Edit Post Link', 'daydream' ),
						'default'	 => '0',
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-blog-subsec-post-tab',
				'title'		 => __( 'Posts', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Choose enable button if you want to display post meta header', 'daydream' ),
						'id'		 => 'dd_header_meta',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 0,
						'title'		 => __( 'Post Meta Header', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose enable button if you want to display post meta date', 'daydream' ),
						'id'		 => 'dd_meta_date',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 0,
						'title'		 => __( 'Post Meta Date', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose enable button if you want to display post meta author', 'daydream' ),
						'id'		 => 'dd_meta_author',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 0,
						'title'		 => __( 'Post Meta Author', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to display post author avatar', 'daydream' ),
						'id'		 => 'dd_author_avatar',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 0,
						'title'		 => __( 'Enable Post Author Avatar', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose enable button if you want to display post meta tags', 'daydream' ),
						'id'		 => 'dd_meta_tags',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 0,
						'title'		 => __( 'Post Meta Tags', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose enable button if you want to display post meta comments', 'daydream' ),
						'id'		 => 'dd_meta_comments',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 0,
						'title'		 => __( 'Post Meta Comments', 'daydream' ),
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-woocommerce-main-tab',
				'title'		 => __( 'WooCommerce', 'daydream' ),
				'iconfix'	 => 'no-icon',
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Insert the number of products to display per page.', 'daydream' ),
						'id'		 => 'dd_woo_items',
						'type'		 => 'text',
						'title'		 => __( 'Number of Products Per Page', 'daydream' ),
						'default'	 => '12',
					),
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to disable the ordering boxes displayed on the shop page.', 'daydream' ),
						'id'		 => 'dd_woocommerce_daydream_ordering',
						'type'		 => 'checkbox',
						'title'		 => __( 'Display Woocommerce Shop Page Ordering Boxes', 'daydream' ),
						'default'	 => '1',
					),
					array(
						'id'		 => 'dd_woo_layout_info',
						'subtitle'	 => sprintf( '%s', esc_attr__( 'Note: Product Grid Layout options override default woocommerce Products per row options', 'daydream' ) ),
						'type'		 => 'info'
					),
					array(
						'subtitle'	 => __( 'Grid layout with <strong>3 and 4</strong> products per row is recommended to use with disabled <strong>Sidebar(s)</strong>', 'daydream' ),
						'id'		 => 'dd_woocommerce_layout',
						'type'		 => 'image_select',
						'compiler'	 => true,
						'options'	 => array(
							'2'	 => $global_value[ 'customizer_images' ] . 'two-posts.png',
							'3'	 => $global_value[ 'customizer_images' ] . 'three-posts.png',
							'4'	 => $global_value[ 'customizer_images' ] . 'four-posts.png',
						),
						'title'		 => __( 'Product Grid Layout', 'daydream' ),
						'default'	 => '2',
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-typography-main-tab',
				'title'		 => __( 'Typography', 'daydream' ),
				'iconfix'	 => 'no-icon',
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-typography-subsec-title-tagline-tab',
				'title'		 => __( 'Title & Tagline', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'		 => __( 'Select the typography you want for your blog title. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_title_font',
						'type'			 => 'typography',
						'title'			 => __( 'Blog Title Font', 'daydream' ),
						'text-align'	 => false,
						'line-height'	 => false,
						'default'		 => array(
							'font-size'		 => '23px',
							'color'			 => '#222222',
							'font-family'	 => 'Open Sans',
							'font-weight'	 => '700',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => '#blog-title a'
							)
						)
					),
					array(
						'subtitle'		 => __( 'Select the typography you want for your blog tagline. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_tagline_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'Blog Tagline Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '14px',
							'font-family'	 => 'Open Sans',
							'color'			 => '#777777',
							'font-weight'	 => '400',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => '#tagline'
							)
						)
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-typography-subsec-menu-tab',
				'title'		 => __( 'Menu', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'		 => __( 'Select the typography you want for your main menu. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_menu_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'Main Menu Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '11px',
							'color'			 => '#999',
							'font-family'	 => 'Open Sans',
							'font-weight'	 => '400',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => '.main-nav, .inner-nav > li > a'
							)
						)
					),
				),
			)
			);


			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-typography-subsec-post-tab',
				'title'		 => __( 'Post Title & Content', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'		 => __( 'Select the typography you want for your post titles. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_post_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'Post Title Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '23px',
							'color'			 => '#222222',
							'font-family'	 => 'Open Sans',
							'font-weight'	 => '600',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => '.entry-header .post-title a, .entry-header .post-title'
							)
						)
					),
					array(
						'subtitle'		 => __( 'Select the typography you want for your blog content. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_content_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'Content Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '14px',
							'color'			 => '#777777',
							'font-family'	 => 'Open Sans',
							'font-weight'	 => '400',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => '.entry-content'
							)
						)
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-typography-subsec-widget-tab',
				'title'		 => __( 'Widget', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'		 => __( 'Select the typography you want for your widget title. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_widget_title_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'Widget Title Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '12px',
							'color'			 => '#222222',
							'font-family'	 => 'Montserrat',
							'font-weight'	 => '700',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => '.widget-content .text-title'
							)
						)
					),
					array(
						'subtitle'		 => __( 'Select the typography you want for your widget content. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_widget_content_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'Widget Content Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '14px',
							'font-family'	 => 'Open Sans',
							'color'			 => '#777777',
							'font-weight'	 => '400',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => '.widget-content, .widget-content a'
							)
						)
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-typography-subsec-headings-tab',
				'title'		 => __( 'Headings', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'		 => __( 'Select the typography you want for your H1 tag in blog content. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_content_h1_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'H1 Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '32px',
							'color'			 => '#222222',
							'font-family'	 => 'Open Sans',
							'font-weight'	 => '600',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => 'h1'
							)
						)
					),
					array(
						'subtitle'		 => __( 'Select the typography you want for your H2 tag in blog content. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_content_h2_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'H2 Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '26px',
							'font-family'	 => 'Open Sans',
							'color'			 => '#222222',
							'font-weight'	 => '600',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => 'h2'
							)
						)
					),
					array(
						'subtitle'		 => __( 'Select the typography you want for your H3 tag in blog content. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_content_h3_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'H3 Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '18px',
							'font-family'	 => 'Open Sans',
							'color'			 => '#222222',
							'font-weight'	 => '600',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => 'h3'
							)
						)
					),
					array(
						'subtitle'		 => __( 'Select the typography you want for your H4 tag in blog content. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_content_h4_font',
						'type'			 => 'typography',
						'title'			 => __( 'H4 Font', 'daydream' ),
						'text-align'	 => false,
						'line-height'	 => false,
						'default'		 => array(
							'font-size'		 => '16px',
							'font-family'	 => 'Open Sans',
							'color'			 => '#222222',
							'font-weight'	 => '600',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => 'h4'
							)
						)
					),
					array(
						'subtitle'		 => __( 'Select the typography you want for your H5 tag in blog content. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_content_h5_font',
						'type'			 => 'typography',
						'title'			 => __( 'H5 Font', 'daydream' ),
						'text-align'	 => false,
						'line-height'	 => false,
						'default'		 => array(
							'font-size'		 => '14px',
							'font-family'	 => 'Open Sans',
							'color'			 => '#222222',
							'font-weight'	 => '600',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => 'h5'
							)
						)
					),
					array(
						'subtitle'		 => __( 'Select the typography you want for your H6 tag in blog content. * non web-safe font.', 'daydream' ),
						'id'			 => 'dd_content_h6_font',
						'type'			 => 'typography',
						'text-align'	 => false,
						'line-height'	 => false,
						'title'			 => __( 'H6 Font', 'daydream' ),
						'default'		 => array(
							'font-size'		 => '12px',
							'font-family'	 => 'Open Sans',
							'color'			 => '#222222',
							'font-weight'	 => '600',
						),
						'transport'		 => 'postMessage',
						'js_vars'		 => array(
							array(
								'element' => 'h6'
							)
						)
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-styling-main-tab',
				'title'		 => __( 'Styling', 'daydream' ),
				'iconfix'	 => 'no-icon',
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-styling-subsec-main-scheme-tab',
				'title'		 => __( 'Main Color Scheme', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'id'		 => 'dd_color_palettes',
						'type'		 => 'palette',
						'title'		 => __( 'Main Color Scheme', 'daydream' ),
						'subtitle'	 => __( 'Please select the predefined color scheme of your website', 'daydream' ),
						'default'	 => 'color_palette_1',
						'palettes'	 => array(
							'color_palette_1'	 => array(
								'#27CBC0',
								'#1fa098',
								'#222222',
								'#777777',
							),
							'color_palette_2'	 => array(
								'#3498db',
								'#217dbb',
								'#222',
								'#777',
							),
						),
					),
					array(
						'subtitle'	 => __( 'Primary color of site', 'daydream' ),
						'id'		 => 'dd_primary_color',
						'type'		 => 'color',
						'compiler'	 => true,
						'title'		 => __( 'Primary Color', 'daydream' ),
						'default'	 => '#27CBC0',
					),
					array(
						'subtitle'	 => __( 'Secondry color of site', 'daydream' ),
						'id'		 => 'dd_secondry_color',
						'type'		 => 'color',
						'compiler'	 => true,
						'title'		 => __( 'Secondry Color', 'daydream' ),
						'default'	 => '#1fa098',
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-styling-subsec-menu-tab',
				'title'		 => __( 'Menu', 'daydream' ),
				'subsection' => true,
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Set padding between menu items.', 'daydream' ),
						'id'		 => 'dd_main_menu_padding',
						'type'		 => 'spacing',
						'units'		 => array( 'px', 'em' ),
						'title'		 => __( 'Padding Between Menu Items', 'daydream' ),
						'default'	 => array(
							'padding-top'	 => '33px',
							'padding-right'	 => '15px',
							'padding-bottom' => '33px',
							'padding-left'	 => '15px',
							'units'			 => 'px',
						),
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.inner-nav > li > a',
								'function'	 => 'css',
								'property'	 => 'padding'
							)
						)
					),
					array(
						'subtitle'	 => __( 'Main menu text transform', 'daydream' ),
						'id'		 => 'dd_menu_text_transform',
						'compiler'	 => true,
						'type'		 => 'select',
						'options'	 => array(
							'none'		 => __( 'none', 'daydream' ),
							'lowercase'	 => __( 'lowercase', 'daydream' ),
							'capitalize' => __( 'Capitalize', 'daydream' ),
							'uppercase'	 => __( 'UPPERCASE', 'daydream' ),
						),
						'title'		 => __( 'Set the main menu text transform', 'daydream' ),
						'default'	 => 'uppercase',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.inner-nav > li > a',
								'function'	 => 'css',
								'property'	 => 'text-transform'
							)
						)
					),
					array(
						'subtitle'	 => __( 'Main menu hover font color', 'daydream' ),
						'id'		 => 'dd_main_menu_hover_font_color',
						'type'		 => 'color',
						'compiler'	 => true,
						'title'		 => __( 'Menu Hover Font Color', 'daydream' ),
						'default'	 => '#222222',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.inner-nav > li > a:hover, .inner-nav > li > a:focus, .inner-nav > li.submenu-open > a',
								'function'	 => 'css',
								'property'	 => 'color'
							)
						)
					),
					array(
						'subtitle'	 => __( 'Sub menu font color', 'daydream' ),
						'id'		 => 'dd_sub_menu_font_color',
						'type'		 => 'color',
						'compiler'	 => true,
						'title'		 => __( 'Submenu Font Color', 'daydream' ),
						'default'	 => '#ffffff',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.sub-menu li > a',
								'function'	 => 'css',
								'property'	 => 'color'
							)
						)
					),
					array(
						'subtitle'	 => __( 'Sub menu hover font color', 'daydream' ),
						'id'		 => 'dd_sub_menu_hover_font_color',
						'type'		 => 'color',
						'compiler'	 => true,
						'title'		 => __( 'Submenu Hover Font Color', 'daydream' ),
						'default'	 => '#ffffff',
						'transport'	 => 'postMessage',
						'js_vars'	 => array(
							array(
								'element'	 => '.sub-menu li > a:hover, .sub-menu li > a:focus, .sub-menu li.submenu-open > a',
								'function'	 => 'css',
								'property'	 => 'color'
							)
						)
					),
				),
			)
			);

			daydream_Kirki::setSection( $global_value[ 'opt_name' ], array(
				'id'		 => 'dd-extra-main-tab',
				'title'		 => __( 'Extra', 'daydream' ),
				'iconfix'	 => 'no-icon',
				'fields'	 => array(
					array(
						'subtitle'	 => __( 'Choose enable button if you want to display Back to Top button.', 'daydream' ),
						'id'		 => 'dd_back_to_top',
						'type'		 => 'switch',
						'on'		 => __( 'Enabled', 'daydream' ),
						'off'		 => __( 'Disabled', 'daydream' ),
						'default'	 => 1,
						'title'		 => __( 'Back to Top button', 'daydream' ),
					),
					array(
						'subtitle'	 => __( 'Choose Enable button if you want to add rel="nofollow" attribute to social sharing box and social links.', 'daydream' ),
						'id'		 => 'dd_nofollow_social_links',
						'type'		 => 'switch',
						'on'		 => __( 'Yes', 'daydream' ),
						'off'		 => __( 'No', 'daydream' ),
						'title'		 => __( 'Add rel="nofollow" to social links', 'daydream' ),
					),
				),
			)
			);
		}

		return;
	}

}