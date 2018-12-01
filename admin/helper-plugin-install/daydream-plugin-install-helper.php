<?php

/**
 * Plugin install helper.
 *
 * @package Daydream
 * @since Daydream 1.1.31
 */

/**
 * Class Daydream_Plugin_Install_Helper
 */
class Daydream_Plugin_Install_Helper {

	/**
	 * Instance of class.
	 *
	 * @var bool $instance instance variable.
	 */
	private static $instance;

	/**
	 * Check if instance already exists.
	 *
	 * @return Daydream_Plugin_Install_Helper
	 */
	public static function instance() {
		if ( !isset( self::$instance ) && !( self::$instance instanceof Daydream_Plugin_Install_Helper ) ) {
			self::$instance = new Daydream_Plugin_Install_Helper;
		}

		return self::$instance;
	}

	/**
	 * Get plugin path based on plugin slug.
	 *
	 * @param string $slug Plugin slug.
	 *
	 * @return string
	 */
	public static function get_plugin_path( $slug ) {

		switch ( $slug ) {
			case 'yith-woocommerce-wishlist':
				return $slug . '/init.php';
				break;
			case 'contact-form-7':
				return $slug . '/wp-contact-form-7.php';
				break;
			default:
				return $slug . '/' . $slug . '.php';
		}
	}

	/**
	 * Generate action button html.
	 *
	 * @param string $slug plugin slug.
	 *
	 * @return string
	 */
	public function get_button_html( $slug, $settings = array() ) {
		$button		 = '';
		$redirect	 = '';
		if ( !empty( $settings ) && array_key_exists( 'redirect', $settings ) ) {
			$redirect = $settings[ 'redirect' ];
		}
		$state = $this->check_plugin_state( $slug );
		if ( empty( $slug ) ) {
			return '';
		}

		$additional = '';

		if ( $state === 'deactivate' ) {
			$additional = ' action_button active';
		}

		$button .= '<div class=" plugin-card-' . esc_attr( $slug ) . esc_attr( $additional ) . '" style="padding: 8px 0 5px;">';

		$plugin_link_suffix = self::get_plugin_path( $slug );

		$nonce = add_query_arg(
		array(
			'action'		 => 'activate',
			'plugin'		 => rawurlencode( $plugin_link_suffix ),
			'plugin_status'	 => 'all',
			'paged'			 => '1',
			'_wpnonce'		 => wp_create_nonce( 'activate-plugin_' . $plugin_link_suffix ),
		), network_admin_url( 'plugins.php' )
		);
		switch ( $state ) {
			case 'install':
				$button .= '<a data-redirect="' . esc_url( $redirect ) . '" data-slug="' . esc_attr( $slug ) . '" class="install-now daydream-install-plugin button  " href="' . esc_url( $nonce ) . '" data-name="' . esc_attr( $slug ) . '" aria-label="Install ' . esc_attr( $slug ) . '">' . __( 'Install and activate', 'daydream' ) . '</a>';
				break;

			case 'activate':
				$button .= '<a  data-redirect="' . esc_url( $redirect ) . '" data-slug="' . esc_attr( $slug ) . '" class="activate-now button button-primary" href="' . esc_url( $nonce ) . '" aria-label="Activate ' . esc_attr( $slug ) . '">' . esc_html__( 'Activate', 'daydream' ) . '</a>';
				break;

			case 'deactivate':
				$nonce = add_query_arg(
				array(
					'action'		 => 'deactivate',
					'plugin'		 => rawurlencode( $plugin_link_suffix ),
					'plugin_status'	 => 'all',
					'paged'			 => '1',
					'_wpnonce'		 => wp_create_nonce( 'deactivate-plugin_' . $plugin_link_suffix ),
				), network_admin_url( 'plugins.php' )
				);

				$button .= '<a  data-redirect="' . esc_url( $redirect ) . '" data-slug="' . esc_attr( $slug ) . '" class="deactivate-now button" href="' . esc_url( $nonce ) . '" data-name="' . esc_attr( $slug ) . '" aria-label="Deactivate ' . esc_attr( $slug ) . '">' . esc_html__( 'Deactivate', 'daydream' ) . '</a>';
				break;
		}// End switch().
		$button .= '</div>';

		return $button;
	}

	/**
	 * Check plugin state.
	 *
	 * @param string $slug plugin slug.
	 *
	 * @return bool
	 */
	private function check_plugin_state( $slug ) {

		$plugin_link_suffix = self::get_plugin_path( $slug );

		if ( file_exists( ABSPATH . 'wp-content/plugins/' . $plugin_link_suffix ) ) {
			$needs = is_plugin_active( $plugin_link_suffix ) ? 'deactivate' : 'activate';

			return $needs;
		} else {
			return 'install';
		}
	}

	/**
	 * Enqueue Function.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'plugin-install' );
		wp_enqueue_script( 'updates' );
		wp_enqueue_script( 'daydream-plugin-install-helper', get_template_directory_uri() . '/admin/helper-plugin-install/script.js', array( 'jquery' ), DAYDREAM_VERSION, true );
		wp_localize_script(
		'daydream-plugin-install-helper', 'daydream_plugin_helper', array(
			'activating' => esc_html__( 'Activating ', 'daydream' ),
		)
		);
		wp_localize_script(
		'daydream-plugin-install-helper', 'pagenow', array( 'import' )
		);
	}

}
