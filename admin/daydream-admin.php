<?php

/**
 * The admin class that handles all the dashboard integration.
 *
 * @package Daydream
 */

/**
 * Class Daydream_Admin
 */
class Daydream_Admin {

	/**
	 * Initialize the Theme admin panel
	 *
	 * @since     1.0.0
	 */
	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'daydream_enqueue_styles' ) );
		add_filter( 'init', array( $this, 'daydream_do_about_page' ) );
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function daydream_enqueue_styles() {
		
	}

	/**
	 * Add the about page.
	 */
	public function daydream_do_about_page() {
		/*
		 * About page instance
		 */
		$config = array(
			// Menu name under Appearance.
			'menu_name'				 => apply_filters( 'daydream_about_page_filter', __( 'About Daydream', 'daydream' ), 'menu_name' ),
			// Page title.
			'page_name'				 => apply_filters( 'daydream_about_page_filter', __( 'About Daydream', 'daydream' ), 'page_name' ),
			// Main welcome title
			/* translators: s - theme name */
			'welcome_title'			 => apply_filters( 'daydream_about_page_filter', sprintf( __( 'Welcome to %s! - Version ', 'daydream' ), 'Daydream' ), 'welcome_title' ),
			// Main welcome content
			'welcome_content'		 => apply_filters( 'daydream_about_page_filter', esc_html__( 'Daydream is multipurpose responsive WordPress theme with light weight. Ready to use for any purpose such as business, corporate, agency, app, news, blog, magazine, cleaning services, construction, designs, freelancer, restaurant and many more. Daydream templates are built with super fast light weight Elementor page builder with drag and drop function so your website will not load heavily. We have added lots of options in customizer panel so you don’t need any coding knowledge.', 'daydream' ), 'welcome_content' ),
			/**
			 * Tabs array.
			 *
			 * The key needs to be ONLY consisted from letters and underscores. If we want to define outside the class a function to render the tab,
			 * the will be the name of the function which will be used to render the tab content.
			 */
			'tabs'					 => array(
				'getting_started'		 => __( 'Getting Started', 'daydream' ),
				'recommended_plugins'	 => __( 'Useful Plugins', 'daydream' ),
				'support'				 => __( 'Support', 'daydream' ),
			),
			// Support content tab.
			'support_content'		 => array(
				'first'	 => array(
					'title'			 => esc_html__( 'Contact Support', 'daydream' ),
					'icon'			 => 'dashicons dashicons-sos',
					'text'			 => esc_html__( 'We want to make sure you have the best experience using Daydream, and that is why we have gathered all the necessary information here for you. We hope you will enjoy using Daydream as much as we enjoy creating great products.', 'daydream' ),
					'button_label'	 => esc_html__( 'Contact Support', 'daydream' ),
					'button_link'	 => esc_url( 'https://themevedanta.com/contact/' ),
					'is_button'		 => true,
					'is_new_tab'	 => true,
				),
				'second' => array(
					'title'			 => esc_html__( 'Documentation', 'daydream' ),
					'icon'			 => 'dashicons dashicons-book-alt',
					'text'			 => esc_html__( 'Need more details? Please check our full documentation for detailed information on how to use Daydream.', 'daydream' ),
					'button_label'	 => esc_html__( 'Read full documentation', 'daydream' ),
					'button_link'	 => 'http://docs.themevedanta.com/daydream',
					'is_button'		 => true,
					'is_new_tab'	 => true,
				),
				'third'	 => array(
					'title'			 => esc_html__( 'View Demo', 'daydream' ),
					'icon'			 => 'dashicons dashicons-art',
					'text'			 => esc_html__( 'Check out our Beautiful Demo created by daydream corporate multipupose wordpress theme', 'daydream' ),
					'button_label'	 => esc_html__( 'Live Preview', 'daydream' ),
					'button_link'	 => 'https://demo.themevedanta.com/daydream-lite/',
					'is_button'		 => true,
					'is_new_tab'	 => true,
			),
			),
			// Getting started tab
			'getting_started'		 => array(
				'first'	 => array(
					'title'					 => esc_html__( 'Recommended Plugin', 'daydream' ),
					'text'					 => esc_html__( 'We are give compatibility of following plugin so check our recommended plugin.', 'daydream' ),
					'button_label'			 => esc_html__( 'Recommended plugin', 'daydream' ),
					'button_link'			 => esc_url( '#recommended_plugins' ),
					'is_button'				 => true,
					'recommended_actions'	 => true,
					'is_new_tab'			 => false,
				),
				'second' => array(
					'title'					 => esc_html__( 'Read full documentation', 'daydream' ),
					'text'					 => esc_html__( 'Need more details? Please check our full documentation for detailed information on how to use Daydream.', 'daydream' ),
					'button_label'			 => esc_html__( 'Documentation', 'daydream' ),
					'button_link'			 => 'http://docs.themevedanta.com/daydream/',
					'is_button'				 => true,
					'recommended_actions'	 => false,
					'is_new_tab'			 => true,
				),
				'third'	 => array(
					'title'					 => esc_html__( 'Go to the Customizer', 'daydream' ),
					'text'					 => esc_html__( 'Lots of options in WordPress Customizer so you don’t need any coding knowledge.', 'daydream' ),
					'button_label'			 => esc_html__( 'Go to the Customizer', 'daydream' ),
					'button_link'			 => esc_url( admin_url( 'customize.php' ) ),
					'is_button'				 => true,
					'recommended_actions'	 => false,
					'is_new_tab'			 => true,
				),
			),
			// Free vs PRO array.
			'free_pro'				 => array(
				'free_theme_name'		 => 'Daydream',
				'pro_theme_name'		 => 'Daydream Pro',
				'pro_theme_link'		 => apply_filters( 'daydream_upgrade_link_from_child_theme_filter', 'http://daydream.themevedanta.com/' ),
				/* translators: s - theme name */
				'get_pro_theme_label'	 => sprintf( __( 'Get %s now!', 'daydream' ), 'Daydream Pro' ),
				'banner_link'			 => 'https://docs.themevedanta.com/article/what-is-the-difference-between-daydream-and-daydream-pro',
				'banner_src'			 => get_template_directory_uri() . '/assets/img/daydream_pro_banner.png',
				'features'				 => array(
					array(
						'title'			 => __( '100% Responsive', 'daydream' ),
						'description'	 => __( 'Responsive layout, Performs beautifully on all devices', 'daydream' ),
						'is_in_lite'	 => 'true',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( 'WooCommerce Compatible', 'daydream' ),
						'description'	 => __( 'Ready for e-commerce. You can build an online store here.', 'daydream' ),
						'is_in_lite'	 => 'true',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( 'Theme Layout', 'daydream' ),
						'description'	 => __( 'Theme are ready for boxed and wide mode', 'daydream' ),
						'is_in_lite'	 => 'true',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( '600+ Google Fonts', 'daydream' ),
						'description'	 => __( 'All Typography options in customizer', 'daydream' ),
						'is_in_lite'	 => 'true',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( 'Unlimited Color Schemes', 'daydream' ),
						'description'	 => '',
						'is_in_lite'	 => 'true',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( '15+ Prebuilt One Click Demo', 'daydream' ),
						'description'	 => __( 'Get your Corporate WordPress Theme installed at the click of a button.', 'daydream' ),
						'is_in_lite'	 => 'false',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( 'Advance Theme Options', 'daydream' ),
						'description'	 => __( 'Lots of advance options in WordPress Customizer so you don’t need any coding knowledge', 'daydream' ),
						'is_in_lite'	 => 'false',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( 'Themevedanta Slider', 'daydream' ),
						'description'	 => __( 'You can create a nicer page within minutes with beautiful slider.', 'daydream' ),
						'is_in_lite'	 => 'false',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( 'Inbuilt MegaMenu', 'daydream' ),
						'description'	 => __( 'Inbuilt megamenu so you don\'t need to integrate third-party plugin for mega menu.', 'daydream' ),
						'is_in_lite'	 => 'false',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( 'Portfolio', 'daydream' ),
						'description'	 => __( 'Portfolio custom post type with two possible layouts.', 'daydream' ),
						'is_in_lite'	 => 'false',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( '15+ Premium Elementor Addons', 'daydream' ),
						'description'	 => __( 'Pricing table, Recent post, Recent work, Team Members, Testimonial Slider and much more Premium elementor addons include in pro theme', 'daydream' ),
						'is_in_lite'	 => 'false',
						'is_in_pro'		 => 'true',
					),
					array(
						'title'			 => __( 'Premium Support', 'daydream' ),
						'description'	 => __( 'Quick and Fast Professional Support', 'daydream' ),
						'is_in_lite'	 => 'false',
						'is_in_pro'		 => 'true',
					),
				),
			),
			// Plugins array.
			'recommended_plugins'	 => array(
				'already_activated_message'	 => esc_html__( 'Already activated', 'daydream' ),
				'version_label'				 => esc_html__( 'Version: ', 'daydream' ),
				'install_label'				 => esc_html__( 'Install and Activate', 'daydream' ),
				'activate_label'			 => esc_html__( 'Activate', 'daydream' ),
				'deactivate_label'			 => esc_html__( 'Deactivate', 'daydream' ),
				'content'					 => array(
					array(
						'slug' => 'elementor',
					),
					array(
						'slug' => 'woocommerce',
					),
					array(
						'slug' => 'yith-woocommerce-wishlist',
					),
					array(
						'slug' => 'contact-form-7',
					),
				),
			),
			// Required actions array.
			'recommended_actions'	 => array(
				'install_label'		 => esc_html__( 'Install and Activate', 'daydream' ),
				'activate_label'	 => esc_html__( 'Activate', 'daydream' ),
				'deactivate_label'	 => esc_html__( 'Deactivate', 'daydream' ),
				'content'			 => array(
				),
			),
		);
		Daydream_About_Page::init( apply_filters( 'daydream_about_page_array', $config ) );
	}

}

$plugin_admin = new Daydream_Admin();
